import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const path = (file) => join(root, file);
const read = (file) => readFileSync(path(file), 'utf8');
function write(file, value) {
  mkdirSync(dirname(path(file)), { recursive: true });
  writeFileSync(path(file), value);
}
const window = {};
vm.runInNewContext(read('data/products.js'), { window });
const { PRODUCTS: products, SITE_CONFIG: config } = window;
const origin = 'https://hidayetipirinc.com';
const brand = 'Hidayeti Pirinç';
const verification = process.env.GOOGLE_SITE_VERIFICATION || '';
if (verification && !/^[A-Za-z0-9_-]+$/.test(verification)) throw new Error('Invalid Google verification token');
const organization = {
  '@type': 'Organization', '@id': origin + '/#organization',
  name: brand, alternateName: 'Hidayeti Prinç', url: origin + '/',
  logo: origin + '/assets/logo.svg', email: config.email, telephone: '+' + config.whatsappNumber
};
const website = { '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: brand, publisher: { '@id': organization['@id'] }, inLanguage: ['tr-TR', 'en'] };
const variants = {};
const routes = ['/','/en/','/toptan-pirinc/'];
const seen = new Set();
for (const product of products) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || seen.has(product.slug)) throw new Error('Invalid or duplicate product slug: ' + product.slug);
  seen.add(product.slug);
  routes.push(productPath(product));
  for (const image of [product.image, product.backImage]) {
    if (!image.startsWith('assets/products/') || !existsSync(path(image))) throw new Error('Missing catalogue image: ' + image);
    const stem = 'assets/seo/' + image.split('/').at(-1).replace(/\.[^.]+$/, '');
    if (existsSync(path(stem + '.webp')) && existsSync(path(stem + '-card.webp'))) {
      variants[image] = { full: stem + '.webp', card: stem + '-card.webp' };
    }
  }
}

const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[character]);
const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
function productPath(product) { return '/urunler/' + product.slug + '/'; }
function absolute(relative) { return new URL(relative, origin).href; }
function whatsapp(message) { return 'https://wa.me/' + config.whatsappNumber + '?text=' + encodeURIComponent(message); }
function meta({ title, description, route, image = '/assets/seo/hidayeti-basmati.jpg', locale = 'tr_TR', alternates = false, schema = [] }) {
  const canonical = absolute(route);
  return `  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">${route === '/' && verification ? `\n  <meta name="google-site-verification" content="${verification}">` : ''}
  <link rel="canonical" href="${canonical}">${alternates ? `
  <link rel="alternate" hreflang="tr-TR" href="${origin}/">
  <link rel="alternate" hreflang="en" href="${origin}/en/">
  <link rel="alternate" hreflang="x-default" href="${origin}/">` : ''}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${brand}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${locale}">
  <meta property="og:image" content="${esc(absolute(image))}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${json({ '@context':'https://schema.org', '@graph':schema })}</script>`;
}
function replaceBlock(html, name, content) {
  const pattern = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  if (!pattern.test(html)) throw new Error('Missing generated block ' + name);
  return html.replace(pattern, () => `<!-- ${name}:start -->\n${content}\n        <!-- ${name}:end -->`);
}
function links(items, lang = 'tr') {
  return `<ul class="seo-product-links">${items.map(product => `<li><a href="${productPath(product)}"${lang === 'en' ? ' hreflang="tr"' : ''}>${esc(product.name[lang])}</a> — ${esc(product.description[lang])}</li>`).join('')}</ul>`;
}
for (const lang of ['tr','en']) {
  const file = lang === 'tr' ? 'index.html' : 'en/index.html';
  const title = lang === 'tr' ? 'Hidayeti Pirinç | Basmati Pirinç ve Toptan Teklif' : 'Hidayeti Pirinç | Basmati Rice Catalogue and Wholesale';
  const description = lang === 'tr' ? 'Hidayeti ve Buharı Basmati pirinç seçeneklerini 5, 10 ve 40 kg ambalajlarda inceleyin. Ürün bilgisi, güncel fiyat ve toptan teklif için WhatsApp’tan ulaşın.' : 'Explore Hidayeti and Buharı Basmati rice in 5, 10 and 40 kg packs. Ask about product details, current pricing and wholesale quotes on WhatsApp.';
  let html = replaceBlock(read(file), 'seo-head', meta({ title, description, route: lang === 'tr' ? '/' : '/en/', locale: lang === 'tr' ? 'tr_TR' : 'en_US', alternates: true, schema: [website, organization] }));
  html = replaceBlock(html, 'seo-catalogue', links(products, lang));
  write(file, html);
}

function breadcrumb(name, route) {
  return { '@type':'BreadcrumbList', itemListElement:[
    { '@type':'ListItem',position:1,name:'Ana sayfa',item:origin + '/' },
    { '@type':'ListItem',position:2,name,item:absolute(route) }
  ] };
}
function page(head, body, analyticsItem = '') {
  return `<!doctype html>
<html lang="tr-TR"${analyticsItem ? ` data-item-id="${esc(analyticsItem)}"` : ''}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
${head}
  <link rel="icon" href="/assets/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/seo-pages.css">
  <script defer src="/data/analytics-config.js"></script>
  <script defer src="/analytics.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="seo-page-header"><div class="wrap seo-header-inner">
    <a href="/"><img src="/assets/logo.svg" alt="" width="40" height="40"> ${brand}</a>
    <nav aria-label="Ana menü"><a href="/#products">Ürünler</a> <a href="/toptan-pirinc/">Toptan</a> <a href="/#contact">İletişim</a></nav>
  </div></header>
  <main class="wrap seo-page" id="main">
${body}
  </main>
  <footer class="wrap seo-page-footer"><a href="/#contact">İletişim</a></footer>
</body>
</html>\n`;
}
function imageMarkup(product, back = false) {
  const image = back ? product.backImage : product.image;
  const alt = back ? product.backAlt.tr : product.alt.tr;
  const variant = variants[image];
  return `<figure><picture>${variant ? `<source type="image/webp" media="(max-width: 700px)" srcset="/${esc(variant.card)}"><source type="image/webp" srcset="/${esc(variant.full)}">` : ''}<img src="/${esc(image)}" alt="${esc(alt)}" width="600" height="780" decoding="async"${back ? ' loading="lazy"' : ' fetchpriority="high"'}></picture><figcaption>${back ? 'Arka yüz' : 'Ön yüz'}</figcaption></figure>`;
}
for (const product of products) {
  const name = product.name.tr;
  const route = productPath(product);
  const description = `${name}. Ambalajın ön ve arka yüzünü inceleyin. Güncel fiyat, stok ve teslimat bilgisi için WhatsApp’tan ulaşın.`;
  const schema = { '@type':'Product', name, description:product.description.tr, image:[absolute(product.image), absolute(product.backImage)], brand:{ '@type':'Brand', name:product.family === 'hidayeti' ? 'Hidayeti Prinç' : 'Buharı Prinç' }, url:absolute(route) };
  const head = meta({title:name + ' | ' + brand, description, route, image:product.image, schema:[breadcrumb(name,route),schema]});
  write(route.slice(1) + 'index.html', page(head, `    <p class="seo-breadcrumb"><a href="/#products">Ürün kataloğu</a> / ${esc(name)}</p>
    <h1>${esc(name)}</h1>
    <div class="seo-product-detail">
      <div class="seo-gallery">${imageMarkup(product)}${imageMarkup(product,true)}</div>
      <div>
        <dl class="seo-specs"><div><dt>Pirinç türü</dt><dd>Basmati</dd></div><div><dt>Ambalaj ağırlığı</dt><dd>${esc(product.weight)}</dd></div></dl>
        <p>Güncel fiyat, stok durumu ve teslimat koşullarını öğrenmek için bize yazın.</p>
        <a class="button button-dark" data-inquiry="product" href="${esc(whatsapp(`Merhaba, ${name} için güncel fiyat, stok ve teslimat bilgisi alabilir miyim?`))}" target="_blank" rel="noopener noreferrer">WhatsApp’tan bilgi alın</a>
      </div>
    </div>
    <h2>Diğer Basmati paketleri</h2>
    ${links(products.filter(other => other.id !== product.id))}
    <p><a href="/toptan-pirinc/">Toptan alım için teklif isteyin</a></p>`, product.id));
}
const wholesaleTitle = 'Toptan Basmati Pirinç';
const wholesaleRoute = '/toptan-pirinc/';
write('toptan-pirinc/index.html', page(meta({
  title:wholesaleTitle + ' | ' + brand, route:wholesaleRoute,
  description:'Restoranlar ve işletmeler için Hidayeti ve Buharı Basmati paketlerini inceleyin. İhtiyacınız olan miktarı paylaşarak WhatsApp üzerinden toptan teklif isteyin.',
  schema:[breadcrumb(wholesaleTitle,wholesaleRoute)]
}), `    <p class="seo-breadcrumb"><a href="/">Ana sayfa</a> / Toptan alım</p>
    <h1>${wholesaleTitle}</h1>
    <p>Restoranlar, işletmeler ve toplu alım yapmak isteyenler için Basmati pirinç paketlerini inceleyin. Güncel fiyat, stok, minimum alım miktarı ve teslimat koşullarını ekibimizle görüşebilirsiniz.</p>
    <h2>Paket seçenekleri</h2>
    ${links(products)}
    <h2>Toptan teklif nasıl alınır?</h2>
    <p>İlgilendiğiniz ürünü, paket ağırlığını, ihtiyacınız olan toplam miktarı ve teslimat ilini WhatsApp mesajınıza ekleyin.</p>
    <a class="button button-dark" data-inquiry="wholesale" href="${esc(whatsapp('Merhaba, Basmati pirinç için toptan fiyat teklifi almak istiyorum. Paket seçenekleri, minimum alım ve teslimat koşulları hakkında bilgi verebilir misiniz?'))}" target="_blank" rel="noopener noreferrer">WhatsApp’tan toptan teklif isteyin</a>
    <p>Telefon <a href="tel:+${esc(config.whatsappNumber)}">+${esc(config.whatsappNumber)}</a> · E-posta <a href="mailto:${esc(config.email)}">${esc(config.email)}</a></p>`));

for (const name of existsSync(path('urunler')) ? readdirSync(path('urunler'), { withFileTypes:true }) : []) {
  if (name.isDirectory() && !seen.has(name.name)) {
    const file = 'urunler/' + name.name + '/index.html';
    if (existsSync(path(file)) && read(file).startsWith('<!-- Generated by build-seo.mjs -->')) rmSync(path(file));
  }
}
for (const product of products) {
  const file = productPath(product).slice(1) + 'index.html';
  write(file, '<!-- Generated by build-seo.mjs -->\n' + read(file));
}
write('data/seo-images.js', 'window.SEO_IMAGES = ' + json(variants) + ';\n');
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map(route => '  <url><loc>' + esc(absolute(route)) + '</loc></url>').join('\n') + '\n</urlset>\n');

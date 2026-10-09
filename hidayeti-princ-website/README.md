# Hidayeti Prinç — Basmati rice website (V1.5)

A responsive, one-page bilingual website prototype for Hidayeti Prinç. Turkish is the default language; the English switch uses a US flag as requested. The catalogue has four clearly marked demo products and product-specific WhatsApp inquiry links.

## Included

- A bilingual FAQ section and expanded editable company introduction.
- Simplified stylesheet and script paths for local Firefox/Brave previews, with an on-page warning if the CSS file is missing.

- Automatic light/dark appearance: follows the operating-system/browser preference by default. The moon/sun button in the header manually switches themes and remembers the selected override. If no override has been selected, the theme continues to follow system changes. Theme initialization is early to reduce flashing.
- Expanded one-page storytelling: product range overview, audience-specific sections for individual customers / wholesale buyers / businesses, a clear WhatsApp inquiry flow, and additional editable brand-information cards.
- Scroll-reveal, hover lift, image zoom and theme-button feedback, while respecting reduced-motion settings.

- Stronger contrast and depth: greener section accents, visible product-image frames, clearer shadows, high-contrast filter buttons, and a floating WhatsApp CTA with subtle entrance/pulse animation.

- Warm, minimal food-brand design with an editable SVG wordmark and local SVG placeholder artwork.
- Responsive navigation and mobile menu.
- Turkish / English interface toggle with separate `/` and `/en/` entry URLs for a more crawlable bilingual setup.
- Product family filters, pack-size filter, search, product detail dialog, and empty state.
- Product-specific WhatsApp click-to-chat messages and a general WhatsApp CTA.
- Separate product data file, local product image folder, basic metadata, and reduced-motion/accessibility support.
- No cart, checkout, payment processing, customer accounts, or backend.

## Preview locally

Extract the **entire ZIP** into a normal folder before opening it. Keep `index.html`, `styles.css`, `app.js`, the `data/` folder, and the `assets/` folder together exactly as shipped. Then open `index.html` in a browser. The stylesheet and scripts use relative paths and are designed to work from both `file://` and normal HTTP hosting.

If the page looks unstyled in Firefox:
1. Make sure you extracted the **entire ZIP** first and opened `index.html` from inside that folder. Do not open a standalone `index.html` downloaded separately: it references neighboring files such as `styles.css`, `app.js`, and `assets/`.
2. Press **Ctrl+Shift+R** to bypass the cache. The stylesheet is referenced with a simple relative path (`./styles.css`) to avoid file-preview query-string oddities.
3. Confirm the filename is exactly `styles.css` (case matters on many hosts) and was not renamed to `styles.css.txt`.
4. For a reliable local preview, run the included folder through a small local HTTP server as shown below.

This is not a known Firefox CSS limitation: with the full folder and relative paths preserved, the same stylesheet is intended to work in Firefox and Brave.

There is no build step and no package install is required.

```bash
cd hidayeti-princ-website
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## Before publishing

1. Replace the sample company introduction in `index.html` with verified company facts.
2. Replace the four demo descriptions in `data/products.js` with real Turkish and English product descriptions and specifications.
3. Replace `assets/products/*.svg` with the real product images (WebP or AVIF is recommended for photos). Update each `image` field in `data/products.js` to point to the corresponding local image path. Keep image alt text accurate in both languages.
4. Replace `assets/hero-rice.svg` with the real hero/product photo if desired, and update the related alt text in `index.html`.
5. Replace the placeholder brand story and product packaging references. The visible “DEMO / ÖRNEK” labels are intentional until real assets and descriptions are in place.
6. Check all four product names, especially the final written brand/product name for “Buharı Prinç”.
7. Verify the business phone number and public contact information.
8. After a domain is selected, add absolute canonical URLs, Open Graph URLs, reciprocal `hreflang` links for `/` and `/en/`, and a real `sitemap.xml`. See `sitemap-template.xml` for an example template.
9. Deploy the whole folder to a static host that serves HTML, CSS, JavaScript, and SVG assets. Then verify the domain in Google Search Console and submit the sitemap.

## Change the WhatsApp number

Edit `whatsappNumber` at the top of `data/products.js`. Use international digits only, without a leading `+`, spaces, or punctuation. For the provided number this is `905344641463`.

The main site buttons use a generic inquiry message. Each product card and its details dialog build a message containing that product's name and pack size. Visitors must press Send in WhatsApp; the site does not send messages automatically.

## Add a product

Add another object to `window.PRODUCTS` in `data/products.js` with a unique `id`, unique `slug`, `family`, `category`, `weight`, Turkish and English `name` and `description`, image path, Turkish and English `alt`, and `demo` flag. Add the photo to `assets/products/` and point the `image` field to it. The card, detail dialog, search, filters, and WhatsApp message are generated from the data file automatically.

The current data is plain JavaScript rather than JSON so the prototype can be opened directly from a static local server without a JSON-fetch step. It remains a single, structured data file with no framework or build dependency.

## SEO notes

The page title and description target the relevant phrase “Basmati pirinç” naturally. This starter includes semantic sections, heading hierarchy, alt text, and basic metadata. It does **not** guarantee first-place rankings. For a stronger long-term search strategy, add separate, indexable product-detail URLs with unique verified content, real domain metadata, sitemap submission, and an ongoing content / reputation plan. Do not publish invented product claims, origin, certifications, prices, reviews, or nutritional details.

## Important limitation

This is a static file-based catalogue, not an admin system. To add or change products, edit `data/products.js` and deploy the updated files again. No database or server is needed for ordinary catalogue display, but visitors won't see local changes until a new version is deployed.

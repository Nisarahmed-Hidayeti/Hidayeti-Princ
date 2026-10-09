# Hidayeti Prinç — Basmati rice website (V1)

A responsive, one-page bilingual website prototype for Hidayeti Prinç. Turkish is the default language; the English switch uses a US flag as requested. The catalogue has four clearly marked demo products and product-specific WhatsApp inquiry links.

## Visual refresh (V1.1)

- Stronger contrast between the page background, catalogue area, product cards, and controls.
- More defined card/image edges and visible layered shadows.
- WhatsApp actions use a distinct green treatment with hover feedback.
- Clearer active catalogue filters and keyboard focus rings.
- Subtle hero entrance, product-card entrance, hover motion, and scroll-reveal animations. Reduced-motion preferences are respected.

## Included

- Warm, minimal food-brand design with an editable SVG wordmark and local SVG placeholder artwork.
- Responsive navigation and mobile menu.
- Turkish / English interface toggle with separate `/` and `/en/` entry URLs for a more crawlable bilingual setup.
- Product family filters, pack-size filter, search, product detail dialog, and empty state.
- Product-specific WhatsApp click-to-chat messages and a general WhatsApp CTA.
- Separate product data file, local product image folder, basic metadata, and reduced-motion/accessibility support.
- No cart, checkout, payment processing, customer accounts, or backend.

## Preview locally

You can open `index.html` directly in a browser. Alternatively, use a simple local HTTP server; there is no build step and no package install is required.

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

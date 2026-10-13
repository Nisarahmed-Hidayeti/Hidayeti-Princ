# Hidayeti Prinç — Static Website

Responsive, bilingual (Turkish/English) catalogue website for Hidayeti Prinç Basmati rice products.

## Features
- Eight catalogue items: Hidayeti Prinç and Buharı Prinç, each in 5 kg, 10 kg, 20 kg, and 40 kg sizes.
- Hover to turn package cards to their back side; click/tap or keyboard focus also supports flipping.
- Front and back package illustrations are stored as PNG files under `assets/products/`.
- Turkish home page (`index.html`) and English version (`en/index.html`).
- Light/dark theme follows system preferences and has a manual toggle.
- Product search, family filters, pack-size filters, and product-specific WhatsApp inquiry links.
- No checkout, payments, backend, or admin dashboard.

## Preview
Extract the entire folder and open `index.html` in a browser. If a browser restricts local file behavior, run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Keep the folder structure intact so `styles.css`, `app.js`, `data/products.js`, and `assets/` remain available.

## Product catalogue
Edit `data/products.js` to update product names, descriptions, weights, and image paths. Each product has `image` (front) and `backImage` (back) PNG assets. The current packaging artwork is a polished visual design; replace it with the approved production packaging artwork before presenting package-label details as final.

## Business contact
WhatsApp inquiries are configured for `+90 534 464 1463`. Update `window.SITE_CONFIG` in `data/products.js` if the contact number changes.

## Before publishing
- Confirm all package artwork and label details against the actual products.
- Add the production domain to canonical metadata and `sitemap-template.xml`.
- Add verified business contact details if you want them displayed publicly.
- Test both language pages and light/dark themes on mobile and desktop.


## Visual update (October 2026)
- Reworked the hero to use the full available desktop viewport below the sticky header, with more balanced product imagery and spacing.
- Added a staggered, restrained entrance sequence for the hero and smoother scroll reveals for lower sections; reduced-motion preferences remain respected.
- Replaced the placeholder circle on the hero WhatsApp action with a recognizable WhatsApp mark and applied a clearer WhatsApp-green treatment to the main contact actions.
- Fixed the brand-card tagline contrast in light mode.
- Added a proper light-theme contact panel while retaining the deep-green contact panel in dark mode.
- Preserved the existing bilingual pages, catalogue filters, product front/back images, product details, and WhatsApp inquiry flow.

## Quick verification
- JavaScript syntax checked with `node --check app.js`.
- CSS opening/closing brace counts checked.
- Keep the full folder intact when extracting; the site depends on the existing assets and relative paths.

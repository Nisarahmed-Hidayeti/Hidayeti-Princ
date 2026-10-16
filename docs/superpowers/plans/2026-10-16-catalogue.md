# Catalogue editing and polish

Goal: Remove three retired packs, offer a local form-based catalogue editor, and polish the existing bilingual static site.
Architecture: Keep data/products.js as the single catalogue source; editor.html loads it and exports a replacement with the existing SITE_CONFIG preserved. No backend or publishing from the editor.

- [x] Remove Hidayeti 20/40 kg and Buhari 20 kg; update copy and generate size filters from catalogue data.
- [x] Add editor.html, editor.css and editor.js: select, add, edit, remove products; validate unique IDs and local asset paths; export products.js without losing configuration. Warn about unsaved navigation.
- [x] Improve catalogue layout, focus states, filter entrance and dialog motion with reduced-motion support.
- [x] Verify Turkish/English, mobile/desktop, filters, details, image paths and editor export round trip. Document editing steps.

Design: retain the site's paper #f8f7f2, forest #26352c, gold #c4a25b and white #fffefb. Keep existing Playfair Display/DM Sans typography. Catalogue remains product-led; editor uses a product list beside a clearly labelled form, stacked on mobile. Use action-driven motion, avoiding extra decorative sections.

Verification: browser checks passed for both languages, filter combinations/search, empty state, details/WhatsApp, desktop/tablet/mobile overflow, editor export round trip preserving configuration, edit/add/remove/path validation, and reduced motion. JavaScript syntax checks passed. Existing user image modifications preserved.

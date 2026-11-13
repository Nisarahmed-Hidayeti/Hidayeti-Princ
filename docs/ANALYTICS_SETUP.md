# GA4 setup

The site uses its existing optional GA4 integration. The deployed config has an empty ID. Once configured, basic Google Consent Mode keeps the tag unloaded until opt-in, denies ad-related consent throughout, and disables analytics on withdrawal. The notice appears in the site’s analytics preferences. No inquiry draft text, contact details, query strings or URL fragments are included in the custom events.

| Event | Trigger |
|---|---|
| page_view | One per full page load once allowed |
| view_item | Opening a standalone product page |
| select_item | Selecting a product link or opening the original product dialog |
| whatsapp_click | A general, product, or wholesale WhatsApp link |
| wholesale_inquiry_click | A wholesale WhatsApp link, with product ID for pack-specific links |
| contact_click | A phone or email link |

Click events include the source pathname and use the catalogue product ID where available. WhatsApp clicks and wholesale clicks overlap. Count wholesale as a segment, and count actual inbound inquiries and orders in private business records.

1. In [Google Analytics](https://analytics.google.com/), select or create a web stream for `https://hidayetipirinc.com/`. Copy its real G- Measurement ID. Review the privacy disclosure and opt-in copy before activation.
2. Set the ID in [data/analytics-config.js](https://github.com/Nisarahmed-Hidayeti/Hidayeti-Princ/edit/main/data/analytics-config.js). Turn off Enhanced measurement for this stream to avoid automatic events duplicating the explicit measurements.
3. In a fresh browser session, decline and check that no Google tag loads. Accept, open a product, and open a wholesale draft without sending. Check DebugView for a single pageview per page and the expected source path and item ID. Withdraw and check that subsequent events stop. [DebugView](https://support.google.com/analytics/answer/7201382)

(function () {
  "use strict";
  const id = window.HIDAYETI_GA4_ID;
  if (!/^G-[A-Z0-9]+$/.test(id || "")) return;

  const key = "hidayeti-analytics-consent";
  const en = document.documentElement.lang === "en";
  const copy = en ? {
    title: "Analytics preferences",
    text: "Allow Google Analytics to measure site visits and clicks on contact links? You can change your choice here at any time.",
    allow: "Allow analytics", deny: "Decline analytics"
  } : {
    title: "Analitik tercihleri",
    text: "Ziyaretleri ve iletişim bağlantılarına yapılan tıklamaları ölçmek için Google Analytics’e izin veriyor musunuz? Tercihinizi buradan değiştirebilirsiniz.",
    allow: "Analitiğe izin ver", deny: "Analitiği reddet"
  };
  let consent;
  let loaded = false;
  try { consent = localStorage.getItem(key); } catch { /* Start with analytics off. */ }
  const preferences = document.createElement("details");
  preferences.className = "analytics-preferences";
  preferences.open = !consent;
  const heading = document.createElement("summary");
  heading.textContent = copy.title;
  const description = document.createElement("p");
  description.textContent = copy.text;
  preferences.append(heading, description);

  function send() {
    if (consent === "allow") window.dataLayer.push(arguments);
  }
  function enable() {
    window["ga-disable-" + id] = false;
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    send("js", new Date());
    const page = location.origin + location.pathname;
    const referrer = document.referrer ? new URL(document.referrer).origin : "";
    send("config", id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: page, page_referrer: referrer });
    send("event", "page_view");
    const item = document.documentElement.dataset.itemId;
    if (item) send("event", "view_item", { items: [{ item_id: item }] });
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.append(tag);
  }
  for (const choice of ["allow", "deny"]) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = copy[choice];
    button.addEventListener("click", () => {
      consent = choice;
      try { localStorage.setItem(key, consent); } catch { /* Keep the choice for this page. */ }
      if (consent === "allow") enable();
      else window["ga-disable-" + id] = true;
      preferences.open = false;
      heading.focus();
    });
    preferences.append(button);
  }
  document.body.append(preferences);
  if (consent === "allow") enable();
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || consent !== "allow") return;
    const card = link.closest("[data-product-id]");
    const item = card?.dataset.productId || document.documentElement.dataset.itemId;
    if (link.matches(".seo-product-link") && item) send("event", "select_item", { items: [{ item_id: item }] });
    if (link.hostname === "wa.me") send("event", "whatsapp_click", {
      inquiry_type: link.dataset.inquiry || (item ? "product" : "general"),
      ...(item ? { item_id: item } : {})
    });
    else if (link.protocol === "tel:" || link.protocol === "mailto:") send("event", "contact_click", { method: link.protocol.slice(0, -1) });
  });
})();

(function () {
  "use strict";

  const CONFIG = window.SITE_CONFIG || { whatsappNumber: "905344641463" };
  const PRODUCTS = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const ASSET_PREFIX = document.documentElement.dataset.assetPrefix || "";
  const translations = {
    tr: {
      skip: "İçeriğe geç", brandLine: "BASMATİ PİRİNÇ", navProducts: "Ürünlerimiz", navAbout: "Hakkımızda", navContact: "İletişim",
      headerWhatsapp: "WhatsApp <span aria-hidden=\"true\">↗</span>", floatingWhatsapp: "WhatsApp'tan yazın", mobileWhatsapp: "WhatsApp üzerinden ulaşın ↗",
      heroEyebrow: "HİDAYETİ PRİNÇ · BASMATİ", heroTitle: "Basmati pirinç ürünlerini <em>keşfedin.</em>",
      heroDescription: "Hidayeti Prinç ve Buharı Prinç ürün seçeneklerini inceleyin. Ürün detayları ve fiyat bilgisi için bize doğrudan ulaşın.",
      heroPrimary: "Ürünleri keşfet <span aria-hidden=\"true\">↓</span>", heroSecondary: "<span class=\"wa-dot\" aria-hidden=\"true\">◉</span> WhatsApp'tan bilgi al",
      heroFootnote: "5 kg ve 10 kg paket seçenekleri", stampTop: "BASMATİ", stampBottom: "PİRİNÇ", imageCaption: "Örnek görsel · Gerçek ambalaj daha sonra eklenecek",
      heroNoteOne: "Ürün odaklı katalog", heroNoteTwo: "Türkçe & English", heroNoteThree: "WhatsApp ile iletişim", scroll: "AŞAĞI KAYDIR",
      productsEyebrow: "ÜRÜN KATALOĞU", productsTitle: "Size uygun <em>paketi</em> bulun.",
      productsIntro: "Ürün ailelerini inceleyin, paket boyutunu seçin ve fiyat bilgisi için WhatsApp üzerinden bize ulaşın.",
      filterAll: "Tüm ürünler <span class=\"chip-count\" id=\"allCount\">04</span>", filterHidayeti: "Hidayeti Prinç", filterBuhari: "Buharı Prinç",
      searchLabel: "Ürün ara", sizeLabel: "Paket boyutu", sizeAll: "Tüm boyutlar", demoNotice: "Demo ürün görselleri ve açıklamaları kullanılıyor.",
      emptyTitle: "Ürün bulunamadı", emptyDescription: "Aramanızı veya filtrelerinizi değiştirmeyi deneyin.", resetFilters: "Filtreleri temizle ↗",
      catalogFootnote: "Ürün açıklamaları, gerçek ambalaj fotoğrafları ve teknik bilgiler işletme tarafından daha sonra eklenecek.",
      rangeEyebrow: "BASMATİ ÜRÜN AİLESİ", rangeTitle: "Basmati pirinçte <em>net seçenekler.</em>",
      rangeIntro: "Hidayeti Prinç ve Buharı Prinç ürün ailelerini inceleyin. Paket seçenekleri ve ürün detayları için bizimle doğrudan iletişime geçin.",
      rangePhotoLabel: "PAKET SEÇENEKLERİ", rangePointOneTitle: "İki ürün ailesi", rangePointOneText: "Hidayeti Prinç ve Buharı Prinç seçeneklerini tek bir katalogda karşılaştırın.",
      rangePointTwoTitle: "5 kg ve 10 kg", rangePointTwoText: "Mevcut ürünler arasında paket boyutuna göre gezinin.",
      rangePointThreeTitle: "Doğrudan iletişim", rangePointThreeText: "Fiyat, stok ve ürün bilgilerini WhatsApp üzerinden sorun; ayrıntıları işletmeyle doğrulayın.", rangeCta: "Kataloğa dön",
      audienceEyebrow: "KİMLER İÇİN?", audienceTitle: "İhtiyacınız ne olursa olsun, <em>ürünlerden başlayın.</em>",
      audienceIntro: "Bireysel müşteriler, işletmeler ve toptan alım yapanlar ürün seçeneklerini inceleyebilir ve detayları doğrudan sorabilir.",
      audienceHomeTitle: "Bireysel müşteriler", audienceHomeText: "Paket seçeneklerine göz atın ve size uygun ürünle ilgili bilgi isteyin.",
      audienceWholesaleTitle: "Toptan alım yapanlar", audienceWholesaleText: "Ürün seçenekleri, paketler ve fiyatlandırma hakkında doğrudan görüşün.",
      audienceBusinessTitle: "İşletmeler", audienceBusinessText: "Ürün bilgisi ve teklif talebinizi Hidayeti Prinç ekibine iletin.",
      audienceProductsCta: "Ürünleri incele", audienceContactCta: "İletişime geç",
      howEyebrow: "BASİT VE DOĞRUDAN", howTitle: "Ürünü seçin. <em>Bizimle konuşun.</em>",
      howIntro: "Site üzerinden ödeme yok. Ürün seçiminizi yapın, WhatsApp'tan sorun ve ayrıntıları doğrudan netleştirin.", howCta: "WhatsApp'tan iletişime geç <span aria-hidden=\"true\">↗</span>",
      howStepOneTitle: "Ürünleri keşfedin", howStepOneText: "Katalogda Hidayeti Prinç ve Buharı Prinç seçeneklerini inceleyin.",
      howStepTwoTitle: "Paketinizi seçin", howStepTwoText: "5 kg veya 10 kg seçeneğini açın ve ürünle ilgili bilgileri görüntüleyin.",
      howStepThreeTitle: "WhatsApp'tan sorun", howStepThreeText: "Ürün adı hazır mesajda yer alır. Mesajı kontrol edip gönderin; fiyat ve uygunluk bilgisini doğrudan alın.",
      brandFactOneTitle: "Ürün odaklı yaklaşım", brandFactOneText: "Ürün aileleri ve paket bilgileri kolayca görüntülenebilir.",
      brandFactTwoTitle: "Açık ürün bilgisi", brandFactTwoText: "Gerçek ürün detayları, teknik bilgiler ve fotoğraflar burada güncellenebilir.",
      brandFactThreeTitle: "Doğrudan iletişim", brandFactThreeText: "Fiyat ve ürün soruları doğrudan WhatsApp üzerinden iletilebilir.",
      aboutEyebrow: "MARKAMIZ", aboutTitle: "Hidayeti Prinç'i <em>tanıyın.</em>",
      aboutLead: "Basmati pirinç ürünlerimizi keşfedin; ihtiyacınıza uygun paket seçeneği için bizimle iletişime geçin.",
      aboutBody: "Bu alan, işletmenizin gerçek hikâyesi, üretim yaklaşımı ve ürünleri hakkında sağlayacağınız bilgilerle güncellenecek. Yayına almadan önce bu metni kendi şirket anlatımınızla değiştirin.",
      aboutCta: "Bize ulaşın", brandCardLabel: "HİDAYETİ PRİNÇ", brandCardLine: "Basmati pirinç ürünleri", brandCardBottom: "MARKA HİKÂYESİ BURADA",
      contactEyebrow: "İLETİŞİM", contactTitle: "Bir ürün hakkında <em>konuşalım.</em>",
      contactDescription: "Ürün detayları ve fiyat teklifi için bize WhatsApp'tan yazın. Mesajınızı birlikte netleştirelim.",
      contactWhatsapp: "WhatsApp'tan yazın <span aria-hidden=\"true\">↗</span>", phoneLabel: "Telefon / WhatsApp", contactSideNote: "Hidayeti Prinç<br> Basmati pirinç ürünleri",
      footerLine: "Basmati pirinç ürünlerini keşfedin.", footerDemo: "Demo içerik ve görseller yayından önce güncellenmelidir.", backTop: "Yukarı dön",
      productDemo: "ÖRNEK", productDetails: "Ürün detayları", productWhatsApp: "WhatsApp'tan sor", productWeight: "Paket ağırlığı", productType: "Ürün kategorisi", basmatiRice: "Basmati pirinç",
      demoDetails: "Bu ürün kartındaki açıklama ve ambalaj birer örnektir. Gerçek ürün bilgileri işletme tarafından eklenecektir.",
      dialogWhatsapp: "WhatsApp'tan bilgi ve fiyat alın", languageName: "English", languageFlag: "🇺🇸", languageAria: "Switch to English",
      resultSingular: "ürün", resultPlural: "ürün", searchPlaceholder: "Ürün ara...", familyHidayeti: "HİDAYETİ PRİNÇ", familyBuhari: "BUHARI PRİNÇ",
      generalMessage: "Merhaba, Hidayeti Prinç Basmati pirinç ürünleri hakkında bilgi ve fiyat almak istiyorum.", productMessagePrefix: "Merhaba, ", productMessageSuffix: " ürünü hakkında bilgi ve fiyat almak istiyorum.",
      pageTitle: "Hidayeti Prinç | Basmati Pirinç Ürünleri", pageDescription: "Hidayeti Prinç Basmati pirinç ürünlerini keşfedin. 5 kg ve 10 kg ürün seçenekleri hakkında bilgi ve fiyat için WhatsApp'tan bize ulaşın."
    },
    en: {
      skip: "Skip to content", brandLine: "BASMATI RICE", navProducts: "Our products", navAbout: "About us", navContact: "Contact",
      headerWhatsapp: "WhatsApp <span aria-hidden=\"true\">↗</span>", floatingWhatsapp: "Message us on WhatsApp", mobileWhatsapp: "Contact us on WhatsApp ↗",
      heroEyebrow: "HIDAYETI PRINÇ · BASMATI", heroTitle: "Discover our <em>Basmati rice.</em>",
      heroDescription: "Explore Hidayeti Prinç and Buharı Prinç product options. Contact us directly for product details and a quote.",
      heroPrimary: "Explore products <span aria-hidden=\"true\">↓</span>", heroSecondary: "<span class=\"wa-dot\" aria-hidden=\"true\">◉</span> Ask us on WhatsApp",
      heroFootnote: "Available in 5 kg and 10 kg packs", stampTop: "BASMATI", stampBottom: "RICE", imageCaption: "Sample visual · Real packaging will be added later",
      heroNoteOne: "Product-focused catalogue", heroNoteTwo: "Turkish & English", heroNoteThree: "Contact via WhatsApp", scroll: "SCROLL TO EXPLORE",
      productsEyebrow: "PRODUCT CATALOGUE", productsTitle: "Find your <em>pack size.</em>",
      productsIntro: "Browse our product ranges, choose a pack size, and contact us on WhatsApp for pricing.",
      filterAll: "All products <span class=\"chip-count\" id=\"allCount\">04</span>", filterHidayeti: "Hidayeti Prinç", filterBuhari: "Buharı Prinç",
      searchLabel: "Search products", sizeLabel: "Pack size", sizeAll: "All sizes", demoNotice: "Demo product images and descriptions are being used.",
      emptyTitle: "No products found", emptyDescription: "Try changing your search or filters.", resetFilters: "Clear filters ↗",
      catalogFootnote: "Product descriptions, real packaging photos, and technical details will be added by the business later.",
      rangeEyebrow: "THE BASMATI RANGE", rangeTitle: "Clear choices for <em>Basmati rice.</em>",
      rangeIntro: "Explore the Hidayeti Prinç and Buharı Prinç ranges. Contact us directly for pack options and product details.",
      rangePhotoLabel: "AVAILABLE PACK SIZES", rangePointOneTitle: "Two product ranges", rangePointOneText: "Browse Hidayeti Prinç and Buharı Prinç options in one catalogue.",
      rangePointTwoTitle: "5 kg and 10 kg", rangePointTwoText: "Browse available products by pack size.",
      rangePointThreeTitle: "Direct contact", rangePointThreeText: "Ask about pricing, availability, and product details on WhatsApp; confirm details directly with the business.", rangeCta: "Back to catalogue",
      audienceEyebrow: "WHO WE SERVE", audienceTitle: "Whatever your needs, <em>start with the products.</em>",
      audienceIntro: "Individual customers, businesses, and wholesale buyers can explore the range and ask us directly for details.",
      audienceHomeTitle: "Individual customers", audienceHomeText: "Browse pack options and ask about the product that suits your needs.",
      audienceWholesaleTitle: "Wholesale buyers", audienceWholesaleText: "Discuss product options, packs, and pricing directly with us.",
      audienceBusinessTitle: "Businesses", audienceBusinessText: "Send your product questions and quote request to Hidayeti Prinç.",
      audienceProductsCta: "Explore products", audienceContactCta: "Contact us",
      howEyebrow: "SIMPLE AND DIRECT", howTitle: "Choose a product. <em>Talk to us.</em>",
      howIntro: "There is no online checkout. Choose a product, ask us on WhatsApp, and confirm the details directly.", howCta: "Contact us on WhatsApp <span aria-hidden=\"true\">↗</span>",
      howStepOneTitle: "Explore the products", howStepOneText: "Browse Hidayeti Prinç and Buharı Prinç options in the catalogue.",
      howStepTwoTitle: "Choose your pack", howStepTwoText: "Open the 5 kg or 10 kg option to see its product information.",
      howStepThreeTitle: "Ask on WhatsApp", howStepThreeText: "The product name is included in a draft message. Review and send it to ask directly about pricing and availability.",
      brandFactOneTitle: "Product-focused", brandFactOneText: "Product ranges and pack information are easy to browse.",
      brandFactTwoTitle: "Clear product details", brandFactTwoText: "Real product details, specifications, and photographs can be updated here.",
      brandFactThreeTitle: "Direct contact", brandFactThreeText: "Product and pricing questions can be sent directly through WhatsApp.",
      aboutEyebrow: "ABOUT THE BRAND", aboutTitle: "Get to know <em>Hidayeti Prinç.</em>",
      aboutLead: "Explore our Basmati rice products and contact us to discuss the pack option that suits your needs.",
      aboutBody: "This section will be updated with your company story, production approach, and verified product information. Replace this sample copy with your own company introduction before launch.",
      aboutCta: "Get in touch", brandCardLabel: "HIDAYETI PRINÇ", brandCardLine: "Basmati rice products", brandCardBottom: "YOUR BRAND STORY GOES HERE",
      contactEyebrow: "CONTACT", contactTitle: "Let's talk about <em>your product.</em>",
      contactDescription: "Message us on WhatsApp for product details and a quote. We’ll help you find the information you need.",
      contactWhatsapp: "Message us on WhatsApp <span aria-hidden=\"true\">↗</span>", phoneLabel: "Phone / WhatsApp", contactSideNote: "Hidayeti Prinç<br> Basmati rice products",
      footerLine: "Discover our Basmati rice products.", footerDemo: "Demo content and visuals should be updated before launch.", backTop: "Back to top",
      productDemo: "DEMO", productDetails: "Product details", productWhatsApp: "Ask on WhatsApp", productWeight: "Pack weight", productType: "Product category", basmatiRice: "Basmati rice",
      demoDetails: "The description and packaging shown for this product are samples. The business will add verified product information later.",
      dialogWhatsapp: "Ask for details and a quote on WhatsApp", languageName: "Türkçe", languageFlag: "🇹🇷", languageAria: "Türkçe'ye geç",
      resultSingular: "product", resultPlural: "products", searchPlaceholder: "Search products...", familyHidayeti: "HIDAYETI PRINÇ", familyBuhari: "BUHARI PRINÇ",
      generalMessage: "Hello, I would like information and a quote for Hidayeti Prinç Basmati rice products.", productMessagePrefix: "Hello, I would like information and a quote for ", productMessageSuffix: ".",
      pageTitle: "Hidayeti Prinç | Basmati Rice Products", pageDescription: "Explore Hidayeti Prinç Basmati rice products. Contact us on WhatsApp for information and quotes on 5 kg and 10 kg packs."
    }
  };


  // The stylesheet follows the operating system's preferred color scheme. Keep
  // browser chrome (where supported) in sync without storing a separate setting.
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const colorSchemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function syncThemeColor() {
    if (themeColorMeta) themeColorMeta.content = colorSchemeQuery && colorSchemeQuery.matches ? "#111a13" : "#f5f2e9";
  }
  syncThemeColor();
  if (colorSchemeQuery) {
    if (typeof colorSchemeQuery.addEventListener === "function") colorSchemeQuery.addEventListener("change", syncThemeColor);
    else if (typeof colorSchemeQuery.addListener === "function") colorSchemeQuery.addListener(syncThemeColor);
  }

  const state = { lang: document.documentElement.lang === "en" ? "en" : "tr", family: "all", weight: "all", query: "" };
  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("productSearch");
  const weightFilter = document.getElementById("weightFilter");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const languageToggle = document.getElementById("languageToggle");
  const languageLabel = document.getElementById("languageLabel");
  const dialog = document.getElementById("productDialog");
  const dialogContent = document.getElementById("dialogContent");
  const phone = String(CONFIG.whatsappNumber || "905344641463").replace(/\D/g, "");

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function t(key) { return (translations[state.lang] && translations[state.lang][key]) || translations.tr[key] || key; }

  function waUrl(message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  function generalMessage() { return t("generalMessage"); }

  function productMessage(product) {
    const name = product.name[state.lang] || product.name.tr;
    return `${t("productMessagePrefix")}${name}${t("productMessageSuffix")}`;
  }

  function familyLabel(product) {
    return product.family === "buhari" ? t("familyBuhari") : t("familyHidayeti");
  }

  function updateStaticLinks() {
    document.querySelectorAll(".general-whatsapp").forEach((link) => {
      link.href = waUrl(generalMessage());
    });
    document.querySelectorAll("a[href^='tel:']").forEach((link) => {
      link.href = `tel:+${phone}`;
    });
  }

  function renderProducts() {
    const query = state.query.trim().toLocaleLowerCase(state.lang === "tr" ? "tr-TR" : "en-US");
    const filtered = PRODUCTS.filter((product) => {
      const matchesFamily = state.family === "all" || product.family === state.family;
      const matchesWeight = state.weight === "all" || product.weight === state.weight;
      const searchable = [product.name.tr, product.name.en, product.description.tr, product.description.en, product.weight, familyLabel(product), product.category].join(" ").toLocaleLowerCase(state.lang === "tr" ? "tr-TR" : "en-US");
      return matchesFamily && matchesWeight && (!query || searchable.includes(query));
    });

    grid.innerHTML = filtered.map((product) => `
      <article class="product-card" data-product-id="${escapeHtml(product.id)}">
        <div class="product-image-wrap">
          <span class="product-badge">${escapeHtml(t("productDemo"))}</span>
          <img class="product-image" src="${escapeHtml(ASSET_PREFIX + product.image)}" alt="${escapeHtml(product.alt[state.lang] || product.alt.tr)}" loading="lazy" width="600" height="720">
          <span class="product-weight">${escapeHtml(product.weight.toUpperCase())}</span>
        </div>
        <div class="product-info">
          <span class="product-family">${escapeHtml(familyLabel(product))}</span>
          <h3>${escapeHtml(product.name[state.lang] || product.name.tr)}</h3>
          <p class="product-description">${escapeHtml(product.description[state.lang] || product.description.tr)}</p>
          <div class="product-card-actions">
            <button class="product-details" type="button" data-details="${escapeHtml(product.id)}">${escapeHtml(t("productDetails"))} <span aria-hidden="true">↗</span></button>
            <a class="product-wa" href="${escapeHtml(waUrl(productMessage(product)))}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 3.6A11.7 11.7 0 0 0 2 17.7L.5 23.2l5.6-1.5A11.7 11.7 0 0 0 20.4 3.6ZM12 21a9.7 9.7 0 0 1-5-1.4l-.4-.2-3.3.9.9-3.2-.2-.5A9.7 9.7 0 1 1 12 21Zm5.3-7.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.5-.1-.6.2-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.2-1.4-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4H8c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4.1.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"/></svg>
              ${escapeHtml(t("productWhatsApp"))}
            </a>
          </div>
        </div>
      </article>`).join("");

    emptyState.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
    const countLabel = filtered.length === 1 ? t("resultSingular") : t("resultPlural");
    resultsCount.textContent = `${filtered.length} ${countLabel}`;
    const countEl = document.getElementById("allCount");
    if (countEl) countEl.textContent = String(PRODUCTS.length).padStart(2, "0");
  }

  function setLanguage(language) {
    state.lang = language === "en" ? "en" : "tr";
    document.documentElement.lang = state.lang;
    document.title = t("pageTitle");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t("pageDescription");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = t("pageTitle");
    if (ogDesc) ogDesc.content = t("pageDescription");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[state.lang][key] !== undefined) element.innerHTML = translations[state.lang][key];
    });
    document.querySelectorAll("[data-placeholder-tr]").forEach((element) => {
      element.placeholder = state.lang === "tr" ? element.dataset.placeholderTr : element.dataset.placeholderEn;
    });
    document.querySelectorAll("[data-alt-tr]").forEach((image) => {
      image.alt = state.lang === "tr" ? image.dataset.altTr : image.dataset.altEn;
    });
    if (languageLabel) languageLabel.textContent = t("languageName");
    if (languageToggle) {
      languageToggle.querySelector(".flag").textContent = t("languageFlag");
      languageToggle.setAttribute("aria-label", t("languageAria"));
    }
    const mobileToggle = document.getElementById("mobileMenuToggle");
    if (mobileToggle) mobileToggle.setAttribute("aria-label", state.lang === "tr" ? "Menüyü aç" : "Open menu");
    const brandHome = document.querySelector(".header-inner .brand");
    if (brandHome) brandHome.setAttribute("aria-label", state.lang === "tr" ? "Hidayeti Prinç ana sayfa" : "Hidayeti Prinç home page");
    const desktopNav = document.querySelector(".desktop-nav");
    if (desktopNav) desktopNav.setAttribute("aria-label", state.lang === "tr" ? "Ana menü" : "Main navigation");
    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav) mobileNav.setAttribute("aria-label", state.lang === "tr" ? "Mobil menü" : "Mobile menu");
    const familyTabs = document.querySelector(".family-tabs");
    if (familyTabs) familyTabs.setAttribute("aria-label", state.lang === "tr" ? "Ürün ailesi filtresi" : "Product family filter");
    const scrollCue = document.querySelector(".scroll-cue");
    if (scrollCue) scrollCue.setAttribute("aria-label", state.lang === "tr" ? "Ürünlere kaydır" : "Scroll to products");
    const dialogClose = document.getElementById("dialogClose");
    if (dialogClose) dialogClose.setAttribute("aria-label", state.lang === "tr" ? "Pencereyi kapat" : "Close dialog");
    const wSelect = document.getElementById("weightFilter");
    if (wSelect) wSelect.setAttribute("aria-label", t("sizeLabel"));
    const searchLabel = document.querySelector(".search-control");
    if (searchLabel) searchLabel.setAttribute("aria-label", t("searchLabel"));
    updateStaticLinks();
    renderProducts();
  }

  function openProductDialog(productId) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    const name = product.name[state.lang] || product.name.tr;
    const description = product.description[state.lang] || product.description.tr;
    dialogContent.innerHTML = `
      <div class="dialog-image-wrap"><img src="${escapeHtml(ASSET_PREFIX + product.image)}" alt="${escapeHtml(product.alt[state.lang] || product.alt.tr)}" width="600" height="720"></div>
      <div class="dialog-copy">
        <span class="product-family">${escapeHtml(familyLabel(product))} · ${escapeHtml(t("productDemo"))}</span>
        <h2 id="dialogTitle">${escapeHtml(name)}</h2>
        <p>${escapeHtml(description)}</p>
        <p>${escapeHtml(t("demoDetails"))}</p>
        <div class="dialog-spec"><span>${escapeHtml(t("productWeight"))}</span><strong>${escapeHtml(product.weight)}</strong></div>
        <div class="dialog-spec"><span>${escapeHtml(t("productType"))}</span><strong>${escapeHtml(t("basmatiRice"))}</strong></div>
        <a class="button button-dark" href="${escapeHtml(waUrl(productMessage(product)))}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("dialogWhatsapp"))} <span aria-hidden="true">↗</span></a>
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "open");
  }

  document.addEventListener("click", (event) => {
    const familyButton = event.target.closest("[data-family]");
    if (familyButton) {
      state.family = familyButton.dataset.family;
      document.querySelectorAll("[data-family]").forEach((button) => {
        const active = button.dataset.family === state.family;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      renderProducts();
    }
    const detailButton = event.target.closest("[data-details]");
    if (detailButton) openProductDialog(detailButton.dataset.details);
  });

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    renderProducts();
  });
  weightFilter.addEventListener("change", () => {
    state.weight = weightFilter.value;
    renderProducts();
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    state.family = "all";
    state.weight = "all";
    state.query = "";
    searchInput.value = "";
    weightFilter.value = "all";
    document.querySelectorAll("[data-family]").forEach((button) => {
      const active = button.dataset.family === "all";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderProducts();
  });

  languageToggle.addEventListener("click", () => {
    // Use separate crawlable language URLs while preserving the one-page experience.
    window.location.href = state.lang === "tr" ? "en/index.html" : "../index.html";
  });

  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileNav = document.getElementById("mobileNav");
  mobileToggle.addEventListener("click", () => {
    const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }));

  document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Lightweight section reveal on scroll. The site remains visible if reduced
  // motion is enabled or if IntersectionObserver is unavailable.
  const motionPreference = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: no-preference)").matches : true;
  if (motionPreference && "IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
      ".hero-bottom, .products-heading, .catalog-tools, .catalog-status, .catalog-bottom-note, .range-heading, .range-layout, .audience-heading, .audience-card, .how-intro, .how-step, .brand-visual, .brand-copy-main, .brand-fact, .contact-panel, .site-footer"
    );
    document.documentElement.classList.add("has-scroll-reveal");
    revealTargets.forEach((element) => element.classList.add("reveal-on-scroll"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  setLanguage(state.lang);
})();

(function () {
  "use strict";

  const CONFIG = window.SITE_CONFIG || { whatsappNumber: "905344641463" };
  const PRODUCTS = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const ASSET_PREFIX = document.documentElement.dataset.assetPrefix || "";
  const translations = {
    tr: {
      skip: "İçeriğe geç", brandLine: "BASMATİ PİRİNÇ", navProducts: "Ürünlerimiz", navAbout: "Hakkımızda", navFaq: "SSS", navContact: "İletişim",
      headerWhatsapp: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> WhatsApp", floatingWhatsapp: "WhatsApp'tan yazın", mobileWhatsapp: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> WhatsApp üzerinden ulaşın",
      heroEyebrow: "HİDAYETİ PRİNÇ · BASMATİ", heroTitle: "Basmati pirinç ürünlerini <em>keşfedin.</em>",
      heroDescription: "Hidayeti Prinç ve Buharı Prinç ürün seçeneklerini inceleyin. Ürün detayları ve fiyat bilgisi için bize doğrudan ulaşın.",
      heroPrimary: "Ürünleri keşfet <span aria-hidden=\"true\">↓</span>", heroSecondary: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> WhatsApp'tan bilgi al",
      heroFootnote: "5 kg, 10 kg, 20 kg ve 40 kg paket seçenekleri", stampTop: "BASMATİ", stampBottom: "PİRİNÇ", imageCaption: "Basmati pirinç ürünleri",
      heroNoteOne: "Ürün odaklı katalog", heroNoteTwo: "Türkçe & English", heroNoteThree: "WhatsApp ile iletişim", scroll: "AŞAĞI KAYDIR",
      productsEyebrow: "ÜRÜN KATALOĞU", productsTitle: "Size uygun <em>paketi</em> bulun.",
      productsIntro: "Ürün ailelerini inceleyin, paket boyutunu seçin ve fiyat bilgisi için WhatsApp üzerinden bize ulaşın.",
      filterAll: "Tüm ürünler <span class=\"chip-count\" id=\"allCount\">04</span>", filterHidayeti: "Hidayeti Prinç", filterBuhari: "Buharı Prinç",
      searchLabel: "Ürün ara", sizeLabel: "Paket boyutu", sizeAll: "Tüm boyutlar",
      emptyTitle: "Ürün bulunamadı", emptyDescription: "Aramanızı veya filtrelerinizi değiştirmeyi deneyin.", resetFilters: "Filtreleri temizle ↗",
      catalogFootnote: "",
      rangeEyebrow: "BASMATİ ÜRÜN AİLESİ", rangeTitle: "Basmati pirinçte <em>net seçenekler.</em>",
      rangeIntro: "Hidayeti Prinç ve Buharı Prinç ürün ailelerini inceleyin. Paket seçenekleri ve ürün detayları için bizimle doğrudan iletişime geçin.",
      rangePhotoLabel: "PAKET SEÇENEKLERİ", rangePointOneTitle: "İki ürün ailesi", rangePointOneText: "Hidayeti Prinç ve Buharı Prinç seçeneklerini tek bir katalogda karşılaştırın.",
      rangePointTwoTitle: "5 kg, 10 kg, 20 kg ve 40 kg", rangePointTwoText: "Size uygun paket boyutunu seçin ve ürün detayları için bize ulaşın.",
      rangePointThreeTitle: "Doğrudan iletişim", rangePointThreeText: "Fiyat, stok ve ürün bilgilerini WhatsApp üzerinden sorun; ayrıntıları işletmeyle doğrulayın.", rangeCta: "Kataloğa dön",
      audienceEyebrow: "KİMLER İÇİN?", audienceTitle: "İhtiyacınız ne olursa olsun, <em>ürünlerden başlayın.</em>",
      audienceIntro: "Bireysel müşteriler, işletmeler ve toptan alım yapanlar ürün seçeneklerini inceleyebilir ve detayları doğrudan sorabilir.",
      audienceHomeTitle: "Bireysel müşteriler", audienceHomeText: "Paket seçeneklerine göz atın ve size uygun ürünle ilgili bilgi isteyin.",
      audienceWholesaleTitle: "Toptan alım yapanlar", audienceWholesaleText: "Ürün seçenekleri, paketler ve fiyatlandırma hakkında doğrudan görüşün.",
      audienceBusinessTitle: "İşletmeler", audienceBusinessText: "Ürün bilgisi ve teklif talebinizi Hidayeti Prinç ekibine iletin.",
      audienceProductsCta: "Ürünleri incele", audienceContactCta: "İletişime geç",
      howEyebrow: "BASİT VE DOĞRUDAN", howTitle: "Ürünü seçin. <em>Bizimle konuşun.</em>",
      howIntro: "Site üzerinden ödeme yok. Ürün seçiminizi yapın, WhatsApp'tan sorun ve ayrıntıları doğrudan netleştirin.", howCta: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> WhatsApp'tan iletişime geç",
      howStepOneTitle: "Ürünleri keşfedin", howStepOneText: "Katalogda Hidayeti Prinç ve Buharı Prinç seçeneklerini inceleyin.",
      howStepTwoTitle: "Paketinizi seçin", howStepTwoText: "5 kg, 10 kg, 20 kg veya 40 kg seçeneğini açın ve ürünle ilgili bilgileri görüntüleyin.",
      howStepThreeTitle: "WhatsApp'tan sorun", howStepThreeText: "Ürün adı hazır mesajda yer alır. Mesajı kontrol edip gönderin; fiyat ve uygunluk bilgisini doğrudan alın.",
      brandFactOneTitle: "Ürün odaklı yaklaşım", brandFactOneText: "Ürün aileleri ve paket bilgileri kolayca görüntülenebilir.",
      brandFactTwoTitle: "Açık ürün bilgisi", brandFactTwoText: "Gerçek ürün detayları, teknik bilgiler ve fotoğraflar burada güncellenebilir.",
      brandFactThreeTitle: "Doğrudan iletişim", brandFactThreeText: "Fiyat ve ürün soruları doğrudan WhatsApp üzerinden iletilebilir.",
      aboutEyebrow: "MARKAMIZ", aboutTitle: "Hidayeti Prinç'i <em>tanıyın.</em>",
      aboutLead: "Hidayeti Prinç olarak Basmati pirinç ürünlerimizi anlaşılır ürün bilgileri ve farklı paket seçenekleriyle müşterilerimize sunuyoruz.",
      aboutBody: "Hidayeti Prinç ve Buharı Prinç Basmati ürün ailelerini farklı paket boyutlarıyla tek bir katalogda buluşturuyoruz. Güncel fiyat, stok ve teslimat ayrıntıları için WhatsApp üzerinden bizimle iletişime geçebilirsiniz.",
      aboutCta: "Bize ulaşın", brandCardLabel: "HİDAYETİ PRİNÇ", brandCardLine: "Basmati pirinç üreticisi", brandCardBottom: "BASMATİ · 5 / 10 / 20 / 40 KG",
      faqEyebrow: "SIK SORULAN SORULAR", faqTitle: "Aklınızdaki sorulara <em>yanıt bulalım.</em>", faqIntro: "Ürün seçenekleri, fiyat bilgisi ve iletişim süreci hakkında kısa yanıtlar.",
      faqQuestionProducts: "Hangi Basmati pirinç ürünleri mevcut?", faqAnswerProducts: "Katalogda Hidayeti Prinç ve Buharı Prinç ürün ailelerinin 5 kg, 10 kg, 20 kg ve 40 kg seçenekleri yer alıyor.",
      faqQuestionPrice: "Fiyat bilgisini nasıl alabilirim?", faqAnswerPrice: "İlgilendiğiniz ürünün WhatsApp düğmesine tıklayın. Ürün adı hazır mesaja eklenir; güncel fiyatı sormak için mesajı gönderin.",
      faqQuestionWholesale: "Toptan alım için iletişime geçebilir miyim?", faqAnswerWholesale: "Bireysel müşteriler, işletmeler ve toptan alım yapanlar ürün bilgisi ve fiyat teklifi için doğrudan bizimle görüşebilir.",
      faqQuestionOrder: "Web sitesinden ödeme yapabilir miyim?", faqAnswerOrder: "Bu site ürün kataloğu ve iletişim için tasarlanmıştır. Fiyat, stok ve teslimat ayrıntılarını sipariş öncesinde WhatsApp üzerinden görüşebilirsiniz.",
      contactEyebrow: "İLETİŞİM", contactTitle: "Bir ürün hakkında <em>konuşalım.</em>",
      contactDescription: "Ürün detayları ve fiyat teklifi için bize WhatsApp'tan yazın. Mesajınızı birlikte netleştirelim.",
      contactWhatsapp: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> WhatsApp'tan yazın", phoneLabel: "Telefon / WhatsApp", contactSideNote: "Hidayeti Prinç<br> Basmati pirinç ürünleri",
      footerLine: "Basmati pirinç ürünlerini keşfedin.", backTop: "Yukarı dön",
      productDetails: "Ürün detayları", productWhatsApp: "WhatsApp'tan sor", productWeight: "Paket ağırlığı", productType: "Ürün kategorisi", basmatiRice: "Basmati pirinç",
      packageViewsText: "Ön ve arka ambalaj görünümünü inceleyebilir, ürün bilgisi ve fiyat teklifi için bize ulaşabilirsiniz.",
      dialogWhatsapp: "WhatsApp'tan bilgi ve fiyat alın", languageName: "English", languageFlag: "🇺🇸", languageAria: "Switch to English",
      resultSingular: "ürün", resultPlural: "ürün", searchPlaceholder: "Ürün ara...", familyHidayeti: "HİDAYETİ PRİNÇ", familyBuhari: "BUHARI PRİNÇ",
      generalMessage: "Merhaba, Hidayeti Prinç Basmati pirinç ürünleri hakkında bilgi ve fiyat almak istiyorum.", productMessagePrefix: "Merhaba, ", productMessageSuffix: " ürünü hakkında bilgi ve fiyat almak istiyorum.",
      themeToDark: "Koyu temaya geç", themeToLight: "Açık temaya geç", pageTitle: "Hidayeti Prinç | Basmati Pirinç Ürünleri", pageDescription: "Hidayeti Prinç Basmati pirinç ürünlerini keşfedin. 5 kg, 10 kg, 20 kg ve 40 kg ürün seçenekleri hakkında bilgi ve fiyat için WhatsApp'tan bize ulaşın."
    },
    en: {
      skip: "Skip to content", brandLine: "BASMATI RICE", navProducts: "Our products", navAbout: "About us", navFaq: "FAQ", navContact: "Contact",
      headerWhatsapp: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> WhatsApp", floatingWhatsapp: "Message us on WhatsApp", mobileWhatsapp: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> Contact us on WhatsApp",
      heroEyebrow: "HIDAYETI PRINÇ · BASMATI", heroTitle: "Discover our <em>Basmati rice.</em>",
      heroDescription: "Explore Hidayeti Prinç and Buharı Prinç product options. Contact us directly for product details and a quote.",
      heroPrimary: "Explore products <span aria-hidden=\"true\">↓</span>", heroSecondary: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> Ask us on WhatsApp",
      heroFootnote: "Available in 5 kg, 10 kg, 20 kg and 40 kg packs", stampTop: "BASMATI", stampBottom: "RICE", imageCaption: "Basmati rice products",
      heroNoteOne: "Product-focused catalogue", heroNoteTwo: "Turkish & English", heroNoteThree: "Contact via WhatsApp", scroll: "SCROLL TO EXPLORE",
      productsEyebrow: "PRODUCT CATALOGUE", productsTitle: "Find your <em>pack size.</em>",
      productsIntro: "Browse our product ranges, choose a pack size, and contact us on WhatsApp for pricing.",
      filterAll: "All products <span class=\"chip-count\" id=\"allCount\">04</span>", filterHidayeti: "Hidayeti Prinç", filterBuhari: "Buharı Prinç",
      searchLabel: "Search products", sizeLabel: "Pack size", sizeAll: "All sizes",
      emptyTitle: "No products found", emptyDescription: "Try changing your search or filters.", resetFilters: "Clear filters ↗",
      catalogFootnote: "",
      rangeEyebrow: "THE BASMATI RANGE", rangeTitle: "Clear choices for <em>Basmati rice.</em>",
      rangeIntro: "Explore the Hidayeti Prinç and Buharı Prinç ranges. Contact us directly for pack options and product details.",
      rangePhotoLabel: "AVAILABLE PACK SIZES", rangePointOneTitle: "Two product ranges", rangePointOneText: "Browse Hidayeti Prinç and Buharı Prinç options in one catalogue.",
      rangePointTwoTitle: "5 kg, 10 kg, 20 kg and 40 kg", rangePointTwoText: "Choose the pack size that suits you and contact us for product details.",
      rangePointThreeTitle: "Direct contact", rangePointThreeText: "Ask about pricing, availability, and product details on WhatsApp; confirm details directly with the business.", rangeCta: "Back to catalogue",
      audienceEyebrow: "WHO WE SERVE", audienceTitle: "Whatever your needs, <em>start with the products.</em>",
      audienceIntro: "Individual customers, businesses, and wholesale buyers can explore the range and ask us directly for details.",
      audienceHomeTitle: "Individual customers", audienceHomeText: "Browse pack options and ask about the product that suits your needs.",
      audienceWholesaleTitle: "Wholesale buyers", audienceWholesaleText: "Discuss product options, packs, and pricing directly with us.",
      audienceBusinessTitle: "Businesses", audienceBusinessText: "Send your product questions and quote request to Hidayeti Prinç.",
      audienceProductsCta: "Explore products", audienceContactCta: "Contact us",
      howEyebrow: "SIMPLE AND DIRECT", howTitle: "Choose a product. <em>Talk to us.</em>",
      howIntro: "There is no online checkout. Choose a product, ask us on WhatsApp, and confirm the details directly.", howCta: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> Contact us on WhatsApp",
      howStepOneTitle: "Explore the products", howStepOneText: "Browse Hidayeti Prinç and Buharı Prinç options in the catalogue.",
      howStepTwoTitle: "Choose your pack", howStepTwoText: "Choose a 5 kg, 10 kg, 20 kg or 40 kg pack to see its product information.",
      howStepThreeTitle: "Ask on WhatsApp", howStepThreeText: "The product name is included in a draft message. Review and send it to ask directly about pricing and availability.",
      brandFactOneTitle: "Product-focused", brandFactOneText: "Product ranges and pack information are easy to browse.",
      brandFactTwoTitle: "Clear product details", brandFactTwoText: "Real product details, specifications, and photographs can be updated here.",
      brandFactThreeTitle: "Direct contact", brandFactThreeText: "Product and pricing questions can be sent directly through WhatsApp.",
      aboutEyebrow: "ABOUT THE BRAND", aboutTitle: "Get to know <em>Hidayeti Prinç.</em>",
      aboutLead: "As a rice manufacturer, Hidayeti Prinç brings its Basmati rice product ranges together with clear information and practical pack options.",
      aboutBody: "We bring the Hidayeti Prinç and Buharı Prinç Basmati ranges together in one catalogue with multiple pack sizes. Contact us on WhatsApp for current prices, availability, and delivery details.",
      aboutCta: "Get in touch", brandCardLabel: "HIDAYETI PRINÇ", brandCardLine: "Basmati rice manufacturer", brandCardBottom: "BASMATI · 5 / 10 / 20 / 40 KG",
      faqEyebrow: "FREQUENTLY ASKED QUESTIONS", faqTitle: "A few helpful <em>answers.</em>", faqIntro: "Quick answers about product options, pricing, and how to contact us.",
      faqQuestionProducts: "Which Basmati rice products are available?", faqAnswerProducts: "The catalogue includes the Hidayeti Prinç and Buharı Prinç product ranges in 5 kg, 10 kg, 20 kg and 40 kg packs.",
      faqQuestionPrice: "How can I ask about pricing?", faqAnswerPrice: "Click the WhatsApp button on the product you are interested in. The product name is added to a draft message; send it to ask for current pricing.",
      faqQuestionWholesale: "Can wholesale buyers get in touch?", faqAnswerWholesale: "Individual customers, businesses, and wholesale buyers can contact us directly for product information and quote requests.",
      faqQuestionOrder: "Can I pay directly on the website?", faqAnswerOrder: "This website is designed for product browsing and direct contact. Confirm prices, availability, and delivery details with us on WhatsApp before ordering.",
      contactEyebrow: "CONTACT", contactTitle: "Let's talk about <em>your product.</em>",
      contactDescription: "Message us on WhatsApp for product details and a quote. We’ll help you find the information you need.",
      contactWhatsapp: "<svg class='whatsapp-icon' viewBox='0 0 24 24' aria-hidden='true' focusable='false'><path d='M20.52 3.48A11.75 11.75 0 0 0 2.03 17.62L.5 23.5l6.02-1.58a11.75 11.75 0 0 0 14-18.44ZM12 21.1a9.1 9.1 0 0 1-4.64-1.27l-.34-.2-3.57.94.95-3.48-.22-.36A9.1 9.1 0 1 1 12 21.1Zm5-6.82c-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32Z' fill='currentColor'/></svg> Message us on WhatsApp", phoneLabel: "Phone / WhatsApp", contactSideNote: "Hidayeti Prinç<br> Basmati rice products",
      footerLine: "Discover our Basmati rice products.", backTop: "Back to top",
      productDetails: "Product details", productWhatsApp: "Ask on WhatsApp", productWeight: "Pack weight", productType: "Product category", basmatiRice: "Basmati rice",
      packageViewsText: "Explore the front and back of the package, and contact us for product information and a quote.",
      dialogWhatsapp: "Ask for details and a quote on WhatsApp", languageName: "Türkçe", languageFlag: "🇹🇷", languageAria: "Türkçe'ye geç",
      resultSingular: "product", resultPlural: "products", searchPlaceholder: "Search products...", familyHidayeti: "HIDAYETI PRINÇ", familyBuhari: "BUHARI PRINÇ",
      generalMessage: "Hello, I would like information and a quote for Hidayeti Prinç Basmati rice products.", productMessagePrefix: "Hello, I would like information and a quote for ", productMessageSuffix: ".",
      themeToDark: "Switch to dark mode", themeToLight: "Switch to light mode", pageTitle: "Hidayeti Prinç | Basmati Rice Products", pageDescription: "Explore Hidayeti Prinç Basmati rice products. Contact us on WhatsApp for information and quotes on 5 kg, 10 kg, 20 kg and 40 kg packs."
    }
  };


  // Follow system theme by default, but let visitors choose and remember an override.
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const colorSchemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const themeToggle = document.getElementById("themeToggle");
  const rootElement = document.documentElement;
  const themeStorageKey = "hidayeti-theme-preference";
  const state = { lang: document.documentElement.lang === "en" ? "en" : "tr", family: "all", weight: "all", query: "" };

  function updateThemeColor(theme) {
    const isDark = (theme || rootElement.dataset.theme) === "dark";
    if (themeColorMeta) themeColorMeta.content = isDark ? "#111a13" : "#f5f2e9";
    rootElement.style.colorScheme = isDark ? "dark" : "light";
  }
  function storedThemePreference() {
    try {
      const saved = localStorage.getItem(themeStorageKey);
      return saved === "dark" || saved === "light" ? saved : "system";
    } catch (error) { return "system"; }
  }
  function applyTheme(theme, mode) {
    const safeTheme = theme === "dark" ? "dark" : "light";
    rootElement.dataset.theme = safeTheme;
    rootElement.dataset.themeMode = mode || rootElement.dataset.themeMode || "system";
    updateThemeColor(safeTheme);
    updateThemeButton();
  }
  function updateThemeButton() {
    if (!themeToggle) return;
    const dark = rootElement.dataset.theme === "dark";
    const label = dark ? t("themeToLight") : t("themeToDark");
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
    themeToggle.setAttribute("aria-pressed", String(dark));
  }
  updateThemeColor(rootElement.dataset.theme);
  updateThemeButton();
  if (colorSchemeQuery) {
    const handleSystemThemeChange = (event) => {
      if (rootElement.dataset.themeMode === "system" && storedThemePreference() === "system") {
        applyTheme(event.matches ? "dark" : "light", "system");
      }
    };
    if (typeof colorSchemeQuery.addEventListener === "function") colorSchemeQuery.addEventListener("change", handleSystemThemeChange);
    else if (typeof colorSchemeQuery.addListener === "function") colorSchemeQuery.addListener(handleSystemThemeChange);
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, "manual");
      try { localStorage.setItem(themeStorageKey, nextTheme); } catch (error) { /* Theme still switches for this page view. */ }
    });
  }

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
          <div class="package-flip" tabindex="0" role="button" aria-label="${escapeHtml(state.lang === "tr" ? "Ambalajın ön ve arka yüzünü değiştir" : "Flip package to show front or back")}" aria-pressed="false">
            <div class="package-flip-inner">
              <div class="package-face package-front"><img class="product-image" src="${escapeHtml(ASSET_PREFIX + product.image)}" alt="${escapeHtml(product.alt[state.lang] || product.alt.tr)}" loading="lazy" width="600" height="720"><span class="face-label">${escapeHtml(state.lang === "tr" ? "ÖN YÜZ" : "FRONT")}</span></div>
              <div class="package-face package-back"><img class="product-image" src="${escapeHtml(ASSET_PREFIX + product.backImage)}" alt="${escapeHtml(product.backAlt[state.lang] || product.backAlt.tr)}" loading="lazy" width="600" height="720"><span class="face-label">${escapeHtml(state.lang === "tr" ? "ARKA YÜZ" : "BACK")}</span></div>
            </div>
          </div>
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
    updateThemeButton();
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
      <div class="dialog-image-wrap dialog-package-views"><figure><img src="${escapeHtml(ASSET_PREFIX + product.image)}" alt="${escapeHtml(product.alt[state.lang] || product.alt.tr)}" width="600" height="720"><figcaption>${escapeHtml(state.lang === "tr" ? "Ön yüz" : "Front")}</figcaption></figure><figure><img src="${escapeHtml(ASSET_PREFIX + product.backImage)}" alt="${escapeHtml(product.backAlt[state.lang] || product.backAlt.tr)}" width="600" height="720"><figcaption>${escapeHtml(state.lang === "tr" ? "Arka yüz" : "Back")}</figcaption></figure></div>
      <div class="dialog-copy">
        <span class="product-family">${escapeHtml(familyLabel(product))} · ${escapeHtml(t("basmatiRice"))}</span>
        <h2 id="dialogTitle">${escapeHtml(name)}</h2>
        <p>${escapeHtml(description)}</p>
        <p>${escapeHtml(t("packageViewsText"))}</p>
        <div class="dialog-spec"><span>${escapeHtml(t("productWeight"))}</span><strong>${escapeHtml(product.weight)}</strong></div>
        <div class="dialog-spec"><span>${escapeHtml(t("productType"))}</span><strong>${escapeHtml(t("basmatiRice"))}</strong></div>
        <a class="button button-dark" href="${escapeHtml(waUrl(productMessage(product)))}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("dialogWhatsapp"))} <span aria-hidden="true">↗</span></a>
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "open");
  }

  document.addEventListener("click", (event) => {
    const flip = event.target.closest(".package-flip");
    if (flip) {
      flip.classList.toggle("is-flipped");
      flip.setAttribute("aria-pressed", String(flip.classList.contains("is-flipped")));
    }
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

  document.addEventListener("keydown", (event) => {
    const flip = event.target.closest && event.target.closest(".package-flip");
    if (flip && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); flip.classList.toggle("is-flipped"); flip.setAttribute("aria-pressed", String(flip.classList.contains("is-flipped"))); }
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
      ".hero-bottom, .products-heading, .catalog-tools, .catalog-status, .catalog-bottom-note, .range-heading, .range-layout, .audience-heading, .audience-card, .how-intro, .how-step, .brand-visual, .brand-copy-main, .brand-fact, .faq-heading, .faq-item, .contact-panel, .site-footer"
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

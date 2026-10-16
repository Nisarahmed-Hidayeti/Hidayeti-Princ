(function () {
  "use strict";
  const products = structuredClone(window.PRODUCTS || []);
  const form = document.getElementById("productForm");
  const list = document.getElementById("productList");
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  const preview = document.getElementById("preview");
  let selected = null;
  let formDirty = false;
  let catalogueDirty = false;
  const field = name => form.elements.namedItem(name);
  const pathIsValid = path => /^assets\/products\/[a-zA-Z0-9_\-/. ]+\.(png|jpe?g|webp|avif|svg)$/i.test(path) && !path.includes("..");

  function renderList() {
    list.replaceChildren();
    document.getElementById("count").textContent = `(${products.length})`;
    products.forEach(product => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = product.name.tr;
      button.setAttribute("aria-current", String(product.id === selected));
      const size = document.createElement("small");
      size.textContent = `${product.family === "buhari" ? "Buharı" : "Hidayeti"} · ${product.weight}`;
      button.append(size);
      button.addEventListener("click", () => { if (canLeaveForm()) selectProduct(product); });
      list.append(button);
    });
  }

  function canLeaveForm() {
    return !formDirty || window.confirm("Discard the unsaved changes in this form?");
  }

  function updatePreview() {
    const path = field("image").value.trim();
    preview.hidden = !pathIsValid(path);
    if (!preview.hidden) preview.src = path;
  }
  preview.addEventListener("error", () => { preview.hidden = true; });

  function selectProduct(product) {
    selected = product ? product.id : null;
    form.reset();
    const values = product ? {
      family: product.family, weight: parseFloat(product.weight), nameTr: product.name.tr,
      nameEn: product.name.en, descriptionTr: product.description.tr, descriptionEn: product.description.en,
      image: product.image, backImage: product.backImage
    } : { family: "hidayeti" };
    Object.entries(values).forEach(([name, value]) => { field(name).value = value; });
    formDirty = false;
    error.hidden = true;
    document.getElementById("formTitle").textContent = product ? "Edit product" : "Add a product";
    document.getElementById("remove").disabled = !product;
    updatePreview();
    renderList();
  }

  form.addEventListener("input", () => { formDirty = true; updatePreview(); });
  document.getElementById("add").addEventListener("click", () => {
    if (canLeaveForm()) { selectProduct(null); field("nameTr").focus(); }
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const read = name => field(name).value.trim();
    const image = read("image"), backImage = read("backImage");
    const name = { tr: read("nameTr"), en: read("nameEn") };
    const description = { tr: read("descriptionTr"), en: read("descriptionEn") };
    let message = "";
    if (!name.tr || !name.en || !description.tr || !description.en) message = "Please fill in both names and descriptions.";
    if (!pathIsValid(image) || !pathIsValid(backImage)) message = "Use an image path inside assets/products/, such as assets/products/rice-front.png.";
    const family = read("family");
    const weight = `${Number(read("weight"))} kg`;
    const baseId = `${family}-basmati-${Number(read("weight"))}kg`;
    let id = selected || baseId;
    let suffix = 2;
    while (!selected && products.some(product => product.id === id)) id = `${baseId}-${suffix++}`;
    if (products.some(product => product.id !== selected && product.family === family && product.weight === weight)) message = "This family already has that pack size. Select it in the list to edit it.";
    if (message) { error.textContent = message; error.hidden = false; return; }
    const previous = products.find(product => product.id === selected);
    const product = {
      ...previous, id, slug: previous?.slug || id, family, category: "basmati", weight, name, description, image, backImage,
      alt: { tr: `${name.tr} ön ambalaj`, en: `${name.en} front package` },
      backAlt: { tr: `${name.tr} arka ambalaj`, en: `${name.en} back package` }
    };
    if (selected) products[products.findIndex(product => product.id === selected)] = product;
    else products.push(product);
    catalogueDirty = true;
    selectProduct(product);
    status.textContent = "Product saved in this session. Download products.js to keep your changes.";
  });

  document.getElementById("remove").addEventListener("click", () => {
    if (!selected || !window.confirm("Remove this product from the catalogue?")) return;
    products.splice(products.findIndex(product => product.id === selected), 1);
    catalogueDirty = true;
    selectProduct(products[0] || null);
    status.textContent = "Product removed in this session. Download products.js to keep your changes.";
  });

  document.getElementById("download").addEventListener("click", () => {
    if (formDirty) { status.textContent = "Save the product first, then download the catalogue."; return; }
    const source = "/* Edit this catalogue with editor.html. */\nwindow.SITE_CONFIG = " +
      JSON.stringify(window.SITE_CONFIG || {}, null, 2) + ";\nwindow.PRODUCTS = " + JSON.stringify(products, null, 2) + ";\n";
    const url = URL.createObjectURL(new Blob([source], { type: "text/javascript;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "products.js";
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    catalogueDirty = false;
    status.textContent = "Download requested. Replace data/products.js with the downloaded file, then publish your changed files.";
  });
  window.addEventListener("beforeunload", event => {
    if (formDirty || catalogueDirty) { event.preventDefault(); event.returnValue = ""; }
  });
  selectProduct(products[0] || null);
})();

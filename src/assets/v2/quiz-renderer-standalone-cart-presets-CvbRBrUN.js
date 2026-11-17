const STOREFRONT_REQUEST = {
  credentials: "same-origin",
  mode: "same-origin",
  redirect: "error"
};
function entityId(value) {
  const id = Number(value);
  return /^[1-9]\d*$/.test(value) && Number.isSafeInteger(id) ? id : void 0;
}
function primaryForm(page, selector) {
  const forms = page.querySelectorAll(selector);
  return forms.length === 1 ? forms[0] : void 0;
}
function pageId(page, selector) {
  const ids = new Set(
    Array.from(page.querySelectorAll(selector), (input) => input.value)
  );
  return ids.size === 1 ? entityId([...ids][0]) : void 0;
}
function hasOptionFields(page, prefixes) {
  return Array.from(page.querySelectorAll("[name]")).some(
    (field) => prefixes.some((prefix) => {
      var _a;
      return (_a = field.getAttribute("name")) == null ? void 0 : _a.startsWith(prefix);
    })
  );
}
async function productPage(item) {
  try {
    const url = new URL(item.url, window.location.href);
    if (url.origin !== window.location.origin) return;
    const response = await fetch(url.href, STOREFRONT_REQUEST);
    if (!response.ok) return;
    const page = new DOMParser().parseFromString(await response.text(), "text/html");
    return { url, page };
  } catch {
  }
}
async function jsonResponse(response) {
  if (!response.ok) throw new Error(`Store cart: HTTP ${response.status}`);
  return response.json();
}
function ownPath(value) {
  try {
    const url = new URL(value, window.location.href);
    return url.origin === window.location.origin ? url.href : void 0;
  } catch {
    return void 0;
  }
}
async function magento(item) {
  var _a, _b;
  if (item.feedItemGroupId) return false;
  const source = await productPage(item);
  if (!source) return false;
  const form = primaryForm(source.page, "form#product_addtocart_form");
  if (!form) return false;
  const product = pageId(form, 'input[name="product"]');
  if (!product || hasOptionFields(form, ["super_attribute[", "options[", "bundle_option["]))
    return false;
  const key = ((_a = document.cookie.split("; ").find((part) => part.startsWith("form_key="))) == null ? void 0 : _a.slice(9)) || ((_b = form == null ? void 0 : form.querySelector('input[name="form_key"]')) == null ? void 0 : _b.value);
  if (!key) return false;
  const quantity = async () => {
    var _a2;
    const sections = await jsonResponse(
      await fetch("/customer/section/load/?sections=cart&force_new_section_timestamp=true", {
        ...STOREFRONT_REQUEST,
        cache: "no-store"
      })
    );
    if (!Array.isArray((_a2 = sections.cart) == null ? void 0 : _a2.items)) throw new Error("Magento cart could not be read");
    return sections.cart.items.reduce(
      (total, line) => String(line.product_id) === String(product) ? total + Number(line.qty) : total,
      0
    );
  };
  const before = await quantity();
  const response = await jsonResponse(
    await fetch("/checkout/cart/add", {
      ...STOREFRONT_REQUEST,
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      body: new URLSearchParams({
        product: String(product),
        qty: String(item.quantity),
        form_key: decodeURIComponent(key)
      })
    })
  );
  const after = await quantity();
  if (response.error || !Number.isFinite(before) || !Number.isFinite(after) || after < before + item.quantity)
    throw new Error("Magento could not add this product");
  try {
    const require2 = window.require;
    require2 == null ? void 0 : require2(["Magento_Customer/js/customer-data"], (data) => {
      try {
        data.reload(["cart"], true);
      } catch {
      }
    });
  } catch {
  }
  return true;
}
async function prestashop(item) {
  var _a, _b, _c, _d;
  const source = await productPage(item);
  if (!source) return false;
  const form = primaryForm(source.page, "form#add-to-cart-or-refresh");
  if (!form) return false;
  const product = pageId(form, 'input[name="id_product"]');
  if (!product) return false;
  const combination = /^([1-9]\d*)[_-]([1-9]\d*)$/.exec(item.sku);
  let attribute = 0;
  if (combination) {
    const selected = pageId(form, 'input[name="id_product_attribute"]');
    if (!selected || entityId(combination[1]) !== product || entityId(combination[2]) !== selected)
      return false;
    attribute = selected;
  } else if (item.feedItemGroupId || Array.from(form.querySelectorAll('input[name="id_product_attribute"]')).some(
    (input) => input.value !== "0"
  ) || hasOptionFields(form, ["group["]))
    return false;
  if (item.feedItemGroupId && item.feedItemGroupId !== String(product)) return false;
  const client = window.prestashop;
  const cartUrl = ownPath(((_b = (_a = client == null ? void 0 : client.urls) == null ? void 0 : _a.pages) == null ? void 0 : _b.cart) || "/index.php?controller=cart");
  if (!(client == null ? void 0 : client.static_token) || !cartUrl) return false;
  const response = await jsonResponse(
    await fetch(cartUrl, {
      ...STOREFRONT_REQUEST,
      method: "POST",
      body: new URLSearchParams({
        add: "1",
        action: "update",
        ajax: "1",
        id_product: String(product),
        id_product_attribute: String(attribute),
        qty: String(item.quantity),
        token: client.static_token
      })
    })
  );
  if (response.hasError || ((_c = response.errors) == null ? void 0 : _c.length) || response.success !== true)
    throw new Error("PrestaShop could not add this product");
  try {
    (_d = client.emit) == null ? void 0 : _d.call(client, "updateCart", {
      reason: { idProduct: product, idProductAttribute: attribute, linkAction: "add-to-cart" },
      resp: response
    });
  } catch {
  }
  return true;
}
async function bigcommerce(item) {
  var _a;
  if (item.feedItemGroupId) return false;
  const source = await productPage(item);
  if (!source) return false;
  const form = primaryForm(source.page, ".productView form[data-cart-item-add]");
  if (!form) return false;
  const productId = pageId(form, 'input[name="product_id"]');
  if (!productId || hasOptionFields(form, ["attribute["])) return false;
  const line = { productId, quantity: item.quantity };
  const carts = await jsonResponse(await fetch("/api/storefront/carts", STOREFRONT_REQUEST));
  if (!Array.isArray(carts)) throw new Error("BigCommerce returned an invalid cart");
  const id = (_a = carts[0]) == null ? void 0 : _a.id;
  const path = id ? `/api/storefront/carts/${encodeURIComponent(id)}/items` : "/api/storefront/carts";
  const cart = await jsonResponse(
    await fetch(path, {
      ...STOREFRONT_REQUEST,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineItems: [line] })
    })
  );
  try {
    const jquery = window.jQuery;
    if (jquery && cart.lineItems) {
      const lines = Object.values(cart.lineItems).flat();
      jquery(document.body).trigger(
        "cart-quantity-update",
        lines.reduce((total, line2) => total + (line2.quantity ?? 1), 0)
      );
    }
  } catch {
  }
  return true;
}
function ecwidUrlIds(url) {
  const ids = [];
  const read = (value, pattern) => {
    var _a;
    const id = entityId(((_a = pattern.exec(value)) == null ? void 0 : _a[1]) ?? "");
    if (id) ids.push(id);
    return Boolean(id);
  };
  read(url.pathname, /(?:-p|\/p\/)([1-9]\d*)\/?$/);
  if (url.hash.startsWith("#!/") && !read(url.hash, /^#!\/[^?#]*-p([1-9]\d*)\/?$/)) return null;
  const storePage = url.searchParams.get("store-page");
  if (storePage !== null && !read(storePage, /^[^?#]*-p([1-9]\d*)\/?$/)) return null;
  return ids;
}
async function ecwid(item) {
  var _a;
  if (item.feedItemGroupId) return false;
  const source = await productPage(item);
  if (!source) return false;
  const canonical = (_a = source.page.querySelector('link[rel="canonical"]')) == null ? void 0 : _a.getAttribute("href");
  let canonicalUrl;
  try {
    canonicalUrl = canonical ? new URL(canonical, source.url) : void 0;
  } catch {
    return false;
  }
  if (canonicalUrl && canonicalUrl.origin !== window.location.origin) return false;
  const urlIds = ecwidUrlIds(source.url);
  const canonicalIds = canonicalUrl ? ecwidUrlIds(canonicalUrl) : [];
  if (!urlIds || !canonicalIds) return false;
  const ids = /* @__PURE__ */ new Set([...urlIds, ...canonicalIds]);
  const client = window.Ecwid;
  if (ids.size !== 1 || !(client == null ? void 0 : client.Cart)) return false;
  const [id] = ids;
  await new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Ecwid cart did not respond")), 15e3);
    try {
      client.Cart.addProduct({
        id,
        quantity: item.quantity,
        callback(success, _product, _cart, error) {
          window.clearTimeout(timeout);
          if (success) resolve();
          else reject(new Error(error || "Ecwid could not add this product"));
        }
      });
    } catch (error) {
      window.clearTimeout(timeout);
      reject(error);
    }
  });
  return true;
}
export {
  bigcommerce,
  ecwid,
  magento,
  prestashop
};

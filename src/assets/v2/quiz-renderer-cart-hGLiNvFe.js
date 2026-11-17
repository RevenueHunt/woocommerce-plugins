import { createStorefrontClient } from "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
import { fetchCart, evaluateOrLogicGroups } from "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import { UPDATE_CART_URL } from "./quiz-renderer.js";
async function updateCartDiscounts(storefrontAccessToken, domain, cartId, discountCodes = []) {
  var _a, _b, _c, _d;
  const client = createStorefrontClient(storefrontAccessToken, domain);
  const query = `
    mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
        cart {
          id
          discountCodes { code applicable }
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
          checkoutUrl
        }
        userErrors { field message }
      }
    }
  `;
  try {
    const response = await client.request(query, {
      variables: { cartId, discountCodes }
    });
    if (((_c = (_b = (_a = response.data) == null ? void 0 : _a.cartDiscountCodesUpdate) == null ? void 0 : _b.userErrors) == null ? void 0 : _c.length) > 0) {
      const errors = response.data.cartDiscountCodesUpdate.userErrors;
      throw new Error(
        `Failed to apply discount codes: ${errors.map((e) => e.message).join(", ")}`
      );
    }
    return (_d = response.data) == null ? void 0 : _d.cartDiscountCodesUpdate;
  } catch (error) {
    console.error("Error updating cart discounts:", error);
    throw error;
  }
}
function getCartGID(cartData) {
  if (!(cartData == null ? void 0 : cartData.token)) {
    console.warn("No cart token found in cart data");
    return null;
  }
  return `gid://shopify/Cart/${cartData.token}`;
}
async function applyDiscount(storefrontAccessToken, domain, discountCodes = []) {
  const cartData = await fetchCart();
  if (!cartData) {
    throw new Error("Failed to fetch or create cart");
  }
  const cartId = getCartGID(cartData);
  if (!cartId) {
    throw new Error("Could not determine cart ID from cart data");
  }
  const result = await updateCartDiscounts(storefrontAccessToken, domain, cartId, discountCodes);
  return result;
}
const createApplyDiscountCodeFunction = (storefrontAccessToken, domain, isStoreRenderer, inBuilder) => {
  return async (discountCode) => {
    if (inBuilder) {
      console.warn("applyDiscountCode: Discount codes cannot be applied in builder preview");
      return void 0;
    }
    if (!isStoreRenderer) {
      console.warn("applyDiscountCode: Can only apply discount codes in store context");
      return void 0;
    }
    if (!storefrontAccessToken || !domain) {
      console.warn("applyDiscountCode: Missing storefront access token or domain");
      return void 0;
    }
    if (!(discountCode == null ? void 0 : discountCode.trim())) {
      console.warn("applyDiscountCode: Discount code is required");
      return void 0;
    }
    try {
      const result = await applyDiscount(storefrontAccessToken, domain, [discountCode.trim()]);
      if (result == null ? void 0 : result.cart) {
        console.log("Discount code applied successfully:", result.cart.discountCodes);
        return result.cart;
      }
      return void 0;
    } catch (error) {
      console.error("Failed to apply discount code:", error);
      throw error;
    }
  };
};
const getVisibleSectionsRefs = ({
  currentQuizPage,
  answers,
  inBuilder,
  variableScores,
  highestVariableRef
}) => {
  if (!currentQuizPage || !("sections" in currentQuizPage)) return [];
  const visibleSectionsRefs = currentQuizPage.sections.filter((section) => {
    if (inBuilder) {
      return true;
    }
    const logicMet = evaluateOrLogicGroups(
      section.logic.showLogic,
      answers,
      variableScores,
      highestVariableRef
    );
    return section.logic.defaultShow ? !logicMet : logicMet;
  }).map((section) => section.ref);
  return visibleSectionsRefs;
};
const getVisibleSections = ({
  currentQuizPage,
  answers,
  inBuilder,
  variableScores,
  highestVariableRef
}) => {
  if (!currentQuizPage || !("sections" in currentQuizPage) || currentQuizPage.sections.length === 0)
    return [];
  const visibleSectionsRefs = getVisibleSectionsRefs({
    currentQuizPage,
    answers,
    inBuilder,
    variableScores,
    highestVariableRef
  });
  const filteredSections = currentQuizPage == null ? void 0 : currentQuizPage.sections.filter((section) => visibleSectionsRefs.includes(section.ref)).map((section) => section);
  return filteredSections;
};
function isValidGid(gid) {
  const parts = gid.split("/");
  return parts.length >= 4 && parts[parts.length - 1] !== "";
}
function filterInvalidGids(data) {
  const filteredData = {};
  for (const [outerKey, innerObj] of Object.entries(data)) {
    filteredData[outerKey] = {};
    for (const [innerKey, gidArray] of Object.entries(innerObj)) {
      const validGids = gidArray.filter(isValidGid);
      if (validGids.length > 0) {
        filteredData[outerKey][innerKey] = validGids;
      }
    }
    if (Object.keys(filteredData[outerKey]).length === 0) {
      delete filteredData[outerKey];
    }
  }
  return filteredData;
}
const getSlotsGidsFromRecommendations = (recommendations) => {
  const slotsGids = Object.values(recommendations).flatMap(
    (innerObj) => Object.values(innerObj).flat()
  );
  return slotsGids;
};
const parseCartItemsFromFetchCart = (cart) => {
  const currency = (cart == null ? void 0 : cart.currency) || "USD";
  return ((cart == null ? void 0 : cart.items) || []).map((item) => {
    var _a, _b, _c;
    return {
      variantId: item.variant_id.toString(),
      quantity: item.quantity,
      price: (item.price / 100).toFixed(2).toString(),
      currency,
      sellingPlanId: ((_c = (_b = (_a = item.selling_plan_allocation) == null ? void 0 : _a.selling_plan) == null ? void 0 : _b.id) == null ? void 0 : _c.toString()) || void 0
    };
  });
};
const updateCart = async (responseId, cartItems, cartId, assistant, added) => {
  var _a;
  const cartTotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const currency = ((_a = cartItems[0]) == null ? void 0 : _a.currency) || (window == null ? void 0 : window.quiz_currency) || "USD";
  const marketId = window == null ? void 0 : window.quiz_market_id;
  const cartData = {
    cart_id: cartId,
    total_price: cartTotal.toFixed(2),
    currency,
    ...marketId && { market_id: marketId },
    products: cartItems.map((item, index) => ({
      id: index,
      variant_id: item.variantId,
      quantity: item.quantity,
      price: item.price.toString(),
      currency: item.currency || currency
    }))
  };
  const response = await fetch(UPDATE_CART_URL(responseId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cart: cartData,
      ...assistant && {
        chatId: assistant.chatId,
        myshopify_domain: assistant.shop,
        added
      }
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors);
  }
  return data;
};
const CART_LINES_UPDATE_EVENT = "shopify:cart:lines-update";
const announceCartUpdate = (cart, action = "update") => {
  if (typeof document === "undefined") return false;
  const itemCount = cart == null ? void 0 : cart.item_count;
  if (typeof itemCount !== "number" || !Number.isFinite(itemCount)) return false;
  const detail = { itemCount };
  const payload = {
    action,
    context: "cart",
    lines: [],
    detail,
    // Already settled: our caller awaited the mutation before calling us. The
    // contract is a promise because it lets a theme paint a loading state while a
    // mutation is in flight, not because it must be pending when dispatched.
    promise: Promise.resolve({
      cart: { totalQuantity: itemCount },
      userErrors: [],
      warnings: [],
      detail
    })
  };
  const event = Object.assign(
    new Event(CART_LINES_UPDATE_EVENT, { bubbles: true, cancelable: true }),
    payload
  );
  document.dispatchEvent(event);
  return true;
};
const SELF_OPENING_DRAWER_SELECTOR = "cart-drawer-component";
const LEGACY_DRAWER_SELECTOR = "cart-drawer";
const DRAWER_SELECTOR = `${LEGACY_DRAWER_SELECTOR}, ${SELF_OPENING_DRAWER_SELECTOR}`;
const CART_HOST_SELECTOR = `${DRAWER_SELECTOR}, cart-notification`;
const isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
let reconcilingFromReveal = false;
const RECONCILE_TIMEOUT_MS = 1500;
const withinReconcileTimeout = (work) => Promise.race([
  work,
  new Promise((resolve) => setTimeout(() => resolve(null), RECONCILE_TIMEOUT_MS))
]);
let claimActive = false;
const getCartUrl = () => {
  var _a;
  const routes = (_a = window.Shopify) == null ? void 0 : _a.routes;
  if (routes == null ? void 0 : routes.cart_url) return routes.cart_url;
  if (routes == null ? void 0 : routes.root) return `${routes.root.replace(/\/$/, "")}/cart`;
  return "/cart";
};
const findCartHost = (doc = document) => doc.querySelector(DRAWER_SELECTOR) ?? doc.querySelector(CART_HOST_SELECTOR);
const getCartHostKind = (host) => {
  if (!host) return "none";
  if (host.matches(SELF_OPENING_DRAWER_SELECTOR)) return "standard-drawer";
  return host.matches(LEGACY_DRAWER_SELECTOR) ? "drawer" : "notification";
};
const applyRenderedHostState = (host, sections) => {
  if (isCartVisible(host)) return false;
  const tagName = host.tagName.toLowerCase();
  const parser = new DOMParser();
  for (const html of Object.values(sections)) {
    if (typeof html !== "string" || !html) continue;
    const fresh = parser.parseFromString(html, "text/html").querySelector(tagName);
    if (fresh) {
      host.className = fresh.className;
      return true;
    }
  }
  return false;
};
const isUsableSections = (payload) => !!payload && typeof payload === "object" && !Array.isArray(payload) && Object.values(payload).some(
  (markup) => typeof markup === "string" && markup.length > 0
);
const reconcileCartHost = async (host) => {
  if (typeof host.getSectionsToRender !== "function" || typeof host.renderContents !== "function") {
    return false;
  }
  try {
    const ids = host.getSectionsToRender().map((section) => section.section ?? section.id).filter((id) => !!id);
    if (ids.length === 0) return false;
    const url = new URL(getCartUrl(), window.location.origin);
    url.searchParams.set("sections", ids.join(","));
    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(RECONCILE_TIMEOUT_MS)
    });
    if (!response.ok) return false;
    const payload = await response.json();
    if (!isUsableSections(payload)) {
      console.warn("Cart reveal: incomplete cart sections response, skipping reconcile");
      return false;
    }
    const sections = payload;
    applyRenderedHostState(host, sections);
    host.renderContents({ sections });
    return true;
  } catch (error) {
    console.warn("Cart reveal: failed to reconcile cart contents", error);
    return false;
  }
};
const isCartVisible = (element) => {
  const measured = getMeasurableElement(element);
  const { height } = measured.getBoundingClientRect();
  if (height <= 0) return false;
  const style = window.getComputedStyle(measured);
  return style.visibility !== "hidden" && style.display !== "none";
};
const getMeasurableElement = (element) => {
  let current = element;
  while (current && window.getComputedStyle(current).display === "contents") {
    current = current.parentElement;
  }
  return current ?? element;
};
const waitForVisibleCart = (element, timeoutMs = 600, intervalMs = 50) => new Promise((resolve) => {
  const deadline = Date.now() + timeoutMs;
  const poll = () => {
    if (isCartVisible(element)) return resolve(true);
    if (Date.now() >= deadline) return resolve(false);
    setTimeout(poll, intervalMs);
  };
  poll();
});
const announceLegacyCartRefresh = () => {
  const root = document.documentElement;
  root.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
  root.dispatchEvent(new CustomEvent("dispatch:cart-drawer:refresh", { bubbles: true }));
  root.dispatchEvent(new CustomEvent("theme:cart:refresh", { bubbles: true }));
};
const revealAlpineMiniCart = (intent) => {
  var _a, _b, _c, _d;
  try {
    const miniCart = (_b = (_a = window.Alpine) == null ? void 0 : _a.store) == null ? void 0 : _b.call(_a, "xMiniCart");
    if (typeof (miniCart == null ? void 0 : miniCart.reLoad) !== "function") return false;
    miniCart.reLoad();
    const cartNoti = (_d = (_c = window.Alpine) == null ? void 0 : _c.store) == null ? void 0 : _d.call(_c, "xCartNoti");
    if (intent !== "add" || miniCart.type !== "drawer" && miniCart.type !== "popup" || (cartNoti == null ? void 0 : cartNoti.enable) || typeof miniCart.openCart !== "function") {
      return false;
    }
    miniCart.openCart();
    return true;
  } catch (error) {
    console.warn("Cart reveal: Alpine mini cart failed", error);
    return false;
  }
};
const RELOADABLE_CART_SELECTOR = "cart-drawer, cart-button";
const reloadThemeCartElements = async () => {
  const elements = Array.from(
    document.querySelectorAll(RELOADABLE_CART_SELECTOR)
  ).filter((el) => typeof el.reload === "function" && typeof el.renderContents !== "function");
  if (elements.length === 0) return false;
  const results = await withinReconcileTimeout(
    Promise.allSettled(elements.map(async (el) => {
      var _a;
      return (_a = el.reload) == null ? void 0 : _a.call(el);
    }))
  );
  return (results == null ? void 0 : results.some((result) => result.status === "fulfilled")) ?? false;
};
const isReactiveOpen = (host) => {
  const properties = host.constructor.elementProperties;
  return properties instanceof Map && properties.has("open");
};
const hasOpenSetter = (host) => {
  for (let proto = host; proto; proto = Object.getPrototypeOf(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, "open");
    if (descriptor) return typeof descriptor.set === "function";
  }
  return false;
};
const openDrawerDirectly = (host) => {
  if (typeof host.open === "function") {
    host.open();
    return true;
  }
  if (isReactiveOpen(host)) {
    host.open = true;
    return true;
  }
  if (typeof host.show === "function") {
    host.show();
    return true;
  }
  if (hasOpenSetter(host)) {
    host.open = true;
    return true;
  }
  if (typeof host.openMenuDrawer === "function") {
    host.openMenuDrawer();
    return true;
  }
  return false;
};
const platformCanOpenDrawer = (host) => {
  var _a, _b;
  const openCart = (_b = (_a = window.Shopify) == null ? void 0 : _a.actions) == null ? void 0 : _b.openCart;
  if (typeof openCart !== "function") return false;
  try {
    if (typeof openCart.isDefault === "function" && !openCart.isDefault()) return true;
    return typeof host.open === "function";
  } catch (error) {
    console.warn("Cart reveal: could not inspect openCart or the drawer", error);
    return false;
  }
};
const openViaStandardAction = async () => {
  var _a, _b;
  const openCart = (_b = (_a = window.Shopify) == null ? void 0 : _a.actions) == null ? void 0 : _b.openCart;
  if (typeof openCart !== "function") return false;
  try {
    await openCart();
    return true;
  } catch (error) {
    console.warn("Cart reveal: openCart() failed", error);
    return false;
  }
};
const revealCart = async ({
  intent = "update",
  cart
} = {}) => {
  if (!isBrowser()) {
    return { host: "none", announced: false, reconciled: false, opened: false, visible: null };
  }
  const announced = announceCartUpdate(cart, intent);
  announceLegacyCartRefresh();
  const reloaded = await reloadThemeCartElements();
  const host = findCartHost();
  const kind = getCartHostKind(host);
  if (!host) {
    const opened2 = revealAlpineMiniCart(intent);
    return { host: kind, announced, reconciled: reloaded, opened: opened2, visible: null };
  }
  const reconciled = await reconcileCartHost(host) || reloaded;
  if (intent !== "add" || kind === "standard-drawer") {
    return { host: kind, announced, reconciled, opened: false, visible: null };
  }
  let opened = false;
  if (kind === "drawer") {
    if (platformCanOpenDrawer(host)) {
      reconcilingFromReveal = true;
      try {
        opened = await openViaStandardAction();
      } finally {
        reconcilingFromReveal = false;
      }
    }
    if (!opened) {
      try {
        opened = openDrawerDirectly(host);
      } catch (error) {
        console.warn("Cart reveal: drawer open failed", error);
      }
    }
  } else if (typeof host.open === "function") {
    try {
      host.open();
      opened = true;
    } catch (error) {
      console.warn("Cart reveal: cart notification open() failed", error);
    }
  }
  const visible = opened ? await waitForVisibleCart(host) : null;
  if (opened && !visible) {
    console.warn("Cart reveal: the cart was opened but never became visible");
  }
  return { host: kind, announced, reconciled, opened, visible };
};
const openDrawerWithoutRedirect = (defaultOpen, args) => {
  try {
    const host = findCartHost();
    if (host && getCartHostKind(host) === "drawer" && typeof host.open !== "function") {
      if (openDrawerDirectly(host) || reconcilingFromReveal) return void 0;
    }
  } catch (error) {
    console.warn("Cart reveal: drawer open failed", error);
  }
  return typeof defaultOpen === "function" ? defaultOpen(...args) : void 0;
};
const claimOpenCart = () => {
  var _a, _b;
  if (!isBrowser()) return false;
  const openCart = (_b = (_a = window.Shopify) == null ? void 0 : _a.actions) == null ? void 0 : _b.openCart;
  if (typeof (openCart == null ? void 0 : openCart.configure) !== "function") return false;
  if (typeof openCart.isDefault === "function" && !openCart.isDefault()) return false;
  try {
    const claimed = openCart.configure({
      handler: async (defaultOpen, ...args) => {
        const open = () => openDrawerWithoutRedirect(defaultOpen, args);
        if (!claimActive || reconcilingFromReveal) return open();
        try {
          const host = findCartHost();
          if (host) {
            await withinReconcileTimeout(reconcileCartHost(host));
          }
        } catch (error) {
          console.warn("Cart reveal: reconcile before openCart failed", error);
        }
        return open();
      }
    });
    claimActive = claimed;
    return claimed;
  } catch (error) {
    console.warn("Cart reveal: could not claim openCart", error);
    return false;
  }
};
const claimOpenCartWhenIdle = () => {
  if (!isBrowser()) return () => {
  };
  const claim = () => claimOpenCart();
  if (document.readyState === "complete") {
    claim();
  } else {
    window.addEventListener("load", claim, { once: true });
  }
  return () => {
    window.removeEventListener("load", claim);
    releaseOpenCart();
  };
};
const releaseOpenCart = () => {
  claimActive = false;
};
const cartPublish = () => {
  if (typeof window === "undefined") return;
  const pubSubEvents = window.PUB_SUB_EVENTS;
  if (window.publish && (pubSubEvents == null ? void 0 : pubSubEvents.cartUpdate)) {
    window.publish(pubSubEvents.cartUpdate, { source: "update-cart" });
  }
};
const GENERIC_CART_COUNTER_SELECTORS = [
  ".cart-count",
  "#cart-count",
  ".cart-item-count",
  "[data-cart-count]",
  ".cart__count"
];
const cartCounterManualHTMLUpdate = (cart) => {
  if (typeof document === "undefined") return;
  GENERIC_CART_COUNTER_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = cart.item_count.toString();
      element.classList.toggle("hide", cart.item_count === 0);
    });
  });
};
const cartIntentFor = (previous, next) => {
  const total = (items) => items.reduce((sum, item) => sum + item.quantity, 0);
  return total(next) > total(previous) ? "add" : "update";
};
const syncCartNeedsRefresh = (known, fresh, intent) => intent === "add" || JSON.stringify(known) !== JSON.stringify(fresh);
let refreshDebounceTimeout = null;
let pendingRefreshCart = void 0;
let pendingIntent = "update";
const refreshCartUI = async (cart, intent = "update") => {
  pendingRefreshCart = cart ?? pendingRefreshCart;
  if (intent === "add") {
    pendingIntent = "add";
  }
  if (refreshDebounceTimeout) {
    clearTimeout(refreshDebounceTimeout);
  }
  return new Promise((resolve) => {
    refreshDebounceTimeout = setTimeout(async () => {
      const cartToUse = pendingRefreshCart;
      const intentToUse = pendingIntent;
      pendingRefreshCart = void 0;
      pendingIntent = "update";
      refreshDebounceTimeout = null;
      if (cartToUse) {
        cartCounterManualHTMLUpdate(cartToUse);
      }
      cartPublish();
      await revealCart({ intent: intentToUse, cart: cartToUse });
      resolve();
    }, 150);
  });
};
const resetCartUIState = () => {
  if (refreshDebounceTimeout) {
    clearTimeout(refreshDebounceTimeout);
    refreshDebounceTimeout = null;
  }
  pendingRefreshCart = void 0;
  pendingIntent = "update";
};
export {
  applyDiscount,
  cartIntentFor,
  claimOpenCartWhenIdle,
  createApplyDiscountCodeFunction,
  filterInvalidGids,
  getSlotsGidsFromRecommendations,
  getVisibleSections,
  parseCartItemsFromFetchCart,
  refreshCartUI,
  resetCartUIState,
  syncCartNeedsRefresh,
  updateCart
};

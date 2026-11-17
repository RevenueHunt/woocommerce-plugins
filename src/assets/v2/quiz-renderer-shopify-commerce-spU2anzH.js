import { tagAssistantCart, tagCart, fetchCart, addToCartBody, changeToCart } from "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import { claimOpenCartWhenIdle, applyDiscount, resetCartUIState, updateCart, parseCartItemsFromFetchCart, refreshCartUI } from "./quiz-renderer-cart-hGLiNvFe.js";
import { createQuizCartView } from "./quiz-renderer-recommendation-cart-BwOZ-x1U.js";
import { fetchItemSlotData } from "./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js";
import "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
import "./quiz-renderer.js";
function createShopifyCommerce(quizId, getResponseId, getAssistant) {
  const cartId = Math.random().toString(36).substring(7);
  let posting = Promise.resolve();
  let pendingAdds = [];
  const postCart = () => {
    const added = pendingAdds;
    pendingAdds = [];
    const assistant = getAssistant == null ? void 0 : getAssistant();
    const id = getResponseId() || (assistant == null ? void 0 : assistant.chatId);
    posting = posting.then(async () => {
      if (id)
        await updateCart(
          id,
          parseCartItemsFromFetchCart(await fetchCart()),
          cartId,
          assistant,
          added
        );
    }).catch(() => {
    });
  };
  const post = async (body) => {
    const id = getResponseId();
    try {
      const assistant = getAssistant == null ? void 0 : getAssistant();
      if (assistant) await tagAssistantCart(assistant.chatId);
      if (id) await tagCart(id, quizId);
    } catch {
    }
    const response = await addToCartBody(body);
    if (response.ok && (getAssistant == null ? void 0 : getAssistant())) {
      const json = await response.clone().json();
      const lines = json.items ?? [json];
      pendingAdds.push(
        ...lines.map(
          (line) => ({
            product_id: String(line.product_id),
            variant_id: String(line.variant_id ?? line.id),
            quantity: line.quantity,
            price: String(line.price / 100)
          })
        )
      );
    }
    return response;
  };
  const refresh = async (confirmed, intent) => refreshCartUI({ item_count: confirmed.item_count ?? 0 }, intent);
  const cart = createQuizCartView({
    fetchCart,
    addToCart: async (items) => {
      const response = await post({ items });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return fetchCart();
    },
    changeToCart,
    refreshCartUI: async (confirmed, intent) => {
      if (confirmed) await refresh(confirmed, intent);
    },
    onLanded: postCart
  });
  const plans = /* @__PURE__ */ new Map();
  let cartStarted = false;
  const startCart = () => {
    if (!cartStarted) {
      cartStarted = true;
      void cart.reconcile().catch(() => {
      });
    }
    return cart;
  };
  const releaseOpenCart = claimOpenCartWhenIdle();
  return {
    items(ids, context, metafieldRefs, config) {
      if (!context.storefrontAccessToken) throw new Error("Missing storefront credentials");
      return fetchItemSlotData(
        ids,
        { shop: context.shop, storefrontAccessToken: context.storefrontAccessToken },
        metafieldRefs,
        ...config ? [config] : []
      );
    },
    async applyDiscount(code, context) {
      var _a, _b, _c;
      if (!context.storefrontAccessToken) return false;
      const discount = await applyDiscount(context.storefrontAccessToken, context.shop, [code]);
      if (((_a = discount == null ? void 0 : discount.userErrors) == null ? void 0 : _a.length) || !((_c = (_b = discount == null ? void 0 : discount.cart) == null ? void 0 : _b.discountCodes) == null ? void 0 : _c.some(
        (entry) => entry.code.toLowerCase() === code.toLowerCase() && entry.applicable
      )))
        throw new Error("Discount code was not applied");
      return true;
    },
    async tagCart(responseId, assistantChatId) {
      startCart();
      if (assistantChatId) await tagAssistantCart(assistantChatId);
      if (responseId) await tagCart(responseId, quizId);
    },
    get cart() {
      return startCart();
    },
    async add(variantId, sellingPlanId) {
      const outcome = await startCart().add(
        variantId.slice(variantId.lastIndexOf("/") + 1),
        sellingPlanId
      );
      if (!outcome.landed) throw new Error("Cart add not confirmed");
    },
    plans(handle) {
      var _a, _b;
      let read = plans.get(handle);
      if (!read) {
        read = fetch(
          `${((_b = (_a = window.Shopify) == null ? void 0 : _a.routes) == null ? void 0 : _b.root) || "/"}products/${encodeURIComponent(handle)}.js`
        ).then(async (response) => {
          if (!response.ok) throw new Error(`product.js ${response.status}`);
          return productPlans(await response.json());
        }).catch(() => {
          plans.delete(handle);
          return void 0;
        });
        plans.set(handle, read);
      }
      return read;
    },
    async addItems(body) {
      var _a, _b;
      startCart();
      const response = await post(body);
      if (!response.ok) return { response, added: [] };
      const json = await response.clone().json().catch(() => void 0);
      await cart.reconcile().catch(() => {
      });
      await refresh(await fetchCart().catch(() => ({})), "add").catch(() => {
      });
      postCart();
      const lines = (json == null ? void 0 : json.items) ?? (json ? [json] : []);
      const currencyCode = (_b = (_a = window.Shopify) == null ? void 0 : _a.currency) == null ? void 0 : _b.active;
      const added = requestedLines(body).map((item) => {
        const id = String(item.id);
        const line = lines.find((entry) => String(entry.variant_id ?? entry.id) === id);
        const cents = (line == null ? void 0 : line.final_price) ?? (line == null ? void 0 : line.price);
        return {
          quantity: Number(item.quantity ?? 1),
          variant: {
            id: `gid://shopify/ProductVariant/${id}`,
            title: (line == null ? void 0 : line.product_title) ?? (line == null ? void 0 : line.title) ?? "",
            price: typeof cents === "number" && currencyCode ? { amount: String(cents / 100), currencyCode } : {}
          }
        };
      });
      return { response, added };
    },
    dispose() {
      cart.dispose();
      releaseOpenCart();
      resetCartUIState();
    }
  };
}
function productPlans(product) {
  const plans = (product.selling_plan_groups ?? []).flatMap((group) => group.selling_plans ?? []).map((plan) => ({ id: String(plan.id), name: plan.name }));
  if (!plans.length) return void 0;
  return {
    requiresSellingPlan: product.requires_selling_plan === true,
    plans,
    allocations: Object.fromEntries(
      (product.variants ?? []).map((variant) => [
        String(variant.id),
        Object.fromEntries(
          (variant.selling_plan_allocations ?? []).map((allocation) => [
            String(allocation.selling_plan_id),
            { price: allocation.price, compareAtPrice: allocation.compare_at_price ?? void 0 }
          ])
        )
      ])
    )
  };
}
function requestedLines(body) {
  var _a;
  if (!(body instanceof FormData || body instanceof URLSearchParams))
    return Array.isArray(body.items) ? body.items : [body];
  const id = body.get("id");
  if (id) return [{ id: String(id), quantity: Number(body.get("quantity") ?? 1) }];
  const lines = [];
  for (const [key, value] of body.entries()) {
    const match = /^items\[(\d+)\]\[(id|quantity)\]$/.exec(key);
    if (!match) continue;
    const line = lines[_a = Number(match[1])] ?? (lines[_a] = { id: "" });
    if (match[2] === "id") line.id = String(value);
    else line.quantity = Number(value);
  }
  return lines.filter((line) => line == null ? void 0 : line.id);
}
export {
  createShopifyCommerce
};

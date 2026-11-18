const __vite__fileDeps=["./quiz-renderer-storefront-reporter-TqwI4yVH.js","./quiz-renderer.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { getPublicEnvironmentVariable, __vitePreload } from "./quiz-renderer.js";
import { isRecord } from "./quiz-renderer-mount-D_6h3far.js";
import "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
const API_URL = getPublicEnvironmentVariable("PUBLIC_QUIZ_API_URL") || getPublicEnvironmentVariable("API_URL");
const STANDALONE_RESPONSE_KEY = "revenuehunt_response_id";
function createStandaloneCommerce(shop = "") {
  const hooks = window.RevenueHuntStore;
  const variants = /* @__PURE__ */ new Map();
  let presetAdd;
  let pending = Promise.resolve();
  const report = (error) => {
    void __vitePreload(async () => {
      const { reportStorefrontError } = await import("./quiz-renderer-storefront-reporter-TqwI4yVH.js");
      return { reportStorefrontError };
    }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then(({ reportStorefrontError }) => reportStorefrontError(error, shop, "standalone")).catch(() => {
    });
  };
  return {
    get addAction() {
      return (hooks == null ? void 0 : hooks.addToCart) || presetAdd ? void 0 : "viewProduct";
    },
    async items(ids, context) {
      const products = {};
      for (let offset = 0; offset < ids.length; offset += 50) {
        const query = new URLSearchParams({ ids: ids.slice(offset, offset + 50).join(",") });
        const response = await fetch(
          `${API_URL}/api/storefront/${encodeURIComponent(shop || context.shop)}/items?${query}`
        );
        if (!response.ok) throw new Error(`Standalone catalogue: HTTP ${response.status}`);
        const batch = await response.json();
        presetAdd = !(hooks == null ? void 0 : hooks.addToCart) && batch.cartPreset && ["magento", "prestashop", "bigcommerce", "ecwid"].includes(batch.cartPreset) ? (await __vitePreload(() => import("./quiz-renderer-standalone-cart-presets-CvbRBrUN.js"), true ? [] : void 0, import.meta.url))[batch.cartPreset] : void 0;
        Object.assign(products, batch.products);
        for (const item of Object.values(batch.products)) {
          if (isRecord(item.product) && typeof item.id === "string") variants.set(item.id, item);
          if (isRecord(item.variants) && Array.isArray(item.variants.edges)) {
            for (const edge of item.variants.edges)
              if (isRecord(edge) && isRecord(edge.node) && typeof edge.node.id === "string")
                variants.set(edge.node.id, edge.node);
          }
        }
      }
      return products;
    },
    async add(variantId) {
      const variant = variants.get(variantId);
      const product = variant == null ? void 0 : variant.product;
      if (!variant || !isRecord(product)) throw new Error("Unknown standalone variant");
      const url = variant.onlineStoreUrl || product.onlineStoreUrl;
      if (typeof url !== "string" || !url) throw new Error("Standalone product has no URL");
      if ((hooks == null ? void 0 : hooks.addToCart) || presetAdd) {
        try {
          const item = {
            variantId,
            productId: String(product.id),
            sku: typeof variant.sku === "string" ? variant.sku : "",
            quantity: 1,
            url
          };
          if (hooks == null ? void 0 : hooks.addToCart) await hooks.addToCart(item);
          else if (presetAdd) {
            const addPreset = presetAdd;
            const next = pending.then(
              () => addPreset({
                ...item,
                feedItemGroupId: typeof variant.feedItemGroupId === "string" ? variant.feedItemGroupId : ""
              })
            );
            pending = next.catch(() => {
            });
            if (!await next) return { viewProduct: url };
          }
        } catch (error) {
          report(error);
          throw error;
        }
      } else window.open(url, "_self");
    },
    async tagCart(responseId) {
      var _a;
      if (!responseId) return;
      try {
        sessionStorage.setItem(STANDALONE_RESPONSE_KEY, responseId);
      } catch {
      }
      try {
        await ((_a = hooks == null ? void 0 : hooks.tagOrder) == null ? void 0 : _a.call(hooks, responseId));
      } catch (error) {
        report(error);
      }
    },
    async applyDiscount() {
      return false;
    },
    dispose() {
      variants.clear();
    }
  };
}
export {
  STANDALONE_RESPONSE_KEY,
  createStandaloneCommerce
};

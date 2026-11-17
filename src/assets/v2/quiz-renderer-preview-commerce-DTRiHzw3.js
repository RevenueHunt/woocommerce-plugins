import { createQuizCartView } from "./quiz-renderer-recommendation-cart-BwOZ-x1U.js";
import { fetchItemSlotData } from "./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js";
import "./quiz-renderer.js";
import "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
function createPreviewCommerce(notice) {
  const local = { item_count: 0, items: [] };
  const confirmed = () => ({
    item_count: local.item_count,
    items: local.items.map((item) => ({ ...item }))
  });
  const line = (key) => local.items.find((item) => item.key === key);
  const cart = createQuizCartView({
    fetchCart: async () => confirmed(),
    addToCart: async (added) => {
      for (const { id, quantity, selling_plan } of added) {
        const key = `${id}:${selling_plan ?? ""}`;
        const existing = line(key);
        if (existing) existing.quantity = (existing.quantity ?? 0) + quantity;
        else
          local.items.push({
            id,
            key,
            quantity,
            ...selling_plan && {
              selling_plan_allocation: { selling_plan: { id: selling_plan } }
            }
          });
        local.item_count += quantity;
      }
      return confirmed();
    },
    changeToCart: async ({ id, quantity }) => {
      const existing = line(id);
      if (existing) {
        local.item_count += quantity - (existing.quantity ?? 0);
        existing.quantity = quantity;
        if (quantity <= 0) local.items.splice(local.items.indexOf(existing), 1);
      }
      return confirmed();
    },
    refreshCartUI: async () => {
    }
  });
  void cart.reconcile();
  return {
    items(ids, context, metafieldRefs, config) {
      if (context.products) return Promise.resolve(context.products);
      if (!context.storefrontAccessToken) throw new Error("Missing storefront credentials");
      return fetchItemSlotData(
        ids,
        context,
        metafieldRefs,
        config
      );
    },
    async applyDiscount() {
      return false;
    },
    async tagCart() {
    },
    cart,
    async add(variantId, sellingPlanId) {
      const outcome = await cart.add(
        variantId.slice(variantId.lastIndexOf("/") + 1),
        sellingPlanId
      );
      if (!outcome.landed) throw new Error("Preview add not confirmed");
      return notice;
    },
    dispose: cart.dispose
  };
}
export {
  createPreviewCommerce
};

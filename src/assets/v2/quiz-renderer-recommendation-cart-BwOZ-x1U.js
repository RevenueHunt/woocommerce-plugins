const parseCart = (cart) => Array.isArray(cart.items) ? cart.items.filter((item) => (item == null ? void 0 : item.id) !== void 0 && (item == null ? void 0 : item.id) !== null).map((item) => {
  var _a;
  const plan = item.selling_plan_allocation ? (_a = item.selling_plan_allocation.selling_plan) == null ? void 0 : _a.id : "";
  return {
    variantId: String(item.id),
    sellingPlanId: String(plan ?? ""),
    key: item.key,
    quantity: typeof item.quantity === "number" ? item.quantity : 0,
    plain: item.quantity !== void 0 && item.quantity !== null && plan !== void 0 && plan !== null && (!item.properties || Object.values(item.properties).every((value) => value === null || value === ""))
  };
}) : [];
function createQuizCartView(deps) {
  let lines = [];
  let lastConfirmed = { item_count: 0, items: [] };
  let confirmedOnce = false;
  let inFlightMutation = null;
  let inFlightRead = null;
  let uncertainState = false;
  let disposed = false;
  const listeners = /* @__PURE__ */ new Set();
  const notify = () => {
    var _a;
    if (!disposed) for (const listener of listeners) listener();
    (_a = deps.onState) == null ? void 0 : _a.call(deps);
  };
  const adopt = (cart) => {
    lines = parseCart(cart);
    lastConfirmed = cart;
    confirmedOnce = true;
    uncertainState = false;
  };
  const reconcile = async () => {
    if (inFlightRead) return inFlightRead;
    inFlightRead = (async () => {
      const cart = await deps.fetchCart();
      adopt(cart);
      notify();
    })().finally(() => {
      inFlightRead = null;
    });
    return inFlightRead;
  };
  const plainLines = (shortVariantId, sellingPlanId = "") => lines.filter(
    (line) => line.plain && line.variantId === shortVariantId && line.sellingPlanId === sellingPlanId
  );
  const plainQuantity = (shortVariantId, sellingPlanId) => plainLines(shortVariantId, sellingPlanId).reduce((sum, line) => sum + line.quantity, 0);
  const settle = async (shortVariantId, sellingPlanId, before) => {
    try {
      await reconcile();
      if (!disposed && confirmedOnce && plainQuantity(shortVariantId, sellingPlanId) !== before)
        await deps.refreshCartUI(lastConfirmed, "update").catch(() => {
        });
      return {
        landed: plainQuantity(shortVariantId, sellingPlanId) !== before
      };
    } catch {
      uncertainState = true;
      notify();
      return { landed: false, uncertain: true };
    }
  };
  const mutate = async (shortVariantId, sellingPlanId, intent, operation) => {
    var _a, _b;
    if (disposed) return { landed: false, uncertain: false };
    if (uncertainState || inFlightMutation) return { landed: false, uncertain: uncertainState };
    const before = plainQuantity(shortVariantId, sellingPlanId);
    inFlightMutation = { variantId: shortVariantId };
    notify();
    try {
      const confirmed = await operation(before);
      adopt(confirmed);
      notify();
      try {
        await deps.refreshCartUI(confirmed, intent);
      } catch {
      }
      (_a = deps.onLanded) == null ? void 0 : _a.call(deps);
      return { landed: true };
    } catch {
      const outcome = await settle(shortVariantId, sellingPlanId, before);
      if (outcome.landed) (_b = deps.onLanded) == null ? void 0 : _b.call(deps);
      return outcome;
    } finally {
      inFlightMutation = null;
      notify();
    }
  };
  return {
    reconcile,
    quantity: (shortVariantId, sellingPlanId) => confirmedOnce ? plainQuantity(shortVariantId, sellingPlanId) : 0,
    pending: (shortVariantId) => (inFlightMutation == null ? void 0 : inFlightMutation.variantId) === shortVariantId || Boolean(inFlightMutation),
    uncertain: () => uncertainState,
    add: (shortVariantId, sellingPlanId) => mutate(
      shortVariantId,
      sellingPlanId,
      "add",
      () => deps.addToCart([
        {
          id: shortVariantId,
          quantity: 1,
          ...sellingPlanId && { selling_plan: sellingPlanId }
        }
      ])
    ),
    decrement: (shortVariantId, sellingPlanId) => {
      const matches = plainLines(shortVariantId, sellingPlanId);
      const id = matches.length === 1 ? matches[0].key : void 0;
      if (!id) {
        void reconcile();
        return Promise.resolve({ landed: false, uncertain: false });
      }
      return mutate(
        shortVariantId,
        sellingPlanId,
        "update",
        (before) => deps.changeToCart({ id, quantity: Math.max(0, before - 1) })
      );
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispose: () => {
      disposed = true;
      listeners.clear();
    }
  };
}
export {
  createQuizCartView
};

const evaluateCondition = (condition, answers, variableScores, highestVariableRef) => {
  switch (condition.sourceType) {
    case "questionChoice": {
      if (!condition.blockRef || condition.value === void 0) {
        console.warn("Invalid condition data for questionChoice:", condition);
        return false;
      }
      const targetChoiceRef = String(condition.value);
      const relevantAnswers = answers.filter((a) => a.blockRef === condition.blockRef);
      if (relevantAnswers.length === 0) {
        return condition.operator === "is_not";
      }
      const isChoiceSelected = relevantAnswers.some(
        (a) => {
          var _a;
          return (_a = a.choicesRefs) == null ? void 0 : _a.includes(targetChoiceRef);
        }
      );
      if (condition.operator === "is") {
        return isChoiceSelected;
      }
      if (condition.operator === "is_not") {
        return !isChoiceSelected;
      }
      return false;
    }
    case "variableValue": {
      if (!condition.variableRef || condition.value === void 0) {
        console.warn("Invalid condition data for variableValue:", condition);
        return false;
      }
      const currentScore = variableScores[condition.variableRef] ?? 0;
      let comparisonValue;
      if (condition.comparisonTargetType === "number") {
        const numValue = Number(condition.value);
        comparisonValue = isNaN(numValue) ? 0 : numValue;
      } else if (condition.comparisonTargetType === "variable") {
        const comparisonVarRef = String(condition.value);
        comparisonValue = variableScores[comparisonVarRef] ?? 0;
      } else {
        const numValue = Number(condition.value);
        comparisonValue = isNaN(numValue) ? 0 : numValue;
      }
      switch (condition.operator) {
        case "equals":
          return currentScore === comparisonValue;
        case "notEquals":
          return currentScore !== comparisonValue;
        case "greaterThan":
          return currentScore > comparisonValue;
        case "lessThan":
          return currentScore < comparisonValue;
        case "greaterThanOrEqual":
          return currentScore >= comparisonValue;
        case "lessThanOrEqual":
          return currentScore <= comparisonValue;
        default:
          return false;
      }
    }
    case "highestVariable": {
      if (condition.value === void 0 || !highestVariableRef) {
        console.warn(
          "Invalid condition data or missing highestVariableRef for highestVariable:",
          condition
        );
        return false;
      }
      const targetVariableRef = String(condition.value);
      if (condition.operator === "is") {
        return highestVariableRef === targetVariableRef;
      }
      if (condition.operator === "is_not") {
        return highestVariableRef !== targetVariableRef;
      }
      return false;
    }
    default:
      console.warn("Unknown condition sourceType:", condition.sourceType);
      return false;
  }
};
const evaluateAndConditions = (conditions, answers, variableScores, highestVariableRef) => {
  if (!conditions || conditions.length === 0) {
    return false;
  }
  return conditions.every(
    (condition) => evaluateCondition(condition, answers, variableScores, highestVariableRef)
  );
};
const evaluateOrLogicGroups = (orLogicGroups, answers, variableScores, highestVariableRef) => {
  if (!orLogicGroups || orLogicGroups.length === 0) {
    return false;
  }
  return orLogicGroups.some(
    (group) => evaluateAndConditions(group.conditions, answers, variableScores, highestVariableRef)
  );
};
const SHOPIFY_URL_ROOT = () => {
  var _a, _b;
  return typeof window !== "undefined" && ((_b = (_a = window.Shopify) == null ? void 0 : _a.routes) == null ? void 0 : _b.root) || "/";
};
const ADD_TO_CART_SHOPIFY_URL = () => SHOPIFY_URL_ROOT() + "cart/add.js";
const CHANGE_TO_CART_SHOPIFY_URL = () => SHOPIFY_URL_ROOT() + "cart/change.js";
const UPDATE_CART_SHOPIFY_URL = () => SHOPIFY_URL_ROOT() + "cart/update.js";
const getRecommendationsProductVariants = (fetchedSlotItems) => {
  if (!fetchedSlotItems) {
    return [];
  }
  const getRecommendations = Object.values(fetchedSlotItems);
  const seenVariantIds = /* @__PURE__ */ new Set();
  const filteredRecommendations = getRecommendations.filter((recommendation) => {
    return !recommendation.id.startsWith("gid://shopify/Collection/");
  });
  return filteredRecommendations.map((recommendation) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const isProductVariant = recommendation.id.startsWith("gid://shopify/ProductVariant/");
    const variantId = isProductVariant ? recommendation.id : (_c = (_b = (_a = recommendation.variants) == null ? void 0 : _a.edges[0]) == null ? void 0 : _b.node) == null ? void 0 : _c.id;
    if (seenVariantIds.has(variantId)) {
      return null;
    }
    seenVariantIds.add(variantId);
    return {
      variantId,
      quantity: 1,
      title: isProductVariant ? recommendation.title : (_f = (_e = (_d = recommendation.variants) == null ? void 0 : _d.edges[0]) == null ? void 0 : _e.node) == null ? void 0 : _f.title,
      price: isProductVariant ? recommendation.price.amount : (_j = (_i = (_h = (_g = recommendation.variants) == null ? void 0 : _g.edges[0]) == null ? void 0 : _h.node) == null ? void 0 : _i.price) == null ? void 0 : _j.amount,
      currency: isProductVariant ? recommendation.price.currencyCode : (_n = (_m = (_l = (_k = recommendation.variants) == null ? void 0 : _k.edges[0]) == null ? void 0 : _l.node) == null ? void 0 : _m.price) == null ? void 0 : _n.currencyCode
    };
  }).filter((item) => item !== null);
};
const getSellingPlanId = (selection) => {
  var _a;
  return (selection == null ? void 0 : selection.mode) === "subscription" ? ((_a = selection.selectedPlan) == null ? void 0 : _a.planId) ?? null : null;
};
const cleanVariantId = (variantId) => {
  return (variantId == null ? void 0 : variantId.replace("gid://shopify/ProductVariant/", "")) || variantId;
};
const formatVariantsForCart = (variants) => {
  return variants.map((variant) => ({
    id: cleanVariantId(variant.variantId),
    quantity: variant.quantity,
    currency: variant.currency,
    ...variant.sellingPlanId ? { selling_plan: variant.sellingPlanId } : {}
  }));
};
const formatVariantsForStore = (variants) => {
  return variants.map((variant) => ({
    variantId: cleanVariantId(variant.variantId),
    quantity: variant.quantity,
    price: variant.price,
    currency: variant.currency,
    sellingPlanId: variant.sellingPlanId ?? void 0
  }));
};
const fetchCart = async () => {
  try {
    const response = await fetch(UPDATE_CART_SHOPIFY_URL(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
const addAllToCart = async (items) => {
  try {
    const response = await fetch(ADD_TO_CART_SHOPIFY_URL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding all to cart:", error);
    throw error;
  }
};
const addToCart = async (items) => {
  try {
    const response = await fetch(ADD_TO_CART_SHOPIFY_URL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
const addToCartBody = (body) => fetch(ADD_TO_CART_SHOPIFY_URL(), {
  method: "POST",
  headers: body instanceof FormData || body instanceof URLSearchParams ? { Accept: "application/json" } : { "Content-Type": "application/json", Accept: "application/json" },
  body: body instanceof FormData || body instanceof URLSearchParams ? body : JSON.stringify(body)
});
const changeToCart = async (item) => {
  try {
    const payload = {
      id: item.id,
      quantity: item.quantity,
      ...item.selling_plan ? { selling_plan: item.selling_plan } : {}
    };
    const response = await fetch(CHANGE_TO_CART_SHOPIFY_URL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error charging to cart:", error);
    throw error;
  }
};
const normalizeCartAttributes = (attributes) => {
  return Object.entries(attributes).reduce((acc, [key, value]) => {
    const normalizedKey = key.trim();
    if (!normalizedKey) {
      return acc;
    }
    if (value === null || value === void 0) {
      acc[normalizedKey] = "";
      return acc;
    }
    acc[normalizedKey] = typeof value === "string" ? value : JSON.stringify(value);
    return acc;
  }, {});
};
const updateCartAttributes = async (attributes) => {
  const normalizedAttributes = normalizeCartAttributes(attributes);
  try {
    const response = await fetch(UPDATE_CART_SHOPIFY_URL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        attributes: normalizedAttributes
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating cart attributes:", error);
    throw error;
  }
};
const tagAssistantCart = async (chatId) => {
  await updateCartAttributes({ __assistant_chat_id: chatId });
};
const tagCart = async (responseId, quizId) => {
  if (!responseId || !quizId) {
    return;
  }
  await updateCartAttributes({
    __quiz_response_id: responseId,
    __quiz_id: quizId
  });
};
const addRecommendationsToCart = async (fetchedSlotItems, _addToLocalCart, addMultipleToLocalCart, isStoreRenderer, inBuilder, currentCartItems = [], getSubscriptionSelection) => {
  if (inBuilder) {
    return [];
  }
  const productVariants = getRecommendationsProductVariants(fetchedSlotItems);
  const variantsWithPlans = productVariants.map((variant) => ({
    ...variant,
    sellingPlanId: getSellingPlanId(getSubscriptionSelection == null ? void 0 : getSubscriptionSelection(variant.variantId))
  }));
  const currentCartVariantIds = new Set(
    currentCartItems.map((item) => `${item.variantId}::${item.sellingPlanId ?? "onetime"}`)
  );
  const newVariants = variantsWithPlans.filter((variant) => {
    const cleanId = cleanVariantId(variant.variantId);
    const cartKey = `${cleanId}::${variant.sellingPlanId ?? "onetime"}`;
    return !currentCartVariantIds.has(cartKey);
  });
  if (newVariants.length === 0) {
    return [];
  }
  if (!isStoreRenderer) {
    const storeItems = formatVariantsForStore(newVariants);
    addMultipleToLocalCart(storeItems);
    return newVariants;
  }
  try {
    const cartItems = formatVariantsForCart(newVariants);
    await addAllToCart(cartItems);
    const storeItems = formatVariantsForStore(newVariants);
    addMultipleToLocalCart(storeItems);
    return newVariants;
  } catch (error) {
    console.error("Error adding recommendations to cart:", error);
    throw error;
  }
};
const createAddAllToCartFunction = (fetchedSlotItems, addToCart2, addMultipleToCart, isStoreRenderer, inBuilder, currentCartItems = [], getSubscriptionSelection) => {
  return async () => {
    try {
      await addRecommendationsToCart(
        fetchedSlotItems,
        addToCart2,
        addMultipleToCart,
        isStoreRenderer,
        inBuilder,
        currentCartItems,
        getSubscriptionSelection
      );
    } catch (error) {
      console.error("Error in addAllToCart:", error);
    }
  };
};
const createSimpleAddToCart = (addToCart2) => {
  return (variantId, quantity, sellingPlanId) => {
    addToCart2(variantId, quantity, 0, "USD", sellingPlanId);
  };
};
export {
  addRecommendationsToCart,
  addToCart,
  addToCartBody,
  changeToCart,
  createAddAllToCartFunction,
  createSimpleAddToCart,
  evaluateAndConditions,
  evaluateOrLogicGroups,
  fetchCart,
  getRecommendationsProductVariants,
  getSellingPlanId,
  tagAssistantCart,
  tagCart
};

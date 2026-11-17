import { createResponseItemsData } from "./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js";
import { recommendationMetafieldRefs, createRecommendationCard } from "./quiz-renderer-recommendation-card-Cb3zuIKN.js";
import { isUsableRecommendationItem } from "./quiz-renderer-recommendation-card-Cb3zuIKN.js";
import { htmlQuizResourceKind, setQuizParts } from "./quiz-renderer-mount-D_glRQuD.js";
import { SHOPIFY_DEFAULT_VARIANT_TITLE } from "./quiz-renderer-variant-title-B1Oi9SHh.js";
import "./quiz-renderer.js";
import "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
import "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-currency-helper-ggAAwMUm.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
function sampleRecommendationItem(index, type, title, imageUrl, metafieldRefs) {
  const image = { url: imageUrl, altText: title };
  const measurement = { referenceUnit: "ML", referenceValue: 100 };
  const unitPrice = { amount: `${5 + index}.00`, currencyCode: "USD" };
  const variant = {
    id: `gid://shopify/ProductVariant/${index * 2 + 1}`,
    title: type === "products" ? "Small" : SHOPIFY_DEFAULT_VARIANT_TITLE,
    availableForSale: true,
    price: { amount: `${20 + index}.00`, currencyCode: "USD" },
    compareAtPrice: { amount: `${25 + index}.00`, currencyCode: "USD" },
    unitPrice,
    unitPriceMeasurement: measurement,
    image
  };
  const altVariant = {
    ...variant,
    id: `gid://shopify/ProductVariant/${index * 2 + 2}`,
    title: "Large",
    price: { amount: `${25 + index}.00`, currencyCode: "USD" },
    compareAtPrice: { amount: `${30 + index}.00`, currencyCode: "USD" }
  };
  const dynamicMetafields = [...metafieldRefs].map((ref) => {
    const [namespace, key] = ref.split(".");
    return {
      namespace,
      key,
      ...ref === "reviews.rating" ? {
        type: "rating",
        value: JSON.stringify({ value: "4.5", scale_min: "1.0", scale_max: "5.0" })
      } : ref === "reviews.rating_count" ? { type: "number_integer", value: "12" } : { type: "single_line_text_field", value: `[${ref}]` }
    };
  });
  const plans = {
    requiresSellingPlan: false,
    plans: [
      { id: "1", name: "Deliver every month" },
      { id: "2", name: "Deliver every 3 months" }
    ],
    allocations: Object.fromEntries(
      [variant, altVariant].map(({ id, price }) => {
        const cents = Number(price.amount) * 100;
        const allocation = { price: cents - cents / 10, compareAtPrice: cents };
        return [id.slice(id.lastIndexOf("/") + 1), { 1: allocation, 2: allocation }];
      })
    )
  };
  const product = {
    dynamicMetafields,
    handle: "sample",
    title,
    description: title,
    vendor: title,
    onlineStoreUrl: "https://example.invalid/sample",
    images: { edges: [{ node: image }] },
    variants: { edges: [{ node: variant }, { node: altVariant }] }
  };
  const item = htmlQuizResourceKind(type) === "product-variants" ? { ...variant, product } : type === "collections" ? {
    title,
    description: title,
    image,
    onlineStoreUrl: product.onlineStoreUrl,
    dynamicMetafields
  } : product;
  return { id: variant.id, item, plans };
}
const BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function appendRecommendationSkeletons(document, output, options) {
  const { template, type, count, message } = options;
  for (let i = 0; i < count; i++) {
    const { id, item } = sampleRecommendationItem(
      i,
      type,
      "Recommended product",
      BLANK_IMAGE,
      recommendationMetafieldRefs(template, type)
    );
    const { element } = createRecommendationCard(document, item, id, {
      template,
      type,
      domain: "example.invalid",
      message,
      navigate: () => {
      },
      add: async () => {
      },
      disposed: () => true
    });
    setQuizParts(element, "card", "skeleton");
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("inert", "");
    output.append(element);
  }
}
export {
  appendRecommendationSkeletons,
  createRecommendationCard,
  createResponseItemsData,
  isUsableRecommendationItem,
  recommendationMetafieldRefs
};

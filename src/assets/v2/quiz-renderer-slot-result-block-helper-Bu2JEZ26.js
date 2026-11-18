import { SlotType, hasDynamicContent, getDataRefsFromDynamicContent, SlotBlockType, jsxDevRuntimeExports, clsx, removeHtmlTags } from "./quiz-renderer-json-renderer-B6X3VaGt.js";
import { getStoreFrontClient } from "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
const getMetafieldSourceForSlot = ({
  slotType,
  blockSource
}) => {
  switch (String(slotType)) {
    case SlotType.PRODUCTS:
      return "products";
    case SlotType.COLLECTIONS:
      return "collections";
    case SlotType.PRODUCTS_VARIANTS:
      return blockSource === "variant" ? "productVariants" : "products";
    default:
      return null;
  }
};
const getMetafieldOwnerForSlotItem = ({
  type,
  item,
  source
}) => {
  if (type === "variant" && source !== "variant") {
    return item == null ? void 0 : item.product;
  }
  return item;
};
const IMAGE_PLACEHOLDER = "https://cdn.shopify.com/s/files/1/0273/8113/7492/files/placeholder-image.png?v=1717430394";
const mockCollections = (t) => ({
  id: "gid://shopify/Collection/123",
  title: t("collections_mock_title"),
  description: t("collections_mock_description"),
  image: {
    url: IMAGE_PLACEHOLDER,
    altText: "Collection Image"
  }
});
const mockProducts = (t) => ({
  id: "gid://shopify/Product/123",
  title: t("products_mock_title"),
  description: t("products_mock_description"),
  vendor: t("vendor"),
  images: {
    edges: [
      {
        node: {
          url: IMAGE_PLACEHOLDER,
          altText: t("product_image")
        }
      }
    ]
  },
  priceRange: {
    minVariantPrice: {
      amount: "99.95",
      currencyCode: "USD"
    }
  },
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/123",
          title: t("product_variant"),
          price: {
            amount: "99.95",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "199.95",
            currencyCode: "USD"
          },
          image: {
            url: IMAGE_PLACEHOLDER,
            altText: t("product_variant_image")
          }
        }
      }
    ]
  }
});
const mockProductsVariants = (t) => ({
  id: "gid://shopify/ProductVariant/123",
  title: t("product_variants_mock_title"),
  product: {
    title: t("products_mock_title"),
    description: t("product_variants_mock_description"),
    vendor: t("vendor"),
    image: {
      url: IMAGE_PLACEHOLDER,
      altText: t("product_image")
    },
    images: {
      edges: [
        {
          node: {
            url: IMAGE_PLACEHOLDER,
            altText: t("product_image")
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "99.95",
        currencyCode: "USD"
      }
    }
  },
  price: {
    amount: "99.95",
    currencyCode: "USD"
  },
  compareAtPrice: {
    amount: "199.95",
    currencyCode: "USD"
  }
});
const fetchProductsByFilter$1 = (
  /* GraphQL */
  `
  query FetchProductsByFilter(
    $first: Int!
    $query: String!
    $country: CountryCode
    $locale: LanguageCode
  ) @inContext(country: $country, language: $locale) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          availableForSale
          title
          description
          vendor
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          onlineStoreUrl
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                availableForSale
                title
                selectedOptions {
                  name
                  value
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`
);
const VIRTUAL_COLLECTION_KEYS = {
  TAGS: "__virtual_tags__",
  VENDORS: "__virtual_vendors__",
  VARIANTS: "__virtual_variants__"
};
const escapeQueryValue = (value) => {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
};
const fetchProductsByFilter = async ({
  query,
  first = 50,
  country = "US",
  locale = "EN",
  clientData
}) => {
  var _a, _b;
  const client = await getStoreFrontClient(clientData.storefrontAccessToken, clientData.shop);
  if (!client) {
    return [];
  }
  try {
    const response = await client.request(fetchProductsByFilter$1, {
      variables: {
        first,
        query,
        country,
        locale
      }
    });
    const { data, errors } = response;
    if (errors) {
      console.warn("GraphQL errors in fetchProductsByFilter:", errors);
      return [];
    }
    const products = ((_b = (_a = data == null ? void 0 : data.products) == null ? void 0 : _a.edges) == null ? void 0 : _b.map((edge) => edge.node)) || [];
    return products;
  } catch (error) {
    console.error("Error in fetchProductsByFilter:", error);
    return [];
  }
};
const buildTagsQuery = (tags) => {
  if (!tags || tags.length === 0) return "";
  return tags.map((tag) => `tag:"${escapeQueryValue(tag)}"`).join(" OR ");
};
const buildVendorsQuery = (vendors) => {
  if (!vendors || vendors.length === 0) return "";
  return vendors.map((vendor) => `vendor:"${escapeQueryValue(vendor)}"`).join(" OR ");
};
const buildVariantsQuery = (variants) => {
  if (!variants || variants.length === 0) return "";
  return variants.map((variant) => `"${escapeQueryValue(variant)}"`).join(" OR ");
};
const fetchVirtualCollections = async (collections, clientData) => {
  const results = {};
  const [tagResult, vendorResult, variantResult] = await Promise.allSettled([
    collections.tags.length > 0 ? fetchProductsByFilter({
      query: buildTagsQuery(collections.tags),
      clientData
    }) : Promise.resolve([]),
    collections.vendors.length > 0 ? fetchProductsByFilter({
      query: buildVendorsQuery(collections.vendors),
      clientData
    }) : Promise.resolve([]),
    collections.variants.length > 0 ? fetchProductsByFilter({
      query: buildVariantsQuery(collections.variants),
      clientData
    }) : Promise.resolve([])
  ]);
  if (tagResult.status === "fulfilled" && tagResult.value.length > 0) {
    results[VIRTUAL_COLLECTION_KEYS.TAGS] = tagResult.value;
  } else if (tagResult.status === "rejected") {
    console.warn("Error fetching products by tags:", tagResult.reason);
  }
  if (vendorResult.status === "fulfilled" && vendorResult.value.length > 0) {
    results[VIRTUAL_COLLECTION_KEYS.VENDORS] = vendorResult.value;
  } else if (vendorResult.status === "rejected") {
    console.warn("Error fetching products by vendors:", vendorResult.reason);
  }
  if (variantResult.status === "fulfilled" && variantResult.value.length > 0) {
    results[VIRTUAL_COLLECTION_KEYS.VARIANTS] = variantResult.value;
  } else if (variantResult.status === "rejected") {
    console.warn("Error fetching products by variants:", variantResult.reason);
  }
  return results;
};
const scanSlotsForMetafieldReferences = (result, preferences) => {
  const metafieldRefs = {
    products: /* @__PURE__ */ new Set(),
    collections: /* @__PURE__ */ new Set(),
    productVariants: /* @__PURE__ */ new Set()
  };
  const getReviewMetafields = (reviewApp2) => {
    if (reviewApp2 && reviewApp2 !== "none") {
      return ["reviews.rating", "reviews.rating_count"];
    }
    return [];
  };
  const reviewApp = (preferences == null ? void 0 : preferences.reviewApp) || "none";
  const hasReviewBlocks = {
    products: false,
    productVariants: false
  };
  result.sections.forEach((section) => {
    const slotBlocks = section.blocks.filter(
      (block) => block.type === "slots"
    );
    slotBlocks.forEach((slotBlock) => {
      const blockType = slotBlock.preferences.type;
      if (slotBlock.preferences.slots) {
        const addRefsForSource = (refs, blockSource) => {
          const metafieldSource = getMetafieldSourceForSlot({ slotType: blockType, blockSource });
          if (metafieldSource === "products") {
            refs.forEach((ref) => metafieldRefs.products.add(ref));
          } else if (metafieldSource === "collections") {
            refs.forEach((ref) => metafieldRefs.collections.add(ref));
          } else if (metafieldSource === "productVariants") {
            refs.forEach((ref) => metafieldRefs.productVariants.add(ref));
          }
        };
        slotBlock.preferences.slots.forEach((_slot) => {
          if (slotBlock.preferences.slotsBlocks) {
            const metafieldBlocks = slotBlock.preferences.slotsBlocks.filter(
              (block) => block.type === "metafield"
            );
            metafieldBlocks.forEach((metafieldBlock) => {
              if (metafieldBlock.content && typeof metafieldBlock.content === "string") {
                addRefsForSource([metafieldBlock.content], metafieldBlock.source);
              }
            });
            const textBlocks = slotBlock.preferences.slotsBlocks.filter(
              (block) => block.type === "text"
            );
            textBlocks.forEach((textBlock) => {
              if (textBlock.content && typeof textBlock.content === "string" && hasDynamicContent(textBlock.content)) {
                addRefsForSource(getDataRefsFromDynamicContent(textBlock.content));
              }
            });
            const reviewBlocks = slotBlock.preferences.slotsBlocks.filter(
              (block) => block.type === SlotBlockType.REVIEWS
            );
            if (reviewBlocks.length > 0) {
              const reviewMetafieldSource = getMetafieldSourceForSlot({ slotType: blockType });
              if (reviewMetafieldSource === "products") {
                hasReviewBlocks.products = true;
              } else if (reviewMetafieldSource === "productVariants") {
                hasReviewBlocks.productVariants = true;
              }
            }
          }
        });
      }
    });
  });
  if (reviewApp !== "none") {
    const reviewMetafields = getReviewMetafields(reviewApp);
    if (hasReviewBlocks.products) {
      reviewMetafields.forEach((ref) => metafieldRefs.products.add(ref));
    }
    if (hasReviewBlocks.productVariants) {
      reviewMetafields.forEach((ref) => metafieldRefs.productVariants.add(ref));
    }
  }
  return metafieldRefs;
};
const extractProductsFromCollections = (collectionIds, fetchedFixedRecommendations, maxItems) => {
  var _a;
  const products = [];
  for (const collectionId of collectionIds) {
    const collection = fetchedFixedRecommendations[collectionId];
    if (collection && typeof collection === "object" && "products" in collection && ((_a = collection.products) == null ? void 0 : _a.edges)) {
      const collectionWithProducts = collection;
      for (const edge of collectionWithProducts.products.edges) {
        if (edge == null ? void 0 : edge.node) {
          products.push(edge.node);
          if (products.length >= maxItems) {
            return products;
          }
        }
      }
    }
  }
  return products;
};
const extractProductsFromVirtualCollections = (slot, fetchedFixedRecommendations, maxItems) => {
  var _a, _b, _c;
  const products = [];
  const hasTags = (((_a = slot.includedTagsCollectionsIds) == null ? void 0 : _a.length) ?? 0) > 0;
  const hasVendors = (((_b = slot.includedVendorsCollectionsIds) == null ? void 0 : _b.length) ?? 0) > 0;
  const hasVariants = (((_c = slot.includedVariantsCollectionsIds) == null ? void 0 : _c.length) ?? 0) > 0;
  const tagProducts = fetchedFixedRecommendations[VIRTUAL_COLLECTION_KEYS.TAGS];
  if (hasTags && Array.isArray(tagProducts)) {
    for (const product of tagProducts) {
      if (products.length >= maxItems) break;
      products.push(product);
    }
  }
  const vendorProducts = fetchedFixedRecommendations[VIRTUAL_COLLECTION_KEYS.VENDORS];
  if (hasVendors && Array.isArray(vendorProducts)) {
    for (const product of vendorProducts) {
      if (products.length >= maxItems) break;
      if ((product == null ? void 0 : product.id) && !products.some((p) => (p == null ? void 0 : p.id) === product.id)) {
        products.push(product);
      }
    }
  }
  const variantProducts = fetchedFixedRecommendations[VIRTUAL_COLLECTION_KEYS.VARIANTS];
  if (hasVariants && Array.isArray(variantProducts)) {
    for (const product of variantProducts) {
      if (products.length >= maxItems) break;
      if ((product == null ? void 0 : product.id) && !products.some((p) => (p == null ? void 0 : p.id) === product.id)) {
        products.push(product);
      }
    }
  }
  return products;
};
const getMockedArray = (slot, t, blockRecommendationSystem, blockSlotType, fetchedFixedRecommendations) => {
  var _a, _b, _c, _d;
  const typeStringHelperMap = {
    products: "includedProductsIds",
    collections: "includedCollectionsIds",
    products_variants: "includedProductsVariantsIds"
  };
  const maxRecommendedItems = slot.maxRecommendedItems;
  const fixedElementsIds = [...slot[typeStringHelperMap[blockSlotType]]];
  const isFixedProducts = blockSlotType === "products" && blockRecommendationSystem === "fixed";
  const hasCollectionsForProducts = isFixedProducts && (((_a = slot.includedCollectionsIds) == null ? void 0 : _a.length) ?? 0) > 0;
  const hasVirtualCollectionsForProducts = isFixedProducts && ((((_b = slot.includedTagsCollectionsIds) == null ? void 0 : _b.length) ?? 0) > 0 || (((_c = slot.includedVendorsCollectionsIds) == null ? void 0 : _c.length) ?? 0) > 0 || (((_d = slot.includedVariantsCollectionsIds) == null ? void 0 : _d.length) ?? 0) > 0);
  const hasFixedElements = blockRecommendationSystem === "fixed" && fixedElementsIds.length > 0 || hasCollectionsForProducts || hasVirtualCollectionsForProducts;
  if (!hasFixedElements) {
    return Array.from({ length: maxRecommendedItems }).map(
      () => getMockDataByType(blockSlotType, t)
    );
  }
  const arrayToMock = [];
  if (hasCollectionsForProducts || hasVirtualCollectionsForProducts) {
    if (fixedElementsIds.length > 0) {
      const directProducts = fixedElementsIds.map((id) => fetchedFixedRecommendations[id]).filter((item) => item !== void 0 && item !== null);
      arrayToMock.push(...directProducts);
    }
    if (hasCollectionsForProducts) {
      const productsFromCollections = extractProductsFromCollections(
        slot.includedCollectionsIds || [],
        fetchedFixedRecommendations,
        maxRecommendedItems - arrayToMock.length
      );
      arrayToMock.push(...productsFromCollections);
    }
    if (hasVirtualCollectionsForProducts && arrayToMock.length < maxRecommendedItems) {
      const productsFromVirtual = extractProductsFromVirtualCollections(
        slot,
        fetchedFixedRecommendations,
        maxRecommendedItems - arrayToMock.length
      );
      const newProducts = productsFromVirtual.filter(
        (p) => (p == null ? void 0 : p.id) && !arrayToMock.some((existing) => existing && "id" in existing && existing.id === p.id)
      );
      const remainingSlots = maxRecommendedItems - arrayToMock.length;
      arrayToMock.push(...newProducts.slice(0, remainingSlots));
    }
  } else {
    const elementsToShowCount = Math.min(maxRecommendedItems, fixedElementsIds.length);
    const randomizedFixedElementsIds = fixedElementsIds.length > maxRecommendedItems ? fixedElementsIds.sort(() => Math.random() - 0.5) : fixedElementsIds;
    const fixedElements = randomizedFixedElementsIds.slice(0, elementsToShowCount).map((id) => fetchedFixedRecommendations[id]).filter((item) => item !== void 0 && item !== null);
    arrayToMock.push(...fixedElements);
  }
  const actualElementsToMockCount = maxRecommendedItems - arrayToMock.length;
  if (actualElementsToMockCount > 0) {
    const mockElements = Array.from({ length: actualElementsToMockCount }).map(
      () => getMockDataByType(blockSlotType, t)
    );
    arrayToMock.push(...mockElements);
  }
  return arrayToMock;
};
const getMockDataByType = (type, t) => {
  switch (type) {
    case "collections":
      return mockCollections(t);
    case "products":
      return mockProducts(t);
    case "products_variants":
      return mockProductsVariants(t);
  }
};
const slotHeadingClass = (headingSize, contentAlignment, slotHeadingContent) => clsx(
  "heading results-slot_heading",
  headingSize === "large" && "results-slot_heading-large",
  headingSize === "medium" && "results-slot_heading-medium",
  headingSize === "small" && "results-slot_heading-small",
  contentAlignment === "left" && "results-slot_heading-left",
  contentAlignment === "center" && "results-slot_heading-center",
  contentAlignment === "right" && "results-slot_heading-right",
  removeHtmlTags(slotHeadingContent).length === 0 && "results-slot_heading-empty"
);
const slotDescriptionClass = (contentAlignment, textSize) => clsx(
  "results-slot_description",
  contentAlignment === "left" && "results-slot_description-left",
  contentAlignment === "center" && "results-slot_description-center",
  contentAlignment === "right" && "results-slot_description-right",
  textSize === "large" && "results-slot_description-large",
  textSize === "medium" && "results-slot_description-medium",
  textSize === "small" && "results-slot_description-small"
);
const resultsSlotProductListClass = (block) => {
  const { itemsAlignment } = block.preferences;
  return `results-slot_products_list results-slot_products_list-${itemsAlignment}`;
};
const choiceSelectIndicator = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "choice-select__indicators", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "choice-select__indicator-separator" }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/result-specific/slots/slot-result-block-helper.tsx",
    lineNumber: 379,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "choice-select__indicator choice-select__dropdown-indicator", "aria-hidden": "true", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { height: "20", width: "20", viewBox: "0 0 20 20", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/result-specific/slots/slot-result-block-helper.tsx",
    lineNumber: 382,
    columnNumber: 9
  }, void 0) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/result-specific/slots/slot-result-block-helper.tsx",
    lineNumber: 381,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/result-specific/slots/slot-result-block-helper.tsx",
    lineNumber: 380,
    columnNumber: 5
  }, void 0)
] }, void 0, true, {
  fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/result-specific/slots/slot-result-block-helper.tsx",
  lineNumber: 378,
  columnNumber: 3
}, void 0);
export {
  choiceSelectIndicator,
  fetchVirtualCollections,
  getMetafieldOwnerForSlotItem,
  getMockedArray,
  resultsSlotProductListClass,
  scanSlotsForMetafieldReferences,
  slotDescriptionClass,
  slotHeadingClass
};

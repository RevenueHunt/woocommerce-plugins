import { CREATE_RESPONSE_ITEMS_DATA_URL } from "./quiz-renderer.js";
import { getStoreFrontClient } from "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
const fetchItemSlotData$2 = (
  /* GraphQL */
  `
  query FetchItems(
    $ids: [ID!]!
    $country: CountryCode
    $locale: LanguageCode
    $productMetafields: [HasMetafieldsIdentifier!]!
    $collectionMetafields: [HasMetafieldsIdentifier!]!
    $variantMetafields: [HasMetafieldsIdentifier!]!
    $includeCollectionProducts: Boolean!
  ) @inContext(country: $country, language: $locale) {
    nodes(ids: $ids) {
      ... on Product {
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
        # Dynamic metafields for products
        dynamicMetafields: metafields(identifiers: $productMetafields) {
          namespace
          key
          value
          type
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
              unitPrice {
                amount
                currencyCode
              }
              unitPriceMeasurement {
                quantityUnit
                quantityValue
                referenceUnit
                referenceValue
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
      ... on Collection {
        id
        title
        description
        handle
        image {
          url
          altText
        }
        onlineStoreUrl
        # Dynamic metafields for collections
        dynamicMetafields: metafields(identifiers: $collectionMetafields) {
          namespace
          key
          value
          type
        }
        # Products within the collection (for builder preview of fixed collections in product slots)
        products(first: 50) @include(if: $includeCollectionProducts) {
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
                    unitPrice {
                      amount
                      currencyCode
                    }
                    unitPriceMeasurement {
                      quantityUnit
                      quantityValue
                      referenceUnit
                      referenceValue
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
      ... on ProductVariant {
        id
        availableForSale
        title
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        image {
          url
          altText
        }
        product {
          title
          description
          onlineStoreUrl
          availableForSale
          vendor
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          # Dynamic metafields for parent products
          dynamicMetafields: metafields(identifiers: $productMetafields) {
            namespace
            key
            value
            type
          }
        }
        # Dynamic metafields for variants
        dynamicMetafields: metafields(identifiers: $variantMetafields) {
          namespace
          key
          value
          type
        }
      }
    }
  }
`
);
const fetchItemSlotData$1 = async ({
  itemGIds,
  country = "US",
  locale = "EN",
  clientData,
  metafieldRefs,
  includeCollectionProducts = false
}) => {
  const client = await getStoreFrontClient(clientData.storefrontAccessToken, clientData.shop);
  if (!client) return {};
  try {
    const formatMetafieldIdentifiers = (refs) => {
      return Array.from(refs || []).map((ref) => {
        const [namespace, key] = ref.split(".");
        return { namespace, key };
      });
    };
    const productMetafields = metafieldRefs ? formatMetafieldIdentifiers(metafieldRefs.products) : [];
    const collectionMetafields = metafieldRefs ? formatMetafieldIdentifiers(metafieldRefs.collections) : [];
    const variantMetafields = metafieldRefs ? formatMetafieldIdentifiers(metafieldRefs.productVariants) : [];
    const response = await client.request(fetchItemSlotData$2, {
      variables: {
        ids: itemGIds,
        country,
        locale,
        productMetafields,
        collectionMetafields,
        variantMetafields,
        includeCollectionProducts
      }
    });
    const { data, errors } = response;
    if (errors) {
      console.warn("Error fetching item data:", errors);
      return {};
    }
    const fetchedData = data.nodes.reduce((acc, node) => {
      if (node && node.id) {
        acc[node.id] = node;
      }
      return acc;
    }, {});
    return fetchedData;
  } catch (error) {
    console.error("Error fetching items data:", error);
    return {};
  }
};
const getMarketContext = (overrides = {}) => {
  var _a, _b, _c;
  const urlParams = new URLSearchParams(window.location.search);
  const country = ((_a = overrides.country) == null ? void 0 : _a.toUpperCase()) ?? ((_b = window == null ? void 0 : window.quiz_country) == null ? void 0 : _b.toUpperCase()) ?? ((_c = urlParams.get("country")) == null ? void 0 : _c.toUpperCase()) ?? "US";
  const initialLocale = overrides.locale ?? (window == null ? void 0 : window.quiz_locale) ?? urlParams.get("locale") ?? "EN";
  const upperLocale = initialLocale.toUpperCase().replace("-", "_");
  const locale = upperLocale.startsWith("ZH_") ? upperLocale : upperLocale.split("_")[0];
  return { country, locale };
};
const fetchItemSlotData = async (itemGids, clientData, metafieldRefs, config = {}) => {
  const { includeCollectionProducts = false, ...overrides } = config;
  const market = getMarketContext(overrides);
  const country = overrides.country === null ? null : market.country;
  const locale = overrides.locale === null ? null : market.locale;
  if (itemGids.length <= 0) {
    return {};
  }
  const data = await fetchItemSlotData$1({
    itemGIds: itemGids,
    country,
    locale,
    clientData,
    metafieldRefs,
    includeCollectionProducts
  });
  return data;
};
const createResponseItemsData = async (responseId, slotsItems, shown) => {
  const payload = {
    responseId,
    itemsData: slotsItems,
    ...shown
  };
  try {
    await fetch(CREATE_RESPONSE_ITEMS_DATA_URL(responseId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Error creating response items data:", error);
  }
};
export {
  createResponseItemsData,
  fetchItemSlotData,
  getMarketContext
};

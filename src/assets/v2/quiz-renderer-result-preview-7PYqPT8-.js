const __vite__fileDeps=["./quiz-renderer-chart-result-block-Bv24ds-4.js","./quiz-renderer.js","./quiz-renderer-json-renderer-CJBOnGnk.js","./quiz-renderer-index-BXMeXr7c.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-country-data-CuDUzlny.js","./quiz-renderer2.css","./quiz-renderer-custom-chart-core-DUcUrm7y.js","./quiz-renderer-chart-helpers-BLPAWvOd.js","./quiz-renderer-chart-error-boundary-BBV35ubO.js","./quiz-renderer-rating-block-DgJgPmrE.js","./quiz-renderer-rating-core-DyCz6Aed.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { useLanguageDirection, clsx, Alignment, jsxRuntimeExports, useQuizStore, useArrowKeyFocusNavigation, HeadingSize, useRenderedContent, ImageSize, ImagePlaceholder, getVideoContainerClassName, VideoPlayer, VideoPlaceholder, reactExports, hasDynamicContent, dynamicContentPattern, escapeHtml, useQuizStoreApi, useLiquidRenderer, sanitizeCanvasHtml, useCustomHtmlScripts, buildQuizContext, SlotBlockType, ImageSourceType, FaMinus, FaPlus, useInspectorWrapper, useDraftProductPlaceholder, replaceHtmlTags, SlotsLayout, ResultBlockType, FaUndo, useMediaQuery, MEDIA_QUERY_TYPES, transformMediaToContainerQueries, wrapWithScope, createQuizDOMHelpers, Loader, getQuizResponse, getSubmissionAnswers, createQuizResponse } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
import { postQuizRendererMessage } from "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import { __vitePreload } from "./quiz-renderer.js";
import { trackProductAddedToCart, trackCustomerProceedToCheckout, trackProductClicked, trackRetakeQuiz } from "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import { getRecommendationsProductVariants, addRecommendationsToCart, createAddAllToCartFunction, createSimpleAddToCart, addToCart, changeToCart, getSellingPlanId, fetchCart, tagCart } from "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import { createApplyDiscountCodeFunction, parseCartItemsFromFetchCart, updateCart, syncCartNeedsRefresh, refreshCartUI, filterInvalidGids, getVisibleSections, claimOpenCartWhenIdle, applyDiscount, resetCartUIState, cartIntentFor, getSlotsGidsFromRecommendations } from "./quiz-renderer-cart-hGLiNvFe.js";
import { getMetafieldOwnerForSlotItem, choiceSelectIndicator, slotHeadingClass, slotDescriptionClass, resultsSlotProductListClass, getMockedArray, scanSlotsForMetafieldReferences, fetchVirtualCollections } from "./quiz-renderer-slot-result-block-helper-B64MgNga.js";
import { PictureType, processImageResultsProduct } from "./quiz-renderer-image-processing-B3Hir3-2.js";
import { formatPriceWithCurrency, getDefaultUnitPricePreview, formatUnitPrice } from "./quiz-renderer-currency-helper-ggAAwMUm.js";
import { hasVariantChoice } from "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import { STOREFRONT_API_VERSION } from "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
import { getMarketContext, fetchItemSlotData, createResponseItemsData } from "./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js";
import { getVariantDisplayTitle } from "./quiz-renderer-variant-title-B1Oi9SHh.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-country-data-CuDUzlny.js";
const ButtonResultBlock = ({ block }) => {
  const { buttonAlignment, content, buttonText, buttonUrl, openInNewTab } = block.preferences;
  const dir = useLanguageDirection();
  const buttonClass = clsx("button-result-block", {
    "button-result-block--left": buttonAlignment === Alignment.LEFT,
    "button-result-block--center": buttonAlignment === Alignment.CENTER,
    "button-result-block--right": buttonAlignment === Alignment.RIGHT,
    "button-result-block--external": openInNewTab
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "button-result-block__container", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: buttonClass,
      onClick: buttonUrl ? () => {
        if (openInNewTab) {
          window.open(buttonUrl, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = buttonUrl;
        }
      } : void 0,
      disabled: !buttonUrl,
      children: content || buttonText
    }
  ) });
};
const CartCheckoutButtonResultBlock = ({
  block,
  fetchedSlotItems = {}
}) => {
  var _a;
  const quizName = useQuizStore((state) => state.name);
  const {
    id,
    addToCart: addToCart2,
    addMultipleItemsToCart,
    cartItems,
    currentQuizPage,
    getTranslatedContent,
    isStoreRenderer,
    preferences,
    inBuilder,
    getSubscriptionSelection
  } = useQuizStore((state) => ({
    id: state.id,
    addToCart: state.addToCart,
    addMultipleItemsToCart: state.addMultipleItemsToCart,
    cartItems: state.cartItems,
    currentQuizPage: state.currentQuizPage,
    getTranslatedContent: state.getTranslatedContent,
    isStoreRenderer: state.isStoreRenderer,
    preferences: state.preferences,
    inBuilder: state.inBuilder,
    getSubscriptionSelection: state.getSubscriptionSelection
  }));
  const dir = useLanguageDirection();
  const { buttonAlignment, content, addAllToCart, proceedTo } = block.preferences;
  const addAllToCartText = block.preferences.addAllToCartText;
  const handleGoToPage = (page) => {
    var _a2, _b;
    if (!isStoreRenderer) {
      return;
    }
    const url = (((_b = (_a2 = window.Shopify) == null ? void 0 : _a2.routes) == null ? void 0 : _b.root) ?? "/") + page;
    window.location.href = url;
  };
  const handleAddAllToCart = async () => {
    try {
      const fetchedSlotItemsArray = Object.values(fetchedSlotItems).flat();
      const productVariants = await addRecommendationsToCart(
        fetchedSlotItemsArray,
        addToCart2,
        addMultipleItemsToCart,
        isStoreRenderer,
        inBuilder,
        cartItems,
        getSubscriptionSelection
      );
      productVariants.forEach((variant) => {
        trackProductAddedToCart(
          id,
          {
            id: variant.variantId,
            title: variant.title,
            price: { amount: variant.price, currencyCode: variant.currency }
          },
          (currentQuizPage == null ? void 0 : currentQuizPage.ref) || "",
          preferences
        );
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCartButtonKeyDown = useArrowKeyFocusNavigation(".quiz");
  const handleButtonKeyDown = (e) => {
    handleCartButtonKeyDown(e);
    if (proceedTo === "checkout") {
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.quantity * Number(item.price),
        0
      );
      const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      const currency = cartItems.length > 0 ? cartItems[0].currency : "USD";
      trackCustomerProceedToCheckout(totalQuantity, currency, totalPrice, quizName, preferences);
    }
  };
  const buttonClass = clsx("button-result-block", {
    "button-result-block--left": buttonAlignment === Alignment.LEFT,
    "button-result-block--center": buttonAlignment === Alignment.CENTER,
    "button-result-block--right": buttonAlignment === Alignment.RIGHT
  });
  if (!cartItems.length && addAllToCart) {
    const fetchedSlotItemsArray = Object.values(fetchedSlotItems).flat();
    const productCount = ((_a = getRecommendationsProductVariants(fetchedSlotItemsArray)) == null ? void 0 : _a.length) ?? 0;
    const addAllToCartLabel = addAllToCartText ? addAllToCartText : getTranslatedContent({
      key: "add_all_to_cart",
      values: { count: productCount }
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "button-result-block__container", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `${buttonClass} add-all-to-cart`,
        "data-cy": "cart-checkout-button-add-all-to-cart",
        onClick: handleAddAllToCart,
        "aria-label": addAllToCartLabel,
        onKeyDown: handleButtonKeyDown,
        children: addAllToCartLabel
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "button-result-block__container", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `${buttonClass} proceed-to-${proceedTo}`,
      "data-cy": `cart-checkout-button-proceed-to-${proceedTo}`,
      disabled: !cartItems.length,
      onClick: () => handleGoToPage(proceedTo),
      "aria-label": content || getTranslatedContent({ key: "proceed_to_" + proceedTo }),
      onKeyDown: handleButtonKeyDown,
      children: content || getTranslatedContent({
        key: `proceed_to_${proceedTo}`,
        values: { count: cartItems.reduce((acc, item) => acc + item.quantity, 0) }
      })
    }
  ) });
};
const HeadingResultBlocks = ({ block }) => {
  const { preferences } = block;
  const { headingSize, content, headingAlignment } = preferences;
  const dir = useLanguageDirection();
  const headingLevel = headingSize === HeadingSize.SMALL ? 3 : headingSize === HeadingSize.MEDIUM ? 2 : 1;
  const renderedContent = useRenderedContent(content || "", {
    mode: "heading",
    headingLevel,
    context: "result"
  });
  const headingBlockClass = clsx("heading results-heading", {
    "heading__small results-heading__small": headingSize === HeadingSize.SMALL,
    "heading__medium results-heading__medium": headingSize === HeadingSize.MEDIUM,
    "heading__large results-heading__medium": headingSize === HeadingSize.LARGE,
    "heading__left results-heading__left": headingAlignment === Alignment.LEFT,
    "heading__center results-heading__center": headingAlignment === Alignment.CENTER,
    "heading__right results-heading__right": headingAlignment === Alignment.RIGHT
  });
  const isEmptyMessage = renderedContent === null || renderedContent === "" || renderedContent === "<p><br></p>";
  if (isEmptyMessage) return null;
  const hasHeadingTag = /<h[1-6][\s>]/i.test(renderedContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: block.ref,
      className: headingBlockClass,
      ...!hasHeadingTag && { role: "heading", "aria-level": headingLevel },
      dangerouslySetInnerHTML: { __html: renderedContent },
      dir
    }
  );
};
const ImageResultBlock = ({ block }) => {
  const { imageUrl, imageSize, imageAlignment, imageAltText } = block.preferences;
  const imageClass = clsx(
    "result-image-block__image",
    imageSize === ImageSize.TINY && "result-image-block__image--tiny",
    imageSize === ImageSize.SMALL && "result-image-block__image--small",
    imageSize === ImageSize.MEDIUM && "result-image-block__image--medium",
    imageSize === ImageSize.LARGE && "result-image-block__image--large",
    imageSize === ImageSize.FULL && "result-image-block__image--full",
    imageAlignment === Alignment.LEFT && "result-image-block__image--left",
    imageAlignment === Alignment.CENTER && "result-image-block__image--center",
    imageAlignment === Alignment.RIGHT && "result-image-block__image--right"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "result-image-block", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: imageAltText || "Results block", className: imageClass }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ImagePlaceholder,
    {
      imageSize,
      imageAlignment
    }
  ) });
};
const VideoResultBlock = ({ block }) => {
  const { videoUrl, videoAspectRatio, videoAlignment, videoAltText } = block.preferences;
  const videoClass = getVideoContainerClassName({
    prefix: "result-video-block__video",
    videoAspectRatio,
    videoAlignment
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "result-video-block", children: videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: videoClass, title: videoAltText || videoAspectRatio + " video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { videoUrl }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    VideoPlaceholder,
    {
      videoAspectRatio,
      videoAlignment
    }
  ) });
};
const LIST_SINGLE_LINE_TEXT_FIELD_TYPE = "list.single_line_text_field";
const isListSingleLineTextMetafield = (metafield) => (metafield == null ? void 0 : metafield.type) === LIST_SINGLE_LINE_TEXT_FIELD_TYPE;
const parseShopifyListSingleLineTextField = (value) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === "string" && item.length > 0);
  } catch (_error) {
    return [];
  }
};
const formatMetafieldValueForInlineText = (metafield) => {
  if (!metafield) return "";
  if (isListSingleLineTextMetafield(metafield)) {
    return parseShopifyListSingleLineTextField(metafield.value).join(", ");
  }
  return metafield.value ?? "";
};
const SlotBlockText = ({
  text,
  type,
  item
}) => {
  const { inBuilder } = useQuizStore((state) => ({
    inBuilder: state.inBuilder
  }));
  const dir = useLanguageDirection();
  const { processedText, hasMissingMetafields, liquidVariables } = reactExports.useMemo(() => {
    const slotMetafields = [];
    const liquidVariables2 = { slotMetafields };
    if (!text) return { processedText: "", hasMissingMetafields: false, liquidVariables: liquidVariables2 };
    const parseText = `
      <style>
      .dynamic-content-close {
        display: none;
      }
      .dynamic-content svg {
        display: none;
      }
      .dynamic-content-display {
        margin: 0 4px;
      }
      </style>
      ${text}
    `;
    let result = parseText;
    let missingMetafields = false;
    if (hasDynamicContent(text) && item) {
      result = parseText.replace(dynamicContentPattern, (_match, dataRef) => {
        const metafieldOwner = getMetafieldOwnerForSlotItem({ type, item });
        if ((metafieldOwner == null ? void 0 : metafieldOwner.dynamicMetafields) && Array.isArray(metafieldOwner.dynamicMetafields)) {
          const [namespace, key] = dataRef.split(".");
          const metafield = metafieldOwner.dynamicMetafields.filter((mf) => mf !== null).find((mf) => mf.namespace === namespace && mf.key === key);
          if (metafield) {
            const index = slotMetafields.push(escapeHtml(formatMetafieldValueForInlineText(metafield))) - 1;
            return `<span class="dynamic-content-value">{{ slotMetafields[${index}] }}</span>`;
          }
        }
        missingMetafields = true;
        if (inBuilder) {
          return `<span class="dynamic-content-placeholder">[${dataRef}]</span>`;
        }
        return "";
      });
    }
    return { processedText: result, hasMissingMetafields: missingMetafields, liquidVariables: liquidVariables2 };
  }, [text, item, inBuilder, type]);
  const renderedContent = useRenderedContent(processedText, {
    mode: "richHtml",
    context: "result",
    liquidVariables
  });
  if (!inBuilder && hasMissingMetafields) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `slot-${type}__text`,
      dangerouslySetInnerHTML: { __html: renderedContent || "" },
      dir
    }
  );
};
const findMetafield = (item, content, type, source) => {
  const metafieldOwner = getMetafieldOwnerForSlotItem({ type, item, source });
  if (!(metafieldOwner == null ? void 0 : metafieldOwner.dynamicMetafields) || !Array.isArray(metafieldOwner.dynamicMetafields)) {
    return null;
  }
  const [namespace, key] = content.split(".");
  return metafieldOwner.dynamicMetafields.filter((mf) => mf !== null).find((mf) => mf.namespace === namespace && mf.key === key);
};
const renderMetafieldValue = (metafield) => {
  if (isListSingleLineTextMetafield(metafield)) {
    const items = parseShopifyListSingleLineTextField(metafield.value);
    if (items.length === 0) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item }, `${item}-${index}`)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: metafield.value });
};
const SlotBlockMetafield = ({
  content,
  type,
  item,
  source
}) => {
  const { inBuilder } = useQuizStore((state) => ({
    inBuilder: state.inBuilder
  }));
  const dir = useLanguageDirection();
  if (!content) {
    return null;
  }
  if (inBuilder) {
    const metafield2 = findMetafield(item, content, type, source);
    if (metafield2) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-${type}__metafield`, dir, children: renderMetafieldValue(metafield2) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-${type}__metafield slot-${type}__metafield--placeholder`, dir, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "[",
      content,
      "]"
    ] }) });
  }
  const metafield = findMetafield(item, content, type, source);
  if (metafield) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-${type}__metafield`, dir, children: renderMetafieldValue(metafield) });
  }
  return null;
};
const SlotBlockCustomHtml = reactExports.memo(function SlotBlockCustomHtml2({
  content,
  type,
  item
}) {
  const dir = useLanguageDirection();
  const storeApi = useQuizStoreApi();
  const containerRef = reactExports.useRef(null);
  const { render, hasLiquidSyntax } = useLiquidRenderer();
  const {
    inBuilder,
    runsMerchantCode,
    cartItems,
    slotItems,
    answers,
    variableScores,
    currentQuizPage,
    addToCart: addToCart2,
    addMultipleItemsToCart,
    isStoreRenderer,
    getSubscriptionSelection,
    storefrontAccessToken,
    domain
  } = useQuizStore((state) => ({
    inBuilder: state.inBuilder,
    runsMerchantCode: state.runsMerchantCode,
    cartItems: state.cartItems,
    slotItems: state.slotItems,
    answers: state.answers,
    variableScores: state.variableScores,
    currentQuizPage: state.currentQuizPage,
    addToCart: state.addToCart,
    addMultipleItemsToCart: state.addMultipleItemsToCart,
    isStoreRenderer: state.isStoreRenderer,
    getSubscriptionSelection: state.getSubscriptionSelection,
    storefrontAccessToken: state.storefrontAccessToken,
    domain: state.domain
  }));
  const [renderedContent, setRenderedContent] = reactExports.useState(content || "");
  reactExports.useEffect(() => {
    const renderContent = async () => {
      if (!content) {
        if (inBuilder) {
          const placeholder = type === "collection" ? '<div style="padding: 16px; background-color: #f5f5f5; border-radius: 4px; text-align: center; color: #666;">Collection image and title example</div>' : '<div style="padding: 16px; background-color: #f5f5f5; border-radius: 4px; text-align: center; color: #666;">Product image, title and price example</div>';
          setRenderedContent(placeholder);
        } else {
          setRenderedContent("");
        }
        return;
      }
      const context = buildQuizContext(() => storeApi.getState(), {
        mode: "result",
        currentPage: storeApi.getState().currentQuizPage,
        slotItems,
        cartItems
      });
      const contextWithItem = {
        ...context,
        item,
        itemType: type
      };
      let processedContent = content;
      if (hasLiquidSyntax(content)) {
        const { rendered } = await render(content, contextWithItem);
        processedContent = rendered;
      }
      setRenderedContent(processedContent);
    };
    renderContent();
  }, [
    content,
    type,
    item,
    render,
    hasLiquidSyntax,
    slotItems,
    cartItems,
    answers,
    variableScores,
    currentQuizPage,
    storeApi,
    inBuilder
  ]);
  const addAllToCartFn = reactExports.useMemo(
    () => createAddAllToCartFunction(
      slotItems,
      addToCart2,
      addMultipleItemsToCart,
      isStoreRenderer,
      inBuilder,
      cartItems,
      getSubscriptionSelection
    ),
    [
      slotItems,
      addToCart2,
      addMultipleItemsToCart,
      isStoreRenderer,
      inBuilder,
      cartItems,
      getSubscriptionSelection
    ]
  );
  const simpleAddToCart = reactExports.useMemo(() => createSimpleAddToCart(addToCart2), [addToCart2]);
  const applyDiscountCode = reactExports.useMemo(
    () => createApplyDiscountCodeFunction(storefrontAccessToken, domain, isStoreRenderer, inBuilder),
    [storefrontAccessToken, domain, isStoreRenderer, inBuilder]
  );
  const safeContent = runsMerchantCode ? renderedContent : sanitizeCanvasHtml(renderedContent);
  const currentResult = currentQuizPage && "sections" in currentQuizPage ? currentQuizPage : void 0;
  useCustomHtmlScripts({
    mode: "result",
    containerRef,
    renderedContent: safeContent,
    currentPage: currentResult,
    slotItems,
    cartItems,
    actions: { addAllToCart: addAllToCartFn, addToCart: simpleAddToCart, applyDiscountCode }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-${type}__custom-html`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, dangerouslySetInnerHTML: { __html: safeContent || "" }, dir }) });
});
const SlotCollection = ({
  data,
  block
}) => {
  const collection = data;
  const { getTranslatedContent, executeCustomFeatures } = useQuizStore((state) => ({
    getTranslatedContent: state.getTranslatedContent,
    executeCustomFeatures: state.executeCustomFeatures
  }));
  const { preferences } = block;
  const { slotsBlocks } = preferences;
  const onlineStoreUrl = collection.onlineStoreUrl;
  const renderSlotBlocks = () => {
    if (!slotsBlocks) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slot-collection__container", children: slotsBlocks.map((block2) => {
      let contentComponent = null;
      switch (block2.type) {
        case SlotBlockType.IMAGE:
          if (collection.image) {
            const optimize = block2.optimizeImageSize ?? false;
            const size = block2.pictureSize ?? PictureType.MEDIUM_SQUARE;
            const imgElement = /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: processImageResultsProduct(collection.image.url, optimize, size),
                alt: collection.image.altText ?? "Collection image",
                className: `slot-collection__image slot-collection__image--${size}`
              }
            );
            contentComponent = onlineStoreUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: onlineStoreUrl, className: "slot-collection__image-link", children: imgElement }) : imgElement;
          }
          break;
        case SlotBlockType.TITLE:
          contentComponent = onlineStoreUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: onlineStoreUrl, className: "slot-collection__title-link", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "slot-collection__title", children: collection.title || "" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "slot-collection__title", children: collection.title || "" });
          break;
        case SlotBlockType.DESCRIPTION:
          contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "slot-collection__description", children: collection.description || "" });
          break;
        case SlotBlockType.PRICE:
          contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "slot-collection__price" });
          break;
        case SlotBlockType.BUY_BUTTON:
          contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "slot-collection__button", href: onlineStoreUrl, children: getTranslatedContent({ key: "view_collection" }) || "View Collection" });
          break;
        case SlotBlockType.LINK:
          contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              className: "slot-collection__link",
              href: onlineStoreUrl,
              target: block2.openInNewTab ? "_blank" : "_self",
              rel: block2.openInNewTab ? "noreferrer" : void 0,
              children: getTranslatedContent({ key: "view_collection" }) || "View Collection"
            }
          );
          break;
        case SlotBlockType.TEXT:
          contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockText, { text: block2.content, type: "collection", item: collection });
          break;
        case SlotBlockType.METAFIELD:
          contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockMetafield, { content: block2.content, type: "collection", item: collection });
          break;
        case SlotBlockType.VARIANTS_DROPDOWN:
          contentComponent = null;
          break;
        case SlotBlockType.VENDOR:
          contentComponent = null;
          break;
        case SlotBlockType.CUSTOM_HTML:
          contentComponent = executeCustomFeatures ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SlotBlockCustomHtml,
            {
              content: "content" in block2 ? block2.content : "",
              type: "collection",
              item: collection,
              block: block2
            }
          ) : null;
          break;
        default:
          contentComponent = null;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: contentComponent }, block2.ref);
    }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderSlotBlocks() });
};
const SlotBlockDescription = ({
  description,
  type
}) => {
  const dir = useLanguageDirection();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `slot-${type}__description`, dir, children: description || "" });
};
const getItemUrl = (item) => {
  var _a, _b;
  const storeHost = window && ((_a = window == null ? void 0 : window.location) == null ? void 0 : _a.origin) ? (_b = window == null ? void 0 : window.location) == null ? void 0 : _b.origin : "";
  if (item.id.includes("ProductVariant")) {
    const variantId = item.id.split("/").pop();
    if (item.product.onlineStoreUrl) {
      return `${item.product.onlineStoreUrl}?variant=${variantId}`;
    }
    return `${storeHost}/products/${item.product.handle}?variant=${variantId}`;
  }
  if (item.onlineStoreUrl) {
    return item.onlineStoreUrl;
  }
  return `${storeHost}/products/${item.handle}`;
};
const SlotBlockTitle = ({
  title,
  item,
  type
}) => {
  const { inBuilder } = useQuizStore((state) => ({
    inBuilder: state.inBuilder
  }));
  const dir = useLanguageDirection();
  const url = getItemUrl(item);
  const isInIframe = window.self !== window.top;
  const isLinkDisabled = inBuilder || url.includes("undefined") || isInIframe;
  return isLinkDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `slot-${type}__title`, dir, children: title || "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: url, className: `slot-${type}__title-link`, dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `slot-${type}__title`, children: title || "" }) });
};
const getVariantInfoByVariantIdInProduct = (variantId, product) => {
  const variant = product.variants.edges.find((variant2) => variant2.node.id === variantId);
  return variant == null ? void 0 : variant.node;
};
const SlotBlockImage = (props) => {
  const { optimizeImageSize, pictureSize, imageSource = ImageSourceType.VARIANT } = props;
  const { inBuilder } = useQuizStore((state) => ({
    inBuilder: state.inBuilder
  }));
  const { image, alt, url, cssPrefix } = getImageData(props, imageSource);
  if (!image) {
    if (props.type === "product") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-product__image slot-product__image--${pictureSize}` });
    }
    return null;
  }
  const isInIframe = window.self !== window.top;
  const isLinkDisabled = inBuilder || url.includes("undefined") || isInIframe;
  return isLinkDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: processImageResultsProduct(image.url, optimizeImageSize, pictureSize),
      alt: alt ?? void 0,
      className: `${cssPrefix}__image ${cssPrefix}__image--${pictureSize}`
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: url, className: `${cssPrefix}__image-link`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: processImageResultsProduct(image.url, optimizeImageSize, pictureSize),
      alt: alt ?? void 0,
      className: `${cssPrefix}__image ${cssPrefix}__image--${pictureSize}`
    }
  ) });
};
function getImageData(props, imageSource) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  if (props.type === "variant") {
    const { productVariant } = props;
    const image2 = imageSource === ImageSourceType.PRODUCT ? ((_a = productVariant.product.images.edges[0]) == null ? void 0 : _a.node) ?? productVariant.image : productVariant.image ?? ((_b = productVariant.product.images.edges[0]) == null ? void 0 : _b.node);
    return {
      image: image2 ?? null,
      // The image is the link's only content: without alt text the link would have no name
      alt: (image2 == null ? void 0 : image2.altText) || productVariant.product.title,
      url: getItemUrl(productVariant),
      cssPrefix: "slot-variant"
    };
  }
  const { product, selectedVariant } = props;
  const variantInfo = getVariantInfoByVariantIdInProduct(selectedVariant.value, product);
  const image = imageSource === ImageSourceType.PRODUCT ? ((_c = product.images.edges[0]) == null ? void 0 : _c.node) ?? (variantInfo == null ? void 0 : variantInfo.image) : (variantInfo == null ? void 0 : variantInfo.image) ?? ((_d = product.images.edges[0]) == null ? void 0 : _d.node);
  const alt = imageSource === ImageSourceType.PRODUCT ? ((_f = (_e = product.images.edges[0]) == null ? void 0 : _e.node) == null ? void 0 : _f.altText) ?? ((_g = variantInfo == null ? void 0 : variantInfo.image) == null ? void 0 : _g.altText) : ((_h = variantInfo == null ? void 0 : variantInfo.image) == null ? void 0 : _h.altText) ?? ((_j = (_i = product.images.edges[0]) == null ? void 0 : _i.node) == null ? void 0 : _j.altText);
  return {
    image: image ?? null,
    // The image is the link's only content: without alt text the link would have no name
    alt: alt || product.title,
    url: getItemUrl(product),
    cssPrefix: "slot-product"
  };
}
const toMoneyValue = (money, fallbackCurrency) => {
  if (!money) {
    return null;
  }
  const rawAmount = typeof money.amount === "number" ? money.amount : parseFloat(money.amount);
  if (!Number.isFinite(rawAmount)) {
    return null;
  }
  const currencyCode = money.currencyCode || fallbackCurrency;
  if (!currencyCode) {
    return null;
  }
  return {
    amount: rawAmount.toString(),
    currencyCode
  };
};
const hasHigherCompareAt = (price, compareAt) => {
  if (!price || !compareAt) {
    return false;
  }
  const priceAmount = parseFloat(price.amount);
  const compareAmount = parseFloat(compareAt.amount);
  if (!Number.isFinite(priceAmount) || !Number.isFinite(compareAmount)) {
    return false;
  }
  return compareAmount > priceAmount;
};
const useSlotSubscriptionPricing = ({
  variantId,
  basePrice,
  baseCompareAtPrice
}) => {
  const subscriptionSelection = useQuizStore(
    (state) => {
      var _a;
      return ((_a = state.subscriptionSelections) == null ? void 0 : _a[variantId]) || null;
    }
  );
  return reactExports.useMemo(() => {
    var _a;
    const basePriceValue = toMoneyValue(basePrice);
    const baseCompareValue = toMoneyValue(baseCompareAtPrice, basePriceValue == null ? void 0 : basePriceValue.currencyCode);
    if (!subscriptionSelection || subscriptionSelection.mode !== "subscription") {
      const showCompare = hasHigherCompareAt(basePriceValue, baseCompareValue);
      return {
        price: basePriceValue,
        compareAtPrice: showCompare ? baseCompareValue : null,
        isSubscriptionPricing: false
      };
    }
    const planPrice = toMoneyValue(
      (_a = subscriptionSelection.selectedPlan) == null ? void 0 : _a.price,
      basePriceValue == null ? void 0 : basePriceValue.currencyCode
    );
    if (!planPrice) {
      return {
        price: basePriceValue,
        compareAtPrice: hasHigherCompareAt(basePriceValue, baseCompareValue) ? baseCompareValue : null,
        isSubscriptionPricing: false
      };
    }
    return {
      price: planPrice,
      compareAtPrice: hasHigherCompareAt(planPrice, basePriceValue) ? basePriceValue : null,
      isSubscriptionPricing: true
    };
  }, [baseCompareAtPrice, basePrice, subscriptionSelection]);
};
const SlotBlockPrice$1 = ({ productVariant }) => {
  const currencyFormat = window == null ? void 0 : window.quiz_currency;
  const dir = useLanguageDirection();
  const { price: effectivePrice, compareAtPrice } = useSlotSubscriptionPricing({
    variantId: productVariant.id,
    basePrice: productVariant.price,
    baseCompareAtPrice: productVariant.compareAtPrice
  });
  if (!effectivePrice) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "slot-variant__price", dir, children: [
    formatPriceWithCurrency(effectivePrice, currencyFormat),
    compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slot-variant__compare-at-price", children: formatPriceWithCurrency(compareAtPrice, currencyFormat) })
  ] });
};
const SlotBlockUnitPriceContent = ({
  className,
  formattedUnitPrice,
  currencyFormat
}) => {
  const dir = useLanguageDirection();
  const inBuilder = useQuizStore((state) => state.inBuilder);
  if (!formattedUnitPrice && !inBuilder) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className, dir, children: formattedUnitPrice ?? getDefaultUnitPricePreview(currencyFormat) });
};
const SlotBlockUnitPrice$1 = ({ productVariant }) => {
  const currencyFormat = window == null ? void 0 : window.quiz_currency;
  const formattedUnitPrice = formatUnitPrice({
    unitPrice: productVariant.unitPrice,
    measurement: productVariant.unitPriceMeasurement,
    currencyFormat
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SlotBlockUnitPriceContent,
    {
      className: "slot-variant__unit-price",
      formattedUnitPrice,
      currencyFormat
    }
  );
};
const SlotBlockLink = ({
  item,
  openInNewTab = false
}) => {
  const { currentQuizPage, getTranslatedContent, id, inBuilder, preferences } = useQuizStore(
    (state) => ({
      currentQuizPage: state.currentQuizPage,
      getTranslatedContent: state.getTranslatedContent,
      id: state.id,
      inBuilder: state.inBuilder,
      preferences: state.preferences
    })
  );
  const dir = useLanguageDirection();
  const type = item.id.includes("ProductVariant") ? "variant" : "product";
  const url = getItemUrl(item);
  const isInIframe = window.self !== window.top;
  const isLinkDisabled = inBuilder || url.includes("undefined") || isInIframe;
  const onClickLink = () => {
    if (!isLinkDisabled) {
      trackProductClicked(id, (currentQuizPage == null ? void 0 : currentQuizPage.ref) || "", item, preferences);
    }
  };
  return isLinkDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `slot-${type}__link disabled`, dir, children: getTranslatedContent({ key: "view_product" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      className: `slot-${type}__link`,
      href: url,
      onClick: onClickLink,
      target: openInNewTab ? "_blank" : "_self",
      rel: "noreferrer",
      dir,
      children: getTranslatedContent({ key: "view_product" })
    }
  );
};
const useCartActions = ({
  variantId,
  price,
  currency,
  productVariant,
  sellingPlanId
}) => {
  const {
    id,
    cartItems,
    recommendationsVariants,
    inBuilder,
    isStoreRenderer,
    addToStoreCart,
    addVariantQuantity,
    removeVariantQuantity,
    setRecommendationsVariants,
    currentQuizPage,
    preferences
  } = useQuizStore((state) => ({
    id: state.id,
    cartItems: state.cartItems,
    recommendationsVariants: state.recommendationsVariants,
    inBuilder: state.inBuilder,
    isStoreRenderer: state.isStoreRenderer,
    addToStoreCart: state.addToCart,
    addVariantQuantity: state.addVariantQuantity,
    removeVariantQuantity: state.removeVariantQuantity,
    setRecommendationsVariants: state.setRecommendationsVariants,
    currentQuizPage: state.currentQuizPage,
    preferences: state.preferences
  }));
  const shortVariantId = variantId.replace("gid://shopify/ProductVariant/", "");
  const isItemAdded = reactExports.useMemo(() => {
    if (inBuilder) return false;
    const haveRecommendations = recommendationsVariants.some(
      (item) => item.variantId.replace("gid://shopify/ProductVariant/", "") === shortVariantId
    );
    const cartItem = cartItems.find((item) => item.variantId === shortVariantId);
    return cartItem ? true : haveRecommendations;
  }, [shortVariantId, cartItems, recommendationsVariants, inBuilder]);
  const itemQuantity = reactExports.useMemo(() => {
    if (inBuilder) return 0;
    const cartItem = cartItems.find((item) => item.variantId === shortVariantId);
    const quantityRecommendations = recommendationsVariants.filter(
      (item) => item.variantId.replace("gid://shopify/ProductVariant/", "") === shortVariantId
    ).length;
    return cartItem ? cartItem.quantity : quantityRecommendations;
  }, [shortVariantId, cartItems, recommendationsVariants, inBuilder]);
  const addToCart$1 = reactExports.useCallback(async () => {
    if (inBuilder) return;
    const isItemInCart = Boolean(cartItems.find((item) => item.variantId === shortVariantId));
    if (!isStoreRenderer) {
      if (!isItemInCart) {
        addToStoreCart(shortVariantId, 1, price, currency);
      } else {
        addVariantQuantity(shortVariantId);
      }
      return;
    }
    try {
      const cartItem = {
        id: shortVariantId,
        quantity: 1
      };
      if (sellingPlanId) {
        cartItem.selling_plan = sellingPlanId;
      }
      await addToCart([cartItem]);
      if (!isItemInCart) {
        addToStoreCart(shortVariantId, 1, price, currency);
      } else {
        addVariantQuantity(shortVariantId);
      }
      if (currentQuizPage) {
        trackProductAddedToCart(id, productVariant, currentQuizPage.ref, preferences);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [
    inBuilder,
    isStoreRenderer,
    shortVariantId,
    price,
    currency,
    sellingPlanId,
    cartItems,
    addToStoreCart,
    addVariantQuantity,
    currentQuizPage,
    id,
    productVariant,
    preferences
  ]);
  const removeFromCart = reactExports.useCallback(async () => {
    if (inBuilder) return;
    const variant = recommendationsVariants.find(
      (item) => item.variantId.replace("gid://shopify/ProductVariant/", "") === shortVariantId
    );
    const cartItem = cartItems.find((item) => item.variantId === shortVariantId) || variant;
    if (!isStoreRenderer) {
      if (cartItem) {
        removeVariantQuantity(shortVariantId);
        if (cartItem.quantity === 1) {
          setRecommendationsVariants(
            recommendationsVariants.filter(
              (item) => item.variantId.replace("gid://shopify/ProductVariant/", "") !== shortVariantId
            )
          );
        }
      }
      return;
    }
    try {
      await changeToCart({
        id: shortVariantId,
        quantity: (cartItem == null ? void 0 : cartItem.quantity) ? cartItem.quantity - 1 : 0,
        ...sellingPlanId ? { selling_plan: sellingPlanId } : {}
      });
      if (cartItem) {
        removeVariantQuantity(shortVariantId);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }, [
    inBuilder,
    isStoreRenderer,
    variantId,
    // shortVariantId is derived from this
    shortVariantId,
    sellingPlanId,
    cartItems,
    recommendationsVariants,
    removeVariantQuantity,
    setRecommendationsVariants
  ]);
  return {
    isItemAdded,
    itemQuantity,
    addToCart: addToCart$1,
    removeFromCart,
    inBuilder
  };
};
const useCartButtonA11y = ({
  isItemAdded,
  itemQuantity,
  message
}) => {
  const actedRef = reactExports.useRef(false);
  const addButtonRef = reactExports.useRef(null);
  const plusButtonRef = reactExports.useRef(null);
  const [announcement, setAnnouncement] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!actedRef.current) return;
    actedRef.current = false;
    setAnnouncement(message);
    const target = isItemAdded ? plusButtonRef.current : addButtonRef.current;
    const root = target == null ? void 0 : target.getRootNode();
    const focusLost = !(root == null ? void 0 : root.activeElement) || root.activeElement === document.body;
    if (target && focusLost) target.focus();
  }, [isItemAdded, itemQuantity]);
  return {
    markCartAction: () => {
      actedRef.current = true;
    },
    addButtonRef,
    plusButtonRef,
    announcement
  };
};
const SlotBlockBuyButton = ({
  variant,
  productTitle
}) => {
  const { getTranslatedContent, sellingPlanId } = useQuizStore((state) => ({
    getTranslatedContent: state.getTranslatedContent,
    sellingPlanId: getSellingPlanId(state.subscriptionSelections[(variant == null ? void 0 : variant.id) ?? ""])
  }));
  const dir = useLanguageDirection();
  const { isItemAdded, itemQuantity, addToCart: addToCart2, removeFromCart } = useCartActions({
    variantId: (variant == null ? void 0 : variant.id) ?? "",
    price: parseFloat(String((variant == null ? void 0 : variant.price.amount) ?? 0)),
    currency: (variant == null ? void 0 : variant.price.currencyCode) ?? "USD",
    productVariant: variant ?? {},
    sellingPlanId
  });
  const addToCartLabel = `${getTranslatedContent({ key: "add_to_cart" })}, ${productTitle}`;
  const removeFromCartLabel = getTranslatedContent({
    key: "ada_remove_one_from_cart",
    values: { label: productTitle }
  });
  const inCartText = getTranslatedContent({
    key: "count_in_cart",
    values: { count: itemQuantity }
  });
  const { markCartAction, addButtonRef, plusButtonRef, announcement } = useCartButtonA11y({
    isItemAdded,
    itemQuantity,
    message: `${productTitle}: ${inCartText}`
  });
  if (!(variant == null ? void 0 : variant.id)) {
    return null;
  }
  const isAvailableForSale = variant.availableForSale !== false;
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    markCartAction();
    addToCart2();
  };
  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    markCartAction();
    removeFromCart();
  };
  if (!isAvailableForSale) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "slot-product__button", dir, disabled: true, children: getTranslatedContent({ key: "sold_out" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isItemAdded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "slot-product__button-added--container",
        dir,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => handleRemoveFromCart(e),
              className: "slot-product__button-remove",
              "aria-label": removeFromCartLabel,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMinus, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "slot-product__button-item-text",
              onClick: (e) => handleAddToCart(e),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAddToCart(e);
                }
              },
              role: "button",
              "aria-label": `${inCartText}, ${addToCartLabel}`,
              tabIndex: 0,
              children: inCartText
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => handleAddToCart(e),
              ref: plusButtonRef,
              className: "slot-product__button-add",
              "aria-label": addToCartLabel,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {})
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: (e) => handleAddToCart(e),
        className: "slot-product__button",
        dir,
        "aria-label": addToCartLabel,
        ref: addButtonRef,
        children: getTranslatedContent({ key: "add_to_cart" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "status", className: "visually-hidden", children: announcement })
  ] });
};
const sellingPlansQuery = (
  /* GraphQL */
  `
  query SellingPlans($id: ID!, $country: CountryCode, $locale: LanguageCode)
  @inContext(country: $country, language: $locale) {
    node(id: $id) {
      ... on ProductVariant {
        product {
          requiresSellingPlan
        }
        sellingPlanAllocations(first: 250) {
          nodes {
            sellingPlan {
              id
              name
            }
            priceAdjustments {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`
);
const requests = /* @__PURE__ */ new Map();
const fetchSellingPlans = (variantId, market) => {
  const key = `${variantId}|${market.country}|${market.locale}`;
  const cached = requests.get(key);
  if (cached) return cached;
  const request = fetch(`/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: sellingPlansQuery, variables: { id: variantId, ...market } })
  }).then((response) => {
    if (!response.ok) throw new Error(`Selling plans request failed: ${response.status}`);
    return response.json();
  }).then(({ data, errors }) => {
    if (errors == null ? void 0 : errors.length) throw new Error(`Selling plans query failed: ${errors[0].message}`);
    const variant = data == null ? void 0 : data.node;
    return {
      hasOneTimePurchase: !(variant == null ? void 0 : variant.product.requiresSellingPlan),
      plans: ((variant == null ? void 0 : variant.sellingPlanAllocations.nodes) ?? []).map(
        ({ sellingPlan, priceAdjustments }) => {
          var _a;
          return {
            // The cart's selling_plan takes the numeric id
            planId: sellingPlan.id.split("/").pop() ?? sellingPlan.id,
            label: sellingPlan.name,
            price: (_a = priceAdjustments[0]) == null ? void 0 : _a.price
          };
        }
      )
    };
  });
  requests.set(key, request);
  request.catch(() => requests.delete(key));
  return request;
};
const BUILDER_PLANS = [
  { planId: "mock-monthly", label: "Deliver every month" },
  { planId: "mock-quarterly", label: "Deliver every 3 months" }
];
const isPreviewRoute = () => typeof window !== "undefined" && (window.location.pathname.includes("/quizzes/preview/") || window.location.pathname.endsWith("/quiz-frame"));
const SlotBlockSubscription = ({ variantId }) => {
  var _a;
  const {
    subscriptionApp,
    inBuilder,
    isStoreRenderer,
    selection,
    setSubscriptionSelection,
    getTranslatedContent
  } = useQuizStore((state) => {
    var _a2;
    return {
      subscriptionApp: ((_a2 = state.preferences) == null ? void 0 : _a2.subscriptionApp) || "none",
      inBuilder: state.inBuilder,
      isStoreRenderer: state.isStoreRenderer,
      selection: state.subscriptionSelections[variantId],
      setSubscriptionSelection: state.setSubscriptionSelection,
      getTranslatedContent: state.getTranslatedContent
    };
  });
  const radioName = reactExports.useId();
  const [loaded, setLoaded] = reactExports.useState(
    null
  );
  const sellingPlans = (loaded == null ? void 0 : loaded.variantId) === variantId ? loaded.plans : null;
  const enabled = subscriptionApp !== "none" && Boolean(variantId);
  const live = enabled && isStoreRenderer && !inBuilder;
  reactExports.useEffect(() => {
    if (!live) return;
    let current = true;
    fetchSellingPlans(variantId, getMarketContext()).then((plans2) => current && setLoaded({ variantId, plans: plans2 })).catch((error) => console.warn("Subscription plans unavailable:", error));
    return () => {
      current = false;
    };
  }, [live, variantId]);
  const plans = inBuilder ? BUILDER_PLANS : (sellingPlans == null ? void 0 : sellingPlans.plans) ?? [];
  const showOneTime = inBuilder || ((sellingPlans == null ? void 0 : sellingPlans.hasOneTimePurchase) ?? true);
  reactExports.useEffect(() => {
    if (!enabled || selection || plans.length === 0) return;
    setSubscriptionSelection(variantId, {
      variantId,
      mode: "subscription",
      selectedPlan: plans[0]
    });
  }, [enabled, selection, plans, variantId, setSubscriptionSelection]);
  if (!enabled) return null;
  if (!inBuilder && !isStoreRenderer) {
    const message = "This preview cannot load subscription plans; publish to see them on your storefront.";
    return isPreviewRoute() ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slot-subscription__mock-wrapper", title: message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slot-subscription-warning-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: message }) }) }) : null;
  }
  if (plans.length === 0) return null;
  const mode = (selection == null ? void 0 : selection.mode) ?? "subscription";
  const selectedPlanId = ((_a = selection == null ? void 0 : selection.selectedPlan) == null ? void 0 : _a.planId) ?? plans[0].planId;
  const subscribeAndSaveLabel = getTranslatedContent({ key: "subscription_subscribe_and_save" });
  const choose = (nextMode, planId = selectedPlanId) => {
    setSubscriptionSelection(variantId, {
      variantId,
      mode: nextMode,
      selectedPlan: nextMode === "subscription" ? plans.find((plan) => plan.planId === planId) ?? plans[0] : void 0
    });
  };
  const options = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slot-subscription__container", children: [
    showOneTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "slot-subscription__radio-option", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "radio",
          name: radioName,
          value: "onetime",
          checked: mode === "onetime",
          onChange: () => choose("onetime"),
          className: "slot-subscription__radio-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slot-subscription__radio-label", children: getTranslatedContent({ key: "subscription_one_time_purchase" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "slot-subscription__radio-option", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "radio",
          name: radioName,
          value: "subscription",
          checked: mode === "subscription",
          onChange: () => choose("subscription"),
          className: "slot-subscription__radio-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slot-subscription__radio-label", children: subscribeAndSaveLabel })
    ] }),
    mode === "subscription" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-variants-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: selectedPlanId,
          onChange: (e) => choose("subscription", e.target.value),
          className: "select-variants",
          "aria-label": subscribeAndSaveLabel,
          children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: plan.planId, children: plan.label }, plan.planId))
        }
      ),
      choiceSelectIndicator
    ] })
  ] });
  return inBuilder ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "slot-subscription__mock-wrapper",
      title: "This is a mock preview. Subscription plans load automatically on your storefront.",
      children: options
    }
  ) : options;
};
const SlotBlockVendor = ({
  vendor,
  type
}) => {
  const dir = useLanguageDirection();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `slot-${type}__vendor`, dir, children: vendor });
};
const parseReviewData = (item, reviewApp, type) => {
  const metafieldOwner = getMetafieldOwnerForSlotItem({ type, item });
  if (!(metafieldOwner == null ? void 0 : metafieldOwner.dynamicMetafields) || !Array.isArray(metafieldOwner.dynamicMetafields) || reviewApp === "none") {
    return { ratingValue: null, ratingCount: null };
  }
  const metafields = metafieldOwner.dynamicMetafields.filter((mf) => mf !== null);
  const ratingMetafield = metafields.find(
    (mf) => mf.namespace === "reviews" && mf.key === "rating"
  );
  const countMetafield = metafields.find(
    (mf) => mf.namespace === "reviews" && mf.key === "rating_count"
  );
  if (ratingMetafield && countMetafield) {
    try {
      const ratingData = JSON.parse(ratingMetafield.value);
      return {
        ratingValue: parseFloat(ratingData.value),
        ratingCount: parseInt(countMetafield.value, 10)
      };
    } catch (error) {
      console.warn("Error parsing review rating data:", error);
    }
  }
  return { ratingValue: null, ratingCount: null };
};
const getStarDisplay = (rating) => {
  const maxStars = 5;
  const clampedRating = Math.min(Math.max(rating, 0), maxStars);
  const roundedRating = Math.round(clampedRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0 && fullStars < maxStars;
  const emptyStars = Math.max(0, maxStars - fullStars - (hasHalfStar ? 1 : 0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "review-stars", children: [
    Array.from({ length: fullStars }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StarFull, {}, `full-${i}`)),
    hasHalfStar && /* @__PURE__ */ jsxRuntimeExports.jsx(StarHalf, {}, "half"),
    Array.from({ length: emptyStars }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StarEmpty, {}, `empty-${i}`))
  ] });
};
const renderReviewDisplay = (ratingValue, ratingCount, type, getTranslatedContent, className) => {
  const reviewText = ratingCount === 1 ? getTranslatedContent({ key: "review_singular" }) : getTranslatedContent({ key: "review_plural" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-${type}__reviews${className ? ` ${className}` : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-summary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "review-rating",
        title: `${ratingValue.toFixed(1)} / 5`,
        role: "img",
        "aria-label": `${ratingValue.toFixed(1)} / 5`,
        children: getStarDisplay(ratingValue)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "review-count", children: [
      ratingCount,
      " ",
      reviewText
    ] })
  ] }) });
};
const SlotBlockReviews = ({
  type,
  item
}) => {
  const { inBuilder, preferences, getTranslatedContent } = useQuizStore((state) => ({
    inBuilder: state.inBuilder,
    preferences: state.preferences,
    getTranslatedContent: state.getTranslatedContent
  }));
  const reviewApp = (preferences == null ? void 0 : preferences.reviewApp) || "none";
  if (type === "collection" || reviewApp === "none") {
    return null;
  }
  const { ratingValue, ratingCount } = parseReviewData(item, reviewApp, type);
  const hasReviewData = ratingValue !== null && ratingCount !== null && ratingCount > 0;
  if (inBuilder) {
    if (hasReviewData) {
      return renderReviewDisplay(ratingValue, ratingCount, type, getTranslatedContent);
    } else if (item.id !== "gid://shopify/Product/123") {
      return renderReviewDisplay(0, 0, type, getTranslatedContent);
    }
    return renderReviewDisplay(
      Math.round((Math.random() * (4.6 - 4) + 4) * 10) / 10,
      Math.floor(Math.random() * (198 - 72 + 1)) + 72,
      type,
      getTranslatedContent,
      "slot-" + type + "__reviews--placeholder"
    );
  }
  if (hasReviewData) {
    return renderReviewDisplay(ratingValue, ratingCount, type, getTranslatedContent);
  }
  return renderReviewDisplay(0, 0, type, getTranslatedContent);
};
const StarFull = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20px",
    height: "20px",
    viewBox: "0 0 576 512",
    style: {
      display: "inline-block",
      marginRight: "2px",
      fill: "var(--results-card-stars-color, var(--choice-selected-background-color))"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" })
  }
);
const StarHalf = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20px",
    height: "20px",
    viewBox: "0 0 576 512",
    style: { display: "inline-block", marginRight: "2px" },
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "halfStarGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "stop",
          {
            offset: "50%",
            stopColor: "var(--results-card-stars-color, var(--choice-selected-background-color))"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "transparent" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z",
          fill: "url(#halfStarGradient)",
          stroke: "var(--results-card-stars-color, var(--choice-selected-background-color))",
          strokeWidth: "50"
        }
      )
    ]
  }
);
const StarEmpty = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20px",
    height: "20px",
    viewBox: "0 0 576 512",
    style: { display: "inline-block", marginRight: "2px" },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z",
        fill: "transparent",
        stroke: "var(--results-card-stars-color, var(--choice-selected-background-color))",
        strokeWidth: "50"
      }
    )
  }
);
const SlotProductVariant = ({
  data: productVariant,
  block: resultBlock
  // Renamed prop to avoid conflict
}) => {
  const { preferences } = resultBlock;
  const { slotsBlocks } = preferences;
  const title = getVariantDisplayTitle({
    productTitle: productVariant.product.title,
    variantTitle: productVariant.title
  });
  const executeCustomFeatures = useQuizStore((state) => state.executeCustomFeatures);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: slotsBlocks ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slot-variant__container", children: slotsBlocks.map((block, index) => {
    let contentComponent = null;
    switch (block.type) {
      case SlotBlockType.IMAGE:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotBlockImage,
          {
            type: "variant",
            productVariant,
            optimizeImageSize: block.optimizeImageSize ?? false,
            pictureSize: block.pictureSize ?? PictureType.MEDIUM_SQUARE,
            imageSource: block.imageSource ?? ImageSourceType.VARIANT
          }
        );
        break;
      case SlotBlockType.TITLE:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockTitle, { title, item: productVariant, type: "variant" });
        break;
      case SlotBlockType.DESCRIPTION:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotBlockDescription,
          {
            description: productVariant.product.description,
            type: "variant"
          }
        );
        break;
      case SlotBlockType.PRICE:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockPrice$1, { productVariant });
        break;
      case SlotBlockType.UNIT_PRICE:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockUnitPrice$1, { productVariant });
        break;
      case SlotBlockType.BUY_BUTTON:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotBlockBuyButton,
          {
            variant: productVariant,
            productTitle: productVariant.product.title
          }
        );
        break;
      case SlotBlockType.SUBSCRIPTION:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockSubscription, { variantId: productVariant.id });
        break;
      case SlotBlockType.LINK:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotBlockLink,
          {
            item: productVariant,
            openInNewTab: block.type === SlotBlockType.LINK ? block.openInNewTab : false
          }
        );
        break;
      case SlotBlockType.TEXT:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockText, { text: block.content, type: "variant", item: productVariant });
        break;
      case SlotBlockType.METAFIELD:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotBlockMetafield,
          {
            content: block.content,
            type: "variant",
            item: productVariant,
            source: block.source
          }
        );
        break;
      case SlotBlockType.VENDOR:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockVendor, { vendor: productVariant.product.vendor, type: "variant" });
        break;
      case SlotBlockType.REVIEWS:
        contentComponent = /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockReviews, { type: "variant", item: productVariant });
        break;
      case SlotBlockType.CUSTOM_HTML:
        contentComponent = executeCustomFeatures ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotBlockCustomHtml,
          {
            content: "content" in block ? block.content : "",
            type: "variant",
            item: productVariant,
            block
          }
        ) : null;
        break;
      default:
        contentComponent = null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `slot-variant__block ${block.ref} position-${index}`, children: contentComponent }, block.ref);
  }) }) : null });
};
const SlotBlockPrice = ({
  product,
  selectedVariant
}) => {
  const currencyFormat = window == null ? void 0 : window.quiz_currency;
  const dir = useLanguageDirection();
  const variantInfo = getVariantInfoByVariantIdInProduct(selectedVariant.value, product);
  const { price: effectivePrice, compareAtPrice } = useSlotSubscriptionPricing({
    variantId: selectedVariant.value,
    basePrice: variantInfo == null ? void 0 : variantInfo.price,
    baseCompareAtPrice: variantInfo == null ? void 0 : variantInfo.compareAtPrice
  });
  if (!variantInfo) return null;
  if (!effectivePrice) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "slot-product__price", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPriceWithCurrency(effectivePrice, currencyFormat) }),
    compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slot-product__compare-at-price", children: formatPriceWithCurrency(compareAtPrice, currencyFormat) })
  ] });
};
const SlotBlockUnitPrice = ({
  product,
  selectedVariant
}) => {
  const currencyFormat = window == null ? void 0 : window.quiz_currency;
  const variantInfo = getVariantInfoByVariantIdInProduct(selectedVariant.value, product);
  const formattedUnitPrice = formatUnitPrice({
    unitPrice: variantInfo == null ? void 0 : variantInfo.unitPrice,
    measurement: variantInfo == null ? void 0 : variantInfo.unitPriceMeasurement,
    currencyFormat
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SlotBlockUnitPriceContent,
    {
      className: "slot-product__unit-price",
      formattedUnitPrice,
      currencyFormat
    }
  );
};
const SlotVariantsDropdown = ({
  product,
  selectedVariant,
  setSelectedVariant,
  anyOfTheProductsInBlockHasVariants,
  anyOfTheProductsInSlotHasVariants,
  displayOnNoVariants = "show_dropdown",
  variants
}) => {
  const dir = useLanguageDirection();
  const { getTranslatedContent } = useQuizStore((state) => ({
    getTranslatedContent: state.getTranslatedContent
  }));
  const { inBuilder } = useQuizStore((state) => ({
    inBuilder: state.inBuilder
  }));
  if (inBuilder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-variants-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "select-variants", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: getTranslatedContent({ key: "select_variant" }) }, "select-variant") }),
      choiceSelectIndicator
    ] });
  }
  if (hasVariantChoice(product)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-variants-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          className: "select-variants",
          dir,
          "aria-label": getTranslatedContent({ key: "select_variant" }),
          value: (selectedVariant == null ? void 0 : selectedVariant.value) || "",
          onChange: (event) => {
            const newValue = event.target.value;
            const selectedOption = variants.find((variant) => variant.value === newValue);
            setSelectedVariant({
              label: (selectedOption == null ? void 0 : selectedOption.label) ?? "",
              value: (selectedOption == null ? void 0 : selectedOption.value) ?? "",
              currency: (selectedOption == null ? void 0 : selectedOption.currency) ?? ""
            });
          },
          children: variants.map((variant) => {
            var _a;
            const variantNode = (_a = product.variants.edges.find(
              (edge) => edge.node.id === variant.value
            )) == null ? void 0 : _a.node;
            const isSoldOut = (variantNode == null ? void 0 : variantNode.availableForSale) === false;
            const label = isSoldOut ? `${variant.label} - ${getTranslatedContent({ key: "sold_out" })}` : variant.label;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: variant.value, children: label }, variant.value);
          })
        }
      ),
      choiceSelectIndicator
    ] });
  }
  if (anyOfTheProductsInBlockHasVariants || anyOfTheProductsInSlotHasVariants) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: clsx("select-variants-container", {
          "any-variants-block": anyOfTheProductsInBlockHasVariants,
          "any-variants-slot": anyOfTheProductsInSlotHasVariants,
          "no-variants-slot": !anyOfTheProductsInSlotHasVariants,
          "hide-dropdown": displayOnNoVariants === "hide_dropdown"
        }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "select-variants",
              value: "",
              disabled: true,
              dir,
              "aria-label": getTranslatedContent({ key: "select_variant" }),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: getTranslatedContent({ key: "select_no_variants" }) })
            }
          ),
          choiceSelectIndicator
        ]
      }
    );
  }
  return null;
};
const getVariantsForRecommendedProducts = (data) => {
  var _a, _b;
  const variants = ((_b = (_a = data == null ? void 0 : data.variants) == null ? void 0 : _a.edges) == null ? void 0 : _b.map((variant) => {
    var _a2, _b2, _c, _d, _e;
    return {
      label: ((_a2 = variant == null ? void 0 : variant.node) == null ? void 0 : _a2.title) ?? "",
      value: ((_b2 = variant == null ? void 0 : variant.node) == null ? void 0 : _b2.id) ?? "",
      currency: ((_d = (_c = variant == null ? void 0 : variant.node) == null ? void 0 : _c.price) == null ? void 0 : _d.currencyCode) ?? "",
      availableForSale: ((_e = variant == null ? void 0 : variant.node) == null ? void 0 : _e.availableForSale) ?? true
    };
  })) ?? [];
  return variants.length > 0 ? variants : [{ label: "Default", value: "", currency: "USD", availableForSale: true }];
};
const getDefaultVariant = (variants) => {
  return variants.find((v) => v.availableForSale !== false) ?? variants[0];
};
const SlotProduct = ({
  block,
  data: product,
  anyOfTheProductsInBlockHasVariants,
  anyOfTheProductsInSlotHasVariants
}) => {
  const variants = reactExports.useMemo(() => getVariantsForRecommendedProducts(product), [product]);
  const defaultVariant = getDefaultVariant(variants);
  const [selectedVariant, setSelectedVariant] = reactExports.useState({
    label: (defaultVariant == null ? void 0 : defaultVariant.label) ?? "Default",
    value: (defaultVariant == null ? void 0 : defaultVariant.value) || "",
    currency: (defaultVariant == null ? void 0 : defaultVariant.currency) ?? "USD"
  });
  const { inBuilder, executeCustomFeatures } = useQuizStore((state) => ({
    inBuilder: state.inBuilder,
    executeCustomFeatures: state.executeCustomFeatures
  }));
  reactExports.useEffect(() => {
    if (!inBuilder) return;
    const latestDefaultVariant = getDefaultVariant(variants);
    setSelectedVariant({
      label: (latestDefaultVariant == null ? void 0 : latestDefaultVariant.label) ?? "Default",
      value: (latestDefaultVariant == null ? void 0 : latestDefaultVariant.value) || "",
      currency: (latestDefaultVariant == null ? void 0 : latestDefaultVariant.currency) ?? "USD"
    });
  }, [inBuilder, variants]);
  const {
    preferences: { slotsBlocks }
  } = block;
  const blockByType = reactExports.useMemo(
    () => (slotBlock) => ({
      [SlotBlockType.IMAGE]: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotBlockImage,
        {
          type: "product",
          selectedVariant,
          product,
          optimizeImageSize: slotBlock.type === SlotBlockType.IMAGE ? slotBlock.optimizeImageSize ?? false : false,
          pictureSize: slotBlock.type === SlotBlockType.IMAGE ? slotBlock.pictureSize : PictureType.MEDIUM_SQUARE,
          imageSource: slotBlock.type === SlotBlockType.IMAGE ? slotBlock.imageSource ?? ImageSourceType.VARIANT : ImageSourceType.VARIANT
        }
      ),
      [SlotBlockType.TITLE]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockTitle, { title: product.title, item: product, type: "product" }),
      [SlotBlockType.DESCRIPTION]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockDescription, { description: product.description, type: "product" }),
      [SlotBlockType.PRICE]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockPrice, { product, selectedVariant }),
      [SlotBlockType.UNIT_PRICE]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockUnitPrice, { product, selectedVariant }),
      [SlotBlockType.BUY_BUTTON]: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotBlockBuyButton,
        {
          variant: getVariantInfoByVariantIdInProduct(selectedVariant.value, product),
          productTitle: product.title
        }
      ),
      [SlotBlockType.LINK]: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotBlockLink,
        {
          item: product,
          openInNewTab: slotBlock.type === SlotBlockType.LINK ? slotBlock.openInNewTab : false
        }
      ),
      [SlotBlockType.TEXT]: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotBlockText,
        {
          text: "content" in slotBlock ? slotBlock.content : "",
          type: "product",
          item: product
        }
      ),
      [SlotBlockType.METAFIELD]: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotBlockMetafield,
        {
          content: "content" in slotBlock ? slotBlock.content : "",
          type: "product",
          item: product
        }
      ),
      [SlotBlockType.VARIANTS_DROPDOWN]: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotVariantsDropdown,
        {
          product,
          selectedVariant,
          setSelectedVariant,
          anyOfTheProductsInBlockHasVariants,
          anyOfTheProductsInSlotHasVariants,
          variants,
          displayOnNoVariants: slotBlock.type === SlotBlockType.VARIANTS_DROPDOWN ? slotBlock.displayOnNoVariants : "show_dropdown"
        }
      ),
      [SlotBlockType.VENDOR]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockVendor, { vendor: product.vendor, type: "product" }),
      [SlotBlockType.REVIEWS]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockReviews, { type: "product", item: product }),
      [SlotBlockType.SUBSCRIPTION]: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotBlockSubscription, { variantId: selectedVariant.value }),
      [SlotBlockType.CUSTOM_HTML]: executeCustomFeatures ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotBlockCustomHtml,
        {
          content: "content" in slotBlock ? slotBlock.content : "",
          type: "product",
          item: product,
          block: slotBlock
        }
      ) : null
    }),
    [
      product,
      selectedVariant,
      anyOfTheProductsInBlockHasVariants,
      anyOfTheProductsInSlotHasVariants,
      variants,
      executeCustomFeatures
    ]
  );
  const memoizedSlotBlocks = reactExports.useMemo(() => {
    return slotsBlocks == null ? void 0 : slotsBlocks.map((slotBlock, index) => {
      var _a;
      const blockComponent = (_a = Object.entries(blockByType(slotBlock)).find(
        ([key]) => key === slotBlock.type
      )) == null ? void 0 : _a[1];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `slot-product__block ${slotBlock.ref} position-${index}`,
          children: blockComponent || null
        },
        slotBlock.ref
      );
    });
  }, [slotsBlocks, blockByType]);
  if (!slotsBlocks) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slot-product__container", children: memoizedSlotBlocks });
};
const warn = (i18n, code, msg, rest) => {
  var _a, _b, _c, _d;
  const args = [msg, {
    code,
    ...rest || {}
  }];
  if ((_b = (_a = i18n == null ? void 0 : i18n.services) == null ? void 0 : _a.logger) == null ? void 0 : _b.forward) {
    return i18n.services.logger.forward(args, "warn", "react-i18next::", true);
  }
  if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
  if ((_d = (_c = i18n == null ? void 0 : i18n.services) == null ? void 0 : _c.logger) == null ? void 0 : _d.warn) {
    i18n.services.logger.warn(...args);
  } else if (console == null ? void 0 : console.warn) {
    console.warn(...args);
  }
};
const alreadyWarned = {};
const warnOnce = (i18n, code, msg, rest) => {
  if (isString(msg) && alreadyWarned[msg]) return;
  if (isString(msg)) alreadyWarned[msg] = /* @__PURE__ */ new Date();
  warn(i18n, code, msg, rest);
};
const loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off("initialized", initialized);
      }, 0);
      cb();
    };
    i18n.on("initialized", initialized);
  }
};
const loadNamespaces = (i18n, ns, cb) => {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
const loadLanguages = (i18n, lng, ns, cb) => {
  if (isString(ns)) ns = [ns];
  if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
  ns.forEach((n) => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
const hasLoadedNamespace = (ns, i18n, options = {}) => {
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce(i18n, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
      languages: i18n.languages
    });
    return true;
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance2, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance2.services.backendConnector.backend && i18nInstance2.isLanguageChangingTo && !loadNotPending(i18nInstance2.isLanguageChangingTo, ns)) return false;
    }
  });
};
const isString = (obj) => typeof obj === "string";
const isObject = (obj) => typeof obj === "object" && obj !== null;
const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
};
const unescapeHtmlEntity = (m) => htmlEntities[m];
const unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);
let defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
const getDefaults = () => defaultOptions;
let i18nInstance;
const getI18n = () => i18nInstance;
const I18nContext = reactExports.createContext();
class ReportNamespaces {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach((ns) => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const usePrevious = (value, ignore) => {
  const ref = reactExports.useRef();
  reactExports.useEffect(() => {
    ref.current = value;
  }, [value, ignore]);
  return ref.current;
};
const alwaysNewT = (i18n, language, namespace, keyPrefix) => i18n.getFixedT(language, namespace, keyPrefix);
const useMemoizedT = (i18n, language, namespace, keyPrefix) => reactExports.useCallback(alwaysNewT(i18n, language, namespace, keyPrefix), [i18n, language, namespace, keyPrefix]);
const useTranslation = (ns, props = {}) => {
  var _a, _b, _c, _d;
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = reactExports.useContext(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce(i18n, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    const notReadyT = (k, optsOrDefaultValue) => {
      if (isString(optsOrDefaultValue)) return optsOrDefaultValue;
      if (isObject(optsOrDefaultValue) && isString(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if ((_a = i18n.options.react) == null ? void 0 : _a.wait) warnOnce(i18n, "DEPRECATED_OPTION", "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const i18nOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = defaultNSFromContext || ((_b = i18n.options) == null ? void 0 : _b.defaultNS);
  namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
  (_d = (_c = i18n.reportNamespaces).addUsedNamespaces) == null ? void 0 : _d.call(_c, namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));
  const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  const getT = () => memoGetT;
  const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  const [t, setT] = reactExports.useState(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = reactExports.useRef(true);
  reactExports.useEffect(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      } else {
        loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getNewT);
    }
    const boundReset = () => {
      if (isMounted.current) setT(getNewT);
    };
    if (bindI18n) i18n == null ? void 0 : i18n.on(bindI18n, boundReset);
    if (bindI18nStore) i18n == null ? void 0 : i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (i18n && bindI18n) bindI18n == null ? void 0 : bindI18n.split(" ").forEach((e) => i18n.off(e, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(" ").forEach((e) => i18n.store.off(e, boundReset));
    };
  }, [i18n, joinedNS]);
  reactExports.useEffect(() => {
    if (isMounted.current && ready) {
      setT(getT);
    }
  }, [i18n, keyPrefix, ready]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise((resolve) => {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
};
const InfoBox = ({ children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("s-box", { padding: "small", borderRadius: "base", background: "subdued", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("s-stack", { direction: "inline", alignItems: "start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginRight: "6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("s-icon", { type: "info", color: "subdued" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("s-text", { children }) })
  ] }) });
};
const DEFAULT_DESCRIPTION_CONTENT = "<p><br></p>";
const checkIfItemInCart = (item, cartItems) => {
  var _a;
  if (item.id && item.id.includes("gid://shopify/ProductVariant/")) {
    const cleanedVariantId = item.id.replace("gid://shopify/ProductVariant/", "");
    return cartItems.some((cartItem) => cartItem.variantId === cleanedVariantId);
  }
  if ((_a = item == null ? void 0 : item.variants) == null ? void 0 : _a.edges) {
    return item.variants.edges.some((edge) => {
      if (!(edge == null ? void 0 : edge.node)) return false;
      const variantId = edge.node.id || edge.node.variantId;
      if (!variantId) return false;
      const cleanedVariantId = variantId.replace("gid://shopify/ProductVariant/", "");
      return cartItems.some((cartItem) => cartItem.variantId === cleanedVariantId);
    });
  }
  return false;
};
const SlotsComponent = ({
  slot,
  block,
  fetchedSlotItems,
  fetchedFixedRecommendations,
  slotsItems,
  anyOfTheProductsInBlockHasVariants,
  anyOfTheProductsInSlotHasVariants
}) => {
  const InspectorWrapper = useInspectorWrapper();
  const DraftProductPlaceholder = useDraftProductPlaceholder();
  const { t } = useTranslation();
  const { inBuilder, runsMerchantCode, cartItems } = useQuizStore((state) => ({
    inBuilder: state.inBuilder,
    runsMerchantCode: state.runsMerchantCode,
    cartItems: state.cartItems
  }));
  const {
    contentAlignment = "center",
    headingSize = "medium",
    textSize = "medium"
  } = block.preferences;
  const getSlotData = () => {
    var _a;
    const { type, recommendationSystem } = block.preferences;
    return inBuilder ? getMockedArray(slot, t, recommendationSystem, type, fetchedFixedRecommendations) : ((_a = slotsItems == null ? void 0 : slotsItems[slot.ref]) == null ? void 0 : _a.map((gid) => (fetchedSlotItems == null ? void 0 : fetchedSlotItems[gid]) ?? { id: gid }).filter(Boolean)) || [];
  };
  const showHeading = slot.heading.trim() !== DEFAULT_DESCRIPTION_CONTENT;
  const showDescription = slot.description.trim() !== DEFAULT_DESCRIPTION_CONTENT;
  const slotData = getSlotData() ?? [];
  const itemCountClass = `results-slot_${slotData.length}-items`;
  const renderSlotComponent = (type, data) => {
    switch (type) {
      case "collections":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotCollection, { data, block });
      case "products":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotProduct,
          {
            data,
            block,
            anyOfTheProductsInBlockHasVariants,
            anyOfTheProductsInSlotHasVariants
          }
        );
      case "products_variants":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotProductVariant, { data, block });
      case "draft_product_placeholder":
        return DraftProductPlaceholder ? /* @__PURE__ */ jsxRuntimeExports.jsx(DraftProductPlaceholder, { data, block }) : null;
      default:
        console.warn("unknown_item_type", type);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "1rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { children: t("unknown_item_type") }) });
    }
  };
  const processHeadingContent = (content) => {
    const hs = headingSize === HeadingSize.SMALL ? 3 : headingSize === HeadingSize.MEDIUM ? 2 : 1;
    content = content.replace(/<p>/g, `<h${hs}>`);
    content = content.replace(/<\/p>/g, `</h${hs}>`);
    return content;
  };
  const slotComponentContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `results-slot_${slot.width} ${itemCountClass}`, children: [
    showHeading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: slotHeadingClass(headingSize, contentAlignment, slot.heading),
        dangerouslySetInnerHTML: {
          __html: runsMerchantCode ? processHeadingContent(slot.heading) : sanitizeCanvasHtml(processHeadingContent(slot.heading))
        }
      }
    ),
    showDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: slotDescriptionClass(contentAlignment, textSize),
        dangerouslySetInnerHTML: {
          __html: runsMerchantCode ? slot.description : sanitizeCanvasHtml(slot.description)
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: resultsSlotProductListClass(block), children: slotData.map((item, index) => {
      const isInCart = inBuilder ? false : checkIfItemInCart(item, cartItems);
      const isPossibleDraft = !(fetchedSlotItems == null ? void 0 : fetchedSlotItems[item.id]) && DraftProductPlaceholder;
      const className = isPossibleDraft ? "results-slot draft" : `results-slot${isInCart ? " in-cart" : ""}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: slot.ref, className, children: renderSlotComponent(
        isPossibleDraft ? "draft_product_placeholder" : block.preferences.type,
        item
      ) }, `${slot.ref}-${index}`);
    }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: inBuilder && slotData.length !== 0 ? InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    InspectorWrapper,
    {
      elementRef: slot.ref,
      elementName: replaceHtmlTags(slot.heading),
      zIndexValue: block.preferences.type === "products" ? 10 : void 0,
      elementType: "slot",
      children: slotComponentContent
    }
  ) : slotComponentContent : slotComponentContent });
};
const SlotResultBlock = ({
  block,
  fetchedSlotItems,
  slotsItems,
  fetchedFixedRecommendations
}) => {
  var _a, _b, _c, _d;
  const DraftProductPlaceholder = useDraftProductPlaceholder();
  const id = reactExports.useId();
  const { inBuilder } = useQuizStore((state) => ({
    inBuilder: state.inBuilder
  }));
  const memoizedSlotsComponent = reactExports.useMemo(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = block.preferences) == null ? void 0 : _a2.slots) == null ? void 0 : _b2.map((slot, index) => {
      var _a3;
      if (!inBuilder && (!slotsItems || !slotsItems[slot.ref] || slotsItems[slot.ref].length === 0)) {
        return null;
      }
      const validSlotItems = (_a3 = slotsItems == null ? void 0 : slotsItems[slot.ref]) == null ? void 0 : _a3.filter((gid) => {
        const product = fetchedSlotItems == null ? void 0 : fetchedSlotItems[gid];
        return product && (!product.status || product.status !== "draft");
      });
      const slotsList = DraftProductPlaceholder ? slotsItems == null ? void 0 : slotsItems[slot.ref] : validSlotItems;
      if (!inBuilder && (!slotsList || slotsList.length === 0)) {
        return null;
      }
      let anyOfTheProductsInBlockHasVariants = false;
      let anyOfTheProductsInSlotHasVariants = false;
      if (fetchedSlotItems) {
        anyOfTheProductsInBlockHasVariants = Object.values(fetchedSlotItems).some(hasVariantChoice);
      }
      const slotProducts = (slotsList || []).map((gid) => fetchedSlotItems ? fetchedSlotItems[gid] : void 0).filter(Boolean);
      anyOfTheProductsInSlotHasVariants = slotProducts.some(hasVariantChoice);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlotsComponent,
        {
          slot,
          block,
          fetchedSlotItems: fetchedSlotItems || {},
          fetchedFixedRecommendations: fetchedFixedRecommendations || {},
          slotsItems: { [slot.ref]: slotsList || [] },
          anyOfTheProductsInBlockHasVariants,
          anyOfTheProductsInSlotHasVariants
        },
        `${id}-${index}`
      );
    });
  }, [
    (_a = block.preferences) == null ? void 0 : _a.slots,
    fetchedSlotItems,
    slotsItems,
    block,
    DraftProductPlaceholder,
    inBuilder
  ]);
  const content = reactExports.useMemo(() => {
    var _a2;
    return (_a2 = block.preferences) == null ? void 0 : _a2.content;
  }, [(_b = block.preferences) == null ? void 0 : _b.content]);
  const { headingSize = "medium", contentAlignment = "center" } = block.preferences || {};
  const renderedContent = useRenderedContent(content || "", {
    mode: "richHtml",
    context: "result"
  });
  const isEmptyMessage = renderedContent === "<p><br></p>" || renderedContent === "" || !renderedContent;
  const resultBlockClass = clsx(
    "results-slot_list",
    ((_c = block.preferences) == null ? void 0 : _c.slotsLayout) === SlotsLayout.STACKED && "results-slot_list-stacked",
    ((_d = block.preferences) == null ? void 0 : _d.slotsLayout) === SlotsLayout.SIDE_BY_SIDE && "results-slot_list-side_by_side"
  );
  return inBuilder || slotsItems ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: resultBlockClass, children: memoizedSlotsComponent }) : isEmptyMessage ? null : (
    // Return null when the message is just an empty paragraph
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "results-slot_list__no_recommendations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: slotHeadingClass(headingSize, contentAlignment, renderedContent),
        dangerouslySetInnerHTML: { __html: renderedContent }
      }
    ) })
  );
};
const TextResultBlocks = ({ block }) => {
  const { preferences } = block;
  const { content, textAlignment, textSize } = preferences;
  const dir = useLanguageDirection();
  const renderedContent = useRenderedContent(content || "", {
    mode: "richHtml",
    context: "result"
  });
  const textAlignmentClass = clsx("text results-text", {
    "text-results-text--left": textAlignment === "left",
    "text-results-text--center": textAlignment === "center",
    "text-results-text--right": textAlignment === "right",
    "text-results-text--small": textSize === "small",
    "text-results-text--medium": textSize === "medium",
    "text-results-text--large": textSize === "large"
  });
  const isEmptyMessage = renderedContent === null || renderedContent === "" || renderedContent === "<p><br></p>";
  if (isEmptyMessage) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: textAlignmentClass, dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: renderedContent } }) });
};
const CustomHtmlBlock = reactExports.memo(function CustomHtmlBlock2({ block }) {
  const { content } = block.preferences;
  const dir = useLanguageDirection();
  const storeApi = useQuizStoreApi();
  const containerRef = reactExports.useRef(null);
  const { render, hasLiquidSyntax } = useLiquidRenderer();
  const [renderedContent, setRenderedContent] = reactExports.useState(content || "");
  const {
    cartItems,
    slotItems,
    answers,
    variableScores,
    currentQuizPage,
    addToCart: addToCart2,
    addMultipleItemsToCart,
    isStoreRenderer,
    inBuilder,
    runsMerchantCode,
    getSubscriptionSelection,
    storefrontAccessToken,
    domain
  } = useQuizStore((state) => ({
    cartItems: state.cartItems,
    slotItems: state.slotItems,
    answers: state.answers,
    variableScores: state.variableScores,
    currentQuizPage: state.currentQuizPage,
    addToCart: state.addToCart,
    addMultipleItemsToCart: state.addMultipleItemsToCart,
    isStoreRenderer: state.isStoreRenderer,
    inBuilder: state.inBuilder,
    runsMerchantCode: state.runsMerchantCode,
    getSubscriptionSelection: state.getSubscriptionSelection,
    storefrontAccessToken: state.storefrontAccessToken,
    domain: state.domain
  }));
  reactExports.useEffect(() => {
    const renderContent = async () => {
      if (!content) {
        setRenderedContent("");
        return;
      }
      const context = buildQuizContext(() => storeApi.getState(), {
        mode: "result",
        currentPage: storeApi.getState().currentQuizPage,
        slotItems,
        cartItems
      });
      let processedContent = content;
      if (hasLiquidSyntax(content)) {
        const { rendered } = await render(content, context);
        processedContent = rendered;
      }
      setRenderedContent(processedContent);
    };
    renderContent();
  }, [
    content,
    render,
    hasLiquidSyntax,
    slotItems,
    cartItems,
    answers,
    variableScores,
    currentQuizPage,
    storeApi
  ]);
  const addAllToCart = reactExports.useMemo(
    () => createAddAllToCartFunction(
      slotItems,
      addToCart2,
      addMultipleItemsToCart,
      isStoreRenderer,
      inBuilder,
      cartItems,
      getSubscriptionSelection
    ),
    [
      slotItems,
      addToCart2,
      addMultipleItemsToCart,
      isStoreRenderer,
      inBuilder,
      cartItems,
      getSubscriptionSelection
    ]
  );
  const simpleAddToCart = reactExports.useMemo(() => createSimpleAddToCart(addToCart2), [addToCart2]);
  const applyDiscountCode = reactExports.useMemo(
    () => createApplyDiscountCodeFunction(storefrontAccessToken, domain, isStoreRenderer, inBuilder),
    [storefrontAccessToken, domain, isStoreRenderer, inBuilder]
  );
  const safeContent = runsMerchantCode ? renderedContent : sanitizeCanvasHtml(renderedContent);
  useCustomHtmlScripts({
    mode: "result",
    containerRef,
    renderedContent: safeContent,
    currentPage: currentQuizPage,
    slotItems,
    cartItems,
    actions: { addAllToCart, addToCart: simpleAddToCart, applyDiscountCode }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "custom-html", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, dangerouslySetInnerHTML: { __html: safeContent || "" } }) });
});
const formatTextInTitleCase = (text) => {
  const words = text.split("_");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};
const formatBlockName = (blockName, t) => {
  if (!blockName) {
    return "";
  }
  if (blockName === "legal_gdpr") {
    return t("legal_gdpr");
  }
  if (blockName === "yes_no") {
    return t("yes_no");
  }
  if (blockName === "slider") {
    return t("slider");
  }
  if (blockName === "buttons_scale") {
    return t("buttons_scale");
  }
  if (blockName === "rating_scale") {
    return t("rating_scale");
  }
  if (blockName === "rating_display") {
    return t("chart_type_rating");
  }
  if (blockName === "custom_html") {
    return t("custom_html");
  }
  return formatTextInTitleCase(blockName);
};
const ChartResultBlock = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-chart-result-block-Bv24ds-4.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url).then((module) => ({
    default: module.ChartResultBlock
  }))
);
const RatingBlock = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-rating-block-DgJgPmrE.js"), true ? __vite__mapDeps([13,2,3,4,5,1,6,7,8,9,11,14]) : void 0, import.meta.url).then((module) => ({
    default: module.RatingBlock
  }))
);
const ResultBlock = ({
  block,
  fetchedSlotItems,
  slotsItems,
  fetchedFixedRecommendations
}) => {
  const { t } = useTranslation();
  const InspectorWrapper = useInspectorWrapper();
  const executeCustomFeatures = useQuizStore((state) => state.executeCustomFeatures);
  const shouldRenderBlock = () => {
    if (block.type === ResultBlockType.CUSTOM_HTML || block.type === ResultBlockType.CUSTOM_CHART) {
      return executeCustomFeatures;
    }
    return true;
  };
  if (!shouldRenderBlock()) {
    return null;
  }
  const chartBlock = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ChartResultBlock,
    {
      block
    }
  ) });
  const ratingBlock = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingBlock, { block }) });
  const renderByBlockType = {
    [ResultBlockType.HEADING]: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingResultBlocks, { block }),
    [ResultBlockType.TEXT]: /* @__PURE__ */ jsxRuntimeExports.jsx(TextResultBlocks, { block }),
    [ResultBlockType.IMAGE]: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageResultBlock, { block }),
    [ResultBlockType.VIDEO]: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoResultBlock, { block }),
    [ResultBlockType.CUSTOM_HTML]: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomHtmlBlock, { block }),
    [ResultBlockType.BAR_CHART]: chartBlock,
    [ResultBlockType.RADAR_CHART]: chartBlock,
    [ResultBlockType.GAUGE_CHART]: chartBlock,
    [ResultBlockType.CUSTOM_CHART]: chartBlock,
    [ResultBlockType.RATING_CHART]: ratingBlock,
    [ResultBlockType.SLOTS]: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SlotResultBlock,
      {
        block,
        slotsItems,
        fetchedSlotItems,
        fetchedFixedRecommendations
      }
    ),
    // [ResultBlockType.RECOMMENDATION_PRODUCTS]: <div></div>,
    [ResultBlockType.BUTTON]: /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonResultBlock, { block }),
    [ResultBlockType.CART_CHECKOUT_BUTTON]: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartCheckoutButtonResultBlock,
      {
        block,
        fetchedSlotItems
      }
    )
  };
  const elementName = formatBlockName(block.preferences.type, t);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    InspectorWrapper,
    {
      elementRef: block.ref,
      elementName,
      elementType: "resultBlock",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block results-block", "data-block-ref": block.ref, children: renderByBlockType[block.type] })
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block results-block", "data-block-ref": block.ref, children: renderByBlockType[block.type] }) });
};
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3e3;
const LoaderError = ({ retry, retryCount, setRetryCount }) => {
  const getTranslatedContent = useQuizStore((state) => state.getTranslatedContent);
  const retryRef = reactExports.useRef(retry);
  const timeoutRef = reactExports.useRef(null);
  const resetOnNextRetryRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    retryRef.current = retry;
  }, [retry]);
  const runRetry = reactExports.useCallback(async () => {
    var _a;
    try {
      await Promise.resolve((_a = retryRef.current) == null ? void 0 : _a.call(retryRef));
    } catch {
    } finally {
      setRetryCount((current) => {
        const base = resetOnNextRetryRef.current ? 0 : current;
        resetOnNextRetryRef.current = false;
        return Math.min(base + 1, MAX_RETRIES);
      });
    }
  }, [setRetryCount]);
  reactExports.useEffect(() => {
    if (retryCount >= MAX_RETRIES) {
      return;
    }
    timeoutRef.current = window.setTimeout(() => {
      void runRetry();
    }, RETRY_DELAY_MS);
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [retryCount, runRetry]);
  const hasFailedOnce = retryCount > 0;
  const reachedMaxRetries = retryCount >= MAX_RETRIES;
  const errorKey = reachedMaxRetries ? "loading_error_no_response" : "loading_error_retry";
  const retryButtonLabel = getTranslatedContent({ key: "try_again" });
  const handleManualRetry = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    resetOnNextRetryRef.current = true;
    setRetryCount(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        justifyContent: "center",
        height: "100%"
      },
      children: [
        !reachedMaxRetries && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "loader-spinner" }),
        hasFailedOnce && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "16px" }, children: getTranslatedContent({ key: errorKey }) }),
        reachedMaxRetries && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "question-button__container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleManualRetry, className: "question-button--center", children: retryButtonLabel }) })
      ]
    }
  ) });
};
const CartButtons = ({ fetchedSlotItems = [] }) => {
  var _a, _b;
  const quizName = useQuizStore((state) => state.name);
  const {
    id,
    addToCart: addToCart2,
    addMultipleItemsToCart,
    cartItems,
    currentQuizPage,
    getTranslatedContent,
    isStoreRenderer,
    preferences,
    inBuilder,
    getSubscriptionSelection
  } = useQuizStore((state) => ({
    id: state.id,
    addToCart: state.addToCart,
    addMultipleItemsToCart: state.addMultipleItemsToCart,
    cartItems: state.cartItems,
    currentQuizPage: state.currentQuizPage,
    getTranslatedContent: state.getTranslatedContent,
    isStoreRenderer: state.isStoreRenderer,
    preferences: state.preferences,
    inBuilder: state.inBuilder,
    getSubscriptionSelection: state.getSubscriptionSelection
  }));
  const dir = useLanguageDirection();
  const addAllToCartButton = currentQuizPage.preferences.addAllToCart;
  const handleGoToPage = (page) => {
    var _a2, _b2;
    if (!isStoreRenderer) {
      return;
    }
    const url = (((_b2 = (_a2 = window.Shopify) == null ? void 0 : _a2.routes) == null ? void 0 : _b2.root) ?? "/") + page;
    window.location.href = url;
  };
  const handleAddAllToCart = async () => {
    try {
      const productVariants = await addRecommendationsToCart(
        fetchedSlotItems,
        addToCart2,
        addMultipleItemsToCart,
        isStoreRenderer,
        inBuilder,
        cartItems,
        getSubscriptionSelection
      );
      productVariants.forEach((variant) => {
        trackProductAddedToCart(
          id,
          {
            id: variant.variantId,
            title: variant.title,
            price: { amount: variant.price, currencyCode: variant.currency }
          },
          (currentQuizPage == null ? void 0 : currentQuizPage.ref) || "",
          preferences
        );
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCartButtonKeyDown = useArrowKeyFocusNavigation(".quiz");
  const handleButtonKeyDown = (e) => {
    handleCartButtonKeyDown(e);
    if (proceedTo === "checkout") {
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.quantity * Number(item.price),
        0
      );
      const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      const currency = cartItems.length > 0 ? cartItems[0].currency : "USD";
      trackCustomerProceedToCheckout(totalQuantity, currency, totalPrice, quizName, preferences);
    }
  };
  if (!cartItems.length && addAllToCartButton) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleAddAllToCart,
        className: "result-bottom-bar-button add-all-to-cart",
        "data-cy": "add-all-to-cart",
        "aria-label": getTranslatedContent({
          key: "add_all_to_cart",
          values: {
            count: ((_a = getRecommendationsProductVariants(fetchedSlotItems)) == null ? void 0 : _a.length) ?? 0
          }
        }),
        onKeyDown: handleButtonKeyDown,
        dir,
        children: getTranslatedContent({
          key: "add_all_to_cart",
          values: {
            count: ((_b = getRecommendationsProductVariants(fetchedSlotItems)) == null ? void 0 : _b.length) ?? 0
          }
        })
      }
    );
  }
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const showBar = currentQuizPage.preferences.showBar;
  const proceedTo = currentQuizPage.preferences.proceedTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: showBar && proceedTo && /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `result-bottom-bar-button proceed-to-${proceedTo}`,
      "data-cy": `proceed-to-${proceedTo}`,
      disabled: !cartItems.length,
      onClick: () => handleGoToPage(proceedTo),
      onKeyDown: handleButtonKeyDown,
      dir,
      children: getTranslatedContent({
        key: `proceed_to_${proceedTo}`,
        values: { count: cartItemCount }
      })
    }
  ) });
};
const RetakeQuizButton = () => {
  const quizName = useQuizStore((state) => state.name);
  const quizId = useQuizStore((state) => state.id);
  const preferences = useQuizStore((state) => state.preferences);
  const retakeQuiz = useQuizStore((state) => state.retakeQuiz);
  const getTranslatedContent = useQuizStore((state) => state.getTranslatedContent);
  const handleRetakeButtonKeyDown = useArrowKeyFocusNavigation();
  const dir = useLanguageDirection();
  const handleRetakeQuiz = () => {
    retakeQuiz();
    trackRetakeQuiz(quizName, quizId, preferences);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: handleRetakeQuiz,
      className: "result-bottom-bar-button result-bottom-bar-button__retake retake-quiz",
      "data-cy": "retake-quiz",
      "aria-label": getTranslatedContent({ key: "retake_quiz" }),
      onKeyDown: handleRetakeButtonKeyDown,
      dir,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
        getTranslatedContent({ key: "retake_quiz" })
      ]
    }
  );
};
const BottomBar = ({ fetchedSlotItems }) => {
  const InspectorWrapper = useInspectorWrapper();
  const dir = useLanguageDirection();
  const { getTranslatedContent } = useQuizStore((state) => ({
    getTranslatedContent: state.getTranslatedContent
  }));
  const mediaQuerySize = useMediaQuery();
  const { currentQuizPage, inBuilder } = useQuizStore((state) => ({
    currentQuizPage: state.currentQuizPage,
    inBuilder: state.inBuilder
  }));
  if (!currentQuizPage) {
    return null;
  }
  const showBar = currentQuizPage.preferences.showBar;
  const retakeQuiz = currentQuizPage.preferences.retakeQuiz;
  const showCartCheckoutOptions = currentQuizPage.preferences.showCartCheckoutOptions;
  const proceedTo = currentQuizPage.preferences.proceedTo;
  const resultBottomBarClass = clsx("result-bottom-bar", {
    "result-bottom-bar-builder--mobile": inBuilder && mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_XS
  });
  const buttonContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showBar && retakeQuiz && (InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      InspectorWrapper,
      {
        elementRef: currentQuizPage == null ? void 0 : currentQuizPage.ref,
        elementName: getTranslatedContent({ key: "retake_quiz" }),
        maxWidth: "100%",
        widthAuto: true,
        elementType: "result",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RetakeQuizButton, {})
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(RetakeQuizButton, {})),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "result-bottom-bar-buttons", children: showBar && showCartCheckoutOptions && proceedTo && (InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      InspectorWrapper,
      {
        elementRef: currentQuizPage.ref,
        elementName: "Add to cart / Proceed to...",
        maxWidth: "100%",
        elementType: "result",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartButtons, { fetchedSlotItems })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CartButtons, { fetchedSlotItems })) })
  ] });
  const buttonsContainerClass = clsx(
    {
      "result-bottom-bar__container--no-retake-quiz": !retakeQuiz
    },
    "result-bottom-bar__container"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: resultBottomBarClass, dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: buttonsContainerClass,
      "data-cy": "results-bottom-bar",
      "aria-label": getTranslatedContent({ key: "ada_results_bottom_bar" }),
      role: "navigation",
      dir,
      children: buttonContent
    }
  ) });
};
const ResultBackground = () => {
  const { imageUrl, quizBackgroundOpacity } = useQuizStore((state) => {
    var _a, _b;
    return {
      imageUrl: ((_a = state.currentQuizPage) == null ? void 0 : _a.preferences.imageUrl) || false,
      quizBackgroundOpacity: ((_b = state.currentQuizPage) == null ? void 0 : _b.preferences.imageOpacity) || 0
    };
  });
  const resultBgImageStyle = imageUrl ? {
    backgroundImage: `url(${imageUrl})`,
    opacity: quizBackgroundOpacity ? quizBackgroundOpacity / 100 : 0.2
  } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "background results-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "results-background-image", style: resultBgImageStyle })
  ] });
};
const ResultStyleWrapper = ({
  children,
  fetchedSlotItems
}) => {
  var _a;
  const {
    currentQuizPage,
    quizInlineHeightEnabled,
    inBuilder,
    isInlineQuiz,
    isModalLink,
    isStoreRenderer,
    executeCustomFeatures,
    quizInlineHeight
  } = useQuizStore((state) => ({
    currentQuizPage: state.currentQuizPage,
    quizInlineHeightEnabled: state.quizInlineHeightEnabled,
    inBuilder: state.inBuilder,
    isInlineQuiz: state.isInlineQuiz,
    isModalLink: state.isModalLink,
    isStoreRenderer: state.isStoreRenderer,
    executeCustomFeatures: state.executeCustomFeatures,
    quizInlineHeight: state.quizInlineHeight
  }));
  const resultClass = clsx({
    "results-builder": inBuilder,
    results: !inBuilder,
    "quiz-modal-link": isModalLink
  });
  const getMinHeight = () => {
    if (isModalLink) {
      return `100vh`;
    } else if (quizInlineHeightEnabled && isInlineQuiz) {
      return `${quizInlineHeight}px`;
    } else if (!isStoreRenderer) {
      return "undefined";
    }
    return "undefined";
  };
  const result = currentQuizPage;
  const showBar = result.preferences.showBar;
  const scopedOrRawCustomCss = reactExports.useMemo(() => {
    var _a2;
    const css = ((_a2 = result == null ? void 0 : result.preferences) == null ? void 0 : _a2.customCSS) || "";
    const id = (result == null ? void 0 : result.ref) || "";
    if (!css || !id) return "";
    const transformedCss = inBuilder ? transformMediaToContainerQueries(css) : css;
    return wrapWithScope(transformedCss, `#${id}`);
  }, [(_a = result == null ? void 0 : result.preferences) == null ? void 0 : _a.customCSS, result == null ? void 0 : result.ref, inBuilder]);
  const canInjectCustomCSS = executeCustomFeatures;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-result-wrapper": true, className: `results-wrapper ${currentQuizPage == null ? void 0 : currentQuizPage.ref}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResultBackground, {}),
    scopedOrRawCustomCss && canInjectCustomCSS ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: scopedOrRawCustomCss }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: currentQuizPage.ref,
        className: resultClass,
        style: { minHeight: getMinHeight() },
        children
      }
    ),
    showBar && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomBar, { fetchedSlotItems })
  ] });
};
const getSlotGidsFromBlocks = (blocks, filteredRecommendations) => blocks.filter((block) => block.type === ResultBlockType.SLOTS).flatMap((block) => Object.values(filteredRecommendations[block.ref] || {}).flat());
const getFetchedSlotItemsForResultBlock = ({
  block,
  section,
  visibleSections,
  fetchedSlotItems,
  filteredRecommendations
}) => {
  if (!fetchedSlotItems) {
    return {};
  }
  let gids = Object.values(filteredRecommendations[block.ref] || {}).flat();
  if (block.type === ResultBlockType.CART_CHECKOUT_BUTTON) {
    gids = getSlotGidsFromBlocks(section.blocks, filteredRecommendations);
    if (gids.length === 0) {
      gids = visibleSections.flatMap(
        (visibleSection) => getSlotGidsFromBlocks(visibleSection.blocks, filteredRecommendations)
      );
    }
  }
  const gidSet = new Set(gids);
  return Object.fromEntries(Object.entries(fetchedSlotItems).filter(([gid]) => gidSet.has(gid)));
};
const fetchedFromFixedRecommendations = async (storefrontAccessToken, domain, currentResults, prefs, marketOverrides = {}) => {
  const allSlotsWithFixedRecommendationSystem = currentResults.flatMap(
    (result) => result.sections.flatMap(
      (section) => section.blocks.flatMap(
        (block) => {
          var _a;
          return block.type === "slots" && ((_a = block.preferences) == null ? void 0 : _a.recommendationSystem) === "fixed" ? block.preferences.slots : [];
        }
      )
    )
  );
  const allFixedElements = allSlotsWithFixedRecommendationSystem.flatMap((slot) => {
    return [
      ...slot.includedProductsIds || [],
      ...slot.includedCollectionsIds || [],
      ...slot.includedProductsVariantsIds || []
    ];
  });
  const allTags = allSlotsWithFixedRecommendationSystem.flatMap(
    (slot) => slot.includedTagsCollectionsIds || []
  );
  const allVendors = allSlotsWithFixedRecommendationSystem.flatMap(
    (slot) => slot.includedVendorsCollectionsIds || []
  );
  const allVariants = allSlotsWithFixedRecommendationSystem.flatMap(
    (slot) => slot.includedVariantsCollectionsIds || []
  );
  let metafieldRefs;
  const resultsWithFixedRecommendations = currentResults.filter(
    (result) => result.sections.some(
      (section) => section.blocks.some(
        (block) => {
          var _a;
          return block.type === "slots" && ((_a = block.preferences) == null ? void 0 : _a.recommendationSystem) === "fixed";
        }
      )
    )
  );
  if (resultsWithFixedRecommendations.length > 0) {
    const combinedResult = {
      ...resultsWithFixedRecommendations[0],
      sections: resultsWithFixedRecommendations.flatMap((r) => r.sections)
    };
    metafieldRefs = scanSlotsForMetafieldReferences(combinedResult, prefs);
  }
  let items = {};
  if (allFixedElements.length > 0) {
    const directItems = await fetchItemSlotData(
      allFixedElements,
      {
        storefrontAccessToken,
        shop: domain
      },
      metafieldRefs,
      { ...marketOverrides, includeCollectionProducts: true }
    );
    if (directItems) {
      items = { ...directItems };
    }
  }
  const hasVirtualCollections = allTags.length > 0 || allVendors.length > 0 || allVariants.length > 0;
  if (hasVirtualCollections) {
    const virtualResults = await fetchVirtualCollections(
      { tags: allTags, vendors: allVendors, variants: allVariants },
      { storefrontAccessToken, shop: domain }
    );
    Object.assign(items, virtualResults);
  }
  if (Object.keys(items).length === 0 && allFixedElements.length > 0) {
    console.warn("no_items_returned_from_fetchItemSlotData");
    throw new Error("No items returned from fetchItemSlotData");
  }
  return items;
};
const processResponseAndFetchSlotItems = async (responseObject, currentResults, prefs, marketOverrides = {}) => {
  const filteredRecommendations = filterInvalidGids(responseObject.recommendations);
  const slotsGids = getSlotsGidsFromRecommendations(filteredRecommendations);
  let metafieldRefs;
  const resultPage = currentResults.find((r) => r.ref === responseObject.resultRef);
  if (resultPage) {
    metafieldRefs = scanSlotsForMetafieldReferences(resultPage, prefs);
  }
  const items = await fetchItemSlotData(
    slotsGids,
    {
      storefrontAccessToken: responseObject.storefrontAccessToken,
      shop: responseObject.domain
    },
    metafieldRefs,
    marketOverrides
  );
  if (!items) {
    console.warn("no_items_returned_from_fetchItemSlotData");
    throw new Error("No items returned from fetchItemSlotData");
  }
  return items;
};
const ResultsPreview = ({ shop }) => {
  var _a;
  const [retryCount, setRetryCount] = reactExports.useState(0);
  const [fetchedSlotItems, setFetchedSlotItems] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [previousCartItems, setPreviousCartItems] = reactExports.useState(null);
  const [fetchedFixedRecommendations, setFetchedFixedRecommendations] = reactExports.useState(null);
  const {
    cartItems,
    addToCart: addToCart2,
    addMultipleItemsToCart,
    setCartItems,
    id,
    results,
    answers,
    inBuilder,
    runsMerchantCode,
    isStoreRenderer,
    executeCustomFeatures,
    rendererInstanceId,
    rendererType,
    myshopifyDomain,
    currentQuizPage,
    recommendations,
    responseId,
    resultRef,
    showQuestions,
    setResponse,
    variableScores,
    highestVariableRef,
    questions,
    quizNavigationPastStates,
    quizNavigationPastStatesInBuilder,
    responseLoaded,
    storefrontAccessToken,
    domain,
    preferences,
    previewCountry,
    previewLocale,
    getSubscriptionSelection,
    setSlotItems
  } = useQuizStore((state) => ({
    results: state.results,
    answers: state.answers,
    cartItems: state.cartItems,
    addToCart: state.addToCart,
    addMultipleItemsToCart: state.addMultipleItemsToCart,
    setCartItems: state.setCartItems,
    currentQuizPage: state.currentQuizPage,
    id: state.id,
    inBuilder: state.inBuilder,
    runsMerchantCode: state.runsMerchantCode,
    isStoreRenderer: state.isStoreRenderer,
    executeCustomFeatures: state.executeCustomFeatures,
    rendererInstanceId: state.rendererInstanceId,
    rendererType: state.rendererType,
    myshopifyDomain: state.myshopifyDomain,
    recommendations: state.recommendations,
    responseId: state.responseId,
    resultRef: state.resultRef,
    showQuestions: state.showQuestions,
    setResponse: state.setResponse,
    variableScores: state.variableScores,
    highestVariableRef: state.highestVariableRef,
    questions: state.questions,
    quizNavigationPastStates: state.quizNavigationPastStates,
    quizNavigationPastStatesInBuilder: state.quizNavigationPastStatesInBuilder,
    responseLoaded: state.responseLoaded,
    storefrontAccessToken: state.storefrontAccessToken,
    domain: state.domain,
    preferences: state.preferences,
    previewCountry: state.previewCountry,
    previewLocale: state.previewLocale,
    getSubscriptionSelection: state.getSubscriptionSelection,
    setSlotItems: state.setSlotItems
  }));
  const cartId = reactExports.useMemo(() => Math.random().toString(36).substring(7), [responseId]);
  const skipNextCartPersistenceRef = reactExports.useRef(false);
  const cartItemsRef = reactExports.useRef(cartItems);
  cartItemsRef.current = cartItems;
  const hydrateCartFromShopify = reactExports.useCallback(async () => {
    const cart = await fetchCart();
    const parsedCartItems = parseCartItemsFromFetchCart(cart);
    skipNextCartPersistenceRef.current = true;
    setPreviousCartItems(parsedCartItems);
    setCartItems(parsedCartItems);
    return { cart, parsedCartItems };
  }, [setCartItems]);
  const syncCart = reactExports.useCallback(
    async ({ intent = "update" } = {}) => {
      if (!isStoreRenderer || inBuilder) {
        return [];
      }
      const knownCartItems = cartItemsRef.current;
      const { cart, parsedCartItems } = await hydrateCartFromShopify();
      if (responseId) {
        updateCart(responseId, parsedCartItems, cartId);
      }
      if (syncCartNeedsRefresh(knownCartItems, parsedCartItems, intent)) {
        await refreshCartUI(cart, intent);
      }
      return parsedCartItems;
    },
    [cartId, hydrateCartFromShopify, inBuilder, isStoreRenderer, responseId]
  );
  const simpleAddToCart = reactExports.useMemo(() => createSimpleAddToCart(addToCart2), [addToCart2]);
  const filteredRecommendations = reactExports.useMemo(() => {
    return filterInvalidGids(recommendations);
  }, [recommendations]);
  const result = reactExports.useMemo(() => currentQuizPage, [currentQuizPage]);
  const marketOverrides = reactExports.useMemo(() => {
    if (isStoreRenderer) {
      return {};
    }
    return {
      country: previewCountry || void 0,
      locale: previewLocale || void 0
    };
  }, [isStoreRenderer, previewCountry, previewLocale]);
  const applyDiscountCode = async (discountCode) => {
    if (!isStoreRenderer) {
      console.warn("applyDiscountCode: Can only apply discount codes in store context");
      return;
    }
    if (!storefrontAccessToken || !domain) {
      console.warn("applyDiscountCode: Missing storefront access token or domain");
      return;
    }
    if (!discountCode.trim()) {
      console.warn("applyDiscountCode: Discount code is required");
      return;
    }
    try {
      const result2 = await applyDiscount(storefrontAccessToken, domain, [discountCode]);
      if (result2 == null ? void 0 : result2.cart) {
        console.log("Discount code applied successfully:", result2.cart.discountCodes);
        return result2.cart;
      }
    } catch (error) {
      console.error("Failed to apply discount code:", error);
      throw error;
    }
  };
  const hasAppliedDiscountRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a2;
    const code = (((_a2 = result == null ? void 0 : result.preferences) == null ? void 0 : _a2.discountCode) || "").trim();
    if (!code) {
      return;
    }
    if (hasAppliedDiscountRef.current === code) {
      return;
    }
    if (!inBuilder && isStoreRenderer && storefrontAccessToken && domain && !loading) {
      Promise.resolve(applyDiscountCode(code)).catch(
        (e) => console.error("Auto apply discount failed:", e)
      );
      hasAppliedDiscountRef.current = code;
    }
  }, [result, inBuilder, isStoreRenderer, storefrontAccessToken, domain, loading]);
  const visibleSections = reactExports.useMemo(() => {
    return getVisibleSections({
      currentQuizPage,
      answers,
      inBuilder,
      variableScores,
      highestVariableRef
    });
  }, [currentQuizPage, answers, inBuilder, variableScores, highestVariableRef]);
  const showLoaderError = !inBuilder && (!responseId || !filteredRecommendations);
  const revenueHuntSetStorage = function(name, value) {
    try {
      console.log("revenueHuntSetStorage", name, value);
      const data = {
        value,
        expiry: 3250368e7
        // Year 3000
      };
      localStorage.setItem(name, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to set localStorage:", e);
    }
  };
  reactExports.useEffect(() => {
    if (!isStoreRenderer) {
      return;
    }
    hydrateCartFromShopify();
  }, [hydrateCartFromShopify, isStoreRenderer]);
  reactExports.useEffect(() => {
    if (isStoreRenderer) {
      return () => {
        resetCartUIState();
      };
    }
  }, [isStoreRenderer]);
  reactExports.useEffect(() => {
    if (!isStoreRenderer) return;
    return claimOpenCartWhenIdle();
  }, [isStoreRenderer]);
  reactExports.useEffect(() => {
    if (isStoreRenderer && responseId && id) {
      tagCart(responseId, id);
    }
  }, [responseId, id]);
  reactExports.useEffect(() => {
    if (isStoreRenderer && responseId && id) {
      revenueHuntSetStorage("revenuehunt-responseId-quiz_" + id, responseId);
    }
  }, [isStoreRenderer, responseId, id]);
  reactExports.useEffect(() => {
    if (!isStoreRenderer || !responseId) {
      return;
    }
    if (previousCartItems === null) {
      setPreviousCartItems(cartItems);
      return;
    }
    if (skipNextCartPersistenceRef.current) {
      skipNextCartPersistenceRef.current = false;
      return;
    }
    const hasCartChanged = JSON.stringify(previousCartItems) !== JSON.stringify(cartItems);
    if (!hasCartChanged) {
      return;
    }
    const updateCartAsync = async () => {
      const cart = await fetchCart();
      if (cart) {
        updateCart(responseId, cartItems, cartId);
        await refreshCartUI(cart, cartIntentFor(previousCartItems, cartItems));
      }
    };
    updateCartAsync();
    setPreviousCartItems(cartItems);
  }, [cartId, cartItems, isStoreRenderer, previousCartItems, responseId]);
  const handleResponseOperation = async (operation) => {
    setLoading(true);
    setFetchedSlotItems(null);
    try {
      const items = await operation();
      setFetchedSlotItems(items);
      return items;
    } catch (error) {
      console.error("Error in response operation:", error);
      setFetchedSlotItems(null);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    setSlotItems(fetchedSlotItems || {});
  }, [fetchedSlotItems, setSlotItems]);
  const handleFetchResponse = async (responseId2) => {
    return handleResponseOperation(async () => {
      const response = await getQuizResponse(responseId2, myshopifyDomain);
      setResponse(response);
      return processResponseAndFetchSlotItems(response, results, preferences, marketOverrides);
    });
  };
  const handleCreateResponse = async () => {
    return handleResponseOperation(async () => {
      const submissionAnswers = getSubmissionAnswers({
        answers,
        questions,
        currentQuizPage,
        inBuilder,
        quizNavigationPastStates,
        quizNavigationPastStatesInBuilder,
        prefillOnRetake: preferences.prefillOnRetake
      });
      const payload = {
        quizId: id,
        resultRef: result.ref,
        answers: submissionAnswers.map(({ isValid: _, ...rest }) => ({ ...rest })),
        visibleSectionsRefs: visibleSections.map((section) => section.ref),
        isAdminGenerated: !isStoreRenderer,
        marketId: window == null ? void 0 : window.quiz_market_id,
        variableScores,
        highestVariableRef,
        myshopifyDomain
      };
      const data = await createQuizResponse(payload);
      setResponse(data);
      const items = await processResponseAndFetchSlotItems(
        data,
        results,
        preferences,
        marketOverrides
      );
      await createResponseItemsData(data.responseId, items);
      return items;
    });
  };
  const handleRenderResponse = async () => {
    return handleResponseOperation(async () => {
      const filteredRecommendations2 = filterInvalidGids(recommendations);
      const slotsGids = getSlotsGidsFromRecommendations(filteredRecommendations2);
      let metafieldRefs;
      const resultPage = results.find((r) => r.ref === resultRef);
      if (resultPage) {
        metafieldRefs = scanSlotsForMetafieldReferences(resultPage, preferences);
      }
      const items = await fetchItemSlotData(
        slotsGids,
        {
          storefrontAccessToken,
          shop: shop ? shop : domain
        },
        metafieldRefs,
        marketOverrides
      );
      if (!items) {
        console.warn("no_items_returned_from_fetchItemSlotData");
        throw new Error("No items returned from fetchItemSlotData");
      }
      return items;
    });
  };
  reactExports.useEffect(() => {
    const fetchFixedRecommendations = async () => {
      if (!shop || !storefrontAccessToken) {
        return;
      }
      const items = await fetchedFromFixedRecommendations(
        storefrontAccessToken,
        shop,
        results,
        preferences,
        marketOverrides
      );
      setFetchedFixedRecommendations(items);
    };
    fetchFixedRecommendations();
  }, [results, preferences, shop, storefrontAccessToken, marketOverrides]);
  reactExports.useEffect(() => {
    if (inBuilder) {
      return;
    }
    const executeFetchResponse = async (idForFetching) => {
      await handleFetchResponse(idForFetching);
    };
    const executeCreateResponse = async () => {
      await handleCreateResponse();
    };
    const executeRenderResponse = async () => {
      await handleRenderResponse();
    };
    if (responseLoaded) {
      executeRenderResponse();
      return;
    } else if (responseId) {
      executeFetchResponse(responseId);
      return;
    } else if (!showQuestions) {
      console.warn(
        "Skipping response creation while rendering a past response preview without responseId"
      );
      return;
    } else {
      executeCreateResponse();
    }
  }, []);
  const hasAppliedMarketOverridesRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (inBuilder || isStoreRenderer) {
      return;
    }
    if (!hasAppliedMarketOverridesRef.current) {
      hasAppliedMarketOverridesRef.current = true;
      return;
    }
    if (!responseLoaded && !responseId) {
      return;
    }
    handleRenderResponse();
  }, [marketOverrides, inBuilder, isStoreRenderer, responseLoaded, responseId]);
  reactExports.useEffect(() => {
    if (fetchedSlotItems && currentQuizPage && currentQuizPage.preferences.customJS && runsMerchantCode && executeCustomFeatures) {
      executeCustomJS(fetchedSlotItems);
    }
  }, [
    fetchedSlotItems,
    (_a = currentQuizPage == null ? void 0 : currentQuizPage.preferences) == null ? void 0 : _a.customJS,
    runsMerchantCode,
    executeCustomFeatures
  ]);
  const resultsContentRef = reactExports.useRef(null);
  const postedHeightRef = reactExports.useRef(null);
  const ResultContent = reactExports.useMemo(() => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "content results-content",
        ref: resultsContentRef,
        role: "region",
        "aria-label": "Quiz Results",
        children: visibleSections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: section.ref, className: "result-block__container", children: section.blocks.map((block) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultBlock,
          {
            block,
            fetchedSlotItems: getFetchedSlotItemsForResultBlock({
              block,
              section,
              visibleSections,
              fetchedSlotItems,
              filteredRecommendations
            }),
            fetchedFixedRecommendations,
            slotsItems: filteredRecommendations[block.ref]
          },
          block.ref
        )) }, section.ref))
      }
    );
  }, [visibleSections, fetchedSlotItems, filteredRecommendations, fetchedFixedRecommendations]);
  reactExports.useEffect(() => {
    const element = resultsContentRef.current;
    if (!element) {
      return;
    }
    const computeOuterHeight = (el) => {
      const wrapper = el.closest("[data-result-wrapper]");
      const target = wrapper || el;
      const rect = target.getBoundingClientRect();
      const computed = window.getComputedStyle(target);
      const marginTop = parseFloat(computed.marginTop) || 0;
      const marginBottom = parseFloat(computed.marginBottom) || 0;
      return Math.ceil(rect.height + marginTop + marginBottom);
    };
    const postHeightIfChanged = () => {
      try {
        const height = computeOuterHeight(element);
        if (postedHeightRef.current !== height) {
          postedHeightRef.current = height;
          if (typeof window !== "undefined" && rendererInstanceId) {
            postQuizRendererMessage({
              targetWindow: window.parent,
              instanceId: rendererInstanceId,
              rendererType,
              type: "resultsHeight",
              height
            });
          }
        }
      } catch (_) {
      }
    };
    const rafId = window.requestAnimationFrame(postHeightIfChanged);
    window.addEventListener("load", postHeightIfChanged);
    const resizeObserver = new ResizeObserver(() => {
      postHeightIfChanged();
    });
    resizeObserver.observe(element);
    return () => {
      try {
        resizeObserver.disconnect();
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("load", postHeightIfChanged);
      } catch (_) {
      }
    };
  }, [
    visibleSections,
    fetchedSlotItems,
    filteredRecommendations,
    rendererInstanceId,
    rendererType
  ]);
  const storeApi = useQuizStoreApi();
  reactExports.useEffect(() => {
    if (currentQuizPage) {
      if (typeof window !== "undefined") {
        const quizContext = buildQuizContext(() => storeApi.getState(), {
          mode: "result",
          currentPage: currentQuizPage,
          slotItems: fetchedSlotItems,
          cartItems
        });
        window.Quiz = {
          currentResult: currentQuizPage,
          answers,
          slotItems: fetchedSlotItems,
          variableScores,
          highestVariableRef,
          applyDiscountCode,
          addAllToCart: createAddAllToCartFunction(
            fetchedSlotItems,
            addToCart2,
            addMultipleItemsToCart,
            isStoreRenderer,
            inBuilder,
            cartItems,
            getSubscriptionSelection
          ),
          addToCart: simpleAddToCart,
          // Developer API: addToCart(variantId, quantity, sellingPlanId?) - cart preview shows $0, checkout uses real price
          syncCart,
          context: quizContext.quiz,
          // ADD THIS - exposes unified context
          ...createQuizDOMHelpers()
          // Add DOM utilities
        };
        const { setAnswerWithPayload, appendAnswerValue, clearAnswer } = storeApi.getState();
        const actions = {
          addAllToCart: createAddAllToCartFunction(
            fetchedSlotItems,
            addToCart2,
            addMultipleItemsToCart,
            isStoreRenderer,
            inBuilder,
            cartItems,
            getSubscriptionSelection
          ),
          addToCart: simpleAddToCart,
          // Developer API: addToCart(variantId, quantity, sellingPlanId?) - cart preview shows $0, checkout uses real price
          applyDiscountCode,
          syncCart,
          // Expose answer manipulation helpers for advanced use cases
          setAnswer: (blockRef, payload) => {
            if (typeof payload === "string") {
              setAnswerWithPayload(blockRef, { value: payload });
            } else {
              setAnswerWithPayload(blockRef, payload);
            }
          },
          appendAnswerValue,
          clearAnswer
        };
        const prevLower = window.quiz || {};
        window.quiz = {
          ...quizContext.quiz,
          actions,
          syncCart,
          // Preserve previously assigned onChange handler if any
          onChange: typeof prevLower.onChange === "function" ? prevLower.onChange : void 0,
          // Include DOM helpers (Shadow DOM-aware)
          ...createQuizDOMHelpers()
        };
      }
    }
  }, [
    currentQuizPage,
    answers,
    fetchedSlotItems,
    variableScores,
    highestVariableRef,
    inBuilder,
    cartItems,
    applyDiscountCode,
    getSubscriptionSelection,
    storeApi,
    simpleAddToCart,
    syncCart
  ]);
  const executeCustomJS = (items) => {
    const canExecuteCustomJS = executeCustomFeatures;
    if (currentQuizPage && currentQuizPage.preferences.customJS && runsMerchantCode && canExecuteCustomJS) {
      try {
        const addAllToCart = createAddAllToCartFunction(
          fetchedSlotItems,
          addToCart2,
          addMultipleItemsToCart,
          isStoreRenderer,
          inBuilder,
          cartItems,
          getSubscriptionSelection
        );
        const quizContext = buildQuizContext(() => storeApi.getState(), {
          mode: "result",
          currentPage: currentQuizPage,
          slotItems: items,
          cartItems
        });
        const { setAnswerWithPayload, setAnswers, appendAnswerValue, clearAnswer, removeAnswer } = storeApi.getState();
        const actions = {
          addAllToCart,
          addToCart: simpleAddToCart,
          // Developer API: addToCart(variantId, quantity, sellingPlanId?) - cart preview shows $0, checkout uses real price
          applyDiscountCode,
          syncCart,
          // Expose answer manipulation helpers for advanced use cases
          setAnswer: (blockRef, payload) => {
            if (typeof payload === "string") {
              setAnswerWithPayload(blockRef, { value: payload });
            } else {
              setAnswerWithPayload(blockRef, payload);
            }
          },
          setAnswers,
          appendAnswerValue,
          clearAnswer,
          removeAnswer
        };
        const customFunction = new Function(
          "quiz",
          "actions",
          currentQuizPage.preferences.customJS
        );
        if (customFunction.length > 2) {
          console.warn(
            "DEPRECATION WARNING: Custom JS using old signature (7 positional parameters). Please update to use the new signature: function(quiz, actions) { ... }. The old signature will be removed in a future version."
          );
          const oldSignatureFunction = new Function(
            "currentResult",
            "answers",
            "slotItems",
            "variableScores",
            "highestVariableRef",
            "addAllToCart",
            "applyDiscountCode",
            currentQuizPage.preferences.customJS
          );
          oldSignatureFunction(
            currentQuizPage,
            answers,
            items,
            variableScores,
            highestVariableRef,
            addAllToCart,
            applyDiscountCode
          );
        } else {
          customFunction(quizContext.quiz, actions);
        }
      } catch (error) {
        console.error("Error evaluating custom JS:", error);
      }
    }
  };
  const renderContent = () => {
    if (loading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {});
    }
    if (showLoaderError) {
      return (
        // Won't be necessary to show this loader error in builder
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoaderError,
          {
            retry: handleCreateResponse,
            retryCount,
            setRetryCount
          }
        )
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ResultStyleWrapper, { fetchedSlotItems, children: ResultContent });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderContent() });
};
export {
  ResultsPreview,
  fetchedFromFixedRecommendations
};

import { isRecommendationMetafieldRef, setQuizParts, isRecord, htmlQuizResourceKind, HTML_QUIZ_ATTRIBUTE_DEFAULTS, isHtmlQuizItemGid, HTML_QUIZ_ITEM_GID_PREFIXES } from "./quiz-renderer-mount-D_6h3far.js";
import { getVariantDisplayTitle } from "./quiz-renderer-variant-title-B1Oi9SHh.js";
import { hasVariantChoice } from "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import { processImageResultsProduct, PictureType } from "./quiz-renderer-image-processing-B3Hir3-2.js";
import { formatUnitPrice, formatPriceWithCurrency } from "./quiz-renderer-currency-helper-ggAAwMUm.js";
const HTML_QUIZ_RASTER_DATA_IMAGE = /^data:image\/(?:png|gif|jpeg|webp|avif|bmp);base64,[A-Za-z0-9+/]+={0,2}$/;
function recommendationMetafieldRefs(template, type) {
  const refs = /* @__PURE__ */ new Set();
  for (const field of template.content.querySelectorAll('[data-field="metafield"]')) {
    const ref = field.getAttribute("data-metafield") ?? "";
    if (isRecommendationMetafieldRef(ref)) refs.add(ref);
  }
  if (type !== "collections" && template.content.querySelector('[data-field="reviews"]')) {
    refs.add("reviews.rating");
    refs.add("reviews.rating_count");
  }
  return refs;
}
const record$1 = (value) => isRecord(value) ? value : {};
const metafield = (owner, ref) => {
  const [namespace, key] = ref.split(".");
  const fields = owner.dynamicMetafields;
  return Array.isArray(fields) ? record$1(
    fields.find((field) => record$1(field).namespace === namespace && record$1(field).key === key)
  ) : {};
};
function renderRecommendationMetafield(field, owner) {
  const ref = field.getAttribute("data-metafield") ?? "";
  const value = isRecommendationMetafieldRef(ref) ? metafield(owner, ref) : {};
  if (typeof value.value === "string" && value.value !== "") {
    if (typeof value.type === "string" && [
      "string",
      "single_line_text_field",
      "multi_line_text_field",
      "date",
      "date_time",
      "number_decimal",
      "number_integer"
    ].includes(value.type)) {
      field.textContent = value.value;
      return;
    }
    if (value.type === "list.single_line_text_field") {
      try {
        const items = JSON.parse(value.value);
        if (Array.isArray(items) && items.length && items.every((item) => typeof item === "string")) {
          const list = field.ownerDocument.createElement("ul");
          for (const item of items) {
            const li = field.ownerDocument.createElement("li");
            li.textContent = item;
            list.append(li);
          }
          field.replaceChildren(list);
          return;
        }
      } catch {
      }
    }
  }
  field.remove();
}
function reviewData(owner) {
  const rating = metafield(owner, "reviews.rating");
  const count = metafield(owner, "reviews.rating_count");
  const number = (value) => typeof value === "number" || typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value) ? Number(value) : NaN;
  if (rating.type === "rating" && typeof rating.value === "string" && count.type === "number_integer" && typeof count.value === "string" && /^\d+$/.test(count.value)) {
    try {
      const data = record$1(JSON.parse(rating.value));
      const value = number(data.value);
      const min = data.scale_min === void 0 ? 0 : number(data.scale_min);
      const max = data.scale_max === void 0 ? 5 : number(data.scale_max);
      const total = Number(count.value);
      if (Number.isFinite(value) && Number.isFinite(min) && min >= 0 && min <= 5 && max === 5 && value >= min && value <= max && Number.isSafeInteger(total) && total > 0)
        return { value, count: total };
    } catch {
    }
  }
  return { value: 0, count: 0 };
}
const STAR = "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8 2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z";
function renderRecommendationReviews(field, owner, message) {
  const { value, count } = reviewData(owner);
  const document = field.ownerDocument;
  const stars = document.createElement("span");
  setQuizParts(stars, "stars");
  stars.title = `${value.toFixed(1)} / 5`;
  stars.setAttribute("role", "img");
  stars.setAttribute("aria-label", stars.title);
  const rounded = Math.round(value * 2) / 2;
  for (let i = 0; i < 5; i++) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 576 512");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", STAR);
    path.setAttribute("fill", rounded >= i + 1 ? "currentColor" : "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "50");
    svg.append(path);
    if (rounded === i + 0.5) {
      const half = path.cloneNode();
      half.setAttribute("fill", "currentColor");
      half.style.clipPath = "inset(0 50% 0 0)";
      svg.append(half);
    }
    stars.append(svg);
  }
  const total = document.createElement("span");
  setQuizParts(total, "review-count");
  total.textContent = `${count} ${message(count === 1 ? "reviewSingular" : "reviewPlural")}`;
  field.replaceChildren(stars, total);
}
const recommendationCardIds = /* @__PURE__ */ new WeakMap();
const CARD_IMAGE_SIZES = "250px";
const CARD_IMAGE_WIDTHS = [360, 550, 750, 1100, 1500, 2048];
function cardImageSrcset(url, square) {
  return CARD_IMAGE_WIDTHS.map((width) => {
    const sized = new URL(url);
    sized.searchParams.set("width", String(width));
    if (square) sized.searchParams.set("height", String(width));
    return `${sized.href} ${width}w`;
  }).join(", ");
}
const record = (value) => isRecord(value) ? value : {};
const string = (value) => typeof value === "string" ? value : "";
const firstImage = (item) => {
  const edges = record(item.images).edges;
  return Array.isArray(edges) ? record(record(edges[0]).node) : {};
};
const money = (value) => {
  const price = record(value);
  const amount = string(price.amount);
  const currencyCode = string(price.currencyCode);
  return /^\d+(?:\.\d+)?$/.test(amount) && Number.isFinite(Number(amount)) && /^[A-Z]{3}$/.test(currencyCode) ? { amount, currencyCode } : void 0;
};
function recommendationItemBindings(item, type, selection) {
  const isVariant = htmlQuizResourceKind(type) === "product-variants";
  const product = isVariant ? record(item.product) : item;
  const title = isVariant ? getVariantDisplayTitle({
    productTitle: string(product.title),
    variantTitle: string(item.title)
  }) : string(item.title);
  const edges = record(item.variants).edges;
  const variantNodes = Array.isArray(edges) ? edges.map((edge) => record(record(edge).node)) : [];
  const variant = selection ? selection.variant : isVariant ? item : variantNodes.find((node) => node.availableForSale === true) ?? variantNodes[0];
  const productImage = type === "collections" ? record(item.image) : firstImage(product);
  const variantImage = record(variant == null ? void 0 : variant.image);
  const images = ((selection == null ? void 0 : selection.imageSource) ?? HTML_QUIZ_ATTRIBUTE_DEFAULTS["data-image-source"]) === "variant" ? [variantImage, productImage] : [productImage, variantImage];
  return {
    product,
    title,
    variantNodes,
    variant,
    images,
    price: type === "collections" ? void 0 : money((variant == null ? void 0 : variant.price) ?? record(item.priceRange).minVariantPrice)
  };
}
let purchaseOptionNames = 0;
function createRecommendationCard(document, item, id, options) {
  var _a, _b;
  const fragment = document.importNode(options.template.content, true);
  const element = fragment.firstElementChild;
  setQuizParts(element, "card");
  recommendationCardIds.set(element, id);
  const bindings = recommendationItemBindings(item, options.type);
  const { product, title, variantNodes } = bindings;
  const select = element.querySelector('select[data-field="variants"]');
  const dropdown = Boolean(select);
  if (select && !hasVariantChoice(product)) {
    if (options.anyVariantChoices) {
      select.disabled = true;
      select.replaceChildren();
      const placeholder = document.createElement("option");
      placeholder.disabled = true;
      placeholder.selected = true;
      placeholder.textContent = options.message("selectNoVariants");
      select.append(placeholder);
    } else select.remove();
  }
  select == null ? void 0 : select.setAttribute("aria-label", options.message("selectVariant"));
  let selectedVariant = bindings.variant;
  const variant = selectedVariant;
  const variantId = htmlQuizResourceKind(options.type) === "product-variants" ? id : string(variant == null ? void 0 : variant.id);
  const isVariantValid = (value) => isHtmlQuizItemGid(value, HTML_QUIZ_ITEM_GID_PREFIXES.product_variants);
  const validVariant = isVariantValid(variantId);
  const currentVariantId = () => htmlQuizResourceKind(options.type) === "product-variants" ? id : string(selectedVariant == null ? void 0 : selectedVariant.id);
  const shortVariantId = () => {
    const requested = currentVariantId();
    return isVariantValid(requested) ? requested.slice(requested.lastIndexOf("/") + 1) : "";
  };
  const currencyFormatFor = (price) => !window.quiz_currency_code || window.quiz_currency_code === price.currencyCode ? window.quiz_currency : void 0;
  const fieldLinks = new Set(
    [...element.querySelectorAll("a[data-link]")].filter(
      (link) => link.hasAttribute("data-field") || link.querySelector("[data-field]")
    )
  );
  for (const field of element.querySelectorAll("[data-field]")) {
    const name = field.dataset.field ?? "";
    if (name === "variants") continue;
    if (name === "metafield") {
      renderRecommendationMetafield(field, product);
      continue;
    }
    if (name === "reviews") {
      renderRecommendationReviews(field, product, options.message);
      continue;
    }
  }
  const staticValues = {
    title,
    description: string(product.description),
    vendor: string(product.vendor)
  };
  for (const [name, value] of Object.entries(staticValues)) {
    const field = element.querySelector(`[data-field="${name}"]`);
    if (field) {
      if (value) field.textContent = value;
      else field.remove();
    }
  }
  const priceField = element.querySelector('[data-field="price"]');
  const compareField = element.querySelector('[data-field="compare-price"]');
  const unitField = element.querySelector('[data-field="unit-price"]');
  const imageField = element.querySelector('[data-field="image"]');
  const subscriptionField = element.querySelector('[data-field="subscription"]');
  const handle = string(product.handle);
  const subscription = options.plans && handle ? subscriptionField : null;
  if (subscription) subscription.hidden = true;
  else subscriptionField == null ? void 0 : subscriptionField.remove();
  let productPlans;
  const subscribeInput = document.createElement("input");
  const planSelect = document.createElement("select");
  const sellingPlanId = () => subscription && !subscription.hidden && subscribeInput.checked ? planSelect.value : "";
  const sizedImage = (imageField == null ? void 0 : imageField.hasAttribute("data-image-unoptimized")) ? null : imageField;
  sizedImage == null ? void 0 : sizedImage.setAttribute("sizes", CARD_IMAGE_SIZES);
  const View = document.defaultView;
  const imageObserver = sizedImage && (View == null ? void 0 : View.ResizeObserver) ? new View.ResizeObserver(([entry]) => {
    const width = Math.ceil(entry.contentRect.width);
    if (width) sizedImage.setAttribute("sizes", `${width}px`);
  }) : void 0;
  if (sizedImage) imageObserver == null ? void 0 : imageObserver.observe(sizedImage);
  const planPricing = (base) => {
    var _a2;
    const allocation = (_a2 = productPlans == null ? void 0 : productPlans.allocations[shortVariantId()]) == null ? void 0 : _a2[sellingPlanId()];
    const cents = (value) => base && value !== void 0 && Number.isSafeInteger(value) && value >= 0 ? money({ amount: String(value / 100), currencyCode: base.currencyCode }) : void 0;
    return { allocation, cents, price: allocation ? cents(allocation.price) ?? base : base };
  };
  const trackedVariant = (variantId2) => ({
    id: variantId2,
    title,
    price: planPricing(money((selectedVariant == null ? void 0 : selectedVariant.price) ?? record(item.priceRange).minVariantPrice)).price ?? {}
  });
  const applySelection = (variant2) => {
    const { allocation, cents, price } = planPricing(
      recommendationItemBindings(item, options.type, { variant: variant2 }).price
    );
    const compare = allocation ? cents(allocation.compareAtPrice) : money(variant2 == null ? void 0 : variant2.compareAtPrice);
    const measurement = record(variant2 == null ? void 0 : variant2.unitPriceMeasurement);
    const unitPrice = money(variant2 == null ? void 0 : variant2.unitPrice);
    const unit = unitPrice && typeof measurement.referenceValue === "number" && Number.isFinite(measurement.referenceValue) && measurement.referenceValue > 0 && typeof measurement.referenceUnit === "string" ? formatUnitPrice({
      unitPrice,
      measurement: {
        referenceUnit: measurement.referenceUnit,
        referenceValue: measurement.referenceValue
      },
      currencyFormat: currencyFormatFor(unitPrice)
    }) : null;
    const drop = (field, value) => {
      if (!field) return;
      if (dropdown || subscription) {
        field.textContent = value;
        field.hidden = !value;
      } else if (value) field.textContent = value;
      else field.remove();
    };
    drop(priceField, price ? formatPriceWithCurrency(price, currencyFormatFor(price)) : "");
    drop(
      compareField,
      price && compare && compare.currencyCode === price.currencyCode && Number(compare.amount) > Number(price.amount) ? formatPriceWithCurrency(compare, currencyFormatFor(compare)) : ""
    );
    drop(unitField, options.type !== "collections" && !allocation ? unit ?? "" : "");
    if (imageField) {
      const { images } = recommendationItemBindings(item, options.type, {
        variant: variant2,
        imageSource: imageField.dataset.imageSource
      });
      const image = images.find((candidate) => safeImageUrl(string(candidate.url), options.domain));
      const src = image && safeImageUrl(string(image.url), options.domain);
      imageField.removeAttribute("srcset");
      imageField.removeAttribute("src");
      if (src) {
        imageField.hidden = false;
        const optimize = !src.startsWith("data:") && Boolean(sizedImage);
        const square = imageField.dataset.imageSize !== "original";
        imageField.src = processImageResultsProduct(
          src,
          optimize,
          square ? PictureType.MEDIUM_SQUARE : PictureType.LARGE_FOUR_THREE
        );
        if (optimize) imageField.setAttribute("srcset", cardImageSrcset(src, square));
        imageField.alt = string(image.altText) || title;
      } else if (dropdown) imageField.hidden = true;
      else imageField.remove();
    }
  };
  applySelection(variant);
  let url = safeUrl(string(product.onlineStoreUrl), options.domain);
  if (url && htmlQuizResourceKind(options.type) === "product-variants") {
    if (!validVariant) url = null;
    else {
      const variantUrl = new URL(url);
      variantUrl.searchParams.set("variant", variantId.slice(variantId.lastIndexOf("/") + 1));
      url = variantUrl.href;
    }
  }
  for (const link of element.querySelectorAll("a[data-link]")) {
    link.removeAttribute("href");
    if (url) {
      link.href = url;
      if (link.target === "_blank") link.rel = "noopener noreferrer";
      if (!((_a = link.textContent) == null ? void 0 : _a.trim()) && !link.querySelector("img")) {
        if (fieldLinks.has(link)) link.remove();
        else
          link.textContent = options.message(
            options.type === "collections" ? "viewCollection" : "viewProduct"
          );
      }
    } else {
      if (link.hasAttribute("data-field") || link.childElementCount)
        link.replaceWith(...link.childNodes);
      else link.remove();
    }
  }
  for (const link of element.querySelectorAll("a:not([data-link])")) {
    const href = safeUrl(link.getAttribute("href") ?? "", options.domain, true);
    if (href) link.href = href;
    else link.removeAttribute("href");
    if (link.target === "_blank") link.rel = "noopener noreferrer";
  }
  for (const cartButton of element.querySelectorAll("button")) cartButton.type = "button";
  const button = element.querySelector('button[data-cart="add"]');
  let status;
  const add = options.add;
  let disposed = false;
  const inactive = () => disposed || options.disposed() || !element.isConnected;
  let pending = Boolean(subscription);
  const nameButton = (cartButton) => {
    var _a2;
    return cartButton.setAttribute("aria-label", `${((_a2 = cartButton.textContent) == null ? void 0 : _a2.trim()) ?? ""}, ${title}`);
  };
  const purchasable = () => isVariantValid(currentVariantId()) && (selectedVariant == null ? void 0 : selectedVariant.availableForSale) === true && !((productPlans == null ? void 0 : productPlans.requiresSellingPlan) && !sellingPlanId());
  const addLabel = options.addAction === "viewProduct" ? options.message("viewProduct") : !dropdown && ((_b = button == null ? void 0 : button.textContent) == null ? void 0 : _b.trim()) || options.message("addToCart");
  const updateButton = () => {
    var _a2;
    if (!button) return;
    const available = purchasable();
    button.disabled = pending || !available;
    const label = available ? addLabel : options.message("soldOut");
    if (((_a2 = button.textContent) == null ? void 0 : _a2.trim()) !== label) button.textContent = label;
    nameButton(button);
  };
  const createStatus = (anchor) => {
    const created = document.createElement("p");
    setQuizParts(created, "cart-status");
    created.setAttribute("role", "status");
    const stepperBox2 = element.querySelector("[data-stepper]");
    const after = stepperBox2 && anchor.compareDocumentPosition(stepperBox2) & Node.DOCUMENT_POSITION_FOLLOWING ? stepperBox2 : anchor;
    after.after(created);
    return created;
  };
  if (button) {
    if (!add) button.remove();
    else if (dropdown || validVariant && typeof (variant == null ? void 0 : variant.availableForSale) === "boolean") {
      if (dropdown || (variant == null ? void 0 : variant.availableForSale)) status = createStatus(button);
      updateButton();
    } else button.remove();
  }
  const stepperBox = element.querySelector("[data-stepper]");
  const quantityValue = element.querySelector('[data-field="quantity"]');
  const minus = element.querySelector('button[data-cart="minus"]');
  const plus = element.querySelector('button[data-cart="plus"]');
  const cart = options.cart;
  if (!cart) stepperBox == null ? void 0 : stepperBox.remove();
  const renderCartState = () => {
    if (!cart || !stepperBox || !quantityValue) return;
    const short = shortVariantId();
    const quantity = short ? cart.quantity(short, sellingPlanId()) : 0;
    const busy = short ? cart.pending(short) : false;
    stepperBox.hidden = quantity <= 0;
    if (button) button.hidden = quantity > 0 && Boolean(minus && plus);
    stepperBox.setAttribute("aria-busy", busy ? "true" : "false");
    quantityValue.textContent = String(quantity);
    stepperBox.setAttribute(
      "aria-label",
      string(options.message("countInCart")).replace("{{count}}", String(quantity))
    );
    for (const control of [minus, plus]) {
      if (!control) continue;
      control.disabled = busy || cart.uncertain();
      const base = control === plus ? "increaseQuantity" : "decreaseQuantity";
      control.setAttribute("aria-label", `${options.message(base)}: ${title}`);
    }
  };
  const landed = (pressed, hadFocus) => {
    const short = shortVariantId();
    if (status && cart && short) {
      const count = options.message("countInCart").replace("{{count}}", String(cart.quantity(short, sellingPlanId())));
      status.textContent = `${title}: ${count}`;
    }
    const next = pressed === button ? plus : button;
    const root = element.getRootNode();
    const page = element.ownerDocument;
    const focusLost = root.activeElement === pressed || !root.activeElement && (!page.activeElement || page.activeElement === page.body);
    if (hadFocus && focusLost && pressed.closest("[hidden]") && next && !next.closest("[hidden]"))
      next.focus();
  };
  const unsubscribe = cart == null ? void 0 : cart.subscribe(() => {
    if (inactive()) return;
    renderCartState();
  });
  const showPlans = () => {
    if (!subscription || !productPlans) return;
    const allocations = productPlans.allocations[shortVariantId()] ?? {};
    const plans = productPlans.plans.filter((plan) => allocations[plan.id]);
    subscription.hidden = !plans.length;
    if (!plans.length) return;
    const chosen = planSelect.value;
    planSelect.replaceChildren(
      ...plans.map((plan) => {
        const option = document.createElement("option");
        option.value = plan.id;
        option.textContent = plan.name;
        return option;
      })
    );
    if (plans.some((plan) => plan.id === chosen)) planSelect.value = chosen;
    planSelect.hidden = !subscribeInput.checked;
  };
  if (select && hasVariantChoice(product)) {
    for (const variantNode of variantNodes) {
      const option = document.createElement("option");
      option.value = string(variantNode.id);
      const values = Array.isArray(variantNode.selectedOptions) ? variantNode.selectedOptions.map((selected) => string(record(selected).value)).filter(Boolean) : [];
      option.textContent = (values.join(" / ") || string(variantNode.title)) + (variantNode.availableForSale === false ? ` - ${options.message("soldOut")}` : "");
      select.append(option);
    }
    select.value = string(selectedVariant == null ? void 0 : selectedVariant.id);
    select.addEventListener("change", () => {
      const next = variantNodes.find((variantNode) => string(variantNode.id) === select.value);
      if (!next) {
        select.value = string((selectedVariant == null ? void 0 : selectedVariant.id) ?? "");
        return;
      }
      selectedVariant = next;
      if (status) status.textContent = "";
      showPlans();
      applySelection(next);
      updateButton();
      renderCartState();
    });
  }
  renderCartState();
  if (subscription && options.plans) {
    const read = options.plans(handle).catch(() => void 0);
    void read.then((plans) => {
      pending = false;
      if (inactive()) return;
      if (!plans) {
        subscription.remove();
        updateButton();
        return;
      }
      productPlans = plans;
      const name = `purchase-option-${++purchaseOptionNames}`;
      const purchaseOption = (input, value, label) => {
        const option = document.createElement("label");
        setQuizParts(option, "purchase-option");
        input.type = "radio";
        input.name = name;
        input.value = value;
        option.append(input, ` ${label}`);
        return option;
      };
      const oneTimeInput = document.createElement("input");
      const oneTime = purchaseOption(oneTimeInput, "onetime", options.message("oneTimePurchase"));
      oneTime.hidden = plans.requiresSellingPlan;
      subscribeInput.checked = true;
      setQuizParts(planSelect, "plan-select");
      planSelect.setAttribute("aria-label", options.message("subscribeAndSave"));
      subscription.replaceChildren(
        oneTime,
        purchaseOption(subscribeInput, "subscription", options.message("subscribeAndSave")),
        planSelect
      );
      subscription.addEventListener("change", () => {
        if (inactive()) return;
        if (status) status.textContent = "";
        planSelect.hidden = !subscribeInput.checked;
        applySelection(selectedVariant);
        updateButton();
        renderCartState();
      });
      showPlans();
      applySelection(selectedVariant);
      updateButton();
      renderCartState();
    });
  }
  const click = async (event) => {
    var _a2, _b2, _c, _d, _e;
    const target = event.target;
    const link = target == null ? void 0 : target.closest("a");
    if (link) {
      event.preventDefault();
      if (!inactive() && link.href) {
        if (link.hasAttribute("data-link")) (_a2 = options.track) == null ? void 0 : _a2.call(options, "productClicked", trackedVariant(id));
        options.navigate(link.href, link.target);
      }
    }
    const stepper = target == null ? void 0 : target.closest(
      'button[data-cart="plus"], button[data-cart="minus"]'
    );
    if (stepper && cart) {
      event.preventDefault();
      if (inactive() || stepper.disabled || !isVariantValid(currentVariantId())) return;
      const requested = shortVariantId();
      const plan2 = sellingPlanId();
      if (!requested) return;
      const hadFocus2 = element.getRootNode().activeElement === stepper;
      stepper.disabled = true;
      const tracked2 = trackedVariant(currentVariantId());
      let outcomeLanded = false;
      try {
        const outcome = stepper === plus ? await cart.add(requested, plan2) : await cart.decrement(requested, plan2);
        outcomeLanded = outcome.landed;
        if (outcome.landed && stepper === plus) (_b2 = options.track) == null ? void 0 : _b2.call(options, "productAdded", tracked2);
        if (!outcome.landed && !inactive() && status)
          status.textContent = options.message("tryAgain");
      } catch {
        if (!inactive() && status) status.textContent = options.message("tryAgain");
      } finally {
        if (!inactive()) renderCartState();
      }
      if (outcomeLanded && !inactive() && shortVariantId() === requested && sellingPlanId() === plan2)
        landed(stepper, hadFocus2);
      return;
    }
    if (!button || !target || !button.contains(target) || !add || !status) return;
    event.preventDefault();
    if (inactive() || button.disabled) return;
    const requestedId = currentVariantId();
    const plan = sellingPlanId();
    if (!isVariantValid(requestedId)) return;
    pending = true;
    const tracked = trackedVariant(requestedId);
    const hadFocus = element.getRootNode().activeElement === button;
    button.disabled = true;
    status.textContent = "";
    try {
      if (options.addAction === "viewProduct")
        (_c = options.track) == null ? void 0 : _c.call(options, "productClicked", trackedVariant(id));
      const notice = await add(requestedId, plan);
      if (typeof notice === "object") {
        (_d = options.track) == null ? void 0 : _d.call(options, "productClicked", trackedVariant(id));
        options.navigate(notice.viewProduct, "_self");
        return;
      }
      if (!notice && options.addAction !== "viewProduct") (_e = options.track) == null ? void 0 : _e.call(options, "productAdded", tracked);
      if (!inactive() && currentVariantId() === requestedId && sellingPlanId() === plan) {
        landed(button, hadFocus);
        if (notice) status.textContent = notice;
      }
    } catch {
      const plans = !subscription && handle && options.plans ? await options.plans(handle).catch(() => void 0) : void 0;
      if (plans == null ? void 0 : plans.requiresSellingPlan) productPlans = plans;
      else if (!inactive() && currentVariantId() === requestedId && sellingPlanId() === plan)
        status.textContent = options.message("tryAgain");
    } finally {
      pending = false;
      if (!inactive()) updateButton();
    }
  };
  element.addEventListener("click", click);
  return {
    element,
    dispose: () => {
      disposed = true;
      imageObserver == null ? void 0 : imageObserver.disconnect();
      unsubscribe == null ? void 0 : unsubscribe();
      element.removeEventListener("click", click);
    }
  };
}
function isUsableRecommendationItem(value) {
  const item = record(value);
  return Boolean(string(record(item.product).title || item.title).trim()) && item.status !== "DRAFT";
}
function safeImageUrl(value, domain) {
  if (HTML_QUIZ_RASTER_DATA_IMAGE.test(value)) return value;
  return safeUrl(value, domain);
}
function safeUrl(value, domain, literal = false) {
  if (!value) return null;
  try {
    const url = new URL(value, domain.startsWith("https://") ? domain : `https://${domain}`);
    return (literal ? ["https:", "http:", "mailto:", "tel:"] : ["https:", "http:"]).includes(
      url.protocol
    ) && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
const recommendationCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRecommendationCard,
  isUsableRecommendationItem,
  recommendationCardIds,
  recommendationItemBindings
}, Symbol.toStringTag, { value: "Module" }));
export {
  createRecommendationCard,
  isUsableRecommendationItem,
  recommendationCard,
  recommendationMetafieldRefs
};

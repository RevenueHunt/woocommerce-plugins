const __vite__fileDeps=["./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer.js","./quiz-renderer-shopify-commerce-spU2anzH.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-cart-hGLiNvFe.js","./quiz-renderer-storeFrontClient-Dh-TPIVy.js","./quiz-renderer-recommendation-cart-BwOZ-x1U.js","./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js","./quiz-renderer-woocommerce-commerce-BQP_2zxh.js","./quiz-renderer-standalone-commerce-BHUHu0ZY.js","./quiz-renderer-has-variant-choice-Bygb1hHs.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-preview-commerce-DTRiHzw3.js","./quiz-renderer-recommendation-products-BwU65ujZ.js","./quiz-renderer-recommendation-card-Cb3zuIKN.js","./quiz-renderer-variant-title-B1Oi9SHh.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-currency-helper-ggAAwMUm.js","./quiz-renderer-response-result-Btcv1_Hl.js","./quiz-renderer-index-BXMeXr7c.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload, PREVIEW_RECOMMENDATIONS_URL, GET_QUIZ_URL } from "./quiz-renderer.js";
import { hasVariantChoice } from "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import { postQuizRendererMessage } from "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
const createHtmlQuizRun = () => ({ history: [] });
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function htmlQuizRuntimePreferencesFrom(preferences) {
  const value = isRecord(preferences) ? preferences : {};
  return {
    saveQuizProgress: typeof value.saveQuizProgress === "boolean" ? value.saveQuizProgress : true,
    prefillFromLink: value.prefillFromLink === true,
    trackGA4Events: value.trackGA4Events === true,
    trackMetaPixel: value.trackMetaPixel === true,
    trackTiktokPixel: value.trackTiktokPixel === true,
    tiktokPixelId: typeof value.tiktokPixelId === "string" ? value.tiktokPixelId : void 0
  };
}
const HTML_QUIZ_RUNTIME_SCRIPT_ID = "quiz-runtime";
function readHtmlQuizRuntime(root) {
  var _a;
  let value;
  try {
    value = JSON.parse(((_a = root.querySelector(`#${HTML_QUIZ_RUNTIME_SCRIPT_ID}`)) == null ? void 0 : _a.textContent) || "{}");
  } catch {
    value = {};
  }
  const runtime = isRecord(value) ? value : {};
  return {
    // Raw-document helpers don't have #quiz-runtime; mounted artifacts always supply scores.
    scores: runtime.scores,
    initialStep: typeof runtime.initialStep === "string" ? runtime.initialStep : void 0,
    stepLabels: isRecord(runtime.stepLabels) ? Object.fromEntries(
      Object.entries(runtime.stepLabels).filter(
        (entry) => typeof entry[1] === "string"
      )
    ) : void 0,
    preferences: htmlQuizRuntimePreferencesFrom(runtime.preferences),
    messages: isRecord(runtime.messages) ? runtime.messages : {}
  };
}
const QUIZ_BODY_SELECTOR = '[part~="body"]';
const QUIZ_CONTAINER = "quiz";
const HTML_QUIZ_ACTIVE_STEP_SELECTOR = "[data-step]:not([hidden])";
function quizDocument(root) {
  return root.ownerDocument ?? root;
}
function quizBody(root) {
  return root.querySelector(QUIZ_BODY_SELECTOR) ?? quizDocument(root).body;
}
function isElement(target) {
  return (target == null ? void 0 : target.nodeType) === 1;
}
function isPickInput(event) {
  return event.type === "input" && isElement(event.target) && event.target.matches('input[type="radio" i], input[type="checkbox" i], select');
}
function isRendered(element) {
  var _a, _b;
  if (element.closest("[hidden]")) return false;
  if (!element.ownerDocument.defaultView) return true;
  if (((_a = element.checkVisibility) == null ? void 0 : _a.call(element)) ?? true) return true;
  const parent = element.parentElement ?? element.getRootNode().host;
  const display = (_b = element.ownerDocument.defaultView) == null ? void 0 : _b.getComputedStyle(element).display;
  return Boolean(parent) && display === "contents" && isRendered(parent);
}
function createHtmlQuizKernel(doc, run = createHtmlQuizRun()) {
  const hooks = /* @__PURE__ */ new Map();
  const { scores, stepLabels, ...state } = readHtmlQuizRuntime(doc);
  run.scores = scores;
  run.stepLabels = stepLabels;
  const kernel = {
    doc,
    state,
    run,
    on(event, handler) {
      const list = hooks.get(event) ?? [];
      list.push(handler);
      hooks.set(event, list);
    },
    emit(event, detail) {
      for (const handler of hooks.get(event) ?? []) handler(detail);
    },
    destroy() {
      const handlers = hooks.get("destroy") ?? [];
      hooks.clear();
      for (const handler of handlers) handler();
    }
  };
  return kernel;
}
const sectionKey = (stepRef, sectionRef) => `${stepRef}/${sectionRef}`;
const HTML_QUIZ_CONTRACT_VERSIONS = {
  compiledQuiz: "htmlQuiz.compiled.v2",
  recommendations: "recommendations.v1"
};
const HTML_QUIZ_MULTI_ANSWER_TYPES = ["checkbox", "select-multiple"];
function isHtmlQuizMultiAnswerType(type) {
  return HTML_QUIZ_MULTI_ANSWER_TYPES.some((multi) => multi === type.toLowerCase());
}
const HTML_QUIZ_GO_TO_KEYWORDS = ["previous", "retake"];
const HTML_QUIZ_FALLBACK_COUNTRY = "US";
const HTML_QUIZ_STRUCTURAL_ATTRIBUTES = [
  "data-step",
  "data-section",
  "data-block",
  "data-slot"
];
const HTML_QUIZ_NUMERIC_ATTRIBUTES = {
  "data-min-selected": { format: { int: { min: 0 } }, default: "0" },
  "data-max-selected": { format: { int: { min: 0 } } },
  "data-count": { format: { int: { min: 1 } }, default: "1" },
  "data-min-votes": { format: "number", default: "0" },
  "data-max-votes": { format: "number" },
  "data-click-after": { format: { int: { min: 1 } } },
  "data-score-*": { format: "number" }
};
const HTML_QUIZ_ATTRIBUTE_DEFAULTS = {
  "data-progress-text": "{{current}} / {{total}}",
  ...Object.fromEntries(
    Object.entries(HTML_QUIZ_NUMERIC_ATTRIBUTES).flatMap(
      ([name, rule]) => "default" in rule ? [[name, rule.default]] : []
    )
  ),
  "data-image-source": "variant",
  "data-image-size": "square"
};
const HTML_QUIZ_IDENTIFIER = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const HTML_QUIZ_BLOCK_TYPES = {
  heading: { inSlot: true },
  text: { inSlot: true },
  image: { inSlot: true },
  choice: { answers: true },
  actions: { noContentText: true },
  recommendations: { noContentText: true },
  cards: { inSlot: true, slotOnly: true },
  input: { answers: true },
  progress: { noContentText: true },
  milestones: { noContentText: true },
  video: {},
  score: {}
};
const HTML_QUIZ_AUTHORED_BLOCK_TYPES = Object.keys(
  HTML_QUIZ_BLOCK_TYPES
);
function isQuizBlockType(type) {
  return type != null && Object.hasOwn(HTML_QUIZ_BLOCK_TYPES, type);
}
function quizBlockFlag(type, flag) {
  return isQuizBlockType(type) && flag in HTML_QUIZ_BLOCK_TYPES[type];
}
const HTML_QUIZ_ANSWER_BLOCK_TYPES = HTML_QUIZ_AUTHORED_BLOCK_TYPES.filter((type) => quizBlockFlag(type, "answers"));
const HTML_QUIZ_BLOCK_TYPE_ATTRIBUTE = "data-block-type";
function htmlQuizBlockSelector(type, named = true) {
  return `${named ? "[data-block]" : ""}[${HTML_QUIZ_BLOCK_TYPE_ATTRIBUTE}="${type}"]`;
}
function nameAutocompleteTokens(value) {
  const tokens = (value ?? "").replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, "").split(/[\t\n\f\r ]+/);
  let index = 0;
  if (/^section-.+/i.test(tokens[index])) index++;
  if (/^(shipping|billing)$/i.test(tokens[index])) index++;
  if (tokens.length !== index + 1 || !/^(name|given-name|family-name)$/i.test(tokens[index]))
    return void 0;
  return tokens;
}
function inferHtmlQuizInputType(tagName, type, autocomplete) {
  var _a, _b;
  if (tagName.toLowerCase() === "textarea") return "long_text";
  if (tagName.toLowerCase() !== "input") return void 0;
  switch ((type || "text").toLowerCase()) {
    case "email":
      return "email";
    case "number":
      return "number";
    case "tel":
      return "phone";
    case "date":
      return "date";
    case "range":
      return "range";
    case "hidden":
    case "search":
    case "url":
    case "password":
    case "month":
    case "week":
    case "time":
    case "datetime-local":
    case "color":
    case "checkbox":
    case "radio":
    case "file":
    case "submit":
    case "image":
    case "reset":
    case "button":
      return void 0;
    default: {
      const field = (_b = (_a = nameAutocompleteTokens(autocomplete)) == null ? void 0 : _a.at(-1)) == null ? void 0 : _b.toLowerCase();
      if (field === "name") return "full_name";
      if (field === "given-name") return "first_name";
      if (field === "family-name") return "last_name";
      return "short_text";
    }
  }
}
function quizBlockType(node, reader) {
  const type = reader.attr(node, HTML_QUIZ_BLOCK_TYPE_ATTRIBUTE);
  return isQuizBlockType(type) ? type : void 0;
}
function closestHtmlQuizNode(node, reader, matches) {
  let current = node;
  while (current) {
    if (matches(current)) return current;
    current = reader.parent(current);
  }
}
function htmlQuizClosestBlock(node, reader) {
  return closestHtmlQuizNode(
    node,
    reader,
    (candidate) => reader.attr(candidate, "data-block") != null
  );
}
function htmlQuizChoicePlaceholder(node, reader) {
  const parent = reader.parent(node);
  return reader.tag(node) === "option" && reader.attr(node, "value") === "" && !!parent && reader.tag(parent) === "select" && reader.firstOption(parent) === node;
}
function controlType(node, reader) {
  var _a;
  return (_a = reader.attr(node, "type")) == null ? void 0 : _a.toLowerCase();
}
function isChoiceInput(node, reader) {
  const type = controlType(node, reader);
  return reader.tag(node) === "input" && (type === "radio" || type === "checkbox");
}
function htmlQuizBusinessChoice(node, reader) {
  const block = htmlQuizClosestBlock(node, reader);
  if (!block || quizBlockType(block, reader) !== "choice") return false;
  if (reader.tag(node) === "input") return isChoiceInput(node, reader);
  return reader.tag(node) === "option" && !htmlQuizChoicePlaceholder(node, reader) && !!closestHtmlQuizNode(
    reader.parent(node),
    reader,
    (candidate) => reader.tag(candidate) === "select"
  );
}
function htmlQuizSemanticOwner(node, reader) {
  return closestHtmlQuizNode(
    reader.parent(node),
    reader,
    (candidate) => reader.tag(candidate) === "body" || HTML_QUIZ_STRUCTURAL_ATTRIBUTES.some((name) => reader.attr(candidate, name) != null)
  );
}
function blockSection(node, reader) {
  const owner = htmlQuizSemanticOwner(node, reader);
  if (!owner || reader.attr(owner, "data-slot") == null) return owner;
  const recommendations = htmlQuizSemanticOwner(owner, reader);
  return recommendations && htmlQuizSemanticOwner(recommendations, reader);
}
function htmlQuizScoreTarget(node, reader) {
  var _a, _b;
  const block = htmlQuizClosestBlock(node, reader);
  if (block && quizBlockType(block, reader) === "choice" && !htmlQuizBusinessChoice(node, reader))
    return false;
  const tag = reader.tag(node);
  if (["input", "select", "textarea"].includes(tag)) return !!((_a = reader.attr(node, "name")) == null ? void 0 : _a.trim());
  const select = tag === "option" && closestHtmlQuizNode(
    reader.parent(node),
    reader,
    (candidate) => reader.tag(candidate) === "select"
  );
  return !!select && !!((_b = reader.attr(select, "name")) == null ? void 0 : _b.trim());
}
function htmlQuizInputBlockControls(block, reader) {
  const all = htmlQuizDescendants(block, reader).filter((node) => {
    const tag = reader.tag(node);
    return tag === "input" && reader.attr(node, "data-consent-for") == null || tag === "textarea" || tag === "select" && reader.attr(node, "data-country-picker") == null;
  });
  return {
    all,
    owned: all.filter((node) => htmlQuizClosestBlock(node, reader) === block)
  };
}
function htmlQuizAnswerType(node, reader) {
  const tag = reader.tag(node);
  const type = reader.attr(node, "type");
  const block = htmlQuizClosestBlock(node, reader);
  if (block && quizBlockType(block, reader) === "input") {
    const semantic = inferHtmlQuizInputType(tag, type, reader.attr(node, "autocomplete"));
    if (semantic) return semantic;
  }
  return tag === "select" ? reader.attr(node, "multiple") != null ? "select-multiple" : "select-one" : (type == null ? void 0 : type.toLowerCase()) || (tag === "textarea" ? "textarea" : "text");
}
function htmlQuizDescendants(node, reader) {
  return reader.children(node).flatMap((child) => [child, ...htmlQuizDescendants(child, reader)]);
}
function htmlQuizRouteCanBeHidden(node, reader, conditional, stopBefore) {
  if (reader.attr(node, "data-click-after") != null) return false;
  for (let current = node; current && current !== stopBefore; current = reader.parent(current)) {
    if (reader.attr(current, "hidden") != null || conditional)
      return true;
  }
  return false;
}
const HTML_HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
const HTML_QUIZ_EDITABLE_PART_TAGS = {
  heading: [...HTML_HEADING_TAGS],
  text: ["p"],
  prompt: ["legend"],
  image: ["img"]
};
function htmlQuizNativeTextTarget(element, reader) {
  const type = reader.attr(element, "data-block-type");
  const business = htmlQuizBusinessChoice(element, reader);
  const tag = reader.tag(element);
  const hasAria = (node) => reader.attr(node, "aria-label") != null || reader.attr(node, "aria-labelledby") != null;
  let part;
  let target = null;
  const unsupported = () => new Error("Unsupported native text target");
  if (business) {
    if (hasAria(element)) throw unsupported();
    if (tag === "option" && reader.attr(element, "label") != null)
      return { target: element, attribute: "label" };
    if (tag === "option") target = element;
    else part = "label";
  } else if (reader.attr(element, "data-action") != null) target = element;
  else if (type === "input") part = "label";
  else if (type === "heading") part = "heading";
  else if (type === "text") part = "text";
  else if (type === "choice") part = "prompt";
  if (part === "label") {
    const controls = business ? [element] : htmlQuizInputBlockControls(element, reader).all.filter(
      (node) => reader.tag(node) !== "select"
    );
    if (controls.some(hasAria)) throw unsupported();
    const labels = controls.length === 1 ? reader.labels(controls[0]) : [];
    target = labels.length === 1 ? labels[0] : null;
    if (!target || reader.children(target).some((child) => child !== controls[0] && reader.tag(child) !== "img"))
      throw unsupported();
  } else if (part) {
    const tags = HTML_QUIZ_EDITABLE_PART_TAGS[part];
    const targets = (tags.includes(tag) ? [element] : htmlQuizDescendants(element, reader).filter((node) => tags.includes(reader.tag(node)))).filter((node) => htmlQuizClosestBlock(node, reader) === element);
    target = targets.length === 1 ? targets[0] : null;
  }
  if (!target) throw unsupported();
  return { target, part };
}
const HTML_QUIZ_TRANSLATIONS_ID = "quiz-translations";
const HTML_QUIZ_TRANSLATION_ATTRIBUTES = [
  "alt",
  "placeholder",
  "aria-label",
  "title",
  "data-error-message"
];
function htmlQuizTranslationLocale(locale) {
  try {
    return Intl.getCanonicalLocales(locale.trim().replaceAll("_", "-"))[0];
  } catch {
    return void 0;
  }
}
function htmlQuizMarketId(value) {
  const id = String(value ?? "").replace(/^gid:\/\/shopify\/Market\//, "");
  return /^\d+$/.test(id) ? id : void 0;
}
function isRtlLocale(locale) {
  return ["ar", "fa", "he", "ku", "ps", "ur"].includes(locale.toLowerCase().split("-")[0]);
}
function htmlQuizTranslationTargets(elements, reader, structure = false) {
  const targets = /* @__PURE__ */ new Map();
  for (const element of elements) {
    const keys = [];
    const action = reader.attr(element, "data-action");
    if (action) keys.push(action);
    if (htmlQuizBusinessChoice(element, reader)) {
      const select = reader.tag(element) === "option" ? closestHtmlQuizNode(
        reader.parent(element),
        reader,
        (node) => reader.tag(node) === "select"
      ) : element;
      const name = select && reader.attr(select, "name");
      const value = reader.attr(element, "value");
      if (name && value) keys.push(`${name}/${value}`);
    }
    const block = reader.attr(element, "data-block");
    if (block) {
      const section = blockSection(element, reader);
      const sectionRef = section && reader.attr(section, "data-section");
      const step = section && closestHtmlQuizNode(section, reader, (node) => reader.attr(node, "data-step") != null);
      if (sectionRef)
        keys.push(
          `${sectionKey((step && reader.attr(step, "data-step")) ?? "@shared", sectionRef)}/${block}`
        );
    }
    if (structure) {
      const step = reader.attr(element, "data-step");
      const slot = reader.attr(element, "data-slot");
      if (step) targets.set(step, { owner: element, target: element, rich: false });
      if (slot) targets.set(`${slot}@fixed`, { owner: element, target: element, rich: false });
      for (const key of keys) {
        targets.set(key, { owner: element, target: element, rich: false });
        const images = reader.tag(element) === "img" ? [element] : htmlQuizDescendants(element, reader).filter(
          (node) => reader.tag(node) === "img" && (!block || htmlQuizClosestBlock(node, reader) === element)
        );
        if (images.length === 1)
          targets.set(`${key}@src`, {
            owner: element,
            target: images[0],
            attribute: "src",
            rich: false
          });
      }
      continue;
    }
    if (!keys.length) continue;
    for (const key of keys) {
      try {
        const text = htmlQuizNativeTextTarget(element, reader);
        const type = reader.attr(element, "data-block-type");
        const rich = type === "heading" || type === "text";
        if (rich || text.part === "label" || text.attribute || !reader.children(text.target).length)
          targets.set(key, {
            owner: element,
            target: text.target,
            attribute: text.attribute,
            rich
          });
      } catch {
      }
      for (const attribute of HTML_QUIZ_TRANSLATION_ATTRIBUTES) {
        const candidates = reader.attr(element, attribute) != null ? [element] : htmlQuizDescendants(element, reader).filter(
          (node) => reader.attr(node, attribute) != null && (!block || htmlQuizClosestBlock(node, reader) === element)
        );
        if (candidates.length === 1)
          targets.set(`${key}@${attribute}`, {
            owner: element,
            target: candidates[0],
            attribute,
            rich: false
          });
      }
    }
  }
  return targets;
}
const HTML_QUIZ_ORDER_STATUS_MESSAGES = [
  {
    status: "AUTHORIZED",
    key: "assistantOrderAuthorized",
    jsonKey: "assistant_order_authorized",
    commerce: false
  },
  {
    status: "EXPIRED",
    key: "assistantOrderExpired",
    jsonKey: "assistant_order_expired",
    commerce: false
  },
  { status: "PAID", key: "assistantOrderPaid", jsonKey: "assistant_order_paid", commerce: false },
  {
    status: "PARTIALLY_PAID",
    key: "assistantOrderPartiallyPaid",
    jsonKey: "assistant_order_partially_paid",
    commerce: false
  },
  {
    status: "PARTIALLY_REFUNDED",
    key: "assistantOrderPartiallyRefunded",
    jsonKey: "assistant_order_partially_refunded",
    commerce: false
  },
  {
    status: "PENDING",
    key: "assistantOrderPending",
    jsonKey: "assistant_order_pending",
    commerce: false
  },
  {
    status: "REFUNDED",
    key: "assistantOrderRefunded",
    jsonKey: "assistant_order_refunded",
    commerce: false
  },
  {
    status: "VOIDED",
    key: "assistantOrderVoided",
    jsonKey: "assistant_order_voided",
    commerce: false
  },
  {
    status: "FULFILLED",
    key: "assistantOrderFulfilled",
    jsonKey: "assistant_order_fulfilled",
    commerce: false
  },
  {
    status: "IN_PROGRESS",
    key: "assistantOrderInProgress",
    jsonKey: "assistant_order_in_progress",
    commerce: false
  },
  {
    status: "ON_HOLD",
    key: "assistantOrderOnHold",
    jsonKey: "assistant_order_on_hold",
    commerce: false
  },
  { status: "OPEN", key: "assistantOrderOpen", jsonKey: "assistant_order_open", commerce: false },
  {
    status: "PARTIALLY_FULFILLED",
    key: "assistantOrderPartiallyFulfilled",
    jsonKey: "assistant_order_partially_fulfilled",
    commerce: false
  },
  {
    status: "PENDING_FULFILLMENT",
    key: "assistantOrderPendingFulfillment",
    jsonKey: "assistant_order_pending_fulfillment",
    commerce: false
  },
  {
    status: "RESTOCKED",
    key: "assistantOrderRestocked",
    jsonKey: "assistant_order_restocked",
    commerce: false
  },
  {
    status: "SCHEDULED",
    key: "assistantOrderScheduled",
    jsonKey: "assistant_order_scheduled",
    commerce: false
  },
  {
    status: "UNFULFILLED",
    key: "assistantOrderUnfulfilled",
    jsonKey: "assistant_order_unfulfilled",
    commerce: false
  },
  {
    status: "REQUEST_DECLINED",
    key: "assistantOrderRequestDeclined",
    jsonKey: "assistant_order_request_declined",
    commerce: false
  },
  {
    status: "CANCELLED",
    key: "assistantOrderCancelled",
    jsonKey: "assistant_order_cancelled",
    commerce: false
  },
  {
    status: "ERROR",
    key: "assistantOrderError",
    jsonKey: "assistant_order_error",
    commerce: false
  },
  {
    status: "FAILURE",
    key: "assistantOrderFailure",
    jsonKey: "assistant_order_failure",
    commerce: false
  },
  {
    status: "SUCCESS",
    key: "assistantOrderSuccess",
    jsonKey: "assistant_order_success",
    commerce: false
  },
  {
    status: "SHIPPED",
    key: "assistantOrderShipped",
    jsonKey: "assistant_order_shipped",
    commerce: false
  }
];
const HTML_QUIZ_RUNTIME_MESSAGE_KEYS = [
  { key: "and", jsonKey: "and", commerce: false },
  { key: "loadingErrorRetry", jsonKey: "loading_error_retry", commerce: false },
  { key: "phoneLoading", jsonKey: "phone_loading", commerce: false },
  { key: "tryAgain", jsonKey: "try_again", commerce: false },
  {
    key: "assistantInputLabel",
    jsonKey: "assistant_input_label",
    commerce: false,
    category: "accessibility"
  },
  { key: "assistantInputPlaceholder", jsonKey: "assistant_input_placeholder", commerce: false },
  { key: "assistantLauncher", jsonKey: "assistant_launcher", commerce: false, category: "button" },
  { key: "assistantSend", jsonKey: "assistant_send", commerce: false, category: "button" },
  { key: "assistantVoiceDictate", jsonKey: "assistant_voice_dictate", commerce: false },
  { key: "assistantVoiceStartCall", jsonKey: "assistant_voice_start_call", commerce: false },
  { key: "assistantVoiceCancel", jsonKey: "assistant_voice_cancel", commerce: false },
  { key: "assistantVoiceDone", jsonKey: "assistant_voice_done", commerce: false },
  { key: "assistantVoiceCall", jsonKey: "assistant_voice_call", commerce: false },
  { key: "assistantVoiceOnCall", jsonKey: "assistant_voice_on_call", commerce: false },
  { key: "assistantVoiceListening", jsonKey: "assistant_voice_listening", commerce: false },
  { key: "assistantVoiceWorking", jsonKey: "assistant_voice_working", commerce: false },
  { key: "assistantVoiceSpeaking", jsonKey: "assistant_voice_speaking", commerce: false },
  { key: "assistantVoiceMuted", jsonKey: "assistant_voice_muted", commerce: false },
  { key: "assistantVoiceMute", jsonKey: "assistant_voice_mute", commerce: false },
  { key: "assistantVoiceUnmute", jsonKey: "assistant_voice_unmute", commerce: false },
  { key: "assistantVoiceHangUp", jsonKey: "assistant_voice_hang_up", commerce: false },
  { key: "assistantVoiceDenied", jsonKey: "assistant_voice_denied", commerce: false },
  { key: "assistantVoiceFailed", jsonKey: "assistant_voice_failed", commerce: false },
  { key: "assistantTyping", jsonKey: "assistant_typing", commerce: false },
  { key: "assistantNotSent", jsonKey: "assistant_not_sent", commerce: false },
  { key: "assistantSendFailed", jsonKey: "assistant_send_failed", commerce: false },
  {
    key: "assistantFeedbackGood",
    jsonKey: "assistant_feedback_good",
    commerce: false,
    category: "accessibility"
  },
  {
    key: "assistantFeedbackBad",
    jsonKey: "assistant_feedback_bad",
    commerce: false,
    category: "accessibility"
  },
  { key: "assistantFeedbackPrompt", jsonKey: "assistant_feedback_prompt", commerce: false },
  {
    key: "assistantFeedbackSkip",
    jsonKey: "assistant_feedback_skip",
    commerce: false,
    category: "button"
  },
  { key: "assistantFeedbackThanks", jsonKey: "assistant_feedback_thanks", commerce: false },
  { key: "assistantClose", jsonKey: "assistant_close", commerce: false, category: "accessibility" },
  { key: "assistantAnswersDropped", jsonKey: "assistant_answers_dropped", commerce: false },
  { key: "assistantPicksChanged", jsonKey: "assistant_picks_changed", commerce: false },
  { key: "assistantOrderNotFound", jsonKey: "assistant_order_not_found", commerce: false },
  { key: "assistantOrderRateLimited", jsonKey: "assistant_order_rate_limited", commerce: false },
  { key: "assistantOrderUnavailable", jsonKey: "assistant_order_unavailable", commerce: false },
  { key: "assistantNoSelection", jsonKey: "assistant_no_selection", commerce: false },
  {
    key: "assistantTrackShipment",
    jsonKey: "assistant_track_shipment",
    commerce: false,
    category: "button"
  },
  ...HTML_QUIZ_ORDER_STATUS_MESSAGES,
  { key: "quizComplete", jsonKey: "ada_quiz_complete", commerce: false },
  { key: "addToCart", jsonKey: "add_to_cart", commerce: true },
  { key: "soldOut", jsonKey: "sold_out", commerce: true },
  { key: "increaseQuantity", jsonKey: "increase_quantity", commerce: true },
  { key: "decreaseQuantity", jsonKey: "decrease_quantity", commerce: true },
  { key: "countInCart", jsonKey: "count_in_cart", commerce: true },
  { key: "selectVariant", jsonKey: "select_variant", commerce: true },
  { key: "selectNoVariants", jsonKey: "select_no_variants", commerce: true },
  { key: "viewProduct", jsonKey: "view_product", commerce: true },
  { key: "viewCollection", jsonKey: "view_collection", commerce: true },
  { key: "reviewSingular", jsonKey: "review_singular", commerce: true },
  { key: "reviewPlural", jsonKey: "review_plural", commerce: true },
  { key: "unpublishedProduct", jsonKey: "unpublished_product", commerce: true },
  { key: "oneTimePurchase", jsonKey: "subscription_one_time_purchase", commerce: true },
  { key: "subscribeAndSave", jsonKey: "subscription_subscribe_and_save", commerce: true }
];
function isHtmlQuizRuntimeMessageKey(key) {
  return HTML_QUIZ_RUNTIME_MESSAGE_KEYS.some((entry) => entry.key === key);
}
const domQuizNodeReader = {
  children: (node) => Array.from(node.children),
  text: (node) => node.textContent ?? "",
  attributes: (node) => Object.fromEntries(Array.from(node.attributes, ({ name, value }) => [name, value])),
  labels: (node) => Array.from(node.labels ?? []),
  tag: (node) => node.localName,
  attr: (node, name) => node.getAttribute(name),
  parent: (node) => node.parentElement,
  firstOption: (select) => select.querySelector("option")
};
function resolveHtmlQuizLayers(layers, requestedLocale, requestedMarket, base) {
  const locale = requestedLocale && htmlQuizTranslationLocale(requestedLocale);
  const market = htmlQuizMarketId(requestedMarket);
  const structure = market && layers[`market:${market}`];
  const text = [
    base,
    locale && layers[locale.split("-")[0]],
    locale && layers[locale],
    market && locale && layers[`market:${market}/${locale.split("-")[0]}`],
    market && locale && layers[`market:${market}/${locale}`]
  ].filter(isRecord);
  return {
    structure: isRecord(structure) ? structure : {},
    text: text.length ? Object.assign({}, ...text) : void 0
  };
}
function applyHtmlQuizTranslations(document2, requestedLocale, requestedMarket) {
  const locale = requestedLocale && htmlQuizTranslationLocale(requestedLocale);
  const script = document2.getElementById(HTML_QUIZ_TRANSLATIONS_ID);
  if (!script) return;
  let all;
  try {
    all = JSON.parse(script.textContent ?? "");
  } catch {
    return;
  }
  if (!isRecord(all)) return;
  const { structure, text: values } = resolveHtmlQuizLayers(all, requestedLocale, requestedMarket);
  if (isRecord(structure)) {
    const fields = htmlQuizTranslationTargets(
      Array.from(document2.querySelectorAll("*")),
      domQuizNodeReader,
      true
    );
    for (const [key, value] of Object.entries(structure)) {
      const field = fields.get(key);
      if (!field || typeof value !== "string") continue;
      if (key.endsWith("@src")) {
        field.target.setAttribute("src", value);
        field.target.removeAttribute("srcset");
      } else if (value === "hidden") {
        if (field.owner.hasAttribute("data-step")) {
          field.owner.setAttribute("data-show-if", '{"not":{"all":[]}}');
          field.owner.setAttribute("hidden", "");
        } else {
          const label = field.owner.closest("label");
          if (label) label.remove();
          else {
            if ("labels" in field.owner)
              for (const label2 of Array.from(field.owner.labels ?? []))
                label2.remove();
            field.owner.remove();
          }
        }
      }
    }
  }
  if (!locale) return;
  if (!values) return;
  const elements = Array.from(document2.querySelectorAll("*")).filter(
    (node) => node.namespaceURI === "http://www.w3.org/1999/xhtml" && !node.closest("[inert]")
  );
  const targets = htmlQuizTranslationTargets(elements, domQuizNodeReader);
  const runtimeScript = document2.getElementById(HTML_QUIZ_RUNTIME_SCRIPT_ID);
  const runtime = JSON.parse((runtimeScript == null ? void 0 : runtimeScript.textContent) ?? "{}");
  for (const [key, text] of Object.entries(values)) {
    if (typeof text !== "string") continue;
    if (key.startsWith("message:") && isHtmlQuizRuntimeMessageKey(key.slice(8))) {
      runtime.messages ?? (runtime.messages = {});
      runtime.messages[key.slice(8)] = text;
      continue;
    }
    if (key.startsWith("stepLabel:")) {
      runtime.stepLabels ?? (runtime.stepLabels = {});
      runtime.stepLabels[key.slice(10)] = text;
      continue;
    }
    const field = targets.get(key);
    if (!field) continue;
    if (field.attribute) field.target.setAttribute(field.attribute, text);
    else if (field.rich) field.target.innerHTML = text;
    else {
      for (const node of Array.from(field.target.childNodes))
        if (node.nodeType === 3) node.remove();
      field.target.append(document2.createTextNode(text));
    }
  }
  if (runtimeScript) runtimeScript.textContent = JSON.stringify(runtime);
  document2.documentElement.lang = locale;
  document2.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";
}
function setQuizParts(element, ...parts) {
  element.setAttribute("part", parts.join(" "));
}
function setQuizState(element, state) {
  element.setAttribute("data-state", state);
}
function htmlQuizActionTarget(action) {
  if (action.link) return "url";
  if (action.goTo === void 0) return "next";
  return HTML_QUIZ_GO_TO_KEYWORDS.includes(action.goTo) ? action.goTo : "unknown";
}
function isHtmlQuizActionRule(rule, actionRef) {
  if (!isRecord(rule) || !isRecord(rule.if) || typeof rule.then !== "string") return false;
  const keys = Object.keys(rule.if);
  return keys.length === 1 && typeof rule.if.action === "string" && (actionRef === void 0 || rule.if.action === actionRef);
}
function parseJsonObject(raw) {
  try {
    const logic = raw ? JSON.parse(raw) : null;
    return isRecord(logic) ? logic : null;
  } catch {
    return null;
  }
}
function actionRules(logic) {
  const next = parseJsonObject(logic);
  const rules = Array.isArray(next == null ? void 0 : next.rules) ? next.rules : [];
  return rules.filter((rule) => isHtmlQuizActionRule(rule));
}
function htmlQuizRuledActions(logic) {
  return new Set(actionRules(logic).map((rule) => rule.if.action));
}
function htmlQuizStepAction(action) {
  return htmlQuizStepActionFrom(
    action.localName,
    Object.fromEntries(Array.from(action.attributes, ({ name, value }) => [name, value]))
  );
}
function htmlQuizStepActionFrom(tag, attrs) {
  return { goTo: attrs["data-go-to"], action: attrs["data-action"], link: tag === "a" };
}
const HTML_QUIZ_CONTINUE_ACTION = "[data-action]:not(a, [data-go-to])";
function resolveHtmlQuizStepLogic(input) {
  const { logic, following, steps, matches } = input;
  const resolve = (target) => target === "next" ? following : typeof target === "string" && steps.includes(target) ? target : void 0;
  const routes = [];
  for (const rule of Array.isArray(logic == null ? void 0 : logic.rules) ? logic.rules : []) {
    if (!isRecord(rule) || !isRecord(rule.if)) continue;
    const match = matches(rule.if);
    if (!match) continue;
    const target = resolve(rule.then);
    if (target !== void 0) routes.push(target);
    if (match === true) return routes;
  }
  const fallback = resolve((logic == null ? void 0 : logic.default) ?? "next");
  if (fallback !== void 0) routes.push(fallback);
  return routes;
}
function htmlQuizStepRoutes(input) {
  const { steps, following, logic, actions } = input;
  const next = typeof logic === "string" ? parseJsonObject(logic) : logic ?? null;
  return actions.flatMap(
    (action) => htmlQuizActionTarget(action) !== "next" ? [] : resolveHtmlQuizStepLogic({
      logic: next,
      following,
      steps,
      matches: (predicate) => "action" in predicate ? predicate.action === (action.action ?? "") : "possible"
    })
  );
}
function semanticOwner(element) {
  return htmlQuizSemanticOwner(element, domQuizNodeReader) ?? null;
}
function ownedElements(owner, attribute) {
  return Array.from(owner.querySelectorAll(`[${attribute}]`)).filter(
    (element) => semanticOwner(element) === owner
  );
}
function hiddenBefore(element, boundary) {
  let current = element;
  while (current && current !== boundary) {
    if (current.hasAttribute("hidden")) return true;
    current = current.parentElement;
  }
  return false;
}
function shownSectionRefs(step) {
  return ownedElements(step, "data-section").filter((section) => !hiddenBefore(section, step)).map((section) => section.dataset.section);
}
function shownHtmlQuizSlots(step) {
  return ownedElements(step, "data-section").flatMap(
    (section) => ownedElements(section, "data-block").filter((block) => block.getAttribute("data-block-type") === "recommendations").flatMap((block) => ownedElements(block, "data-slot"))
  ).filter((slot) => !hiddenBefore(slot, step));
}
const SUBJECT_KEYS = ["answer", "score", "highestScore", "step", "end", "action"];
const SCORE_OPERAND_KEYS = /* @__PURE__ */ new Set(["equals", "gt", "gte", "lt", "lte"]);
function evaluateHtmlQuizPredicate(predicate, context = {}) {
  if (!isRecord(predicate)) return false;
  if (Array.isArray(predicate.all)) {
    return predicate.all.every((item) => evaluateHtmlQuizPredicate(item, context));
  }
  if (Array.isArray(predicate.any)) {
    return predicate.any.some((item) => evaluateHtmlQuizPredicate(item, context));
  }
  if (predicate.not) return !evaluateHtmlQuizPredicate(predicate.not, context);
  const subject = SUBJECT_KEYS.find((key) => predicate[key] !== void 0);
  return subject ? SUBJECT_EVALUATORS[subject](predicate, context) : false;
}
const SUBJECT_EVALUATORS = {
  answer: (p, c) => {
    var _a, _b;
    return evaluateComparable((_b = (_a = c.answers) == null ? void 0 : _a.values) == null ? void 0 : _b[String(p.answer)], p);
  },
  score: (p, c) => evaluateComparable(scoreValue(c.scores, String(p.score)), withScoreOperands(p, c.scores)),
  highestScore: (p, c) => {
    var _a;
    return ((_a = c.scores) == null ? void 0 : _a.highest) === p.highestScore;
  },
  step: (p, c) => c.step === p.step,
  end: (p, c) => p.end === true && c.end === true,
  action: (p, c) => c.action === p.action
};
function scoreValue(scores, key) {
  return (scores == null ? void 0 : scores.totals) && Object.hasOwn(scores.totals, key) ? scores.totals[key] : 0;
}
function withScoreOperands(predicate, scores) {
  const resolved = { ...predicate };
  for (const key of SCORE_OPERAND_KEYS) {
    const operand = resolved[key];
    if (isRecord(operand)) resolved[key] = scoreValue(scores, String(operand.score));
  }
  return resolved;
}
function evaluateComparable(value, predicate) {
  if (predicate.exists === true) {
    return value !== void 0 && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0);
  }
  if (predicate.includes !== void 0) return includesValue(value, predicate.includes);
  if (predicate.equals !== void 0) return equalsValue(value, predicate.equals);
  if (predicate.gt !== void 0) return compare(value, predicate.gt) > 0;
  if (predicate.gte !== void 0) return compare(value, predicate.gte) >= 0;
  if (predicate.lt !== void 0) return compare(value, predicate.lt) < 0;
  if (predicate.lte !== void 0) return compare(value, predicate.lte) <= 0;
  return false;
}
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
function compare(value, bound) {
  const [a, b] = [String(value), String(bound)];
  if (ISO_DATE.test(a) && ISO_DATE.test(b)) return a === b ? 0 : a > b ? 1 : -1;
  return Number(value) - Number(bound);
}
function includesValue(value, expected) {
  return Array.isArray(value) && value.map(String).includes(String(expected));
}
function equalsValue(value, expected) {
  return !Array.isArray(value) && String(value) === String(expected);
}
function quizQuestionHeading(block, reader) {
  const section = blockSection(block, reader);
  let preceding;
  if (section) {
    for (const node of htmlQuizDescendants(section, reader)) {
      if (node === block) break;
      if (quizBlockType(node, reader) === "heading" && htmlQuizSemanticOwner(node, reader) === section)
        preceding = node;
    }
  }
  if (preceding) return preceding;
  const step = closestHtmlQuizNode(block, reader, (node) => reader.attr(node, "data-step") != null);
  return step && htmlQuizDescendants(step, reader).find((node) => quizBlockType(node, reader) === "heading");
}
const isHtmlQuizChoicePlaceholder = (element) => htmlQuizChoicePlaceholder(element, domQuizNodeReader);
const isHtmlQuizBusinessChoice = (element) => htmlQuizBusinessChoice(element, domQuizNodeReader);
function nameHtmlQuizBlankLegendChoices(root) {
  var _a, _b, _c;
  let index = 0;
  for (const block of root.querySelectorAll(htmlQuizBlockSelector("choice"))) {
    if (block.hasAttribute("aria-label") || block.hasAttribute("aria-labelledby")) continue;
    if ((_b = (_a = block.querySelector(":scope > legend")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) continue;
    const heading = quizQuestionHeading(block, domQuizNodeReader);
    if (!((_c = heading == null ? void 0 : heading.textContent) == null ? void 0 : _c.trim())) continue;
    if (!heading.id) {
      do
        heading.id = `html-quiz-heading-${++index}`;
      while (root.getElementById(heading.id) !== heading);
    }
    block.setAttribute("aria-labelledby", heading.id);
  }
}
function dispatchHtmlQuizEvent(root, type, detail) {
  var _a;
  const EventConstructor = ((_a = quizDocument(root).defaultView) == null ? void 0 : _a.CustomEvent) ?? CustomEvent;
  root.dispatchEvent(new EventConstructor(type, { detail, bubbles: true, composed: true }));
}
function installHtmlQuizProductEvents(kernel) {
  kernel.on(
    "productAdded",
    ({ variant, quantity }) => dispatchHtmlQuizEvent(kernel.doc, "quiz:add-to-cart", {
      variantId: String(variant.id).split("/").at(-1) ?? "",
      quantity: quantity ?? 1
    })
  );
}
const runtimeAnswerValues = /* @__PURE__ */ new WeakMap();
function readHtmlQuizRuntimeAnswer(control) {
  return runtimeAnswerValues.get(control);
}
function setHtmlQuizRuntimeAnswer(control, value) {
  runtimeAnswerValues.set(control, value);
}
function clearHtmlQuizRuntimeAnswer(control) {
  runtimeAnswerValues.delete(control);
}
function answerControls(root) {
  return Array.from(root.querySelectorAll("input, select, textarea")).filter(
    (control) => !control.closest(htmlQuizBlockSelector("cards")) && !control.matches(
      'input[type="button"], input[type="submit"], input[type="reset"], input[type="file"]'
    )
  );
}
function isEnabledAnswer(element) {
  return !element.matches(":disabled");
}
function decodeHtmlQuizAnswer(answer2) {
  if (!isHtmlQuizMultiAnswerType(answer2.type)) return answer2.value;
  try {
    const parsed = JSON.parse(answer2.value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
  }
  return answer2.value;
}
const labelText = (node) => {
  if (node.nodeType === 3) return node.textContent ?? "";
  if (node.nodeType === 1) {
    const element = node;
    if (["script", "style", "template"].includes(element.localName)) return "";
    if (element.localName === "img") return ` ${element.getAttribute("alt") ?? ""} `;
  }
  return Array.from(node.childNodes, labelText).join("");
};
const collapse = (value) => value.replace(/\s+/g, " ").trim();
function answerText(control, choice) {
  const named = (choice == null ? void 0 : choice.localName) === "option" ? choice : control;
  if (named === control && !control.matches('input[type="radio"], input[type="checkbox"]'))
    return control.value;
  return htmlQuizControlLabel(named);
}
function htmlQuizControlLabel(named) {
  const root = named.getRootNode();
  const referenced = (named.getAttribute("aria-labelledby") ?? "").split(/\s+/).map((id) => id ? root.getElementById(id) : null).map((element) => element ? labelText(element) : "");
  return collapse(referenced.join(" ")) || collapse(named.getAttribute("aria-label") ?? "") || collapse(
    named.localName === "option" ? named.getAttribute("label") || labelText(named) : Array.from(named.labels ?? [], labelText).join(" ")
  );
}
function collectHtmlQuizAnswers(document2, controls = answerControls(document2), presentation = "value") {
  const groups = /* @__PURE__ */ new Map();
  const add = (control, choice, value, selected) => {
    const name = control.name;
    if (!name || !isEnabledAnswer(control)) return;
    const multiple = isHtmlQuizMultiAnswerType(control.type);
    let group = groups.get(name);
    if (!group) {
      group = {
        type: htmlQuizAnswerType(control, domQuizNodeReader),
        multiple,
        values: [],
        refs: /* @__PURE__ */ new Set()
      };
      groups.set(name, group);
    }
    group.multiple || (group.multiple = multiple);
    if (!selected) return;
    const ref = choice && isHtmlQuizBusinessChoice(choice) ? choice.getAttribute("value") ?? "" : "";
    group.values.push(
      presentation === "text" && value !== "" ? answerText(control, choice) : value
    );
    if (ref) group.refs.add(ref);
  };
  for (const control of controls) {
    if (control.tagName === "SELECT") {
      for (const option of control.options) {
        const selected = option.selected && isEnabledAnswer(option);
        add(control, option, option.value, selected && option.value !== "");
      }
    } else {
      const selected = !control.matches('input[type="radio"], input[type="checkbox"]') || control.checked;
      add(control, control, readHtmlQuizRuntimeAnswer(control) ?? control.value, selected);
    }
  }
  return Array.from(groups, ([name, group]) => ({
    name,
    type: group.type,
    choicesRefs: [...group.refs],
    value: group.multiple ? JSON.stringify(group.values) : group.values[0] ?? ""
  }));
}
const authoredDisabled = /* @__PURE__ */ new WeakMap();
function originallyDisabled(control) {
  if (!authoredDisabled.has(control)) authoredDisabled.set(control, control.disabled);
  return authoredDisabled.get(control) ?? false;
}
const skippedSteps = /* @__PURE__ */ new WeakSet();
const showIfConditions = /* @__PURE__ */ new WeakMap();
function shows(element, context) {
  if (!showIfConditions.has(element)) {
    const source = element.dataset.showIf;
    let predicate2;
    try {
      predicate2 = source === void 0 ? void 0 : JSON.parse(source);
    } catch {
    }
    showIfConditions.set(element, predicate2);
  }
  const predicate = showIfConditions.get(element);
  return !isRecord(predicate) || evaluateHtmlQuizPredicate(predicate, context);
}
function unpick(choice) {
  if (choice.localName !== "option") {
    const input = choice;
    if (!input.checked) return false;
    input.checked = false;
    return true;
  }
  const option = choice;
  if (!option.selected) return false;
  option.selected = false;
  const select = option.closest("select");
  if (select && !select.multiple)
    select.selectedIndex = select.options[0] && isHtmlQuizChoicePlaceholder(select.options[0]) ? 0 : -1;
  return true;
}
function clear(element) {
  let cleared = false;
  for (const control of answerControls(element)) {
    if (!control.name) continue;
    if (control.localName === "select") {
      for (const option of control.options)
        if (!isHtmlQuizChoicePlaceholder(option) && unpick(option)) cleared = true;
    } else if (control.matches('input[type="radio"], input[type="checkbox"]')) {
      if (unpick(control)) cleared = true;
    } else {
      const before = readHtmlQuizRuntimeAnswer(control) ?? control.value;
      control.value = "";
      clearHtmlQuizRuntimeAnswer(control);
      if (control.value !== before) cleared = true;
    }
  }
  return cleared;
}
function isEnd(document2) {
  const active = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
  return Boolean(active && isHtmlQuizTerminalStep(document2, active));
}
function applyVisibility(document2, run) {
  const evaluation = readQuizEvaluation(document2, run, false);
  const { context, path } = evaluation;
  const onPath = (element) => {
    var _a;
    const step = (_a = element.closest("[data-step]")) == null ? void 0 : _a.dataset.step;
    return !path || step !== void 0 && path.has(step);
  };
  for (const step of document2.querySelectorAll("[data-step]"))
    if (shows(step, context)) skippedSteps.delete(step);
    else skippedSteps.add(step);
  context.end = isEnd(document2);
  let changed = false;
  let cleared = false;
  for (const section of document2.querySelectorAll("[data-section]")) {
    const shown = shows(section, context);
    changed || (changed = section.hidden !== !shown);
    section.hidden = !shown;
    if (!shown && onPath(section) && clear(section)) cleared = true;
  }
  for (const block of document2.querySelectorAll("[data-block][data-show-if]")) {
    const shown = shows(block, context);
    changed || (changed = block.hidden !== !shown);
    block.hidden = !shown;
    if (!shown && onPath(block) && clear(block)) cleared = true;
  }
  for (const choice of document2.querySelectorAll(
    "input[data-show-if], option[data-show-if]"
  )) {
    if (!isHtmlQuizBusinessChoice(choice)) continue;
    const hidden = !shows(choice, context);
    changed || (changed = choice.disabled !== (originallyDisabled(choice) || hidden));
    choice.disabled = originallyDisabled(choice) || hidden;
    const labels = "labels" in choice && choice.labels ? Array.from(choice.labels) : [];
    for (const element of [choice, ...labels]) element.hidden = hidden;
    if (hidden && onPath(choice) && unpick(choice)) cleared = true;
  }
  const end = isEnd(document2);
  evaluation.end = end;
  return {
    settled: !cleared && end === context.end,
    end,
    evaluation: changed ? void 0 : evaluation
  };
}
function updateHtmlQuizVisibility(document2, run) {
  let result;
  for (let pass = 0; pass < 10; pass++) {
    result = applyVisibility(document2, run);
    if (result.settled) break;
    if (pass === 9) console.warn("HTML QUIZ: Visibility did not settle after 10 passes");
  }
  const state = readQuizState(
    document2,
    run,
    result == null ? void 0 : result.end,
    (result == null ? void 0 : result.settled) ? result.evaluation : void 0
  );
  updateDisplays(document2, state);
  return state;
}
const answerFallbacks = /* @__PURE__ */ new WeakMap();
function updateAnswers(document2, state, outputs) {
  if (!outputs.length) return;
  const onPath = new Set(state.pathAnswers.map(({ name }) => name));
  const answers = new Map(
    collectHtmlQuizAnswers(document2, void 0, "text").filter(({ name }) => onPath.has(name)).map((answer2) => [answer2.name, decodeHtmlQuizAnswer(answer2)])
  );
  const and = readHtmlQuizRuntime(document2).messages.and ?? "and";
  for (const output of outputs) {
    const answer2 = answers.get(output.dataset.showAnswer ?? "");
    const text = Array.isArray(answer2) ? answer2.length < 2 ? answer2[0] ?? "" : `${answer2.slice(0, -1).join(", ")} ${and} ${answer2.at(-1)}` : answer2 ?? "";
    if (text) {
      if (!answerFallbacks.has(output)) answerFallbacks.set(output, Array.from(output.childNodes));
      output.textContent = text;
    } else {
      const fallback = answerFallbacks.get(output);
      if (fallback) output.replaceChildren(...fallback);
    }
  }
}
const formatScore = (score) => String(Math.round(score * 10) / 10 || 0);
function updateDisplays(document2, state) {
  const totals = state.scores;
  const total = (name) => Object.hasOwn(totals, name) ? totals[name] : 0;
  for (const meter of document2.querySelectorAll("meter")) {
    if (meter.dataset.showScore !== void 0) meter.value = total(meter.dataset.showScore);
    meter.style.setProperty("--percent", String(Math.round(meterShare(meter) * 100)));
  }
  const outputs = Array.from(
    document2.querySelectorAll(
      "output[data-show-score], output[data-show-answer]"
    )
  );
  for (const output of outputs)
    if (output.dataset.showScore !== void 0)
      output.value = formatScore(total(output.dataset.showScore));
  updateAnswers(
    document2,
    state,
    outputs.filter((output) => output.dataset.showAnswer !== void 0)
  );
  for (const block of document2.querySelectorAll(
    `${htmlQuizBlockSelector("score", false)}[data-variant="radar"]`
  ))
    drawRadar(block);
}
const meterShare = (meter) => meter.max > meter.min ? (meter.value - meter.min) / (meter.max - meter.min) : 0;
const SVG = "http://www.w3.org/2000/svg";
const RADAR_RADIUS = 90;
function drawRadar(block) {
  const meters = Array.from(block.querySelectorAll("meter"));
  const create = (name, attributes) => {
    const element = block.ownerDocument.createElementNS(SVG, name);
    for (const [attribute, value] of Object.entries(attributes))
      element.setAttribute(attribute, value);
    return element;
  };
  let svg = block.querySelector(':scope > svg[part~="radar"]');
  if (!svg) {
    svg = create("svg", { part: "radar", "aria-hidden": "true", viewBox: "-130 -120 260 240" });
    block.append(svg);
  }
  const point = (index, radius) => {
    const angle = -Math.PI / 2 + index * 2 * Math.PI / meters.length;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius].map(
      (value) => Math.round(value * 10) / 10
    );
  };
  const polygon = (part, radius) => create("polygon", {
    part,
    points: meters.map((_meter, index) => point(index, radius(index)).join(",")).join(" ")
  });
  const children = [0.25, 0.5, 0.75, 1].map(
    (ring) => polygon("radar-grid", () => RADAR_RADIUS * ring)
  );
  meters.forEach((meter, index) => {
    const [x, y] = point(index, RADAR_RADIUS);
    const [labelX, labelY] = point(index, RADAR_RADIUS + 18);
    children.push(
      create("line", { part: "radar-grid", x1: "0", y1: "0", x2: String(x), y2: String(y) })
    );
    const label = create("text", {
      part: "radar-label",
      x: String(labelX),
      y: String(labelY + 4),
      "text-anchor": Math.abs(labelX) < 4 ? "middle" : labelX > 0 ? "start" : "end"
    });
    label.textContent = htmlQuizMeterLabel(meter);
    children.push(label);
  });
  children.push(polygon("radar-shape", (index) => RADAR_RADIUS * meterShare(meters[index])));
  svg.replaceChildren(...children);
}
function htmlQuizMeterLabel(meter) {
  var _a;
  const nodes = Array.from(((_a = meter.labels[0]) == null ? void 0 : _a.childNodes) ?? []);
  return meter.getAttribute("aria-label") || nodes.filter((node) => !(isElement(node) && node.matches("meter, output"))).map((node) => node.textContent).join("").trim();
}
function updateProgress(document2, stepLabels) {
  const steps = Array.from(document2.querySelectorAll("[data-step]"));
  const active = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
  for (const block of document2.querySelectorAll(
    `${htmlQuizBlockSelector("milestones", false)}, ${htmlQuizBlockSelector("progress", false)}`
  )) {
    if (block.dataset.blockType === "milestones") {
      for (const item of block.querySelectorAll(":scope > li[data-milestone]")) {
        if (item.dataset.milestone === (active == null ? void 0 : active.dataset.milestone))
          item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      }
      continue;
    }
    const index = active ? steps.indexOf(active) : -1;
    const total = steps.length;
    const label = active ? htmlQuizStepLabel(active, stepLabels) : "";
    const bars = block.matches("progress") ? [block] : block.querySelectorAll("progress");
    for (const bar of bars) {
      bar.max = Math.max(1, total);
      bar.value = index + 1;
    }
    const counters = block.matches("output") ? [block] : block.querySelectorAll("output");
    for (const counter of counters) {
      counter.textContent = ((active == null ? void 0 : active.dataset.progressText) ?? block.dataset.progressText ?? HTML_QUIZ_ATTRIBUTE_DEFAULTS["data-progress-text"]).replace(
        /\{\{(current|total|label|percent)\}\}/g,
        (_match, key) => ({
          current: String(index + 1),
          total: String(total),
          label,
          percent: String(Math.round((index + 1) / Math.max(1, total) * 100))
        })[key] ?? ""
      );
    }
  }
}
function htmlQuizStepLabel(step, stepLabels) {
  const ref = step.dataset.step ?? "invalid-step";
  return stepLabels && Object.hasOwn(stepLabels, ref) ? stepLabels[ref] : ref;
}
function isStepVisible(step) {
  if (skippedSteps.has(step)) return false;
  const sections = ownedElements(step, "data-section");
  if (sections.length === 0) return true;
  return sections.some((section) => !hiddenBefore(section, step));
}
function htmlQuizDestination(doc, activeStep, action, predicateContext) {
  var _a;
  if (!activeStep || htmlQuizActionTarget(htmlQuizStepAction(action)) !== "next") return null;
  const steps = Array.from(doc.querySelectorAll("[data-step]"));
  const index = steps.findIndex((step) => step === activeStep);
  const next = parseJsonObject(activeStep.dataset.next);
  const context = { ...predicateContext, action: action.dataset.action };
  return resolveHtmlQuizStepLogic({
    logic: next,
    following: (_a = steps[index + 1]) == null ? void 0 : _a.dataset.step,
    steps: steps.map((step) => step.dataset.step),
    matches: (predicate) => evaluateHtmlQuizPredicate(predicate, context)
  })[0] ?? null;
}
function resolveVisibleStep(doc, targetRef, currentRef, run) {
  if (!targetRef) return null;
  updateHtmlQuizVisibility(doc, run);
  return visibleStep(doc, targetRef, currentRef);
}
function visibleStep(doc, targetRef, currentRef) {
  if (!targetRef) return null;
  const steps = Array.from(doc.querySelectorAll("[data-step]"));
  const targetIndex = steps.findIndex((step) => step.dataset.step === targetRef);
  if (targetIndex === -1) return null;
  const currentIndex = steps.findIndex((step) => step.dataset.step === currentRef);
  const direction = currentIndex >= 0 && targetIndex < currentIndex ? -1 : 1;
  for (let index = targetIndex; index >= 0 && index < steps.length; index += direction) {
    const candidate = steps[index];
    if (candidate && isStepVisible(candidate)) return candidate.dataset.step ?? null;
  }
  return null;
}
function htmlQuizInitialStep(doc, initialStep) {
  var _a;
  if (initialStep !== void 0) return initialStep;
  return ((_a = doc.querySelector("[data-step]")) == null ? void 0 : _a.dataset.step) ?? null;
}
function htmlQuizForwardStep(doc, activeStep, action, history, run, settled = updateHtmlQuizVisibility(doc, run)) {
  const activeRef = (activeStep == null ? void 0 : activeStep.dataset.step) ?? null;
  const targetRef = htmlQuizDestination(doc, activeStep, action, settled.context);
  const stepRef = visibleStep(doc, targetRef, activeRef);
  if (stepRef && activeRef && activeRef !== stepRef) history.push(activeRef);
  return { targetRef, stepRef };
}
function showHtmlQuizStep(document2, stepRef, run, { settles = true } = {}) {
  if (!stepRef) return;
  for (const step of document2.querySelectorAll("[data-step]")) {
    const active = step.dataset.step === stepRef;
    if (step.hidden === active) {
      for (const video of step.querySelectorAll("video"))
        if (!active) video.pause();
        else if (video.autoplay) Promise.resolve(video.play()).catch(() => {
        });
    }
    step.hidden = !active;
    step.toggleAttribute("inert", !active);
    if (active) step.setAttribute("aria-current", "step");
    else step.removeAttribute("aria-current");
  }
  if (settles) updateHtmlQuizVisibility(document2, run);
  updateProgress(document2, run == null ? void 0 : run.stepLabels);
}
function htmlQuizContinueAction(root) {
  const step = root.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
  const ruled = htmlQuizRuledActions(step == null ? void 0 : step.dataset.next);
  const first = (scope) => {
    const actions = Array.from(
      scope.querySelectorAll(HTML_QUIZ_CONTINUE_ACTION)
    ).filter((action) => isRendered(action) && !action.matches(":disabled"));
    return actions.find((action) => !ruled.has(action.dataset.action ?? "")) ?? actions[0];
  };
  return step && first(step) || first(quizBody(root));
}
function goToHtmlQuizStep(root, stepRef, {
  direction,
  settle,
  run
} = {}) {
  var _a;
  const steps = Array.from(root.querySelectorAll("[data-step]"));
  const previous = ((_a = steps.find((step2) => !step2.hidden)) == null ? void 0 : _a.dataset.step) ?? null;
  const main = root.querySelector("main");
  if (direction && main) setQuizState(main, direction);
  else main == null ? void 0 : main.removeAttribute("data-state");
  const leaving = steps.find((element) => !element.hidden);
  const top = () => (main == null ? void 0 : main.getBoundingClientRect().top) ?? 0;
  const from = ((leaving == null ? void 0 : leaving.offsetTop) ?? 0) + top();
  showHtmlQuizStep(root, stepRef, run, { settles: !settle });
  const shown = steps.find((element) => !element.hidden);
  const step = (shown == null ? void 0 : shown.dataset.step) ?? null;
  if (!step || step === previous) return false;
  settle == null ? void 0 : settle();
  shown == null ? void 0 : shown.style.removeProperty("inset-block-start");
  if (leaving && direction) leaving.style.insetBlockStart = `${from - top()}px`;
  const index = (ref) => steps.findIndex((element) => element.dataset.step === ref);
  const backwards = previous !== null && index(step) < index(previous);
  dispatchHtmlQuizEvent(root, "quiz:step", {
    step,
    previous,
    direction: direction ?? (backwards ? "previous" : "next")
  });
  return true;
}
function focusHtmlQuizStep(root) {
  var _a, _b, _c;
  const step = root.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
  if (!step) return;
  const page = quizDocument(root);
  const pageFocus = page.activeElement;
  const focusInQuiz = root === page ? Boolean(pageFocus) : Boolean(root.activeElement);
  if (!focusInQuiz && pageFocus && pageFocus !== page.body) return;
  const target = Array.from(step.querySelectorAll("h1, h2, h3, h4, h5, h6")).find(isRendered) ?? step;
  if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  if (target.getBoundingClientRect().top < scrollViewportTop(target)) {
    const reduced = (_c = (_b = (_a = page.defaultView) == null ? void 0 : _a.matchMedia) == null ? void 0 : _b.call(_a, "(prefers-reduced-motion: reduce)")) == null ? void 0 : _c.matches;
    target.scrollIntoView({ block: "nearest", ...reduced ? { behavior: "instant" } : {} });
  }
}
function scrollViewportTop(element) {
  var _a;
  for (let node = element.parentElement; node; node = node.parentElement ?? ((_a = node.parentNode) == null ? void 0 : _a.host) ?? null) {
    const { overflowY } = getComputedStyle(node);
    if (/auto|scroll|overlay/.test(overflowY) && node.scrollHeight > node.clientHeight)
      return node.getBoundingClientRect().top;
  }
  return 0;
}
function isHtmlQuizTerminalStep(document2, step) {
  const steps = Array.from(document2.querySelectorAll("[data-step]"));
  const nextStep = steps[steps.indexOf(step) + 1];
  const actions = Array.from(step.querySelectorAll("[data-action]"));
  const routes = htmlQuizStepRoutes({
    steps: steps.map((item) => item.dataset.step ?? ""),
    following: nextStep == null ? void 0 : nextStep.dataset.step,
    logic: step.dataset.next,
    actions: actions.filter((action) => !htmlQuizRouteCanBeHidden(action, domQuizNodeReader, false)).map(htmlQuizStepAction)
  });
  return !routes.some((ref) => visibleStep(document2, ref, step.dataset.step ?? null));
}
function isHtmlQuizRecommendationsOrEndStep(document2, step) {
  return isHtmlQuizResult({ step, end: isHtmlQuizTerminalStep(document2, step) });
}
function htmlQuizBackStep(doc, activeStep, history) {
  const targetRef = history.at(-1) ?? null;
  const stepRef = visibleStep(doc, targetRef, (activeStep == null ? void 0 : activeStep.dataset.step) ?? null);
  if (stepRef) history.pop();
  return { targetRef, stepRef };
}
function htmlQuizCompletesOnAction(document2, step, action, destination) {
  return Boolean(
    !destination.stepRef && !destination.targetRef && htmlQuizActionTarget(htmlQuizStepAction(action)) === "next" && step && isHtmlQuizTerminalStep(document2, step)
  );
}
function htmlQuizAttributeFormatDescription(format) {
  if (format === "flag") return "presence flag (no value)";
  if (typeof format === "string") return format;
  if ("enum" in format) return format.enum.join(" | ");
  if ("int" in format) {
    const { min, max } = format.int;
    return `integer${min === void 0 ? "" : ` >= ${min}`}${max === void 0 ? "" : ` <= ${max}`}`;
  }
  return `JSON ${format.json}`;
}
function invalidHtmlQuizAttributeValue(format, value, json) {
  let valid;
  if (format === "text" || format === "ref") return void 0;
  if (format === "flag") valid = value === "";
  else if (format === "number") valid = value.trim() !== "" && Number.isFinite(Number(value));
  else if ("enum" in format) valid = format.enum.includes(value);
  else if ("int" in format) {
    const number = Number(value);
    valid = /^\d+$/.test(value) && Number.isSafeInteger(number) && (format.int.min === void 0 || number >= format.int.min) && (format.int.max === void 0 || number <= format.int.max);
  } else {
    try {
      const parsed = json ? json.value : JSON.parse(value);
      const array = Array.isArray(parsed);
      const object = isRecord(parsed);
      valid = format.json === "array" ? array : object;
    } catch {
      valid = false;
    }
  }
  return valid ? void 0 : htmlQuizAttributeFormatDescription(format);
}
function readHtmlQuizAttribute(source, name) {
  const entry = Object.entries(HTML_QUIZ_NUMERIC_ATTRIBUTES).find(
    ([pattern]) => pattern.endsWith("*") ? name.startsWith(pattern.slice(0, -1)) : name === pattern
  );
  if (!entry) return void 0;
  const rule = entry[1];
  const raw = rawAttribute(source, name);
  const value = raw == null || invalidHtmlQuizAttributeValue(rule.format, raw) ? "default" in rule ? rule.default : void 0 : raw;
  return value === void 0 ? void 0 : Number(value);
}
function rawAttribute(source, name) {
  return typeof source.getAttribute === "function" ? source.getAttribute(name) : source[name];
}
function htmlQuizChoiceBounds(source, choices = Infinity) {
  const min = readHtmlQuizAttribute(source, "data-min-selected");
  const max = readHtmlQuizAttribute(source, "data-max-selected") ?? Infinity;
  return {
    min,
    explicit: ["data-min-selected", "data-max-selected"].filter((name) => {
      const raw = rawAttribute(source, name);
      return raw != null && !invalidHtmlQuizAttributeValue(HTML_QUIZ_NUMERIC_ATTRIBUTES[name].format, raw);
    }),
    max,
    reversed: min > max,
    minExceedsChoices: min > choices,
    maxExceedsChoices: max !== Infinity && max > choices
  };
}
function htmlQuizChoiceSelectionValid(source, selected) {
  const { min, max } = htmlQuizChoiceBounds(source);
  return selected >= min && selected <= max;
}
const HTML_QUIZ_SCORE_PREFIX = "data-score-";
function htmlQuizScoreName(attribute) {
  if (!attribute.startsWith(HTML_QUIZ_SCORE_PREFIX)) return void 0;
  const name = attribute.slice(HTML_QUIZ_SCORE_PREFIX.length);
  return HTML_QUIZ_IDENTIFIER.test(name) ? name : void 0;
}
function htmlQuizScoreValue(raw) {
  const value = Number(raw);
  return raw.trim() && Number.isFinite(value) ? value : void 0;
}
const phoneValidity = /* @__PURE__ */ new WeakMap();
let phoneDependencies;
function isEnhancedHtmlQuizPhone(control) {
  var _a;
  return control.matches('input[type="tel" i]') && Boolean(
    (_a = control.closest("[data-block]")) == null ? void 0 : _a.matches(`${htmlQuizBlockSelector("input", false)}[data-country]`)
  );
}
function readHtmlQuizPhoneValidity(control) {
  return phoneValidity.get(control);
}
function dependencies() {
  phoneDependencies ?? (phoneDependencies = Promise.all([
    __vitePreload(() => import("./quiz-renderer-phone-lib-Dsktln2P.js").then((n) => n.phoneLib), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import("./quiz-renderer-country-data-CuDUzlny.js"), true ? [] : void 0, import.meta.url)
  ]).then(([lib, { countryData }]) => ({ lib, countries: countryData })).catch((error) => {
    phoneDependencies = void 0;
    throw error;
  }));
  return phoneDependencies;
}
function pendingElements(block, control, picker) {
  const row = control.parentElement;
  const elements = row && row !== block ? [row] : [control];
  if (picker && !elements[0].contains(picker)) elements.push(picker);
  return elements;
}
function installHtmlQuizPhoneRuntime(document2, {
  shopifyCountry,
  setErrorVisible,
  refresh,
  onAsyncStateChange
}) {
  const entries = Array.from(
    document2.querySelectorAll(`${htmlQuizBlockSelector("input")}[data-country]`)
  ).flatMap((block) => {
    const control = block.querySelector('input[type="tel" i]');
    if (!control || control.closest("[data-block]") !== block) return [];
    const picker = block.querySelector("select[data-country-picker]");
    if (picker && picker.closest("[data-block]") !== block) return [];
    const outputs = (picker == null ? void 0 : picker.id) ? Array.from(block.querySelectorAll("output[for]")).filter(
      (output) => output.htmlFor.length === 1 && output.htmlFor.contains(picker.id) && output.closest("[data-block]") === block && output.children.length === 0
    ) : [];
    return [{ block, control, picker, outputs }];
  });
  if (!entries.length) return () => {
  };
  const { messages } = readHtmlQuizRuntime(document2);
  let active = true;
  const authoredHidden = /* @__PURE__ */ new Map();
  const authoredBusy = /* @__PURE__ */ new Map();
  const loadingNodes = /* @__PURE__ */ new Map();
  const authoredOutputs = /* @__PURE__ */ new Map();
  const authoredPickerLabels = /* @__PURE__ */ new Map();
  const blurred = /* @__PURE__ */ new WeakSet();
  const selectedCountries = /* @__PURE__ */ new WeakMap();
  let loaded;
  for (const { block, control, picker, outputs } of entries) {
    for (const output of outputs) authoredOutputs.set(output, output.value);
    if (picker && outputs.length)
      authoredPickerLabels.set(picker, picker.getAttribute("aria-label"));
    phoneValidity.set(control, !control.hasAttribute("required") && control.value === "");
    setHtmlQuizRuntimeAnswer(control, "");
    authoredBusy.set(block, block.getAttribute("aria-busy"));
    block.setAttribute("aria-busy", "true");
    for (const element of pendingElements(block, control, picker)) {
      authoredHidden.set(element, element.hidden);
      element.hidden = true;
    }
    const loading = quizDocument(document2).createElement("span");
    setQuizParts(loading, "phone-loading");
    loading.setAttribute("role", "status");
    loading.textContent = messages.phoneLoading ?? "";
    block.append(loading);
    loadingNodes.set(block, loading);
  }
  const show = (block, control, picker) => {
    var _a;
    (_a = loadingNodes.get(block)) == null ? void 0 : _a.remove();
    loadingNodes.delete(block);
    const busy = authoredBusy.get(block);
    if (busy === null) block.removeAttribute("aria-busy");
    else if (busy !== void 0) block.setAttribute("aria-busy", busy);
    for (const element of pendingElements(block, control, picker))
      element.hidden = authoredHidden.get(element) ?? false;
  };
  const validate = (control, country, picker) => {
    if (control.value === "") {
      phoneValidity.set(control, !control.required);
      setHtmlQuizRuntimeAnswer(control, "");
      return;
    }
    if (!loaded) {
      phoneValidity.set(control, false);
      setHtmlQuizRuntimeAnswer(control, "");
      return;
    }
    try {
      const phone = loaded.lib.parsePhoneNumber(control.value, country);
      const valid = phone.isValid();
      phoneValidity.set(control, valid);
      setHtmlQuizRuntimeAnswer(control, valid ? phone.format("E.164") : "");
      if (valid) {
        const canDisplayNational = phone.country && (!picker || Array.from(picker.options).some(({ value }) => value === phone.country));
        if (phone.country) {
          selectedCountries.set(control, phone.country);
          if (picker && canDisplayNational) picker.value = phone.country;
        }
        if (canDisplayNational && !control.matches("[pattern], [minlength], [maxlength]"))
          control.value = phone.nationalNumber;
      }
    } catch {
      phoneValidity.set(control, false);
      setHtmlQuizRuntimeAnswer(control, "");
    }
  };
  const updateCountryDisplay = () => {
    if (!loaded) return;
    for (const { picker, outputs } of entries) {
      const country = loaded.countries.find(({ code }) => code === (picker == null ? void 0 : picker.value));
      if (!country) continue;
      const flag = String.fromCodePoint(
        ...Array.from(country.code, (letter) => 127462 + letter.charCodeAt(0) - 65)
      );
      for (const output of outputs) output.value = `${flag} ${country.prefix}`;
      if (picker && outputs.length)
        picker.setAttribute("aria-label", `${country.prefix} (${country.name})`);
    }
  };
  const input = (event) => {
    var _a, _b;
    const control = (_a = entries.find(({ control: control2 }) => control2 === event.target)) == null ? void 0 : _a.control;
    if (!control) return;
    const entry = entries.find((candidate) => candidate.control === control);
    if (!entry) return;
    validate(
      control,
      ((_b = entry.picker) == null ? void 0 : _b.value) || selectedCountries.get(control) || entry.block.dataset.country || HTML_QUIZ_FALLBACK_COUNTRY,
      entry.picker
    );
    updateCountryDisplay();
    if (blurred.has(control)) setErrorVisible(control);
    refresh();
  };
  const change = (event) => {
    var _a, _b;
    if (entries.some(({ control }) => control === event.target)) return input(event);
    const entry = entries.find(({ picker }) => picker === event.target);
    if (!entry) return;
    selectedCountries.set(entry.control, ((_a = entry.picker) == null ? void 0 : _a.value) || HTML_QUIZ_FALLBACK_COUNTRY);
    validate(entry.control, ((_b = entry.picker) == null ? void 0 : _b.value) || HTML_QUIZ_FALLBACK_COUNTRY, entry.picker);
    updateCountryDisplay();
    refresh();
  };
  const blur = (event) => {
    const entry = entries.find(({ control }) => control === event.target);
    if (!entry || !entry.control.value) return;
    blurred.add(entry.control);
    setErrorVisible(entry.control);
    refresh();
  };
  document2.addEventListener("input", input);
  document2.addEventListener("change", change);
  document2.addEventListener("blur", blur, true);
  void dependencies().then((value) => {
    if (!active) return;
    loaded = value;
    const supported = new Set(value.countries.map(({ code }) => code));
    const hostCountry = typeof shopifyCountry === "string" && supported.has(shopifyCountry.toUpperCase()) ? shopifyCountry.toUpperCase() : null;
    for (const { block, control, picker } of entries) {
      const fallback = (block.dataset.country || "").toUpperCase();
      let country = supported.has(fallback) ? fallback : HTML_QUIZ_FALLBACK_COUNTRY;
      if (hostCountry) country = hostCountry;
      let saved;
      if (control.value) {
        try {
          saved = value.lib.parsePhoneNumber(control.value);
        } catch {
        }
      }
      if ((saved == null ? void 0 : saved.isValid()) && saved.country && supported.has(saved.country)) {
        country = saved.country;
        if (!control.matches("[pattern], [minlength], [maxlength]"))
          control.value = saved.nationalNumber;
      }
      selectedCountries.set(control, country);
      if (picker) {
        picker.replaceChildren(
          ...value.countries.map(({ code, name, prefix }) => {
            const option = quizDocument(document2).createElement("option");
            option.value = code;
            option.textContent = `${code} ${name} (${prefix})`;
            return option;
          })
        );
        picker.value = country;
      }
      if (control.value) validate(control, country, picker);
      show(block, control, picker);
    }
    updateCountryDisplay();
    refresh();
    onAsyncStateChange == null ? void 0 : onAsyncStateChange();
  }).catch(() => {
    if (!active) return;
    for (const { block, control, picker } of entries) {
      phoneValidity.set(control, !control.hasAttribute("required") && control.value === "");
      setHtmlQuizRuntimeAnswer(control, "");
      show(block, control, picker);
    }
    refresh();
    onAsyncStateChange == null ? void 0 : onAsyncStateChange();
  });
  return () => {
    active = false;
    document2.removeEventListener("input", input);
    document2.removeEventListener("change", change);
    document2.removeEventListener("blur", blur, true);
    for (const [output, value] of authoredOutputs) output.value = value;
    for (const [picker, label] of authoredPickerLabels) {
      if (label === null) picker.removeAttribute("aria-label");
      else picker.setAttribute("aria-label", label);
    }
    for (const { block, control, picker } of entries) {
      show(block, control, picker);
      picker == null ? void 0 : picker.replaceChildren();
      phoneValidity.delete(control);
      clearHtmlQuizRuntimeAnswer(control);
      selectedCountries.delete(control);
    }
  };
}
const RANGE = 'input[type="range" i]';
const DATES = 'input[type="date" i][data-dates]';
function today() {
  const now = /* @__PURE__ */ new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
function boundDates(document2) {
  const authored = [];
  const day = today();
  for (const control of document2.querySelectorAll(DATES)) {
    const dates = control.dataset.dates;
    const bound = dates === "past" ? "max" : dates === "future" ? "min" : null;
    if (!bound) continue;
    const current = control.getAttribute(bound);
    authored.push([control, bound, current]);
    if (!current || (bound === "max" ? day < current : day > current))
      control.setAttribute(bound, day);
  }
  return authored;
}
const SLIDER = `${htmlQuizBlockSelector("choice", false)}[data-variant="slider"]`;
function fill(range) {
  const min = Number(range.min || 0);
  const max = Number(range.max || 100);
  const fill2 = max > min ? (Number(range.value) - min) / (max - min) * 100 : 0;
  range.style.setProperty("--fill", `${fill2}%`);
}
function render(control) {
  var _a;
  fill(control);
  const root = control.getRootNode();
  for (const output of root.querySelectorAll("output[for]"))
    if (control.id && ((_a = output.getAttribute("for")) == null ? void 0 : _a.split(/\s+/).includes(control.id)))
      output.value = control.value;
}
function markMoved(control) {
  control.setCustomValidity("");
  render(control);
}
function restoreHtmlQuizRange(control, answer2) {
  control.value = answer2;
  markMoved(control);
}
function sliderStops(block) {
  return Array.from(block.querySelectorAll('input[type="radio" i]')).filter(
    (radio) => radio.closest("[data-block]") === block && !radio.matches(":disabled")
  );
}
function syncSlider({ block, range, output }) {
  var _a, _b, _c;
  const stops = sliderStops(block);
  const index = stops.findIndex((radio) => radio.checked);
  (_a = range.parentElement) == null ? void 0 : _a.style.setProperty("--stops", String(stops.length));
  range.disabled = stops.length === 0;
  range.max = String(Math.max(stops.length - 1, 0));
  range.value = String(Math.max(index, 0));
  fill(range);
  const label = index < 0 ? "" : (((_c = (_b = stops[index].labels) == null ? void 0 : _b[0]) == null ? void 0 : _c.textContent) ?? "").trim();
  output.value = label;
  if (label) range.setAttribute("aria-valuetext", label);
  else range.removeAttribute("aria-valuetext");
}
function createSlider(document2, block) {
  var _a, _b, _c;
  const doc = quizDocument(document2);
  const wrapper = doc.createElement("div");
  setQuizParts(wrapper, "slider");
  const range = doc.createElement("input");
  Object.assign(range, { type: "range", min: "0", step: "1" });
  let legend = block.querySelector("legend");
  if (!((_a = legend == null ? void 0 : legend.textContent) == null ? void 0 : _a.trim())) {
    legend = null;
    const heading = quizQuestionHeading(block, domQuizNodeReader);
    const text = (_b = heading == null ? void 0 : heading.textContent) == null ? void 0 : _b.replace(/\s+/g, " ").trim();
    if (text) range.setAttribute("aria-label", text);
  }
  let legendId;
  if (legend && !legend.id) {
    let index = 0;
    do
      legendId = `html-quiz-slider-legend-${++index}`;
    while (document2.getElementById(legendId));
    legend.id = legendId;
  }
  if (legend) range.setAttribute("aria-labelledby", legend.id);
  const output = doc.createElement("output");
  output.setAttribute("aria-hidden", "true");
  wrapper.append(range, output);
  const stops = sliderStops(block);
  const last = (_c = stops[stops.length - 1]) == null ? void 0 : _c.closest("label");
  if (last && last.closest("[data-block]") === block) last.after(wrapper);
  else block.append(wrapper);
  return { block, range, output, legendId };
}
function installHtmlQuizNativeInputs(document2) {
  var _a;
  const authoredDates = boundDates(document2);
  const ranges = Array.from(document2.querySelectorAll(RANGE));
  for (const control of ranges) {
    render(control);
    if (control.required)
      control.setCustomValidity(
        ((_a = control.closest("[data-block]")) == null ? void 0 : _a.dataset.errorMessage) || " "
      );
  }
  const sliders = Array.from(
    document2.querySelectorAll(SLIDER),
    (block) => createSlider(document2, block)
  );
  const sync = () => sliders.forEach(syncSlider);
  sync();
  const input = (event) => {
    const target = event.target;
    if (!isElement(target) || !target.matches(RANGE)) return;
    const slider = sliders.find(({ range }) => range === target);
    if (!slider) return markMoved(target);
    const stop = sliderStops(slider.block)[Number(slider.range.value)];
    if (stop && !stop.checked) {
      stop.checked = true;
      stop.dispatchEvent(new Event("change", { bubbles: true }));
    }
    syncSlider(slider);
  };
  const click = (event) => {
    var _a2;
    const target = event.target;
    if (!isElement(target) || !target.matches('input[type="date" i]')) return;
    try {
      (_a2 = target.showPicker) == null ? void 0 : _a2.call(target);
    } catch {
    }
  };
  document2.addEventListener("input", input);
  document2.addEventListener("click", click);
  return {
    sync,
    dispose: () => {
      var _a2, _b;
      document2.removeEventListener("input", input);
      document2.removeEventListener("click", click);
      for (const [control, bound, value] of authoredDates)
        if (value === null) control.removeAttribute(bound);
        else control.setAttribute(bound, value);
      for (const control of ranges) {
        control.setCustomValidity("");
        control.style.removeProperty("--fill");
      }
      for (const { block, range, legendId } of sliders) {
        (_a2 = range.parentElement) == null ? void 0 : _a2.remove();
        if (legendId) (_b = block.querySelector("legend")) == null ? void 0 : _b.removeAttribute("id");
      }
    }
  };
}
const CONTROL_SELECTOR = "input, select, textarea";
const OWNED_INPUT_SELECTOR = htmlQuizBlockSelector("input");
const OWNED_CHOICE_SELECTOR = htmlQuizBlockSelector("choice");
function isVisibleValidatable(control) {
  return isRendered(ownedInput(control) ?? control) && control.willValidate;
}
function ownedInput(control) {
  const block = control.closest(OWNED_INPUT_SELECTOR);
  return block && control.closest("[data-block]") === block ? block : null;
}
function choiceControls(block) {
  return Array.from(
    block.querySelectorAll('input[type="radio"], input[type="checkbox"], select')
  ).filter((control) => control.closest("[data-block]") === block);
}
function ownedChoice(control) {
  const block = control.closest(OWNED_CHOICE_SELECTOR);
  return block && control.closest("[data-block]") === block ? block : null;
}
function choiceIsMultiple(group) {
  const select = group.find(
    (control) => control.tagName === "SELECT"
  );
  return select ? select.multiple : group.some((control) => control.type === "checkbox");
}
function selectedChoiceCount(group) {
  let count = 0;
  for (const control of group) {
    if (control.tagName === "SELECT") {
      count += Array.from(control.selectedOptions).filter(
        (option) => !option.disabled && isHtmlQuizBusinessChoice(option)
      ).length;
    } else if (control.checked) count++;
  }
  return count;
}
function choiceGroupValid(block) {
  if (!isRendered(block) || block.matches(":disabled") || block.closest(":disabled")) return true;
  const group = choiceControls(block);
  if (!group.length) return true;
  const enabled = group.filter((control) => !control.matches(":disabled"));
  if (!enabled.length) return true;
  if (enabled.some((control) => control.validity.customError)) return false;
  if (!choiceIsMultiple(enabled)) {
    const optional = !group.some((control) => control.hasAttribute("required"));
    return optional || selectedChoiceCount(enabled) > 0;
  }
  if (enabled.some((control) => control.willValidate && !control.validity.valid)) return false;
  return htmlQuizChoiceSelectionValid(block, selectedChoiceCount(enabled));
}
function isControlValid(control) {
  if (!control.validity.valid) return false;
  if (isEnhancedHtmlQuizPhone(control)) {
    if (control.value === "" && !control.hasAttribute("required")) return true;
    return readHtmlQuizPhoneValidity(control) ?? true;
  }
  return true;
}
function invalidControls(root) {
  return answerControls(root).filter(
    (control) => !ownedChoice(control) && isVisibleValidatable(control) && !isControlValid(control)
  );
}
function invalidChoices(root) {
  return Array.from(root.querySelectorAll(OWNED_CHOICE_SELECTOR)).filter(
    (block) => !choiceGroupValid(block)
  );
}
function hasInvalidVisibleControls(root) {
  return invalidControls(root).length > 0 || invalidChoices(root).length > 0;
}
function invalidVisibleControlNames(root, includeUnnamed = false) {
  return [
    ...new Set(
      [
        ...invalidControls(root).map((control) => control.name),
        ...invalidChoices(root).flatMap(
          (block) => choiceControls(block).map((control) => control.name)
        )
      ].filter((name) => includeUnnamed || Boolean(name))
    )
  ];
}
function readableDate(control, iso) {
  var _a;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const host = control.getRootNode().host;
  const lang = (_a = control.closest("[lang]") ?? (host == null ? void 0 : host.closest("[lang]"))) == null ? void 0 : _a.getAttribute("lang");
  try {
    return new Intl.DateTimeFormat(lang || void 0, {
      dateStyle: "medium",
      timeZone: "UTC"
    }).format(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  } catch {
    return iso;
  }
}
function installHtmlQuizInputValidation(document2, options = {}) {
  const touched = /* @__PURE__ */ new WeakSet();
  const authoredAriaInvalid = /* @__PURE__ */ new WeakMap();
  const authoredAriaDescribedBy = /* @__PURE__ */ new WeakMap();
  const authoredDisabled2 = /* @__PURE__ */ new WeakMap();
  const authoredAriaDisabled = /* @__PURE__ */ new WeakMap();
  const errorNodes = /* @__PURE__ */ new Map();
  const choiceErrorNodes = /* @__PURE__ */ new Map();
  const touchedChoices = /* @__PURE__ */ new WeakSet();
  const attemptedChoices = /* @__PURE__ */ new WeakSet();
  let errorIndex = 0;
  const restoreAttribute = (authored, control, name) => {
    const value = authored.get(control);
    if (value === null) control.removeAttribute(name);
    else if (value !== void 0) control.setAttribute(name, value);
  };
  const createErrorNode = (block, part) => {
    const error = quizDocument(document2).createElement("div");
    do
      error.id = `html-quiz-${part}-${++errorIndex}`;
    while (document2.getElementById(error.id));
    setQuizParts(error, part);
    error.setAttribute("role", "alert");
    block.append(error);
    return error;
  };
  const rememberControl = (control) => {
    if (!authoredAriaInvalid.has(control)) {
      authoredAriaInvalid.set(control, control.getAttribute("aria-invalid"));
      authoredAriaDescribedBy.set(control, control.getAttribute("aria-describedby"));
    }
  };
  const messageFor = (block) => {
    const control = block.querySelector(CONTROL_SELECTOR);
    const bound = (name) => {
      const value = (control == null ? void 0 : control.getAttribute(name)) ?? "";
      return (control == null ? void 0 : control.type) === "date" ? readableDate(control, value) : value;
    };
    return (block.dataset.errorMessage ?? "").replaceAll("{{minLength}}", (control == null ? void 0 : control.getAttribute("minlength")) ?? "").replaceAll("{{maxLength}}", (control == null ? void 0 : control.getAttribute("maxlength")) ?? "").replaceAll("{{min}}", bound("min")).replaceAll("{{max}}", bound("max"));
  };
  const removeError = (control) => {
    const error = errorNodes.get(control);
    if (!error) return;
    const tokens = (control.getAttribute("aria-describedby") ?? "").split(/\s+/).filter((token) => token && token !== error.id);
    if (tokens.length) control.setAttribute("aria-describedby", tokens.join(" "));
    else control.removeAttribute("aria-describedby");
    error.remove();
    errorNodes.delete(control);
  };
  const renderControl = (control) => {
    const block = ownedInput(control);
    if (!block) return;
    rememberControl(control);
    if (!touched.has(control) || !isVisibleValidatable(control) || isControlValid(control)) {
      removeError(control);
      restoreAttribute(authoredAriaInvalid, control, "aria-invalid");
      return;
    }
    control.setAttribute("aria-invalid", "true");
    const message = messageFor(block);
    if (!message) {
      removeError(control);
      return;
    }
    let error = errorNodes.get(control);
    if (!error) {
      error = createErrorNode(block, "input-error");
      errorNodes.set(control, error);
      const tokens = new Set(
        (control.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean)
      );
      tokens.add(error.id);
      control.setAttribute("aria-describedby", Array.from(tokens).join(" "));
    }
    error.textContent = message;
  };
  const updateActions = (snapshot) => {
    var _a;
    for (const action of document2.querySelectorAll(
      '[data-action]:not(a, [data-go-to="retake"])'
    )) {
      if (!authoredDisabled2.has(action)) {
        authoredDisabled2.set(action, action.hasAttribute("disabled"));
        authoredAriaDisabled.set(action, action.getAttribute("aria-disabled"));
      }
      const step = action.closest("[data-step]") ?? document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
      const back = action.dataset.goTo === "previous";
      const blocked = back ? !(((_a = options.canGoBack) == null ? void 0 : _a.call(options)) ?? true) : Boolean(
        step && !step.hidden && ((snapshot == null ? void 0 : snapshot.step) === step ? snapshot.invalidNames.length > 0 : hasInvalidVisibleControls(step))
      );
      const native = action.matches("button, input");
      if (native)
        action.toggleAttribute(
          "disabled",
          Boolean(authoredDisabled2.get(action)) || back && blocked
        );
      if (native && back) continue;
      if (blocked) {
        action.setAttribute("aria-disabled", "true");
      } else {
        const authored = authoredAriaDisabled.get(action);
        if (authored === null) action.removeAttribute("aria-disabled");
        else if (authored !== void 0) action.setAttribute("aria-disabled", authored);
      }
    }
  };
  const renderChoice = (block) => {
    const group = choiceControls(block);
    const range = block.querySelector('[part~="slider"] > input');
    const marked = range ? [...group, range] : group;
    for (const control of marked) rememberControl(control);
    const invalid = !choiceGroupValid(block);
    const show = invalid && (touchedChoices.has(block) || attemptedChoices.has(block));
    const message = (block.dataset.errorMessage ?? "").replaceAll("{{minSelected}}", String(htmlQuizChoiceBounds(block).min)).replaceAll("{{maxSelected}}", block.dataset.maxSelected ?? "");
    let error = choiceErrorNodes.get(block);
    if (!show || !message) {
      error == null ? void 0 : error.remove();
      choiceErrorNodes.delete(block);
      error = void 0;
    } else {
      if (!error) {
        error = createErrorNode(block, "choice-error");
        choiceErrorNodes.set(block, error);
      }
      error.textContent = message;
    }
    for (const control of marked) {
      if (show) {
        control.setAttribute("aria-invalid", "true");
        if (error) {
          const tokens = new Set(
            (control.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean)
          );
          tokens.add(error.id);
          control.setAttribute("aria-describedby", Array.from(tokens).join(" "));
        }
      } else {
        restoreAttribute(authoredAriaInvalid, control, "aria-invalid");
        restoreAttribute(authoredAriaDescribedBy, control, "aria-describedby");
      }
    }
  };
  const report = (step) => {
    var _a, _b;
    const [control] = invalidControls(step);
    const blocks = invalidChoices(step);
    if (control) {
      touched.add(control);
      renderControl(control);
    }
    for (const block of blocks) {
      attemptedChoices.add(block);
      renderChoice(block);
    }
    const [first] = blocks;
    if (control && (!first || first.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_PRECEDING)) {
      control.focus();
      if (!((_a = ownedInput(control)) == null ? void 0 : _a.hasAttribute("data-error-message"))) control.reportValidity();
    } else if (first) {
      (_b = first.querySelector('[part~="slider"] > input') ?? choiceControls(first).find((choice) => isRendered(choice) && !choice.matches(":disabled"))) == null ? void 0 : _b.focus();
    }
    return Boolean(control) || blocks.length > 0;
  };
  const refresh = (snapshot) => {
    nativeInputs.sync();
    for (const control of answerControls(document2)) renderControl(control);
    for (const block of document2.querySelectorAll(OWNED_CHOICE_SELECTOR))
      renderChoice(block);
    updateActions(snapshot);
  };
  const changed = (event) => {
    const target = event.target;
    if (!isElement(target) || isPickInput(event)) return;
    if (!target.matches(CONTROL_SELECTOR) || target.closest(htmlQuizBlockSelector("cards"))) return;
    const control = target;
    const block = ownedInput(control);
    const choice = ownedChoice(control);
    if (choice) {
      touchedChoices.add(choice);
      renderChoice(choice);
      updateActions();
      return;
    }
    if (event.type === "focusout" || isEnhancedHtmlQuizPhone(control)) return;
    if (block) {
      touched.add(control);
      renderControl(control);
    }
    updateActions();
  };
  const nativeInputs = installHtmlQuizNativeInputs(document2);
  document2.addEventListener("input", changed);
  document2.addEventListener("change", changed);
  document2.addEventListener("focusout", changed);
  const disposePhone = installHtmlQuizPhoneRuntime(document2, {
    shopifyCountry: options.shopifyCountry,
    setErrorVisible: (control) => touched.add(control),
    refresh,
    onAsyncStateChange: options.onAsyncStateChange
  });
  refresh();
  const host = document2.host;
  const View = quizDocument(document2).defaultView;
  const resized = host && (View == null ? void 0 : View.ResizeObserver) ? new View.ResizeObserver(() => refresh()) : void 0;
  if (host) resized == null ? void 0 : resized.observe(host);
  return {
    refresh,
    report,
    dispose: () => {
      resized == null ? void 0 : resized.disconnect();
      disposePhone();
      nativeInputs.dispose();
      document2.removeEventListener("input", changed);
      document2.removeEventListener("change", changed);
      document2.removeEventListener("focusout", changed);
      for (const control of answerControls(document2)) {
        removeError(control);
        restoreAttribute(authoredAriaInvalid, control, "aria-invalid");
        restoreAttribute(authoredAriaDescribedBy, control, "aria-describedby");
      }
      for (const error of choiceErrorNodes.values()) error.remove();
      for (const action of document2.querySelectorAll("[data-action]")) {
        const disabled = authoredDisabled2.get(action);
        if (disabled === void 0) continue;
        action.toggleAttribute("disabled", disabled);
        const ariaDisabled = authoredAriaDisabled.get(action);
        if (ariaDisabled === null) action.removeAttribute("aria-disabled");
        else if (ariaDisabled !== void 0) action.setAttribute("aria-disabled", ariaDisabled);
      }
    }
  };
}
function calculateHtmlQuizScoreTotals(document2, names, controls = answerControls(document2)) {
  const totals = {};
  for (const control of controls) {
    if (!isActiveControl(control) || names && !names.has(control.name)) continue;
    collectScoresFrom(control, totals);
    if (control.tagName === "SELECT")
      for (const option of selectedOptions(control))
        collectScoresFrom(option, totals);
  }
  return totals;
}
function calculateHtmlQuizVariableScores(document2, names, controls = answerControls(document2), declaredScores = []) {
  const scores = Object.fromEntries(
    declaredScores.map((name) => [name, 0])
  );
  return Object.assign(scores, calculateHtmlQuizScoreTotals(document2, names, controls));
}
const isHtmlQuizScoreTarget = (element) => htmlQuizScoreTarget(element, domQuizNodeReader);
const selectedOptions = (select) => Array.from(select.selectedOptions).filter(isEnabledAnswer);
function isActiveControl(input) {
  if (!input.name || !isEnabledAnswer(input)) return false;
  if (input.type === "checkbox" || input.type === "radio") {
    return input.checked;
  }
  if (input.tagName === "SELECT")
    return selectedOptions(input).some((option) => option.value !== "");
  return Boolean(input.value);
}
function collectScoresFrom(element, totals) {
  if (!isHtmlQuizScoreTarget(element)) return;
  for (const { name, value } of Array.from(element.attributes)) {
    const key = htmlQuizScoreName(name);
    const score = htmlQuizScoreValue(value);
    if (!key || score === void 0) continue;
    totals[key] = (Object.hasOwn(totals, key) ? totals[key] : 0) + score;
  }
}
const getHighestVariableRef = (scores) => {
  let highestScore = -Infinity;
  let highestRef = void 0;
  for (const [ref, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      highestRef = ref;
    }
  }
  return highestScore > 0 ? highestRef : void 0;
};
function htmlQuizPathSteps(document2, run) {
  const history = (run == null ? void 0 : run.readOnly) ? void 0 : run == null ? void 0 : run.history;
  if (!history) return void 0;
  const path = new Set(history);
  const active = activeStepRef(document2);
  if (active) path.add(active);
  return path;
}
function activeStepRef(document2) {
  var _a;
  return (_a = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR)) == null ? void 0 : _a.dataset.step;
}
function pathNames(controls, path) {
  var _a;
  if (!path) return void 0;
  const names = /* @__PURE__ */ new Set();
  for (const control of controls) {
    const step = (_a = control.closest("[data-step]")) == null ? void 0 : _a.dataset.step;
    if (control.name && step && path.has(step)) names.add(control.name);
  }
  return names;
}
function readQuizEvaluation(document2, run, end) {
  const step = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
  const path = htmlQuizPathSteps(document2, run);
  const controls = answerControls(document2);
  const names = pathNames(controls, path);
  const answers = collectHtmlQuizAnswers(document2, controls);
  const pathAnswers = names ? answers.filter((answer2) => names.has(answer2.name)) : answers;
  const scores = calculateHtmlQuizVariableScores(document2, names, controls, run == null ? void 0 : run.scores);
  const values = {};
  for (const answer2 of pathAnswers) values[answer2.name] = decodeHtmlQuizAnswer(answer2);
  end ?? (end = Boolean(step && isHtmlQuizTerminalStep(document2, step)));
  const context = {
    answers: { values },
    scores: { totals: scores, highest: getHighestVariableRef(scores) },
    step: step == null ? void 0 : step.dataset.step,
    end
  };
  return {
    step,
    path,
    answers,
    pathAnswers,
    scores,
    end,
    context
  };
}
function readQuizState(document2, run, end, evaluation) {
  const state = evaluation ?? readQuizEvaluation(document2, run, end);
  return { ...state, invalidNames: state.step ? invalidVisibleControlNames(state.step, true) : [] };
}
function isHtmlQuizResult(state) {
  return Boolean(
    state.step && (state.step.querySelector(htmlQuizBlockSelector("recommendations", false)) || state.end)
  );
}
function htmlQuizCompletesOnRefresh(state) {
  var _a;
  const continues = Array.from(
    ((_a = state.step) == null ? void 0 : _a.querySelectorAll("[data-action]")) ?? []
  ).some((action) => action.matches(HTML_QUIZ_CONTINUE_ACTION) && !action.closest("[hidden]"));
  return Boolean(state.step && !continues && !state.invalidNames.length && state.end);
}
function installHtmlQuizTracking(kernel, quizId) {
  var _a;
  const { doc: document2 } = kernel;
  const preferences = kernel.state.preferences;
  const quizName = (((_a = document2.querySelector("title")) == null ? void 0 : _a.textContent) ?? "").replace(/\s+/g, " ").trim();
  let viewedStep = null;
  const sender = htmlQuizTrackingSender();
  const run = sender.run;
  const version = () => {
    var _a2;
    const id = (_a2 = document2.querySelector('meta[name="quiz-version"]')) == null ? void 0 : _a2.content;
    return id ? { quizVersionId: id } : {};
  };
  const stepViewed = (state) => {
    const step = state.step;
    const ref = step == null ? void 0 : step.dataset.step;
    if (!step || !ref || ref === viewedStep) return;
    const title = htmlQuizStepLabel(step, kernel.run.stepLabels);
    const result = isHtmlQuizResult(state);
    viewedStep = ref;
    run((track) => {
      if (kernel.run.readOnly) return;
      if (result) track.trackResultViewed(ref, title, preferences, quizName);
      else track.trackQuestionViewed(ref, title, preferences);
    });
  };
  const answersSubmitted = (step, state) => {
    const ref = step == null ? void 0 : step.dataset.step;
    if (!step || !ref) return;
    const names = new Set(answerControls(step).map((control) => control.name));
    const title = htmlQuizStepLabel(step, kernel.run.stepLabels);
    const answers = state.answers.filter((answer2) => names.has(answer2.name) && answer2.value);
    run((track) => {
      const answered = [];
      for (const answer2 of answers) {
        if (answer2.choicesRefs.length)
          for (const value of [decodeHtmlQuizAnswer(answer2)].flat())
            answered.push({ value });
        else if (answer2.type === "email") track.trackEmailSubmitted(quizName, preferences);
        else if (answer2.type === "phone" || answer2.type === "tel")
          track.trackPhoneSubmitted(quizName, preferences);
        else if (answer2.type === "number" || answer2.type === "date")
          answered.push({ value: answer2.value });
      }
      track.trackBlocksAnswered(quizId, answered, preferences, ref, title);
    });
  };
  kernel.on("refreshed", ({ snapshot }) => stepViewed(snapshot));
  kernel.on("navigated", ({ direction, from, snapshot: state }) => {
    if (direction === "previousQuestion") return;
    answersSubmitted(from, state);
    const start = kernel.run.history.length === 1;
    const to = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
    const origin = from == null ? void 0 : from.dataset.step;
    const destination = to == null ? void 0 : to.dataset.step;
    const finished = isHtmlQuizResult(state);
    run((track) => {
      if (start) track.trackQuizStart(quizId, quizName, preferences, void 0, version());
      if (!origin || !destination) return;
      if (finished) track.trackQuizComplete(quizId, void 0, version());
      track.trackFlowEvent(quizId, origin, destination);
    });
  });
  kernel.on("redirected", ({ from, snapshot: state, saved }) => {
    if (kernel.run.readOnly) return;
    answersSubmitted(from, state);
    if (kernel.run.history.length === 0)
      run((track) => track.trackQuizStart(quizId, quizName, preferences, void 0, version()));
    if (from && isHtmlQuizRecommendationsOrEndStep(document2, from)) return;
    void saved.then((ok) => {
      if (ok) run((track) => track.trackQuizCompletedWithRedirect(quizName, preferences));
    });
  });
  installHtmlQuizProductTracking(kernel, quizId, run);
  kernel.on("retake", () => run((track) => track.trackRetakeQuiz(quizName, quizId, preferences)));
  kernel.on("destroy", () => {
    sender.dispose();
  });
}
function htmlQuizTrackingSender(channel = "quiz") {
  let tracking = null;
  let disposed = false;
  const pending = [];
  const run = (send) => {
    if (disposed) return;
    if (tracking) send(tracking);
    else pending.push(send);
  };
  __vitePreload(() => import("./quiz-renderer-trackers-bundle-Do5Gpowk.js").then((n) => n.tracking), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((loaded) => {
    if (disposed) return;
    const scoped = {
      ...loaded,
      trackQuizStart: (id, name, preferences, _channel, version) => loaded.trackQuizStart(id, name, preferences, channel, version),
      trackQuizComplete: (id, _channel, version) => loaded.trackQuizComplete(id, channel, version),
      trackFlowEvent: (id, origin, destination) => loaded.trackFlowEvent(id, origin, destination, channel),
      trackProductClicked: (id, ref, variant, preferences) => loaded.trackProductClicked(id, ref, variant, preferences, channel),
      trackProductAddedToCart: (id, variant, ref, preferences) => loaded.trackProductAddedToCart(id, variant, ref, preferences, channel)
    };
    tracking = scoped;
    pending.splice(0).forEach((send) => send(scoped));
  }).catch(() => {
  });
  return {
    run,
    dispose() {
      disposed = true;
      pending.length = 0;
    }
  };
}
function installHtmlQuizProductTracking(kernel, quizId, run) {
  const preferences = kernel.state.preferences;
  kernel.on(
    "productClicked",
    ({ step, variant }) => run((track) => track.trackProductClicked(quizId, step, variant, preferences))
  );
  kernel.on(
    "productAdded",
    ({ step, variant }) => run((track) => track.trackProductAddedToCart(quizId, variant, step, preferences))
  );
}
const STORAGE_PREFIX = "revenuehunt-html-progress-v2";
const SAVE_DEBOUNCE_MS = 250;
const strings = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
const optionalString = (value) => value === void 0 || typeof value === "string";
const nullableString = (value) => value === null || typeof value === "string";
const answer = (value) => isRecord(value) && typeof value.name === "string" && typeof value.type === "string" && strings(value.choicesRefs) && typeof value.value === "string";
function storedProgress(value) {
  if (!isRecord(value) || value.v !== 2 || typeof value.quizId !== "string" || !nullableString(value.quizVersion) || !nullableString(value.currentStepRef) || !strings(value.history) || !Array.isArray(value.answers) || !value.answers.every(answer) || !optionalString(value.responseId) || !optionalString(value.responseToken) || typeof value.savedAt !== "string")
    return;
  return value;
}
function savedResponseFrom(value) {
  if (!isRecord(value) || typeof value.quizId !== "string" || !optionalString(value.responseId) || typeof value.resultRef !== "string" || typeof value.domain !== "string" || !(value.storefrontAccessToken == null || typeof value.storefrontAccessToken === "string") || !(value.products === void 0 || isRecord(value.products) && Object.values(value.products).every(isRecord)) || !isRecord(value.recommendations) || !Object.values(value.recommendations).every(
    (block) => isRecord(block) && Object.values(block).every(strings)
  ) || !Array.isArray(value.answers))
    return;
  const answers = [];
  for (const item of value.answers) {
    if (!isRecord(item) || typeof item.name !== "string" || typeof item.type !== "string" || !(item.choicesRefs === void 0 || strings(item.choicesRefs)) || !(item.redacted === void 0 || typeof item.redacted === "boolean"))
      return;
    answers.push({
      name: item.name,
      type: item.type,
      choicesRefs: item.choicesRefs ?? [],
      value: !item.redacted && typeof item.value === "string" ? item.value : ""
    });
  }
  return { ...value, answers };
}
function installHtmlQuizProgress(kernel, options) {
  var _a;
  const { doc: document2 } = kernel;
  const key = `${STORAGE_PREFIX}:${options.quizId}`;
  const persisted = kernel.state.preferences.saveQuizProgress;
  if (!persisted) {
    try {
      localStorage.removeItem(key);
    } catch {
    }
  }
  const quizVersion = ((_a = document2.querySelector('meta[name="quiz-version"]')) == null ? void 0 : _a.content) || null;
  let currentStepRef = null;
  let disposed = false;
  let saveTimer;
  let pendingSave;
  const parsedResponse = savedResponseFrom(options.response);
  const steps = Array.from(document2.querySelectorAll("[data-step]"));
  kernel.run.readOnly = (parsedResponse == null ? void 0 : parsedResponse.quizId) === options.quizId && steps.some((step) => step.dataset.step === parsedResponse.resultRef) ? parsedResponse : void 0;
  const storage = () => {
    if (!persisted || kernel.run.readOnly) return void 0;
    try {
      return localStorage;
    } catch {
      return void 0;
    }
  };
  const read = () => {
    const store = storage();
    if (!store) return void 0;
    try {
      const raw = store.getItem(key);
      if (!raw) return void 0;
      const parsed = storedProgress(JSON.parse(raw));
      return (parsed == null ? void 0 : parsed.quizVersion) === quizVersion ? parsed : void 0;
    } catch {
      return void 0;
    }
  };
  const persist = (store, payload) => {
    try {
      store.setItem(key, payload);
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== "QuotaExceededError") return;
      try {
        const doomed = [];
        for (let index = 0; index < store.length; index += 1) {
          const other = store.key(index);
          if (other && other.startsWith(`${STORAGE_PREFIX}:`) && other !== key) doomed.push(other);
        }
        doomed.forEach((other) => store.removeItem(other));
        store.setItem(key, payload);
      } catch {
      }
    }
  };
  const save = (state) => {
    if (disposed) return;
    const store = storage();
    if (!store) return;
    const payload = {
      v: 2,
      quizId: options.quizId,
      quizVersion,
      currentStepRef,
      answers: state.answers,
      // Progress deliberately retains off-path answers too.
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return () => persist(
      store,
      JSON.stringify({
        ...payload,
        history: kernel.run.history,
        ...kernel.run.responseId ? { responseId: kernel.run.responseId, responseToken: kernel.run.responseToken } : {}
      })
    );
  };
  const applyAnswer = (control, answer2) => {
    const valueList = [decodeHtmlQuizAnswer(answer2)].flat();
    if (control.tagName === "SELECT") {
      for (const option of control.options) {
        option.selected = valueList.includes(option.value);
      }
      return;
    }
    if (control.type === "radio" || control.type === "checkbox") {
      const ref = control.getAttribute("value") ?? "";
      control.checked = valueList.includes(control.value) || answer2.choicesRefs.includes(ref);
      return;
    }
    if (control.type === "range")
      return restoreHtmlQuizRange(control, answer2.value);
    control.value = answer2.value;
    setHtmlQuizRuntimeAnswer(control, answer2.value);
  };
  const restoreAnswers = (answers) => {
    const byName = new Map(answers.map((answer2) => [answer2.name, answer2]));
    for (const control of answerControls(document2)) {
      const answer2 = byName.get(control.name);
      if (answer2 && (answer2.value !== "" || answer2.choicesRefs.length > 0))
        applyAnswer(control, answer2);
    }
  };
  const prefillFromLink = () => {
    const params = new URLSearchParams(window.location.search);
    const groups = /* @__PURE__ */ new Map();
    const authoredHidden = (control) => {
      const hiddenAncestor = control.closest("[hidden]");
      return control.type === "hidden" || !!hiddenAncestor && !hiddenAncestor.matches("[data-step]");
    };
    for (const control of answerControls(document2)) {
      if (!control.name) continue;
      const group = groups.get(control.name) ?? [];
      group.push(control);
      groups.set(control.name, group);
    }
    for (const [name, controls] of groups) {
      const values = params.getAll(name);
      if (!values.length) continue;
      const answered = controls.some((control) => {
        if (control.type === "radio" || control.type === "checkbox")
          return control.checked;
        if (control.tagName === "SELECT")
          return Array.from(control.selectedOptions).some(
            (option) => option.value !== ""
          );
        if (control.type === "range") return control.hasAttribute("value");
        return control.value !== "";
      });
      if (answered) continue;
      for (const control of controls) {
        if (!isEnabledAnswer(control) || authoredHidden(control)) continue;
        const multiple = isHtmlQuizMultiAnswerType(control.type);
        let matched = multiple ? values : values.slice(0, 1);
        if (control.tagName === "SELECT") {
          const options2 = Array.from(control.options);
          matched = matched.filter(
            (value) => options2.some((option) => option.value === value && isEnabledAnswer(option))
          );
          if (!matched.length) continue;
        }
        applyAnswer(control, {
          name,
          type: control.type,
          choicesRefs: [],
          value: multiple ? JSON.stringify(matched) : matched[0]
        });
      }
    }
  };
  const stored = read();
  if (stored) {
    kernel.run.history.splice(0, kernel.run.history.length, ...stored.history);
    currentStepRef = stored.currentStepRef;
    kernel.run.responseId = stored.responseToken ? stored.responseId : void 0;
    kernel.run.responseToken = stored.responseToken ? stored.responseToken : void 0;
    restoreAnswers(stored.answers);
    if (currentStepRef) showHtmlQuizStep(document2, currentStepRef, kernel.run, { settles: false });
  } else if (kernel.run.readOnly) {
    kernel.run.responseId = kernel.run.readOnly.responseId;
    restoreAnswers(kernel.run.readOnly.answers);
    showHtmlQuizStep(document2, kernel.run.readOnly.resultRef, kernel.run, { settles: false });
  } else if (kernel.state.preferences.prefillFromLink) {
    prefillFromLink();
  }
  const recordActiveStep = (state, cause) => {
    var _a2;
    currentStepRef = ((_a2 = state.step) == null ? void 0 : _a2.dataset.step) ?? currentStepRef;
    pendingSave = save(state);
    if (cause !== "input") pendingSave == null ? void 0 : pendingSave();
    if (cause) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        if (!disposed) pendingSave == null ? void 0 : pendingSave();
      }, SAVE_DEBOUNCE_MS);
    }
  };
  recordActiveStep(readQuizState(document2, kernel.run));
  kernel.on("refreshed", ({ cause, snapshot }) => recordActiveStep(snapshot, cause));
  kernel.on("retake", () => {
    kernel.run.responseId = void 0;
    kernel.run.responseToken = void 0;
    kernel.run.readOnly = void 0;
  });
  kernel.on("destroy", () => {
    disposed = true;
    clearTimeout(saveTimer);
  });
}
function answerBlocks(step) {
  return Array.from(step.querySelectorAll("[data-block]")).filter(
    (block) => HTML_QUIZ_ANSWER_BLOCK_TYPES.includes(block.getAttribute(HTML_QUIZ_BLOCK_TYPE_ATTRIBUTE) ?? "")
  );
}
function htmlQuizContinuesOnPick(step) {
  const blocks = answerBlocks(step);
  const [block] = blocks;
  return Boolean(
    blocks.length === 1 && block.getAttribute(HTML_QUIZ_BLOCK_TYPE_ATTRIBUTE) === "choice" && !block.matches('[data-variant="slider"]') && block.querySelector('input[type="radio" i], select:not([multiple])')
  );
}
function installHtmlQuizAutoAdvance(kernel, timers, runAction) {
  const root = kernel.doc;
  let shown = null;
  let picking = false;
  let timer;
  let pointer = false;
  const onPointer = (event) => pointer = event.type === "pointerdown";
  const onChange = (event) => {
    const target = event.target;
    if (!pointer || !event.isTrusted || !isElement(target)) return;
    if (!target.matches('input[type="radio" i], select:not([multiple])') || target.closest(htmlQuizBlockSelector("cards")))
      return;
    const step = target.closest("[data-step]");
    if (step && picking && step === shown)
      setTimeout(() => {
        if (step.hidden) return;
        const action = htmlQuizContinueAction(root);
        if (action) runAction(action);
      }, 150);
  };
  const cancel = () => {
    clearTimeout(timer);
  };
  const sync = () => {
    const step = root.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
    if (step === shown) return;
    shown = step;
    picking = Boolean(step && htmlQuizContinuesOnPick(step));
    for (const marked of root.querySelectorAll('[data-state="auto-advance"]'))
      marked.removeAttribute("data-state");
    if (step && picking) {
      const action2 = Array.from(step.querySelectorAll(HTML_QUIZ_CONTINUE_ACTION)).find(isRendered);
      if (action2) setQuizState(action2, "auto-advance");
    }
    cancel();
    const action = step == null ? void 0 : step.querySelector("[data-action][data-click-after]");
    const seconds = action && readHtmlQuizAttribute(action, "data-click-after");
    if (!seconds) return;
    if (timers)
      timer = setTimeout(() => {
        cancel();
        runAction(action);
      }, seconds * 1e3);
  };
  root.addEventListener("pointerdown", onPointer);
  root.addEventListener("keydown", onPointer);
  root.addEventListener("change", onChange);
  root.addEventListener("quiz:step", sync);
  kernel.on("destroy", () => {
    cancel();
    root.removeEventListener("pointerdown", onPointer);
    root.removeEventListener("keydown", onPointer);
    root.removeEventListener("change", onChange);
    root.removeEventListener("quiz:step", sync);
  });
  sync();
}
const kind = (box) => box.hasAttribute("data-exclusive") ? "none" : box.hasAttribute("data-select-all") ? "all" : "regular";
function installHtmlQuizExclusiveChoices(root) {
  const onChange = (event) => {
    var _a;
    const box = event.target;
    if (!isElement(box)) return;
    if (!box.matches(`${htmlQuizBlockSelector("choice", false)} input[type="checkbox" i]`)) return;
    const { checked } = box;
    const target = kind(box);
    const wanted = (other) => {
      const own = kind(other);
      if (target === "all") return own !== "none" && checked;
      if (target === "none" || own === "none") return checked ? false : other.checked;
      if (own === "all") return checked && other.checked;
      return other.checked;
    };
    const changed = Array.from(
      ((_a = box.closest("[data-block]")) == null ? void 0 : _a.querySelectorAll('input[type="checkbox" i]')) ?? []
    ).filter((other) => other !== box && !other.disabled && other.checked !== wanted(other));
    for (const other of changed) other.checked = !other.checked;
  };
  root.addEventListener("change", onChange);
  return () => root.removeEventListener("change", onChange);
}
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
function htmlQuizPageSource() {
  const page = new URL(window.location.href);
  const source = { page_url: page.origin + page.pathname };
  for (const param of UTM_PARAMS) {
    const value = page.searchParams.get(param);
    if (value) source[param] = value;
  }
  if (document.referrer) {
    const referrer = new URL(document.referrer);
    source.referrer = referrer.origin + referrer.pathname;
  }
  return source;
}
function buildHtmlQuizResponsePayload(snapshot, metadata) {
  return {
    contractVersion: HTML_QUIZ_CONTRACT_VERSIONS.recommendations,
    revision: snapshot.revision,
    ...metadata,
    ...metadata.responseId ? {} : { source: htmlQuizPageSource() },
    surfaceRef: snapshot.step.dataset.step,
    event: snapshot.event,
    answers: snapshot.answers,
    slotRefs: snapshot.slots.map((slot) => slot.dataset.slot),
    visibleSectionsRefs: snapshot.sections,
    path: snapshot.path,
    // The same response metadata JSON sends (market from the storefront Liquid globals).
    marketId: typeof window === "undefined" || window.quiz_market_id == null ? void 0 : String(window.quiz_market_id),
    locale: typeof window === "undefined" ? void 0 : window.quiz_locale || void 0,
    variableScores: snapshot.variableScores,
    highestVariableRef: getHighestVariableRef(snapshot.variableScores)
  };
}
function requireValue(value, invariant) {
  if (value === null || value === void 0) throw new Error(invariant);
  return value;
}
const RECOMMENDATION_RESOURCE_KINDS = [
  {
    kind: "products",
    compiledKey: "products",
    engineField: "ProductsIds",
    suffix: "products",
    compiledType: "products",
    engineKey: "products",
    gidPrefixes: [
      "gid://shopify/Product/",
      "gid://woocommerce/Product/",
      "gid://standalone/Product/"
    ]
  },
  {
    kind: "product-variants",
    compiledKey: "productVariants",
    engineField: "ProductsVariantsIds",
    suffix: "product-variants",
    compiledType: "product_variants",
    engineKey: "products_variants",
    gidPrefixes: [
      "gid://shopify/ProductVariant/",
      "gid://woocommerce/ProductVariant/",
      "gid://standalone/ProductVariant/"
    ]
  },
  {
    kind: "collections",
    compiledKey: "collections",
    engineField: "CollectionsIds",
    suffix: "collections",
    compiledType: "collections",
    engineKey: "collections",
    gidPrefixes: [
      "gid://shopify/Collection/",
      "gid://woocommerce/Collection/",
      "gid://standalone/Collection/"
    ]
  },
  {
    kind: "tags",
    compiledKey: "tags",
    engineField: "TagsCollectionsIds",
    suffix: "tags",
    engineKey: "tags"
  },
  // Variant-option collections, as JSON's *VariantsCollectionsIds: "Option - Value", e.g. "Color - Red".
  {
    kind: "variants",
    compiledKey: "variants",
    engineField: "VariantsCollectionsIds",
    suffix: "variant-options",
    engineKey: "variants"
  },
  {
    kind: "vendors",
    compiledKey: "vendors",
    engineField: "VendorsCollectionsIds",
    suffix: "vendors",
    engineKey: "vendors"
  },
  {
    kind: "prices",
    compiledKey: "prices",
    engineField: "PricesCollectionsIds",
    suffix: "prices",
    engineKey: "prices"
  }
];
const RECOMMENDATION_ITEM_KINDS = RECOMMENDATION_RESOURCE_KINDS.filter(
  (row) => "compiledType" in row
);
const HTML_QUIZ_ITEM_GID_PREFIXES = Object.fromEntries(
  RECOMMENDATION_ITEM_KINDS.map(({ compiledType, gidPrefixes }) => [compiledType, gidPrefixes])
);
function isHtmlQuizItemGid(value, prefixes) {
  return prefixes.some(
    (prefix) => value.startsWith(prefix) && /^\d+$/.test(value.slice(prefix.length))
  );
}
function htmlQuizResourceKind(type) {
  var _a;
  return (_a = RECOMMENDATION_RESOURCE_KINDS.find(
    (row) => row.kind === type || row.suffix === type || "compiledType" in row && row.compiledType === type
  )) == null ? void 0 : _a.kind;
}
const HTML_QUIZ_VARIANT_RESOURCE = requireValue(
  RECOMMENDATION_RESOURCE_KINDS.find((row) => row.kind === "product-variants"),
  "The product-variants resource is registered"
);
const recommendationType = (value) => {
  var _a;
  return ((_a = RECOMMENDATION_ITEM_KINDS.find(({ suffix }) => suffix === value)) == null ? void 0 : _a.compiledType) ?? "products";
};
const isRecommendationMetafieldRef = (value) => /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value);
function defaultRecommendationTemplate(kind2) {
  const image = '<img data-field="image" alt="">';
  return `<template data-card="collections"><article>${image}<h3 data-field="title"></h3><a data-link target="_blank"></a></article></template>`;
}
const slotCards = (slot) => slot.querySelector(htmlQuizBlockSelector("cards"));
const cardTemplate = (block, kind2) => Array.from(block.children).find(
  (child) => child.localName === "template" && child.getAttribute("data-card") === kind2
);
const slotTemplate = (slot) => {
  var _a;
  const block = (_a = slot.parentElement) == null ? void 0 : _a.closest(htmlQuizBlockSelector("recommendations"));
  return block ? cardTemplate(block, slot.getAttribute("data-recommend")) : void 0;
};
function recommendationResultPresentation() {
  const touched = /* @__PURE__ */ new Set();
  const set = (element, value) => {
    setQuizState(element, value);
    touched.add(element);
  };
  const fallback = (block) => [...block.querySelectorAll("[data-no-results]")].filter(
    (el) => el.closest("[data-block]") === block
  );
  const clear2 = (slots) => {
    for (const slot of slots) {
      slot.removeAttribute("data-state");
      touched.delete(slot);
      const block = slot.closest("[data-block]");
      if (block)
        for (const element of [block, ...fallback(block)]) {
          element.removeAttribute("data-state");
          touched.delete(element);
        }
    }
  };
  return {
    clear: clear2,
    success(slots, populated) {
      var _a;
      clear2(slots);
      const blocks = /* @__PURE__ */ new Map();
      for (const slot of slots) {
        set(slot, populated.has(slot) ? "populated" : "empty");
        const block = slot.closest("[data-block]");
        if (block) blocks.set(block, [...blocks.get(block) ?? [], slot]);
      }
      for (const [block, requested] of blocks)
        if (requested.every((slot) => !populated.has(slot))) {
          set(block, "empty");
          for (const message of fallback(block)) {
            if (((_a = message.textContent) == null ? void 0 : _a.replace(/[\s\u200b\ufeff]/g, "")) || message.querySelector("img, svg, hr, video, audio"))
              set(message, "empty");
          }
        }
    },
    dispose() {
      for (const element of touched) element.removeAttribute("data-state");
      touched.clear();
    }
  };
}
const NO_CART_NOTICE = "Preview only. In your store, this adds the product to the cart.";
function detectHtmlQuizCommerceHost(win, adminPreview, platform) {
  var _a, _b;
  if (adminPreview) return "preview";
  if (platform) return platform;
  const root = (_b = (_a = win == null ? void 0 : win.Shopify) == null ? void 0 : _a.routes) == null ? void 0 : _b.root;
  return typeof root === "string" && root ? "shopify" : "none";
}
async function loadHtmlQuizCommerce(host, quizId, notice = NO_CART_NOTICE, responseId = () => void 0, assistant, shop) {
  if (host === "shopify")
    return (await __vitePreload(async () => {
      const { createShopifyCommerce } = await import("./quiz-renderer-shopify-commerce-spU2anzH.js");
      return { createShopifyCommerce };
    }, true ? __vite__mapDeps([2,3,4,5,1,6,7]) : void 0, import.meta.url)).createShopifyCommerce(
      quizId,
      responseId,
      assistant
    );
  if (host === "woocommerce")
    return (await __vitePreload(async () => {
      const { createWooCommerceCommerce } = await import("./quiz-renderer-woocommerce-commerce-BQP_2zxh.js");
      return { createWooCommerceCommerce };
    }, true ? __vite__mapDeps([8,1,6]) : void 0, import.meta.url)).createWooCommerceCommerce(
      responseId,
      assistant,
      shop
    );
  if (host === "standalone")
    return (await __vitePreload(async () => {
      const { createStandaloneCommerce } = await import("./quiz-renderer-standalone-commerce-BHUHu0ZY.js");
      return { createStandaloneCommerce };
    }, true ? __vite__mapDeps([9,1,10,11]) : void 0, import.meta.url)).createStandaloneCommerce(shop);
  if (host === "preview" || host === "none")
    return (await __vitePreload(async () => {
      const { createPreviewCommerce } = await import("./quiz-renderer-preview-commerce-DTRiHzw3.js");
      return { createPreviewCommerce };
    }, true ? __vite__mapDeps([12,6,7,1,5]) : void 0, import.meta.url)).createPreviewCommerce(notice);
  throw new Error(`Storefront platform not implemented: ${host}`);
}
function installHtmlQuizRecommendations(kernel, context, {
  current,
  stale,
  retryError
}) {
  const { doc: document2 } = kernel;
  const { quizId, preview } = context;
  const runtimeMessage = (key) => kernel.state.messages[key] ?? "";
  let disposed = false;
  let blocked = false;
  let surfaceItems = {};
  let surfaceRecommendations = {};
  let revision;
  let responseToken;
  const navigate = (url, target) => {
    if (preview) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    if (context.adminPreview) return;
    if (target === "_blank") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.assign(url);
  };
  const outputs = /* @__PURE__ */ new Set();
  const cards = /* @__PURE__ */ new Map();
  const clearCards = (slot) => {
    var _a;
    (_a = cards.get(slot)) == null ? void 0 : _a.forEach((dispose) => dispose());
    cards.delete(slot);
  };
  const presentation = recommendationResultPresentation();
  const page = quizDocument(document2);
  const status = page.createElement("div");
  setQuizParts(status, "status");
  status.setAttribute("role", "status");
  quizBody(document2).append(status);
  const commerceHost = detectHtmlQuizCommerceHost(
    typeof window === "undefined" ? void 0 : window,
    context.adminPreview,
    context.platform
  );
  let tagged;
  const tagCart = (id) => {
    if (!id) return Promise.resolve();
    if ((tagged == null ? void 0 : tagged.id) !== id)
      tagged = {
        id,
        done: loadCommerce().then((commerce) => commerce.tagCart(id)).catch(() => {
        })
      };
    return tagged.done;
  };
  let appliedDiscountCode;
  const applyDiscountCode = (step, result) => {
    var _a;
    const code = (_a = step.dataset.discountCode) == null ? void 0 : _a.trim();
    const token = result.storefrontAccessToken;
    if (!code || code === appliedDiscountCode) return;
    void loadCommerce().then(
      (commerce) => commerce.applyDiscount(code, { storefrontAccessToken: token, shop: result.domain })
    ).then((applied) => {
      if (applied) appliedDiscountCode = code;
    }).catch((error) => console.error("Auto apply discount failed:", error));
  };
  const productAdded = (step, variant, quantity = 1) => {
    if (commerceHost !== "preview" && commerceHost !== "none")
      kernel.emit("productAdded", { step, variant, quantity });
  };
  let commerceLoad;
  let loadedCommerce;
  const loadCommerce = () => commerceLoad ?? (commerceLoad = loadHtmlQuizCommerce(
    commerceHost,
    quizId,
    context.cartNotice,
    () => kernel.run.responseId,
    void 0,
    context.shop ?? context.myshopifyDomain
  ).then(
    (loaded) => {
      if (disposed) loaded.dispose();
      return loadedCommerce = loaded;
    },
    (error) => {
      commerceLoad = void 0;
      throw error;
    }
  ));
  const outputFor = (slot) => {
    const output = slotCards(slot);
    if (output) outputs.add(output);
    return output;
  };
  const showPlaceholders = async (slot, output) => {
    const template = slotTemplate(slot);
    if (!template) return;
    const products = await __vitePreload(() => import("./quiz-renderer-recommendation-products-BwU65ujZ.js"), true ? __vite__mapDeps([13,7,1,5,14,15,10,16,17,11]) : void 0, import.meta.url);
    if (disposed || output.getAttribute("aria-busy") !== "true" || output.childElementCount) return;
    const type = recommendationType(slot.dataset.recommend);
    const count = Math.min(readHtmlQuizAttribute(slot, "data-count"), 12);
    products.appendRecommendationSkeletons(page, output, {
      template,
      type,
      count,
      message: runtimeMessage
    });
  };
  const showError = (attempt) => {
    blocked = true;
    outputs.forEach((output) => {
      output.removeAttribute("aria-busy");
      output.querySelectorAll(':scope > [part~="skeleton"]').forEach((card) => card.remove());
    });
    status.setAttribute("role", "alert");
    const message = page.createElement("p");
    message.textContent = runtimeMessage("loadingErrorRetry");
    const button = page.createElement("button");
    button.type = "button";
    button.textContent = runtimeMessage("tryAgain");
    button.addEventListener("click", attempt);
    status.replaceChildren(message, button);
  };
  const hydrate = async (snapshot, result) => {
    if (stale(snapshot)) return;
    try {
      const ids = [
        ...new Set(
          snapshot.slots.flatMap((slot) => {
            var _a;
            return [
              ...result.recommendations[slot.dataset.slot] ?? [],
              ...((_a = result.reserves) == null ? void 0 : _a[slot.dataset.slot]) ?? []
            ];
          })
        )
      ];
      const storefrontAccessToken = result.storefrontAccessToken;
      const products = ids.length ? await __vitePreload(() => import("./quiz-renderer-recommendation-products-BwU65ujZ.js"), true ? __vite__mapDeps([13,7,1,5,14,15,10,16,17,11]) : void 0, import.meta.url) : void 0;
      if (stale(snapshot)) return;
      const metafieldRefs = {
        products: /* @__PURE__ */ new Set(),
        collections: /* @__PURE__ */ new Set(),
        [HTML_QUIZ_VARIANT_RESOURCE.compiledKey]: /* @__PURE__ */ new Set()
      };
      for (const slot of snapshot.slots) {
        const template = slotTemplate(slot);
        const type = recommendationType(slot.dataset.recommend);
        if (!products || !template || !(result.recommendations[slot.dataset.slot] ?? []).length)
          continue;
        const refs = type === "collections" ? metafieldRefs.collections : metafieldRefs.products;
        for (const ref of products.recommendationMetafieldRefs(template, type)) refs.add(ref);
      }
      const commerce = products ? await loadCommerce() : void 0;
      const items = commerce ? await commerce.items(
        ids,
        {
          storefrontAccessToken,
          shop: result.domain,
          ...result.products && { products: result.products }
        },
        metafieldRefs,
        ...context.adminPreview || preview ? [{ country: window.quiz_country || null, locale: window.quiz_locale || null }] : []
      ) : {};
      if (stale(snapshot)) return;
      const shown = Object.fromEntries(
        snapshot.slots.map((slot) => {
          var _a;
          const candidates = [
            ...result.recommendations[slot.dataset.slot] ?? [],
            ...((_a = result.reserves) == null ? void 0 : _a[slot.dataset.slot]) ?? []
          ];
          return [
            slot.dataset.slot,
            [...new Set(candidates)].filter((id) => products == null ? void 0 : products.isUsableRecommendationItem(items[id])).slice(0, readHtmlQuizAttribute(slot, "data-count"))
          ];
        })
      );
      const shownItems = Object.fromEntries(
        Object.values(shown).flat().map((id) => [id, items[id]])
      );
      if (stale(snapshot)) return;
      const populated = /* @__PURE__ */ new Set();
      const anyVariantChoices = Object.values(shownItems).some(
        (value) => hasVariantChoice(value)
      );
      for (const slot of snapshot.slots) {
        const output = outputFor(slot);
        const template = slotTemplate(slot);
        if (!output || !template) throw new Error("Missing compiled cards block or template");
        output.removeAttribute("aria-busy");
        clearCards(slot);
        output.replaceChildren();
        const disposers = [];
        cards.set(slot, disposers);
        for (const id of shown[slot.dataset.slot]) {
          const card = requireValue(
            products,
            "Shown items require product layer"
          ).createRecommendationCard(page, items[id], id, {
            template,
            type: recommendationType(slot.dataset.recommend),
            domain: result.domain,
            message: runtimeMessage,
            anyVariantChoices,
            navigate,
            disposed: () => !current(snapshot),
            // Only a real cart lands units; previews' pretend adds are never tracked.
            track: (event, variant) => {
              const step = snapshot.step.dataset.step;
              if (event === "productAdded") productAdded(step, variant);
              else kernel.emit(event, { step, variant });
            },
            cart: commerce == null ? void 0 : commerce.cart,
            addAction: commerce == null ? void 0 : commerce.addAction,
            add: commerce && ((variantId, sellingPlanId) => commerce.add(variantId, sellingPlanId)),
            plans: commerce == null ? void 0 : commerce.plans
          });
          disposers.push(card.dispose);
          output.append(card.element);
        }
        if (output.childElementCount) populated.add(slot);
      }
      const surface = snapshot.step.dataset.step;
      surfaceItems = Object.fromEntries(
        Object.entries(surfaceItems).filter(([step]) => snapshot.path.includes(step))
      );
      surfaceRecommendations = Object.fromEntries(
        Object.entries(surfaceRecommendations).filter(([step]) => snapshot.path.includes(step))
      );
      surfaceItems[surface] = shownItems;
      surfaceRecommendations[surface] = shown;
      revision = result.revision;
      responseToken = result.responseToken;
      const attemptItems = Object.assign({}, ...Object.values(surfaceItems));
      if (snapshot.event === "complete" && result.responseId && (Object.keys(attemptItems).length > 0 || !(context.adminPreview || preview)) && Object.values(surfaceRecommendations).some((slots) => Object.keys(slots).length > 0) && isHtmlQuizTerminalStep(document2, snapshot.step)) {
        const { createResponseItemsData } = products ?? await __vitePreload(() => import("./quiz-renderer-recommendation-products-BwU65ujZ.js"), true ? __vite__mapDeps([13,7,1,5,14,15,10,16,17,11]) : void 0, import.meta.url);
        void createResponseItemsData(result.responseId, attemptItems, {
          shownRecommendations: Object.assign({}, ...Object.values(surfaceRecommendations)),
          revision,
          responseToken
        });
      }
      presentation.success(snapshot.slots, populated);
      blocked = false;
      status.setAttribute("role", "status");
      status.textContent = snapshot.event === "complete" ? runtimeMessage("quizComplete") : "";
    } catch (error) {
      const retryable = error instanceof TypeError;
      if (!stale(snapshot))
        retryError(
          (manual) => {
            if (manual) snapshot.hydrationRetries = 0;
            if (!stale(snapshot)) void hydrate(snapshot, result);
          },
          retryable,
          snapshot.hydrationRetries ?? 0
        );
      snapshot.hydrationRetries = (snapshot.hydrationRetries ?? 0) + 1;
    }
  };
  const prepare = (slots, failed) => {
    blocked = failed || slots.length > 0;
    if (!failed) {
      presentation.clear(slots);
      status.setAttribute("role", "status");
      status.textContent = "";
      slots.forEach((slot) => {
        const output = outputFor(slot);
        if (!output) return;
        output.setAttribute("aria-busy", "true");
        clearCards(slot);
        output.replaceChildren();
        showPlaceholders(slot, output).catch(() => {
        });
      });
    }
  };
  const clearResults = () => {
    cards.forEach((disposers) => disposers.forEach((dispose) => dispose()));
    cards.clear();
    outputs.forEach((output) => {
      output.removeAttribute("aria-busy");
      output.replaceChildren();
    });
    outputs.clear();
    presentation.dispose();
  };
  const addToCart = async (body) => {
    var _a;
    if (commerceHost === "preview" || commerceHost === "none") {
      console.warn(`quiz.addToCart: ${context.cartNotice ?? NO_CART_NOTICE}`);
      return void 0;
    }
    const commerce = await loadCommerce();
    const { response, added } = await requireValue(
      commerce.addItems,
      "Storefront commerce supports addItems"
    ).call(commerce, body);
    const step = (_a = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR)) == null ? void 0 : _a.dataset.step;
    for (const { variant, quantity } of added) productAdded(step ?? "", variant, quantity);
    return response;
  };
  return {
    hydrate,
    omitSlots(slots) {
      slots.forEach((slot) => {
        var _a;
        clearCards(slot);
        (_a = slotCards(slot)) == null ? void 0 : _a.replaceChildren();
      });
      presentation.success(slots, /* @__PURE__ */ new Set());
    },
    retainItems(surface) {
      surfaceItems = surface && surfaceItems[surface] ? { [surface]: surfaceItems[surface] } : {};
      surfaceRecommendations = surface && surfaceRecommendations[surface] ? { [surface]: surfaceRecommendations[surface] } : {};
    },
    async completeItems(responseId) {
      if (disposed || context.adminPreview || preview) return;
      const items = Object.assign({}, ...Object.values(surfaceItems));
      if (Object.values(surfaceRecommendations).some((slots) => Object.keys(slots).length > 0)) {
        const { createResponseItemsData } = await __vitePreload(async () => {
          const { createResponseItemsData: createResponseItemsData2 } = await import("./quiz-renderer-recommendation-products-BwU65ujZ.js");
          return { createResponseItemsData: createResponseItemsData2 };
        }, true ? __vite__mapDeps([13,7,1,5,14,15,10,16,17,11]) : void 0, import.meta.url);
        if (!disposed)
          await createResponseItemsData(responseId, items, {
            shownRecommendations: Object.assign({}, ...Object.values(surfaceRecommendations)),
            revision,
            responseToken
          });
      }
    },
    prepare,
    showError,
    tagCart,
    applyDiscountCode,
    navigate,
    addToCart,
    get blocked() {
      return blocked;
    },
    reset() {
      blocked = false;
      surfaceItems = {};
      surfaceRecommendations = {};
      revision = void 0;
      responseToken = void 0;
      clearResults();
      status.setAttribute("role", "status");
      status.textContent = "";
    },
    dispose() {
      disposed = true;
      clearResults();
      loadedCommerce == null ? void 0 : loadedCommerce.dispose();
      status.remove();
    }
  };
}
function withPageUtmParameters(url) {
  let destination;
  try {
    destination = new URL(url);
  } catch {
    return url;
  }
  if (!/^https?:$/.test(destination.protocol)) return url;
  const named = new Set([...destination.searchParams.keys()].map((key) => key.toLowerCase()));
  for (const [key, value] of new URLSearchParams(window.location.search))
    if (key.toLowerCase().startsWith("utm_") && !named.has(key.toLowerCase()))
      destination.searchParams.append(key, value);
  return destination.toString();
}
function installHtmlQuizResponses(kernel, context) {
  var _a;
  const { doc: document2 } = kernel;
  const { quizId } = context;
  let quizVersionId = ((_a = document2.querySelector('meta[name="quiz-version"]')) == null ? void 0 : _a.content) || void 0;
  let revision = 0;
  let disposed = false;
  let fingerprint = "";
  let complete = false;
  let completeAnnounced = false;
  let processing = false;
  let controller;
  let retryTimer;
  let inputTimer;
  let queued;
  let failed;
  const { preview } = context;
  const endpoint = preview ? PREVIEW_RECOMMENDATIONS_URL(preview.id) : GET_QUIZ_URL(
    encodeURIComponent(quizId),
    context.myshopifyDomain,
    void 0,
    context.shop
  ).replace(/(\?|$)/, "/html_recommendations$1");
  const headers = preview ? { "Content-Type": "application/json", "X-Preview-Key": preview.key } : { "Content-Type": "application/json" };
  const markCompleted = (id) => markHtmlQuizCompleted(quizId, id, context.adminPreview);
  const showError = (retry, retryable = false, attempts = 0) => {
    recommendations.showError(() => {
      clearTimeout(retryTimer);
      retry(true);
    });
    clearTimeout(retryTimer);
    if (retryable && attempts < 5) retryTimer = setTimeout(retry, 3e3 * 2 ** attempts);
  };
  const snapshotKey = (step, slots, answers, event, path) => JSON.stringify([
    path,
    step.dataset.step,
    slots.map((slot) => slot.dataset.slot),
    answers,
    event
  ]);
  const current = (snapshot) => {
    if (disposed || snapshot.key !== fingerprint) return false;
    const state = readQuizState(document2, kernel.run);
    return state.step === snapshot.step && snapshot.key === snapshotKey(
      snapshot.step,
      shownHtmlQuizSlots(snapshot.step),
      state.pathAnswers,
      snapshot.event,
      [...state.path ?? [snapshot.step.dataset.step]]
    );
  };
  const stale = (snapshot) => {
    if (current(snapshot)) return false;
    if (snapshot.key === fingerprint) fingerprint = "";
    return true;
  };
  const recommendations = installHtmlQuizRecommendations(kernel, context, {
    current,
    stale,
    retryError: showError
  });
  void recommendations.tagCart(kernel.run.responseId);
  const idleWaiters = [];
  const settle = () => {
    if (!processing && (failed || !queued)) idleWaiters.splice(0).forEach((resolve) => resolve());
  };
  const idle = () => new Promise((resolve) => {
    idleWaiters.push(resolve);
    settle();
  });
  const drain = async () => {
    if (disposed || processing || failed || !queued) return;
    const snapshot = queued;
    queued = void 0;
    processing = true;
    snapshot.body ?? (snapshot.body = buildHtmlQuizResponsePayload(snapshot, {
      quizVersionId,
      responseId: kernel.run.responseId,
      responseToken: kernel.run.responseToken,
      ...context.adminPreview ? { isAdminGenerated: true } : {}
    }));
    const request = controller = new AbortController();
    let retryable = true;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        signal: request.signal,
        body: JSON.stringify(snapshot.body)
      });
      retryable = response.status === 429 || response.status >= 500 && response.status < 600;
      if (!response.ok) throw new Error("Quiz save failed");
      const { parseRecommendationResponse } = await __vitePreload(async () => {
        const { parseRecommendationResponse: parseRecommendationResponse2 } = await import("./quiz-renderer-response-result-Btcv1_Hl.js");
        return { parseRecommendationResponse: parseRecommendationResponse2 };
      }, true ? __vite__mapDeps([18,19,1,10,11]) : void 0, import.meta.url);
      const result = parseRecommendationResponse(await response.json());
      if (request.signal.aborted) return;
      if (result.revision !== void 0 && result.revision !== snapshot.revision)
        throw new Error("Unexpected revision");
      if (result.responseId !== kernel.run.responseId) markCompleted(result.responseId);
      kernel.run.responseId = result.responseId;
      kernel.run.responseToken = result.responseToken;
      void recommendations.tagCart(kernel.run.responseId);
      quizVersionId = result.quizVersionId;
      recommendations.applyDiscountCode(snapshot.step, result);
      if (snapshot.event === "complete" && !completeAnnounced) {
        completeAnnounced = true;
        dispatchHtmlQuizEvent(document2, "quiz:complete", {
          step: snapshot.step.dataset.step,
          responseId: kernel.run.responseId
        });
      }
      void recommendations.hydrate(snapshot, result);
    } catch {
      if (!request.signal.aborted) {
        failed = snapshot;
        showError(
          (manual) => {
            if (disposed || failed !== snapshot) return;
            if (manual) snapshot.saveRetries = 0;
            failed = void 0;
            const later = queued;
            queued = snapshot;
            void drain();
            if (later) queued = later;
          },
          retryable,
          snapshot.saveRetries ?? 0
        );
        snapshot.saveRetries = (snapshot.saveRetries ?? 0) + 1;
      }
    } finally {
      processing = false;
      if (!failed) void drain();
      settle();
    }
  };
  const canSubmit = (state) => {
    var _a2;
    return Boolean((_a2 = state.step) == null ? void 0 : _a2.hasAttribute("data-send-answers")) || isHtmlQuizResult(state);
  };
  const capture = (event, state = readQuizState(document2, kernel.run), anyStep = false) => {
    if (disposed) return;
    const step = state.step;
    if (!step || !anyStep && !canSubmit(state) || state.invalidNames.length > 0) return;
    complete || (complete = event === "complete" && !kernel.run.readOnly);
    const slots = shownHtmlQuizSlots(step);
    const sections = shownSectionRefs(step);
    const answers = state.pathAnswers;
    const snapshotEvent = complete ? "complete" : "progress";
    return {
      key: snapshotKey(step, slots, answers, snapshotEvent, [
        ...state.path ?? [step.dataset.step]
      ]),
      step,
      slots,
      sections,
      path: [...state.path ?? [step.dataset.step]],
      answers,
      variableScores: state.scores,
      event: snapshotEvent
    };
  };
  const savedSlots = (saved, slots) => {
    var _a2;
    const result = {
      responseId: saved.responseId,
      recommendations: {},
      domain: saved.domain,
      storefrontAccessToken: saved.storefrontAccessToken ?? void 0,
      ...saved.products && { products: saved.products }
    };
    for (const slot of slots) {
      const block = slot.closest("[data-block]");
      const ref = slot.dataset.slot ?? "";
      const ids = (_a2 = saved.recommendations[(block == null ? void 0 : block.dataset.block) ?? ""]) == null ? void 0 : _a2[ref];
      if (!ids) continue;
      result.recommendations[ref] = ids;
    }
    return result;
  };
  const schedule = (snapshot) => {
    clearTimeout(inputTimer);
    if (disposed || snapshot.key === fingerprint) return;
    fingerprint = snapshot.key;
    revision = Math.max(revision + 1, Date.now());
    const next = { ...snapshot, revision };
    const saved = kernel.run.readOnly;
    if (!saved) queued = next;
    const { slots } = snapshot;
    recommendations.prepare(slots, Boolean(failed));
    if (!saved) return void drain();
    const result = savedSlots(saved, slots);
    recommendations.applyDiscountCode(snapshot.step, result);
    void recommendations.hydrate(next, result);
  };
  const refresh = (event = "progress", state) => {
    const snapshot = capture(event, state);
    if (snapshot) schedule(snapshot);
  };
  const refreshActiveStep = (state = readQuizState(document2, kernel.run)) => {
    const complete2 = htmlQuizCompletesOnRefresh(state);
    refresh(complete2 ? "complete" : "progress", state);
  };
  kernel.on("refreshed", ({ cause, snapshot: state, target }) => {
    var _a2;
    if (cause !== "input") return refreshActiveStep(state);
    if ((_a2 = target == null ? void 0 : target.closest) == null ? void 0 : _a2.call(target, htmlQuizBlockSelector("cards"))) return;
    const snapshot = capture("progress", state);
    if (!snapshot) return;
    clearTimeout(inputTimer);
    inputTimer = setTimeout(() => schedule(snapshot), 300);
  });
  let leaving = false;
  const goToUrl = async (link) => {
    const { navigate } = recommendations;
    if (context.preview || context.adminPreview) return navigate(link.href, link.target);
    if (leaving) return;
    const url = withPageUtmParameters(link.href);
    const newTab = link.target === "_blank";
    if (newTab) navigate(url, "_blank");
    else leaving = true;
    const state = readQuizState(document2, kernel.run);
    const snapshot = capture("complete", state, true);
    if (failed) {
      clearTimeout(retryTimer);
      queued ?? (queued = failed);
      failed = void 0;
    }
    if (snapshot) schedule(snapshot);
    void drain();
    const saved = idle().then(() => Boolean(kernel.run.responseId) && !failed);
    kernel.emit("redirected", { from: state.step, snapshot: state, saved });
    const done = saved.then(
      (ok) => ok ? recommendations.tagCart(kernel.run.responseId) : void 0
    );
    if (newTab) return;
    let timer;
    await Promise.race([done, new Promise((resolve) => timer = setTimeout(resolve, 3e3))]);
    clearTimeout(timer);
    leaving = false;
    if (!disposed) navigate(url);
  };
  kernel.on("retake", () => {
    controller == null ? void 0 : controller.abort();
    clearTimeout(inputTimer);
    clearTimeout(retryTimer);
    queued = failed = void 0;
    kernel.run.responseId = void 0;
    kernel.run.responseToken = void 0;
    fingerprint = "";
    complete = completeAnnounced = false;
    recommendations.reset();
  });
  kernel.on("destroy", () => {
    disposed = true;
    controller == null ? void 0 : controller.abort();
    clearTimeout(inputTimer);
    clearTimeout(retryTimer);
    recommendations.dispose();
  });
  return {
    addToCart: recommendations.addToCart,
    refresh,
    refreshActiveStep,
    // The mount refresh, called by the kernel runtime after installing.
    goToUrl,
    canNavigate: (action, state = readQuizState(document2, kernel.run)) => {
      if (action.dataset.goTo === "previous") return true;
      if (!canSubmit(state)) return true;
      refresh("progress", state);
      return !recommendations.blocked;
    }
  };
}
function markHtmlQuizCompleted(quizId, id, preview = false) {
  if (preview) return;
  try {
    localStorage.setItem(
      `revenuehunt-responseId-quiz_${quizId}`,
      JSON.stringify({ value: id, expiry: 3250368e7 })
    );
  } catch {
  }
}
const IMPLICIT_SUBMIT_TYPES = /* @__PURE__ */ new Set([
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "date",
  "month",
  "week",
  "time",
  "datetime-local",
  "number"
]);
function isStepForm(value) {
  return isElement(value) && value.localName === "form" && value.hasAttribute("data-step");
}
function installHtmlQuizKernelRuntime(document2, providedKernel, runtimeOptions = {}) {
  var _a, _b;
  const kernel = providedKernel ?? createHtmlQuizKernel(document2, runtimeOptions.run);
  nameHtmlQuizBlankLegendChoices(document2);
  let responses;
  const { history } = kernel.run;
  const initial = htmlQuizInitialStep(document2, kernel.state.initialStep);
  showHtmlQuizStep(document2, initial, kernel.run, { settles: false });
  const opening = resolveVisibleStep(document2, initial, initial, kernel.run);
  showHtmlQuizStep(document2, opening, kernel.run, { settles: false });
  if (!runtimeOptions.adminPreview && runtimeOptions.quizId)
    installHtmlQuizTracking(kernel, runtimeOptions.quizId);
  const inputValidation = installHtmlQuizInputValidation(document2, {
    ...runtimeOptions,
    // Like JSON's `navigationStates.length <= 0`; a response link's step has no back stack either.
    canGoBack: () => history.length > 0,
    onAsyncStateChange: () => {
      updateVisibility();
    }
  });
  const updateVisibility = (event, navigation) => {
    const snapshot = updateHtmlQuizVisibility(document2, kernel.run);
    inputValidation.refresh(snapshot);
    if (navigation) kernel.emit("navigated", { ...navigation, snapshot });
    kernel.emit("refreshed", { cause: event == null ? void 0 : event.type, snapshot, target: event == null ? void 0 : event.target });
    return snapshot;
  };
  const handleInput = (event) => {
    if (!isPickInput(event)) updateVisibility(event);
  };
  if (runtimeOptions.quizId && (!runtimeOptions.adminPreview || runtimeOptions.response)) {
    installHtmlQuizProgress(kernel, {
      quizId: runtimeOptions.quizId,
      response: runtimeOptions.response
    });
  }
  updateVisibility();
  installHtmlQuizAutoAdvance(kernel, Boolean(runtimeOptions.quizId), (action) => runAction(action));
  const retake = () => {
    const initial2 = htmlQuizInitialStep(document2, kernel.state.initialStep);
    const first = resolveVisibleStep(document2, initial2, initial2, kernel.run);
    if (!first) return;
    history.length = 0;
    kernel.emit("retake");
    if (goToHtmlQuizStep(document2, first, { settle: updateVisibility, run: kernel.run }))
      focusHtmlQuizStep(document2);
    else updateVisibility();
  };
  const runAction = (action) => {
    if (action.matches(":disabled")) return;
    const activeStep = action.closest("[data-step]") ?? document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR);
    const previous = action.dataset.goTo === "previous";
    const forward = !previous && action.dataset.goTo !== "retake" && action.localName !== "a";
    if (forward && activeStep && inputValidation.report(activeStep)) return;
    if (action.getAttribute("aria-disabled") === "true") return;
    if (action.dataset.goTo === "retake") {
      retake();
      return;
    }
    if (action.localName === "a") {
      const link = action;
      if (link.getAttribute("href")) void (responses == null ? void 0 : responses.goToUrl(link));
      return;
    }
    const settled = updateHtmlQuizVisibility(document2, kernel.run);
    if (responses && !responses.canNavigate(action, settled)) return;
    const { targetRef, stepRef } = previous ? htmlQuizBackStep(document2, activeStep, history) : htmlQuizForwardStep(document2, activeStep, action, history, kernel.run, settled);
    if (!stepRef) {
      if (htmlQuizCompletesOnAction(document2, activeStep, action, { targetRef, stepRef }))
        responses == null ? void 0 : responses.refresh("complete");
      return;
    }
    const direction = previous ? "previousQuestion" : "nextQuestion";
    const moved = goToHtmlQuizStep(document2, stepRef, {
      direction: previous ? "previous" : "next",
      run: kernel.run,
      settle: () => {
        updateVisibility(void 0, { direction, from: activeStep });
      }
    });
    if (moved) {
      focusHtmlQuizStep(document2);
    } else updateVisibility();
  };
  const handleClick = (event) => {
    const target = event.target;
    if (!isElement(target)) return;
    const action = target.closest("[data-action]");
    if (!action) return;
    const button = action;
    if (button.type === "submit" && isStepForm(button.form)) return;
    event.preventDefault();
    runAction(action);
  };
  const handleSubmit = (event) => {
    var _a2;
    if (!isStepForm(event.target)) return;
    event.preventDefault();
    const action = ((_a2 = event.submitter) == null ? void 0 : _a2.closest("[data-action]")) ?? htmlQuizContinueAction(document2);
    if (action) runAction(action);
  };
  const handleKeydown = (event) => {
    const field = event.target;
    if (event.key !== "Enter" || event.defaultPrevented || event.isComposing) return;
    if (!isElement(field) || field.localName !== "input") return;
    const { form, type } = field;
    if (!IMPLICIT_SUBMIT_TYPES.has(type) || !isStepForm(form)) return;
    if (Array.from(form.elements).some((element) => element.type === "submit"))
      return;
    event.preventDefault();
    const action = htmlQuizContinueAction(document2);
    if (action) runAction(action);
  };
  installHtmlQuizProductEvents(kernel);
  const removeExclusiveChoices = installHtmlQuizExclusiveChoices(document2);
  for (const step of document2.querySelectorAll("form[data-step]"))
    step.noValidate = true;
  document2.addEventListener("click", handleClick);
  document2.addEventListener("submit", handleSubmit);
  document2.addEventListener("keydown", handleKeydown);
  document2.addEventListener("input", handleInput);
  document2.addEventListener("change", updateVisibility);
  const { quizId, myshopifyDomain, shop, adminPreview, preview, cartNotice } = runtimeOptions;
  const platform = runtimeOptions.platform ?? ((_a = runtimeOptions.run) == null ? void 0 : _a.platform);
  if (quizId) {
    const context = { quizId, myshopifyDomain, shop, platform, adminPreview, preview, cartNotice };
    responses = installHtmlQuizResponses(kernel, context);
    responses.refreshActiveStep();
  }
  const host = document2.host;
  if (host)
    Object.defineProperties(host, {
      step: {
        configurable: true,
        get: () => {
          var _a2;
          return ((_a2 = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR)) == null ? void 0 : _a2.dataset.step) ?? null;
        }
      },
      addToCart: {
        configurable: true,
        value: async (body) => {
          if (responses) return responses.addToCart(body);
          console.warn(`quiz.addToCart: ${runtimeOptions.cartNotice ?? NO_CART_NOTICE}`);
        }
      }
    });
  dispatchHtmlQuizEvent(document2, "quiz:ready", {
    step: ((_b = document2.querySelector(HTML_QUIZ_ACTIVE_STEP_SELECTOR)) == null ? void 0 : _b.dataset.step) ?? null
  });
  return () => {
    document2.removeEventListener("click", handleClick);
    document2.removeEventListener("submit", handleSubmit);
    document2.removeEventListener("keydown", handleKeydown);
    document2.removeEventListener("input", handleInput);
    document2.removeEventListener("change", updateVisibility);
    removeExclusiveChoices();
    inputValidation.dispose();
    kernel.destroy();
    if (host) {
      delete host.step;
      delete host.addToCart;
    }
  };
}
const HTML_QUIZ_CSS_LAYER_ORDER = "@layer properties, theme, base, components, utilities;";
function isQuizScript(script) {
  var _a;
  return !/json$/i.test(((_a = script.getAttribute("type")) == null ? void 0 : _a.trim()) ?? "");
}
function runQuizScripts(host, scripts) {
  const created = scripts.map((source) => {
    var _a;
    const script = host.ownerDocument.createElement("script");
    for (const { name, value } of Array.from(source.attributes)) script.setAttribute(name, value);
    const code = source.textContent ?? "";
    const classic = !/^module$/i.test(((_a = source.getAttribute("type")) == null ? void 0 : _a.trim()) ?? "");
    if (source.hasAttribute("src")) script.async = false;
    else
      script.textContent = classic ? `(function (quiz, root) {
${code}
})(document.currentScript.parentNode, document.currentScript.parentNode.shadowRoot);` : code;
    host.append(script);
    return script;
  });
  return () => created.forEach((script) => script.remove());
}
const FONT_HOSTS = /^https:\/\/(fonts\.googleapis\.com|use\.typekit\.net|fonts\.bunny\.net|api\.fontshare\.com)\//i;
function hostCss(context) {
  const quizHeight = context.quizHeight ?? 0;
  const fixed = context.type === "inline" && context.quizInlineHeightEnabled && quizHeight > 0;
  const height = fixed ? `${quizHeight}${context.quizHeightUnit === "vh" ? "vh" : "px"}` : context.type === "modal" ? "100%" : "";
  return `${HTML_QUIZ_CSS_LAYER_ORDER}
@layer properties {
:host { display: block; width: 100%; box-sizing: border-box; touch-action: manipulation; position: relative; container: ${QUIZ_CONTAINER} / inline-size; --quiz-vh: 0px; font-size: 16px; line-height: normal; font-weight: 400; font-style: normal; letter-spacing: normal; word-spacing: normal; text-transform: none; text-align: start; text-indent: 0; }${height ? (
    // The popup or fixed box is the quiz's viewport: author `html { min-height: 100vh }` and
    // the like (now on :host) must not resize it.
    `
:host { container-type: size; height: ${height} !important; min-height: 0 !important; max-height: none !important; overflow: auto; --quiz-vh: 1cqh; }`
  ) : ""}
}`;
}
function embedPlaceholder(source, frame, context) {
  const placeholder = source.createElement("div");
  setQuizParts(placeholder, "embed-placeholder");
  const src = frame.getAttribute("src") ?? "";
  const host = URL.canParse(src) ? new URL(src).host : "";
  const [before, after = ""] = (context.embedNotice ?? "{host}").split("{host}");
  const link = source.createElement("a");
  link.href = src;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = host;
  const text = source.createElement("span");
  text.append(before, ...host ? [link] : [], after);
  placeholder.append(text);
  return placeholder;
}
function mountHtmlQuizDocument(host, html, context) {
  var _a, _b;
  const page = host.ownerDocument;
  const source = typeof html === "string" ? new DOMParser().parseFromString(html, "text/html") : html;
  applyHtmlQuizTranslations(
    source,
    context.locale ?? ((_a = page.defaultView) == null ? void 0 : _a.quiz_locale),
    (_b = page.defaultView) == null ? void 0 : _b.quiz_market_id
  );
  const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  const scripts = Array.from(source.querySelectorAll("script")).filter(isQuizScript);
  scripts.forEach((script) => script.remove());
  for (const frame of Array.from(source.querySelectorAll("iframe"))) {
    if (context.adminPreview) frame.replaceWith(embedPlaceholder(source, frame, context));
    else if (!context.customCode) frame.remove();
  }
  const pageNodes = [];
  const quizNodes = [];
  const hostStyle = page.createElement("style");
  hostStyle.textContent = hostCss(context);
  const stylesheet = (href) => {
    const link = page.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    (FONT_HOSTS.test(href) ? pageNodes : quizNodes).push(link);
  };
  for (const node of Array.from(source.head.children)) {
    if (node.localName === "style" && node.hasAttribute("data-page")) {
      pageNodes.push(node);
    } else if (node.localName === "link") {
      const href = node.href;
      if (/(^|\s)stylesheet(\s|$)/i.test(node.getAttribute("rel") ?? "") && href) stylesheet(href);
    } else {
      quizNodes.push(node);
    }
  }
  const body = page.createElement("div");
  for (const { name, value } of Array.from(source.body.attributes)) body.setAttribute(name, value);
  setQuizParts(body, "body");
  body.append(...Array.from(source.body.childNodes));
  const hostAttributes = ["lang", "dir"].filter(
    (name) => source.documentElement.hasAttribute(name) && !host.hasAttribute(name)
  );
  for (const name of hostAttributes) {
    const value = source.documentElement.getAttribute(name);
    if (value !== null) host.setAttribute(name, value);
  }
  page.head.append(...pageNodes);
  host.replaceChildren();
  root.replaceChildren(hostStyle, ...quizNodes, body);
  return {
    root,
    scripts,
    dispose() {
      pageNodes.forEach((node) => node.remove());
      root.replaceChildren();
      for (const name of hostAttributes) host.removeAttribute(name);
    }
  };
}
function mountHtmlQuiz(host, html, context) {
  var _a, _b, _c;
  const { root, scripts, dispose } = mountHtmlQuizDocument(host, html, context);
  let disposed = false;
  const { instanceId } = context;
  const post = (type, height) => {
    if (instanceId)
      postQuizRendererMessage({
        targetWindow: window,
        instanceId,
        rendererType: context.type,
        type,
        height
      });
  };
  const autoHeight = context.type === "inline" && !context.quizInlineHeightEnabled;
  let announcedResult;
  let announcedHeight;
  const resize = (state) => {
    if (disposed || !autoHeight || !isHtmlQuizResult(state ?? readQuizState(root))) return;
    const height = Math.ceil(host.getBoundingClientRect().height);
    if (height === announcedHeight) return;
    announcedHeight = height;
    post("resultsHeight", height);
  };
  const announceStep = (state) => {
    if (disposed) return;
    const result = isHtmlQuizResult(state);
    if (result !== announcedResult) {
      announcedResult = result;
      post(result ? "isResult" : "isQuestion");
    }
    resize(state);
  };
  const removeScripts = context.customCode ? runQuizScripts(host, scripts) : () => {
  };
  let runtime;
  try {
    const kernel = createHtmlQuizKernel(root, context.run);
    kernel.on("refreshed", ({ snapshot }) => announceStep(snapshot));
    kernel.on("navigated", ({ direction }) => post(direction));
    kernel.on("retake", () => post("scrollToTop"));
    runtime = installHtmlQuizKernelRuntime(root, kernel, {
      shopifyCountry: (_a = window.Shopify) == null ? void 0 : _a.country,
      adminPreview: context.adminPreview,
      quizId: context.target.slice(5),
      myshopifyDomain: context.myshopifyDomain,
      shop: context.shop,
      platform: context.platform ?? ((_b = context.run) == null ? void 0 : _b.platform),
      preview: context.preview,
      cartNotice: context.cartNotice,
      response: context.response,
      run: context.run
    });
  } catch (error) {
    if (!context.onError) throw error;
    context.onError(error instanceof Error ? error : new Error(String(error)));
  }
  const observer = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver(() => resize());
  observer == null ? void 0 : observer.observe(host);
  (_c = context.onReady) == null ? void 0 : _c.call(context);
  return () => {
    disposed = true;
    observer == null ? void 0 : observer.disconnect();
    runtime == null ? void 0 : runtime();
    removeScripts();
    dispose();
  };
}
const mount = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mountHtmlQuiz,
  mountHtmlQuizDocument
}, Symbol.toStringTag, { value: "Module" }));
export {
  HTML_QUIZ_ATTRIBUTE_DEFAULTS,
  HTML_QUIZ_CONTRACT_VERSIONS,
  HTML_QUIZ_ITEM_GID_PREFIXES,
  HTML_QUIZ_ORDER_STATUS_MESSAGES,
  createHtmlQuizKernel,
  defaultRecommendationTemplate,
  detectHtmlQuizCommerceHost,
  htmlQuizPageSource,
  htmlQuizResourceKind,
  htmlQuizTrackingSender,
  installHtmlQuizProductEvents,
  isHtmlQuizItemGid,
  isRecommendationMetafieldRef,
  isRecord,
  loadHtmlQuizCommerce,
  mount,
  mountHtmlQuiz,
  mountHtmlQuizDocument,
  readHtmlQuizRuntime,
  requireValue,
  setQuizParts
};

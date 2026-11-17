import { TRACKING_VISIT_URL, TRACKING_EVENT_URL } from "./quiz-renderer.js";
/*!
 * Ahoy.js v0.4.5
 * Simple, powerful JavaScript analytics
 * https://github.com/ankane/ahoy.js
 * MIT License
 */
var Cookies = {
  set: function(name, value, ttl, domain) {
    var expires = "";
    var cookieDomain = "";
    if (ttl) {
      var date = /* @__PURE__ */ new Date();
      date.setTime(date.getTime() + ttl * 60 * 1e3);
      expires = "; expires=" + date.toGMTString();
    }
    if (domain) {
      cookieDomain = "; domain=" + domain;
    }
    document.cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/; samesite=lax";
  },
  get: function(name) {
    var i, c;
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return unescape(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }
};
var config = {
  urlPrefix: "",
  visitsUrl: "/ahoy/visits",
  eventsUrl: "/ahoy/events",
  page: null,
  platform: "Web",
  useBeacon: true,
  startOnReady: true,
  trackVisits: true,
  cookies: true,
  cookieDomain: null,
  headers: {},
  visitParams: {},
  withCredentials: false,
  visitDuration: 4 * 60,
  // default 4 hours
  visitorDuration: 2 * 365 * 24 * 60
  // default 2 years
};
var ahoy = window.ahoy || window.Ahoy || {};
ahoy.configure = function(options) {
  for (var key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      config[key] = options[key];
    }
  }
};
ahoy.configure(ahoy);
var $ = window.jQuery || window.Zepto || window.$;
var visitId, visitorId, track;
var isReady = false;
var queue = [];
var canStringify = typeof JSON !== "undefined" && typeof JSON.stringify !== "undefined";
var eventQueue = [];
function visitsUrl() {
  return config.urlPrefix + config.visitsUrl;
}
function eventsUrl() {
  return config.urlPrefix + config.eventsUrl;
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function canTrackNow() {
  return (config.useBeacon || config.trackNow) && isEmpty(config.headers) && canStringify && typeof window.navigator.sendBeacon !== "undefined" && !config.withCredentials;
}
function serialize(object) {
  var data = new FormData();
  for (var key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      data.append(key, object[key]);
    }
  }
  return data;
}
function setCookie(name, value, ttl) {
  Cookies.set(name, value, ttl, config.cookieDomain || config.domain);
}
function getCookie(name) {
  return Cookies.get(name);
}
function destroyCookie(name) {
  Cookies.set(name, "", -1, config.cookieDomain || config.domain);
}
function log(message) {
  if (getCookie("ahoy_debug")) {
    window.console.log(message);
  }
}
function setReady() {
  var callback;
  while (callback = queue.shift()) {
    callback();
  }
  isReady = true;
}
ahoy.ready = function(callback) {
  if (isReady) {
    callback();
  } else {
    queue.push(callback);
  }
};
function matchesSelector(element, selector) {
  var matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
  if (matches) {
    if (matches.apply(element, [selector])) {
      return element;
    } else if (element.parentElement) {
      return matchesSelector(element.parentElement, selector);
    }
    return null;
  } else {
    log("Unable to match");
    return null;
  }
}
function onEvent(eventName, selector, callback) {
  document.addEventListener(eventName, function(e) {
    var matchedElement = matchesSelector(e.target, selector);
    if (matchedElement) {
      var skip = getClosest(matchedElement, "data-ahoy-skip");
      if (skip !== null && skip !== "false") {
        return;
      }
      callback.call(matchedElement, e);
    }
  });
}
function documentReady(callback) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    setTimeout(callback, 0);
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
function generateId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function saveEventQueue() {
  if (config.cookies && canStringify) {
    setCookie("ahoy_events", JSON.stringify(eventQueue), 1);
  }
}
function csrfToken() {
  var meta = document.querySelector("meta[name=csrf-token]");
  return meta && meta.content;
}
function csrfParam() {
  var meta = document.querySelector("meta[name=csrf-param]");
  return meta && meta.content;
}
function CSRFProtection(xhr) {
  var token = csrfToken();
  if (token) {
    xhr.setRequestHeader("X-CSRF-Token", token);
  }
}
function sendRequest(url, data, success) {
  if (canStringify) {
    if ($ && $.ajax) {
      $.ajax({
        type: "POST",
        url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: CSRFProtection,
        success,
        headers: config.headers,
        xhrFields: {
          withCredentials: config.withCredentials
        }
      });
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.withCredentials = config.withCredentials;
      xhr.setRequestHeader("Content-Type", "application/json");
      for (var header in config.headers) {
        if (Object.prototype.hasOwnProperty.call(config.headers, header)) {
          xhr.setRequestHeader(header, config.headers[header]);
        }
      }
      xhr.onload = function() {
        if (xhr.status === 200) {
          success();
        }
      };
      CSRFProtection(xhr);
      xhr.send(JSON.stringify(data));
    }
  }
}
function eventData(event) {
  var data = {
    events: [event]
  };
  if (config.cookies) {
    data.visit_token = event.visit_token;
    data.visitor_token = event.visitor_token;
  }
  delete event.visit_token;
  delete event.visitor_token;
  return data;
}
function trackEvent$1(event) {
  ahoy.ready(function() {
    sendRequest(eventsUrl(), eventData(event), function() {
      for (var i = 0; i < eventQueue.length; i++) {
        if (eventQueue[i].id === event.id) {
          eventQueue.splice(i, 1);
          break;
        }
      }
      saveEventQueue();
    });
  });
}
function trackEventNow(event) {
  ahoy.ready(function() {
    var data = eventData(event);
    var param = csrfParam();
    var token = csrfToken();
    if (param && token) {
      data[param] = token;
    }
    data.events_json = JSON.stringify(data.events);
    delete data.events;
    window.navigator.sendBeacon(eventsUrl(), serialize(data));
  });
}
function page() {
  return config.page || window.location.pathname;
}
function presence(str) {
  return str && str.length > 0 ? str : null;
}
function cleanObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  }
  return obj;
}
function eventProperties() {
  return cleanObject({
    tag: this.tagName.toLowerCase(),
    id: presence(this.id),
    "class": presence(this.className),
    page: page(),
    section: getClosest(this, "data-section")
  });
}
function getClosest(element, attribute) {
  for (; element && element !== document; element = element.parentNode) {
    if (element.hasAttribute(attribute)) {
      return element.getAttribute(attribute);
    }
  }
  return null;
}
function createVisit() {
  isReady = false;
  visitId = ahoy.getVisitId();
  visitorId = ahoy.getVisitorId();
  track = getCookie("ahoy_track");
  if (config.cookies === false || config.trackVisits === false) {
    log("Visit tracking disabled");
    setReady();
  } else if (visitId && visitorId && !track) {
    log("Active visit");
    setReady();
  } else {
    if (!visitId) {
      visitId = generateId();
      setCookie("ahoy_visit", visitId, config.visitDuration);
    }
    if (getCookie("ahoy_visit")) {
      log("Visit started");
      if (!visitorId) {
        visitorId = generateId();
        setCookie("ahoy_visitor", visitorId, config.visitorDuration);
      }
      var data = {
        visit_token: visitId,
        visitor_token: visitorId,
        platform: config.platform,
        landing_page: window.location.href,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        js: true
      };
      if (document.referrer.length > 0) {
        data.referrer = document.referrer;
      }
      for (var key in config.visitParams) {
        if (Object.prototype.hasOwnProperty.call(config.visitParams, key)) {
          data[key] = config.visitParams[key];
        }
      }
      log(data);
      sendRequest(visitsUrl(), data, function() {
        destroyCookie("ahoy_track");
        setReady();
      });
    } else {
      log("Cookies disabled");
      setReady();
    }
  }
}
ahoy.getVisitId = ahoy.getVisitToken = function() {
  return getCookie("ahoy_visit");
};
ahoy.getVisitorId = ahoy.getVisitorToken = function() {
  return getCookie("ahoy_visitor");
};
ahoy.reset = function() {
  destroyCookie("ahoy_visit");
  destroyCookie("ahoy_visitor");
  destroyCookie("ahoy_events");
  destroyCookie("ahoy_track");
  return true;
};
ahoy.debug = function(enabled) {
  if (enabled === false) {
    destroyCookie("ahoy_debug");
  } else {
    setCookie("ahoy_debug", "t", 365 * 24 * 60);
  }
  return true;
};
ahoy.track = function(name, properties) {
  var event = {
    name,
    properties: properties || {},
    time: (/* @__PURE__ */ new Date()).getTime() / 1e3,
    id: generateId(),
    js: true
  };
  ahoy.ready(function() {
    if (config.cookies && !ahoy.getVisitId()) {
      createVisit();
    }
    ahoy.ready(function() {
      log(event);
      event.visit_token = ahoy.getVisitId();
      event.visitor_token = ahoy.getVisitorId();
      if (canTrackNow()) {
        trackEventNow(event);
      } else {
        eventQueue.push(event);
        saveEventQueue();
        setTimeout(function() {
          trackEvent$1(event);
        }, 1e3);
      }
    });
  });
  return true;
};
ahoy.trackView = function(additionalProperties) {
  var properties = {
    url: window.location.href,
    title: document.title,
    page: page()
  };
  if (additionalProperties) {
    for (var propName in additionalProperties) {
      if (Object.prototype.hasOwnProperty.call(additionalProperties, propName)) {
        properties[propName] = additionalProperties[propName];
      }
    }
  }
  ahoy.track("$view", properties);
};
ahoy.trackClicks = function(selector) {
  if (selector === void 0) {
    throw new Error("Missing selector");
  }
  onEvent("click", selector, function(e) {
    var properties = eventProperties.call(this, e);
    properties.text = properties.tag === "input" ? this.value : (this.textContent || this.innerText || this.innerHTML).replace(/[\s\r\n]+/g, " ").trim();
    properties.href = this.href;
    ahoy.track("$click", properties);
  });
};
ahoy.trackSubmits = function(selector) {
  if (selector === void 0) {
    throw new Error("Missing selector");
  }
  onEvent("submit", selector, function(e) {
    var properties = eventProperties.call(this, e);
    ahoy.track("$submit", properties);
  });
};
ahoy.trackChanges = function(selector) {
  log("trackChanges is deprecated and will be removed in 0.5.0");
  if (selector === void 0) {
    throw new Error("Missing selector");
  }
  onEvent("change", selector, function(e) {
    var properties = eventProperties.call(this, e);
    ahoy.track("$change", properties);
  });
};
try {
  eventQueue = JSON.parse(getCookie("ahoy_events") || "[]");
} catch (e) {
}
for (var i = 0; i < eventQueue.length; i++) {
  trackEvent$1(eventQueue[i]);
}
ahoy.start = function() {
  createVisit();
  ahoy.start = function() {
  };
};
documentReady(function() {
  if (config.startOnReady) {
    ahoy.start();
  }
});
ahoy.configure({
  visitsUrl: TRACKING_VISIT_URL,
  eventsUrl: TRACKING_EVENT_URL,
  startOnReady: false,
  // trackVisits: false,
  // cookies: false,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});
let consentApiLoaded;
const loadConsentApi = (loadFeatures) => consentApiLoaded ?? (consentApiLoaded = new Promise((resolve) => {
  loadFeatures([{ name: "consent-tracking-api", version: "0.1" }], () => resolve());
}));
const analyticsAllowed = async () => {
  var _a, _b, _c;
  const loadFeatures = (_a = window.Shopify) == null ? void 0 : _a.loadFeatures;
  if (!loadFeatures) return true;
  await loadConsentApi(loadFeatures);
  try {
    return ((_c = (_b = window.Shopify) == null ? void 0 : _b.customerPrivacy) == null ? void 0 : _c.analyticsProcessingAllowed()) === true;
  } catch {
    return false;
  }
};
const trackEvent = async (name, properties = {}) => {
  if (typeof window === "undefined" || !await analyticsAllowed()) return;
  ahoy.start();
  ahoy.track(name, properties);
};
const GA4EventTypes = {
  QUIZ_STARTED: "quiz_started",
  //User starts a quiz (alias for consistency)
  QUESTION_VIEWED: "question_viewed",
  //User views a question
  BLOCK_ANSWERED: "block_answered",
  //User clicks on a choice
  EMAIL_LEAD: "email_lead",
  //User submits email
  PHONE_LEAD: "phone_lead",
  //User submits phone
  GENERATE_LEAD: "generate_lead",
  //Standard GA4 lead/conversion event
  RESULTS_PAGE_VIEWED: "results_page_viewed",
  //User gets to results page
  PRODUCT_RECOMMENDED: "product_recommended",
  //A certain product is recommended in the results page
  PRODUCT_CLICKED: "product_clicked",
  //Product is clicked
  PRODUCT_ADDED_TO_CART: "product_added_to_cart",
  //Customer adds a product to cart
  PROCEED_TO_CHECKOUT: "proceed_to_checkout",
  //Customer proceeds to checkout
  RETAKE_QUIZ: "quiz_retake_quiz"
  //Customer retakes the quiz
};
const GA4_MAX_PARAM_VALUE_LENGTH = 100;
const GA4_MAX_EVENT_NAME_LENGTH = 40;
const sanitizeForEventName = (text) => {
  let sanitized = text.toLowerCase().replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
  if (sanitized && !/^[a-z]/.test(sanitized)) {
    sanitized = "quiz_" + sanitized;
  }
  return sanitized || "unknown";
};
const generateDynamicEventName = (baseEvent, parameterValue) => {
  const sanitizedValue = sanitizeForEventName(parameterValue);
  const dynamicEventName = `${baseEvent}_${sanitizedValue}`;
  if (dynamicEventName.length <= GA4_MAX_EVENT_NAME_LENGTH) {
    return dynamicEventName;
  }
  const maxParameterLength = GA4_MAX_EVENT_NAME_LENGTH - baseEvent.length - 1;
  const truncatedValue = sanitizedValue.slice(0, maxParameterLength);
  return `${baseEvent}_${truncatedValue}`;
};
const generateEventNameByType = (eventName, eventData2) => {
  switch (eventName) {
    case GA4EventTypes.QUIZ_STARTED:
      return eventData2.quiz_name ? generateDynamicEventName("quiz_started", eventData2.quiz_name) : eventName;
    case GA4EventTypes.QUESTION_VIEWED:
      return eventData2.question_title ? generateDynamicEventName("question_viewed", eventData2.question_title) : eventName;
    case GA4EventTypes.BLOCK_ANSWERED:
      return eventData2.choice_text ? generateDynamicEventName("block_answered", eventData2.choice_text) : eventName;
    case GA4EventTypes.EMAIL_LEAD:
      return eventData2.quiz_name ? generateDynamicEventName("email_lead", eventData2.quiz_name) : eventName;
    case GA4EventTypes.PHONE_LEAD:
      return eventData2.quiz_name ? generateDynamicEventName("phone_lead", eventData2.quiz_name) : eventName;
    case GA4EventTypes.RESULTS_PAGE_VIEWED:
      return eventData2.results_page_title ? generateDynamicEventName("results_page_viewed", eventData2.results_page_title) : eventName;
    case GA4EventTypes.PRODUCT_RECOMMENDED:
      return eventData2.product_name ? generateDynamicEventName("product_recommended", eventData2.product_name) : eventName;
    case GA4EventTypes.PRODUCT_CLICKED:
      return eventData2.product_name ? generateDynamicEventName("product_clicked", eventData2.product_name) : eventName;
    case GA4EventTypes.PRODUCT_ADDED_TO_CART:
      return eventData2.product_name ? generateDynamicEventName("product_added_to_cart", eventData2.product_name) : eventName;
    case GA4EventTypes.PROCEED_TO_CHECKOUT:
      return eventData2.quiz_name ? generateDynamicEventName("proceed_to_checkout", eventData2.quiz_name) : eventName;
    case GA4EventTypes.RETAKE_QUIZ:
      return eventData2.quiz_name ? generateDynamicEventName("quiz_retake_quiz", eventData2.quiz_name) : eventName;
    default:
      return eventName;
  }
};
const validateGA4ParamValue = (value) => {
  if (typeof value !== "string") {
    return String(value).slice(0, GA4_MAX_PARAM_VALUE_LENGTH);
  }
  if (value.length <= GA4_MAX_PARAM_VALUE_LENGTH) {
    return value;
  }
  return value.slice(0, GA4_MAX_PARAM_VALUE_LENGTH - 3) + "...";
};
const validateGA4EventData = (eventData2) => {
  const validatedData = {};
  for (const [key, value] of Object.entries(eventData2)) {
    if (value !== null && value !== void 0) {
      validatedData[key] = validateGA4ParamValue(String(value));
    }
  }
  return validatedData;
};
const isGtagAvailable = () => {
  if (typeof window === "undefined") return false;
  return typeof window.gtag !== "undefined";
};
const trackGA4Event = (eventName, eventData2) => {
  var _a;
  if (typeof window === "undefined") {
    console.warn("GA4: Window object not available - tracking disabled");
    return;
  }
  if (!isGtagAvailable()) {
    console.warn("GA4: gtag not available - tracking disabled");
    return;
  }
  try {
    const validatedEventData = validateGA4EventData(eventData2);
    const finalEventName = generateEventNameByType(eventName, validatedEventData);
    console.log("GA4: Tracking event", {
      eventName: finalEventName,
      originalEventName: eventName,
      eventData: validatedEventData
    });
    (_a = window.gtag) == null ? void 0 : _a.call(window, "event", finalEventName, validatedEventData);
  } catch (error) {
    console.error("GA4: Failed to track event", {
      eventName,
      eventData: eventData2,
      error
    });
  }
};
const MetaEventTypes = {
  QUIZ_STARTED: "quiz_started",
  //User starts a quiz
  QUESTION_VIEWED: "question_viewed",
  //User views a question
  BLOCK_ANSWERED: "block_answered",
  //User clicks on a choice
  RESULTS_PAGE_VIEWED: "results_page_viewed",
  //User gets to results page
  RESULTS_PAGE_VIEWED_LEAD: "results_page_viewed_lead",
  //User views a lead result
  PRODUCT_CLICKED: "product_clicked",
  //A certain product is clicked in the results page
  PRODUCT_ADDED_TO_CART: "product_added_to_cart",
  //Customer adds a product to cart
  EMAIL_LEAD: "email_lead",
  //User submits email
  PHONE_LEAD: "phone_lead",
  //User submits phone
  RETAKE_QUIZ: "retake_quiz",
  //Customer retakes the quiz
  PROCEED_TO_CHECKOUT: "proceed_to_checkout"
  //Customer proceeds to checkout
};
const MetaEventFbqTypeMap = {
  QUIZ_STARTED: {
    fbq_action: "track",
    fbq_event: "ViewContent"
  },
  QUESTION_VIEWED: {
    fbq_action: "track",
    fbq_event: "ViewContent"
  },
  BLOCK_ANSWERED: {
    fbq_action: "track",
    fbq_event: "ViewContent"
  },
  EMAIL_LEAD: {
    fbq_action: "trackCustom",
    fbq_event: "EmailLead"
  },
  PHONE_LEAD: {
    fbq_action: "trackCustom",
    fbq_event: "PhoneLead"
  },
  RESULTS_PAGE_VIEWED: {
    fbq_action: "track",
    fbq_event: "ViewContent"
  },
  RESULTS_PAGE_VIEWED_LEAD: {
    fbq_action: "track",
    fbq_event: "Lead"
  },
  PRODUCT_CLICKED: {
    fbq_action: "track",
    fbq_event: "ViewContent"
  },
  PRODUCT_ADDED_TO_CART: {
    fbq_action: "track",
    fbq_event: "AddToCart"
  },
  PROCEED_TO_CHECKOUT: {
    fbq_action: "track",
    fbq_event: "InitiateCheckout"
  },
  RETAKE_QUIZ: {
    fbq_action: "trackCustom",
    fbq_event: "RetakeQuiz"
  }
};
const isMetaPixelAvailable = () => {
  if (typeof window === "undefined") return false;
  return typeof window.fbq !== "undefined";
};
const trackMetaEvent = (eventName, fbqParams) => {
  var _a;
  console.log("Meta Pixel: trackMetaEvent - params", {
    eventName,
    fbqParams
  });
  if (typeof window === "undefined") {
    console.warn("Meta Pixel: Window object not available - tracking disabled");
    return;
  }
  if (!isMetaPixelAvailable()) {
    console.warn("Meta Pixel: Meta Pixel not available - tracking disabled");
    return;
  }
  try {
    const metaEventObject = MetaEventFbqTypeMap[eventName.toUpperCase()];
    if (!metaEventObject) {
      console.error("Meta Pixel: Invalid event name", { eventName });
      return;
    }
    const { fbq_action, fbq_event } = metaEventObject;
    console.log("Meta Pixel: trackMetaEvent - fbq state", {
      fbq: window.fbq,
      fbq_action,
      fbq_event,
      fbqParams
    });
    console.log("Meta Pixel: trackMetaEvent - Sending event", {
      fbq_action,
      fbq_event,
      fbqParams
    });
    (_a = window.fbq) == null ? void 0 : _a.call(window, fbq_action, fbq_event, fbqParams);
  } catch (error) {
    console.error("Meta Pixel: Failed to track event", {
      eventName,
      error
    });
  }
};
const TiktokEventTypes = {
  QUIZ_STARTED: "quiz_started",
  //User starts a quiz
  QUESTION_VIEWED: "question_viewed",
  //User views a question
  BLOCK_ANSWERED: "block_answered",
  //User clicks on a choice
  RESULTS_PAGE_VIEWED: "results_page_viewed",
  //User gets to results page
  RESULTS_PAGE_VIEWED_LEAD: "results_page_viewed_lead",
  //User views a lead result
  PRODUCT_CLICKED: "product_clicked",
  //A certain product is clicked in the results page
  PRODUCT_ADDED_TO_CART: "product_added_to_cart",
  //Customer adds a product to cart
  EMAIL_LEAD: "email_lead",
  //User submits email
  PHONE_LEAD: "phone_lead",
  //User submits phone
  RETAKE_QUIZ: "retake_quiz",
  //Customer retakes the quiz
  PROCEED_TO_CHECKOUT: "proceed_to_checkout"
  //Customer proceeds to checkout
};
const TiktokEventFbqTypeMap = {
  QUIZ_STARTED: {
    ttq_event: "ViewContent"
  },
  QUESTION_VIEWED: {
    ttq_event: "ViewContent"
  },
  BLOCK_ANSWERED: {
    ttq_event: "ViewContent"
  },
  EMAIL_LEAD: {
    ttq_event: "Lead"
  },
  PHONE_LEAD: {
    ttq_event: "Lead"
  },
  RESULTS_PAGE_VIEWED: {
    ttq_event: "ViewContent"
  },
  RESULTS_PAGE_VIEWED_LEAD: {
    ttq_event: "Lead"
  },
  PRODUCT_CLICKED: {
    ttq_event: "ViewContent"
  },
  PRODUCT_ADDED_TO_CART: {
    ttq_event: "AddToCart"
  },
  PROCEED_TO_CHECKOUT: {
    ttq_event: "InitiateCheckout"
  },
  RETAKE_QUIZ: {
    ttq_event: "RetakeQuiz"
    // custom event for reporting
  }
};
const trackTiktokEvent = (eventName, tiktokParams, _tiktokPixelIdFromStore) => {
  if (typeof window === "undefined") {
    console.warn("TikTok Pixel: Window object not available - tracking disabled");
    return;
  }
  const ttq = window.ttq;
  if (!ttq || typeof ttq.track !== "function") {
    console.log("TikTok Pixel: ttq not available - skipping event tracking");
    return;
  }
  try {
    const normalizedKey = Object.keys(TiktokEventTypes).includes(eventName.toUpperCase()) ? eventName.toUpperCase() : (Object.keys(TiktokEventTypes).find((k) => TiktokEventTypes[k] === eventName) || eventName).toUpperCase();
    const tiktokEventObject = TiktokEventFbqTypeMap[normalizedKey];
    if (!tiktokEventObject) {
      console.error("TikTok Pixel: Invalid event name", { eventName });
      return;
    }
    const { ttq_event } = tiktokEventObject;
    console.log("TikTok Pixel: Sending event", {
      ttq_event,
      tiktokParams
    });
    if (typeof (ttq == null ? void 0 : ttq.track) === "function") {
      ttq.track(ttq_event, tiktokParams);
    } else {
      ttq == null ? void 0 : ttq("track", ttq_event, tiktokParams);
    }
  } catch (error) {
    console.error("TikTok Pixel: Failed to track event", {
      eventName,
      error
    });
  }
};
const channelProperties = (channel) => channel ? { channel } : {};
const trackQuizStart = (quizId, quizName, preferences, channel, version = {}) => {
  trackEvent(quizId, { type: "quiz-start", ...channelProperties(channel), ...version });
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.QUIZ_STARTED, { quiz_name: quizName });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.QUIZ_STARTED.toUpperCase(), {
      content_name: quizName,
      content_category: "quiz"
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.QUIZ_STARTED,
      { content_name: "Start Quiz: " + quizName, content_id: quizId },
      preferences.tiktokPixelId
    );
  }
};
const trackQuestionViewed = (ref, title, preferences) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.QUESTION_VIEWED, { question_title: title });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.QUESTION_VIEWED.toUpperCase(), {
      content_name: title,
      content_category: "question"
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.QUESTION_VIEWED,
      { content_name: "Question Viewed: " + title, content_id: ref },
      preferences.tiktokPixelId
    );
  }
};
const trackBlocksAnswered = (quizId, answeredBlocks, preferences, ref, questionTitle) => {
  answeredBlocks.forEach(({ value }) => {
    if (preferences.trackGA4Events) {
      trackGA4Event(GA4EventTypes.BLOCK_ANSWERED, {
        choice_text: value,
        question_title: questionTitle,
        question_ref: ref
      });
    }
    if (preferences.trackMetaPixel) {
      trackMetaEvent(MetaEventTypes.BLOCK_ANSWERED.toUpperCase(), {
        content_name: value,
        content_category: "choice"
      });
    }
    if (preferences.trackTiktokPixel) {
      trackTiktokEvent(
        TiktokEventTypes.BLOCK_ANSWERED,
        { content_name: "Choice Selected: " + value, content_id: ref },
        preferences.tiktokPixelId
      );
    }
  });
};
const trackEmailSubmitted = (quizName, preferences) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.EMAIL_LEAD, { quiz_name: quizName });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.EMAIL_LEAD.toUpperCase(), {
      content_name: quizName,
      content_category: "lead"
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(TiktokEventTypes.EMAIL_LEAD, {}, preferences.tiktokPixelId);
  }
};
const trackPhoneSubmitted = (quizName, preferences) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.PHONE_LEAD, { quiz_name: quizName });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.PHONE_LEAD.toUpperCase(), {
      content_name: quizName,
      content_category: "lead"
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(TiktokEventTypes.PHONE_LEAD, {}, preferences.tiktokPixelId);
  }
};
const trackQuizCompletionConversion = (quizName, preferences) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.GENERATE_LEAD, { quiz_name: quizName });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.RESULTS_PAGE_VIEWED_LEAD.toUpperCase(), {});
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.RESULTS_PAGE_VIEWED_LEAD,
      {},
      preferences.tiktokPixelId
    );
  }
};
const trackResultViewed = (ref, title, preferences, quizName = title) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.RESULTS_PAGE_VIEWED, { results_page_title: title });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.RESULTS_PAGE_VIEWED.toUpperCase(), {
      content_name: title,
      content_category: "results"
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.RESULTS_PAGE_VIEWED,
      { content_name: "Results Page Viewed: " + title, content_id: ref },
      preferences.tiktokPixelId
    );
  }
  trackQuizCompletionConversion(quizName, preferences);
};
const trackProductClicked = (quizId, resultRef, productVariant, preferences, channel) => {
  trackEvent(`${quizId}_flow`, {
    type: `${resultRef}=>product-clicked`,
    productVariantId: productVariant.id,
    ...channelProperties(channel)
  });
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.PRODUCT_CLICKED, { product_name: productVariant.title });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.PRODUCT_CLICKED.toUpperCase(), {
      content_name: productVariant.title,
      content_type: "recommendation",
      content_ids: [productVariant.id],
      value: productVariant.price.amount,
      currency: productVariant.price.currencyCode
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.PRODUCT_CLICKED,
      {
        content_name: productVariant.title,
        content_type: "product",
        content_ids: [productVariant.id],
        value: productVariant.price.amount,
        currency: productVariant.price.currencyCode
      },
      preferences.tiktokPixelId
    );
  }
};
const trackProductAddedToCart = (quizId, productVariant, quizPageRef, preferences, channel) => {
  trackEvent(`${quizId}_flow`, {
    type: `${quizPageRef}=>product-added-to-cart`,
    ...channelProperties(channel)
  });
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.PRODUCT_ADDED_TO_CART, { product_name: productVariant.title });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.PRODUCT_ADDED_TO_CART.toUpperCase(), {
      content_name: productVariant.title,
      content_type: "recommendation",
      content_ids: [productVariant.id],
      value: productVariant.price.amount,
      currency: productVariant.price.currencyCode
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.PRODUCT_ADDED_TO_CART,
      {
        content_name: productVariant.title,
        content_type: "product",
        content_ids: [productVariant.id],
        value: productVariant.price.amount,
        currency: productVariant.price.currencyCode
      },
      preferences.tiktokPixelId
    );
  }
};
const trackCustomerProceedToCheckout = (numItems, currency, value, quizName, preferences) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.PROCEED_TO_CHECKOUT, { quiz_name: quizName });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.PROCEED_TO_CHECKOUT.toUpperCase(), {
      num_items: numItems,
      currency,
      value
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.PROCEED_TO_CHECKOUT,
      { num_items: numItems, currency, value },
      preferences.tiktokPixelId
    );
  }
};
const trackRetakeQuiz = (quizName, quizId, preferences) => {
  if (preferences.trackGA4Events) {
    trackGA4Event(GA4EventTypes.RETAKE_QUIZ, { quiz_name: quizName });
  }
  if (preferences.trackMetaPixel) {
    trackMetaEvent(MetaEventTypes.RETAKE_QUIZ.toUpperCase(), {
      content_name: quizName,
      content_category: "quiz"
    });
  }
  if (preferences.trackTiktokPixel) {
    trackTiktokEvent(
      TiktokEventTypes.RETAKE_QUIZ,
      { content_name: "Retake Quiz: " + quizName, content_id: quizId },
      preferences.tiktokPixelId
    );
  }
};
const trackQuizCompletedWithRedirect = trackQuizCompletionConversion;
const trackFlowEvent = (quizId, origin, destination, channel) => {
  trackEvent(`${quizId}_flow`, {
    type: `${origin}=>${destination}`,
    ...channelProperties(channel)
  });
};
const trackQuizComplete = (quizId, channel, version = {}) => {
  trackEvent(quizId, { type: "quiz-finish", ...channelProperties(channel), ...version });
};
const tracking = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  trackBlocksAnswered,
  trackCustomerProceedToCheckout,
  trackEmailSubmitted,
  trackFlowEvent,
  trackPhoneSubmitted,
  trackProductAddedToCart,
  trackProductClicked,
  trackQuestionViewed,
  trackQuizComplete,
  trackQuizCompletedWithRedirect,
  trackQuizCompletionConversion,
  trackQuizStart,
  trackResultViewed,
  trackRetakeQuiz
}, Symbol.toStringTag, { value: "Module" }));
const trackersBundle = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GA4EventTypes,
  MetaEventTypes,
  TiktokEventTypes,
  trackGA4Event,
  trackMetaEvent,
  trackTiktokEvent
}, Symbol.toStringTag, { value: "Module" }));
export {
  trackBlocksAnswered,
  trackCustomerProceedToCheckout,
  trackEmailSubmitted,
  trackFlowEvent,
  trackPhoneSubmitted,
  trackProductAddedToCart,
  trackProductClicked,
  trackQuizComplete,
  trackQuizCompletedWithRedirect,
  trackQuizStart,
  trackRetakeQuiz,
  trackersBundle,
  tracking
};

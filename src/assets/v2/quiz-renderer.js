const __vite__fileDeps=["./quiz-renderer-json-renderer-svqC5ToN.js","./quiz-renderer-index-BXMeXr7c.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-country-data-CuDUzlny.js","./quiz-renderer.1794996922386.css","./quiz-renderer-mount-D_6h3far.js","./quiz-renderer-has-variant-choice-Bygb1hHs.js","./quiz-renderer-assistant-mount-BsjhN9D5.js","./quiz-renderer-currency-helper-ggAAwMUm.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.all(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
          link.crossOrigin = "";
        }
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  return promise.then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
var define_process_env_default = { SENTRY_DSN: "https://16cc640050247046527b6063591a7ca4@o4508088844288000.ingest.us.sentry.io/4508089422446592", SHOPIFY_API_KEY: "57bfaa64a84131f7b589ab638dac5714", API_URL: "http://localhost:3003", REMIX_BASENAME: "/v2", NODE_ENV: "development" };
function mapToPublicEnvironment(processEnv, previewParents = []) {
  return {
    VOICE_ASSETS_URL: processEnv.VOICE_ASSETS_URL || "",
    PREVIEW_URL: processEnv.PREVIEW_URL || "",
    PREVIEW_PARENTS: previewParents.join(","),
    API_URL: processEnv.API_URL || "",
    PUBLIC_QUIZ_API_URL: processEnv.PUBLIC_QUIZ_API_URL || "",
    REMIX_BASENAME: processEnv.REMIX_BASENAME || "",
    SENTRY_DSN: processEnv.SENTRY_DSN || "",
    SHOPIFY_APP_ID: processEnv.SHOPIFY_APP_ID || "",
    SHOPIFY_API_KEY: processEnv.SHOPIFY_API_KEY || "",
    COMMIT_SHA: processEnv.COMMIT_SHA || ""
  };
}
function getPublicEnvironment() {
  const isClient = typeof window !== "undefined";
  if (isClient) {
    const revenueHuntEnv = window.REVENUE_HUNT_ENV;
    return revenueHuntEnv ?? mapToPublicEnvironment(define_process_env_default);
  }
  const processEnv = define_process_env_default;
  return { ...mapToPublicEnvironment(processEnv) };
}
function getPublicEnvironmentVariables(variables = []) {
  const envVariables = getPublicEnvironment();
  const isClient = typeof window !== "undefined";
  const environment = isClient ? "client" : "server";
  const isDevelopment = true;
  const isLocalhost = isClient && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  const variablesToReturn = variables.reduce(
    (acc, variable) => {
      const variableValue = envVariables[variable] || "";
      if (!variableValue && !isLocalhost && !isDevelopment) {
        const baseMessage = `Environment variable "${variable}" not found in ${environment}.`;
        const details = isClient ? "It might not be available in the browser because it's not a public variable or it might be missing from the .env file." : "Please check if it's defined in the .env file.";
        console.info(`${baseMessage} ${details}`);
      }
      return { ...acc, [variable]: variableValue };
    },
    {}
  );
  return variablesToReturn;
}
function getPublicEnvironmentVariable(variable) {
  return getPublicEnvironmentVariables([variable])[variable];
}
const API_URL = getPublicEnvironmentVariable("PUBLIC_QUIZ_API_URL") || getPublicEnvironmentVariable("API_URL");
const UPDATE_CART_URL = (responseId) => {
  return `${API_URL}/api/responses/${responseId}/cart`;
};
const CREATE_RESPONSE_ITEMS_DATA_URL = (responseId) => {
  return `${API_URL}/api/responses/${responseId}/items_data`;
};
const CREATE_RESPONSE_URL = (quizId, myshopifyDomain, shop) => {
  const params = new URLSearchParams();
  if (myshopifyDomain) {
    params.set("myshopify_domain", myshopifyDomain);
  }
  const query = params.toString();
  return `${API_URL}/api/quizzes/${quizId}/responses${query ? `?${query}` : ""}`;
};
const GET_QUIZ_URL = (quizId, myshopifyDomain, group, shop) => {
  const params = new URLSearchParams();
  if (myshopifyDomain) {
    params.set("myshopify_domain", myshopifyDomain);
  }
  if (shop) params.set("shop", shop);
  if (group) params.set("group", group);
  const query = params.toString();
  return `${API_URL}/api/quizzes/${quizId}${query ? `?${query}` : ""}`;
};
const GET_RESPONSE_URL = (responseId, myshopifyDomain, shop) => {
  const params = new URLSearchParams();
  if (myshopifyDomain) {
    params.set("myshopify_domain", myshopifyDomain);
  }
  const query = params.toString();
  return `${API_URL}/api/responses/${responseId}${query ? `?${query}` : ""}`;
};
const ASSISTANT_URL = (assistantId, myshopifyDomain, shop) => `${API_URL}/api/assistants/${encodeURIComponent(assistantId)}?${new URLSearchParams({ ...myshopifyDomain && { myshopify_domain: myshopifyDomain }, ...shop && { shop } })}`;
const ASSISTANT_TURN_URL = (assistantId, myshopifyDomain, shop) => `${API_URL}/api/assistants/${encodeURIComponent(assistantId)}/turn?${new URLSearchParams({ ...myshopifyDomain && { myshopify_domain: myshopifyDomain }, ...shop && { shop } })}`;
const PREVIEW_URL = (previewId) => `${API_URL}/api/previews/${encodeURIComponent(previewId)}`;
const PREVIEW_RECOMMENDATIONS_URL = (previewId) => `${PREVIEW_URL(previewId)}/recommendations`;
const TRACKING_EVENT_URL = `${API_URL}/a/e`;
const TRACKING_VISIT_URL = `${API_URL}/a/v`;
function readArtifactBody(body, contentType) {
  let source = body.trim();
  const mime = contentType.split(";")[0].trim().toLowerCase();
  if (source.startsWith("{") || source.startsWith("[")) {
    const quiz = JSON.parse(source);
    if (quiz && typeof quiz === "object" && "format" in quiz && quiz.format === "html") {
      if (!("html" in quiz) || typeof quiz.html !== "string")
        throw new Error("Unsupported quiz artifact");
      source = quiz.html.trim();
    } else {
      return { format: "json", quiz };
    }
  }
  if (mime === "text/html" || source.startsWith("<")) {
    const document2 = new DOMParser().parseFromString(source, "text/html");
    const runtime = document2.querySelector('script#quiz-runtime[type="application/json"]');
    const initialStep = runtime ? JSON.parse(runtime.textContent || "{}").initialStep : null;
    const steps = Array.from(document2.querySelectorAll("body > main > [data-step]"));
    if (typeof initialStep === "string" && steps.some((step) => step.getAttribute("data-step") === initialStep)) {
      return { format: "html", html: source, document: document2 };
    }
  }
  throw new Error("Unsupported quiz artifact");
}
async function fetchOk(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}
async function fetchShopifyFile(fileUrl, signal) {
  const url = new URL(fileUrl);
  const isShopifyFile = url.host === "cdn.shopify.com" || url.host === window.location.host && url.pathname.startsWith("/cdn/shop/files/");
  if (url.protocol !== "https:" || !isShopifyFile) throw new Error("Untrusted quiz file URL");
  const response = await fetch(url.href, { signal, redirect: "error" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}
const renderers = {
  json: () => __vitePreload(() => import("./quiz-renderer-json-renderer-svqC5ToN.js").then((n) => n.jsonRenderer), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0, import.meta.url),
  html: () => __vitePreload(() => import("./quiz-renderer-mount-D_6h3far.js").then((n) => n.mount), true ? __vite__mapDeps([8,9,5]) : void 0, import.meta.url)
};
async function loadQuiz(context, signal) {
  var _a, _b;
  const [, kind, id] = /^(quiz_|response-)(.+)$/.exec(context.target) ?? [];
  if (!id) throw new Error("Invalid quiz target");
  if (kind === "quiz_") return loadArtifact(id, context.myshopifyDomain, signal);
  const response = await (await fetchOk(GET_RESPONSE_URL(id, context.myshopifyDomain), signal)).json();
  const quizId = response.quizId ?? ((_a = response.quiz) == null ? void 0 : _a.id);
  if (quizId)
    (_b = window.revenueHuntSetStorage) == null ? void 0 : _b.call(window, `revenuehunt-popup-already-shown-quiz_${quizId}`, true, 1);
  if (!response.quizId || !/^[A-Za-z0-9]+$/.test(response.quizId))
    return { format: "json", response };
  const artifact = await loadArtifact(
    response.quizId,
    context.myshopifyDomain,
    signal,
    response.experimentGroup ?? "control"
  );
  if (artifact.format !== "html") throw new Error("Expected an HTML quiz");
  return { ...artifact, response };
}
const GROUP_DAYS = 90;
function visitorGroup(experiment) {
  const key = `revenuehunt-experiment-${experiment.id}`;
  let group;
  try {
    const stored = JSON.parse(localStorage.getItem(key) ?? "null");
    if (stored && Date.now() <= stored.expiry) group = stored.value;
  } catch {
    group = null;
  }
  if (group !== "control" && group !== "treatment") {
    group = Math.random() * 100 < 100 - experiment.trafficSplit ? "control" : "treatment";
    try {
      const expiry = Date.now() + GROUP_DAYS * 24 * 60 * 60 * 1e3;
      localStorage.setItem(key, JSON.stringify({ value: group, expiry }));
    } catch {
    }
  }
  return group;
}
async function loadArtifact(quizId, myshopifyDomain, signal, responseGroup, store) {
  var _a, _b, _c, _d, _e, _f, _g;
  const experiment = store ? (_a = store.copy) == null ? void 0 : _a.experiment : (_b = window.quizExperiments) == null ? void 0 : _b[`quiz_${quizId}`];
  const group = responseGroup ?? (experiment ? visitorGroup(experiment) : "control");
  const shopifyUrl = store ? group === "control" ? (_c = store.copy) == null ? void 0 : _c.src : (_d = store.copy) == null ? void 0 : _d.treatmentSrc : group === "control" ? (_e = window.quizUrls) == null ? void 0 : _e[`quiz_${quizId}`] : (_g = (_f = window.quizExperiments) == null ? void 0 : _f[`quiz_${quizId}`]) == null ? void 0 : _g.treatmentUrl;
  let pathname;
  try {
    pathname = shopifyUrl ? new URL(shopifyUrl).pathname : void 0;
  } catch {
    pathname = void 0;
  }
  const format = pathname && (/\.html\.json$/.test(pathname) ? "html" : /\.json$/.test(pathname) ? "json" : null);
  if (format) renderers[format]().catch(() => {
  });
  const backendUrl = GET_QUIZ_URL(
    quizId,
    myshopifyDomain,
    group === "control" ? void 0 : group,
    store == null ? void 0 : store.shop
  );
  const urls = shopifyUrl ? [shopifyUrl, backendUrl] : [backendUrl];
  for (const [index, url] of urls.entries()) {
    try {
      const response = url === shopifyUrl && !store ? await fetchShopifyFile(url, signal) : await fetchOk(url, signal);
      const artifact = readArtifactBody(
        await response.text(),
        response.headers.get("content-type") || ""
      );
      if (artifact.format === "html") return { format: "html", document: artifact.document };
      const { parseJsonQuiz } = await renderers.json();
      signal.throwIfAborted();
      return { format: "json", quiz: parseJsonQuiz(artifact.quiz) };
    } catch (error) {
      if (signal.aborted || index === urls.length - 1) throw error;
      console.warn(
        "[QuizRenderer] Stored artifact unavailable; falling back to the shop-scoped API",
        error
      );
    }
  }
  throw new Error("Quiz artifact unavailable");
}
const OVER_PLAN_MAX_COUNTDOWN = 10;
function overPlanSeconds(overPlanAt, now = Date.now()) {
  if (!overPlanAt) return 0;
  const t = Date.parse(overPlanAt);
  if (Number.isNaN(t)) return 0;
  const diffDays = Math.floor((now - t) / (1e3 * 86400));
  return diffDays >= 12 ? diffDays - 12 + 3 : 0;
}
const OVER_PLAN_COPY = {
  blocked: {
    title: "This quiz isn't accepting new responses",
    body: "Please get in touch with us to unblock it"
  },
  countdown: {
    title: (seconds) => `This quiz will be unblocked in ${seconds} seconds`,
    body: "Please get in touch with us to remove the countdown"
  }
};
async function overPlanGate(host, overPlanAt, signal, kind, locale) {
  let seconds = overPlanSeconds(overPlanAt);
  if (seconds <= 0) return true;
  const { loadOverPlanCopy } = await __vitePreload(async () => {
    const { loadOverPlanCopy: loadOverPlanCopy2 } = await import("./quiz-renderer-over-plan-copy-Ba9e3rM2.js");
    return { loadOverPlanCopy: loadOverPlanCopy2 };
  }, true ? [] : void 0, import.meta.url);
  const copy = await loadOverPlanCopy(kind, locale);
  if (signal.aborted) return false;
  const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  const show = (title, body) => {
    const box = document.createElement("div");
    box.style.cssText = "padding: 40px 16px; text-align: center;";
    const heading = document.createElement("p");
    heading.style.cssText = "font-size: 18px; font-weight: 700; margin: 0 0 10px;";
    heading.textContent = title;
    const text = document.createElement("p");
    text.style.cssText = "font-size: 14px; margin: 0;";
    text.textContent = body;
    box.append(heading, text);
    root.replaceChildren(box);
    host.removeAttribute("aria-busy");
  };
  if (seconds > OVER_PLAN_MAX_COUNTDOWN) {
    show(copy.blocked.title, copy.blocked.body);
    return false;
  }
  for (; seconds > 0; seconds--) {
    show(copy.countdown.title(seconds), copy.countdown.body);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (signal.aborted) return false;
  }
  return true;
}
class QuizRenderer extends HTMLElement {
  constructor() {
    super(...arguments);
    __publicField(this, "request");
    __publicField(this, "unmount");
  }
  connectedCallback() {
    var _a, _b, _c;
    (_a = this.request) == null ? void 0 : _a.abort();
    (_b = this.unmount) == null ? void 0 : _b.call(this);
    this.unmount = void 0;
    const request = new AbortController();
    this.request = request;
    const type = this.getAttribute("type") === "inline" ? "inline" : "modal";
    const instanceId = this.getAttribute("data-quiz-instance-id") || `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this.setAttribute("data-quiz-instance-id", instanceId);
    const context = {
      target: this.getAttribute("target") || "",
      type,
      instanceId,
      quizInlineHeightEnabled: this.getAttribute("quiz-fixed-height") === "true",
      quizHeight: parseInt(this.getAttribute("quiz-height") || "0"),
      quizHeightUnit: this.getAttribute("quiz-height-unit") || "px",
      overPlanAt: this.getAttribute("over-plan-at") || void 0,
      executeCustomFeatures: ((_c = this.getAttribute("execute-custom-features")) == null ? void 0 : _c.toLowerCase()) !== "false",
      myshopifyDomain: this.getAttribute("myshopify-domain") || void 0
    };
    this.setAttribute("aria-busy", "true");
    void this.mount(context, request);
  }
  async mount(context, request) {
    var _a;
    const locale = window.quiz_locale;
    const assistantId = (_a = /^assistant_(.+)$/.exec(context.target)) == null ? void 0 : _a[1];
    try {
      if (assistantId) {
        this.classList.add("needsclick");
        if (!await overPlanGate(this, context.overPlanAt, request.signal, "assistant", locale))
          return;
        if (!context.myshopifyDomain) throw new Error("A shop assistant needs its shop");
        if (!this.getAttribute("assistant")) this.setAttribute("assistant", "chat");
        const { mountShopAssistant } = await __vitePreload(async () => {
          const { mountShopAssistant: mountShopAssistant2 } = await import("./quiz-renderer-assistant-mount-BsjhN9D5.js");
          return { mountShopAssistant: mountShopAssistant2 };
        }, true ? __vite__mapDeps([10,8,9,5,11]) : void 0, import.meta.url);
        const unmount = await mountShopAssistant(
          this,
          assistantId,
          { ...context, myshopifyDomain: context.myshopifyDomain, proxy: true },
          request.signal
        );
        if (request.signal.aborted) return unmount();
        this.unmount = unmount;
        this.removeAttribute("aria-busy");
        return;
      }
      const loaded = await loadQuiz(context, request.signal);
      if (request.signal.aborted) return;
      if (loaded.format === "html") {
        this.classList.add("needsclick");
        if (!await overPlanGate(this, context.overPlanAt, request.signal, "quiz", locale)) return;
        const { mountHtmlQuiz } = await __vitePreload(async () => {
          const { mountHtmlQuiz: mountHtmlQuiz2 } = await import("./quiz-renderer-mount-D_6h3far.js").then((n) => n.mount);
          return { mountHtmlQuiz: mountHtmlQuiz2 };
        }, true ? __vite__mapDeps([8,9,5]) : void 0, import.meta.url);
        if (request.signal.aborted) return;
        this.unmount = mountHtmlQuiz(this, loaded.document, {
          ...context,
          target: loaded.response ? `quiz_${loaded.response.quizId}` : context.target,
          customCode: context.executeCustomFeatures !== false,
          response: loaded.response
        });
      } else {
        const { mountJsonQuiz } = await __vitePreload(async () => {
          const { mountJsonQuiz: mountJsonQuiz2 } = await import("./quiz-renderer-json-renderer-svqC5ToN.js").then((n) => n.jsonRenderer);
          return { mountJsonQuiz: mountJsonQuiz2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0, import.meta.url);
        if (request.signal.aborted) return;
        this.unmount = mountJsonQuiz(this, context, loaded);
      }
      this.removeAttribute("aria-busy");
    } catch (error) {
      if (request.signal.aborted) return;
      console.error(`[QuizRenderer] Failed to load ${assistantId ? "assistant" : "quiz"}`, error);
      const { mountMissingQuiz } = await __vitePreload(async () => {
        const { mountMissingQuiz: mountMissingQuiz2 } = await import("./quiz-renderer-json-renderer-svqC5ToN.js").then((n) => n.jsonRenderer);
        return { mountMissingQuiz: mountMissingQuiz2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0, import.meta.url);
      let title;
      if (assistantId) {
        const { loadOverPlanCopy } = await __vitePreload(async () => {
          const { loadOverPlanCopy: loadOverPlanCopy2 } = await import("./quiz-renderer-over-plan-copy-Ba9e3rM2.js");
          return { loadOverPlanCopy: loadOverPlanCopy2 };
        }, true ? [] : void 0, import.meta.url);
        title = (await loadOverPlanCopy("assistant", locale)).blocked.title;
      }
      if (request.signal.aborted) return;
      this.removeAttribute("aria-busy");
      this.unmount = mountMissingQuiz(this, title);
    }
  }
  disconnectedCallback() {
    var _a, _b;
    (_a = this.request) == null ? void 0 : _a.abort();
    (_b = this.unmount) == null ? void 0 : _b.call(this);
    this.unmount = void 0;
  }
}
if (!customElements.get("quiz-renderer")) customElements.define("quiz-renderer", QuizRenderer);
const mountStorefront = () => {
  if (document.querySelector("#prq-v2-store"))
    void __vitePreload(async () => {
      const { mountStorefrontQuizzes } = await import("./quiz-renderer-storefront-loader-Iy8vIUto.js");
      return { mountStorefrontQuizzes };
    }, true ? [] : void 0, import.meta.url).then(
      ({ mountStorefrontQuizzes }) => mountStorefrontQuizzes()
    );
};
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", mountStorefront, { once: true });
else mountStorefront();
export {
  ASSISTANT_TURN_URL,
  ASSISTANT_URL,
  CREATE_RESPONSE_ITEMS_DATA_URL,
  CREATE_RESPONSE_URL,
  GET_QUIZ_URL,
  GET_RESPONSE_URL,
  OVER_PLAN_COPY,
  OVER_PLAN_MAX_COUNTDOWN,
  PREVIEW_RECOMMENDATIONS_URL,
  TRACKING_EVENT_URL,
  TRACKING_VISIT_URL,
  UPDATE_CART_URL,
  __vitePreload,
  getPublicEnvironment,
  getPublicEnvironmentVariable,
  loadArtifact,
  overPlanGate,
  overPlanSeconds
};

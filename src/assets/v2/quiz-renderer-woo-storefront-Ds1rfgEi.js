const __vite__fileDeps=["./quiz-renderer-storefront-reporter-BOMu-Y8J.js","./quiz-renderer.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { loadArtifact, overPlanGate, __vitePreload } from "./quiz-renderer.js";
import { mountHtmlQuiz } from "./quiz-renderer-mount-D_glRQuD.js";
import { mountHtmlQuizAssistant, mountShopAssistant } from "./quiz-renderer-assistant-mount-C5gNNRop.js";
import "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-currency-helper-ggAAwMUm.js";
function getStorage(key) {
  try {
    const item = JSON.parse(localStorage.getItem(key) || "null");
    return item && Date.now() <= item.expiry ? item.value : null;
  } catch {
    return null;
  }
}
function setStorage(key, value, days) {
  try {
    localStorage.setItem(key, JSON.stringify({ value, expiry: Date.now() + days * 864e5 }));
  } catch {
  }
}
const popupCss = `
#prq-quiz-container { position:fixed; inset:0; width:100%; height:100%; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,.5); z-index:var(--quiz-z-index,100); overflow:auto; touch-action:manipulation; }
#prq-quiz-container .quiz-content { position:relative; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,.1); width:var(--quiz-width,100%); height:var(--quiz-height,100%); max-height:100%; overflow:auto; background:white; z-index:var(--quiz-content-z-index,101); }
#prq-quiz-container .close-btn { position:absolute; top:10px; right:10px; background:none; border:0; padding:0; font-size:32px; line-height:32px; cursor:pointer; color:var(--close-btn-color,#777); z-index:var(--close-btn-z-index,102); }
@media(max-width:768px) { #prq-quiz-container .quiz-content { width:var(--quiz-width-mobile,var(--quiz-width,100%)); height:var(--quiz-height-mobile,var(--quiz-height,100%)); } }
body.revenuehunt-popup-open .react-dropdown-select-dropdown { z-index:var(--quiz-dropdown-z-index,103)!important; }
`;
function installStorefrontPieces(root, store, mountQuiz) {
  var _a, _b, _c;
  const controller = new AbortController();
  const { signal } = controller;
  const style = document.createElement("style");
  style.textContent = popupCss;
  document.head.append(style);
  let popup;
  let activeId;
  let openedByUrl = false;
  let releasePopup;
  let opener = null;
  const shownKey = (id) => `revenuehunt-popup-already-shown-quiz_${id}`;
  const completed = (id) => getStorage(`revenuehunt-responseId-quiz_${id}`);
  const close = (clearHash = true) => {
    if (!popup) return;
    popup.remove();
    popup = void 0;
    activeId = void 0;
    releasePopup == null ? void 0 : releasePopup();
    releasePopup = void 0;
    document.body.classList.remove("revenuehunt-popup-open");
    document.body.style.removeProperty("--quiz-dropdown-z-index");
    opener == null ? void 0 : opener.focus();
    if (clearHash && /^#quiz(?:-[A-Za-z0-9]+)?$/.test(location.hash))
      history.replaceState(null, "", location.pathname + location.search);
  };
  const open = (id, config = {}, source = "click") => {
    if (!id) return;
    setStorage(shownKey(id), true, 1);
    if (popup && source === "automatic") return;
    close(false);
    opener = document.activeElement;
    popup = document.createElement("div");
    const current = popup;
    activeId = id;
    openedByUrl = source === "url";
    popup.id = "prq-quiz-container";
    popup.className = "needsclick";
    popup.dataset.popupOwner = "woocommerce";
    const z = config.zIndex ?? 100;
    popup.style.setProperty("--quiz-z-index", String(z));
    popup.style.setProperty("--quiz-content-z-index", String(z + 1));
    popup.style.setProperty("--close-btn-z-index", String(z + 2));
    popup.style.setProperty("--close-btn-color", config.closeColor || "#777777");
    document.body.style.setProperty("--quiz-dropdown-z-index", String(z + 3));
    for (const [key, value] of Object.entries({
      width: config.width,
      height: config.height,
      "width-mobile": config.mobileWidth,
      "height-mobile": config.mobileHeight
    })) {
      const size = parseInt(value || "", 10);
      if (size > 0) popup.style.setProperty(`--quiz-${key}`, `${Math.min(size, 100)}%`);
    }
    const content = document.createElement("div");
    content.className = "quiz-content needsclick";
    content.setAttribute("role", "dialog");
    content.setAttribute("aria-modal", "true");
    content.setAttribute("aria-label", "Quiz");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "close-btn";
    button.setAttribute("aria-label", "Close quiz");
    button.textContent = "×";
    button.addEventListener("click", () => close());
    const host = document.createElement("div");
    host.style.cssText = "display:block;width:100%;height:100%";
    host.dataset.prqPopupQuiz = id;
    content.append(button, host);
    popup.append(content);
    popup.addEventListener("click", (event) => {
      if (event.target === current) close();
    });
    document.body.classList.add("revenuehunt-popup-open");
    document.body.append(popup);
    button.focus();
    void mountQuiz(host, id, "modal").then((dispose) => {
      if (popup !== current) dispose == null ? void 0 : dispose();
      else releasePopup = dispose;
    });
  };
  const focusables = (node) => Array.from(node.querySelectorAll("*")).flatMap((el) => [
    ...el.matches(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    ) && !el.closest("[inert]") && el.getClientRects().length ? [el] : [],
    ...el.shadowRoot ? focusables(el.shadowRoot) : []
  ]);
  document.addEventListener(
    "keydown",
    (event) => {
      var _a2, _b2;
      if (!popup) return;
      if (event.key === "Escape" && !event.defaultPrevented && !event.isComposing && event.keyCode !== 229 && !event.composedPath().some(
        (el) => el instanceof Element && el.matches(
          'select,.react-dropdown-select-dropdown,.react-dropdown-select[aria-expanded="true"]'
        )
      ))
        close();
      if (event.key !== "Tab") return;
      const items = focusables(popup);
      let active = document.activeElement;
      while ((_a2 = active == null ? void 0 : active.shadowRoot) == null ? void 0 : _a2.activeElement) active = active.shadowRoot.activeElement;
      const index = items.indexOf(active);
      if (index < 0 || (event.shiftKey ? index === 0 : index === items.length - 1)) {
        event.preventDefault();
        (_b2 = event.shiftKey ? items.at(-1) : items[0]) == null ? void 0 : _b2.focus();
      }
    },
    { signal }
  );
  const targetFromHash = (hash) => /^#quiz(?:-([A-Za-z0-9]+))?$/.exec(hash);
  const linksEnabled = ((_a = store.siteWide) == null ? void 0 : _a.popupLinks) || Array.from(root.querySelectorAll("a.wp-element-button[href]")).some((a) => {
    const url = new URL(a.href, location.href);
    return url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && targetFromHash(url.hash);
  });
  if (linksEnabled) {
    const sync = () => {
      const match = targetFromHash(location.hash);
      const id = match && (match[1] || store.defaultQuiz);
      if (id && !(openedByUrl && activeId === id)) open(id, {}, "url");
      else if (!id && openedByUrl) close(false);
    };
    document.addEventListener(
      "click",
      (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
        if (!anchor || anchor.hasAttribute("download") || anchor.target && anchor.target !== "_self")
          return;
        const url = new URL(anchor.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !targetFromHash(url.hash))
          return;
        event.preventDefault();
        if (location.hash !== url.hash) history.pushState(null, "", url.hash);
        sync();
      },
      { signal }
    );
    window.addEventListener("hashchange", sync, { signal });
    window.addEventListener("popstate", sync, { signal });
    sync();
  }
  const piece = (name, siteWide) => {
    const block = root.querySelector(`[data-prq-piece="${name}"]`);
    return block ? JSON.parse(block.dataset.prqConfig || "{}") : (siteWide == null ? void 0 : siteWide.enabled) ? siteWide : void 0;
  };
  const chat = piece("chatButton", (_b = store.siteWide) == null ? void 0 : _b.chatButton);
  const chatId = chat && (chat.quizId || store.defaultQuiz);
  let chatHost;
  if (chat && chatId && !(chat.hideAfterCompletion && completed(chatId))) {
    chatHost = document.createElement("div");
    const left = chat.position === "bottom-left";
    chatHost.style.cssText = `position:fixed;bottom:20px;${left ? "left" : "right"}:20px;z-index:98;display:flex;align-items:center;gap:10px;flex-direction:${left ? "row" : "row-reverse"}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "revenuehunt-chat";
    button.setAttribute("aria-label", "Open quiz");
    button.style.cssText = "position:relative;display:grid;place-items:center;width:50px;height:50px;padding:12px;border:0;border-radius:25px;cursor:pointer;color:white;box-shadow:0 0 3px rgba(0,0,0,.1)";
    button.style.backgroundColor = chat.color || "#000000";
    button.innerHTML = '<svg viewBox="0 0 24 24" width="25" height="25" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
    let dot;
    if (chat.showDot !== false && getStorage("revenuehunt-notification-closed") !== "true") {
      dot = document.createElement("span");
      dot.className = "revenuehunt-dot";
      dot.style.cssText = "position:absolute;right:0;top:0;width:10px;height:10px;background:#f50;border:2px solid white;border-radius:10px;box-sizing:content-box";
      button.append(dot);
    }
    chatHost.append(button);
    let greeting;
    const dismissGreeting = () => {
      greeting == null ? void 0 : greeting.remove();
      setStorage("revenuehunt-greeting-closed", "true", 7);
    };
    if (chat.greeting && getStorage("revenuehunt-greeting-closed") !== "true") {
      greeting = document.createElement("div");
      greeting.className = "revenuehunt-greeting";
      greeting.style.cssText = "padding:8px;background:white;color:#666;font:12px Helvetica,Arial,sans-serif;border:1px solid #eee;border-radius:6px;box-shadow:0 0 3px rgba(0,0,0,.1)";
      greeting.textContent = chat.greeting + " ";
      const dismiss = document.createElement("button");
      dismiss.type = "button";
      dismiss.textContent = "×";
      dismiss.setAttribute("aria-label", "Dismiss greeting");
      dismiss.style.cssText = "border:0;background:none;color:inherit;cursor:pointer;padding:0 4px";
      dismiss.addEventListener("click", dismissGreeting);
      greeting.append(dismiss);
      chatHost.append(greeting);
    }
    button.addEventListener("click", () => {
      dismissGreeting();
      dot == null ? void 0 : dot.remove();
      setStorage("revenuehunt-notification-closed", "true", 7);
      open(chatId, chat, "chat");
    });
    document.body.append(chatHost);
    if (chat.hideAfterCompletion)
      document.addEventListener(
        "quiz:complete",
        () => {
          if (completed(chatId)) chatHost == null ? void 0 : chatHost.remove();
        },
        { signal }
      );
  }
  const automatic = piece("automaticPopup", (_c = store.siteWide) == null ? void 0 : _c.automaticPopup);
  const autoId = automatic && (automatic.quizId || store.defaultQuiz);
  let timer;
  if (automatic && autoId) {
    const suppressed = () => getStorage(shownKey(autoId)) || completed(autoId);
    if (!suppressed()) {
      const startKey = `revenuehunt-popup-start-time-quiz_${autoId}`;
      if (!getStorage(startKey)) setStorage(startKey, Math.floor(Date.now() / 1e3), 1);
      const trigger = () => {
        if (!suppressed()) open(autoId, automatic, "automatic");
      };
      timer = setInterval(() => {
        const elapsed = Date.now() / 1e3 - Number(getStorage(startKey));
        if (elapsed >= (automatic.delaySeconds ?? 5)) trigger();
      }, 1e3);
      if (automatic.exitIntent)
        document.addEventListener(
          "mouseout",
          (event) => {
            if (event.relatedTarget === null && event.clientY <= 0) trigger();
          },
          { signal }
        );
    }
  }
  return () => {
    controller.abort();
    clearInterval(timer);
    close(false);
    chatHost == null ? void 0 : chatHost.remove();
    style.remove();
  };
}
const RUNTIME = 1;
const mounted = /* @__PURE__ */ new WeakSet();
function mountQuizAwaitingPreviewHostFrame(host, page, options) {
  return mountHtmlQuiz(host, page, options);
}
async function mountWooStorefront(root) {
  var _a, _b, _c;
  const script = root.querySelector("#prq-v2-store");
  if (!script || mounted.has(script)) return;
  const store = JSON.parse(script.textContent || "{}");
  if (!((_a = store.shop) == null ? void 0 : _a.startsWith("wc-"))) throw new Error("Invalid WooCommerce storefront shop");
  mounted.add(script);
  const request = new AbortController();
  const cleanups = /* @__PURE__ */ new Set();
  const context = {
    shop: store.shop,
    platform: "woocommerce",
    locale: store.locale
  };
  const report = (error) => {
    if (request.signal.aborted) return;
    void __vitePreload(async () => {
      const { reportStorefrontError } = await import("./quiz-renderer-storefront-reporter-BOMu-Y8J.js");
      return { reportStorefrontError };
    }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then(({ reportStorefrontError }) => reportStorefrontError(error, store.shop, "woocommerce")).catch(() => {
    });
  };
  const mountQuiz = async (host, id, type) => {
    const controller = new AbortController();
    const abort = () => controller.abort();
    request.signal.addEventListener("abort", abort, { once: true });
    let unmount;
    const dispose = () => {
      controller.abort();
      unmount == null ? void 0 : unmount();
      request.signal.removeEventListener("abort", abort);
      cleanups.delete(dispose);
    };
    cleanups.add(dispose);
    host.setAttribute("aria-busy", "true");
    host.classList.add("needsclick");
    try {
      const copy = store.quizzes[id];
      const loaded = await loadArtifact(id, void 0, controller.signal, void 0, {
        shop: store.shop,
        copy
      });
      if (loaded.format !== "html") throw new Error("WooCommerce requires an HTML quiz");
      if (!await overPlanGate(
        host,
        store.overPlanAt ?? void 0,
        controller.signal,
        "quiz",
        store.locale
      ))
        return dispose;
      if (controller.signal.aborted || !host.isConnected) return dispose;
      const height = /^(\d+(?:\.\d+)?)(px|vh)?$/.exec(host.dataset.prqHeight || "600px");
      const options = {
        ...context,
        target: `quiz_${id}`,
        type,
        instanceId: `woo-${crypto.randomUUID()}`,
        quizInlineHeightEnabled: host.hasAttribute("data-prq-fixed-height"),
        quizHeight: height ? Number(height[1]) : 600,
        quizHeightUnit: (height == null ? void 0 : height[2]) || "px",
        customCode: !store.customFeaturesBlockedAt
      };
      if (host.hasAttribute("data-prq-full-width")) {
        host.style.width = "100%";
        host.style.maxWidth = "none";
      }
      unmount = (copy == null ? void 0 : copy.scripts) || ((copy == null ? void 0 : copy.runtime) ?? RUNTIME) > RUNTIME ? mountQuizAwaitingPreviewHostFrame(host, loaded.document, options) : mountHtmlQuiz(host, loaded.document, options);
    } catch (error) {
      if (!controller.signal.aborted) {
        report(error);
        host.textContent = "Quiz unavailable. Please try again later.";
      }
    } finally {
      host.removeAttribute("aria-busy");
    }
    return dispose;
  };
  const mountAssistant = async (host, id) => {
    var _a2, _b2;
    if (!id) return;
    host.setAttribute("assistant", "chat");
    try {
      if (!await overPlanGate(
        host,
        store.overPlanAt ?? void 0,
        request.signal,
        "assistant",
        store.locale
      ))
        return;
      if (request.signal.aborted) return;
      const src = (_b2 = (_a2 = store.assistants) == null ? void 0 : _a2[id]) == null ? void 0 : _b2.src;
      let page;
      if (src) {
        try {
          const response = await fetch(src, { signal: request.signal });
          if (!response.ok) throw new Error(`Assistant copy: HTTP ${response.status}`);
          const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
          if (!parsed.querySelector('script#quiz-runtime[type="application/json"]'))
            throw new Error("Invalid assistant shell");
          page = parsed;
        } catch (error) {
          if (request.signal.aborted) throw error;
          console.warn("[WooStorefront] Stored assistant unavailable; falling back to V2", error);
        }
      }
      if (request.signal.aborted) return;
      const options = { ...context, type: "inline", target: `assistant_${id}` };
      const unmount = page ? mountHtmlQuizAssistant(host, page, { ...options, assistant: { id } }) : await mountShopAssistant(host, id, options, request.signal);
      if (request.signal.aborted) unmount();
      else cleanups.add(unmount);
    } catch (error) {
      report(error);
    }
  };
  cleanups.add(installStorefrontPieces(root, store, mountQuiz));
  const placements = [];
  for (const host of root.querySelectorAll("[data-prq-quiz]")) {
    const id = host.dataset.prqQuiz || store.defaultQuiz;
    if (id) placements.push(mountQuiz(host, id, "inline"));
  }
  for (const host of root.querySelectorAll("[data-prq-assistant]"))
    placements.push(
      mountAssistant(host, host.dataset.prqAssistant || store.defaultAssistant || "")
    );
  if (((_c = (_b = store.siteWide) == null ? void 0 : _b.assistant) == null ? void 0 : _c.enabled) && store.defaultAssistant) {
    const host = document.createElement("div");
    host.setAttribute("placement", "bubble");
    document.body.append(host);
    cleanups.add(() => host.remove());
    placements.push(mountAssistant(host, store.defaultAssistant));
  }
  await Promise.all(placements);
  return () => {
    request.abort();
    for (const cleanup of cleanups) cleanup();
    mounted.delete(script);
  };
}
export {
  mountWooStorefront
};

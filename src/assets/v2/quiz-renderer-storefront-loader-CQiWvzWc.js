const __vite__fileDeps=["./quiz-renderer-woo-storefront-Bm04bKB1.js","./quiz-renderer.js","./quiz-renderer-mount-D_glRQuD.js","./quiz-renderer-has-variant-choice-Bygb1hHs.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-assistant-mount-C5gNNRop.js","./quiz-renderer-currency-helper-ggAAwMUm.js","./quiz-renderer-storefront-reporter-BOMu-Y8J.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload, GET_QUIZ_URL, readArtifactBody } from "./quiz-renderer.js";
import { mountHtmlQuiz } from "./quiz-renderer-mount-D_glRQuD.js";
import { mountShopAssistant } from "./quiz-renderer-assistant-mount-C5gNNRop.js";
import "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-currency-helper-ggAAwMUm.js";
const mounted = /* @__PURE__ */ new WeakSet();
const assistants = /* @__PURE__ */ new Set();
async function mountStorefrontQuizzes(root = document) {
  if (root.querySelector("#prq-v2-store")) {
    const { mountWooStorefront } = await __vitePreload(async () => {
      const { mountWooStorefront: mountWooStorefront2 } = await import("./quiz-renderer-woo-storefront-Bm04bKB1.js");
      return { mountWooStorefront: mountWooStorefront2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0, import.meta.url);
    return mountWooStorefront(root);
  }
  for (const host of root.querySelectorAll("[data-prq-shop][data-prq-quiz]")) {
    const shop = host.dataset.prqShop ?? "";
    const id = host.dataset.prqQuiz ?? "";
    const platform = shop.startsWith("wc-") ? "woocommerce" : shop.startsWith("st-") ? "standalone" : void 0;
    if (!platform || !id || mounted.has(host)) continue;
    const label = platform === "woocommerce" ? "WooCommerce" : "Standalone";
    const report = (error) => {
      void __vitePreload(async () => {
        const { reportStorefrontError } = await import("./quiz-renderer-storefront-reporter-BOMu-Y8J.js");
        return { reportStorefrontError };
      }, true ? __vite__mapDeps([7,1]) : void 0, import.meta.url).then(({ reportStorefrontError }) => reportStorefrontError(error, shop, platform)).catch(() => {
      });
    };
    mounted.add(host);
    const context = {
      shop,
      platform,
      target: `quiz_${id}`,
      type: "inline"
    };
    try {
      const response = await fetch(GET_QUIZ_URL(id, void 0, void 0, shop));
      if (!response.ok) throw new Error(`${label} quiz: HTTP ${response.status}`);
      const artifact = readArtifactBody(
        await response.text(),
        response.headers.get("content-type") ?? ""
      );
      if (artifact.format !== "html") throw new Error(`${label} requires an HTML quiz`);
      mountHtmlQuiz(host, artifact.document, { ...context, customCode: true });
    } catch (error) {
      report(error);
      throw error;
    }
    if (platform === "standalone" && !assistants.has(shop)) {
      assistants.add(shop);
      const assistant = document.createElement("div");
      assistant.setAttribute("assistant", "chat");
      assistant.setAttribute("placement", "bubble");
      document.body.append(assistant);
      try {
        await mountShopAssistant(assistant, "live", { ...context, target: "assistant_live" });
      } catch (error) {
        report(error);
        throw error;
      }
    }
  }
}
export {
  mountStorefrontQuizzes
};

const __vite__fileDeps=["./quiz-renderer-woo-storefront-D-eYWh8I.js","./quiz-renderer.js","./quiz-renderer-mount-D_6h3far.js","./quiz-renderer-has-variant-choice-Bygb1hHs.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-assistant-mount-BsjhN9D5.js","./quiz-renderer-currency-helper-ggAAwMUm.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload } from "./quiz-renderer.js";
async function mountStorefrontQuizzes(root = document) {
  if (root.querySelector("#prq-v2-store")) {
    const { mountWooStorefront } = await __vitePreload(async () => {
      const { mountWooStorefront: mountWooStorefront2 } = await import("./quiz-renderer-woo-storefront-D-eYWh8I.js");
      return { mountWooStorefront: mountWooStorefront2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0, import.meta.url);
    return mountWooStorefront(root);
  }
}
export {
  mountStorefrontQuizzes
};

import { __vitePreload } from "./quiz-renderer.js";
const supportedLngs = [
  "en",
  "fr",
  "es",
  "de",
  "it",
  "nl",
  "pt",
  "pl",
  "nb",
  "da",
  "sv",
  "he",
  "ar",
  "fa",
  "fi",
  "cs",
  "ko",
  "th",
  "tr",
  "ja",
  "zh",
  "zh-TW",
  "sl",
  "ro",
  "al",
  "lt",
  "ru",
  "bg",
  "el",
  "id",
  "yue",
  "hi",
  "bn",
  "pa",
  "ur",
  "vi",
  "uk",
  "hu",
  "hr",
  "sr",
  "bs",
  "mk",
  "ps",
  "ku"
];
const completeTranslationLngs = [
  "da",
  "de",
  "es",
  "fr",
  "it",
  "nb",
  "nl",
  "pl",
  "pt",
  "sv"
];
const locales = {
  supportedLngs,
  completeTranslationLngs
};
const fallbackLocale = "en";
const supportedLngsByLowercase = new Map(
  locales.supportedLngs.map((lng) => [lng.toLowerCase(), lng])
);
function normalizeLocale(locale) {
  if (!locale) return fallbackLocale;
  const normalizedInput = locale.trim().replaceAll("_", "-");
  const exactLocale = supportedLngsByLowercase.get(normalizedInput.toLowerCase());
  if (exactLocale) return exactLocale;
  const baseLocale = normalizedInput.split("-")[0];
  const exactBaseLocale = supportedLngsByLowercase.get(baseLocale.toLowerCase());
  if (exactBaseLocale) return exactBaseLocale;
  return fallbackLocale;
}
const catalogs = /* @__PURE__ */ Object.assign({
  "../../public/locales/al/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DMJlLGJV.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ar/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-ysnQh1IC.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/bg/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BFSDD61i.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/bn/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DVEbLPzM.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/bs/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BBJcspkP.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/cs/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DkMtYbNm.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/da/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BJdASdCP.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/de/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BUY6sIZx.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/el/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Bqr-VMCT.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/en/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BUJnR-tY.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/es/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BAY_VL8B.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/fa/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DSVurR1V.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/fi/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Dj73k-Fw.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/fr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CCiSHkP4.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/he/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C9lwCGc_.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/hi/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BLjRqszn.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/hr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C1jtZ_p9.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/hu/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-1nues_Ra.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/id/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DM_rOQYU.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/it/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C2I_57fZ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ja/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BamjHUW0.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ko/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Bqfd9lyi.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ku/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BvEYrP7i.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/lt/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-COGjmgP7.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/mk/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-2XLrpLnH.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/nb/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-n8Bxd8ZR.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/nl/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-222ZgGnr.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/pa/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DoBvOyz7.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/pl/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-NuiWpQTM.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ps/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BzmJ_34s.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/pt/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CDkQlJ0k.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ro/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C0A5uGuP.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ru/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BeFoRovZ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/sl/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-B4SLK57Z.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/sr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CjLB4ltx.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/sv/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BtvqVLir.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/th/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CFwuki2Q.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/tr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BhXGdHAc.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/uk/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-UwqQ7VW8.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ur/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-4dsIa13u.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/vi/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CfzLQJVd.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/yue/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CjxYF0m7.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/zh-TW/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C0JWIOEv.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/zh/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-B2KBVUGm.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"])
});
async function loadOverPlanCopy(kind, locale) {
  const load = (language2) => catalogs[`../../public/locales/${language2}/quiz.json`]();
  const english = await load("en");
  const language = normalizeLocale(locale);
  const messages = language === "en" ? english : { ...english, ...await load(language).catch(() => ({})) };
  const prefix = `over_plan_${kind}`;
  return {
    blocked: {
      title: messages[`${prefix}_blocked_title`],
      body: messages[`${prefix}_blocked_body`]
    },
    countdown: {
      title: (seconds) => messages[`${prefix}_countdown_title`].replace("{{seconds}}", String(seconds)),
      body: messages[`${prefix}_${kind === "assistant" ? "blocked" : "countdown"}_body`]
    }
  };
}
export {
  loadOverPlanCopy
};

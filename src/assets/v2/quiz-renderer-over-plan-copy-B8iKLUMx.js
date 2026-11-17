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
  "../../public/locales/al/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DdL1dNMD.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ar/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CpZZQ819.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/bg/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BtZYDfSE.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/bn/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-ybmMyHnG.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/bs/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DmbpYvqH.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/cs/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DzmKfKSJ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/da/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DHmQ7KBF.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/de/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Cw6rFTNz.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/el/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C9TsDZRd.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/en/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DSLWHlWO.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/es/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-D-5P7LGb.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/fa/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-ChLZgAEZ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/fi/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BGHHa_VG.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/fr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-lVpcMWG4.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/he/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DiNpz1X5.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/hi/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BLmV5Ppa.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/hr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-nZGqSnpd.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/hu/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CGXCD27f.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/id/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C6q9Tk_3.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/it/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CU3Tz7mI.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ja/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BLlaCgdE.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ko/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CgH5t6WK.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ku/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-hXIEDWFr.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/lt/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Bh8Nlufm.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/mk/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CUbGWAoA.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/nb/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-D-KulDsL.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/nl/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CIwFs4H6.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/pa/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BHdU2Qsp.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/pl/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BJPGa-c3.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ps/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BQsIC66q.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/pt/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Ds2gwFKk.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ro/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DRI-9AhZ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ru/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CKoVcn9f.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/sl/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BdyvgzIw.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/sr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-C0DlhQLZ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/sv/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-EoZ9nixQ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/th/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-CtFRnmmQ.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/tr/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-DUJDEkbd.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/uk/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Cq42edZ9.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/ur/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Bu4wNmhq.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/vi/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Bc0hLFtd.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/yue/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-TqjbbENl.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/zh-TW/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-Cq9jhFPO.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"]),
  "../../public/locales/zh/quiz.json": () => __vitePreload(() => import("./quiz-renderer-quiz-BK2FU-KR.js"), true ? [] : void 0, import.meta.url).then((m) => m["default"])
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

const __vite__fileDeps=["./quiz-renderer-index-CsjerEI6.js","./quiz-renderer-custom-chart-core-DUcUrm7y.js","./quiz-renderer-json-renderer-CJBOnGnk.js","./quiz-renderer-index-BXMeXr7c.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-country-data-CuDUzlny.js","./quiz-renderer2.css","./quiz-renderer-chart-helpers-BLPAWvOd.js","./quiz-renderer-rating-core-DyCz6Aed.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { __vitePreload } from "./quiz-renderer.js";
import { reactExports, useQuizStore, jsxRuntimeExports, clsx } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
import { BlockType } from "./quiz-renderer-image-processing-B3Hir3-2.js";
import { ChartErrorBoundary } from "./quiz-renderer-chart-error-boundary-BBV35ubO.js";
function calculateVariableScores(questions, answers) {
  const scores = {};
  const blockMap = /* @__PURE__ */ new Map();
  questions.forEach((question) => {
    question.blocks.forEach((block) => {
      var _a;
      blockMap.set(block.ref, { question, block });
      if (block.type === BlockType.CHOICE && "choices" in block.preferences) {
        (_a = block.preferences.choices) == null ? void 0 : _a.forEach((choice) => {
          var _a2;
          (_a2 = choice.calculations) == null ? void 0 : _a2.forEach((calc) => {
            if (!(calc.variableRef in scores)) {
              scores[calc.variableRef] = 0;
            }
          });
        });
      }
    });
  });
  answers.forEach((answer) => {
    if (!answer.choicesRefs || answer.choicesRefs.length === 0) {
      return;
    }
    const lookup = blockMap.get(answer.blockRef);
    if (!lookup) return;
    const { block } = lookup;
    if ((block == null ? void 0 : block.type) === BlockType.CHOICE && "choices" in block.preferences) {
      answer.choicesRefs.forEach((choiceRef) => {
        var _a, _b;
        const choice = (_a = block.preferences.choices) == null ? void 0 : _a.find((c) => c.ref === choiceRef);
        (_b = choice == null ? void 0 : choice.calculations) == null ? void 0 : _b.forEach((calc) => {
          if (calc.operation === "add") {
            scores[calc.variableRef] = (scores[calc.variableRef] ?? 0) + calc.value;
          }
        });
      });
    }
  });
  let highestScore = -Infinity;
  let highestRef = void 0;
  for (const [ref, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      highestRef = ref;
    }
  }
  if (highestScore <= 0) {
    highestRef = void 0;
  }
  return {
    variableScores: scores,
    highestVariableRef: highestRef
  };
}
class VariableScoresMemo {
  constructor(maxCacheSize = 50) {
    __publicField(this, "cache");
    __publicField(this, "maxCacheSize");
    this.cache = /* @__PURE__ */ new Map();
    this.maxCacheSize = maxCacheSize;
  }
  /**
   * Calculate scores with memoization.
   * Returns cached result if answers haven't changed.
   */
  calculate(questions, answers) {
    const cacheKey = this.getCacheKey(answers);
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const result = calculateVariableScores(questions, answers);
    this.cache.set(cacheKey, result);
    if (this.cache.size > this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== void 0) {
        this.cache.delete(firstKey);
      }
    }
    return result;
  }
  /**
   * Clear the memoization cache.
   * Useful when questions change (blocks added/removed/modified).
   */
  clear() {
    this.cache.clear();
  }
  /**
   * Generate cache key from answers array.
   * Key format: "blockRef:choiceRefs,..."
   */
  getCacheKey(answers) {
    return answers.filter((a) => a.isValid && a.choicesRefs && a.choicesRefs.length > 0).map((a) => `${a.blockRef}:${a.choicesRefs.join(",")}`).join("|");
  }
}
function getChartValue(valueSource, variableRef, fixedValue, context, min = 0, max = 100, blockRef) {
  if (valueSource === "fixed" || !variableRef) {
    return fixedValue ?? 0;
  }
  switch (context.type) {
    case "result":
      return context.variableScores[variableRef] ?? 0;
    case "question": {
      const scores = context.scoresMemo ? context.scoresMemo.calculate(context.questions, context.answers).variableScores : calculateVariableScoresFromAnswers(context.answers, context.questions);
      return scores[variableRef] ?? 0;
    }
    case "preview":
      return generatePreviewValue(min, max, blockRef);
    default:
      return 0;
  }
}
function getChartDataPoints(dataPoints, context, min = 0, max = 100) {
  let scores = {};
  if (context.type === "question") {
    scores = context.scoresMemo ? context.scoresMemo.calculate(context.questions, context.answers).variableScores : calculateVariableScoresFromAnswers(context.answers, context.questions);
  } else if (context.type === "result") {
    scores = context.variableScores;
  }
  return dataPoints.map((point) => {
    let value;
    if (point.value !== void 0) {
      value = point.value;
    } else if (point.variableRef) {
      if (context.type === "preview") {
        value = generatePreviewValue(min, max, point.variableRef);
      } else {
        value = scores[point.variableRef] ?? 0;
      }
    } else {
      value = 0;
    }
    return {
      label: point.label,
      value,
      color: point.color
    };
  });
}
function calculateVariableScoresFromAnswers(answers, questions) {
  const scores = {};
  const blockMap = /* @__PURE__ */ new Map();
  questions.forEach((question) => {
    question.blocks.forEach((block) => {
      var _a;
      blockMap.set(block.ref, { question, block });
      if (block.type === "choice" && "choices" in block.preferences) {
        (_a = block.preferences.choices) == null ? void 0 : _a.forEach((choice) => {
          var _a2;
          (_a2 = choice.calculations) == null ? void 0 : _a2.forEach((calc) => {
            if (!(calc.variableRef in scores)) {
              scores[calc.variableRef] = 0;
            }
          });
        });
      }
    });
  });
  answers.forEach((answer) => {
    if (!answer.choicesRefs || answer.choicesRefs.length === 0) {
      return;
    }
    const lookup = blockMap.get(answer.blockRef);
    if (!lookup) return;
    const { block } = lookup;
    if ((block == null ? void 0 : block.type) === "choice" && "choices" in block.preferences) {
      answer.choicesRefs.forEach((choiceRef) => {
        var _a, _b;
        const choice = (_a = block.preferences.choices) == null ? void 0 : _a.find((c) => c.ref === choiceRef);
        (_b = choice == null ? void 0 : choice.calculations) == null ? void 0 : _b.forEach((calc) => {
          if (calc.operation === "add") {
            scores[calc.variableRef] = (scores[calc.variableRef] ?? 0) + calc.value;
          }
        });
      });
    }
  });
  return scores;
}
function generatePreviewValue(min, max, seed) {
  if (!seed) {
    return min + (max - min) * 0.6;
  }
  const hash = hashString(seed);
  const range = max - min;
  const ratio = 0.4 + hash % 40 / 100;
  return min + Math.floor(range * ratio);
}
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash);
}
function mapToChartData(chartType, preferences, context) {
  switch (chartType) {
    case "gauge":
    case "rating_chart": {
      const value = getChartValue(
        preferences.valueSource,
        preferences.variableRef,
        preferences.fixedValue,
        context,
        0,
        preferences.gaugeMax ?? preferences.ratingMax ?? 100,
        context.type === "preview" ? context.blockRef : void 0
      );
      return {
        value,
        min: 0,
        max: preferences.gaugeMax ?? preferences.ratingMax ?? 100
      };
    }
    case "bar":
    case "radar": {
      const dataPoints = getChartDataPoints(
        preferences.dataPoints ?? [],
        context,
        0,
        preferences.maxValue ?? 100
      );
      return {
        dataPoints,
        min: 0,
        max: preferences.maxValue ?? 100
      };
    }
    default:
      return {
        value: 0,
        min: 0,
        max: 100
      };
  }
}
const GaugeChartCore = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-index-CsjerEI6.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url).then((module) => ({
    default: module.GaugeChartCore
  }))
);
const RadarChartCore = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-index-CsjerEI6.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url).then((module) => ({
    default: module.RadarChartCore
  }))
);
const BarChartCore = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-index-CsjerEI6.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url).then((module) => ({
    default: module.BarChartCore
  }))
);
const CustomChartCore = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-index-CsjerEI6.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url).then((module) => ({
    default: module.CustomChartCore
  }))
);
const RatingCore = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-index-CsjerEI6.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url).then((module) => ({
    default: module.RatingCore
  }))
);
const QuestionChartBlock = ({ block }) => {
  const { answers, questions, inBuilder } = useQuizStore((state) => ({
    answers: state.answers,
    questions: state.questions,
    inBuilder: state.inBuilder
  }));
  const scoresMemo = reactExports.useMemo(() => new VariableScoresMemo(), []);
  reactExports.useEffect(() => {
    scoresMemo.clear();
  }, [questions, scoresMemo]);
  const [ChartJS, setChartJS] = reactExports.useState(null);
  const needsChartJS = block.type === BlockType.GAUGE_CHART || block.type === BlockType.RADAR_CHART || block.type === BlockType.BAR_CHART || block.type === BlockType.CUSTOM_CHART;
  reactExports.useEffect(() => {
    if (!needsChartJS) return;
    let isMounted = true;
    const loadLibrary = async () => {
      try {
        const lib = await __vitePreload(() => import("./quiz-renderer-chart-BDt9m6aF.js"), true ? [] : void 0, import.meta.url);
        if (isMounted) {
          setChartJS(lib);
        }
      } catch (error) {
        console.error("Failed to load Chart.js:", error);
      }
    };
    loadLibrary();
    return () => {
      isMounted = false;
    };
  }, [needsChartJS]);
  const context = reactExports.useMemo(() => {
    if (inBuilder && (!answers || answers.length === 0)) {
      return {
        type: "preview",
        blockRef: block.ref
      };
    }
    return {
      type: "question",
      answers: answers || [],
      questions: questions || [],
      scoresMemo
      // Pass memoization instance for performance
    };
  }, [inBuilder, answers, questions, block.ref, scoresMemo, block.preferences]);
  const chartData = reactExports.useMemo(() => {
    try {
      switch (block.type) {
        case BlockType.GAUGE_CHART:
          return mapToChartData("gauge", block.preferences, context);
        case BlockType.BAR_CHART:
          return mapToChartData("bar", block.preferences, context);
        case BlockType.RADAR_CHART:
          return mapToChartData("radar", block.preferences, context);
        case BlockType.RATING_CHART:
          return mapToChartData("rating_chart", block.preferences, context);
        case BlockType.CUSTOM_CHART:
          return null;
        default:
          return null;
      }
    } catch (error) {
      console.error("Error resolving chart data:", error);
      return null;
    }
  }, [block.type, block.preferences, context]);
  const customBlock = block.type === BlockType.CUSTOM_CHART ? block : null;
  const variableScores = reactExports.useMemo(() => {
    if (block.type === BlockType.CUSTOM_CHART && context.type === "question") {
      return calculateVariableScoresFromAnswers(context.answers, context.questions);
    }
    return {};
  }, [block.type, context]);
  const highestVariableRef = reactExports.useMemo(() => {
    if (block.type !== BlockType.CUSTOM_CHART || Object.keys(variableScores).length === 0) {
      return void 0;
    }
    let highestRef;
    let highestValue = -Infinity;
    for (const [ref, value] of Object.entries(variableScores)) {
      const numValue = typeof value === "number" ? value : 0;
      if (numValue > highestValue) {
        highestValue = numValue;
        highestRef = ref;
      }
    }
    return highestRef;
  }, [block.type, variableScores]);
  const blockHeight = "height" in block.preferences ? block.preferences.height || 300 : 300;
  const renderChart = () => {
    if (needsChartJS && !ChartJS) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-block__loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading chart..." }) });
    }
    const chartFallback = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-block__loading", style: { minHeight: `${blockHeight}px` } });
    switch (block.type) {
      case BlockType.GAUGE_CHART: {
        if (!chartData || chartData.value === void 0) return null;
        const gaugeBlock = block;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: chartFallback, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GaugeChartCore,
          {
            value: chartData.value,
            preferences: gaugeBlock.preferences,
            ChartJS
          }
        ) });
      }
      case BlockType.RADAR_CHART: {
        if (!(chartData == null ? void 0 : chartData.dataPoints)) return null;
        const radarBlock = block;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: chartFallback, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadarChartCore,
          {
            dataPoints: chartData.dataPoints,
            preferences: radarBlock.preferences,
            ChartJS
          }
        ) });
      }
      case BlockType.BAR_CHART: {
        if (!(chartData == null ? void 0 : chartData.dataPoints)) return null;
        const barBlock = block;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: chartFallback, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          BarChartCore,
          {
            dataPoints: chartData.dataPoints,
            preferences: barBlock.preferences,
            ChartJS
          }
        ) });
      }
      case BlockType.CUSTOM_CHART: {
        if (!customBlock) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: chartFallback, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomChartCore,
          {
            customChartCode: customBlock.preferences.customChartCode || "",
            quizContext: {
              variableScores,
              answers: answers || [],
              highestVariableRef,
              inBuilder: inBuilder || false
            },
            preferences: customBlock.preferences,
            ChartJS
          }
        ) });
      }
      case BlockType.RATING_CHART: {
        if ((chartData == null ? void 0 : chartData.value) === void 0) return null;
        const ratingBlock = block;
        const ratingHeight = blockHeight / 3;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minHeight: `${ratingHeight}px` } }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          RatingCore,
          {
            value: chartData.value,
            preferences: ratingBlock.preferences,
            blockRef: block.ref
          }
        ) });
      }
      default:
        return null;
    }
  };
  if (block.type === BlockType.RATING_CHART) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ChartErrorBoundary, { context: "question", blockRef: block.ref, children: renderChart() });
  }
  const alignment = "alignment" in block.preferences ? block.preferences.alignment : "center";
  const chartClass = clsx("chart-block", {
    "chart-block--left": alignment === "left",
    "chart-block--center": alignment === "center",
    "chart-block--right": alignment === "right"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: chartClass, style: { minHeight: `${blockHeight}px` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartErrorBoundary, { context: "question", blockRef: block.ref, children: renderChart() }) });
};
const questionChartBlock = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  QuestionChartBlock
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  QuestionChartBlock
}, Symbol.toStringTag, { value: "Module" }));
export {
  index,
  questionChartBlock
};

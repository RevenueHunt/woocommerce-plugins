import { __vitePreload } from "./quiz-renderer.js";
import { reactExports, ChartValueSource, jsxDevRuntimeExports, DataPointType, useQuizStore, clsx, ResultBlockType } from "./quiz-renderer-json-renderer-B6X3VaGt.js";
import { GaugeChartCore, RadarChartCore, BarChartCore, CustomChartCore } from "./quiz-renderer-custom-chart-core-Dc1Xz6ZV.js";
import { getPreviewValue } from "./quiz-renderer-chart-helpers-uheJMlCp.js";
import { ChartErrorBoundary } from "./quiz-renderer-chart-error-boundary-IsJR96AJ.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-country-data-CuDUzlny.js";
const GaugeChart = ({ block, variableScores, ChartJS, inBuilder }) => {
  const { preferences } = block;
  const value = reactExports.useMemo(() => {
    const isFixed = preferences.valueSource === ChartValueSource.FIXED;
    if (isFixed) {
      return preferences.fixedValue || 0;
    }
    const variableValue = variableScores[preferences.variableRef || "score"] || 0;
    const min = 0;
    const max = preferences.gaugeMax || 100;
    return getPreviewValue(inBuilder, true, variableValue, min, max, block.ref);
  }, [preferences, variableScores, inBuilder, block.ref]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    GaugeChartCore,
    {
      value,
      preferences,
      ChartJS,
      blockRef: block.ref
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/gauge-chart.tsx",
      lineNumber: 38,
      columnNumber: 5
    },
    void 0
  );
};
const RadarChartComponent = ({
  block,
  variableScores,
  ChartJS,
  inBuilder
}) => {
  const { preferences } = block;
  const dataPoints = reactExports.useMemo(() => {
    const maxValue = preferences.maxValue || 10;
    const configuredPoints = preferences.dataPoints || [];
    return configuredPoints.map((point) => {
      let value;
      if (point.type === DataPointType.FIXED) {
        value = point.value ?? 0;
      } else {
        const variableValue = variableScores[point.variableRef || ""] || 0;
        value = getPreviewValue(inBuilder, true, variableValue, 0, maxValue, block.ref);
      }
      return {
        label: point.label,
        value,
        color: point.color
      };
    });
  }, [preferences, variableScores, inBuilder, block.ref]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    RadarChartCore,
    {
      dataPoints,
      preferences,
      ChartJS
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/radar-chart.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    void 0
  );
};
const BarChartComponent = ({
  block,
  variableScores,
  ChartJS,
  inBuilder
}) => {
  const { preferences } = block;
  const dataPoints = reactExports.useMemo(() => {
    const maxValue = preferences.maxValue || 10;
    const configuredPoints = preferences.dataPoints || [];
    return configuredPoints.map((point) => {
      let value;
      if (point.type === DataPointType.FIXED) {
        value = point.value ?? 0;
      } else {
        const variableValue = variableScores[point.variableRef || ""] || 0;
        value = getPreviewValue(inBuilder, true, variableValue, 0, maxValue, block.ref);
      }
      return {
        label: point.label,
        value,
        color: point.color
      };
    });
  }, [preferences, variableScores, inBuilder, block.ref]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    BarChartCore,
    {
      dataPoints,
      preferences,
      ChartJS
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/bar-chart.tsx",
      lineNumber: 52,
      columnNumber: 5
    },
    void 0
  );
};
const CustomChartComponent = ({
  block,
  variableScores,
  ChartJS,
  answers,
  highestVariableRef
}) => {
  const { preferences } = block;
  const inBuilder = useQuizStore((s) => s.inBuilder);
  const quizId = useQuizStore((state) => state.id);
  const quizContext = {
    variableScores,
    answers,
    highestVariableRef,
    inBuilder,
    quizId
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    CustomChartCore,
    {
      customChartCode: preferences.customChartCode || "",
      quizContext,
      preferences,
      ChartJS
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/custom-chart.tsx",
      lineNumber: 44,
      columnNumber: 5
    },
    void 0
  );
};
function getChartAriaLabel(block) {
  var _a, _b;
  switch (block.type) {
    case ResultBlockType.GAUGE_CHART: {
      const gaugeMax = block.preferences.gaugeMax || 100;
      return `Gauge chart showing value from 0 to ${gaugeMax}`;
    }
    case ResultBlockType.BAR_CHART: {
      const barDataPoints = ((_a = block.preferences.dataPoints) == null ? void 0 : _a.length) || 0;
      return `Bar chart comparing ${barDataPoints} categories`;
    }
    case ResultBlockType.RADAR_CHART: {
      const radarAxes = ((_b = block.preferences.dataPoints) == null ? void 0 : _b.length) || 0;
      return `Radar chart with ${radarAxes} axes`;
    }
    case ResultBlockType.CUSTOM_CHART: {
      return "Custom data visualization";
    }
    default:
      return "Data chart";
  }
}
const ChartResultBlock = ({ block }) => {
  const { variableScores, getTranslatedContent, inBuilder, answers, highestVariableRef } = useQuizStore((state) => ({
    variableScores: state.variableScores,
    getTranslatedContent: state.getTranslatedContent,
    inBuilder: state.inBuilder,
    answers: state.answers,
    highestVariableRef: state.highestVariableRef
  }));
  const { preferences } = block;
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [ChartJS, setChartJS] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    const loadLibrary = async () => {
      setIsLoading(true);
      try {
        const lib = await __vitePreload(() => import("./quiz-renderer-chart-BDt9m6aF.js"), true ? [] : void 0, import.meta.url);
        if (isMounted) {
          setChartJS(lib);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load Chart.js:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadLibrary();
    return () => {
      isMounted = false;
    };
  }, [block.type]);
  const chartClass = clsx("chart-block", {
    "chart-block--left": preferences.alignment === "left",
    "chart-block--center": preferences.alignment === "center",
    "chart-block--right": preferences.alignment === "right"
  });
  const blockHeight = "height" in preferences ? preferences.height : 300;
  if (isLoading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        id: block.ref,
        className: chartClass,
        "aria-label": getChartAriaLabel(block),
        style: { minHeight: `${blockHeight}px` },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "chart-block__loading", children: getTranslatedContent({ key: "loading" }) || "Loading..." }, void 0, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
          lineNumber: 107,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
        lineNumber: 101,
        columnNumber: 7
      },
      void 0
    );
  }
  const renderChart = () => {
    switch (block.type) {
      case ResultBlockType.GAUGE_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          GaugeChart,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder
          },
          void 0,
          false,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
            lineNumber: 119,
            columnNumber: 11
          },
          void 0
        ) : null;
      }
      case ResultBlockType.RADAR_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          RadarChartComponent,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder
          },
          void 0,
          false,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
            lineNumber: 129,
            columnNumber: 11
          },
          void 0
        ) : null;
      }
      case ResultBlockType.BAR_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          BarChartComponent,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder
          },
          void 0,
          false,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
            lineNumber: 139,
            columnNumber: 11
          },
          void 0
        ) : null;
      }
      case ResultBlockType.CUSTOM_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          CustomChartComponent,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder,
            answers,
            highestVariableRef
          },
          void 0,
          false,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
            lineNumber: 149,
            columnNumber: 11
          },
          void 0
        ) : null;
      }
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      id: block.ref,
      className: chartClass,
      "aria-label": getChartAriaLabel(block),
      style: { minHeight: `${blockHeight}px` },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChartErrorBoundary, { context: "result", blockRef: block.ref, children: renderChart() }, void 0, false, {
        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
        lineNumber: 171,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/results/blocks/chart/chart-result-block.tsx",
      lineNumber: 165,
      columnNumber: 5
    },
    void 0
  );
};
export {
  ChartResultBlock
};

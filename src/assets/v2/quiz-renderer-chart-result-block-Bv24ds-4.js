import { __vitePreload } from "./quiz-renderer.js";
import { reactExports, ChartValueSource, jsxRuntimeExports, DataPointType, useQuizStore, clsx, ResultBlockType } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
import { GaugeChartCore, RadarChartCore, BarChartCore, CustomChartCore } from "./quiz-renderer-custom-chart-core-DUcUrm7y.js";
import { getPreviewValue } from "./quiz-renderer-chart-helpers-BLPAWvOd.js";
import { ChartErrorBoundary } from "./quiz-renderer-chart-error-boundary-BBV35ubO.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GaugeChartCore,
    {
      value,
      preferences,
      ChartJS,
      blockRef: block.ref
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadarChartCore,
    {
      dataPoints,
      preferences,
      ChartJS
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    BarChartCore,
    {
      dataPoints,
      preferences,
      ChartJS
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CustomChartCore,
    {
      customChartCode: preferences.customChartCode || "",
      quizContext,
      preferences,
      ChartJS
    }
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: block.ref,
        className: chartClass,
        "aria-label": getChartAriaLabel(block),
        style: { minHeight: `${blockHeight}px` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-block__loading", children: getTranslatedContent({ key: "loading" }) || "Loading..." })
      }
    );
  }
  const renderChart = () => {
    switch (block.type) {
      case ResultBlockType.GAUGE_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          GaugeChart,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder
          }
        ) : null;
      }
      case ResultBlockType.RADAR_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadarChartComponent,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder
          }
        ) : null;
      }
      case ResultBlockType.BAR_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          BarChartComponent,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder
          }
        ) : null;
      }
      case ResultBlockType.CUSTOM_CHART: {
        return ChartJS ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomChartComponent,
          {
            block,
            variableScores,
            ChartJS,
            inBuilder,
            answers,
            highestVariableRef
          }
        ) : null;
      }
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: block.ref,
      className: chartClass,
      "aria-label": getChartAriaLabel(block),
      style: { minHeight: `${blockHeight}px` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartErrorBoundary, { context: "result", blockRef: block.ref, children: renderChart() })
    }
  );
};
export {
  ChartResultBlock
};

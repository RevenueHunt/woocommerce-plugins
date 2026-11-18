var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { reactExports, NeedleStyle, jsxDevRuntimeExports, BarOrientation, useQuizStore } from "./quiz-renderer-json-renderer-B6X3VaGt.js";
import { createNeedlePlugin, buildFilledGaugeData, DEFAULT_CHART_COLORS } from "./quiz-renderer-chart-helpers-uheJMlCp.js";
const GaugeChartCore = ({
  value,
  preferences,
  ChartJS,
  blockRef
}) => {
  const canvasRef = reactExports.useRef(null);
  const chartRef = reactExports.useRef(null);
  const wrapperRef = reactExports.useRef(null);
  const chartHeight = preferences.height || 300;
  const ratioWidth = Math.round(chartHeight * 2);
  reactExports.useEffect(() => {
    if (!canvasRef.current || !ChartJS) return;
    const { Chart, DoughnutController, ArcElement, Tooltip, Legend } = ChartJS;
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    const min = 0;
    const max = preferences.gaugeMax || 100;
    const normalizedValue = Math.min(Math.max(value, min), max);
    const filledColor = preferences.gaugeFillColor || "#333333";
    const emptyColor = preferences.gaugeEmptyColor || "#dddddd";
    const needleColor = preferences.gaugeNeedleColor || "#181212";
    const gaugeData = buildFilledGaugeData(normalizedValue, min, max, filledColor, emptyColor);
    const datasetConfig = {
      ...gaugeData,
      cutout: "50%",
      circumference: 180,
      // Half-circle
      rotation: 270
    };
    if (wrapperRef.current && canvasRef.current) {
      const w = wrapperRef.current.clientWidth || ratioWidth;
      const h = wrapperRef.current.clientHeight || chartHeight;
      canvasRef.current.width = w;
      canvasRef.current.height = h;
    }
    const chartConfig = {
      type: "doughnut",
      data: {
        datasets: [datasetConfig]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Add padding to prevent needle clipping
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 10
          }
        },
        // Store gauge metadata for plugins
        gaugeValue: normalizedValue,
        gaugeMax: max,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      },
      plugins: []
    };
    const needleStyle = preferences.gaugeNeedleStyle || NeedleStyle.CLASSIC;
    const needlePlugin = createNeedlePlugin(normalizedValue, max, needleStyle, needleColor);
    if (needlePlugin) {
      chartConfig.plugins.push(needlePlugin);
    }
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(canvasRef.current, chartConfig);
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [ChartJS, preferences, value, chartHeight]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: blockRef, className: "chart-block__container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "chart-block__canvas-wrapper",
      ref: wrapperRef,
      style: { height: `${chartHeight}px`, width: `min(100%, ${ratioWidth}px)` },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "canvas",
        {
          ref: canvasRef,
          "aria-label": `Gauge chart showing ${value} out of ${preferences.gaugeMax || 100}`,
          style: { width: "100%", height: "100%" }
        },
        chartHeight,
        false,
        {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/gauge-chart-core.tsx",
          lineNumber: 152,
          columnNumber: 9
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/gauge-chart-core.tsx",
      lineNumber: 146,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/gauge-chart-core.tsx",
    lineNumber: 145,
    columnNumber: 5
  }, void 0);
};
const RadarChartCore = ({
  dataPoints,
  preferences,
  ChartJS,
  blockRef
}) => {
  const canvasRef = reactExports.useRef(null);
  const chartRef = reactExports.useRef(null);
  const wrapperRef = reactExports.useRef(null);
  const chartHeight = preferences.height || 300;
  const squareWidth = chartHeight;
  reactExports.useEffect(() => {
    if (!canvasRef.current || !ChartJS) return;
    const {
      Chart,
      RadarController,
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    } = ChartJS;
    Chart.register(
      RadarController,
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    );
    if (wrapperRef.current && canvasRef.current) {
      const w = wrapperRef.current.clientWidth || squareWidth;
      const h = wrapperRef.current.clientHeight || chartHeight;
      canvasRef.current.width = w;
      canvasRef.current.height = h;
    }
    const labels = dataPoints.map((point) => point.label);
    const values = dataPoints.map((point) => point.value);
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const radarPrimaryColor = preferences.radarColor || "#36A2EB";
    const gridColor = preferences.radarGridColor || "#C2C2C2";
    const labelsColor = preferences.radarLabelsColor || "#181212";
    chartRef.current = new Chart(canvasRef.current, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: "",
            data: values,
            backgroundColor: `${radarPrimaryColor}40`,
            // 25% opacity in hex
            borderColor: radarPrimaryColor,
            borderWidth: 2,
            pointBackgroundColor: radarPrimaryColor,
            pointBorderColor: radarPrimaryColor,
            pointHoverBackgroundColor: radarPrimaryColor,
            pointHoverBorderColor: radarPrimaryColor
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            ...preferences.maxValue !== void 0 && { max: preferences.maxValue },
            ticks: {
              display: false
              // Hide axis values
            },
            grid: {
              color: gridColor
            },
            pointLabels: {
              color: labelsColor
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: labelsColor
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [ChartJS, preferences, dataPoints, chartHeight]);
  const ariaLabel = `Radar chart with ${dataPoints.length} dimensions: ${dataPoints.map((p) => `${p.label} ${p.value}`).join(", ")}`;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: blockRef, className: "chart-block__container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "chart-block__canvas-wrapper",
      ref: wrapperRef,
      style: { height: `${chartHeight}px`, width: `min(100%, ${squareWidth}px)` },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "canvas",
        {
          ref: canvasRef,
          "aria-label": ariaLabel,
          style: { width: "100%", height: "100%" }
        },
        chartHeight,
        false,
        {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/radar-chart-core.tsx",
          lineNumber: 177,
          columnNumber: 9
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/radar-chart-core.tsx",
      lineNumber: 171,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/radar-chart-core.tsx",
    lineNumber: 170,
    columnNumber: 5
  }, void 0);
};
const BarChartCore = ({
  dataPoints,
  preferences,
  ChartJS,
  blockRef
}) => {
  const canvasRef = reactExports.useRef(null);
  const chartRef = reactExports.useRef(null);
  const wrapperRef = reactExports.useRef(null);
  const chartHeight = preferences.height || 300;
  const goldenWidth = Math.round(chartHeight * 1.618);
  reactExports.useEffect(() => {
    if (!canvasRef.current || !ChartJS) return;
    const { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } = ChartJS;
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
    if (wrapperRef.current && canvasRef.current) {
      const fallbackW = Math.round(chartHeight * 1.618);
      const w = wrapperRef.current.clientWidth || fallbackW;
      const h = wrapperRef.current.clientHeight || chartHeight;
      canvasRef.current.width = w;
      canvasRef.current.height = h;
    }
    const labels = dataPoints.map((point) => point.label);
    const values = dataPoints.map((point) => point.value);
    const colors = dataPoints.map(
      (point, index) => point.color || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]
    );
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const isHorizontal = preferences.barOrientation === BarOrientation.HORIZONTAL;
    const gridColor = preferences.barGridColor || "#C2C2C2";
    const labelsColor = preferences.barLabelsColor || "#181212";
    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "",
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: isHorizontal ? "y" : "x",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ...isHorizontal && preferences.maxValue !== void 0 && { max: preferences.maxValue },
            ...isHorizontal && { beginAtZero: true },
            ticks: {
              color: labelsColor,
              ...isHorizontal && {
                stepSize: 1,
                callback: function(value) {
                  return Math.floor(Number(value));
                }
              }
            },
            grid: {
              color: gridColor
            }
          },
          y: {
            beginAtZero: true,
            ...!isHorizontal && preferences.maxValue !== void 0 && { max: preferences.maxValue },
            ticks: {
              color: labelsColor,
              ...!isHorizontal && {
                stepSize: 1,
                callback: function(value) {
                  return Math.floor(Number(value));
                }
              }
            },
            grid: {
              color: gridColor
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: labelsColor
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [ChartJS, preferences, dataPoints, chartHeight]);
  const ariaLabel = `Bar chart with ${dataPoints.length} bars: ${dataPoints.map((p) => `${p.label} ${p.value}`).join(", ")}`;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: blockRef, className: "chart-block__container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "chart-block__canvas-wrapper",
      ref: wrapperRef,
      style: { height: `${chartHeight}px`, width: `min(100%, ${goldenWidth}px)` },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "canvas",
        {
          ref: canvasRef,
          "aria-label": ariaLabel,
          style: { width: "100%", height: "100%" }
        },
        chartHeight,
        false,
        {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/bar-chart-core.tsx",
          lineNumber: 197,
          columnNumber: 9
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/bar-chart-core.tsx",
      lineNumber: 186,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/bar-chart-core.tsx",
    lineNumber: 185,
    columnNumber: 5
  }, void 0);
};
function executeWithTimeout(executor, timeoutMs = 5e3) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(
        new Error(
          `Chart execution timeout after ${timeoutMs}ms. Check for infinite loops or intensive calculations.`
        )
      );
    }, timeoutMs);
    try {
      const result = executor();
      clearTimeout(timeoutId);
      resolve(result);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}
const _ChartJsRegistry = class _ChartJsRegistry {
  constructor() {
    __publicField(this, "registered", false);
  }
  static getInstance() {
    if (!_ChartJsRegistry.instance) {
      _ChartJsRegistry.instance = new _ChartJsRegistry();
    }
    return _ChartJsRegistry.instance;
  }
  isRegistered() {
    return this.registered;
  }
  markAsRegistered() {
    this.registered = true;
  }
  reset() {
    this.registered = false;
  }
};
__publicField(_ChartJsRegistry, "instance");
let ChartJsRegistry = _ChartJsRegistry;
const CustomChartCore = ({
  customChartCode,
  quizContext,
  preferences,
  ChartJS,
  blockRef
}) => {
  const canvasRef = reactExports.useRef(null);
  const chartInstanceRef = reactExports.useRef(null);
  const wrapperRef = reactExports.useRef(null);
  const chartHeight = preferences.height || 300;
  const goldenWidth = Math.round(chartHeight * 1.618);
  const runsMerchantCode = useQuizStore((s) => s.runsMerchantCode);
  reactExports.useEffect(() => {
    if (!runsMerchantCode) return;
    if (!canvasRef.current || !ChartJS || !(customChartCode == null ? void 0 : customChartCode.trim())) {
      return;
    }
    const registry = ChartJsRegistry.getInstance();
    if (!registry.isRegistered()) {
      const {
        Chart: Chart2,
        BarController,
        LineController,
        PieController,
        DoughnutController,
        PolarAreaController,
        RadarController,
        ScatterController,
        BubbleController,
        BarElement,
        LineElement,
        PointElement,
        ArcElement,
        CategoryScale,
        LinearScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Tooltip,
        Legend,
        Title,
        Filler
      } = ChartJS;
      Chart2.register(
        BarController,
        LineController,
        PieController,
        DoughnutController,
        PolarAreaController,
        RadarController,
        ScatterController,
        BubbleController,
        BarElement,
        LineElement,
        PointElement,
        ArcElement,
        CategoryScale,
        LinearScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Tooltip,
        Legend,
        Title,
        Filler
      );
      registry.markAsRegistered();
    }
    const { Chart } = ChartJS;
    if (wrapperRef.current && canvasRef.current) {
      const w = wrapperRef.current.clientWidth || goldenWidth;
      const h = wrapperRef.current.clientHeight || chartHeight;
      canvasRef.current.width = w;
      canvasRef.current.height = h;
    }
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
    const existingChart = Chart.getChart(canvasRef.current);
    if (existingChart) {
      existingChart.destroy();
    }
    executeWithTimeout(async () => {
      const quiz = {
        variableScores: quizContext.variableScores,
        answers: quizContext.answers,
        highestVariableRef: quizContext.highestVariableRef,
        inBuilder: quizContext.inBuilder
      };
      const executeCustomChart = new Function("Chart", "canvas", "quiz", customChartCode);
      const result = executeCustomChart(Chart, canvasRef.current, quiz);
      if (result && typeof result.destroy === "function") {
        chartInstanceRef.current = result;
      }
    }, 5e3).catch((error) => {
      console.error("Custom Chart.js execution error:", error);
      if (quizContext.inBuilder && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          const canvas = canvasRef.current;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.textAlign = "center";
          ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = "#d72c0d";
          ctx.fillText("Chart Error", canvas.width / 2, canvas.height / 2 - 20);
          const truncated = errorMessage.length > 50 ? errorMessage.substring(0, 47) + "..." : errorMessage;
          ctx.font = "12px monospace";
          ctx.fillStyle = "#666";
          ctx.fillText(truncated, canvas.width / 2, canvas.height / 2 + 5);
          ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = "#999";
          ctx.fillText(
            "Check browser console for details",
            canvas.width / 2,
            canvas.height / 2 + 25
          );
        }
      }
    });
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [
    runsMerchantCode,
    ChartJS,
    customChartCode,
    quizContext.variableScores,
    quizContext.inBuilder,
    quizContext.answers,
    quizContext.highestVariableRef,
    chartHeight
  ]);
  if (!runsMerchantCode) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: blockRef, className: "chart-block__container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { fontSize: "0.875rem", opacity: 0.65 }, children: "Custom charts run in Preview." }, void 0, false, {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/custom-chart-core.tsx",
      lineNumber: 236,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/custom-chart-core.tsx",
      lineNumber: 235,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: blockRef, className: "chart-block__container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "chart-block__canvas-wrapper",
      ref: wrapperRef,
      style: { height: `${chartHeight}px`, width: `min(100%, ${goldenWidth}px)` },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "canvas",
        {
          ref: canvasRef,
          "aria-label": "Custom chart visualization",
          style: { width: "100%", height: "100%" }
        },
        chartHeight,
        false,
        {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/custom-chart-core.tsx",
          lineNumber: 248,
          columnNumber: 9
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/custom-chart-core.tsx",
      lineNumber: 243,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/custom-chart-core.tsx",
    lineNumber: 242,
    columnNumber: 5
  }, void 0);
};
export {
  BarChartCore,
  CustomChartCore,
  GaugeChartCore,
  RadarChartCore
};

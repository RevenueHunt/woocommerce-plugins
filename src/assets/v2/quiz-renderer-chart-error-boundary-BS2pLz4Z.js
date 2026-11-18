var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { reactExports, jsxDevRuntimeExports } from "./quiz-renderer-json-renderer-B68vN2dx.js";
const MAX_RETRY_COUNT = 3;
class ChartErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    /**
     * Handle retry button click
     * Resets error state to attempt re-rendering the chart
     */
    __publicField(this, "handleRetry", () => {
      const { retryCount } = this.state;
      if (retryCount >= MAX_RETRY_COUNT) {
        console.warn(`Chart retry limit reached (${MAX_RETRY_COUNT}). Manual intervention required.`);
        return;
      }
      console.log(`Retrying chart render (attempt ${retryCount + 1}/${MAX_RETRY_COUNT})`);
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1
      });
    });
    /**
     * Reset error boundary state (useful for testing or manual reset)
     */
    __publicField(this, "reset", () => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: 0
      });
    });
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Chart Error Boundary caught an error:", {
      error,
      errorInfo,
      context: this.props.context,
      blockRef: this.props.blockRef,
      componentStack: errorInfo.componentStack
    });
    this.setState({
      errorInfo
    });
  }
  render() {
    const { hasError, error, retryCount } = this.state;
    const { children, context, fallback, blockRef } = this.props;
    if (hasError) {
      if (fallback) {
        return fallback;
      }
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ChartErrorFallback,
        {
          error,
          context,
          blockRef,
          retryCount,
          maxRetries: MAX_RETRY_COUNT,
          onRetry: this.handleRetry
        },
        void 0,
        false,
        {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
          lineNumber: 150,
          columnNumber: 9
        },
        this
      );
    }
    return children;
  }
}
function ChartErrorFallback({
  error,
  context,
  blockRef,
  retryCount,
  maxRetries,
  onRetry
}) {
  const isBuilder = typeof window !== "undefined" && window.location.pathname.includes("/builder");
  const canRetry = retryCount < maxRetries;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "chart-error-fallback",
      role: "alert",
      "aria-live": "polite",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        minHeight: "200px",
        textAlign: "center"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "svg",
          {
            width: "48",
            height: "48",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#dc3545",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: { marginBottom: "1rem" },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("circle", { cx: "12", cy: "12", r: "10" }, void 0, false, {
                fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                lineNumber: 220,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "12", y1: "8", x2: "12", y2: "12" }, void 0, false, {
                fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                lineNumber: 221,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" }, void 0, false, {
                fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                lineNumber: 222,
                columnNumber: 9
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
            lineNumber: 208,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "h3",
          {
            style: {
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "#343a40",
              margin: "0 0 0.5rem 0"
            },
            children: "Chart Failed to Load"
          },
          void 0,
          false,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
            lineNumber: 226,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "p",
          {
            style: {
              fontSize: "0.875rem",
              color: "#6c757d",
              margin: "0 0 1rem 0",
              maxWidth: "400px"
            },
            children: [
              context === "question" ? "Unable to display the chart for this question. " : "Unable to display the result chart. ",
              canRetry ? "Please try again." : "Please refresh the page or contact support."
            ]
          },
          void 0,
          true,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
            lineNumber: 237,
            columnNumber: 7
          },
          this
        ),
        canRetry && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: onRetry,
            style: {
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
            },
            "aria-label": "Retry loading chart",
            children: "Retry"
          },
          void 0,
          false,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
            lineNumber: 253,
            columnNumber: 9
          },
          this
        ),
        isBuilder && error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "details",
          {
            style: {
              marginTop: "1rem",
              padding: "0.75rem",
              backgroundColor: "#fff",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              textAlign: "left",
              width: "100%",
              maxWidth: "600px",
              fontSize: "0.75rem"
            },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "summary",
                {
                  style: {
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "#495057",
                    marginBottom: "0.5rem"
                  },
                  children: "Error Details (Developer Info)"
                },
                void 0,
                false,
                {
                  fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                  lineNumber: 293,
                  columnNumber: 11
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  style: {
                    backgroundColor: "#f8f9fa",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    overflowX: "auto"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "0 0 0.5rem 0" }, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Error:" }, void 0, false, {
                        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                        lineNumber: 312,
                        columnNumber: 15
                      }, this),
                      " ",
                      error.message
                    ] }, void 0, true, {
                      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                      lineNumber: 311,
                      columnNumber: 13
                    }, this),
                    blockRef && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "0 0 0.5rem 0" }, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Block Ref:" }, void 0, false, {
                        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                        lineNumber: 316,
                        columnNumber: 17
                      }, this),
                      " ",
                      blockRef
                    ] }, void 0, true, {
                      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                      lineNumber: 315,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "0 0 0.5rem 0" }, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Context:" }, void 0, false, {
                        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                        lineNumber: 320,
                        columnNumber: 15
                      }, this),
                      " ",
                      context
                    ] }, void 0, true, {
                      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                      lineNumber: 319,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "0 0 0.5rem 0" }, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Retry Count:" }, void 0, false, {
                        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                        lineNumber: 323,
                        columnNumber: 15
                      }, this),
                      " ",
                      retryCount,
                      " / ",
                      maxRetries
                    ] }, void 0, true, {
                      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                      lineNumber: 322,
                      columnNumber: 13
                    }, this),
                    error.stack && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "pre",
                      {
                        style: {
                          margin: "0.5rem 0 0 0",
                          fontSize: "0.625rem",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word"
                        },
                        children: error.stack
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                        lineNumber: 326,
                        columnNumber: 15
                      },
                      this
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
                  lineNumber: 303,
                  columnNumber: 11
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
            lineNumber: 280,
            columnNumber: 9
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/shared/charts/chart-error-boundary.tsx",
      lineNumber: 190,
      columnNumber: 5
    },
    this
  );
}
export {
  ChartErrorBoundary
};

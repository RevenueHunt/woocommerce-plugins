import { useQuizStore, reactExports, ChartValueSource, jsxDevRuntimeExports } from "./quiz-renderer-json-renderer-B68vN2dx.js";
import { getPreviewValue } from "./quiz-renderer-chart-helpers-CMuxm1JU.js";
import { RatingCore } from "./quiz-renderer-rating-core-BDsIrPfE.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import "./quiz-renderer.js";
import "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-country-data-CuDUzlny.js";
const RatingBlock = ({ block }) => {
  const { variableScores, inBuilder } = useQuizStore((state) => ({
    variableScores: state.variableScores,
    inBuilder: state.inBuilder
  }));
  const { preferences } = block;
  const value = reactExports.useMemo(() => {
    const isFixed = preferences.valueSource === ChartValueSource.FIXED;
    if (isFixed) {
      return preferences.fixedValue || 0;
    }
    const variableValue = variableScores[preferences.variableRef || "score"] || 0;
    const maxRating = preferences.ratingMax || 5;
    return getPreviewValue(inBuilder, true, variableValue, 0, maxRating);
  }, [preferences, variableScores, inBuilder]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RatingCore, { value, preferences, blockRef: block.ref }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/new-quiz-words/v2/frontend_v2/app/components/quiz/blocks/common/rating/rating-block.tsx",
    lineNumber: 40,
    columnNumber: 10
  }, void 0);
};
export {
  RatingBlock
};

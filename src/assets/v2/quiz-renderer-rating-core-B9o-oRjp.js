import { clsx, Alignment, jsxDevRuntimeExports, RatingStyle, HeartFilled, HeartHalf, HeartEmpty, CircleFilled, CircleHalf, CircleEmpty, StarFilled, StarHalf, StarEmpty } from "./quiz-renderer-json-renderer-D12Pndit.js";
const RatingCore = ({
  value,
  preferences,
  onClick,
  onKeyDown,
  blockRef,
  tabIndex
}) => {
  const maxRating = preferences.ratingMax || 5;
  const normalizedValue = Math.min(Math.max(value, 0), maxRating);
  const roundedValue = Math.round(normalizedValue * 2) / 2;
  const iconSlots = Math.max(1, Math.round(maxRating));
  const ratingClass = clsx("rating-display", {
    "rating-display--left": preferences.alignment === Alignment.LEFT,
    "rating-display--center": !preferences.alignment || preferences.alignment === Alignment.CENTER,
    "rating-display--right": preferences.alignment === Alignment.RIGHT
  });
  const fullIcons = Math.min(iconSlots, Math.floor(roundedValue));
  const hasHalfIcon = roundedValue % 1 !== 0 && fullIcons < iconSlots;
  const emptyIcons = Math.max(0, iconSlots - fullIcons - (hasHalfIcon ? 1 : 0));
  const getIcon = (type, key) => {
    const style = preferences.ratingStyle || RatingStyle.STARS;
    const iconSize = 30;
    if (style === RatingStyle.HEARTS) {
      if (type === "full") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HeartFilled, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 96,
          columnNumber: 16
        }, void 0);
      } else if (type === "half") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HeartHalf, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 98,
          columnNumber: 16
        }, void 0);
      } else {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HeartEmpty, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 100,
          columnNumber: 16
        }, void 0);
      }
    } else if (style === RatingStyle.CIRCLES) {
      if (type === "full") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleFilled, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 104,
          columnNumber: 16
        }, void 0);
      } else if (type === "half") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHalf, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 106,
          columnNumber: 16
        }, void 0);
      } else {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleEmpty, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 108,
          columnNumber: 16
        }, void 0);
      }
    } else {
      if (type === "full") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StarFilled, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 113,
          columnNumber: 16
        }, void 0);
      } else if (type === "half") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StarHalf, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 115,
          columnNumber: 16
        }, void 0);
      } else {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StarEmpty, { size: iconSize }, key, false, {
          fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
          lineNumber: 117,
          columnNumber: 16
        }, void 0);
      }
    }
  };
  const getRatingAriaLabel = () => {
    const style = preferences.ratingStyle || RatingStyle.STARS;
    const styleLabel = style === RatingStyle.HEARTS ? "hearts" : style === RatingStyle.CIRCLES ? "circles" : "stars";
    return `Rating: ${roundedValue} out of ${maxRating} ${styleLabel}`;
  };
  const isInteractive = onClick || onKeyDown;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      id: blockRef,
      className: ratingClass,
      onClick,
      onKeyDown,
      role: isInteractive ? "button" : "img",
      "aria-label": getRatingAriaLabel(),
      tabIndex,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rating-display__container", children: [
        Array.from({ length: fullIcons }, (_, i) => getIcon("full", `full-${i}`)),
        hasHalfIcon && getIcon("half", "half"),
        Array.from({ length: emptyIcons }, (_, i) => getIcon("empty", `empty-${i}`))
      ] }, void 0, true, {
        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
        lineNumber: 143,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/shared/charts/core/rating-core.tsx",
      lineNumber: 134,
      columnNumber: 5
    },
    void 0
  );
};
export {
  RatingCore
};

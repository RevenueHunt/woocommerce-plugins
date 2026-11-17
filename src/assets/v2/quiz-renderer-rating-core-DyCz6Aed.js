import { clsx, Alignment, jsxRuntimeExports, RatingStyle, HeartFilled, HeartHalf, HeartEmpty, CircleFilled, CircleHalf, CircleEmpty, StarFilled, StarHalf, StarEmpty } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
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
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeartFilled, { size: iconSize }, key);
      } else if (type === "half") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeartHalf, { size: iconSize }, key);
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeartEmpty, { size: iconSize }, key);
      }
    } else if (style === RatingStyle.CIRCLES) {
      if (type === "full") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleFilled, { size: iconSize }, key);
      } else if (type === "half") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHalf, { size: iconSize }, key);
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleEmpty, { size: iconSize }, key);
      }
    } else {
      if (type === "full") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StarFilled, { size: iconSize }, key);
      } else if (type === "half") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StarHalf, { size: iconSize }, key);
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StarEmpty, { size: iconSize }, key);
      }
    }
  };
  const getRatingAriaLabel = () => {
    const style = preferences.ratingStyle || RatingStyle.STARS;
    const styleLabel = style === RatingStyle.HEARTS ? "hearts" : style === RatingStyle.CIRCLES ? "circles" : "stars";
    return `Rating: ${roundedValue} out of ${maxRating} ${styleLabel}`;
  };
  const isInteractive = onClick || onKeyDown;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: blockRef,
      className: ratingClass,
      onClick,
      onKeyDown,
      role: isInteractive ? "button" : "img",
      "aria-label": getRatingAriaLabel(),
      tabIndex,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rating-display__container", children: [
        Array.from({ length: fullIcons }, (_, i) => getIcon("full", `full-${i}`)),
        hasHalfIcon && getIcon("half", "half"),
        Array.from({ length: emptyIcons }, (_, i) => getIcon("empty", `empty-${i}`))
      ] })
    }
  );
};
export {
  RatingCore
};

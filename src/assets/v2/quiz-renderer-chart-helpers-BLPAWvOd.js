import { NeedleStyle } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
const PREVIEW_MIN_RATIO = 0.4;
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash);
}
function getPreviewValue(inBuilder, isVariable, actualValue, min, max, blockRef) {
  if (inBuilder && isVariable && actualValue === 0 && blockRef) {
    const range = max - min;
    const hash = hashString(blockRef);
    const ratio = PREVIEW_MIN_RATIO + hash % 40 / 100;
    return min + Math.floor(range * ratio);
  }
  return actualValue;
}
const NEEDLE_LENGTH_RATIO = 0.9;
const NEEDLE_BASE_WIDTH_RATIO = 0.195;
const NEEDLE_CENTER_DOT_CLASSIC = 6;
const NEEDLE_CENTER_DOT_MODERN = 8;
function createNeedlePlugin(value, max, style = NeedleStyle.CLASSIC, needleColor = "#0f172a") {
  if (style === NeedleStyle.NONE) return null;
  return {
    id: "gaugeNeedle",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data.length) return;
      const arcElement = meta.data[0];
      const cx = arcElement.x;
      const cy = arcElement.y;
      const outer = arcElement.outerRadius;
      const inner = arcElement.innerRadius;
      const angle = Math.PI * (1 - value / max);
      const r = outer * NEEDLE_LENGTH_RATIO;
      const nx = cx + r * Math.cos(angle);
      const ny = cy - r * Math.sin(angle);
      ctx.save();
      switch (style) {
        case NeedleStyle.CLASSIC:
          drawClassicNeedle(ctx, cx, cy, nx, ny, needleColor);
          break;
        case NeedleStyle.MODERN:
          drawModernNeedle(ctx, cx, cy, nx, ny, inner, needleColor);
          break;
      }
      ctx.restore();
    }
  };
}
function drawClassicNeedle(ctx, cx, cy, nx, ny, needleColor) {
  ctx.strokeStyle = needleColor;
  ctx.fillStyle = needleColor;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(nx, ny);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, NEEDLE_CENTER_DOT_CLASSIC, 0, Math.PI * 2);
  ctx.fill();
}
function drawModernNeedle(ctx, cx, cy, nx, ny, innerRadius, needleColor) {
  const angle = Math.atan2(ny - cy, nx - cx);
  const baseLength = innerRadius * NEEDLE_BASE_WIDTH_RATIO;
  const bx1 = cx + baseLength * Math.cos(angle + Math.PI / 2);
  const by1 = cy + baseLength * Math.sin(angle + Math.PI / 2);
  const bx2 = cx + baseLength * Math.cos(angle - Math.PI / 2);
  const by2 = cy + baseLength * Math.sin(angle - Math.PI / 2);
  ctx.fillStyle = needleColor;
  ctx.beginPath();
  ctx.moveTo(nx, ny);
  ctx.lineTo(bx1, by1);
  const backAngle1 = Math.atan2(by1 - cy, bx1 - cx);
  const backAngle2 = Math.atan2(by2 - cy, bx2 - cx);
  ctx.arc(cx, cy, baseLength, backAngle1, backAngle2, false);
  ctx.lineTo(nx, ny);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, NEEDLE_CENTER_DOT_MODERN, 0, Math.PI * 2);
  ctx.fillStyle = needleColor;
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();
}
function buildFilledGaugeData(value, min, max, filledColor, emptyColor) {
  const normalizedValue = Math.min(Math.max(value, min), max);
  const remainingValue = max - normalizedValue;
  return {
    data: [normalizedValue - min, remainingValue],
    backgroundColor: [filledColor, emptyColor],
    borderWidth: 0
  };
}
const DEFAULT_CHART_COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#C9CBCF"
];
export {
  DEFAULT_CHART_COLORS,
  buildFilledGaugeData,
  createNeedlePlugin,
  getPreviewValue
};

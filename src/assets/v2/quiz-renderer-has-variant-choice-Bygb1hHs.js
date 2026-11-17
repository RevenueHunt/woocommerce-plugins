const hasVariantChoice = (product) => {
  var _a, _b;
  return (((_b = (_a = product == null ? void 0 : product.variants) == null ? void 0 : _a.edges) == null ? void 0 : _b.length) ?? 0) > 1;
};
export {
  hasVariantChoice
};

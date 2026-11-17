const SHOPIFY_DEFAULT_VARIANT_TITLE = "Default Title";
const getVariantDisplayTitle = ({
  productTitle,
  variantTitle,
  separator = " / "
}) => {
  const normalizedProductTitle = (productTitle == null ? void 0 : productTitle.trim()) ?? "";
  const normalizedVariantTitle = (variantTitle == null ? void 0 : variantTitle.trim()) ?? "";
  if (!normalizedVariantTitle || normalizedVariantTitle === SHOPIFY_DEFAULT_VARIANT_TITLE) {
    return normalizedProductTitle;
  }
  if (!normalizedProductTitle) {
    return normalizedVariantTitle;
  }
  return `${normalizedProductTitle}${separator}${normalizedVariantTitle}`;
};
export {
  SHOPIFY_DEFAULT_VARIANT_TITLE,
  getVariantDisplayTitle
};

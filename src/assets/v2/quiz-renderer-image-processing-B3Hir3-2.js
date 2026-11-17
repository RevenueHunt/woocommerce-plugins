var BlockType = /* @__PURE__ */ ((BlockType2) => {
  BlockType2["HEADING"] = "heading";
  BlockType2["TEXT"] = "text";
  BlockType2["INPUT"] = "input";
  BlockType2["PHONE"] = "phone";
  BlockType2["LEGAL"] = "legal";
  BlockType2["CHOICE"] = "choice";
  BlockType2["STATEMENT"] = "statement";
  BlockType2["YES_NO"] = "yes_no";
  BlockType2["BUTTON"] = "button";
  BlockType2["IMAGE"] = "image";
  BlockType2["VIDEO"] = "video";
  BlockType2["CUSTOM_HTML"] = "custom_html";
  BlockType2["GAUGE_CHART"] = "gauge_chart";
  BlockType2["RADAR_CHART"] = "radar_chart";
  BlockType2["BAR_CHART"] = "bar_chart";
  BlockType2["CUSTOM_CHART"] = "custom_chart";
  BlockType2["RATING_CHART"] = "rating_chart";
  return BlockType2;
})(BlockType || {});
var ChoiceType = /* @__PURE__ */ ((ChoiceType2) => {
  ChoiceType2["MULTIPLE_CHOICE"] = "multiple_choice";
  ChoiceType2["PICTURE_CHOICE"] = "picture_choice";
  ChoiceType2["DROPDOWN_CHOICE"] = "dropdown_choice";
  ChoiceType2["SLIDER_CHOICE"] = "slider_choice";
  ChoiceType2["YES_NO"] = "yes_no";
  ChoiceType2["LEGAL_GDPR"] = "legal_gdpr";
  return ChoiceType2;
})(ChoiceType || {});
var PictureType = /* @__PURE__ */ ((PictureType2) => {
  PictureType2["TINY_ICON"] = "tiny_icon";
  PictureType2["SMALL_ICON"] = "small_icon";
  PictureType2["MEDIUM_SQUARE"] = "medium_square";
  PictureType2["LARGE_FOUR_THREE"] = "large_four_three";
  PictureType2["ORIGINAL"] = "original";
  return PictureType2;
})(PictureType || {});
var InputType = /* @__PURE__ */ ((InputType2) => {
  InputType2["SHORT_TEXT"] = "short_text";
  InputType2["LONG_TEXT"] = "long_text";
  InputType2["EMAIL"] = "email";
  InputType2["FULL_NAME"] = "full_name";
  InputType2["FIRST_NAME"] = "first_name";
  InputType2["LAST_NAME"] = "last_name";
  InputType2["NUMBER"] = "number";
  InputType2["PHONE"] = "phone";
  InputType2["DATE"] = "date";
  InputType2["UPLOAD"] = "upload";
  return InputType2;
})(InputType || {});
const PII_INPUT_TYPES = [
  "email",
  "phone",
  "full_name",
  "first_name",
  "last_name",
  "short_text",
  "long_text"
  /* LONG_TEXT */
];
const processImageResultsProduct = (url, optimizeImageSize, pictureSize) => {
  if (!optimizeImageSize || !url) {
    return url;
  }
  const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  try {
    const imageUrl = new URL(url);
    const fixedSize = 214 * pixelRatio;
    imageUrl.searchParams.set("width", fixedSize.toString());
    if (pictureSize === PictureType.MEDIUM_SQUARE) {
      imageUrl.searchParams.set("height", fixedSize.toString());
    }
    return imageUrl.toString();
  } catch (error) {
    console.error("processImageResultsProduct: Error processing image URL:", error);
    return url;
  }
};
const processImagePictureChoice = (url, optimizeImageSize, pictureSize) => {
  if (!optimizeImageSize) {
    return url;
  }
  const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  try {
    const imageUrl = new URL(url);
    let width;
    let height;
    switch (pictureSize) {
      case PictureType.TINY_ICON:
        width = 24 * pixelRatio;
        height = 24 * pixelRatio;
        break;
      case PictureType.SMALL_ICON:
        width = 48 * pixelRatio;
        height = 48 * pixelRatio;
        break;
      case PictureType.MEDIUM_SQUARE:
        width = 176 * pixelRatio;
        height = 176 * pixelRatio;
        break;
      case PictureType.LARGE_FOUR_THREE:
        width = 236 * pixelRatio;
        height = 175 * pixelRatio;
        break;
      default:
        console.warn(
          `processImagePictureChoice: Unknown pictureSize for optimization: ${pictureSize}`
        );
        return url;
    }
    imageUrl.searchParams.set("width", width.toString());
    imageUrl.searchParams.set("height", height.toString());
    return imageUrl.toString();
  } catch (error) {
    console.error("processImagePictureChoice: Error processing image URL:", error);
    return url;
  }
};
export {
  BlockType,
  ChoiceType,
  InputType,
  PII_INPUT_TYPES,
  PictureType,
  processImagePictureChoice,
  processImageResultsProduct
};

const validCurrencyFormats = [
  "amount",
  "amount_no_decimals",
  "amount_with_comma_separator",
  "amount_no_decimals_with_comma_separator",
  "amount_with_apostrophe_separator",
  "amount_no_decimals_with_space_separator",
  "amount_with_space_separator",
  "amount_with_period_and_space_separator"
];
const defaultCurrencyFormat = (price) => {
  return `${formatPrice(price)} ${price.currencyCode}`;
};
const getCurrencyFormatVariable = (currencyFormat) => {
  if (!currencyFormat) return null;
  const match = currencyFormat.match(/{{\s*(\w+)\s*}}/);
  const variable = match == null ? void 0 : match[1];
  if (!variable || !validCurrencyFormats.includes(variable)) {
    return null;
  }
  return variable;
};
const getNumberFormatOptions = (variable, preserveDecimals) => {
  const usesDecimals = variable === "amount" || variable === "amount_with_comma_separator" || variable === "amount_with_apostrophe_separator" || variable === "amount_with_space_separator" || variable === "amount_with_period_and_space_separator";
  if (!preserveDecimals) {
    return {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    };
  }
  return usesDecimals ? {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  } : {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };
};
const formatNumber = (value, locale, options, postProcess) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "decimal",
    useGrouping: true,
    ...options
  }).format(value);
  return postProcess ? postProcess(formattedValue) : formattedValue;
};
const formatNumberByCurrencyVariable = (value, variable, options) => {
  switch (variable) {
    case "amount":
    case "amount_no_decimals":
      return formatNumber(value, "en-US", options);
    case "amount_with_comma_separator":
    case "amount_no_decimals_with_comma_separator":
      return formatNumber(value, "de-DE", options);
    case "amount_with_apostrophe_separator":
      return formatNumber(
        value,
        "en-US",
        options,
        (formattedValue) => formattedValue.replace(/,/g, "'")
      );
    case "amount_no_decimals_with_space_separator":
    case "amount_with_space_separator":
      return formatNumber(
        value,
        "fr-FR",
        options,
        (formattedValue) => formattedValue.replace(/\s/g, " ")
      );
    case "amount_with_period_and_space_separator":
      return formatNumber(
        value,
        "en-US",
        options,
        (formattedValue) => formattedValue.replace(/,/g, " ")
      );
    default:
      return formatNumber(value, "en-US", options);
  }
};
const formatPriceAmount = (value, currencyFormat) => {
  const variable = getCurrencyFormatVariable(currencyFormat);
  if (!variable) {
    return formatNumber(value, "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  return formatNumberByCurrencyVariable(value, variable, getNumberFormatOptions(variable, true));
};
const formatMeasurementAmount = (value, currencyFormat) => {
  const variable = getCurrencyFormatVariable(currencyFormat);
  if (!variable) {
    return formatNumber(value, "en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
  return formatNumberByCurrencyVariable(value, variable, getNumberFormatOptions(variable, false));
};
const formatPrice = (price) => {
  const numAmount = parseFloat(String(price.amount));
  if (isNaN(numAmount)) {
    console.warn("Invalid price amount in formatPrice:", price.amount);
    return "0.00";
  }
  return formatPriceAmount(numAmount);
};
const normalizeUnit = (unit) => {
  return unit.toLowerCase().replace(/_/g, " ");
};
const formatMeasurementValue = (value, currencyFormat) => {
  if (!Number.isFinite(value)) return null;
  return formatMeasurementAmount(value, currencyFormat);
};
const formatUnitPrice = ({
  unitPrice,
  measurement,
  currencyFormat
}) => {
  if (!unitPrice) return null;
  const referenceUnit = measurement == null ? void 0 : measurement.referenceUnit;
  const referenceValue = measurement == null ? void 0 : measurement.referenceValue;
  if (!referenceUnit || referenceValue == null || referenceValue <= 0) {
    return null;
  }
  const normalizedUnit = normalizeUnit(referenceUnit);
  const formattedReferenceValue = referenceValue === 1 ? null : formatMeasurementValue(referenceValue, currencyFormat);
  if (referenceValue !== 1 && !formattedReferenceValue) {
    return null;
  }
  const measurementLabel = formattedReferenceValue != null ? `${formattedReferenceValue} ${normalizedUnit}` : normalizedUnit;
  return `${formatPriceWithCurrency(unitPrice, currencyFormat)} / ${measurementLabel}`;
};
const getDefaultUnitPricePreview = (currencyFormat) => {
  return formatUnitPrice({
    unitPrice: {
      amount: "99.95",
      currencyCode: "USD"
    },
    measurement: {
      quantityUnit: "KG",
      quantityValue: 1,
      referenceUnit: "KG",
      referenceValue: 1
    },
    currencyFormat
  });
};
const formatPriceWithCurrency = (price, currencyFormat) => {
  if (!currencyFormat) return defaultCurrencyFormat(price);
  const variable = getCurrencyFormatVariable(currencyFormat);
  if (!variable) {
    return defaultCurrencyFormat(price);
  }
  const numAmount = parseFloat(String(price.amount));
  if (isNaN(numAmount)) {
    console.warn(
      "Invalid price amount in formatPriceWithCurrency:",
      price.amount,
      "for format:",
      variable
    );
    return defaultCurrencyFormat(price);
  }
  const formattedPrice = formatPriceAmount(numAmount, currencyFormat);
  return currencyFormat.replace(/{{\s*\w+\s*}}/, formattedPrice);
};
export {
  formatPriceWithCurrency,
  formatUnitPrice,
  getDefaultUnitPricePreview
};

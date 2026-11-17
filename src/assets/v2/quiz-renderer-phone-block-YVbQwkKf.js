const __vite__fileDeps=["./quiz-renderer-index-BNeI52BW.js","./quiz-renderer-phone-lib-Dsktln2P.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload } from "./quiz-renderer.js";
import { useQuizStore, reactExports, useQuestionLabelledBy, jsxRuntimeExports, PhoneInput } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
import { getPrefixFromCountryCode, countryData } from "./quiz-renderer-country-data-CuDUzlny.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
const getShopifyCountry = () => {
  var _a;
  if (typeof window === "undefined") return null;
  try {
    const shopifyCountry = (_a = window.Shopify) == null ? void 0 : _a.country;
    if (!shopifyCountry || typeof shopifyCountry !== "string") {
      return null;
    }
    const isValidCountry = countryData.some(
      (country) => country.code === shopifyCountry.toUpperCase()
    );
    if (!isValidCountry) {
      console.warn("Shopify.country contains invalid country code:", shopifyCountry);
      return null;
    }
    return shopifyCountry.toUpperCase();
  } catch (error) {
    console.warn("Error accessing Shopify.country:", error);
    return null;
  }
};
const getInitialCountryCode = (defaultCountryCode) => {
  const shopifyCountry = getShopifyCountry();
  if (shopifyCountry) {
    console.log("Using Shopify.country:", shopifyCountry);
    return shopifyCountry;
  }
  return defaultCountryCode || "US";
};
const PhoneBlock = ({ block }) => {
  const {
    answer,
    updateAnswerByBlockRef,
    getTranslatedContent,
    next,
    getAnswersByBlockRef,
    getQuestionByQuestionBlockRef
  } = useQuizStore((state) => ({
    answer: state.getAnswerByBlockRef(block.ref),
    updateAnswerByBlockRef: state.updateAnswerByBlockRef,
    getTranslatedContent: state.getTranslatedContent,
    design: state.design,
    next: state.next,
    getAnswersByBlockRef: state.getAnswersByBlockRef,
    getQuestionByQuestionBlockRef: state.getQuestionByQuestionBlockRef
  }));
  const inputRef = reactExports.useRef(null);
  const [countryCode, setCountryCode] = reactExports.useState(
    getInitialCountryCode(block.preferences.defaultCountryCode)
  );
  const [tel, setTel] = reactExports.useState("");
  const [showError, setShowError] = reactExports.useState(false);
  const [hasFirstBlur, setHasFirstBlur] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [libPhoneNumber, setLibPhoneNumber] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    const loadLibrary = async () => {
      setIsLoading(true);
      try {
        const lib = await __vitePreload(() => import("./quiz-renderer-index-BNeI52BW.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url);
        if (isMounted) {
          setLibPhoneNumber(lib);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load libphonenumber-js:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadLibrary();
    return () => {
      isMounted = false;
    };
  }, []);
  reactExports.useEffect(() => {
    if (!libPhoneNumber || !(answer == null ? void 0 : answer.value)) return;
    try {
      const phoneNumber = libPhoneNumber.parsePhoneNumber(answer.value);
      const savedTel = (phoneNumber == null ? void 0 : phoneNumber.nationalNumber) || "";
      const savedCountryCode = (phoneNumber == null ? void 0 : phoneNumber.country) || "US";
      setCountryCode(savedCountryCode);
      setTel(savedTel);
      setShowError(Boolean(savedCountryCode && savedTel && !answer.isValid));
    } catch (error) {
      console.error("Error parsing phone number:", error);
    }
  }, [answer, libPhoneNumber]);
  reactExports.useEffect(() => {
    if (libPhoneNumber && tel) {
      updateAnswer(tel);
    }
  }, [countryCode]);
  const updateAnswer = (currentTel) => {
    if (!libPhoneNumber) return;
    try {
      const phoneNumber = libPhoneNumber.parsePhoneNumber(
        currentTel,
        countryCode || "US"
      );
      const isValid = !!(phoneNumber && phoneNumber.isValid()) || !phoneNumber && currentTel.length === 0 && block.preferences.optional;
      if (isValid) {
        updateAnswerByBlockRef(block.ref, { value: phoneNumber == null ? void 0 : phoneNumber.format("E.164") }, true);
      } else {
        updateAnswerByBlockRef(block.ref, { value: "" }, false);
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      updateAnswerByBlockRef(block.ref, { value: "" }, false);
    }
  };
  const handleChange = (e) => {
    const newTel = e.target.value;
    setTel(newTel);
    if (libPhoneNumber) {
      updateAnswer(newTel);
    }
    const prefix = getPrefixFromCountryCode(countryCode || "US");
    if (hasFirstBlur && prefix && newTel) {
      setShowError(true);
    }
  };
  const handleBlur = () => {
    const prefix = getPrefixFromCountryCode(countryCode || "US");
    if (prefix && tel) {
      setShowError(true);
      setHasFirstBlur(true);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const isDisabled = getAnswersByBlockRef(block.ref).some((answer2) => !answer2.isValid);
      if (!isDisabled) {
        const question = getQuestionByQuestionBlockRef(block.ref);
        if (question) next(question.ref);
      }
    }
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      requestAnimationFrame(() => {
        if (document.activeElement !== e.currentTarget) {
          e.currentTarget.focus();
        }
      });
    }
  };
  const placeholder = block.preferences.inputPlaceholder || getTranslatedContent({ key: "input_placeholder_phone" });
  const errorId = `${block.ref}-error`;
  const labelledBy = useQuestionLabelledBy(block.ref);
  const hasError = showError && !(answer == null ? void 0 : answer.isValid) && block.preferences.errorMessage;
  const isRequired = !block.preferences.optional;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxWidth: "100%" }, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "phone-block-loading", children: getTranslatedContent({ key: "loading" }) || "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-phone__container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneInput, { countryCode, setCountryCode }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          id: block.ref,
          type: "tel",
          name: "tel",
          autoComplete: "tel-national",
          placeholder,
          value: tel,
          onChange: handleChange,
          onBlur: handleBlur,
          onKeyDown: handleKeyDown,
          onTouchStart: (e) => handleTouchStart(e),
          disabled: !countryCode,
          "aria-label": placeholder,
          "aria-labelledby": labelledBy,
          "aria-invalid": showError && !(answer == null ? void 0 : answer.isValid),
          "aria-describedby": hasError ? errorId : void 0,
          "aria-required": isRequired
        }
      )
    ] }),
    hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: errorId, role: "alert", className: "question-block__input-error-message", children: block.preferences.errorMessage })
  ] }) });
};
export {
  PhoneBlock
};

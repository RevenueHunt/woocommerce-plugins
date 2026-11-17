const __vite__fileDeps=["./quiz-renderer-react-dropdown-select-C_fZ-ugW.js","./quiz-renderer-json-renderer-CJBOnGnk.js","./quiz-renderer-index-BXMeXr7c.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-country-data-CuDUzlny.js","./quiz-renderer2.css","./quiz-renderer-slot-result-block-helper-B64MgNga.js","./quiz-renderer-storeFrontClient-Dh-TPIVy.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload } from "./quiz-renderer.js";
import { useInspectorWrapper, useLanguageDirection, useQuestionHeadingId, jsxRuntimeExports, usePlainTextContent, reactExports } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
import { choiceSelectIndicator } from "./quiz-renderer-slot-result-block-helper-B64MgNga.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-country-data-CuDUzlny.js";
import "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
function PlainTextOption({ value, label, dir }) {
  const plainText = usePlainTextContent(label);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, dir, children: plainText });
}
const NativeDropdown = ({
  choices,
  handleSetChoicesRefs,
  placeholder,
  selectedChoiceRefs
}) => {
  var _a, _b;
  const InspectorWrapper = useInspectorWrapper();
  const dir = useLanguageDirection();
  const headingId = useQuestionHeadingId();
  const selectedValue = selectedChoiceRefs.length > 0 ? selectedChoiceRefs[0] : "";
  const handleChange = (event) => {
    const { value } = event.target;
    if (value) {
      handleSetChoicesRefs([value]);
      return;
    }
    handleSetChoicesRefs([]);
  };
  const selectContent = /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "select-wrapper",
      onTouchStart: (event) => event.stopPropagation(),
      onTouchEnd: (event) => event.stopPropagation(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-variants-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "select-variants",
            dir,
            value: selectedValue,
            onChange: handleChange,
            "aria-label": placeholder,
            "aria-labelledby": headingId,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
              choices.map((choice) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlainTextOption, { value: choice.ref, label: choice.label, dir }, choice.ref))
            ]
          }
        ),
        choiceSelectIndicator
      ] })
    }
  );
  if (InspectorWrapper) {
    const elementRef = ((_a = choices[0]) == null ? void 0 : _a.ref) ?? placeholder;
    const elementName = ((_b = choices[0]) == null ? void 0 : _b.label) ?? placeholder;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(InspectorWrapper, { elementRef, elementName, elementType: "choice", children: selectContent });
  }
  return selectContent;
};
const ReactDropdownSelect = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-react-dropdown-select-C_fZ-ugW.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0, import.meta.url).then((module) => ({
    default: module.ReactDropdownSelect
  }))
);
const Dropdown = ({
  choices,
  multipleSelection,
  handleSetChoicesRefs,
  content,
  enableOptionsSearch,
  placeholder,
  selectedChoiceRefs
}) => {
  const parseChoices = reactExports.useMemo(() => {
    return choices.map((choice) => ({
      label: choice.label,
      value: choice.ref
    }));
  }, [choices]);
  if (!multipleSelection) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NativeDropdown,
      {
        choices,
        handleSetChoicesRefs,
        placeholder,
        selectedChoiceRefs
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ReactDropdownSelect,
    {
      options: parseChoices,
      content,
      multipleSelection,
      handleSetChoicesRefs,
      enableOptionsSearch,
      placeholder,
      selectedChoiceRefs
    }
  ) });
};
export {
  Dropdown as default
};

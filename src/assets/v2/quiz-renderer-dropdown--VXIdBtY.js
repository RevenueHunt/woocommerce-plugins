const __vite__fileDeps=["./quiz-renderer-react-dropdown-select-CnJA64d0.js","./quiz-renderer-json-renderer-B6X3VaGt.js","./quiz-renderer-index-BXMeXr7c.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-country-data-CuDUzlny.js","./quiz-renderer.1794999939598.css","./quiz-renderer-slot-result-block-helper-Bu2JEZ26.js","./quiz-renderer-storeFrontClient-Dh-TPIVy.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload } from "./quiz-renderer.js";
import { useInspectorWrapper, useLanguageDirection, useQuestionHeadingId, jsxDevRuntimeExports, usePlainTextContent, reactExports } from "./quiz-renderer-json-renderer-B6X3VaGt.js";
import { choiceSelectIndicator } from "./quiz-renderer-slot-result-block-helper-Bu2JEZ26.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-country-data-CuDUzlny.js";
import "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
function PlainTextOption({ value, label, dir }) {
  const plainText = usePlainTextContent(label);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value, dir, children: plainText }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
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
  const selectContent = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "select-wrapper",
      onTouchStart: (event) => event.stopPropagation(),
      onTouchEnd: (event) => event.stopPropagation(),
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "select-variants-container", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "select",
          {
            className: "select-variants",
            dir,
            value: selectedValue,
            onChange: handleChange,
            "aria-label": placeholder,
            "aria-labelledby": headingId,
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: placeholder }, void 0, false, {
                fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
                lineNumber: 70,
                columnNumber: 11
              }, void 0),
              choices.map((choice) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PlainTextOption, { value: choice.ref, label: choice.label, dir }, choice.ref, false, {
                fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
                lineNumber: 72,
                columnNumber: 13
              }, void 0))
            ]
          },
          void 0,
          true,
          {
            fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
            lineNumber: 61,
            columnNumber: 9
          },
          void 0
        ),
        choiceSelectIndicator
      ] }, void 0, true, {
        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
        lineNumber: 60,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
      lineNumber: 55,
      columnNumber: 5
    },
    void 0
  );
  if (InspectorWrapper) {
    const elementRef = ((_a = choices[0]) == null ? void 0 : _a.ref) ?? placeholder;
    const elementName = ((_b = choices[0]) == null ? void 0 : _b.label) ?? placeholder;
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InspectorWrapper, { elementRef, elementName, elementType: "choice", children: selectContent }, void 0, false, {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/native-dropdown.tsx",
      lineNumber: 85,
      columnNumber: 7
    }, void 0);
  }
  return selectContent;
};
const ReactDropdownSelect = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-react-dropdown-select-CnJA64d0.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0, import.meta.url).then((module) => ({
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      NativeDropdown,
      {
        choices,
        handleSetChoicesRefs,
        placeholder,
        selectedChoiceRefs
      },
      void 0,
      false,
      {
        fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/dropdown.tsx",
        lineNumber: 38,
        columnNumber: 7
      },
      void 0
    );
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ReactDropdownSelect,
    {
      options: parseChoices,
      content,
      multipleSelection,
      handleSetChoicesRefs,
      enableOptionsSearch,
      placeholder,
      selectedChoiceRefs
    },
    void 0,
    false,
    {
      fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/dropdown.tsx",
      lineNumber: 50,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/Users/kulupu/Desktop/src/RevenueHunt/worktrees/storefront-words/v2/frontend_v2/app/components/quiz/blocks/question-specific/choice/dropdown.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, void 0);
};
export {
  Dropdown as default
};

const __vite__fileDeps=["./quiz-renderer-dropdown-DufWh-qn.js","./quiz-renderer.js","./quiz-renderer-slot-result-block-helper-B64MgNga.js","./quiz-renderer-storeFrontClient-Dh-TPIVy.js","./quiz-renderer-index-BXMeXr7c.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-trackers-bundle-Do5Gpowk.js","./quiz-renderer-shopifyCart-BtEmfGDv.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-country-data-CuDUzlny.js","./quiz-renderer-react-dropdown-select-C_fZ-ugW.js","./quiz-renderer-phone-block-YVbQwkKf.js","./quiz-renderer-index-1sobdtHv.js","./quiz-renderer-chart-error-boundary-BBV35ubO.js","./quiz-renderer-chart-result-block-Bv24ds-4.js","./quiz-renderer-custom-chart-core-DUcUrm7y.js","./quiz-renderer-chart-helpers-BLPAWvOd.js","./quiz-renderer-rating-block-DgJgPmrE.js","./quiz-renderer-rating-core-DyCz6Aed.js","./quiz-renderer-result-preview-7PYqPT8-.js","./quiz-renderer-cart-hGLiNvFe.js","./quiz-renderer-currency-helper-ggAAwMUm.js","./quiz-renderer-has-variant-choice-Bygb1hHs.js","./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js","./quiz-renderer-variant-title-B1Oi9SHh.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { object, optional, parse as parse$5, boolean, string, picklist, omit, array, pipe, minLength, fallback, transform, number, literal, union, variant, pick, record, nullable, any, safeParse } from "./quiz-renderer-index-BXMeXr7c.js";
import { BlockType, ChoiceType, PictureType, InputType, PII_INPUT_TYPES, processImagePictureChoice } from "./quiz-renderer-image-processing-B3Hir3-2.js";
import { trackPhoneSubmitted, trackEmailSubmitted, trackBlocksAnswered, trackQuizStart, trackQuizComplete, trackFlowEvent, trackQuizCompletedWithRedirect } from "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import { CREATE_RESPONSE_URL, GET_RESPONSE_URL, __vitePreload, OVER_PLAN_COPY, OVER_PLAN_MAX_COUNTDOWN, overPlanSeconds } from "./quiz-renderer.js";
import { evaluateAndConditions, tagCart } from "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import { postQuizRendererMessage } from "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import { countryData, getPrefixFromCountryCode, getCountryName, getFlagImage } from "./quiz-renderer-country-data-CuDUzlny.js";
function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e = m2[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k2 in e) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d = Object.getOwnPropertyDescriptor(e, k2);
          if (d) {
            Object.defineProperty(n2, k2, d.get ? d : {
              enumerable: true,
              get: () => e[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule) return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a.prototype = f2.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a, k2, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x$1 = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape$1(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape$1("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r$1;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x$1, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React$2 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React$3 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React$2
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
const payloadSchema = object({
  includeProductVariants: optional(boolean(), true),
  includeCustomHtml: optional(boolean(), true)
});
const csvExportSchema = object({
  columns: array(
    object({
      key: pipe(string(), minLength(1)),
      label: optional(string()),
      hidden: optional(boolean())
    })
  )
});
const preferencesSchema = object({
  setUTMSource: optional(boolean(), false),
  colorSchemeId: optional(string(), "default"),
  trackGA4Events: optional(boolean(), false),
  trackMetaPixel: optional(boolean(), false),
  trackTiktokPixel: optional(boolean(), false),
  tiktokPixelId: optional(string()),
  saveQuizProgress: optional(boolean(), true),
  prefillOnRetake: optional(boolean(), false),
  personalDataDeletionDays: optional(picklist([14, 30, 60, 90])),
  // defaultCountryCode: v.optional(v.string(), 'US'),
  // defaultCountryPrefix: v.optional(v.string(), '+1'),
  pushShopifyCustomers: optional(boolean(), false),
  addMetaViewportTag: optional(boolean(), false),
  reviewApp: optional(picklist(["none", "judgeme", "yotpo", "stamped", "loox"]), "none"),
  // Only 'none' matters: it hides Subscription blocks (older quizzes). Adding a block sets
  // shopify_subscriptions; recharge and shopify_subscriptions both read Shopify selling plans
  subscriptionApp: optional(picklist(["none", "shopify_subscriptions", "recharge"]), "none"),
  payload: optional(payloadSchema, parse$5(payloadSchema, {})),
  language: optional(string(), "en"),
  csvExport: optional(csvExportSchema)
});
const preferencesPublicSchema = omit(preferencesSchema, [
  "pushShopifyCustomers",
  "personalDataDeletionDays",
  "csvExport"
]);
const contentItemSchema = object({
  value: optional(string(), ""),
  category: fallback(picklist(["helper", "button", "accessibility"]), "helper")
});
const contentSchema = object({
  and: optional(contentItemSchema, { value: "and", category: "helper" }),
  next: optional(contentItemSchema, { value: "Next", category: "button" }),
  try_again: optional(contentItemSchema, { value: "Try again", category: "helper" }),
  x_complete: optional(contentItemSchema, { value: "{{percent}}% complete", category: "helper" }),
  add_to_cart: optional(contentItemSchema, { value: "Add to cart", category: "button" }),
  sold_out: optional(contentItemSchema, { value: "Sold out", category: "button" }),
  retake_quiz: optional(contentItemSchema, { value: "Retake quiz", category: "button" }),
  view_product: optional(contentItemSchema, { value: "View product", category: "button" }),
  count_in_cart: optional(contentItemSchema, { value: "{{count}} in cart", category: "button" }),
  increase_quantity: optional(contentItemSchema, {
    value: "Increase quantity",
    category: "button"
  }),
  decrease_quantity: optional(contentItemSchema, {
    value: "Decrease quantity",
    category: "button"
  }),
  drop_file_here: optional(contentItemSchema, { value: "Drop file here", category: "helper" }),
  input_placeholder_upload: optional(contentItemSchema, {
    value: "Drop file here or click to upload",
    category: "helper"
  }),
  phone_filtering: optional(contentItemSchema, { value: "Filtering", category: "helper" }),
  phone_please_select: optional(contentItemSchema, {
    value: "Please select",
    category: "helper"
  }),
  select_no_variants: optional(contentItemSchema, {
    value: "No variants",
    category: "helper"
  }),
  dropdown_select_placeholder: optional(contentItemSchema, {
    value: "Select...",
    category: "helper"
  }),
  dropdown_search_placeholder: optional(contentItemSchema, {
    value: "Search...",
    category: "helper"
  }),
  dropdown_no_more_options_available: optional(contentItemSchema, {
    value: "No more options available",
    category: "helper"
  }),
  select_variant: optional(contentItemSchema, { value: "Select variant", category: "helper" }),
  add_all_to_cart: optional(contentItemSchema, {
    value: "Add all to cart ({{count}})",
    category: "button"
  }),
  file_under_10mb: optional(contentItemSchema, {
    value: "The file size must be less than 10MB",
    category: "helper"
  }),
  proceed_to_cart: optional(contentItemSchema, {
    value: "Proceed to cart ({{count}})",
    category: "button"
  }),
  view_collection: optional(contentItemSchema, { value: "View collection", category: "button" }),
  loading_error_retry: optional(contentItemSchema, {
    value: "We're having trouble saving your answers, retrying... please wait.",
    category: "helper"
  }),
  proceed_to_checkout: optional(contentItemSchema, {
    value: "Proceed to checkout ({{count}})",
    category: "button"
  }),
  loading_error_no_response: optional(contentItemSchema, {
    value: "We're sorry, but there was an issue saving your answers. Please refresh the quiz or try again later.",
    category: "helper"
  }),
  ada_quiz_complete: optional(contentItemSchema, {
    value: "Quiz complete",
    category: "accessibility"
  }),
  ada_no_previous_question: optional(contentItemSchema, {
    value: "No previous question",
    category: "accessibility"
  }),
  ada_previous_question: optional(contentItemSchema, {
    value: "Previous question",
    category: "accessibility"
  }),
  ada_results_bottom_bar: optional(contentItemSchema, {
    value: "Results bottom bar",
    category: "accessibility"
  }),
  ada_answer_before_proceeding: optional(contentItemSchema, {
    value: "Answer before proceeding",
    category: "accessibility"
  }),
  ada_next_question: optional(contentItemSchema, {
    value: "Next question",
    category: "accessibility"
  }),
  ada_quiz_navigation_buttons: optional(contentItemSchema, {
    value: "Quiz navigation buttons",
    category: "accessibility"
  }),
  ada_quiz_progress: optional(contentItemSchema, {
    value: "Quiz progress",
    category: "accessibility"
  }),
  ada_question_choices: optional(contentItemSchema, {
    value: "Question choices",
    category: "accessibility"
  }),
  ada_remove_option: optional(contentItemSchema, {
    value: "Remove {{label}}",
    category: "accessibility"
  }),
  ada_remove_one_from_cart: optional(contentItemSchema, {
    value: "Remove one {{label}}",
    category: "accessibility"
  }),
  review_singular: optional(contentItemSchema, { value: "review", category: "helper" }),
  review_plural: optional(contentItemSchema, { value: "reviews", category: "helper" }),
  subscription_one_time_purchase: optional(contentItemSchema, {
    value: "One-time purchase",
    category: "helper"
  }),
  subscription_subscribe_and_save: optional(contentItemSchema, {
    value: "Subscribe & save",
    category: "helper"
  })
});
const designSchema = pipe(
  object({
    // Accept both customCss and customCSS for backward compatibility
    customCss: optional(string()),
    customCSS: optional(string(), ""),
    fontFamily: optional(string(), "inherit"),
    fontFamilyHeading: optional(string(), "inherit"),
    linkTextColor: optional(string(), "#181212"),
    inputTextColor: optional(string(), "#181212"),
    arrowsDirection: fallback(picklist(["up-down", "left-right"]), "up-down"),
    buttonTextColor: optional(string(), "#ffffff"),
    choiceTextColor: optional(string(), "#181212"),
    inputErrorColor: optional(string(), "#ff7777"),
    inputBorderColor: optional(string(), "#333333"),
    questionTextColor: optional(string(), "#181212"),
    showNavigationBar: optional(boolean(), true),
    quizBackgroundColor: optional(string(), "#ffffff"),
    quizBackgroundImage: optional(string(), ""),
    buttonTextColorHover: optional(string(), "#181212"),
    inputBackgroundColor: optional(string(), "#ffffff"),
    questionHeadingColor: optional(string(), "#181212"),
    buttonBackgroundColor: optional(string(), "#333333"),
    choiceBackgroundColor: optional(string(), "#dddddd"),
    navigationBorderColor: optional(string(), "#C2C2C2"),
    navigationProgressBarColor: optional(string(), "#B7B3B3"),
    inputPlaceholderColor: optional(string(), "#18121250"),
    quizBackgroundOpacity: optional(number(), 20),
    showProgressPercentage: optional(boolean(), true),
    choiceSelectedIconColor: optional(string(), "#b0b0b0"),
    choiceSelectedTextColor: optional(string(), "#181212"),
    productInCartBorderColor: optional(string(), "#333333"),
    dropdownSelectedTextColor: optional(string(), "#181212"),
    navigationBackgroundColor: optional(string(), "#ffffff"),
    navigationTextColor: optional(string(), "#181212"),
    buttonBackgroundColorHover: optional(string(), "#cecece"),
    choiceSelectedBackgroundColor: optional(string(), "#cecece"),
    dropdownSelectedBackgroundColor: optional(string(), "#cecece"),
    productCollectionCardBackgroundColor: optional(string(), "#ffffff"),
    resultsCardTitleColor: optional(string(), "#181212"),
    resultsCardPriceColor: optional(string(), "#181212"),
    resultsCardTextColor: optional(string(), "#181212"),
    resultsCardStarsColor: optional(string(), "#ffd700")
  }),
  // Transform to standardize customCSS and handle backward compatibility
  transform((data) => {
    const customCSS = typeof data.customCss === "string" ? data.customCss : data.customCSS;
    const { customCss, ...rest } = data;
    return {
      ...rest,
      customCSS,
      fontFamilyHeading: data.fontFamilyHeading === void 0 ? data.fontFamily : data.fontFamilyHeading,
      linkTextColor: data.linkTextColor === "#181212" ? data.questionTextColor : data.linkTextColor
    };
  })
);
function generateREF() {
  return "xxxxxxxx".replace(/[xy]/g, function(c) {
    const r2 = Math.random() * 16 | 0, v2 = c == "x" ? r2 : r2 & 3 | 8;
    return v2.toString(16);
  });
}
var ShopifyConsentState = /* @__PURE__ */ ((ShopifyConsentState2) => {
  ShopifyConsentState2["SUBSCRIBED"] = "SUBSCRIBED";
  ShopifyConsentState2["NOT_SUBSCRIBED"] = "NOT_SUBSCRIBED";
  return ShopifyConsentState2;
})(ShopifyConsentState || {});
var ShopifyOptInLevel = /* @__PURE__ */ ((ShopifyOptInLevel2) => {
  ShopifyOptInLevel2["CONFIRMED_OPT_IN"] = "CONFIRMED_OPT_IN";
  ShopifyOptInLevel2["SINGLE_OPT_IN"] = "SINGLE_OPT_IN";
  return ShopifyOptInLevel2;
})(ShopifyOptInLevel || {});
var KlaviyoNoListSelected = /* @__PURE__ */ ((KlaviyoNoListSelected2) => {
  KlaviyoNoListSelected2["NO_LIST_SELECTED"] = "no_list_selected";
  return KlaviyoNoListSelected2;
})(KlaviyoNoListSelected || {});
var HeadingSize = /* @__PURE__ */ ((HeadingSize2) => {
  HeadingSize2["SMALL"] = "small";
  HeadingSize2["MEDIUM"] = "medium";
  HeadingSize2["LARGE"] = "large";
  return HeadingSize2;
})(HeadingSize || {});
var TextSize = /* @__PURE__ */ ((TextSize2) => {
  TextSize2["SMALL"] = "small";
  TextSize2["MEDIUM"] = "medium";
  TextSize2["LARGE"] = "large";
  return TextSize2;
})(TextSize || {});
var ImageSize = /* @__PURE__ */ ((ImageSize2) => {
  ImageSize2["TINY"] = "tiny";
  ImageSize2["SMALL"] = "small";
  ImageSize2["MEDIUM"] = "medium";
  ImageSize2["LARGE"] = "large";
  ImageSize2["FULL"] = "full";
  return ImageSize2;
})(ImageSize || {});
var VideoAspectRatio = /* @__PURE__ */ ((VideoAspectRatio2) => {
  VideoAspectRatio2["HORIZONTAL_16_9"] = "horizontal_16_9";
  VideoAspectRatio2["VERTICAL_9_16"] = "vertical_9_16";
  VideoAspectRatio2["HORIZONTAL_4_3"] = "horizontal_4_3";
  VideoAspectRatio2["VERTICAL_3_4"] = "vertical_3_4";
  VideoAspectRatio2["ADAPT_TO_VIDEO"] = "adapt_to_video";
  return VideoAspectRatio2;
})(VideoAspectRatio || {});
var Alignment = /* @__PURE__ */ ((Alignment2) => {
  Alignment2["LEFT"] = "left";
  Alignment2["CENTER"] = "center";
  Alignment2["RIGHT"] = "right";
  return Alignment2;
})(Alignment || {});
var IncludeOption = /* @__PURE__ */ ((IncludeOption2) => {
  IncludeOption2["REGULAR"] = "regular";
  IncludeOption2["NONE_OF_THE_ABOVE"] = "none_of_the_above";
  IncludeOption2["ALL_OF_THE_ABOVE"] = "all_of_the_above";
  return IncludeOption2;
})(IncludeOption || {});
var SliderType = /* @__PURE__ */ ((SliderType2) => {
  SliderType2["SLIDER"] = "slider";
  SliderType2["BUTTONS_SCALE"] = "buttons_scale";
  SliderType2["RATING_SCALE"] = "rating_scale";
  return SliderType2;
})(SliderType || {});
var MobileLayout = /* @__PURE__ */ ((MobileLayout2) => {
  MobileLayout2["ONE_PER_ROW"] = "one_per_row";
  MobileLayout2["TWO_PER_ROW"] = "two_per_row";
  MobileLayout2["CAROUSEL"] = "carousel";
  return MobileLayout2;
})(MobileLayout || {});
const ensureWrappedContent = pipe(
  string(),
  transform((content) => {
    if (!content || content.trim() === "") return content;
    const trimmed = content.trim();
    const startsWithBlockElement = /^<(p|ul|ol|li|div|h[1-6]|blockquote|pre|table|dl|hr|figure|address|section|article|aside|header|footer|nav|main)[\s>]/i.test(
      trimmed
    );
    if (startsWithBlockElement) {
      return content;
    }
    return `<p>${content}</p>`;
  })
);
function isValidShopifyGid(value, entityType) {
  const gidPattern = new RegExp(`^gid://shopify/${entityType}/\\d+$`);
  return gidPattern.test(value);
}
function filterValidGids(values, entityType) {
  return values.filter((value) => isValidShopifyGid(value, entityType));
}
function createGidArrayValidator(entityType) {
  return pipe(
    array(string()),
    transform((values) => filterValidGids(values, entityType))
  );
}
const validateProductGids = createGidArrayValidator("Product");
const validateCollectionGids = createGidArrayValidator("Collection");
const validateProductVariantGids = createGidArrayValidator("ProductVariant");
var ChartValueSource = /* @__PURE__ */ ((ChartValueSource2) => {
  ChartValueSource2["VARIABLE"] = "variable";
  ChartValueSource2["FIXED"] = "fixed";
  return ChartValueSource2;
})(ChartValueSource || {});
var DataPointType = /* @__PURE__ */ ((DataPointType2) => {
  DataPointType2["FIXED"] = "fixed";
  DataPointType2["VARIABLE"] = "variable";
  return DataPointType2;
})(DataPointType || {});
var BarOrientation = /* @__PURE__ */ ((BarOrientation2) => {
  BarOrientation2["VERTICAL"] = "vertical";
  BarOrientation2["HORIZONTAL"] = "horizontal";
  return BarOrientation2;
})(BarOrientation || {});
var RatingStyle = /* @__PURE__ */ ((RatingStyle2) => {
  RatingStyle2["STARS"] = "stars";
  RatingStyle2["HEARTS"] = "hearts";
  RatingStyle2["CIRCLES"] = "circles";
  return RatingStyle2;
})(RatingStyle || {});
var NeedleStyle = /* @__PURE__ */ ((NeedleStyle2) => {
  NeedleStyle2["CLASSIC"] = "classic";
  NeedleStyle2["MODERN"] = "modern";
  NeedleStyle2["NONE"] = "none";
  return NeedleStyle2;
})(NeedleStyle || {});
const baseChartDisplaySchema = object({
  alignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  height: optional(number(), 300)
});
const chartDataPointSchema = object({
  label: string(),
  type: picklist([DataPointType.FIXED, DataPointType.VARIABLE]),
  value: optional(number()),
  variableRef: optional(string()),
  color: optional(string())
});
const chartDataPointsSchema = array(chartDataPointSchema);
const ratingPreferencesEntries = {
  valueSource: optional(
    picklist([ChartValueSource.FIXED, ChartValueSource.VARIABLE]),
    ChartValueSource.FIXED
  ),
  variableRef: optional(string(), "score"),
  fixedValue: optional(number(), 5),
  ratingMax: optional(number(), 5),
  ratingStyle: optional(
    picklist([RatingStyle.STARS, RatingStyle.HEARTS, RatingStyle.CIRCLES]),
    RatingStyle.STARS
  ),
  alignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
};
const gaugeChartPreferencesEntries = {
  ...baseChartDisplaySchema.entries,
  valueSource: optional(
    picklist([ChartValueSource.VARIABLE, ChartValueSource.FIXED]),
    ChartValueSource.FIXED
  ),
  variableRef: optional(string(), "score"),
  fixedValue: optional(number(), 75),
  gaugeMax: optional(number(), 100),
  gaugeNeedleStyle: optional(
    picklist([NeedleStyle.CLASSIC, NeedleStyle.MODERN, NeedleStyle.NONE]),
    NeedleStyle.CLASSIC
  ),
  gaugeEmptyColor: optional(string(), "#dddddd"),
  gaugeFillColor: optional(string(), "#333333"),
  gaugeNeedleColor: optional(string(), "#181212")
};
const barChartPreferencesEntries = {
  ...baseChartDisplaySchema.entries,
  dataPoints: optional(chartDataPointsSchema, []),
  maxValue: optional(number(), 10),
  barOrientation: optional(
    picklist([BarOrientation.VERTICAL, BarOrientation.HORIZONTAL]),
    BarOrientation.HORIZONTAL
  ),
  barGridColor: optional(string(), "#C2C2C2"),
  barLabelsColor: optional(string(), "#181212")
};
const radarChartPreferencesEntries = {
  ...baseChartDisplaySchema.entries,
  dataPoints: optional(chartDataPointsSchema, []),
  maxValue: optional(number(), 10),
  radarColor: optional(string(), "#36A2EB"),
  radarGridColor: optional(string(), "#C2C2C2"),
  radarLabelsColor: optional(string(), "#181212")
};
const customChartPreferencesEntries = {
  ...baseChartDisplaySchema.entries,
  customChartCode: optional(string(), "")
};
const headingBlockPreferencesSchema = object({
  type: optional(literal(BlockType.HEADING), BlockType.HEADING),
  content: optional(ensureWrappedContent, "<p>Heading</p>"),
  headingSize: optional(
    picklist([HeadingSize.SMALL, HeadingSize.MEDIUM, HeadingSize.LARGE]),
    HeadingSize.MEDIUM
  ),
  headingAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
});
const headingBlockSchema = object({
  ref: optional(string(), () => "qbh-" + generateREF()),
  type: optional(literal(BlockType.HEADING), BlockType.HEADING),
  preferences: optional(
    headingBlockPreferencesSchema,
    parse$5(headingBlockPreferencesSchema, {})
  )
});
const textBlockPreferencesSchema = object({
  type: optional(literal(BlockType.TEXT), BlockType.TEXT),
  content: optional(ensureWrappedContent, "<p>Text</p>"),
  textSize: optional(
    picklist([TextSize.SMALL, TextSize.MEDIUM, TextSize.LARGE]),
    TextSize.MEDIUM
  ),
  textAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
});
const textBlockSchema = object({
  ref: optional(string(), () => "qbt-" + generateREF()),
  type: optional(literal(BlockType.TEXT), BlockType.TEXT),
  preferences: optional(textBlockPreferencesSchema, parse$5(textBlockPreferencesSchema, {}))
});
const buttonBlockPreferencesSchema = object({
  type: optional(literal(BlockType.BUTTON), BlockType.BUTTON),
  content: optional(string(), "Continue"),
  buttonAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
});
const buttonBlockSchema = object({
  ref: optional(string(), () => "qbb-" + generateREF()),
  type: optional(literal(BlockType.BUTTON), BlockType.BUTTON),
  preferences: optional(buttonBlockPreferencesSchema, parse$5(buttonBlockPreferencesSchema, {}))
});
const imageBlockPreferencesSchema = object({
  type: optional(literal(BlockType.IMAGE), BlockType.IMAGE),
  imageUrl: optional(string(), ""),
  imageSize: optional(
    picklist([
      ImageSize.TINY,
      ImageSize.SMALL,
      ImageSize.MEDIUM,
      ImageSize.LARGE,
      ImageSize.FULL
    ]),
    ImageSize.MEDIUM
  ),
  imageAltText: optional(string(), ""),
  imageAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  videoAspectRatio: optional(
    picklist([
      VideoAspectRatio.HORIZONTAL_16_9,
      VideoAspectRatio.VERTICAL_9_16,
      VideoAspectRatio.HORIZONTAL_4_3,
      VideoAspectRatio.VERTICAL_3_4,
      VideoAspectRatio.ADAPT_TO_VIDEO
    ]),
    VideoAspectRatio.ADAPT_TO_VIDEO
  )
});
const imageBlockSchema = object({
  ref: optional(string(), () => "qbi-" + generateREF()),
  type: optional(literal(BlockType.IMAGE), BlockType.IMAGE),
  preferences: optional(imageBlockPreferencesSchema, parse$5(imageBlockPreferencesSchema, {}))
});
const videoBlockPreferencesSchema = object({
  type: optional(literal(BlockType.VIDEO), BlockType.VIDEO),
  videoUrl: optional(string(), ""),
  videoAltText: optional(string(), ""),
  videoAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  videoAspectRatio: optional(
    picklist([
      VideoAspectRatio.HORIZONTAL_16_9,
      VideoAspectRatio.VERTICAL_9_16,
      VideoAspectRatio.HORIZONTAL_4_3,
      VideoAspectRatio.VERTICAL_3_4,
      VideoAspectRatio.ADAPT_TO_VIDEO
    ]),
    VideoAspectRatio.ADAPT_TO_VIDEO
  )
});
const videoBlockSchema = object({
  ref: optional(string(), () => "qbv-" + generateREF()),
  type: optional(literal(BlockType.VIDEO), BlockType.VIDEO),
  preferences: optional(videoBlockPreferencesSchema, parse$5(videoBlockPreferencesSchema, {}))
});
const customHtmlBlockPreferencesSchema = object({
  type: optional(literal(BlockType.CUSTOM_HTML), BlockType.CUSTOM_HTML),
  content: optional(string(), "")
});
const customHtmlBlockSchema = object({
  ref: optional(string(), () => "qbhtml-" + generateREF()),
  type: optional(literal(BlockType.CUSTOM_HTML), BlockType.CUSTOM_HTML),
  preferences: optional(
    customHtmlBlockPreferencesSchema,
    parse$5(customHtmlBlockPreferencesSchema, {})
  )
});
const choiceCalculationSchema = object({
  variableRef: pipe(string(), minLength(1, "Variable name cannot be empty")),
  operation: picklist(["add"]),
  // Start simple with just 'add'
  value: number()
});
const baseChoiceSchema = object({
  ref: optional(string(), () => "qbcc-" + generateREF()),
  label: optional(string(), "Choice"),
  weight: optional(number(), 1),
  customerTags: optional(array(string()), []),
  upvotedProductsIds: optional(validateProductGids, []),
  excludedProductsIds: optional(validateProductGids, []),
  upvotedCollectionsIds: optional(validateCollectionGids, []),
  excludedCollectionsIds: optional(validateCollectionGids, []),
  upvotedTagsCollectionsIds: optional(array(string()), []),
  excludedTagsCollectionsIds: optional(array(string()), []),
  upvotedProductsVariantsIds: optional(validateProductVariantGids, []),
  excludedProductsVariantsIds: optional(validateProductVariantGids, []),
  upvotedVendorsCollectionsIds: optional(array(string()), []),
  excludedVendorsCollectionsIds: optional(array(string()), []),
  upvotedVariantsCollectionsIds: optional(array(string()), []),
  excludedVariantsCollectionsIds: optional(array(string()), []),
  imageUrl: optional(string(), ""),
  imageAltText: optional(string(), ""),
  include: optional(
    picklist([
      IncludeOption.REGULAR,
      IncludeOption.NONE_OF_THE_ABOVE,
      IncludeOption.ALL_OF_THE_ABOVE
    ]),
    IncludeOption.REGULAR
  ),
  calculations: optional(array(choiceCalculationSchema), [])
});
const baseMultipleSelectionChoiceBlockPreferencesSchema = object({
  multipleSelection: optional(boolean(), false),
  minSelected: optional(number(), 1),
  maxSelected: optional(number(), 10),
  errorMessage: optional(string(), "")
});
const multipleChoiceBlockPreferencesSchema = object({
  ...baseMultipleSelectionChoiceBlockPreferencesSchema.entries,
  ...{
    optional: optional(boolean(), false),
    type: optional(literal(ChoiceType.MULTIPLE_CHOICE), ChoiceType.MULTIPLE_CHOICE),
    choices: optional(array(baseChoiceSchema), () => [
      parse$5(baseChoiceSchema, { label: "Choice" })
    ])
  }
});
const basePictureChoiceBlockPreferencesObject = object({
  ...baseMultipleSelectionChoiceBlockPreferencesSchema.entries,
  ...{
    optional: optional(boolean(), false),
    type: optional(literal(ChoiceType.PICTURE_CHOICE), ChoiceType.PICTURE_CHOICE),
    choices: optional(array(baseChoiceSchema), () => [
      parse$5(baseChoiceSchema, { label: "Choice" })
    ]),
    pictureSize: optional(
      picklist([
        PictureType.SMALL_ICON,
        PictureType.MEDIUM_SQUARE,
        PictureType.LARGE_FOUR_THREE,
        PictureType.TINY_ICON
      ]),
      PictureType.MEDIUM_SQUARE
    ),
    hideImageLabel: optional(boolean(), false),
    hideCheckboxRadio: optional(boolean(), false),
    // Accept legacy mobileHorizontalCarousel during input parsing
    mobileHorizontalCarousel: optional(boolean()),
    // Current mobileLayout field
    mobileLayout: optional(
      picklist([MobileLayout.ONE_PER_ROW, MobileLayout.TWO_PER_ROW, MobileLayout.CAROUSEL]),
      MobileLayout.ONE_PER_ROW
    ),
    optimizeImageSize: optional(boolean(), true),
    imageObjectFitContain: optional(boolean(), false)
  }
});
const pictureChoiceBlockPreferencesSchema = pipe(
  basePictureChoiceBlockPreferencesObject,
  // Start with the base object that accepts mobileHorizontalCarousel
  transform((input2) => {
    const output = { ...input2 };
    if (typeof output.mobileHorizontalCarousel === "boolean") {
      output.mobileLayout = output.mobileHorizontalCarousel ? MobileLayout.CAROUSEL : MobileLayout.ONE_PER_ROW;
    }
    delete output.mobileHorizontalCarousel;
    return output;
  })
);
const dropdownChoiceBlockPreferencesSchema = object({
  ...baseMultipleSelectionChoiceBlockPreferencesSchema.entries,
  ...{
    optional: optional(boolean(), false),
    content: optional(string(), "Select"),
    type: optional(literal(ChoiceType.DROPDOWN_CHOICE), ChoiceType.DROPDOWN_CHOICE),
    enableOptionsSearch: optional(boolean(), false),
    choices: optional(array(baseChoiceSchema), () => [
      parse$5(baseChoiceSchema, { label: "Choice" })
    ])
  }
});
const sliderChoiceBlockPreferencesSchema = pipe(
  object({
    optional: optional(boolean(), false),
    type: optional(literal(ChoiceType.SLIDER_CHOICE), ChoiceType.SLIDER_CHOICE),
    startLabel: optional(string(), ""),
    endLabel: optional(string(), ""),
    middleLabel: optional(string(), ""),
    displayValueTooltip: optional(boolean(), false),
    choices: optional(array(baseChoiceSchema), () => [
      parse$5(baseChoiceSchema, { label: "Choice 1" }),
      parse$5(baseChoiceSchema, { label: "Choice 2" }),
      parse$5(baseChoiceSchema, { label: "Choice 3" }),
      parse$5(baseChoiceSchema, { label: "Choice 4" }),
      parse$5(baseChoiceSchema, { label: "Choice 5" })
    ]),
    // Accept both old and new values for backward compatibility
    sliderType: optional(
      union([
        picklist([SliderType.SLIDER, SliderType.BUTTONS_SCALE, SliderType.RATING_SCALE]),
        picklist(["bar", "buttons", "stars"])
        // Old values for backward compatibility
      ]),
      SliderType.SLIDER
    ),
    ratingStyle: optional(
      picklist([RatingStyle.STARS, RatingStyle.HEARTS, RatingStyle.CIRCLES]),
      RatingStyle.STARS
    )
  }),
  transform((input2) => {
    let normalizedSliderType = input2.sliderType;
    if (input2.sliderType === "bar") {
      normalizedSliderType = SliderType.SLIDER;
    } else if (input2.sliderType === "buttons") {
      normalizedSliderType = SliderType.BUTTONS_SCALE;
    } else if (input2.sliderType === "stars") {
      normalizedSliderType = SliderType.RATING_SCALE;
    }
    return {
      ...input2,
      sliderType: normalizedSliderType
    };
  })
);
const yesNoBlockPreferencesSchema = object({
  optional: optional(boolean(), false),
  type: optional(literal(ChoiceType.YES_NO), ChoiceType.YES_NO),
  choices: optional(array(baseChoiceSchema), () => [
    parse$5(baseChoiceSchema, { label: "Yes" }),
    parse$5(baseChoiceSchema, { label: "No" })
  ])
});
const legalGdprBlockPreferencesSchema = object({
  type: optional(literal(ChoiceType.LEGAL_GDPR), ChoiceType.LEGAL_GDPR),
  choices: optional(array(baseChoiceSchema), () => [
    parse$5(baseChoiceSchema, { label: "I accept" }),
    parse$5(baseChoiceSchema, { label: "I don't accept" })
  ])
});
const choiceBlockPreferencesSchemas = variant("type", [
  multipleChoiceBlockPreferencesSchema,
  pictureChoiceBlockPreferencesSchema,
  dropdownChoiceBlockPreferencesSchema,
  sliderChoiceBlockPreferencesSchema,
  yesNoBlockPreferencesSchema,
  legalGdprBlockPreferencesSchema
]);
const choiceBlockSchema = object({
  ref: optional(string(), () => "qbc-" + generateREF()),
  type: optional(literal(BlockType.CHOICE), BlockType.CHOICE),
  preferences: optional(
    choiceBlockPreferencesSchemas,
    parse$5(multipleChoiceBlockPreferencesSchema, {})
  )
});
const baseInputPreferencesSchema = object({
  optional: optional(boolean(), false)
});
const shortTextPreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.SHORT_TEXT), InputType.SHORT_TEXT),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), ""),
    minLength: optional(number(), 1),
    maxLength: optional(number(), 128)
  }
});
const longTextPreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.LONG_TEXT), InputType.LONG_TEXT),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), ""),
    minLength: optional(number(), 1),
    maxLength: optional(number(), 1280)
  }
});
const emailPreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.EMAIL), InputType.EMAIL),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), ""),
    klaviyoListId: optional(string(), KlaviyoNoListSelected.NO_LIST_SELECTED),
    hubspotListId: optional(string(), ""),
    mailchimpListId: optional(string(), ""),
    shopifyOptInLevel: optional(
      picklist([ShopifyOptInLevel.SINGLE_OPT_IN, ShopifyOptInLevel.CONFIRMED_OPT_IN]),
      ShopifyOptInLevel.SINGLE_OPT_IN
    ),
    // Narrowing this picklist reintroduces the opt-out bug - NOT_SUBSCRIBED is the only way a
    // merchant can persist "not subscribed". See questionsSchema.test.ts 'shopify marketing consent'.
    shopifyConsentState: optional(
      picklist([ShopifyConsentState.SUBSCRIBED, ShopifyConsentState.NOT_SUBSCRIBED]),
      ShopifyConsentState.SUBSCRIBED
    ),
    klaviyoConsentStatus: optional(boolean(), true),
    omnisendConsentStatus: optional(boolean(), true)
  }
});
const fullNamePreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.FULL_NAME), InputType.FULL_NAME),
    minLength: optional(number(), 3),
    maxLength: optional(number(), 128),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), "")
  }
});
const firstNamePreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.FIRST_NAME), InputType.FIRST_NAME),
    minLength: optional(number(), 3),
    maxLength: optional(number(), 128),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), "")
  }
});
const lastNamePreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.LAST_NAME), InputType.LAST_NAME),
    minLength: optional(number(), 3),
    maxLength: optional(number(), 128),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), "")
  }
});
const numberPreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.NUMBER), InputType.NUMBER),
    maxRange: optional(number(), 100),
    minRange: optional(number(), 10),
    errorMessage: optional(string(), ""),
    inputPlaceholder: optional(string(), "")
  }
});
const phonePreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.PHONE), InputType.PHONE),
    errorMessage: optional(string(), ""),
    inputPlaceholder: optional(string(), ""),
    klaviyoListId: optional(string(), KlaviyoNoListSelected.NO_LIST_SELECTED),
    hubspotListId: optional(string(), ""),
    mailchimpListId: optional(string(), ""),
    shopifyOptInLevel: optional(
      picklist([ShopifyOptInLevel.CONFIRMED_OPT_IN, ShopifyOptInLevel.SINGLE_OPT_IN]),
      ShopifyOptInLevel.CONFIRMED_OPT_IN
    ),
    // Narrowing this picklist reintroduces the opt-out bug - NOT_SUBSCRIBED is the only way a
    // merchant can persist "not subscribed". See questionsSchema.test.ts 'shopify marketing consent'.
    shopifyConsentState: optional(
      picklist([ShopifyConsentState.SUBSCRIBED, ShopifyConsentState.NOT_SUBSCRIBED]),
      ShopifyConsentState.SUBSCRIBED
    ),
    klaviyoConsentStatus: optional(boolean(), true),
    omnisendConsentStatus: optional(boolean(), true),
    defaultCountryCode: optional(string(), "US"),
    defaultCountryPrefix: optional(string(), "+1")
  }
});
const datePreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.DATE), InputType.DATE),
    errorMessage: optional(string(), ""),
    dateFormat: optional(string(), "MM/DD/YYYY"),
    alignment: optional(
      picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
      Alignment.CENTER
    )
  }
});
const uploadPreferencesSchema = object({
  ...baseInputPreferencesSchema.entries,
  ...{
    type: optional(literal(InputType.UPLOAD), InputType.UPLOAD),
    inputPlaceholder: optional(string(), ""),
    errorMessage: optional(string(), ""),
    errorMessageFileSize: optional(string(), ""),
    errorMessageFileFormat: optional(string(), ""),
    fileUploadDescription: optional(string(), "")
  }
});
const inputBlockPreferencesSchemas = variant("type", [
  shortTextPreferencesSchema,
  longTextPreferencesSchema,
  emailPreferencesSchema,
  fullNamePreferencesSchema,
  firstNamePreferencesSchema,
  lastNamePreferencesSchema,
  numberPreferencesSchema,
  phonePreferencesSchema,
  datePreferencesSchema,
  uploadPreferencesSchema
  // fileUploadPreferencesSchema,
]);
const inputBlockSchema = object({
  ref: optional(string(), () => "qbi-" + generateREF()),
  type: optional(literal(BlockType.INPUT), BlockType.INPUT),
  preferences: optional(inputBlockPreferencesSchemas, parse$5(inputBlockPreferencesSchemas, {}))
});
const questionGaugeChartBlockPreferencesSchema = object({
  type: optional(literal(BlockType.GAUGE_CHART), BlockType.GAUGE_CHART),
  ...gaugeChartPreferencesEntries
});
const questionGaugeChartBlockSchema = object({
  ref: optional(string(), () => "qbgc-" + generateREF()),
  type: optional(literal(BlockType.GAUGE_CHART), BlockType.GAUGE_CHART),
  preferences: optional(
    questionGaugeChartBlockPreferencesSchema,
    parse$5(questionGaugeChartBlockPreferencesSchema, {})
  )
});
const questionRadarChartBlockPreferencesSchema = object({
  type: optional(literal(BlockType.RADAR_CHART), BlockType.RADAR_CHART),
  ...radarChartPreferencesEntries
});
const questionRadarChartBlockSchema = object({
  ref: optional(string(), () => "qbrc-" + generateREF()),
  type: optional(literal(BlockType.RADAR_CHART), BlockType.RADAR_CHART),
  preferences: optional(
    questionRadarChartBlockPreferencesSchema,
    parse$5(questionRadarChartBlockPreferencesSchema, {})
  )
});
const questionBarChartBlockPreferencesSchema = object({
  type: optional(literal(BlockType.BAR_CHART), BlockType.BAR_CHART),
  ...barChartPreferencesEntries
});
const questionBarChartBlockSchema = object({
  ref: optional(string(), () => "qbbc-" + generateREF()),
  type: optional(literal(BlockType.BAR_CHART), BlockType.BAR_CHART),
  preferences: optional(
    questionBarChartBlockPreferencesSchema,
    parse$5(questionBarChartBlockPreferencesSchema, {})
  )
});
const questionCustomChartBlockPreferencesSchema = object({
  type: optional(literal(BlockType.CUSTOM_CHART), BlockType.CUSTOM_CHART),
  ...customChartPreferencesEntries
});
const questionCustomChartBlockSchema = object({
  ref: optional(string(), () => "qbcc-" + generateREF()),
  type: optional(literal(BlockType.CUSTOM_CHART), BlockType.CUSTOM_CHART),
  preferences: optional(
    questionCustomChartBlockPreferencesSchema,
    parse$5(questionCustomChartBlockPreferencesSchema, {})
  )
});
const questionRatingBlockPreferencesSchema = object({
  type: optional(literal(BlockType.RATING_CHART), BlockType.RATING_CHART),
  ...ratingPreferencesEntries
});
const questionRatingBlockSchema = object({
  ref: optional(string(), () => "qbrt-" + generateREF()),
  type: optional(literal(BlockType.RATING_CHART), BlockType.RATING_CHART),
  preferences: optional(
    questionRatingBlockPreferencesSchema,
    parse$5(questionRatingBlockPreferencesSchema, {})
  )
});
const blockSchemas = variant("type", [
  headingBlockSchema,
  customHtmlBlockSchema,
  textBlockSchema,
  buttonBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
  choiceBlockSchema,
  inputBlockSchema,
  // Chart block schemas
  questionGaugeChartBlockSchema,
  questionRadarChartBlockSchema,
  questionBarChartBlockSchema,
  questionCustomChartBlockSchema,
  questionRatingBlockSchema
]);
const conditionSourceSchema = picklist(
  ["questionChoice", "highestVariable", "variableValue"],
  "questionChoice"
);
const operatorSchema = picklist(
  [
    "is",
    "is_not",
    "equals",
    "notEquals",
    "greaterThan",
    "lessThan",
    "greaterThanOrEqual",
    "lessThanOrEqual"
  ],
  "is"
);
const baseConditionObject = object({
  ref: optional(string(), () => "cd-" + generateREF()),
  sourceType: optional(conditionSourceSchema, "questionChoice"),
  // Accept legacy choiceRef during input parsing
  choiceRef: optional(string()),
  // Fields for sourceType: 'questionChoice'
  blockRef: optional(string()),
  // Current field
  // Fields for sourceType: 'variableValue'
  variableRef: optional(string()),
  comparisonTargetType: optional(fallback(picklist(["number", "variable"]), "number")),
  // Common Fields
  operator: optional(operatorSchema, "is"),
  // Value field interpretation depends on sourceType AND comparisonTargetType:
  // - Might be populated by transform from legacy choiceRef
  value: optional(union([string(), number()]))
});
const conditionSchema = pipe(
  baseConditionObject,
  // Start with the base object that accepts choiceRef
  transform((input2) => {
    const output = { ...input2 };
    if (output.sourceType === "questionChoice" && typeof output.choiceRef === "string" && output.choiceRef !== "") {
      output.value = output.choiceRef;
    }
    delete output.choiceRef;
    return output;
  })
  // TODO: Add refinement validation here if needed (after transform)
  // e.g., v.refine((data) => { ... }, { message: "..." })
);
const jumpLogicItemSchema = object({
  conditions: optional(array(conditionSchema), []),
  destinationRef: optional(string(), "next")
});
const skipLogicItemSchema = object({
  conditions: optional(array(conditionSchema), [])
});
const questionLogicSchema = object({
  jumpLogic: optional(array(jumpLogicItemSchema), []),
  skipLogic: optional(array(skipLogicItemSchema), []),
  defaultDestinationRef: optional(string(), "next")
});
const questionPreferencesSchema = object({
  videoUrl: optional(string(), ""),
  customJS: optional(string(), ""),
  imageUrl: optional(string(), ""),
  customCSS: optional(string(), ""),
  imageOpacity: optional(number(), 25),
  imagePosition: fallback(picklist(["background", "split"]), "background"),
  imagePositionSplitMobile: optional(picklist(["above", "below", "hidden"]), "hidden"),
  imagePositionSplitDesktop: optional(picklist(["left", "right"]), "left"),
  showDescription: optional(boolean(), false),
  overwriteProgressBarText: optional(string(), ""),
  allowOverwriteProgressBar: optional(boolean(), false),
  autoAdvanceEnabled: optional(boolean(), false),
  autoAdvanceDelay: optional(number(), 10),
  hideNextButton: optional(boolean(), false)
});
const baseQuestionSchema = object({
  ref: optional(string(), () => "q-" + generateREF()),
  name: optional(string(), ""),
  logic: optional(questionLogicSchema, parse$5(questionLogicSchema, {})),
  blocks: optional(array(blockSchemas), () => [
    parse$5(headingBlockSchema, {}),
    parse$5(textBlockSchema, {}),
    parse$5(choiceBlockSchema, {}),
    parse$5(buttonBlockSchema, {})
  ]),
  preferences: optional(questionPreferencesSchema, parse$5(questionPreferencesSchema, {}))
});
const choicePublicSchema = pick(baseChoiceSchema, [
  "ref",
  "label",
  "include",
  "imageUrl",
  "imageAltText"
]);
object({
  ...sliderChoiceBlockPreferencesSchema.entries,
  ...{
    choices: array(choicePublicSchema)
  }
});
const choiceBlockPreferencesPublicSchemas = variant("type", [
  {
    ...multipleChoiceBlockPreferencesSchema,
    ...{
      choices: array(choicePublicSchema)
    }
  },
  {
    ...pictureChoiceBlockPreferencesSchema,
    ...{
      choices: array(choicePublicSchema)
    }
  },
  {
    ...dropdownChoiceBlockPreferencesSchema,
    ...{
      choices: array(choicePublicSchema)
    }
  },
  {
    ...sliderChoiceBlockPreferencesSchema,
    ...{
      choices: array(choicePublicSchema)
    }
  },
  {
    ...yesNoBlockPreferencesSchema,
    ...{
      choices: array(choicePublicSchema)
    }
  },
  {
    ...legalGdprBlockPreferencesSchema,
    ...{
      choices: array(choicePublicSchema)
    }
  }
]);
object({
  ...choiceBlockSchema.entries,
  ...{
    preferences: choiceBlockPreferencesPublicSchemas
  }
});
const inputBlockPreferencesPublicSchemas = variant("type", [
  shortTextPreferencesSchema,
  longTextPreferencesSchema,
  omit(emailPreferencesSchema, [
    "klaviyoListId",
    "hubspotListId",
    "mailchimpListId",
    "klaviyoConsentStatus",
    "omnisendConsentStatus"
  ]),
  fullNamePreferencesSchema,
  firstNamePreferencesSchema,
  lastNamePreferencesSchema,
  numberPreferencesSchema,
  omit(phonePreferencesSchema, [
    "klaviyoListId",
    "hubspotListId",
    "mailchimpListId",
    "klaviyoConsentStatus",
    "omnisendConsentStatus"
  ]),
  datePreferencesSchema,
  uploadPreferencesSchema
]);
object({
  ...inputBlockSchema.entries,
  ...{
    preferences: inputBlockPreferencesPublicSchemas
  }
});
const blockPublicSchemas = variant("type", [
  headingBlockSchema,
  textBlockSchema,
  buttonBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
  customHtmlBlockSchema,
  object({
    ...choiceBlockSchema.entries,
    ...{
      preferences: choiceBlockPreferencesPublicSchemas
    }
  }),
  object({
    ...inputBlockSchema.entries,
    ...{
      preferences: inputBlockPreferencesPublicSchemas
    }
  }),
  // Chart block schemas
  questionGaugeChartBlockSchema,
  questionRadarChartBlockSchema,
  questionBarChartBlockSchema,
  questionCustomChartBlockSchema,
  questionRatingBlockSchema
]);
const questionPublicSchema = object({
  ...baseQuestionSchema.entries,
  ...{
    blocks: optional(array(blockPublicSchemas), () => [parse$5(blockPublicSchemas, {})])
  }
});
var RecommendationSystem = /* @__PURE__ */ ((RecommendationSystem2) => {
  RecommendationSystem2["RESPONSE_BASED"] = "response_based";
  RecommendationSystem2["FIXED"] = "fixed";
  return RecommendationSystem2;
})(RecommendationSystem || {});
var ResultBlockType = /* @__PURE__ */ ((ResultBlockType2) => {
  ResultBlockType2["SLOTS"] = "slots";
  ResultBlockType2["TEXT"] = "text";
  ResultBlockType2["HEADING"] = "heading";
  ResultBlockType2["CUSTOM_HTML"] = "custom_html";
  ResultBlockType2["IMAGE"] = "image";
  ResultBlockType2["VIDEO"] = "video";
  ResultBlockType2["BUTTON"] = "button";
  ResultBlockType2["CART_CHECKOUT_BUTTON"] = "cart_checkout_button";
  ResultBlockType2["BAR_CHART"] = "bar_chart";
  ResultBlockType2["RADAR_CHART"] = "radar_chart";
  ResultBlockType2["GAUGE_CHART"] = "gauge_chart";
  ResultBlockType2["CUSTOM_CHART"] = "custom_chart";
  ResultBlockType2["RATING_CHART"] = "rating_chart";
  return ResultBlockType2;
})(ResultBlockType || {});
var SlotType = /* @__PURE__ */ ((SlotType2) => {
  SlotType2["PRODUCTS"] = "products";
  SlotType2["PRODUCTS_VARIANTS"] = "products_variants";
  SlotType2["COLLECTIONS"] = "collections";
  return SlotType2;
})(SlotType || {});
var SlotBlockType = /* @__PURE__ */ ((SlotBlockType2) => {
  SlotBlockType2["TITLE"] = "title";
  SlotBlockType2["TEXT"] = "text";
  SlotBlockType2["DESCRIPTION"] = "description";
  SlotBlockType2["IMAGE"] = "image";
  SlotBlockType2["PRICE"] = "price";
  SlotBlockType2["UNIT_PRICE"] = "unit_price";
  SlotBlockType2["BUY_BUTTON"] = "buy_button";
  SlotBlockType2["LINK"] = "link";
  SlotBlockType2["METAFIELD"] = "metafield";
  SlotBlockType2["VARIANTS_DROPDOWN"] = "variants_dropdown";
  SlotBlockType2["VENDOR"] = "vendor";
  SlotBlockType2["REVIEWS"] = "reviews";
  SlotBlockType2["SUBSCRIPTION"] = "subscription";
  SlotBlockType2["CUSTOM_HTML"] = "custom_html";
  return SlotBlockType2;
})(SlotBlockType || {});
var ImageSourceType = /* @__PURE__ */ ((ImageSourceType2) => {
  ImageSourceType2["VARIANT"] = "variant";
  ImageSourceType2["PRODUCT"] = "product";
  return ImageSourceType2;
})(ImageSourceType || {});
var SlotWidth = /* @__PURE__ */ ((SlotWidth2) => {
  SlotWidth2["SMALL"] = "small";
  SlotWidth2["MEDIUM"] = "medium";
  SlotWidth2["LARGE"] = "large";
  return SlotWidth2;
})(SlotWidth || {});
var SlotsLayout = /* @__PURE__ */ ((SlotsLayout2) => {
  SlotsLayout2["STACKED"] = "stacked";
  SlotsLayout2["SIDE_BY_SIDE"] = "side_by_side";
  return SlotsLayout2;
})(SlotsLayout || {});
const showLogicItemSchema = object({
  conditions: optional(array(conditionSchema), [])
});
const resultSectionLogicSchema = object({
  showLogic: optional(array(showLogicItemSchema), []),
  defaultShow: optional(boolean(), true)
});
const slotSchema = object({
  ref: optional(string(), () => "rsbss-" + generateREF()),
  heading: optional(ensureWrappedContent, "<p><br></p>"),
  description: optional(ensureWrappedContent, "<p><br></p>"),
  excludedProductsIds: optional(validateProductGids, []),
  includedProductsIds: optional(validateProductGids, []),
  maxRecommendedItems: optional(number(), 1),
  excludedCollectionsIds: optional(validateCollectionGids, []),
  includedCollectionsIds: optional(validateCollectionGids, []),
  excludedTagsCollectionsIds: optional(array(string()), []),
  includedTagsCollectionsIds: optional(array(string()), []),
  excludedProductsVariantsIds: optional(validateProductVariantGids, []),
  includedProductsVariantsIds: optional(validateProductVariantGids, []),
  excludedVendorsCollectionsIds: optional(array(string()), []),
  includedVendorsCollectionsIds: optional(array(string()), []),
  excludedVariantsCollectionsIds: optional(array(string()), []),
  includedVariantsCollectionsIds: optional(array(string()), []),
  width: optional(
    picklist([SlotWidth.SMALL, SlotWidth.MEDIUM, SlotWidth.LARGE]),
    SlotWidth.SMALL
  )
});
const slotPublicSchema = pick(slotSchema, [
  "ref",
  "heading",
  "description",
  "maxRecommendedItems",
  "width"
]);
const resultHeadingBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.HEADING), ResultBlockType.HEADING),
  content: optional(ensureWrappedContent, "<p>Heading</p>"),
  headingSize: optional(
    picklist([HeadingSize.SMALL, HeadingSize.MEDIUM, HeadingSize.LARGE]),
    HeadingSize.MEDIUM
  ),
  headingAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
});
const resultHeadingBlockSchema = object({
  ref: optional(string(), () => "rsbh-" + generateREF()),
  type: optional(literal(ResultBlockType.HEADING), ResultBlockType.HEADING),
  preferences: optional(
    resultHeadingBlockPreferencesSchema,
    parse$5(resultHeadingBlockPreferencesSchema, {})
  )
});
const resultTextBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.TEXT), ResultBlockType.TEXT),
  content: optional(ensureWrappedContent, "<p>Text</p>"),
  textSize: optional(
    picklist([TextSize.SMALL, TextSize.MEDIUM, TextSize.LARGE]),
    TextSize.MEDIUM
  ),
  textAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
});
const resultTextBlockSchema = object({
  ref: optional(string(), () => "rsbt-" + generateREF()),
  type: optional(literal(ResultBlockType.TEXT), ResultBlockType.TEXT),
  preferences: optional(
    resultTextBlockPreferencesSchema,
    parse$5(resultTextBlockPreferencesSchema, {})
  )
});
const resultImageBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.IMAGE), ResultBlockType.IMAGE),
  imageUrl: optional(string(), ""),
  imageSize: optional(
    picklist([
      ImageSize.TINY,
      ImageSize.SMALL,
      ImageSize.MEDIUM,
      ImageSize.LARGE,
      ImageSize.FULL
    ]),
    ImageSize.MEDIUM
  ),
  imageAltText: optional(string(), ""),
  imageAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  )
});
const resultImageBlockSchema = object({
  ref: optional(string(), () => "rsbi-" + generateREF()),
  type: optional(literal(ResultBlockType.IMAGE), ResultBlockType.IMAGE),
  preferences: optional(
    resultImageBlockPreferencesSchema,
    parse$5(resultImageBlockPreferencesSchema, {})
  )
});
const resultVideoBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.VIDEO), ResultBlockType.VIDEO),
  videoUrl: optional(string(), ""),
  videoAltText: optional(string(), ""),
  videoAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  videoAspectRatio: optional(
    picklist([
      VideoAspectRatio.HORIZONTAL_16_9,
      VideoAspectRatio.VERTICAL_9_16,
      VideoAspectRatio.HORIZONTAL_4_3,
      VideoAspectRatio.VERTICAL_3_4,
      VideoAspectRatio.ADAPT_TO_VIDEO
    ]),
    VideoAspectRatio.HORIZONTAL_16_9
  )
});
const resultVideoBlockSchema = object({
  ref: optional(string(), () => "rsbv-" + generateREF()),
  type: optional(literal(ResultBlockType.VIDEO), ResultBlockType.VIDEO),
  preferences: optional(
    resultVideoBlockPreferencesSchema,
    parse$5(resultVideoBlockPreferencesSchema, {})
  )
});
const resultButtonBlockPreferencesSchema = pipe(
  object({
    type: optional(literal(ResultBlockType.BUTTON), ResultBlockType.BUTTON),
    content: optional(string(), "Click here"),
    buttonUrl: optional(string(), ""),
    // TODO: remove buttonText in favor of content
    buttonText: optional(string(), "Click here"),
    buttonAlignment: optional(
      picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
      Alignment.CENTER
    ),
    openInNewTab: optional(boolean(), true)
  }),
  transform((val) => {
    return { ...val, content: val.content || val.buttonText };
  })
);
const resultButtonBlockSchema = object({
  ref: optional(string(), () => "rsbb-" + generateREF()),
  type: optional(literal(ResultBlockType.BUTTON), ResultBlockType.BUTTON),
  preferences: optional(
    resultButtonBlockPreferencesSchema,
    parse$5(resultButtonBlockPreferencesSchema, {})
  )
});
const resultCartCheckoutButtonBlockPreferencesSchema = object({
  type: optional(
    literal(ResultBlockType.CART_CHECKOUT_BUTTON),
    ResultBlockType.CART_CHECKOUT_BUTTON
  ),
  content: optional(string(), ""),
  buttonAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  addAllToCart: optional(boolean(), false),
  addAllToCartText: optional(string(), ""),
  proceedTo: fallback(picklist(["checkout", "cart"]), "cart")
});
const resultCartCheckoutButtonBlockSchema = object({
  ref: optional(string(), () => "rscb-" + generateREF()),
  type: optional(
    literal(ResultBlockType.CART_CHECKOUT_BUTTON),
    ResultBlockType.CART_CHECKOUT_BUTTON
  ),
  preferences: optional(
    resultCartCheckoutButtonBlockPreferencesSchema,
    parse$5(resultCartCheckoutButtonBlockPreferencesSchema, {})
  )
});
const resultCustomHtmlBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.CUSTOM_HTML), ResultBlockType.CUSTOM_HTML),
  content: optional(string(), "")
});
const resultCustomHtmlBlockSchema = object({
  ref: optional(string(), () => "rsbc-" + generateREF()),
  type: optional(literal(ResultBlockType.CUSTOM_HTML), ResultBlockType.CUSTOM_HTML),
  preferences: optional(
    resultCustomHtmlBlockPreferencesSchema,
    parse$5(resultCustomHtmlBlockPreferencesSchema, {})
  )
});
const resultBarChartBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.BAR_CHART), ResultBlockType.BAR_CHART),
  ...barChartPreferencesEntries
});
const resultBarChartBlockSchema = object({
  ref: optional(string(), () => "rsbbc-" + generateREF()),
  type: optional(literal(ResultBlockType.BAR_CHART), ResultBlockType.BAR_CHART),
  preferences: optional(
    resultBarChartBlockPreferencesSchema,
    parse$5(resultBarChartBlockPreferencesSchema, {})
  )
});
const resultRadarChartBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.RADAR_CHART), ResultBlockType.RADAR_CHART),
  ...radarChartPreferencesEntries
});
const resultRadarChartBlockSchema = object({
  ref: optional(string(), () => "rsbrc-" + generateREF()),
  type: optional(literal(ResultBlockType.RADAR_CHART), ResultBlockType.RADAR_CHART),
  preferences: optional(
    resultRadarChartBlockPreferencesSchema,
    parse$5(resultRadarChartBlockPreferencesSchema, {})
  )
});
const resultGaugeChartBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.GAUGE_CHART), ResultBlockType.GAUGE_CHART),
  ...gaugeChartPreferencesEntries
});
const resultGaugeChartBlockSchema = object({
  ref: optional(string(), () => "rsbgc-" + generateREF()),
  type: optional(literal(ResultBlockType.GAUGE_CHART), ResultBlockType.GAUGE_CHART),
  preferences: optional(
    resultGaugeChartBlockPreferencesSchema,
    parse$5(resultGaugeChartBlockPreferencesSchema, {})
  )
});
const resultCustomChartBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.CUSTOM_CHART), ResultBlockType.CUSTOM_CHART),
  ...customChartPreferencesEntries
});
const resultCustomChartBlockSchema = object({
  ref: optional(string(), () => "rsbcc-" + generateREF()),
  type: optional(literal(ResultBlockType.CUSTOM_CHART), ResultBlockType.CUSTOM_CHART),
  preferences: optional(
    resultCustomChartBlockPreferencesSchema,
    parse$5(resultCustomChartBlockPreferencesSchema, {})
  )
});
const resultRatingBlockPreferencesSchema = object({
  type: optional(literal(ResultBlockType.RATING_CHART), ResultBlockType.RATING_CHART),
  ...ratingPreferencesEntries
});
const resultRatingBlockSchema = object({
  ref: optional(string(), () => "rsbrt-" + generateREF()),
  type: optional(literal(ResultBlockType.RATING_CHART), ResultBlockType.RATING_CHART),
  preferences: optional(
    resultRatingBlockPreferencesSchema,
    parse$5(resultRatingBlockPreferencesSchema, {})
  )
});
const baseSlotBlockSchema = object({
  ref: optional(string(), () => "rsbsb-" + generateREF())
});
const titleSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.TITLE), SlotBlockType.TITLE)
});
const textSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  content: optional(ensureWrappedContent, ""),
  type: optional(literal(SlotBlockType.TEXT), SlotBlockType.TEXT)
});
const descriptionSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.DESCRIPTION), SlotBlockType.DESCRIPTION)
});
const imageSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.IMAGE), SlotBlockType.IMAGE),
  optimizeImageSize: optional(boolean(), true),
  pictureSize: optional(
    picklist([PictureType.MEDIUM_SQUARE, PictureType.ORIGINAL]),
    PictureType.MEDIUM_SQUARE
  ),
  imageSource: optional(
    picklist([ImageSourceType.VARIANT, ImageSourceType.PRODUCT]),
    ImageSourceType.VARIANT
  )
});
const priceSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.PRICE), SlotBlockType.PRICE)
});
const unitPriceSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.UNIT_PRICE), SlotBlockType.UNIT_PRICE)
});
const buyButtonSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.BUY_BUTTON), SlotBlockType.BUY_BUTTON)
});
const linkSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.LINK), SlotBlockType.LINK),
  openInNewTab: optional(boolean(), true)
});
const metafieldSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  // NOTE: this content is plain text, it only contains the metafield, do not add <p> tags here
  content: optional(string(), ""),
  // Future-ready source selector for product variant slots. No UI exposes this yet;
  // product remains the default for existing and new metafield blocks.
  source: optional(picklist(["product", "variant"]), "product"),
  type: optional(literal(SlotBlockType.METAFIELD), SlotBlockType.METAFIELD)
});
const variantsDropdownSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.VARIANTS_DROPDOWN), SlotBlockType.VARIANTS_DROPDOWN),
  displayOnNoVariants: optional(picklist(["show_dropdown", "hide_dropdown"]), "show_dropdown")
});
const vendorSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.VENDOR), SlotBlockType.VENDOR)
});
const reviewsSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.REVIEWS), SlotBlockType.REVIEWS)
});
const subscriptionSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  type: optional(literal(SlotBlockType.SUBSCRIPTION), SlotBlockType.SUBSCRIPTION)
});
const customHtmlSlotBlockSchema = object({
  ...baseSlotBlockSchema.entries,
  content: optional(string(), ""),
  type: optional(literal(SlotBlockType.CUSTOM_HTML), SlotBlockType.CUSTOM_HTML)
});
const slotBlockSchema = variant("type", [
  titleSlotBlockSchema,
  textSlotBlockSchema,
  descriptionSlotBlockSchema,
  imageSlotBlockSchema,
  priceSlotBlockSchema,
  unitPriceSlotBlockSchema,
  buyButtonSlotBlockSchema,
  linkSlotBlockSchema,
  metafieldSlotBlockSchema,
  variantsDropdownSlotBlockSchema,
  vendorSlotBlockSchema,
  reviewsSlotBlockSchema,
  subscriptionSlotBlockSchema,
  customHtmlSlotBlockSchema
]);
const getDefaultSlotsBlocksByType = (type) => {
  switch (type) {
    case SlotType.PRODUCTS:
      return [
        parse$5(slotBlockSchema, { type: SlotBlockType.IMAGE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.TITLE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.PRICE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.VARIANTS_DROPDOWN }),
        parse$5(slotBlockSchema, { type: SlotBlockType.BUY_BUTTON })
      ];
    case SlotType.PRODUCTS_VARIANTS:
      return [
        parse$5(slotBlockSchema, { type: SlotBlockType.IMAGE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.TITLE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.PRICE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.BUY_BUTTON })
      ];
    case SlotType.COLLECTIONS:
      return [
        parse$5(slotBlockSchema, { type: SlotBlockType.IMAGE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.TITLE }),
        parse$5(slotBlockSchema, { type: SlotBlockType.LINK })
      ];
  }
};
const resultSlotsBlockPreferencesBaseSchema = object({
  type: picklist([SlotType.PRODUCTS_VARIANTS, SlotType.PRODUCTS, SlotType.COLLECTIONS]),
  slots: optional(array(slotSchema), () => [parse$5(slotSchema, {})]),
  textSize: optional(
    picklist([TextSize.SMALL, TextSize.MEDIUM, TextSize.LARGE]),
    TextSize.MEDIUM
  ),
  recommendationSystem: optional(
    // This fallback is only required for legacy results pages, we can safely remove it after 15/03/2025
    // v.fallback(
    picklist([RecommendationSystem.RESPONSE_BASED, RecommendationSystem.FIXED]),
    RecommendationSystem.RESPONSE_BASED
    // ),
    // RecommendationSystem.RESPONSE_BASED,
  ),
  minUpvotes: optional(number(), 1),
  content: optional(string(), "<p><br></p>"),
  headingSize: optional(
    picklist([HeadingSize.SMALL, HeadingSize.MEDIUM, HeadingSize.LARGE]),
    HeadingSize.MEDIUM
  ),
  slotsBlocks: optional(array(slotBlockSchema)),
  itemsAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  contentAlignment: optional(
    picklist([Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT]),
    Alignment.CENTER
  ),
  slotsLayout: optional(
    picklist([SlotsLayout.STACKED, SlotsLayout.SIDE_BY_SIDE]),
    SlotsLayout.STACKED
  )
});
const resultSlotsBlockPreferencesSchema = pipe(
  resultSlotsBlockPreferencesBaseSchema,
  transform((preferences) => ({
    ...preferences,
    slotsBlocks: preferences.slotsBlocks ?? getDefaultSlotsBlocksByType(preferences.type)
  }))
);
const resultSlotsBlockPreferencesPublicBaseSchema = object({
  ...resultSlotsBlockPreferencesBaseSchema.entries,
  slots: optional(array(slotPublicSchema), () => [parse$5(slotPublicSchema, {})])
});
const resultSlotsBlockPreferencesPublicSchema = pipe(
  resultSlotsBlockPreferencesPublicBaseSchema,
  transform((preferences) => ({
    ...preferences,
    slotsBlocks: preferences.slotsBlocks ?? getDefaultSlotsBlocksByType(preferences.type)
  }))
);
const resultSlotsBlockSchema = object({
  ref: optional(string(), () => "rsbs-" + generateREF()),
  type: optional(literal(ResultBlockType.SLOTS), ResultBlockType.SLOTS),
  preferences: optional(
    resultSlotsBlockPreferencesSchema,
    parse$5(resultSlotsBlockPreferencesSchema, {
      type: SlotType.PRODUCTS,
      slots: [parse$5(slotSchema, {})],
      slotsBlocks: getDefaultSlotsBlocksByType(SlotType.PRODUCTS)
    })
  )
});
const resultSlotsBlockPublicSchema = object({
  ...resultSlotsBlockSchema.entries,
  preferences: optional(
    resultSlotsBlockPreferencesPublicSchema,
    parse$5(resultSlotsBlockPreferencesPublicSchema, {
      type: SlotType.PRODUCTS,
      slots: [parse$5(slotPublicSchema, {})],
      slotsBlocks: getDefaultSlotsBlocksByType(SlotType.PRODUCTS)
    })
  )
});
const resultBlockSchemas = variant("type", [
  resultHeadingBlockSchema,
  resultTextBlockSchema,
  resultImageBlockSchema,
  resultVideoBlockSchema,
  resultButtonBlockSchema,
  resultCartCheckoutButtonBlockSchema,
  resultCustomHtmlBlockSchema,
  resultBarChartBlockSchema,
  resultRadarChartBlockSchema,
  resultGaugeChartBlockSchema,
  resultCustomChartBlockSchema,
  resultRatingBlockSchema,
  resultSlotsBlockSchema
]);
const resultBlockPublicSchemas = variant("type", [
  resultHeadingBlockSchema,
  resultTextBlockSchema,
  resultImageBlockSchema,
  resultVideoBlockSchema,
  resultButtonBlockSchema,
  resultCartCheckoutButtonBlockSchema,
  resultCustomHtmlBlockSchema,
  resultBarChartBlockSchema,
  resultRadarChartBlockSchema,
  resultGaugeChartBlockSchema,
  resultCustomChartBlockSchema,
  resultRatingBlockSchema,
  resultSlotsBlockPublicSchema
]);
const resultSectionSchema = object({
  ref: optional(string(), () => "rs-" + generateREF()),
  logic: optional(resultSectionLogicSchema, parse$5(resultSectionLogicSchema, {})),
  blocks: optional(array(resultBlockSchemas), () => [
    parse$5(resultHeadingBlockSchema, {}),
    parse$5(resultTextBlockSchema, {}),
    parse$5(resultSlotsBlockSchema, {})
  ])
});
const resultSectionPublicSchema = object({
  ...resultSectionSchema.entries,
  blocks: optional(array(resultBlockPublicSchemas), () => [
    parse$5(resultHeadingBlockSchema, {}),
    parse$5(resultTextBlockSchema, {}),
    parse$5(resultSlotsBlockPublicSchema, {})
  ])
});
const resultSectionsArraySchema = array(resultSectionSchema);
const resultPreferencesSchema = object({
  name: optional(string(), "Results page"),
  customJS: optional(string(), ""),
  imageUrl: optional(string(), ""),
  customCSS: optional(string(), ""),
  imageOpacity: optional(number(), 25),
  backgroundImageColor: optional(string(), ""),
  allowDuplicatedRecommendations: optional(boolean(), false),
  showBar: optional(boolean(), true),
  proceedTo: fallback(picklist(["checkout", "cart"]), "cart"),
  retakeQuiz: optional(boolean(), true),
  showCartCheckoutOptions: optional(boolean(), true),
  addAllToCart: optional(boolean(), false),
  discountCode: optional(string(), "")
});
const resultPageSchema = object({
  ref: optional(string(), () => "r-" + generateREF()),
  sections: optional(resultSectionsArraySchema, () => [parse$5(resultSectionSchema, {})]),
  preferences: optional(resultPreferencesSchema, parse$5(resultPreferencesSchema, {}))
});
object({
  ...resultPageSchema.entries,
  sections: optional(array(resultSectionPublicSchema), () => [
    parse$5(resultSectionPublicSchema, {})
  ])
});
const quizPublicSchema = object({
  id: optional(string(), ""),
  name: optional(string(), "Quiz"),
  preferences: optional(preferencesPublicSchema, parse$5(preferencesPublicSchema, {})),
  content: optional(contentSchema, parse$5(contentSchema, {})),
  design: optional(designSchema, parse$5(designSchema, {})),
  questions: optional(array(questionPublicSchema), [parse$5(questionPublicSchema, {})]),
  results: optional(array(resultPageSchema), [parse$5(resultPageSchema, {})]),
  timestamp: optional(number(), Date.now()),
  databaseTimestamp: optional(number(), Date.now())
});
const recommendationsSchema = record(
  string(),
  record(string(), array(string()))
);
const answerSchema = object({
  blockRef: optional(string(), ""),
  type: optional(string(), ""),
  choicesRefs: optional(array(string()), []),
  value: optional(string(), ""),
  isValid: optional(boolean(), false)
});
const integrationEventSchema = object({
  type: string(),
  status: picklist(["success", "error"]),
  timestamp: string(),
  attempt: number(),
  http_status: optional(number()),
  error: optional(string()),
  warnings: optional(array(string())),
  // Additional fields for specific integration types
  url: optional(string()),
  name: optional(string()),
  list_id: optional(string()),
  zap_id: optional(string()),
  event_id: optional(string())
});
object({
  responseId: string(),
  quiz: optional(quizPublicSchema),
  quizId: optional(string()),
  /** An HTML experiment response reopens the group it was taken on. */
  experimentGroup: optional(picklist(["control", "treatment"])),
  resultRef: optional(string(), ""),
  cartsTotalPrice: optional(number()),
  visibleSectionsRefs: optional(array(string()), []),
  answers: optional(array(answerSchema), []),
  domain: optional(string(), ""),
  createdAt: optional(string(), (/* @__PURE__ */ new Date()).toISOString()),
  tags: optional(array(string()), []),
  storefrontAccessToken: optional(string(), ""),
  recommendations: optional(recommendationsSchema, {}),
  isAdminGenerated: optional(boolean(), false),
  variableScores: optional(record(string(), number())),
  highestVariableRef: optional(string()),
  marketId: optional(string()),
  originOrderId: optional(nullable(string())),
  itemsData: optional(record(string(), any()), {}),
  orderTotalPrice: optional(number(), 0),
  integrationEvents: optional(array(integrationEventSchema), []),
  channel: optional(picklist(["quiz", "assistant"])),
  /** HTML responses only (the responses table); JSON responses have no journey. */
  journeyStatus: optional(picklist(["unfinished", "abandoned", "completed"]))
});
const statePublicSchema = object({
  ...quizPublicSchema.entries,
  answers: optional(array(answerSchema), []),
  responseId: optional(string()),
  recommendations: optional(recommendationsSchema),
  currentQuizPage: optional(any()),
  quizNavigationFutureStates: optional(array(any()), []),
  quizNavigationPastStates: optional(array(any()), [])
});
var define_import_meta_env_default$2 = { BASE_URL: "./", MODE: "production", DEV: false, PROD: true, SSR: false };
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((define_import_meta_env_default$2 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api2 = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api2);
  return api2;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var withSelector = { exports: {} };
var withSelector_production = {};
var shim$2 = { exports: {} };
var useSyncExternalStoreShim_production = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports;
function is$2(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$2, useState = React$1.useState, useEffect$1 = React$1.useEffect, useLayoutEffect = React$1.useLayoutEffect, useDebugValue$2 = React$1.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
  useLayoutEffect(
    function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$1(
    function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    },
    [subscribe]
  );
  useDebugValue$2(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$1(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim$1;
{
  shim$2.exports = useSyncExternalStoreShim_production;
}
var shimExports = shim$2.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports, shim = shimExports;
function is$1(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs = "function" === typeof Object.is ? Object.is : is$1, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue$1 = React.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function() {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return memoizedSelection = currentSelection;
          }
          return memoizedSelection = nextSnapshot;
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return memoizedSnapshot = nextSnapshot, currentSelection;
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection = nextSelection;
      }
      var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function() {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot ? void 0 : function() {
          return memoizedSelector(maybeGetServerSnapshot());
        }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function() {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue$1(value);
  return value;
};
{
  withSelector.exports = withSelector_production;
}
var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
var define_import_meta_env_default$1 = { BASE_URL: "./", MODE: "production", DEV: false, PROD: true, SSR: false };
const { useDebugValue } = React$2;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api2, selector = identity, equalityFn) {
  if ((define_import_meta_env_default$1 ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api2.subscribe,
    api2.getState,
    api2.getServerState || api2.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if ((define_import_meta_env_default$1 ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api2 = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api2, selector, equalityFn);
  Object.assign(useBoundStore, api2);
  return useBoundStore;
};
const create$1 = (createState) => createState ? createImpl(createState) : createImpl;
var define_import_meta_env_default = { BASE_URL: "./", MODE: "production", DEV: false, PROD: true, SSR: false };
const subscribeWithSelectorImpl = (fn) => (set2, get, api2) => {
  const origSubscribe = api2.subscribe;
  api2.subscribe = (selector, optListener, options2) => {
    let listener = selector;
    if (optListener) {
      const equalityFn = (options2 == null ? void 0 : options2.equalityFn) || Object.is;
      let currentSlice = selector(api2.getState());
      listener = (state) => {
        const nextSlice = selector(state);
        if (!equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          optListener(currentSlice = nextSlice, previousSlice);
        }
      };
      if (options2 == null ? void 0 : options2.fireImmediately) {
        optListener(currentSlice, currentSlice);
      }
    }
    return origSubscribe(listener);
  };
  const initialState = fn(set2, get, api2);
  return initialState;
};
const subscribeWithSelector = subscribeWithSelectorImpl;
function createJSONStorage(getStorage, options2) {
  let storage;
  try {
    storage = getStorage();
  } catch (_e) {
    return;
  }
  const persistStorage2 = {
    getItem: (name) => {
      var _a;
      const parse2 = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse2);
      }
      return parse2(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, void 0)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage2;
}
const toThenable = (fn) => (input2) => {
  try {
    const result2 = fn(input2);
    if (result2 instanceof Promise) {
      return result2;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result2);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const oldImpl = (config, baseOptions) => (set2, get, api2) => {
  let options2 = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options2.getStorage();
  } catch (_e) {
  }
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options2.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get,
      api2
    );
  }
  const thenableSerialize = toThenable(options2.serialize);
  const setItem = () => {
    const state = options2.partialize({ ...get() });
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options2.version }).then(
      (serializedValue) => storage.setItem(options2.name, serializedValue)
    ).catch((e) => {
      errorInSync = e;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api2.setState;
  api2.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set2(...args);
      void setItem();
    },
    get,
    api2
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb2) => cb2(get()));
    const postRehydrationCallback = ((_a = options2.onRehydrateStorage) == null ? void 0 : _a.call(options2, get())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options2.name).then((storageValue) => {
      if (storageValue) {
        return options2.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options2.version) {
          if (options2.migrate) {
            return options2.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options2.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set2(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb2) => cb2(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api2.persist = {
    setOptions: (newOptions) => {
      options2 = {
        ...options2,
        ...newOptions
      };
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options2.name);
    },
    getOptions: () => options2,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb2) => {
      hydrationListeners.add(cb2);
      return () => {
        hydrationListeners.delete(cb2);
      };
    },
    onFinishHydration: (cb2) => {
      finishHydrationListeners.add(cb2);
      return () => {
        finishHydrationListeners.delete(cb2);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};
const newImpl = (config, baseOptions) => (set2, get, api2) => {
  let options2 = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options2.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options2.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get,
      api2
    );
  }
  const setItem = () => {
    const state = options2.partialize({ ...get() });
    return storage.setItem(options2.name, {
      state,
      version: options2.version
    });
  };
  const savedSetState = api2.setState;
  api2.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set2(...args);
      void setItem();
    },
    get,
    api2
  );
  api2.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb2) => {
      var _a2;
      return cb2((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options2.onRehydrateStorage) == null ? void 0 : _b.call(options2, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options2.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options2.version) {
          if (options2.migrate) {
            return [
              true,
              options2.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              )
            ];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options2.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set2(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb2) => cb2(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api2.persist = {
    setOptions: (newOptions) => {
      options2 = {
        ...options2,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options2.name);
    },
    getOptions: () => options2,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb2) => {
      hydrationListeners.add(cb2);
      return () => {
        hydrationListeners.delete(cb2);
      };
    },
    onFinishHydration: (cb2) => {
      finishHydrationListeners.add(cb2);
      return () => {
        finishHydrationListeners.delete(cb2);
      };
    }
  };
  if (!options2.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persistImpl = (config, baseOptions) => {
  if ("getStorage" in baseOptions || "serialize" in baseOptions || "deserialize" in baseOptions) {
    if ((define_import_meta_env_default ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
      );
    }
    return oldImpl(config, baseOptions);
  }
  return newImpl(config, baseOptions);
};
const persist = persistImpl;
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  var _a;
  if (!value)
    return false;
  return isPlainObject$3(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_a = value.constructor) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject$3(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null || proto === Object.prototype)
    return true;
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  if (typeof Ctor !== "function")
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each$1(obj, iter, strict = true) {
  if (getArchtype(obj) === 0) {
    const keys = strict ? Reflect.ownKeys(obj) : Object.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index2) => iter(index2, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has$1(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t2 = getArchtype(thing);
  if (t2 === 2)
    thing.set(propOrOldValue, value);
  else if (t2 === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x2, y2) {
  if (x2 === y2) {
    return x2 !== 0 || 1 / x2 === 1 / y2;
  } else {
    return x2 !== x2 && y2 !== y2;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject$3(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  value: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || typeof obj !== "object")
    return true;
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin2 = plugins[pluginKey];
  if (!plugin2) {
    die(0, pluginKey);
  }
  return plugin2;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result2, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result2 !== void 0 && result2 !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result2)) {
      result2 = finalize(scope, result2);
      if (!scope.parent_)
        maybeFreeze(scope, result2);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result2,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result2 = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result2 !== NOTHING ? result2 : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const useStrictIteration = rootScope.immer_.shouldUseStrictIteration();
  const state = value[DRAFT_STATE];
  if (!state) {
    each$1(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
      useStrictIteration
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result2 = state.copy_;
    let resultEach = result2;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result2);
      result2.clear();
      isSet2 = true;
    }
    each$1(
      resultEach,
      (key, childValue) => finalizeProperty(
        rootScope,
        state,
        result2,
        key,
        childValue,
        path,
        isSet2
      ),
      useStrictIteration
    );
    maybeFreeze(rootScope, result2, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue == null) {
    return;
  }
  if (typeof childValue !== "object" && !targetIsSet) {
    return;
  }
  const childIsFrozen = isFrozen(childValue);
  if (childIsFrozen && !targetIsSet) {
    return;
  }
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has$1(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !childIsFrozen) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    if (parentState && parentState.base_ && parentState.base_[prop] === childValue && childIsFrozen) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has$1(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc == null ? void 0 : desc.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has$1(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each$1(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  var _a;
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (_a = desc.get) == null ? void 0 : _a.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = true;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self2 = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self2.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result2;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result2 = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result2, scope);
      } else if (!base || typeof base !== "object") {
        result2 = recipe(base);
        if (result2 === void 0)
          result2 = base;
        if (result2 === NOTHING)
          result2 = void 0;
        if (this.autoFreeze_)
          freeze(result2, true);
        if (patchListener) {
          const p2 = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result2, p2, ip);
          patchListener(p2, ip);
        }
        return result2;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result2 = this.produce(base, recipe, (p2, ip) => {
        patches = p2;
        inversePatches = ip;
      });
      return [result2, patches, inversePatches];
    };
    if (typeof (config == null ? void 0 : config.autoFreeze) === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof (config == null ? void 0 : config.useStrictShallowCopy) === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (typeof (config == null ? void 0 : config.useStrictIteration) === "boolean")
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each$1(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
var immer$1 = new Immer2();
var produce = immer$1.produce;
const immerImpl = (initializer) => (set2, get, store) => {
  store.setState = (updater, replace, ...a) => {
    const nextState = typeof updater === "function" ? produce(updater) : updater;
    return set2(nextState, replace, ...a);
  };
  return initializer(store.setState, get, store);
};
const immer = immerImpl;
function isUrlValid(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
    // fragment locator
    "i"
  );
  return pattern.test(str);
}
const isCustomUrl = (url) => {
  if (url === void 0 || url === null) {
    return false;
  }
  if (typeof url !== "string") {
    return false;
  }
  return url.startsWith("url:") || url.startsWith("url-new-tab:");
};
const formatUrl = (url) => {
  return url.split(":").map((part, index2) => index2 === 0 ? [] : part).flat().join(":");
};
const dynamicContentPattern = /<dynamic class="dynamic-content"[^>]*data-ref="([^"]+)"[^>]*>[\s\S]*?<\/dynamic>/g;
const simplifiedDynamicContentPattern = /<dynamic\b[^>]*\bdata-ref="([^"]+)"[^>]*>/g;
const hasDynamicContent = (html) => {
  dynamicContentPattern.lastIndex = 0;
  return dynamicContentPattern.test(html);
};
const getDataRefsFromDynamicContent = (html) => {
  const dataRefs = [];
  let match;
  while ((match = simplifiedDynamicContentPattern.exec(html)) !== null) {
    dataRefs.push(match[1]);
  }
  return dataRefs;
};
const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;"
};
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (ch2) => HTML_ENTITIES[ch2]);
}
function encodeIfString(value) {
  return typeof value === "string" ? escapeHtml(value) : value;
}
function encodeAnswer(answer) {
  return { ...answer, value: encodeIfString(answer.value) };
}
function sanitizeLiquidContext(context) {
  const quiz = context.quiz;
  if (!quiz) return context;
  const answers = quiz.answers;
  if (!answers) return context;
  const safeList = Array.isArray(answers.list) ? answers.list.map(encodeAnswer) : answers.list;
  const safeByBlock = answers.byBlock ? Object.fromEntries(
    Object.entries(answers.byBlock).map(([key, answer]) => [key, encodeAnswer(answer)])
  ) : answers.byBlock;
  const safeByQuestion = answers.byQuestion ? Object.fromEntries(
    Object.entries(answers.byQuestion).map(([key, summary]) => [
      key,
      { ...summary, answers: summary.answers.map(encodeAnswer) }
    ])
  ) : answers.byQuestion;
  const safeLatest = answers.latest ? encodeAnswer(answers.latest) : answers.latest;
  return {
    ...context,
    quiz: {
      ...quiz,
      answers: {
        ...answers,
        list: safeList,
        byBlock: safeByBlock,
        byQuestion: safeByQuestion,
        latest: safeLatest
      }
    }
  };
}
/*! js-cookie v3.0.8 | MIT */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (key === "__proto__") continue;
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set2(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        if (!(found in jar)) jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (_e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set: set2,
      get,
      remove: function(name, attributes) {
        set2(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });
const getHeadersWithAhoyVisit = () => {
  const ahoy_visit = api.get("ahoy_visit");
  const headers = {
    "Content-Type": "application/json"
  };
  if (ahoy_visit) {
    headers["a-v"] = ahoy_visit;
  }
  return headers;
};
const createQuizResponse = async (payload) => {
  const { quizId } = payload;
  const requestPayload = {
    ...payload
  };
  const { myshopifyDomain, ...responsePayload } = requestPayload;
  const response = await fetch(CREATE_RESPONSE_URL(quizId, myshopifyDomain), {
    method: "POST",
    headers: getHeadersWithAhoyVisit(),
    body: JSON.stringify(responsePayload)
  }).then(async (res) => await res.json());
  if (!response || !response.responseId) {
    console.error("Error submitting answers:", response);
  }
  return response;
};
const getQuizResponse = async (responseId, myshopifyDomain) => {
  const response = await fetch(GET_RESPONSE_URL(responseId, myshopifyDomain)).then(
    async (res) => await res.json()
  );
  return response;
};
const VALID_SECTIONS = ["questions", "results", "logic", "design", "checklist"];
function buildRefLookup(quiz) {
  var _a, _b;
  const questionRefs = /* @__PURE__ */ new Set();
  const resultRefs = /* @__PURE__ */ new Set();
  const questionBlockRefs = /* @__PURE__ */ new Set();
  const choiceRefs = /* @__PURE__ */ new Set();
  const resultSectionRefs = /* @__PURE__ */ new Set();
  const resultBlockRefs = /* @__PURE__ */ new Set();
  const slotRefs = /* @__PURE__ */ new Set();
  const parentMap = /* @__PURE__ */ new Map();
  for (const question of quiz.questions ?? []) {
    questionRefs.add(question.ref);
    for (const block of question.blocks ?? []) {
      questionBlockRefs.add(block.ref);
      parentMap.set(block.ref, question.ref);
      if (block.type === BlockType.CHOICE && ((_a = block.preferences) == null ? void 0 : _a.choices)) {
        for (const choice of block.preferences.choices) {
          choiceRefs.add(choice.ref);
          parentMap.set(choice.ref, question.ref);
        }
      }
    }
  }
  for (const result2 of quiz.results ?? []) {
    resultRefs.add(result2.ref);
    for (const section of result2.sections ?? []) {
      resultSectionRefs.add(section.ref);
      parentMap.set(section.ref, result2.ref);
      for (const block of section.blocks ?? []) {
        resultBlockRefs.add(block.ref);
        parentMap.set(block.ref, result2.ref);
        if (block.type === ResultBlockType.SLOTS && ((_b = block.preferences) == null ? void 0 : _b.slots)) {
          for (const slot of block.preferences.slots) {
            slotRefs.add(slot.ref);
            parentMap.set(slot.ref, result2.ref);
          }
        }
      }
    }
  }
  const isQuestion = (ref) => ref != null && questionRefs.has(ref);
  const isResult = (ref) => ref != null && resultRefs.has(ref);
  const isQuestionBlockFn = (ref) => ref != null && questionBlockRefs.has(ref);
  const isChoice = (ref) => ref != null && choiceRefs.has(ref);
  const isResultSection = (ref) => ref != null && resultSectionRefs.has(ref);
  const isResultBlockFn = (ref) => ref != null && resultBlockRefs.has(ref);
  const isSlot = (ref) => ref != null && slotRefs.has(ref);
  const getSection = (ref) => {
    if (questionRefs.has(ref) || questionBlockRefs.has(ref) || choiceRefs.has(ref)) {
      return "questions";
    }
    if (resultRefs.has(ref) || resultSectionRefs.has(ref) || resultBlockRefs.has(ref) || slotRefs.has(ref)) {
      return "results";
    }
    return null;
  };
  const getElementType = (ref) => {
    if (!ref) return null;
    if (VALID_SECTIONS.includes(ref)) {
      return {
        type: "section",
        section: ref,
        isBlockType: false
      };
    }
    let type = null;
    let isBlockType = false;
    if (questionRefs.has(ref)) {
      type = "question";
    } else if (questionBlockRefs.has(ref)) {
      type = "questionBlock";
      isBlockType = true;
    } else if (choiceRefs.has(ref)) {
      type = "choice";
    } else if (resultRefs.has(ref)) {
      type = "result";
    } else if (resultSectionRefs.has(ref)) {
      type = "resultSection";
    } else if (resultBlockRefs.has(ref)) {
      type = "resultBlock";
      isBlockType = true;
    } else if (slotRefs.has(ref)) {
      type = "slot";
    }
    if (type == null) return null;
    const section = getSection(ref) ?? "questions";
    return { type, section, isBlockType };
  };
  return {
    questionRefs,
    resultRefs,
    questionBlockRefs,
    choiceRefs,
    resultSectionRefs,
    resultBlockRefs,
    slotRefs,
    isQuestion,
    isResult,
    isQuestionBlock: isQuestionBlockFn,
    isChoice,
    isResultSection,
    isResultBlock: isResultBlockFn,
    isSlot,
    getElementType,
    findParentRef: (ref) => parentMap.get(ref) ?? null,
    findParentPage: (ref, quizData) => {
      var _a2, _b2, _c, _d;
      if (questionRefs.has(ref)) {
        return ((_a2 = quizData.questions) == null ? void 0 : _a2.find((q2) => q2.ref === ref)) ?? null;
      }
      if (resultRefs.has(ref)) {
        return ((_b2 = quizData.results) == null ? void 0 : _b2.find((r2) => r2.ref === ref)) ?? null;
      }
      const parent = parentMap.get(ref);
      if (!parent) return null;
      return ((_c = quizData.questions) == null ? void 0 : _c.find((q2) => q2.ref === parent)) ?? ((_d = quizData.results) == null ? void 0 : _d.find((r2) => r2.ref === parent)) ?? null;
    },
    getSection
  };
}
buildRefLookup({ questions: [], results: [] });
const selectQuestionDraft = (draft, question) => {
  var _a;
  draft.choiceSelectedRef = "";
  draft.questionBlockSelectedRef = "";
  draft.selectedButtonId = "";
  draft.questionSelectedRef = question.ref;
  draft.currentQuizPage = question;
  draft.selectedQuizElement = question;
  draft.selectedQuizElementType = "question";
  if ((_a = draft.closedQuestions) == null ? void 0 : _a[question.ref]) {
    draft.closedQuestions[question.ref] = false;
  }
};
const selectResultDraft = (draft, result2) => {
  var _a;
  draft.resultSelectedRef = result2.ref;
  draft.resultSectionSelectedRef = void 0;
  draft.resultBlockSelectedRef = void 0;
  draft.resultSlotSelectedRef = void 0;
  draft.currentQuizPage = result2;
  draft.selectedResultElement = result2;
  draft.selectedResultElementType = "result";
  if ((_a = draft.closedResults) == null ? void 0 : _a[result2.ref]) {
    draft.closedResults[result2.ref] = false;
  }
};
const syncBuilderSelectionToPageDraft = (draft, page, lookup) => {
  if (!(page == null ? void 0 : page.ref)) return;
  if (lookup.isQuestion(page.ref)) {
    selectQuestionDraft(draft, page);
    return;
  }
  if (lookup.isResult(page.ref)) {
    selectResultDraft(draft, page);
  }
};
const hasAnswerChanged = (existing, newValue, newChoicesRefs, newIsValid) => {
  if (existing.value !== newValue) return true;
  if (existing.isValid !== newIsValid) return true;
  if (existing.choicesRefs.length !== newChoicesRefs.length) return true;
  return existing.choicesRefs.some((ref, i) => ref !== newChoicesRefs[i]);
};
const calculateVariableScores = (questions, answers) => {
  const scores = {};
  questions.forEach((q2) => {
    q2.blocks.forEach((b) => {
      var _a;
      if (b.type === BlockType.CHOICE) {
        (_a = b.preferences.choices) == null ? void 0 : _a.forEach((c) => {
          var _a2;
          (_a2 = c.calculations) == null ? void 0 : _a2.forEach((calc) => {
            if (!(calc.variableRef in scores)) {
              scores[calc.variableRef] = 0;
            }
          });
        });
      }
    });
  });
  answers.forEach((answer) => {
    if (!answer.choicesRefs || answer.choicesRefs.length === 0) {
      return;
    }
    const question = questions.find((q2) => q2.blocks.some((b) => b.ref === answer.blockRef));
    const block = question == null ? void 0 : question.blocks.find((b) => b.ref === answer.blockRef);
    if ((block == null ? void 0 : block.type) === BlockType.CHOICE) {
      answer.choicesRefs.forEach((choiceRef) => {
        var _a, _b;
        const choice = (_a = block.preferences.choices) == null ? void 0 : _a.find((c) => c.ref === choiceRef);
        (_b = choice == null ? void 0 : choice.calculations) == null ? void 0 : _b.forEach((calc) => {
          if (calc.operation === "add") {
            scores[calc.variableRef] = (scores[calc.variableRef] ?? 0) + calc.value;
          }
        });
      });
    }
  });
  let highestScore = -Infinity;
  let highestRef = void 0;
  for (const [ref, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      highestRef = ref;
    }
  }
  if (highestScore <= 0) {
    highestRef = void 0;
  }
  return { variableScores: scores, highestVariableRef: highestRef };
};
const preserveUtmParameters = (destinationUrl, currentSearch) => {
  const destination = new URL(destinationUrl);
  const destinationParameterNames = new Set(
    [...destination.searchParams.keys()].map((key) => key.toLowerCase())
  );
  for (const [key, value] of new URLSearchParams(currentSearch)) {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey.startsWith("utm_") && !destinationParameterNames.has(normalizedKey)) {
      destination.searchParams.append(key, value);
    }
  }
  return destination.toString();
};
const handleRedirectAction = (nextItem, saveQuizResponseForRedirect, inBuilder, quizId, isStoreRenderer, setIsRedirectInProgress, quizName, preferences) => {
  const formattedUrl = formatUrl(nextItem);
  const url = formattedUrl.startsWith("http") ? formattedUrl : `https://${formattedUrl}`;
  const isBlank = nextItem.startsWith("url-new-tab:");
  if (!isUrlValid(url)) {
    return;
  }
  const redirectUrl = preserveUtmParameters(url, window.location.search);
  setTimeout(() => {
    setIsRedirectInProgress(false);
  }, 3e3);
  (async () => {
    try {
      if (!inBuilder) {
        const responseId = await saveQuizResponseForRedirect(redirectUrl);
        if (isStoreRenderer && responseId) {
          try {
            trackQuizCompletedWithRedirect(quizName, preferences);
          } catch (e) {
            console.error("Failed to fire tracking events before redirect:", e);
          }
        }
        if (isStoreRenderer && responseId && quizId) {
          await tagCart(responseId, quizId);
        }
      }
    } catch (error) {
      console.error("Failed to save quiz responses before redirect:", error);
    } finally {
      window.open(redirectUrl, isBlank ? "_blank" : "_self");
    }
  })();
};
const getFallbackDestination = (currentQuestion, questions, results) => {
  const currentIndex = questions.findIndex((q2) => q2.ref === currentQuestion.ref);
  const nextQuestion = questions[currentIndex + 1];
  const firstResult = results[0];
  return nextQuestion || firstResult || null;
};
function createRefLookupCache() {
  let cachedQuestions;
  let cachedResults;
  let cachedLookup;
  return (get) => {
    const questions = get().questions ?? [];
    const results = get().results ?? [];
    if (questions !== cachedQuestions || results !== cachedResults || !cachedLookup) {
      cachedQuestions = questions;
      cachedResults = results;
      cachedLookup = buildRefLookup({ questions, results });
    }
    return cachedLookup;
  };
}
const getSubmissionAnswers = ({
  answers,
  questions,
  currentQuizPage,
  inBuilder,
  quizNavigationPastStates,
  quizNavigationPastStatesInBuilder,
  prefillOnRetake
}) => {
  if (!prefillOnRetake) {
    return answers;
  }
  const pastStates = inBuilder ? quizNavigationPastStatesInBuilder : quizNavigationPastStates;
  const allQuestionRefs = new Set(questions.map((q2) => q2.ref));
  const isQPage = (page) => page != null && allQuestionRefs.has(page.ref);
  const visitedQuestionRefs = new Set(pastStates.filter(isQPage).map((question) => question.ref));
  if (isQPage(currentQuizPage)) {
    visitedQuestionRefs.add(currentQuizPage.ref);
  }
  if (visitedQuestionRefs.size === 0) {
    return answers;
  }
  const visitedBlockRefs = new Set(
    questions.filter((question) => visitedQuestionRefs.has(question.ref)).flatMap((question) => question.blocks).filter((block) => block.type === BlockType.CHOICE || block.type === BlockType.INPUT).map((block) => block.ref)
  );
  return answers.filter((answer) => visitedBlockRefs.has(answer.blockRef));
};
const getInitialAnswerState = (block, _get) => {
  let isValid = false;
  if (block.type === BlockType.CHOICE || block.type === BlockType.INPUT) {
    const isEmptyChoiceBlock = block.type === BlockType.CHOICE && "choices" in block.preferences && (!block.preferences.choices || block.preferences.choices.length === 0);
    isValid = isEmptyChoiceBlock || "optional" in block.preferences && block.preferences.optional || block.type === BlockType.INPUT && (block.preferences.type === InputType.SHORT_TEXT || block.preferences.type === InputType.LONG_TEXT || block.preferences.type === InputType.FIRST_NAME || block.preferences.type === InputType.LAST_NAME || block.preferences.type === InputType.FULL_NAME) && block.preferences.minLength === 0 || block.type === BlockType.INPUT && block.preferences.type === InputType.NUMBER && block.preferences.minRange === 0 || block.type === BlockType.CHOICE && (block.preferences.type === ChoiceType.MULTIPLE_CHOICE || block.preferences.type === ChoiceType.PICTURE_CHOICE || block.preferences.type === ChoiceType.DROPDOWN_CHOICE) && block.preferences.minSelected === 0;
  }
  return {
    choicesRefs: [],
    value: "",
    isValid
  };
};
const resetAnswersForQuestion = (questionRef, draft, get) => {
  const questionToReset = get().questions.find((q2) => q2.ref === questionRef);
  if (!questionToReset) {
    console.warn(`[resetAnswersForQuestion] Question not found: ${questionRef}`);
    return;
  }
  questionToReset.blocks.forEach((block) => {
    if (block.type !== BlockType.CHOICE && block.type !== BlockType.INPUT) {
      return;
    }
    const answerIndex = draft.answers.findIndex((a) => a.blockRef === block.ref);
    if (answerIndex !== -1) {
      const initialState = getInitialAnswerState(block);
      draft.answers[answerIndex].choicesRefs = initialState.choicesRefs;
      draft.answers[answerIndex].value = initialState.value;
      draft.answers[answerIndex].isValid = initialState.isValid;
    }
  });
};
const createQuizNavigationSlice = (set2, get) => {
  const getRefLookup = createRefLookupCache();
  return {
    answers: [],
    currentQuizPage: null,
    direction: "forward",
    inBuilder: false,
    quizNavigationPastStates: [],
    quizNavigationFutureStates: [],
    quizNavigationPastStatesInBuilder: [],
    quizNavigationFutureStatesInBuilder: [],
    quizNavigationVisitedStates: [],
    recommendations: {},
    recommendationsVariants: [],
    responseId: "",
    visibleSectionsRefs: [],
    nextOverrideRef: null,
    variableScores: {},
    highestVariableRef: void 0,
    showQuestions: true,
    isRedirectInProgress: false,
    isCurrentQuestion: () => {
      const { currentQuizPage } = get();
      if (!currentQuizPage) return false;
      return getRefLookup(get).isQuestion(currentQuizPage.ref);
    },
    isCurrentResult: () => {
      const { currentQuizPage } = get();
      if (!currentQuizPage) return false;
      return getRefLookup(get).isResult(currentQuizPage.ref);
    },
    setInBuilder: (inBuilder) => set2(() => ({ inBuilder })),
    initializeAnswers: () => {
      const questions = get().questions;
      const initialAnswers = [];
      questions.forEach((question) => {
        const blocks = question.blocks.filter(
          (block) => block.type === BlockType.CHOICE || block.type === BlockType.INPUT
        );
        blocks.forEach((block) => {
          const initialState = getInitialAnswerState(block);
          const initialAnswer = {
            blockRef: block.ref,
            type: block.preferences.type,
            // Keep the block type
            choicesRefs: initialState.choicesRefs,
            value: initialState.value,
            isValid: initialState.isValid
          };
          initialAnswers.push(initialAnswer);
        });
      });
      set2(() => ({ answers: initialAnswers }));
    },
    cleanNavigationHistory: () => {
      set2(
        produce((draft) => {
          draft.quizNavigationPastStates = [];
          draft.quizNavigationFutureStates = [];
          draft.quizNavigationPastStatesInBuilder = [];
          draft.quizNavigationFutureStatesInBuilder = [];
        })
      );
    },
    // Set a one-shot override for the next destination
    overrideNext: (targetRef) => {
      if (typeof targetRef !== "string" || !targetRef) {
        console.warn(`[overrideNext] Invalid targetRef: ${targetRef}`);
        return;
      }
      const lookup = getRefLookup(get);
      if (!lookup.isQuestion(targetRef) && !lookup.isResult(targetRef)) {
        console.warn(`[overrideNext] targetRef not found in quiz: ${targetRef}`);
        return;
      }
      set2({ nextOverrideRef: targetRef });
    },
    updateAnswerByBlockRef: (blockRef, updatedAnswer, isValid) => {
      set2(
        produce((draft) => {
          var _a, _b;
          const answerIndex = draft.answers.findIndex((a) => a.blockRef === blockRef);
          const block = get().questions.flatMap((q2) => q2.blocks).find((b) => b.ref === blockRef);
          let calculatedValue = "";
          if (block && block.type === BlockType.CHOICE && (block.preferences.type === ChoiceType.MULTIPLE_CHOICE || block.preferences.type === ChoiceType.PICTURE_CHOICE || block.preferences.type === ChoiceType.DROPDOWN_CHOICE || block.preferences.type === ChoiceType.YES_NO || block.preferences.type === ChoiceType.LEGAL_GDPR || block.preferences.type === ChoiceType.SLIDER_CHOICE)) {
            calculatedValue = ((_a = block.preferences.choices) == null ? void 0 : _a.filter(
              (choice) => {
                var _a2;
                return (_a2 = updatedAnswer.choicesRefs) == null ? void 0 : _a2.includes(choice.ref);
              }
            ).map((choice) => choice.label).join(", ").replace(/, ([^,]*)$/, ` ${get().getTranslatedContent({ key: "and" })} $1`)) || "";
          }
          const finalAnswer = {
            blockRef,
            type: updatedAnswer.type || ((_b = block == null ? void 0 : block.preferences) == null ? void 0 : _b.type) || (block == null ? void 0 : block.type) || "",
            choicesRefs: updatedAnswer.choicesRefs || [],
            value: calculatedValue || updatedAnswer.value || "",
            isValid
          };
          if (answerIndex === -1) {
            draft.answers.push(finalAnswer);
          } else {
            draft.answers[answerIndex] = {
              ...draft.answers[answerIndex],
              ...finalAnswer
            };
          }
          const { variableScores, highestVariableRef } = calculateVariableScores(
            get().questions,
            // Need the full questions array
            draft.answers
            // Use the updated answers from the draft
          );
          draft.variableScores = variableScores;
          draft.highestVariableRef = highestVariableRef;
        })
      );
      try {
        const { inBuilder } = get();
        if (typeof window !== "undefined" && !inBuilder) {
          const emit = () => {
            var _a, _b, _c;
            try {
              const state = get();
              const quiz = window.Quiz;
              const quizLower = window.quiz;
              const questions = state.questions;
              const question = questions.find((q2) => q2.blocks.some((b) => b.ref === blockRef));
              const updated = state.answers.find((a) => a.blockRef === blockRef);
              const block = questions.flatMap((q2) => q2.blocks).find((b) => b.ref === blockRef);
              let selectedIndex = void 0;
              let selectedLabel = void 0;
              const choices = ((_a = block == null ? void 0 : block.preferences) == null ? void 0 : _a.choices) || [];
              const selRef = (_b = updated == null ? void 0 : updated.choicesRefs) == null ? void 0 : _b[0];
              if (selRef) {
                const idx = choices.findIndex((c) => c.ref === selRef);
                if (idx >= 0) {
                  selectedIndex = idx;
                  selectedLabel = (_c = choices[idx]) == null ? void 0 : _c.label;
                }
              }
              const eventPayload = {
                questionRef: question == null ? void 0 : question.ref,
                blockRef,
                type: updated == null ? void 0 : updated.type,
                choicesRefs: updated == null ? void 0 : updated.choicesRefs,
                value: updated == null ? void 0 : updated.value,
                isValid: (updated == null ? void 0 : updated.isValid) ?? false,
                selectedIndex,
                selectedLabel
              };
              if (quiz && typeof quiz.onChange === "function") {
                quiz.onChange(eventPayload);
              }
              if (quizLower && typeof quizLower.onChange === "function") {
                quizLower.onChange(eventPayload);
              }
            } catch (e) {
              console.error("Error in Quiz.onChange handler:", e);
            }
          };
          if (typeof queueMicrotask === "function") {
            queueMicrotask(emit);
          } else {
            setTimeout(emit, 0);
          }
        }
      } catch (e) {
        console.error("Error scheduling Quiz.onChange emit:", e);
      }
    },
    setAnswerWithPayload: (blockRef, payload) => {
      var _a;
      const block = get().getQuestionBlockByQuestionBlockRef(blockRef);
      if (!block) {
        console.error("Block not found:", blockRef);
        return;
      }
      const isValid = payload.isValid !== void 0 ? payload.isValid : true;
      const existingAnswer = get().getAnswerByBlockRef(blockRef);
      if (existingAnswer) {
        const newValue = payload.value ?? existingAnswer.value;
        const newChoicesRefs = payload.choicesRefs ?? existingAnswer.choicesRefs;
        if (!hasAnswerChanged(existingAnswer, newValue, newChoicesRefs, isValid)) {
          return;
        }
      }
      get().updateAnswerByBlockRef(
        blockRef,
        {
          blockRef,
          type: ((_a = block.preferences) == null ? void 0 : _a.type) || block.type,
          ...payload
        },
        isValid
      );
    },
    setAnswers: (answers) => {
      const hasAnyChanges = Object.entries(answers).some(([blockRef, payload]) => {
        const existingAnswer = get().getAnswerByBlockRef(blockRef);
        if (!existingAnswer) return true;
        const newValue = typeof payload === "string" ? payload : payload.value ?? "";
        const newChoicesRefs = typeof payload === "object" && payload.choicesRefs ? payload.choicesRefs : [];
        const newIsValid = typeof payload === "object" ? payload.isValid !== false : true;
        return hasAnswerChanged(existingAnswer, newValue, newChoicesRefs, newIsValid);
      });
      if (!hasAnyChanges) {
        return;
      }
      set2(
        produce((draft) => {
          Object.entries(answers).forEach(([blockRef, payload]) => {
            var _a;
            const answerIndex = draft.answers.findIndex((a) => a.blockRef === blockRef);
            const block = get().questions.flatMap((q2) => q2.blocks).find((b) => b.ref === blockRef);
            const value = typeof payload === "string" ? payload : payload.value || "";
            const type = typeof payload === "object" && payload.type ? payload.type : ((_a = block == null ? void 0 : block.preferences) == null ? void 0 : _a.type) || (block == null ? void 0 : block.type) || "";
            const choicesRefs = typeof payload === "object" && payload.choicesRefs ? payload.choicesRefs : [];
            const isValid = typeof payload === "object" ? payload.isValid !== false : true;
            const finalAnswer = {
              blockRef,
              type,
              choicesRefs,
              value,
              isValid
            };
            if (answerIndex === -1) {
              draft.answers.push(finalAnswer);
            } else {
              draft.answers[answerIndex] = {
                ...draft.answers[answerIndex],
                ...finalAnswer
              };
            }
          });
          const { variableScores, highestVariableRef } = calculateVariableScores(
            get().questions,
            draft.answers
          );
          draft.variableScores = variableScores;
          draft.highestVariableRef = highestVariableRef;
        })
      );
    },
    appendAnswerValue: (blockRef, additionalValue) => {
      var _a;
      const existingAnswer = get().getAnswerByBlockRef(blockRef);
      const block = get().getQuestionBlockByQuestionBlockRef(blockRef);
      if (!block) {
        console.error("Block not found:", blockRef);
        return;
      }
      const currentValue = (existingAnswer == null ? void 0 : existingAnswer.value) || "";
      const newValue = currentValue + additionalValue;
      get().updateAnswerByBlockRef(
        blockRef,
        {
          blockRef,
          type: ((_a = block.preferences) == null ? void 0 : _a.type) || block.type,
          value: newValue,
          choicesRefs: (existingAnswer == null ? void 0 : existingAnswer.choicesRefs) || []
        },
        true
      );
    },
    clearAnswer: (blockRef) => {
      var _a;
      const block = get().getQuestionBlockByQuestionBlockRef(blockRef);
      const existingAnswer = get().getAnswerByBlockRef(blockRef);
      const type = ((_a = block == null ? void 0 : block.preferences) == null ? void 0 : _a.type) || (block == null ? void 0 : block.type) || (existingAnswer == null ? void 0 : existingAnswer.type) || "";
      get().updateAnswerByBlockRef(
        blockRef,
        {
          blockRef,
          type,
          value: "",
          choicesRefs: []
        },
        false
      );
    },
    removeAnswer: (blockRef) => {
      set2(
        produce((draft) => {
          const answerIndex = draft.answers.findIndex((a) => a.blockRef === blockRef);
          if (answerIndex !== -1) {
            draft.answers.splice(answerIndex, 1);
            const { variableScores, highestVariableRef } = calculateVariableScores(
              get().questions,
              draft.answers
            );
            draft.variableScores = variableScores;
            draft.highestVariableRef = highestVariableRef;
          }
        })
      );
    },
    setCurrentQuizPage: (currentQuizPage) => {
      set2({ currentQuizPage });
    },
    setResponse: (responseData) => {
      const answers = responseData.answers;
      const currentQuizPage = get().results.find((r2) => r2.ref === responseData.resultRef);
      const recommendations = responseData.recommendations;
      const responseId = responseData.responseId;
      const variableScores = responseData.variableScores;
      const highestVariableRef = responseData.highestVariableRef;
      const visibleSectionsRefs = responseData.visibleSectionsRefs;
      const storefrontAccessToken = responseData.storefrontAccessToken;
      const domain = responseData.domain;
      set2({
        answers,
        visibleSectionsRefs,
        currentQuizPage,
        recommendations,
        responseId,
        variableScores,
        highestVariableRef,
        storefrontAccessToken,
        domain
      });
    },
    setResponseId: (responseId) => set2({ responseId }),
    renderResult: (resultRef) => {
      set2({ currentQuizPage: get().results.find((r2) => r2.ref === resultRef) });
    },
    initializeCurrentQuizPage: () => {
      set2((state) => {
        const {
          getSelectedQuestion,
          questions,
          inBuilder,
          preferences: { saveQuizProgress }
        } = get();
        set2({ quizNavigationFutureStates: [] });
        if (inBuilder) {
          if (state.currentQuizPage) {
            return { currentQuizPage: state.currentQuizPage };
          } else {
            return { currentQuizPage: getSelectedQuestion() || questions[0] };
          }
        }
        if (!saveQuizProgress) {
          set2({ quizNavigationPastStates: [] });
          return { currentQuizPage: questions[0] };
        }
        const isNewQuizSession = !state.responseId && state.quizNavigationPastStates.length === 0 && state.quizNavigationFutureStates.length === 0;
        if (isNewQuizSession) {
          return { currentQuizPage: getSelectedQuestion() || questions[0] };
        }
        if (state.currentQuizPage) {
          return { currentQuizPage: state.currentQuizPage };
        }
        return { currentQuizPage: questions[0] };
      });
    },
    setRecommendationsVariants: (recommendationsVariants) => set2({ recommendationsVariants }),
    getFormattedDynamicContent: (html) => {
      if (!hasDynamicContent(html)) {
        return html.replace(/&nbsp;/g, " ");
      }
      return html.replace(dynamicContentPattern, (_match, dataRef) => {
        const block = get().getQuestionBlockByQuestionBlockRef(dataRef);
        if (!block) {
          console.error("Error replacing dynamic content with block ref:", dataRef);
          return get().inBuilder ? "[DELETED]" : "";
        }
        const answer = get().getAnswerByBlockRef(dataRef);
        const raw = ((answer == null ? void 0 : answer.value) || "_ _ _").replace(/&nbsp;/g, " ");
        return escapeHtml(raw);
      });
    },
    /**
     * Saves the quiz responses before URL redirection
     * Stores the destination URL in the resultRef field
     * Does NOT update local quiz state - the user should see the same question if they return
     * @param formattedUrl - The formatted URL the user is being redirected to
     * @returns The response ID if successful, null otherwise
     */
    saveQuizResponseForRedirect: async (formattedUrl) => {
      const {
        isStoreRenderer,
        id: id2,
        answers,
        currentQuizPage,
        inBuilder,
        questions,
        preferences,
        quizNavigationPastStates,
        quizNavigationPastStatesInBuilder,
        responseId,
        myshopifyDomain
      } = get();
      if (responseId) {
        return responseId;
      }
      try {
        const visibleSections = get().visibleSectionsRefs || [];
        const submissionAnswers = getSubmissionAnswers({
          answers,
          questions,
          currentQuizPage,
          inBuilder,
          quizNavigationPastStates,
          quizNavigationPastStatesInBuilder,
          prefillOnRetake: preferences.prefillOnRetake
        });
        const payload = {
          quizId: id2,
          // Store the destination URL in the resultRef field
          resultRef: formattedUrl,
          answers: submissionAnswers.map(({ isValid: _, ...rest }) => ({ ...rest })),
          visibleSectionsRefs: visibleSections,
          isAdminGenerated: !isStoreRenderer,
          marketId: window == null ? void 0 : window.quiz_market_id,
          myshopifyDomain
        };
        const data = await createQuizResponse(payload);
        set2({ responseId: data.responseId });
        return data.responseId;
      } catch (error) {
        console.error("Error saving quiz responses for URL redirect:", error);
        return null;
      }
    },
    next: (fromQuestionRef) => {
      var _a;
      if (fromQuestionRef && ((_a = get().currentQuizPage) == null ? void 0 : _a.ref) !== fromQuestionRef) {
        return;
      }
      const { rendererInstanceId, rendererType } = get();
      if (rendererInstanceId) {
        postQuizRendererMessage({
          targetWindow: window.self,
          instanceId: rendererInstanceId,
          rendererType,
          type: "nextQuestion"
        });
      }
      set2(
        produce((draft) => {
          var _a2;
          if (!draft.currentQuizPage) return;
          const currentQuestion = draft.currentQuizPage;
          let nextItem = null;
          const overrideRef = get().nextOverrideRef;
          const refLookup = getRefLookup(get);
          if (overrideRef && (refLookup.isQuestion(overrideRef) || refLookup.isResult(overrideRef))) {
            const candidate = refLookup.isQuestion(overrideRef) ? get().getQuestionByQuestionRef(overrideRef) : get().getResultByResultRef(overrideRef);
            if (candidate) {
              nextItem = candidate;
            } else {
              console.warn(
                `[next] overrideNext ref not found: ${overrideRef}. Falling back to default flow.`
              );
              nextItem = get().getNext(currentQuestion);
            }
            draft.nextOverrideRef = null;
          } else {
            nextItem = get().getNext(currentQuestion);
          }
          const currentAnswers = get().answers;
          const currentVariableScores = get().variableScores;
          const currentHighestVariableRef = get().highestVariableRef;
          while (typeof nextItem === "object" && refLookup.isQuestion(nextItem == null ? void 0 : nextItem.ref)) {
            const questionToEvaluate = nextItem;
            const skipRules = ((_a2 = questionToEvaluate.logic) == null ? void 0 : _a2.skipLogic) ?? [];
            let shouldSkip = false;
            if (skipRules.length > 0) {
              for (const rule2 of skipRules) {
                if (evaluateAndConditions(
                  rule2.conditions,
                  currentAnswers,
                  currentVariableScores,
                  currentHighestVariableRef
                )) {
                  shouldSkip = true;
                  break;
                }
              }
            }
            if (shouldSkip) {
              nextItem = get().getNext(questionToEvaluate);
            } else {
              break;
            }
          }
          nextItem = nextItem ?? get().results[0] ?? null;
          const { inBuilder, isStoreRenderer, isCurrentQuestion } = get();
          if (!inBuilder && isStoreRenderer) {
            const { answers, currentQuizPage, id: id2, name, preferences } = get();
            if (isCurrentQuestion()) {
              const answeredBlocks = answers.filter(
                ({ blockRef }) => {
                  var _a3;
                  return (_a3 = currentQuizPage == null ? void 0 : currentQuizPage.blocks) == null ? void 0 : _a3.map((b) => b.ref).includes(blockRef);
                }
              );
              const phoneAnsweredBlock = answeredBlocks.filter(
                (block) => block.type === InputType.PHONE
              );
              if (phoneAnsweredBlock.length > 0) {
                phoneAnsweredBlock.forEach((_block) => {
                  trackPhoneSubmitted(name, preferences);
                });
              }
              const emailAnsweredBlock = answeredBlocks.filter(
                (block) => block.type === InputType.EMAIL
              );
              if (emailAnsweredBlock.length > 0) {
                emailAnsweredBlock.forEach((_block) => {
                  trackEmailSubmitted(name, preferences);
                });
              }
              const nonPiiBlocks = answeredBlocks.filter(
                (block) => !PII_INPUT_TYPES.includes(block.type)
              );
              trackBlocksAnswered(
                id2,
                nonPiiBlocks,
                preferences,
                currentQuestion.ref,
                get().getQuestionTitle(currentQuestion.ref)
              );
            }
            if (get().quizNavigationPastStates.length === 0) {
              trackQuizStart(id2, name, preferences);
            }
            if (typeof nextItem === "object" && (nextItem == null ? void 0 : nextItem.ref)) {
              if (refLookup.isResult(nextItem.ref)) {
                trackQuizComplete(id2);
              }
              trackFlowEvent(id2, currentQuestion.ref, nextItem.ref);
            }
          }
          if (typeof nextItem === "string") {
            draft.isRedirectInProgress = true;
            const {
              saveQuizResponseForRedirect,
              inBuilder: inBuilder2,
              id: id2,
              isStoreRenderer: isStoreRenderer2,
              setIsRedirectInProgress,
              name: quizName,
              preferences: quizPreferences
            } = get();
            handleRedirectAction(
              nextItem,
              saveQuizResponseForRedirect,
              inBuilder2,
              id2,
              isStoreRenderer2,
              setIsRedirectInProgress,
              quizName,
              quizPreferences
            );
            return;
          }
          if (inBuilder && typeof nextItem === "object") {
            syncBuilderSelectionToPageDraft(draft, nextItem, refLookup);
          }
          if (inBuilder) {
            draft.quizNavigationFutureStatesInBuilder = [];
            draft.quizNavigationPastStatesInBuilder.push(currentQuestion);
          } else {
            draft.quizNavigationFutureStates = [];
            draft.quizNavigationPastStates.push(currentQuestion);
          }
          if (!draft.quizNavigationVisitedStates.find(
            (s) => {
              var _a3;
              return ((_a3 = s.question) == null ? void 0 : _a3.ref) === currentQuestion.ref;
            }
          )) {
            draft.quizNavigationVisitedStates.push({
              question: currentQuestion,
              time: Date.now()
            });
          }
          draft.direction = "forward";
          draft.currentQuizPage = nextItem;
        })
      );
    },
    getNext: (question) => {
      var _a, _b;
      if (!question) {
        console.error("No current question or result passed to getNext");
        return null;
      }
      const lookup = getRefLookup(get);
      if (lookup.isQuestion(question.ref)) {
        const jumpLogic = ((_a = question.logic) == null ? void 0 : _a.jumpLogic) ?? [];
        const currentAnswers = get().answers;
        const currentVariableScores = get().variableScores;
        const currentHighestVariableRef = get().highestVariableRef;
        for (const logic of jumpLogic) {
          const conditionMet = evaluateAndConditions(
            logic.conditions,
            currentAnswers,
            currentVariableScores,
            currentHighestVariableRef
          );
          if (conditionMet) {
            if (isCustomUrl(logic.destinationRef)) {
              const url = logic.destinationRef.split(":").slice(1).join(":");
              if (isUrlValid(url)) {
                return logic.destinationRef;
              } else {
                const { questions: questions2, results: results2 } = get();
                return getFallbackDestination(question, questions2, results2);
              }
            }
            const nextPage = get().getQuestionByQuestionRef(logic.destinationRef) || get().getResultByResultRef(logic.destinationRef);
            if (nextPage) {
              return nextPage;
            } else {
              console.warn(
                `[getNext] Jump logic target page not found: ${logic.destinationRef}. Skipping this jump rule.`
              );
            }
          }
        }
        const defaultDestinationRef = (_b = question.logic) == null ? void 0 : _b.defaultDestinationRef;
        if (isCustomUrl(defaultDestinationRef)) {
          const url = defaultDestinationRef.split(":").slice(1).join(":");
          if (isUrlValid(url)) {
            return defaultDestinationRef;
          } else {
            const { questions: questions2, results: results2 } = get();
            return getFallbackDestination(question, questions2, results2);
          }
        }
        if (defaultDestinationRef === "next") {
          const { questions: questions2, results: results2 } = get();
          return getFallbackDestination(question, questions2, results2);
        }
        if (defaultDestinationRef) {
          const nextPage = get().getQuestionByQuestionRef(defaultDestinationRef) || get().getResultByResultRef(defaultDestinationRef);
          if (nextPage) {
            return nextPage;
          } else {
            console.warn(
              `[getNext] Default Destination Ref (${defaultDestinationRef}) not found. Falling back to sequential.`
            );
          }
        }
        const { questions, results } = get();
        return getFallbackDestination(question, questions, results);
      } else if (lookup.isResult(question.ref)) {
        return null;
      } else {
        console.error(
          `[getNext] Unexpected current page ref: ${question.ref} (not found in questions or results)`
        );
        return null;
      }
    },
    previous: () => {
      const { rendererInstanceId, rendererType } = get();
      if (rendererInstanceId) {
        postQuizRendererMessage({
          targetWindow: window.self,
          instanceId: rendererInstanceId,
          rendererType,
          type: "previousQuestion"
        });
      }
      set2(
        produce((draft) => {
          draft.direction = "backward";
          const pageLeaving = draft.currentQuizPage;
          const lookup = getRefLookup(get);
          if (get().inBuilder) {
            if (draft.quizNavigationPastStatesInBuilder.length === 0) {
              return;
            }
            if (pageLeaving && lookup.isQuestion(pageLeaving.ref)) {
              resetAnswersForQuestion(pageLeaving.ref, draft, get);
            }
            const previousItem = draft.quizNavigationPastStatesInBuilder[draft.quizNavigationPastStatesInBuilder.length - 1];
            draft.quizNavigationPastStatesInBuilder.pop();
            draft.quizNavigationFutureStatesInBuilder.unshift(pageLeaving);
            syncBuilderSelectionToPageDraft(draft, previousItem, lookup);
            draft.currentQuizPage = previousItem;
          } else {
            if (draft.quizNavigationPastStates.length === 0) {
              return;
            }
            if (pageLeaving && lookup.isQuestion(pageLeaving.ref)) {
              resetAnswersForQuestion(pageLeaving.ref, draft, get);
            }
            const previousItem = draft.quizNavigationPastStates[draft.quizNavigationPastStates.length - 1];
            draft.quizNavigationPastStates.pop();
            draft.quizNavigationFutureStates.unshift(pageLeaving);
            draft.currentQuizPage = previousItem;
          }
          const { variableScores, highestVariableRef } = calculateVariableScores(
            get().questions,
            draft.answers
          );
          draft.variableScores = variableScores;
          draft.highestVariableRef = highestVariableRef;
        })
      );
    },
    getAnswersByBlockRef: (blockRef) => {
      const question = get().getQuestionByQuestionBlockRef(blockRef);
      if (!question) {
        console.log(`Question not found for block ref: ${blockRef}`);
        return [];
      }
      const answers = get().answers.filter(
        (a) => question.blocks.map((b) => b.ref).includes(a.blockRef)
      );
      return answers;
    },
    getAnswerByBlockRef: (blockRef) => {
      const answer = get().answers.find((a) => a.blockRef === blockRef);
      if (!answer) {
        console.log(`Answer not found for block ref: ${blockRef}`);
        return void 0;
      }
      return answer;
    },
    isQuestionAnswered: (questionRef) => {
      const question = get().questions.find((q2) => q2.ref === questionRef);
      if (!question) return false;
      const questionAnswers = get().answers.filter(
        (answer) => question.blocks.some((block) => block.ref === answer.blockRef)
      );
      return questionAnswers.every((answer) => answer.isValid);
    },
    calculateVariableScores: (answers) => {
      const { variableScores, highestVariableRef } = calculateVariableScores(
        get().questions,
        answers ?? get().answers
      );
      set2({ variableScores, highestVariableRef });
    },
    setShowQuestions: (showQuestions) => {
      set2({ showQuestions });
    },
    setIsRedirectInProgress: (isRedirectInProgress) => {
      set2({ isRedirectInProgress });
    },
    retakeQuiz: () => {
      const { rendererInstanceId, rendererType, preferences } = get();
      const preservedAnswers = preferences.prefillOnRetake ? get().answers.filter(
        (answer) => answer.value || answer.choicesRefs && answer.choicesRefs.length > 0
      ) : [];
      get().initializeAnswers();
      if (preservedAnswers.length > 0) {
        set2({
          answers: get().answers.map((answer) => {
            const preserved = preservedAnswers.find((p2) => p2.blockRef === answer.blockRef);
            if (preserved) {
              const hasValue = Boolean(preserved.value);
              const hasChoices = preserved.choicesRefs && preserved.choicesRefs.length > 0;
              if (hasValue || hasChoices) {
                return {
                  ...answer,
                  value: preserved.value,
                  choicesRefs: preserved.choicesRefs,
                  isValid: true
                };
              }
            }
            return answer;
          })
        });
      }
      get().setCurrentQuizPage(get().questions[0]);
      get().cleanNavigationHistory();
      get().setResponseId("");
      get().setShowQuestions(true);
      get().setIsRedirectInProgress(false);
      set2({ visibleSectionsRefs: [], recommendations: {} });
      if (rendererInstanceId) {
        postQuizRendererMessage({
          targetWindow: window.self,
          instanceId: rendererInstanceId,
          rendererType,
          type: "scrollToTop"
        });
      }
    },
    // Hash navigation methods implementation
    navigateToQuestionByRef: (questionRef) => {
      const question = get().getQuestionByQuestionRef(questionRef);
      if (!question) {
        console.warn(`[navigateToQuestionByRef] Question not found: ${questionRef}`);
        return false;
      }
      const { inBuilder, selectQuestion } = get();
      if (inBuilder) {
        selectQuestion(questionRef);
      } else {
        set2({ currentQuizPage: question, showQuestions: true });
      }
      return true;
    },
    navigateToResultByRef: (resultRef) => {
      const result2 = get().getResultByResultRef(resultRef);
      if (!result2) {
        console.warn(`[navigateToResultByRef] Result not found: ${resultRef}`);
        return false;
      }
      const { inBuilder, selectResult } = get();
      if (inBuilder) {
        selectResult(resultRef);
      } else {
        set2({ currentQuizPage: result2, showQuestions: false });
      }
      return true;
    },
    navigateToElementParent: (elementRef) => {
      const state = get();
      const lookup = getRefLookup(get);
      if (lookup.isQuestion(elementRef)) {
        const success = state.navigateToQuestionByRef(elementRef);
        return {
          success,
          parentType: success ? "question" : null,
          parentRef: success ? elementRef : null
        };
      }
      if (lookup.isResult(elementRef)) {
        const success = state.navigateToResultByRef(elementRef);
        return {
          success,
          parentType: success ? "result" : null,
          parentRef: success ? elementRef : null
        };
      }
      const parentRef = lookup.findParentRef(elementRef);
      if (!parentRef) {
        console.warn(`[navigateToElementParent] Element not found: ${elementRef}`);
        return { success: false, parentType: null, parentRef: null };
      }
      if (lookup.isQuestion(parentRef)) {
        const success = state.navigateToQuestionByRef(parentRef);
        return {
          success,
          parentType: success ? "question" : null,
          parentRef: success ? parentRef : null
        };
      }
      if (lookup.isResult(parentRef)) {
        const success = state.navigateToResultByRef(parentRef);
        return {
          success,
          parentType: success ? "result" : null,
          parentRef: success ? parentRef : null
        };
      }
      console.warn(`[navigateToElementParent] Parent type unknown for: ${elementRef}`);
      return { success: false, parentType: null, parentRef: null };
    },
    getCurrentNavigationState: () => {
      const state = get();
      const canGoBack = state.inBuilder ? state.quizNavigationPastStatesInBuilder.length > 0 : state.quizNavigationPastStates.length > 0;
      const canGoForward = state.inBuilder ? state.quizNavigationFutureStatesInBuilder.length > 0 : state.quizNavigationFutureStates.length > 0;
      return {
        currentPage: state.currentQuizPage,
        inBuilder: state.inBuilder,
        canGoBack,
        canGoForward
      };
    }
  };
};
const DESIGN_FONTS = {
  inherit: { label: "Inherit", value: "inherit" },
  "sans-serif": { label: "Sans-serif", value: "sans-serif" },
  serif: { label: "Serif", value: "serif" },
  cursive: { label: "Cursive", value: "cursive" },
  monospace: { label: "Monospace", value: "monospace" },
  fantasy: { label: "Fantasy", value: "fantasy" },
  georgia: { label: "Georgia", value: "Georgia" },
  "open-sans": { label: "Open Sans", value: "Open Sans" },
  roboto: { label: "Roboto", value: "Roboto" },
  lato: { label: "Lato", value: "Lato" },
  "source-sans-pro": { label: "Source Sans Pro", value: "Source Sans Pro" },
  montserrat: { label: "Montserrat", value: "Montserrat" },
  "pt-sans": { label: "PT Sans", value: "PT Sans" },
  raleway: { label: "Raleway", value: "Raleway" },
  lora: { label: "Lora", value: "Lora" },
  karla: { label: "Karla", value: "Karla" },
  ubuntu: { label: "Ubuntu", value: "Ubuntu" },
  poppins: { label: "Poppins", value: "Poppins" },
  "alegreya-sans": { label: "Alegreya Sans", value: "Alegreya Sans" },
  lobster: { label: "Lobster", value: "Lobster" },
  inconsolata: { label: "Inconsolata", value: "Inconsolata" },
  "eb-garamond": { label: "EB Garamond", value: "EB Garamond" },
  "libre-baskerville": { label: "Libre Baskerville", value: "Libre Baskerville" },
  "crimson-text": { label: "Crimson Text", value: "Crimson Text" },
  barrio: { label: "Barrio", value: "Barrio" },
  inter: { label: "Inter", value: "Inter" },
  ovo: { label: "Ovo", value: "Ovo" },
  "instrument-sans": { label: "Instrument Sans", value: "Instrument Sans" }
};
const generateHostClass = ({
  questionHeadingColor = "#181212",
  questionTextColor = "#181212",
  linkTextColor = "#181212",
  buttonBackgroundColor = "#333333",
  buttonTextColor = "#ffffff",
  buttonBackgroundColorHover = "#33333350",
  buttonTextColorHover = "#ffffff",
  choiceBackgroundColor = "#dddddd",
  choiceTextColor = "#181212",
  choiceSelectedBackgroundColor = "#cecece",
  choiceSelectedTextColor = "#181212",
  choiceSelectedIconColor = "#b0b0b0",
  inputBackgroundColor = "#ffffff",
  inputBorderColor = "#333333",
  inputTextColor = "#181212",
  inputPlaceholderColor = "#ff0000",
  inputErrorColor = "#ff7777",
  dropdownSelectedBackgroundColor = "#cecece",
  dropdownSelectedTextColor = "#181212",
  navigationBackgroundColor = "#ffffff",
  navigationTextColor = "#181212",
  navigationBorderColor = "#333333",
  navigationProgressBarColor = "#181212",
  quizBackgroundColor = "#ffffff",
  quizBackgroundImage = "",
  quizBackgroundOpacity = 20,
  productCollectionCardBackgroundColor = "#ffffff",
  resultsCardTitleColor = "#181212",
  resultsCardPriceColor = "#181212",
  resultsCardTextColor = "#181212",
  resultsCardStarsColor = "#ffd700",
  productInCartBorderColor = "#333333",
  fontFamily = DESIGN_FONTS.inherit.value,
  fontFamilyHeading = DESIGN_FONTS.inherit.value
}) => {
  return `
  :host {
    /* Colors: Questions and Text */
    --question-heading-color: ${questionHeadingColor};
    --question-text-color: ${questionTextColor};
    --link-text-color: ${linkTextColor};

    /* Colors: Buttons */
    --button-background-color: ${buttonBackgroundColor};
    --button-text-color: ${buttonTextColor};
    --button-background-color-hover: ${buttonBackgroundColorHover};
    --button-text-color-hover: ${buttonTextColorHover};

    /* Colors: Choices and Selection */
    --choice-background-color: ${choiceBackgroundColor};
    --choice-text-color: ${choiceTextColor};
    --choice-selected-background-color: ${choiceSelectedBackgroundColor};
    --choice-selected-text-color: ${choiceSelectedTextColor};
    --choice-selected-icon-color: ${choiceSelectedIconColor};

    /* Colors: Form Inputs */
    --input-background-color: ${inputBackgroundColor};
    --input-border-color: ${inputBorderColor};
    --input-text-color: ${inputTextColor};
    --input-placeholder-color: ${inputPlaceholderColor};
    --input-error-color: ${inputErrorColor};

    /* Colors: Quiz Background */
    --quiz-background-color: ${quizBackgroundColor};
    --quiz-background-image: url(${quizBackgroundImage});
    --quiz-background-opacity: ${(quizBackgroundOpacity || 20) / 100};

    /* Colors: Dropdown and Navigation */
    --dropdown-selected-background-color: ${dropdownSelectedBackgroundColor};
    --dropdown-selected-text-color: ${dropdownSelectedTextColor};
    --navigation-background-color: ${navigationBackgroundColor};
    --navigation-text-color: ${navigationTextColor};
    --navigation-border-color: ${navigationBorderColor};
    --navigation-progress-bar-color: ${navigationProgressBarColor};

    /* Colors: Product Display */
    --product-collection-card-background-color: ${productCollectionCardBackgroundColor};
    --results-card-title-color: ${resultsCardTitleColor};
    --results-card-price-color: ${resultsCardPriceColor};
    --results-card-text-color: ${resultsCardTextColor};
    --results-card-stars-color: ${resultsCardStarsColor};
    --product-in-cart-border-color: ${productInCartBorderColor};

    /* Typography */
    --font-family: ${fontFamily};
    --font-family-heading: ${fontFamilyHeading};
    --heading-font-size-small: 24px;
    --heading-font-size-medium: 32px;
    --heading-font-size-large: 40px;
    --text-font-size-small: 14px;
    --text-font-size-medium: 18px;
    --text-font-size-large: 22px;
    --heading-font-weight-small: 400;
    --heading-font-weight-medium: 500;
    --heading-font-weight-large: 600;

    /* Inspector Theme */
    --inspector-background: #005bd3;
    --inspector-border: #005bd3;
    --inspector-text: white;
    --inspector-hover-border: #005bd3;

    /* Layout */
    --max-content-width: 550px;
    --input-button-height: 48px;
  }
  `;
};
const defaultDesignState = {
  customCSS: "",
  fontFamily: "inherit",
  fontFamilyHeading: "inherit",
  quizBackgroundColor: "#ffffff",
  quizBackgroundImage: "",
  quizBackgroundOpacity: 20,
  questionHeadingColor: "#181212",
  questionTextColor: "#181212",
  linkTextColor: "#181212",
  buttonBackgroundColor: "#333333",
  buttonTextColor: "#ffffff",
  buttonBackgroundColorHover: "#33333350",
  buttonTextColorHover: "#ffffff",
  choiceBackgroundColor: "#dddddd",
  choiceTextColor: "#181212",
  choiceSelectedBackgroundColor: "#cecece",
  choiceSelectedTextColor: "#181212",
  choiceSelectedIconColor: "#b0b0b0",
  inputBackgroundColor: "#ffffff",
  inputBorderColor: "#333333",
  inputTextColor: "#181212",
  inputPlaceholderColor: "#ff0000",
  inputErrorColor: "#ff7777",
  dropdownSelectedBackgroundColor: "#cecece",
  dropdownSelectedTextColor: "#181212",
  navigationBackgroundColor: "#ffffff",
  navigationTextColor: "#181212",
  navigationBorderColor: "#C2C2C2",
  navigationProgressBarColor: "#B7B3B3",
  showNavigationBar: true,
  showProgressPercentage: true,
  arrowsDirection: "left-right",
  productCollectionCardBackgroundColor: "#ffffff",
  resultsCardTitleColor: "#181212",
  resultsCardPriceColor: "#181212",
  resultsCardTextColor: "#181212",
  resultsCardStarsColor: "#ffd700",
  productInCartBorderColor: "#333333"
};
const createDesignStyleRuntimeSlice = (set2, get) => ({
  design: defaultDesignState,
  updateDesign: (design) => set2({ design }),
  updateDesignColorScheme: (colorSchemeId) => {
    (async () => {
      try {
        const { getColorScheme } = await __vitePreload(async () => {
          const { getColorScheme: getColorScheme2 } = await import("./quiz-renderer-color-schemes-DCmeO6sI.js");
          return { getColorScheme: getColorScheme2 };
        }, true ? [] : void 0, import.meta.url);
        const colorScheme = getColorScheme(colorSchemeId);
        if (!colorScheme) return;
        set2((state) => {
          state.design = {
            ...state.design,
            quizBackgroundColor: colorScheme.backgroundColor,
            quizBackgroundOpacity: 100,
            questionHeadingColor: colorScheme.headingColor,
            questionTextColor: colorScheme.textColor,
            linkTextColor: colorScheme.textColor,
            buttonBackgroundColor: colorScheme.buttonBgColor,
            buttonTextColor: colorScheme.buttonTextColor,
            buttonBackgroundColorHover: colorScheme.buttonBgColorHover,
            buttonTextColorHover: colorScheme.buttonTextColorHover,
            choiceBackgroundColor: colorScheme.choiceBgColor,
            choiceTextColor: colorScheme.choiceTextColor,
            choiceSelectedIconColor: colorScheme.choiceSelectedIconColor,
            inputBackgroundColor: colorScheme.inputBackgroundColor,
            inputBorderColor: colorScheme.inputBorderColor,
            inputTextColor: colorScheme.inputTextColor,
            inputPlaceholderColor: colorScheme.inputPlaceholderColor,
            inputErrorColor: colorScheme.inputErrorColor,
            dropdownSelectedBackgroundColor: colorScheme.choiceSelectedBackgroundColor,
            dropdownSelectedTextColor: colorScheme.choiceSelectedTextColor,
            choiceSelectedBackgroundColor: colorScheme.choiceSelectedBackgroundColor,
            choiceSelectedTextColor: colorScheme.choiceSelectedTextColor,
            navigationBackgroundColor: colorScheme.navigationBackgroundColor,
            navigationTextColor: colorScheme.navigationTextColor,
            navigationBorderColor: colorScheme.navigationBorderColor,
            navigationProgressBarColor: colorScheme.navigationProgressBarColor,
            productCollectionCardBackgroundColor: colorScheme.productCollectionCardBackgroundColor,
            resultsCardTitleColor: colorScheme.resultsCardTitleColor,
            resultsCardPriceColor: colorScheme.resultsCardPriceColor,
            resultsCardTextColor: colorScheme.resultsCardTextColor,
            resultsCardStarsColor: colorScheme.resultsCardStarsColor,
            productInCartBorderColor: colorScheme.productInCartBorderColor
          };
        });
      } catch (e) {
        console.error("Failed to load color scheme palette:", e);
      }
    })();
  },
  getPlainCssFromDesign: () => {
    return generateHostClass({
      questionHeadingColor: get().design.questionHeadingColor,
      questionTextColor: get().design.questionTextColor,
      linkTextColor: get().design.linkTextColor,
      buttonBackgroundColor: get().design.buttonBackgroundColor,
      buttonTextColor: get().design.buttonTextColor,
      buttonBackgroundColorHover: get().design.buttonBackgroundColorHover,
      buttonTextColorHover: get().design.buttonTextColorHover,
      choiceBackgroundColor: get().design.choiceBackgroundColor,
      choiceTextColor: get().design.choiceTextColor,
      choiceSelectedBackgroundColor: get().design.choiceSelectedBackgroundColor,
      choiceSelectedTextColor: get().design.choiceSelectedTextColor,
      choiceSelectedIconColor: get().design.choiceSelectedIconColor,
      inputBackgroundColor: get().design.inputBackgroundColor,
      inputBorderColor: get().design.inputBorderColor,
      inputTextColor: get().design.inputTextColor,
      inputPlaceholderColor: get().design.inputPlaceholderColor,
      inputErrorColor: get().design.inputErrorColor,
      dropdownSelectedBackgroundColor: get().design.dropdownSelectedBackgroundColor,
      dropdownSelectedTextColor: get().design.dropdownSelectedTextColor,
      quizBackgroundColor: get().design.quizBackgroundColor,
      quizBackgroundImage: get().design.quizBackgroundImage,
      quizBackgroundOpacity: get().design.quizBackgroundOpacity,
      fontFamily: get().design.fontFamily,
      fontFamilyHeading: get().design.fontFamilyHeading,
      navigationBackgroundColor: get().design.navigationBackgroundColor,
      navigationTextColor: get().design.navigationTextColor,
      navigationBorderColor: get().design.navigationBorderColor,
      navigationProgressBarColor: get().design.navigationProgressBarColor,
      productCollectionCardBackgroundColor: get().design.productCollectionCardBackgroundColor,
      resultsCardTitleColor: get().design.resultsCardTitleColor,
      resultsCardPriceColor: get().design.resultsCardPriceColor,
      resultsCardTextColor: get().design.resultsCardTextColor,
      resultsCardStarsColor: get().design.resultsCardStarsColor,
      productInCartBorderColor: get().design.productInCartBorderColor
    }) + get().design.customCSS;
  }
});
const createQuizDisplayConfigSlice = (set2) => ({
  isModalLink: false,
  isInlineQuiz: false,
  quizInlineHeightEnabled: false,
  isStoreRenderer: false,
  executeCustomFeatures: true,
  // Default to true - allow custom features unless explicitly blocked
  rendererInstanceId: "",
  rendererType: "modal",
  myshopifyDomain: void 0,
  quizModalHeight: 800,
  quizInlineHeight: 800,
  quizInlineHeightUnit: "px",
  setIsModalLink: (isModalLink) => set2({ isModalLink }),
  setIsInlineQuiz: (isInlineQuiz) => set2({ isInlineQuiz }),
  setQuizModalHeight: (quizModalHeight) => set2({ quizModalHeight }),
  setQuizInlineHeight: (quizInlineHeight) => set2({ quizInlineHeight }),
  setQuizInlineHeightUnit: (quizInlineHeightUnit) => set2({ quizInlineHeightUnit }),
  setQuizInlineHeightEnabled: (quizInlineHeightEnabled) => set2({ quizInlineHeightEnabled }),
  setIsStoreRenderer: (isStoreRenderer) => set2({ isStoreRenderer }),
  setExecuteCustomFeatures: (executeCustomFeatures) => set2({ executeCustomFeatures })
});
const createContentSlice = (set2, get) => ({
  content: {},
  selectedLocale: "en",
  defaultLocale: "en",
  updateContent: (content) => {
    set2((state) => {
      state.content = content;
    });
  },
  getTranslatedContent({ key, values = {} }) {
    var _a, _b;
    const template = (_b = (_a = get().content) == null ? void 0 : _a[key]) == null ? void 0 : _b.value;
    if (!template || typeof template !== "string") {
      return key;
    }
    if (Object.keys(values).length <= 0) {
      return template;
    }
    return template.replace(/{{(.*?)}}/g, (match, prop) => {
      const value = values[prop.trim()];
      return value !== void 0 ? value.toString() || "" : "";
    });
  },
  setContentValue: (key, contentValue) => {
    set2((state) => {
      state.content[key] = contentValue;
    });
  },
  setSelectedLocale: (locale) => {
    set2((state) => {
      state.selectedLocale = locale;
    });
  },
  getContentValue: (key) => {
    var _a;
    return ((_a = get().content[key]) == null ? void 0 : _a.value) || "";
  },
  getContentByType: (category) => {
    const content = get().content;
    const filteredContentByType = Object.entries(content).reduce((acc, [key, value]) => {
      if (value && typeof value === "object" && "category" in value && value.category === category) {
        acc[key] = value;
      }
      return acc;
    }, {});
    return filteredContentByType;
  }
});
const createSubscriptionSlice = (set2, get) => ({
  subscriptionSelections: {},
  setSubscriptionSelection: (variantId, selection) => {
    set2((state) => {
      state.subscriptionSelections[variantId] = selection;
    });
  },
  getSubscriptionSelection: (variantId) => {
    return get().subscriptionSelections[variantId] || null;
  }
});
const createResultsRuntimeSlice = (set2, get) => ({
  results: [],
  cartItems: [],
  slotItems: {},
  addMultipleItemsToCart: (items) => {
    set2((state) => ({ cartItems: [...state.cartItems, ...items] }));
  },
  setCartItems: (items) => {
    set2({ cartItems: items });
  },
  addToCart: (variantId, quantity, price, currency, sellingPlanId) => {
    if (!variantId) return;
    set2((state) => ({
      cartItems: [
        ...state.cartItems,
        { variantId, quantity, price, currency, sellingPlanId: sellingPlanId ?? void 0 }
      ]
    }));
  },
  removeFromCart: (variantId) => {
    if (!variantId) return;
    set2((state) => ({ cartItems: state.cartItems.filter((i) => i.variantId !== variantId) }));
  },
  addVariantQuantity: (variantId) => {
    if (!variantId) return;
    set2((state) => ({
      cartItems: state.cartItems.map(
        (i) => i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
      )
    }));
  },
  removeVariantQuantity: (variantId) => {
    if (!variantId) return;
    const item = get().cartItems.find((i) => i.variantId === variantId);
    if (!item) return;
    if (item.quantity <= 1) {
      get().removeFromCart(variantId);
      return;
    }
    set2((state) => ({
      cartItems: state.cartItems.map(
        (i) => i.variantId === variantId ? { ...i, quantity: i.quantity - 1 } : i
      )
    }));
  },
  updateResults: (results) => {
    set2({ results });
  },
  setSlotItems: (slotItems) => set2({ slotItems }),
  getResultByResultRef: (resultRef) => {
    const results = get().results;
    return results.find((r2) => r2.ref === resultRef) || null;
  },
  getResultTitle: (resultRef) => {
    var _a;
    const r2 = get().results.find((res) => res.ref === resultRef);
    if (!r2) {
      console.warn(`getResultTitle: result not found for ref ${resultRef}`);
      return "";
    }
    return ((_a = r2 == null ? void 0 : r2.preferences) == null ? void 0 : _a.name) || "";
  }
});
const replaceHtmlTags = (html) => {
  if (html === void 0) throw new Error("Content is required");
  const regex = /<[^>]*>/g;
  const dynamicRegex = /<dynamic[\s\S]*?<\/dynamic>/g;
  const htmlWithoutDynamic = html.replace(dynamicRegex, "_ _ _");
  return htmlWithoutDynamic.replace(regex, "");
};
const createQuestionRuntimeSlice = (set2, get) => ({
  questions: [],
  updateQuestions: (questions) => {
    set2({ questions });
  },
  getQuestionByQuestionRef: (questionRef) => {
    const questions = get().questions;
    return questions.find((q2) => q2.ref === questionRef) || null;
  },
  getQuestionBlockByQuestionBlockRef: (blockRef) => {
    const questions = get().questions;
    const question = questions.find((q2) => q2.blocks.some((b) => b.ref === blockRef));
    const block = (question == null ? void 0 : question.blocks.find((b) => b.ref === blockRef)) || null;
    return block || null;
  },
  getQuestionByQuestionBlockRef: (blockRef) => {
    const questions = get().questions;
    const question = questions.find((q2) => q2.blocks.some((b) => b.ref === blockRef));
    return question || null;
  },
  getSelectedQuestion: () => null,
  getQuestionTitle: (questionRef) => {
    const questions = get().questions;
    const question = questions.find((q2) => q2.ref === questionRef);
    if (!question) {
      console.warn("getQuestionTitle: question not found", { questionRef });
      return "";
    }
    const index2 = questions.findIndex((q2) => q2.ref === questionRef);
    const questionBlock = question.blocks.find(
      (block) => (block.type === BlockType.HEADING || block.type === BlockType.TEXT) && "content" in block.preferences && block.preferences.content !== "<p><br></p>"
    );
    const title = (questionBlock == null ? void 0 : questionBlock.preferences) && "content" in questionBlock.preferences ? replaceHtmlTags(questionBlock.preferences.content) : "...";
    return `Q${index2 + 1}: ${title}`;
  }
});
const isQuotaExceededError = (error) => {
  return error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED" || // Firefox
  error.code === 22);
};
const quotaWarningsShown = /* @__PURE__ */ new Set();
const warnQuotaExceededOnce = (prefix, key) => {
  if (quotaWarningsShown.has(key)) {
    return false;
  }
  quotaWarningsShown.add(key);
  console.warn(`${prefix} localStorage quota exceeded for "${key}", skipping persistence`);
  return true;
};
const clearQuotaWarning = (key) => {
  quotaWarningsShown.delete(key);
};
const getQuizCacheKeys = (excludeKey) => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key !== excludeKey) {
      if (key.startsWith("revenuehunt-") || key === "quizCache") {
        keys.push(key);
      }
    }
  }
  return keys;
};
const getCacheTimestamp = (key) => {
  var _a;
  try {
    const value = localStorage.getItem(key);
    if (!value) return 0;
    const parsed = JSON.parse(value);
    return ((_a = parsed == null ? void 0 : parsed.state) == null ? void 0 : _a.timestamp) || 0;
  } catch {
    return 0;
  }
};
const ONE_DAY_MS = 24 * 60 * 60 * 1e3;
const clearQuizCaches = (excludeKey, aggressive) => {
  const keys = getQuizCacheKeys(excludeKey);
  if (keys.length === 0) return false;
  const now = Date.now();
  let clearedAny = false;
  for (const key of keys) {
    const timestamp = getCacheTimestamp(key);
    const isStale = timestamp > 0 && now - timestamp > ONE_DAY_MS;
    if (isStale || aggressive) {
      try {
        localStorage.removeItem(key);
        clearedAny = true;
      } catch {
      }
    }
  }
  return clearedAny;
};
const MAIN_BUILDER_CACHE_KEY = "revenuehunt-revenuehunt-app";
const SETTINGS_DRAFT_ROUTE_SEGMENTS = /* @__PURE__ */ new Set([
  "content",
  "email-to-respondents",
  "email-to-self",
  "general",
  "integrations"
]);
const PERSIST_WRITER_ID = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const PERSIST_WRITER_CREATED_AT = Date.now();
const getWriterMeta = () => ({
  writerId: PERSIST_WRITER_ID,
  writerCreatedAt: PERSIST_WRITER_CREATED_AT
});
const isQuizDraftRoute = () => {
  if (typeof window === "undefined") return true;
  const pathname = window.location.pathname;
  if (/(^|\/)quizzes\/[^/]+\/?$/.test(pathname)) return true;
  const settingsMatch = pathname.match(/(^|\/)quizzes\/settings\/[^/]+\/([^/?#]+)\/?$/);
  return settingsMatch ? SETTINGS_DRAFT_ROUTE_SEGMENTS.has(settingsMatch[2]) : false;
};
const shouldSkipMainBuilderCacheWrite = (name) => name === MAIN_BUILDER_CACHE_KEY && !isQuizDraftRoute();
const shouldSkipStaleCrossContextWrite = (name, nextState) => {
  var _a;
  try {
    const existingValue = localStorage.getItem(name);
    if (!existingValue) return false;
    const existing = JSON.parse(existingValue);
    const existingState = existing.state;
    const existingTimestamp = (existingState == null ? void 0 : existingState.timestamp) || 0;
    const existingWriterId = (_a = existing.meta) == null ? void 0 : _a.writerId;
    if (!(nextState == null ? void 0 : nextState.id) || (existingState == null ? void 0 : existingState.id) !== nextState.id) return false;
    if (!existingTimestamp || existingTimestamp <= PERSIST_WRITER_CREATED_AT) return false;
    if (!existingWriterId || existingWriterId === PERSIST_WRITER_ID) return false;
    return true;
  } catch {
    return false;
  }
};
const mergePersistedQuizState = (persistedState, currentState) => ({
  ...currentState,
  ...persistedState,
  runsMerchantCode: currentState.runsMerchantCode
});
const partializePersistFunction = (state) => {
  const {
    answers,
    content,
    currentQuizPage,
    design,
    id: id2,
    name,
    closedQuestions,
    closedResults,
    closedSections,
    preferences,
    questions,
    quizNavigationFutureStates,
    quizNavigationPastStates,
    responseId,
    results,
    notifications,
    recommendations,
    integrations,
    databaseTimestamp,
    ignoredChecks
  } = state;
  return {
    answers,
    content,
    currentQuizPage,
    design,
    id: id2,
    name,
    closedQuestions,
    closedResults,
    closedSections,
    preferences,
    questions,
    quizNavigationFutureStates,
    quizNavigationPastStates,
    responseId,
    results,
    notifications,
    recommendations,
    integrations,
    databaseTimestamp,
    ignoredChecks
  };
};
const persistStorage = {
  getItem: async (name) => {
    try {
      return localStorage.getItem(name) || null;
    } catch {
      return null;
    }
  },
  setItem: async (name, value) => {
    var _a;
    if (shouldSkipMainBuilderCacheWrite(name)) {
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch {
      return;
    }
    if (!((_a = parsed.state) == null ? void 0 : _a.id) || shouldSkipStaleCrossContextWrite(name, parsed.state)) {
      return;
    }
    const valueWithTimestamp = {
      ...parsed,
      state: { ...parsed.state, timestamp: Date.now() },
      meta: getWriterMeta()
    };
    const dataToStore = JSON.stringify(valueWithTimestamp);
    const recoverySteps = [false, true];
    for (let attempt = 0; attempt <= recoverySteps.length; attempt++) {
      try {
        localStorage.setItem(name, dataToStore);
        clearQuotaWarning(name);
        return;
      } catch (error) {
        if (!isQuotaExceededError(error)) {
          console.error("[PersistStorage] Unexpected storage error:", error);
          return;
        }
        if (attempt < recoverySteps.length) {
          clearQuizCaches(name, recoverySteps[attempt]);
        } else {
          warnQuotaExceededOnce("[PersistStorage]", name);
          return;
        }
      }
    }
  },
  removeItem: async (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
    }
  }
};
const createQuizPublicSlice = (set2, get) => ({
  id: "",
  name: "",
  quizHandle: "",
  databaseTimestamp: Date.now(),
  timestamp: Date.now(),
  // Runtime flags
  runsMerchantCode: false,
  inBuilder: false,
  isStoreRenderer: true,
  executeCustomFeatures: true,
  // Result context (for response payload)
  responseLoaded: false,
  resultRef: "",
  storefrontAccessToken: "",
  domain: "",
  previewCountry: "",
  previewLocale: "",
  // Public preferences set via quizPublicSchema
  preferences: {},
  setQuiz: (quiz, options2 = { inBuilder: false }) => {
    const { results, questions, design, content, id: id2, preferences, ...rest } = quiz;
    if ("runsMerchantCode" in rest) delete rest.runsMerchantCode;
    get().updateResults(results);
    get().updateQuestions(questions);
    get().updateDesign(design);
    get().updateContent(content);
    get().setSelectedLocale(preferences.language);
    if (id2 === "") {
      set2({ ...rest, preferences, inBuilder: options2.inBuilder });
    } else {
      set2({ ...rest, preferences, id: id2, inBuilder: options2.inBuilder });
    }
  },
  setResponsePayload: (responsePayload) => {
    const { quiz, ...restResponsePayload } = responsePayload;
    if ("runsMerchantCode" in restResponsePayload) delete restResponsePayload.runsMerchantCode;
    const { results, questions, design, content, id: id2, preferences } = quiz;
    get().updateResults(results);
    get().updateQuestions(questions);
    get().updateDesign(design);
    get().updateContent(content);
    set2({ ...restResponsePayload });
    set2({
      id: id2,
      preferences,
      inBuilder: false,
      responseLoaded: true,
      showQuestions: false
    });
    get().setResponse(responsePayload);
  },
  setQuizHandle: (quizHandle) => set2({ quizHandle }),
  setPreviewCountry: (countryCode) => set2({ previewCountry: countryCode ? countryCode.toUpperCase() : "" }),
  setPreviewLocale: (locale) => set2({ previewLocale: locale ? locale.toUpperCase().replace("-", "_") : "" })
});
const createIsolatedQuizPublicStore = (handle, initialState) => {
  const config = immer((...a) => ({
    // Quiz core + content/design
    ...createQuizPublicSlice(...a),
    ...createDesignStyleRuntimeSlice(...a),
    ...createQuizDisplayConfigSlice(...a),
    ...createContentSlice(...a),
    // Runtime slices (renderer-only)
    ...createSubscriptionSlice(...a),
    ...createResultsRuntimeSlice(...a),
    ...createQuestionRuntimeSlice(...a),
    ...createQuizNavigationSlice(...a)
  }));
  const store = create$1(
    subscribeWithSelector(
      persist(config, {
        name: `revenuehunt-${handle}`,
        storage: createJSONStorage(() => persistStorage),
        partialize: partializePersistFunction,
        merge: mergePersistedQuizState,
        skipHydration: true
      })
    )
  );
  if (initialState) store.setState(initialState);
  return store;
};
const QuizStoreContext = reactExports.createContext(null);
const useQuizStore = (selector) => {
  const quizStoreContext = reactExports.useContext(QuizStoreContext);
  if (!quizStoreContext) {
    throw new Error(`useQuizStore must be used within StoreProvider`);
  }
  return useStore(quizStoreContext, selector);
};
const useQuizStoreApi = () => {
  const quizStoreContext = reactExports.useContext(QuizStoreContext);
  if (!quizStoreContext) {
    throw new Error(`useQuizStoreApi must be used within StoreProvider`);
  }
  return quizStoreContext;
};
const RendererStoreProvider = ({
  handle,
  children,
  initialState
}) => {
  const storeRef = reactExports.useRef(null);
  if (storeRef.current === null) {
    storeRef.current = createIsolatedQuizPublicStore(handle, initialState);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QuizStoreContext.Provider, { value: storeRef.current, children });
};
function r(e) {
  var t2, f2, n2 = "";
  if ("string" == typeof e || "number" == typeof e) n2 += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t2 = 0; t2 < o; t2++) e[t2] && (f2 = r(e[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e) e[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e, t2, f2 = 0, n2 = "", o = arguments.length; f2 < o; f2++) (e = arguments[f2]) && (t2 = r(e)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
const quizStylesUrl = "" + new URL("quiz-renderer.css", import.meta.url).href;
function useWindowResizeFromShadowDom({
  shadowRoot,
  quizPreview
}) {
  const [size, setSize] = reactExports.useState([0, 0]);
  reactExports.useEffect(() => {
    if (!shadowRoot) {
      return;
    }
    function updateSize() {
      const host = shadowRoot == null ? void 0 : shadowRoot.host;
      setSize([host.offsetWidth, host.offsetHeight]);
    }
    shadowRoot.addEventListener("resize", updateSize);
    updateSize();
    return () => shadowRoot.removeEventListener("resize", updateSize);
  }, [shadowRoot == null ? void 0 : shadowRoot.host, quizPreview]);
  return size;
}
const RTL_LANG_PREFIXES = ["ar", "he", "fa", "ur", "ps", "ku"];
function useLanguageDirection() {
  const language = useQuizStore((state) => {
    var _a;
    return ((_a = state.preferences) == null ? void 0 : _a.language) ?? "en";
  });
  const isRtl = RTL_LANG_PREFIXES.some(
    (prefix) => (language || "").toLowerCase().startsWith(prefix)
  );
  return isRtl ? "rtl" : "ltr";
}
const LEGACY_LANGUAGE_TAGS = { dev: "de", frv: "fr", al: "sq" };
function toQuizLanguageTag(language) {
  if (!language) return void 0;
  const tag = (LEGACY_LANGUAGE_TAGS[language.toLowerCase()] ?? language).replaceAll("_", "-");
  return tag.toLowerCase() === "en" ? void 0 : tag;
}
function useQuizLanguageTag() {
  const language = useQuizStore((state) => {
    var _a;
    return (_a = state.preferences) == null ? void 0 : _a.language;
  });
  return toQuizLanguageTag(language);
}
const preloadedQuestionBlocks = /* @__PURE__ */ new Set();
const preloadedResultBlocks = /* @__PURE__ */ new Set();
const preloadQuestionBlocks = (questions) => {
  const usedBlockTypes = /* @__PURE__ */ new Set();
  let hasMultiSelectDropdown = false;
  questions.forEach((question) => {
    question.blocks.forEach((block) => {
      usedBlockTypes.add(block.type);
      if (block.type === BlockType.CHOICE) {
        const choiceBlock = block;
        if (choiceBlock.preferences.type === ChoiceType.DROPDOWN_CHOICE) {
          if ("multipleSelection" in choiceBlock.preferences && choiceBlock.preferences.multipleSelection) {
            hasMultiSelectDropdown = true;
          }
        }
      }
    });
  });
  if (hasMultiSelectDropdown && !preloadedQuestionBlocks.has("dropdown")) {
    preloadedQuestionBlocks.add("dropdown");
    __vitePreload(() => import("./quiz-renderer-dropdown-DufWh-qn.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0, import.meta.url).catch(
      (err) => console.error("Failed to preload dropdown:", err)
    );
  }
  if (hasMultiSelectDropdown && !preloadedQuestionBlocks.has("react-dropdown-select")) {
    preloadedQuestionBlocks.add("react-dropdown-select");
    __vitePreload(() => import("./quiz-renderer-react-dropdown-select-C_fZ-ugW.js"), true ? __vite__mapDeps([10,2,3,4,5,6,1,7,8,9]) : void 0, import.meta.url).catch(
      (err) => console.error("Failed to preload react-dropdown-select:", err)
    );
  }
  usedBlockTypes.forEach((blockType) => {
    if (preloadedQuestionBlocks.has(blockType)) {
      return;
    }
    preloadedQuestionBlocks.add(blockType);
    switch (blockType) {
      case BlockType.PHONE:
        __vitePreload(() => import("./quiz-renderer-phone-block-YVbQwkKf.js"), true ? __vite__mapDeps([11,1,9,4,5,6,7,8]) : void 0, import.meta.url).catch(
          (err) => console.error("Failed to preload phone block:", err)
        );
        break;
      case BlockType.GAUGE_CHART:
      case BlockType.RADAR_CHART:
      case BlockType.BAR_CHART:
      case BlockType.CUSTOM_CHART:
      case BlockType.RATING_CHART:
        if (!preloadedQuestionBlocks.has(BlockType.GAUGE_CHART)) {
          preloadedQuestionBlocks.add(BlockType.GAUGE_CHART);
          preloadedQuestionBlocks.add(BlockType.RADAR_CHART);
          preloadedQuestionBlocks.add(BlockType.BAR_CHART);
          preloadedQuestionBlocks.add(BlockType.CUSTOM_CHART);
          preloadedQuestionBlocks.add(BlockType.RATING_CHART);
          __vitePreload(() => import("./quiz-renderer-index-1sobdtHv.js").then((n2) => n2.questionChartBlock), true ? __vite__mapDeps([12,1,5,13]) : void 0, import.meta.url).catch((err) => console.error("Failed to preload chart block:", err));
        }
        break;
    }
  });
};
const preloadResultBlocks = (results) => {
  const usedBlockTypes = /* @__PURE__ */ new Set();
  results.forEach((result2) => {
    result2.sections.forEach((section) => {
      section.blocks.forEach((block) => {
        usedBlockTypes.add(block.type);
      });
    });
  });
  usedBlockTypes.forEach((blockType) => {
    if (preloadedResultBlocks.has(blockType)) {
      return;
    }
    preloadedResultBlocks.add(blockType);
    switch (blockType) {
      case ResultBlockType.BAR_CHART:
      case ResultBlockType.RADAR_CHART:
      case ResultBlockType.GAUGE_CHART:
      case ResultBlockType.CUSTOM_CHART:
        if (!preloadedResultBlocks.has(ResultBlockType.BAR_CHART)) {
          preloadedResultBlocks.add(ResultBlockType.BAR_CHART);
          preloadedResultBlocks.add(ResultBlockType.RADAR_CHART);
          preloadedResultBlocks.add(ResultBlockType.GAUGE_CHART);
          preloadedResultBlocks.add(ResultBlockType.CUSTOM_CHART);
          __vitePreload(() => import("./quiz-renderer-chart-result-block-Bv24ds-4.js"), true ? __vite__mapDeps([14,1,15,16,13,4,5,6,7,8,9]) : void 0, import.meta.url).catch(
            (err) => console.error("Failed to preload result chart block:", err)
          );
        }
        break;
      case ResultBlockType.RATING_CHART:
        __vitePreload(() => import("./quiz-renderer-rating-block-DgJgPmrE.js"), true ? __vite__mapDeps([17,16,18,4,5,6,1,7,8,9]) : void 0, import.meta.url).catch(
          (err) => console.error("Failed to preload result rating block:", err)
        );
        break;
    }
  });
};
const preloadResultsPage = () => {
  __vitePreload(() => import("./quiz-renderer-result-preview-7PYqPT8-.js"), true ? __vite__mapDeps([19,8,1,6,7,20,3,2,5,21,22,23,24,4,9]) : void 0, import.meta.url).catch(
    (err) => console.error("Failed to preload results page:", err)
  );
};
const preloadedImages = /* @__PURE__ */ new Set();
const preloadQuestionImages = (questions) => {
  const imageUrls = /* @__PURE__ */ new Set();
  questions.forEach((question) => {
    if ("imageUrl" in question.preferences && question.preferences.imageUrl) {
      imageUrls.add(question.preferences.imageUrl);
    }
    question.blocks.forEach((block) => {
      if (block.type === BlockType.IMAGE) {
        const imageBlock = block;
        if (imageBlock.preferences.imageUrl) {
          imageUrls.add(imageBlock.preferences.imageUrl);
        }
      }
      if (block.type === BlockType.CHOICE) {
        const choiceBlock = block;
        if (choiceBlock.preferences.type === ChoiceType.PICTURE_CHOICE) {
          const picturePrefs = choiceBlock.preferences;
          picturePrefs.choices.forEach((choice) => {
            if (choice.imageUrl) {
              const processedUrl = processImagePictureChoice(
                choice.imageUrl,
                picturePrefs.optimizeImageSize,
                picturePrefs.pictureSize
              );
              imageUrls.add(processedUrl);
            }
          });
        }
      }
    });
  });
  imageUrls.forEach((url) => {
    if (preloadedImages.has(url)) {
      return;
    }
    preloadedImages.add(url);
    const img = new Image();
    img.src = url;
  });
};
function transformMediaToContainerQueries(css) {
  if (!css) return "";
  return css.replace(
    /@media\s*([^{]*(?:max-width|min-width)[^{]*)\{/gi,
    (match, conditions) => {
      const widthConditions = [];
      const parenRegex = /\((?:max|min)-width\s*:\s*[^)]+\)/gi;
      let parenMatch;
      while ((parenMatch = parenRegex.exec(conditions)) !== null) {
        widthConditions.push(parenMatch[0]);
      }
      if (widthConditions.length > 0) {
        const containerCondition = widthConditions.join(" and ");
        return `@container ${containerCondition} {`;
      }
      return match;
    }
  );
}
const defaultContextValue = {
  InspectorWrapper: void 0,
  DraftProductPlaceholder: void 0
};
const QuizBuilderContext = reactExports.createContext(defaultContextValue);
function QuizBuilderProvider({
  children,
  InspectorWrapper,
  DraftProductPlaceholder
}) {
  const value = reactExports.useMemo(
    () => ({
      InspectorWrapper,
      DraftProductPlaceholder
    }),
    [InspectorWrapper, DraftProductPlaceholder]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QuizBuilderContext.Provider, { value, children });
}
function useInspectorWrapper() {
  const { InspectorWrapper } = reactExports.useContext(QuizBuilderContext);
  return InspectorWrapper;
}
function useDraftProductPlaceholder() {
  const { DraftProductPlaceholder } = reactExports.useContext(QuizBuilderContext);
  return DraftProductPlaceholder;
}
function setupShadowHostTouchEvents(hostElement) {
  let touchStartX = 0;
  let touchStartY = 0;
  let isScrolling = false;
  const SCROLL_THRESHOLD = 10;
  const handleHostTouchStart = (event) => {
    const touchEvent = event;
    if (touchEvent.touches.length === 1) {
      touchStartX = touchEvent.touches[0].clientX;
      touchStartY = touchEvent.touches[0].clientY;
      isScrolling = false;
    }
  };
  const handleHostTouchMove = (event) => {
    const touchEvent = event;
    if (isScrolling || touchEvent.touches.length !== 1) return;
    const deltaX = Math.abs(touchEvent.touches[0].clientX - touchStartX);
    const deltaY = Math.abs(touchEvent.touches[0].clientY - touchStartY);
    if (deltaX > SCROLL_THRESHOLD || deltaY > SCROLL_THRESHOLD) {
      isScrolling = true;
    }
  };
  const handleHostTouchend = (event) => {
    const touchEvent = event;
    const path = event.composedPath ? event.composedPath() : [];
    const foundLabel = path.some((el2) => el2 && el2.nodeType === 1 && el2.nodeName === "LABEL");
    if (foundLabel) {
      isScrolling = false;
      return;
    }
    const target = touchEvent.composedPath()[0];
    if (!target) {
      isScrolling = false;
      return;
    }
    if (isScrolling) {
      isScrolling = false;
      return;
    }
    const tagName = target.tagName.toUpperCase();
    let isFocusableInput = false;
    if (tagName === "INPUT") {
      const inputType = target.type.toLowerCase();
      const focusableInputTypes = [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "time",
        "datetime-local",
        "month",
        "week"
      ];
      if (focusableInputTypes.includes(inputType)) {
        isFocusableInput = true;
      }
      if (inputType === "checkbox") {
        isScrolling = false;
        return;
      }
    } else if (tagName === "LABEL") {
      isScrolling = false;
      return;
    } else if (tagName === "TEXTAREA" || tagName === "SELECT") {
      isFocusableInput = true;
    }
    if (isFocusableInput) {
      if (typeof target.focus === "function") {
        target.focus();
      }
      if (typeof target.click === "function") {
        target.click();
      }
      isScrolling = false;
      return;
    }
    touchEvent.preventDefault();
    if (target) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        // Allows the event to bubble up the DOM tree.
        cancelable: true,
        // Allows the event to be cancelled.
        composed: true,
        // Allows the event to cross Shadow DOM boundaries.
        view: window
        // Specifies the event's view (the window object).
      });
      target.dispatchEvent(clickEvent);
    }
    isScrolling = false;
  };
  hostElement.addEventListener("touchstart", handleHostTouchStart, { passive: true });
  hostElement.addEventListener("touchmove", handleHostTouchMove, { passive: true });
  hostElement.addEventListener("touchend", handleHostTouchend);
  return () => {
    hostElement.removeEventListener("touchstart", handleHostTouchStart);
    hostElement.removeEventListener("touchmove", handleHostTouchMove);
    hostElement.removeEventListener("touchend", handleHostTouchend);
  };
}
const ShadowDom = ({ shadow, setShadow, children }) => {
  const ref = reactExports.useRef(null);
  const preferences = useQuizStore((state) => state.preferences);
  const { fontFamily, fontFamilyHeading } = useQuizStore((state) => ({
    fontFamily: state.design.fontFamily,
    fontFamilyHeading: state.design.fontFamilyHeading
  }));
  const getFontUrl = (fontFamilyValue) => {
    const formattedFamily = fontFamilyValue.replace(/\s+/g, "+");
    return `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@300;400;500;600;700&display=swap`;
  };
  const getFontUrlHeading = (fontFamilyHeadingValue) => {
    const formattedFamily = fontFamilyHeadingValue.replace(/\s+/g, "+");
    return `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@300;400;500;600;700&display=swap`;
  };
  const isSystemFont = (font) => {
    const systemFonts = [
      "inherit",
      "sans-serif",
      "serif",
      "cursive",
      "monospace",
      "Georgia",
      "fantasy"
    ];
    return systemFonts.includes(font);
  };
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const root2 = ref.current;
    const host = document.createElement("div");
    host.style.height = "100%";
    host.style.width = "100%";
    host.setAttribute("data-cy", "shadow-dom");
    host.id = "shadow-quiz";
    host.style.display = "block";
    host.className = "needsclick";
    const newShadow = host.attachShadow({ mode: "open" });
    root2.append(host);
    setShadow(newShadow);
    return () => {
      if (root2.contains(host)) {
        root2.removeChild(host);
      }
    };
  }, [setShadow]);
  reactExports.useEffect(() => {
    if (!ref.current || !shadow || !document.head) return;
    const hostElement = shadow.host;
    const cleanupTouchEvents = setupShadowHostTouchEvents(hostElement);
    let fontLink;
    let viewport;
    if (preferences.addMetaViewportTag) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      viewport.content = "width=device-width, initial-scale=1, maximum-scale=1";
      document.head.appendChild(viewport);
    }
    if (fontFamily && !isSystemFont(fontFamily)) {
      fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = getFontUrl(fontFamily);
      document.head.appendChild(fontLink);
    }
    let fontLinkHeading;
    if (fontFamilyHeading && !isSystemFont(fontFamilyHeading)) {
      fontLinkHeading = document.createElement("link");
      fontLinkHeading.rel = "stylesheet";
      fontLinkHeading.href = getFontUrlHeading(fontFamilyHeading);
      document.head.appendChild(fontLinkHeading);
    }
    const styleSheet = new CSSStyleSheet();
    shadow.adoptedStyleSheets = [styleSheet];
    return () => {
      if (cleanupTouchEvents) {
        cleanupTouchEvents();
      }
      if (fontLink && document.head.contains(fontLink)) {
        document.head.removeChild(fontLink);
      }
      if (fontLinkHeading && document.head.contains(fontLinkHeading)) {
        document.head.removeChild(fontLinkHeading);
      }
      if (viewport && document.head.contains(viewport)) {
        document.head.removeChild(viewport);
      }
    };
  }, [fontFamily, fontFamilyHeading, shadow, preferences]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "preview-shadow__container", style: { height: "100%" } }),
    shadow !== void 0 && reactDomExports.createPortal(children, shadow)
  ] });
};
function useArrowKeyFocusNavigation(containerSelector = ".quiz") {
  return reactExports.useCallback(
    (e) => {
      var _a;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const root2 = e.currentTarget.closest(containerSelector) || document;
        const focusable = Array.from(
          root2.querySelectorAll(
            'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el2) => el2.offsetParent !== null);
        const idx = focusable.indexOf(e.currentTarget);
        if (idx === -1) return;
        let nextIdx = idx;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          nextIdx = (idx - 1 + focusable.length) % focusable.length;
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextIdx = (idx + 1) % focusable.length;
        }
        (_a = focusable[nextIdx]) == null ? void 0 : _a.focus();
      }
    },
    [containerSelector]
  );
}
const ButtonBlock = ({ block }) => {
  const { content } = block.preferences;
  const dir = useLanguageDirection();
  const { next, getAnswersByBlockRef, getQuestionByQuestionBlockRef } = useQuizStore((state) => ({
    next: state.next,
    getAnswersByBlockRef: state.getAnswersByBlockRef,
    getQuestionByQuestionBlockRef: state.getQuestionByQuestionBlockRef
  }));
  const isDisabled = getAnswersByBlockRef(block.ref).some((answer) => !answer.isValid);
  const { buttonAlignment } = block.preferences;
  const handleButtonKeyDown = useArrowKeyFocusNavigation();
  const buttonClass = clsx("button question_button", {
    "question-button--left": buttonAlignment === Alignment.LEFT,
    "question-button--center": buttonAlignment === Alignment.CENTER,
    "question-button--right": buttonAlignment === Alignment.RIGHT
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "question-button__container", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      id: block.ref,
      className: buttonClass,
      "data-cy": "question-button",
      onClick: () => {
        const question = getQuestionByQuestionBlockRef(block.ref);
        if (question) next(question.ref);
      },
      disabled: isDisabled,
      onKeyDown: handleButtonKeyDown,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "button_text", children: content })
    }
  ) });
};
const c1 = [
  8364,
  0,
  8218,
  402,
  8222,
  8230,
  8224,
  8225,
  710,
  8240,
  352,
  8249,
  338,
  0,
  381,
  0,
  0,
  8216,
  8217,
  8220,
  8221,
  8226,
  8211,
  8212,
  732,
  8482,
  353,
  8250,
  339,
  0,
  382,
  376
];
function isInvalidCodePoint(codePoint) {
  return codePoint === 0 || codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111;
}
function replaceCodePoint(codePoint) {
  if (isInvalidCodePoint(codePoint)) {
    return 65533;
  }
  if (codePoint >= 128 && codePoint <= 159) {
    return c1[codePoint - 128] || codePoint;
  }
  return codePoint;
}
function replaceCodePointXML(codePoint) {
  return isInvalidCodePoint(codePoint) ? 65533 : codePoint;
}
const BASE91_INVERSE = /* @__PURE__ */ (() => {
  const table = new Uint8Array(127);
  let code = 0;
  for (let char = 33; char <= 126; char++) {
    if (char !== 34 && char !== 36 && char !== 92) {
      table[char] = code++;
    }
  }
  return table;
})();
function decodeTrieDict(input2, resultLength, atomCount, dict1AtomCount, ngramCount, dictSize) {
  const base = 91;
  const inputLength = input2.length;
  const twoCharBias = dictSize * (base - 1);
  let pos = 0;
  const readSlotCode = () => {
    const c12 = BASE91_INVERSE[input2.charCodeAt(pos++)];
    return c12 < dictSize ? c12 : c12 * base - twoCharBias + BASE91_INVERSE[input2.charCodeAt(pos++)];
  };
  const dict2AtomCount = atomCount - dict1AtomCount;
  const slotCount = atomCount + ngramCount;
  const single = new Int32Array(slotCount);
  single.fill(-1, dict1AtomCount, dictSize);
  single.fill(-1, dictSize + dict2AtomCount, slotCount);
  const start = new Int32Array(slotCount);
  const length = new Int32Array(slotCount);
  function decodeDelta(count, off) {
    let previous = 0;
    let slot = off;
    const end = off + count;
    while (slot < end) {
      const code = BASE91_INVERSE[input2.charCodeAt(pos++)];
      if (code < 89) {
        previous += code;
        single[slot++] = previous;
      } else if (code === 89) {
        let runLength = BASE91_INVERSE[input2.charCodeAt(pos++)] + 2;
        while (runLength--)
          single[slot++] = ++previous;
      } else {
        const next = BASE91_INVERSE[input2.charCodeAt(pos++)];
        previous += 89 + // eslint-disable-next-line unicorn/prefer-minimal-ternary -- branches read a different number of side-effecting input bytes
        (next < 90 ? next * base + BASE91_INVERSE[input2.charCodeAt(pos++)] : BASE91_INVERSE[input2.charCodeAt(pos++)] * 8281 + BASE91_INVERSE[input2.charCodeAt(pos++)] * base + BASE91_INVERSE[input2.charCodeAt(pos++)]);
        single[slot++] = previous;
      }
    }
  }
  decodeDelta(dict1AtomCount, 0);
  decodeDelta(dict2AtomCount, dictSize);
  const references = new Int32Array(ngramCount * 2);
  let poolSize = 0;
  let ngramIndex = 0;
  function readNgramReferences(count, startSlot) {
    for (let index2 = 0; index2 < count; index2++) {
      const slot = startSlot + index2;
      const a = readSlotCode();
      const b = readSlotCode();
      references[ngramIndex * 2] = a;
      references[ngramIndex * 2 + 1] = b;
      ngramIndex += 1;
      start[slot] = poolSize;
      const entryLength = (single[a] < 0 ? length[a] : 1) + (single[b] < 0 ? length[b] : 1);
      length[slot] = entryLength;
      poolSize += entryLength;
    }
  }
  readNgramReferences(ngramCount - dictSize + dict1AtomCount, dictSize + dict2AtomCount);
  readNgramReferences(dictSize - dict1AtomCount, dict1AtomCount);
  const pool = new Uint16Array(poolSize);
  let write = 0;
  for (let index2 = 0; index2 < ngramIndex; index2++) {
    for (let half = 0; half < 2; half++) {
      const source = references[index2 * 2 + half];
      const value = single[source];
      if (value < 0) {
        let read = start[source];
        const readEnd = read + length[source];
        while (read < readEnd)
          pool[write++] = pool[read++];
      } else {
        pool[write++] = value;
      }
    }
  }
  const out = new Uint16Array(resultLength);
  let outIndex = 0;
  while (pos < inputLength) {
    let slot = BASE91_INVERSE[input2.charCodeAt(pos++)];
    if (slot >= dictSize) {
      slot = slot * base - twoCharBias + BASE91_INVERSE[input2.charCodeAt(pos++)];
    }
    const value = single[slot];
    if (value < 0) {
      let read = start[slot];
      const readEnd = read + length[slot];
      while (read < readEnd)
        out[outIndex++] = pool[read++];
    } else {
      out[outIndex++] = value;
    }
  }
  return out;
}
const htmlDecodeTree = /* @__PURE__ */ decodeTrieDict("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61);
const xmlDecodeTree = /* @__PURE__ */ new Uint16Array([
  512,
  26465,
  29036,
  7,
  0,
  2,
  4,
  116,
  24638,
  116,
  24636,
  8693,
  29807,
  24610,
  621,
  1,
  0,
  0,
  3,
  112,
  24614,
  111,
  115,
  24615
]);
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["FLAG13"] = 8192] = "FLAG13";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  BinTrieFlags2[BinTrieFlags2["VALUE_MASK"] = 8191] = "VALUE_MASK";
})(BinTrieFlags || (BinTrieFlags = {}));
var CharCodes$1;
(function(CharCodes2) {
  CharCodes2[CharCodes2["AMP"] = 38] = "AMP";
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
})(CharCodes$1 || (CharCodes$1 = {}));
const TO_LOWER_BIT = 32;
function isNumber(code) {
  return code - CharCodes$1.ZERO >>> 0 <= 9;
}
function isHexadecimalCharacter(code) {
  return (code | TO_LOWER_BIT) - CharCodes$1.LOWER_A >>> 0 <= 5;
}
function isAlpha(code) {
  return (code | TO_LOWER_BIT) - CharCodes$1.LOWER_A >>> 0 <= 25;
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes$1.EQUALS || isAlpha(code) || isNumber(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
class EntityDecoder {
  constructor(decodeTree, emitCodePoint, errors) {
    __publicField(this, "decodeTree");
    __publicField(this, "emitCodePoint");
    __publicField(this, "errors");
    /** The current state of the decoder. */
    __publicField(this, "state", EntityDecoderState.EntityStart);
    /** Characters that were consumed while parsing an entity. */
    __publicField(this, "consumed", 1);
    /**
     * The result of the entity.
     *
     * For named entities: the trie index of the best legacy match so far
     * (0 = none). For numeric entities: the accumulated code point.
     */
    __publicField(this, "result", 0);
    /** The current index in the decode tree. */
    __publicField(this, "treeIndex", 0);
    /**
     * Characters consumed since the last recorded legacy match, plus one.
     * Invariant at the top of the `stateNamedEntity` loop: `excess` equals
     * the number of unrecorded consumed characters + 1.
     */
    // biome-ignore lint/correctness/noUnusedPrivateClassMembers: False positive (read via destructuring)
    __publicField(this, "excess", 1);
    /** The mode in which the decoder is operating. */
    __publicField(this, "decodeMode", DecodingMode.Strict);
    /** The number of characters that have been consumed in the current run. */
    // biome-ignore lint/correctness/noUnusedPrivateClassMembers: False positive
    __publicField(this, "runConsumed", 0);
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
  }
  /**
   * Resets the instance to make it reusable.
   * @param decodeMode Entity decoding mode to use.
   */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
    this.runConsumed = 0;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the non-streaming `decodeWithTrie`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(input2, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (input2.charCodeAt(offset) === CharCodes$1.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(input2, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(input2, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(input2, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(input2, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(input2, offset);
      }
      default: {
        return this.stateNamedEntity(input2, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  // eslint-disable-next-line unicorn/consistent-class-member-order
  stateNumericStart(input2, offset) {
    if (offset >= input2.length) {
      return -1;
    }
    if ((input2.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes$1.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(input2, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(input2, offset);
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML
   * spec. Digit parsing matches the hex loop in `parseNumericEntity`.
   * The accumulated value is preserved for numeric validation callbacks.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(input2, offset) {
    const inputLength = input2.length;
    let { result: result2 } = this;
    let { consumed } = this;
    while (offset < inputLength) {
      const char = input2.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        const digit = char <= CharCodes$1.NINE ? char - CharCodes$1.ZERO : (char | TO_LOWER_BIT) - CharCodes$1.LOWER_A + 10;
        result2 = result2 * 16 + digit;
        consumed += 1;
        offset += 1;
      } else {
        this.result = result2;
        this.consumed = consumed;
        return this.emitNumericEntity(char, 3);
      }
    }
    this.result = result2;
    this.consumed = consumed;
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML
   * spec. Digit parsing matches the decimal loop in `parseNumericEntity`.
   * The accumulated value is preserved for numeric validation callbacks.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(input2, offset) {
    const inputLength = input2.length;
    let { result: result2 } = this;
    let { consumed } = this;
    while (offset < inputLength) {
      const digit = input2.charCodeAt(offset) - CharCodes$1.ZERO;
      if (digit >>> 0 > 9) {
        this.result = result2;
        this.consumed = consumed;
        return this.emitNumericEntity(digit + CharCodes$1.ZERO, 2);
      }
      result2 = result2 * 10 + digit;
      consumed += 1;
      offset += 1;
    }
    this.result = result2;
    this.consumed = consumed;
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a;
    if (this.consumed <= expectedLength) {
      (_a = this.errors) == null ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes$1.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint((this.decodeTree === xmlDecodeTree ? replaceCodePointXML : replaceCodePoint)(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes$1.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Flush locally-tracked walk state back to the fields, then emit the
   * recorded legacy match or reject (cold path — at most once per
   * entity). Called after failed navigation (leaf node, branch miss, or
   * compact-run mismatch). In attribute mode, reject if no legacy was
   * recorded at the current node, if we descended past it, or if the
   * pending input character is an invalid attribute terminator.
   * @param consumed Locally-tracked consumed count.
   * @param excess Locally-tracked excess count.
   * @param char Pending input character (may be the mismatching char).
   * @param valueLength Value length at the current trie node.
   */
  flushAndEmitLegacyOrReject(consumed, excess, char, valueLength) {
    this.consumed = consumed;
    this.excess = excess;
    return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || excess > 1 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(input2, offset) {
    const { decodeTree } = this;
    const inputLength = input2.length;
    const isStrict = this.decodeMode === DecodingMode.Strict;
    let { treeIndex } = this;
    let { excess } = this;
    let { consumed } = this;
    let current2 = decodeTree[treeIndex];
    while (offset < inputLength) {
      while ((current2 & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === 0 && (current2 & BinTrieFlags.JUMP_TABLE) !== 0) {
        const char2 = input2.charCodeAt(offset);
        const jumpOffset = current2 & BinTrieFlags.JUMP_TABLE;
        const branchCount = (current2 & BinTrieFlags.BRANCH_LENGTH) >> 7;
        if (branchCount === 0) {
          if (char2 !== jumpOffset) {
            return this.flushAndEmitLegacyOrReject(consumed, excess, char2, 0);
          }
          treeIndex += 1;
        } else {
          const slot = char2 - jumpOffset;
          if (slot >>> 0 >= branchCount) {
            return this.flushAndEmitLegacyOrReject(consumed, excess, char2, 0);
          }
          const stored = decodeTree[treeIndex + 1 + slot];
          if (stored === 0) {
            return this.flushAndEmitLegacyOrReject(consumed, excess, char2, 0);
          }
          treeIndex = treeIndex + branchCount + stored & 65535;
        }
        current2 = decodeTree[treeIndex];
        offset += 1;
        excess += 1;
        if (offset >= inputLength)
          break;
      }
      if (offset >= inputLength)
        break;
      if ((current2 & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === BinTrieFlags.FLAG13) {
        const runLength = (current2 & BinTrieFlags.BRANCH_LENGTH) >> 7;
        let { runConsumed } = this;
        if (runConsumed === 0) {
          const char2 = input2.charCodeAt(offset);
          if (char2 !== (current2 & BinTrieFlags.JUMP_TABLE)) {
            return this.flushAndEmitLegacyOrReject(consumed, excess, char2, 0);
          }
          offset += 1;
          excess += 1;
          runConsumed = 1;
        }
        while (runConsumed < runLength) {
          if (offset >= inputLength) {
            this.treeIndex = treeIndex;
            this.excess = excess;
            this.consumed = consumed;
            this.runConsumed = runConsumed;
            return -1;
          }
          const charIndexInPacked = runConsumed - 1;
          const packedWord = decodeTree[treeIndex + 1 + (charIndexInPacked >> 1)];
          const expectedChar = packedWord >> ((charIndexInPacked & 1) << 3) & 255;
          const char2 = input2.charCodeAt(offset);
          if (char2 !== expectedChar) {
            this.runConsumed = 0;
            return this.flushAndEmitLegacyOrReject(consumed, excess, char2, 0);
          }
          offset += 1;
          excess += 1;
          runConsumed += 1;
        }
        this.runConsumed = 0;
        treeIndex += 1 + (runLength >> 1);
        current2 = decodeTree[treeIndex];
        continue;
      }
      const valueLength = current2 >>> 14;
      const char = input2.charCodeAt(offset);
      if (valueLength !== 0) {
        if (!isStrict && (current2 & BinTrieFlags.FLAG13) === 0) {
          this.result = treeIndex;
          consumed += excess - 1;
          excess = 1;
        }
        if (char === CharCodes$1.SEMI) {
          return this.emitNamedEntityData(treeIndex, valueLength, consumed + excess);
        }
        if (valueLength === 1) {
          return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
        }
      }
      const next = determineBranch(decodeTree, current2, treeIndex + (valueLength || 1), char);
      if (next < 0) {
        return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
      }
      treeIndex = next;
      current2 = decodeTree[treeIndex];
      offset += 1;
      excess += 1;
    }
    if (!isStrict && current2 >>> 14 !== 0 && (current2 & BinTrieFlags.FLAG13) === 0) {
      this.result = treeIndex;
      consumed += excess - 1;
      excess = 1;
    }
    this.treeIndex = treeIndex;
    this.excess = excess;
    this.consumed = consumed;
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a;
    const { result: result2, decodeTree } = this;
    const valueLength = decodeTree[result2] >>> 14;
    this.emitNamedEntityData(result2, valueLength, this.consumed);
    (_a = this.errors) == null ? void 0 : _a.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   * @param result The index of the entity in the decode tree.
   * @param valueLength Encoded value length (header plus any value words).
   * @param consumed The number of characters consumed.
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result2, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result2] & BinTrieFlags.VALUE_MASK : decodeTree[result2 + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result2 + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   * @returns The number of characters consumed.
   */
  end() {
    var _a;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a = this.errors) == null ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      default: {
        return 0;
      }
    }
  }
}
function determineBranch(decodeTree, current2, nodeIndex, char) {
  const branchCount = (current2 & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current2 & BinTrieFlags.JUMP_TABLE;
  if (jumpOffset) {
    if (branchCount === 0) {
      return char === jumpOffset ? nodeIndex : -1;
    }
    const slot = char - jumpOffset;
    if (slot >>> 0 >= branchCount)
      return -1;
    const stored = decodeTree[nodeIndex + slot];
    return stored === 0 ? -1 : nodeIndex + branchCount + stored - 1 & 65535;
  }
  if (branchCount === 0)
    return -1;
  const packedKeySlots = branchCount + 1 >> 1;
  const branchEnd = nodeIndex + packedKeySlots + branchCount;
  for (let index2 = 0; index2 < branchCount; index2++) {
    const packed = decodeTree[nodeIndex + (index2 >> 1)];
    const key = packed >> ((index2 & 1) << 3) & 255;
    if (key === char) {
      const pointerIndex = nodeIndex + packedKeySlots + index2;
      return branchEnd + decodeTree[pointerIndex] & 65535;
    }
    if (key > char)
      return -1;
  }
  return -1;
}
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
  CharCodes2[CharCodes2["NewLine"] = 10] = "NewLine";
  CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
  CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes2[CharCodes2["Space"] = 32] = "Space";
  CharCodes2[CharCodes2["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes2[CharCodes2["Number"] = 35] = "Number";
  CharCodes2[CharCodes2["Amp"] = 38] = "Amp";
  CharCodes2[CharCodes2["SingleQuote"] = 39] = "SingleQuote";
  CharCodes2[CharCodes2["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
  CharCodes2[CharCodes2["Slash"] = 47] = "Slash";
  CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
  CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
  CharCodes2[CharCodes2["Semi"] = 59] = "Semi";
  CharCodes2[CharCodes2["Lt"] = 60] = "Lt";
  CharCodes2[CharCodes2["Eq"] = 61] = "Eq";
  CharCodes2[CharCodes2["Gt"] = 62] = "Gt";
  CharCodes2[CharCodes2["Questionmark"] = 63] = "Questionmark";
  CharCodes2[CharCodes2["UpperA"] = 65] = "UpperA";
  CharCodes2[CharCodes2["LowerA"] = 97] = "LowerA";
  CharCodes2[CharCodes2["UpperF"] = 70] = "UpperF";
  CharCodes2[CharCodes2["LowerF"] = 102] = "LowerF";
  CharCodes2[CharCodes2["UpperZ"] = 90] = "UpperZ";
  CharCodes2[CharCodes2["LowerZ"] = 122] = "LowerZ";
  CharCodes2[CharCodes2["LowerX"] = 120] = "LowerX";
  CharCodes2[CharCodes2["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
var State;
(function(State2) {
  State2[State2["Text"] = 1] = "Text";
  State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
  State2[State2["InTagName"] = 3] = "InTagName";
  State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
  State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State2[State2["InAttributeName"] = 9] = "InAttributeName";
  State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
  State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State2[State2["InDeclaration"] = 16] = "InDeclaration";
  State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State2[State2["BeforeComment"] = 18] = "BeforeComment";
  State2[State2["CDATASequence"] = 19] = "CDATASequence";
  State2[State2["DeclarationSequence"] = 20] = "DeclarationSequence";
  State2[State2["InSpecialComment"] = 21] = "InSpecialComment";
  State2[State2["InCommentLike"] = 22] = "InCommentLike";
  State2[State2["SpecialStartSequence"] = 23] = "SpecialStartSequence";
  State2[State2["InSpecialTag"] = 24] = "InSpecialTag";
  State2[State2["InPlainText"] = 25] = "InPlainText";
  State2[State2["InEntity"] = 26] = "InEntity";
})(State || (State = {}));
function isWhitespace(c) {
  return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
  return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isASCIIAlpha(c) {
  return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
const Sequences = {
  Empty: new Uint8Array(0),
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 33, 62]),
  // `--!>`
  Doctype: new Uint8Array([100, 111, 99, 116, 121, 112, 101]),
  // `doctype`
  IframeEnd: new Uint8Array([60, 47, 105, 102, 114, 97, 109, 101]),
  // `</iframe`
  NoembedEnd: new Uint8Array([
    60,
    47,
    110,
    111,
    101,
    109,
    98,
    101,
    100
  ]),
  // `</noembed`
  NoframesEnd: new Uint8Array([
    60,
    47,
    110,
    111,
    102,
    114,
    97,
    109,
    101,
    115
  ]),
  // `</noframes`
  Plaintext: new Uint8Array([
    60,
    47,
    112,
    108,
    97,
    105,
    110,
    116,
    101,
    120,
    116
  ]),
  // `</plaintext`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ]),
  // `</textarea`
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
  // `</xmp`
};
const specialStartSequences = /* @__PURE__ */ new Map([
  [Sequences.IframeEnd[2], Sequences.IframeEnd],
  [Sequences.NoembedEnd[2], Sequences.NoembedEnd],
  [Sequences.Plaintext[2], Sequences.Plaintext],
  [Sequences.ScriptEnd[2], Sequences.ScriptEnd],
  [Sequences.TitleEnd[2], Sequences.TitleEnd],
  [Sequences.XmpEnd[2], Sequences.XmpEnd]
]);
class Tokenizer {
  constructor({ xmlMode = false, decodeEntities = true, recognizeSelfClosing = xmlMode }, cbs) {
    __publicField(this, "cbs");
    /** The current state the tokenizer is in. */
    __publicField(this, "state", State.Text);
    /** The read buffer. */
    __publicField(this, "buffer", "");
    /** The beginning of the section that is currently being read. */
    __publicField(this, "sectionStart", 0);
    /** The index within the buffer that we are currently looking at. */
    __publicField(this, "index", 0);
    /** The start of the last entity. */
    __publicField(this, "entityStart", 0);
    /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
    __publicField(this, "baseState", State.Text);
    /** For special parsing behavior inside of script and style tags. */
    __publicField(this, "isSpecial", false);
    /** Indicates whether the tokenizer has been paused. */
    __publicField(this, "running", true);
    /** The offset of the current buffer. */
    __publicField(this, "offset", 0);
    __publicField(this, "xmlMode");
    __publicField(this, "decodeEntities");
    __publicField(this, "recognizeSelfClosing");
    __publicField(this, "entityDecoder");
    __publicField(this, "currentSequence", Sequences.Empty);
    __publicField(this, "sequenceIndex", 0);
    this.cbs = cbs;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.recognizeSelfClosing = recognizeSelfClosing;
    this.entityDecoder = new EntityDecoder(xmlMode ? xmlDecodeTree : htmlDecodeTree, (cp, consumed) => this.emitCodePoint(cp, consumed));
  }
  reset() {
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.isSpecial = false;
    this.currentSequence = Sequences.Empty;
    this.sequenceIndex = 0;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running)
      this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  stateText(c) {
    if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  enterTagBody() {
    if (this.currentSequence === Sequences.Plaintext) {
      this.currentSequence = Sequences.Empty;
      this.state = State.InPlainText;
    } else if (this.isSpecial) {
      this.state = State.InSpecialTag;
      this.sequenceIndex = 0;
    } else {
      this.state = State.Text;
    }
  }
  /**
   * Match the opening tag name against an HTML text-only tag sequence.
   *
   * Some tags share an initial prefix (`script`/`style`, `title`/`textarea`,
   * `noembed`/`noframes`), so we may switch to an alternate sequence at the
   * first distinguishing byte.  On a successful full match we fall back to
   * the normal tag-name state; a later `>` will enter raw-text, RCDATA, or
   * plaintext mode based on `currentSequence` / `isSpecial`.
   * @param c Current character code point.
   */
  stateSpecialStartSequence(c) {
    const lower = c | 32;
    if (this.sequenceIndex < this.currentSequence.length) {
      if (lower === this.currentSequence[this.sequenceIndex]) {
        this.sequenceIndex++;
        return;
      }
      if (this.sequenceIndex === 3) {
        if (this.currentSequence === Sequences.ScriptEnd && lower === Sequences.StyleEnd[3]) {
          this.currentSequence = Sequences.StyleEnd;
          this.sequenceIndex = 4;
          return;
        }
        if (this.currentSequence === Sequences.TitleEnd && lower === Sequences.TextareaEnd[3]) {
          this.currentSequence = Sequences.TextareaEnd;
          this.sequenceIndex = 4;
          return;
        }
      } else if (this.sequenceIndex === 4 && this.currentSequence === Sequences.NoembedEnd && lower === Sequences.NoframesEnd[4]) {
        this.currentSequence = Sequences.NoframesEnd;
        this.sequenceIndex = 5;
        return;
      }
    } else if (isEndOfTagSection(c)) {
      this.sequenceIndex = 0;
      this.state = State.InTagName;
      this.stateInTagName(c);
      return;
    }
    this.isSpecial = false;
    this.currentSequence = Sequences.Empty;
    this.sequenceIndex = 0;
    this.state = State.InTagName;
    this.stateInTagName(c);
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      if (this.xmlMode) {
        this.state = State.InDeclaration;
        this.stateInDeclaration(c);
      } else {
        this.state = State.InSpecialComment;
        this.stateInSpecialComment(c);
      }
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   * @param c Current character code point.
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  /**
   * Emit a comment token and return to the text state.
   * @param offset Number of characters in the end sequence that have already been matched.
   */
  emitComment(offset) {
    this.cbs.oncomment(this.sectionStart, this.index, offset);
    this.sequenceIndex = 0;
    this.sectionStart = this.index + 1;
    this.state = State.Text;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   * @param c Current character code point.
   */
  stateInCommentLike(c) {
    if (!this.xmlMode && this.currentSequence === Sequences.CommentEnd && this.sequenceIndex <= 1 && /*
     * We're still at the very start of the comment: the only
     * characters consumed since `<!--` are the dashes that
     * advanced sequenceIndex (0 for `<!-->`, 1 for `<!--->`).
     */
    this.index === this.sectionStart + this.sequenceIndex && c === CharCodes.Gt) {
      this.emitComment(this.sequenceIndex);
    } else if (this.currentSequence === Sequences.CommentEnd && this.sequenceIndex === 2 && c === CharCodes.Gt) {
      this.emitComment(2);
    } else if (this.currentSequence === Sequences.CommentEnd && this.sequenceIndex === this.currentSequence.length - 1 && c !== CharCodes.Gt) {
      this.sequenceIndex = Number(c === CharCodes.Dash);
    } else if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 3);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   * @param c Current character code point.
   */
  isTagStartChar(c) {
    return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
  }
  /**
   * Scan raw-text / RCDATA content for the matching end tag.
   *
   * For RCDATA tags (`<title>`, `<textarea>`) entities are decoded inline.
   * For raw-text tags (`<script>`, `<style>`, etc.) we fast-forward to `<`.
   * @param c Current character code point.
   */
  stateInSpecialTag(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (isEndOfTagSection(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd) {
        if (this.decodeEntities && c === CharCodes.Amp) {
          this.startEntity();
        }
      } else if (this.fastForwardTo(CharCodes.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === CharCodes.Lt);
    }
  }
  stateBeforeTagName(c) {
    var _a, _b;
    if (c === CharCodes.ExclamationMark) {
      this.state = State.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Questionmark) {
      if (this.xmlMode) {
        this.state = State.InProcessingInstruction;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      } else {
        this.state = State.InSpecialComment;
        this.sectionStart = this.index;
      }
    } else if (this.isTagStartChar(c)) {
      this.sectionStart = this.index;
      const special = this.xmlMode || ((_b = (_a = this.cbs).isInForeignContext) == null ? void 0 : _b.call(_a)) ? void 0 : specialStartSequences.get(c | 32);
      if (special === void 0) {
        this.state = State.InTagName;
      } else {
        this.isSpecial = true;
        this.currentSequence = special;
        this.sequenceIndex = 3;
        this.state = State.SpecialStartSequence;
      }
    } else if (c === CharCodes.Slash) {
      this.state = State.BeforeClosingTagName;
    } else {
      this.state = State.Text;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c)) {
      if (this.xmlMode) ;
      else {
        this.state = State.InSpecialComment;
        this.sectionStart = this.index;
      }
    } else if (c === CharCodes.Gt) {
      this.state = State.Text;
      if (!this.xmlMode) {
        this.sectionStart = this.index + 1;
      }
    } else {
      this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (isEndOfTagSection(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterClosingTagName;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onopentagend(this.index);
      this.enterTagBody();
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Slash) {
      this.state = State.InSelfClosingTag;
    } else if (!isWhitespace(c)) {
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  /**
   * Handle `/` before `>` in an opening tag.
   *
   * In HTML mode, text-only tags ignore the self-closing flag and still enter
   * their raw-text/RCDATA/plaintext state unless self-closing tags are being
   * recognized. In XML mode, or for ordinary tags, the tokenizer returns to
   * regular text parsing after emitting the self-closing callback.
   * @param c Current character code point.
   */
  stateInSelfClosingTag(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.sectionStart = this.index + 1;
      if (!this.recognizeSelfClosing) {
        this.enterTagBody();
        return;
      }
      this.state = State.Text;
      this.isSpecial = false;
      this.currentSequence = Sequences.Empty;
    } else if (!isWhitespace(c)) {
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateInAttributeName(c) {
    if (c === CharCodes.Eq || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = this.index;
      this.state = State.AfterAttributeName;
      this.stateAfterAttributeName(c);
    }
  }
  stateAfterAttributeName(c) {
    if (c === CharCodes.Eq) {
      this.state = State.BeforeAttributeValue;
    } else if (c === CharCodes.Slash || c === CharCodes.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c) {
    if (c === CharCodes.DoubleQuote) {
      this.state = State.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.SingleQuote) {
      this.state = State.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = State.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c);
    }
  }
  handleInAttributeValue(c, quote) {
    if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
      this.state = State.BeforeAttributeName;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateInAttributeValueDoubleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c) {
    if (isWhitespace(c) || c === CharCodes.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  /**
   * Distinguish between CDATA, declarations, HTML comments, and HTML bogus
   * comments after `<!`.
   *
   * In HTML mode, only real comments and doctypes stay on declaration paths;
   * everything else becomes a bogus comment terminated by the next `>`.
   * @param c Current character code point.
   */
  stateBeforeDeclaration(c) {
    if (c === CharCodes.OpeningSquareBracket) {
      this.state = State.CDATASequence;
      this.sequenceIndex = 0;
    } else if (this.xmlMode) {
      this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
    } else if ((c | 32) === Sequences.Doctype[0]) {
      this.state = State.DeclarationSequence;
      this.currentSequence = Sequences.Doctype;
      this.sequenceIndex = 1;
    } else if (c === CharCodes.Gt) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Dash) {
      this.state = State.BeforeComment;
    } else {
      this.state = State.InSpecialComment;
    }
  }
  /**
   * Continue matching `doctype` after `<!d`.
   *
   * A full `doctype` match stays on the declaration path; any other name falls
   * back to an HTML bogus comment, which matches browser behavior for
   * non-doctype `<!...>` constructs.
   * @param c Current character code point.
   */
  stateDeclarationSequence(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      this.state = State.InDeclaration;
      this.stateInDeclaration(c);
    } else if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (c === CharCodes.Gt) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InSpecialComment;
    }
  }
  stateInDeclaration(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  /**
   * XML processing instructions (`<?...?>`).
   *
   * In HTML mode `<?` is routed to `InSpecialComment` instead, so this
   * state is only reachable in XML mode.
   * @param c Current character code point.
   */
  stateInProcessingInstruction(c) {
    if (c === CharCodes.Questionmark) {
      this.sequenceIndex = 1;
    } else if (c === CharCodes.Gt && this.sequenceIndex === 1) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index - 1);
      this.sequenceIndex = 0;
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    } else {
      this.sequenceIndex = Number(this.fastForwardTo(CharCodes.Questionmark));
    }
  }
  stateBeforeComment(c) {
    if (c === CharCodes.Dash) {
      this.state = State.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 0;
      this.sectionStart = this.index + 1;
    } else if (this.xmlMode) {
      this.state = State.InDeclaration;
    } else if (c === CharCodes.Gt) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InSpecialComment;
    }
  }
  stateInSpecialComment(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  startEntity() {
    this.baseState = this.state;
    this.state = State.InEntity;
    this.entityStart = this.index;
    this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State.Text || this.baseState === State.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
  }
  stateInEntity() {
    const indexInBuffer = this.index - this.offset;
    const length = this.entityDecoder.write(this.buffer, indexInBuffer);
    if (length >= 0) {
      this.state = this.baseState;
      if (length === 0) {
        this.index -= 1;
      }
    } else {
      if (indexInBuffer < this.buffer.length && this.buffer.charCodeAt(indexInBuffer) === CharCodes.Amp) {
        this.state = this.baseState;
        this.index -= 1;
        return;
      }
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State.Text || this.state === State.InPlainText || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    while (this.shouldContinue()) {
      const c = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text: {
          this.stateText(c);
          break;
        }
        case State.InPlainText: {
          this.index = this.buffer.length + this.offset - 1;
          break;
        }
        case State.SpecialStartSequence: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case State.InSpecialTag: {
          this.stateInSpecialTag(c);
          break;
        }
        case State.CDATASequence: {
          this.stateCDATASequence(c);
          break;
        }
        case State.DeclarationSequence: {
          this.stateDeclarationSequence(c);
          break;
        }
        case State.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c);
          break;
        }
        case State.InAttributeName: {
          this.stateInAttributeName(c);
          break;
        }
        case State.InCommentLike: {
          this.stateInCommentLike(c);
          break;
        }
        case State.InSpecialComment: {
          this.stateInSpecialComment(c);
          break;
        }
        case State.BeforeAttributeName: {
          this.stateBeforeAttributeName(c);
          break;
        }
        case State.InTagName: {
          this.stateInTagName(c);
          break;
        }
        case State.InClosingTagName: {
          this.stateInClosingTagName(c);
          break;
        }
        case State.BeforeTagName: {
          this.stateBeforeTagName(c);
          break;
        }
        case State.AfterAttributeName: {
          this.stateAfterAttributeName(c);
          break;
        }
        case State.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c);
          break;
        }
        case State.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c);
          break;
        }
        case State.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case State.AfterClosingTagName: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case State.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c);
          break;
        }
        case State.InSelfClosingTag: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case State.InDeclaration: {
          this.stateInDeclaration(c);
          break;
        }
        case State.BeforeDeclaration: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case State.BeforeComment: {
          this.stateBeforeComment(c);
          break;
        }
        case State.InProcessingInstruction: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case State.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State.InEntity) {
      this.entityDecoder.end();
      this.state = this.baseState;
    }
    this.handleTrailingData();
    this.cbs.onend();
  }
  handleTrailingCommentLikeData(endIndex) {
    if (this.state !== State.InCommentLike) {
      return false;
    }
    if (this.currentSequence === Sequences.CdataEnd) {
      if (this.xmlMode) {
        if (this.sectionStart < endIndex) {
          this.cbs.oncdata(this.sectionStart, endIndex, 0);
        }
      } else {
        const cdataStart = this.sectionStart - Sequences.Cdata.length - 1;
        this.cbs.oncomment(cdataStart, endIndex, 0);
      }
    } else {
      const offset = this.xmlMode ? 0 : Math.min(this.sequenceIndex, Sequences.CommentEnd.length - 1);
      this.cbs.oncomment(this.sectionStart, endIndex, offset);
    }
    return true;
  }
  handleTrailingMarkupDeclaration(endIndex) {
    if (this.xmlMode) {
      switch (this.state) {
        case State.InSpecialComment:
        case State.BeforeComment:
        case State.CDATASequence:
        case State.DeclarationSequence:
        case State.InDeclaration: {
          this.cbs.ontext(this.sectionStart, endIndex);
          return true;
        }
        default: {
          return false;
        }
      }
    }
    switch (this.state) {
      case State.BeforeDeclaration:
      case State.InSpecialComment:
      case State.BeforeComment:
      case State.CDATASequence: {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
        return true;
      }
      case State.DeclarationSequence: {
        if (this.sequenceIndex !== Sequences.Doctype.length) {
          this.cbs.oncomment(this.sectionStart, endIndex, 0);
        }
        return true;
      }
      case State.InDeclaration: {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.handleTrailingCommentLikeData(endIndex) || this.handleTrailingMarkupDeclaration(endIndex)) {
      return;
    }
    if (this.sectionStart >= endIndex) {
      return;
    }
    switch (this.state) {
      case State.InTagName:
      case State.BeforeAttributeName:
      case State.BeforeAttributeValue:
      case State.AfterAttributeName:
      case State.InAttributeName:
      case State.InAttributeValueSq:
      case State.InAttributeValueDq:
      case State.InAttributeValueNq:
      case State.InClosingTagName: {
        break;
      }
      default: {
        this.cbs.ontext(this.sectionStart, endIndex);
      }
    }
  }
  emitCodePoint(cp, consumed) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      if (this.sectionStart < this.entityStart) {
        this.cbs.onattribdata(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.onattribentity(cp);
    } else {
      if (this.sectionStart < this.entityStart) {
        this.cbs.ontext(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.ontextentity(cp, this.sectionStart);
    }
  }
}
const { fromCodePoint } = String;
const formTags = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]);
const pTag = /* @__PURE__ */ new Set(["p"]);
const headingTags = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]);
const tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
const ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
const rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
const openImpliesClose = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["a", /* @__PURE__ */ new Set(["a"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", pTag],
  ["h1", headingTags],
  ["h2", headingTags],
  ["h3", headingTags],
  ["h4", headingTags],
  ["h5", headingTags],
  ["h6", headingTags],
  ["select", formTags],
  ["input", formTags],
  ["output", formTags],
  ["button", formTags],
  ["datalist", formTags],
  ["textarea", formTags],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", ddtTags],
  ["dt", ddtTags],
  ["address", pTag],
  ["article", pTag],
  ["aside", pTag],
  ["blockquote", pTag],
  ["details", pTag],
  ["div", pTag],
  ["dl", pTag],
  ["fieldset", pTag],
  ["figcaption", pTag],
  ["figure", pTag],
  ["footer", pTag],
  ["form", pTag],
  ["header", pTag],
  ["hr", pTag],
  ["main", pTag],
  ["nav", pTag],
  ["ol", pTag],
  ["pre", pTag],
  ["section", pTag],
  ["table", pTag],
  ["ul", pTag],
  ["rt", rtpTags],
  ["rp", rtpTags],
  ["tbody", tableSectionTags],
  ["tfoot", tableSectionTags]
]);
const DOCUMENT_TYPE = "doctype";
const voidElements$1 = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
const foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
const htmlIntegrationElements = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]);
const svgTagNameAdjustments = /* @__PURE__ */ new Map([
  ["altglyph", "altGlyph"],
  ["altglyphdef", "altGlyphDef"],
  ["altglyphitem", "altGlyphItem"],
  ["animatecolor", "animateColor"],
  ["animatemotion", "animateMotion"],
  ["animatetransform", "animateTransform"],
  ["clippath", "clipPath"],
  ["feblend", "feBlend"],
  ["fecolormatrix", "feColorMatrix"],
  ["fecomponenttransfer", "feComponentTransfer"],
  ["fecomposite", "feComposite"],
  ["feconvolvematrix", "feConvolveMatrix"],
  ["fediffuselighting", "feDiffuseLighting"],
  ["fedisplacementmap", "feDisplacementMap"],
  ["fedistantlight", "feDistantLight"],
  ["fedropshadow", "feDropShadow"],
  ["feflood", "feFlood"],
  ["fefunca", "feFuncA"],
  ["fefuncb", "feFuncB"],
  ["fefuncg", "feFuncG"],
  ["fefuncr", "feFuncR"],
  ["fegaussianblur", "feGaussianBlur"],
  ["feimage", "feImage"],
  ["femerge", "feMerge"],
  ["femergenode", "feMergeNode"],
  ["femorphology", "feMorphology"],
  ["feoffset", "feOffset"],
  ["fepointlight", "fePointLight"],
  ["fespecularlighting", "feSpecularLighting"],
  ["fespotlight", "feSpotLight"],
  ["fetile", "feTile"],
  ["feturbulence", "feTurbulence"],
  ["foreignobject", "foreignObject"],
  ["glyphref", "glyphRef"],
  ["lineargradient", "linearGradient"],
  ["radialgradient", "radialGradient"],
  ["textpath", "textPath"]
]);
var ForeignContext;
(function(ForeignContext2) {
  ForeignContext2[ForeignContext2["None"] = 0] = "None";
  ForeignContext2[ForeignContext2["Svg"] = 1] = "Svg";
  ForeignContext2[ForeignContext2["MathML"] = 2] = "MathML";
})(ForeignContext || (ForeignContext = {}));
const reNameEnd = /\s|\//;
let Parser$2 = class Parser {
  constructor(cbs, options2 = {}) {
    __publicField(this, "options");
    /** The start index of the last event. */
    __publicField(this, "startIndex", 0);
    /** The end index of the last event. */
    __publicField(this, "endIndex", 0);
    /**
     * Store the start index of the current open tag,
     * so we can update the start index for attributes.
     */
    __publicField(this, "openTagStart", 0);
    __publicField(this, "tagname", "");
    __publicField(this, "attribname", "");
    __publicField(this, "attribvalue", "");
    __publicField(this, "attribs", null);
    __publicField(this, "stack", []);
    __publicField(this, "foreignContext");
    __publicField(this, "cbs");
    __publicField(this, "lowerCaseTagNames");
    __publicField(this, "lowerCaseAttributeNames");
    __publicField(this, "recognizeSelfClosing");
    /** We are parsing HTML. Inverse of the `xmlMode` option. */
    __publicField(this, "htmlMode");
    __publicField(this, "tokenizer");
    __publicField(this, "buffers", []);
    __publicField(this, "bufferOffset", 0);
    /** The index of the last written buffer. Used when resuming after a `pause()`. */
    __publicField(this, "writeIndex", 0);
    /** Indicates whether the parser has finished running / `.end` has been called. */
    __publicField(this, "ended", false);
    var _a, _b;
    this.options = options2;
    this.cbs = cbs ?? {};
    this.htmlMode = !this.options.xmlMode;
    this.lowerCaseTagNames = options2.lowerCaseTags ?? this.htmlMode;
    this.lowerCaseAttributeNames = options2.lowerCaseAttributeNames ?? this.htmlMode;
    this.recognizeSelfClosing = options2.recognizeSelfClosing ?? !this.htmlMode;
    this.tokenizer = new (options2.Tokenizer ?? Tokenizer)(this.options, this);
    this.foreignContext = [ForeignContext.None];
    (_b = (_a = this.cbs).onparserinit) == null ? void 0 : _b.call(_a, this);
  }
  // Tokenizer event handlers
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  ontext(start, endIndex) {
    var _a, _b;
    const data = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b = (_a = this.cbs).ontext) == null ? void 0 : _b.call(_a, data);
    this.startIndex = endIndex;
  }
  /**
   * @param cp Current Unicode code point.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  ontextentity(cp, endIndex) {
    var _a, _b;
    this.endIndex = endIndex - 1;
    (_b = (_a = this.cbs).ontext) == null ? void 0 : _b.call(_a, fromCodePoint(cp));
    this.startIndex = endIndex;
  }
  /** @internal */
  isInForeignContext() {
    return this.foreignContext[0] !== ForeignContext.None;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   * @param name Name of the pseudo selector.
   */
  isVoidElement(name) {
    return this.htmlMode && voidElements$1.has(name);
  }
  /**
   * Read a tag name from the buffer.
   *
   * When `lowerCaseTagNames` is enabled (the default in HTML mode), the name
   * is lowercased and may be adjusted for SVG casing or the `image` → `img`
   * alias.
   * @param start Start index of the tag name in the buffer.
   * @param endIndex End index of the tag name in the buffer.
   */
  readTagName(start, endIndex) {
    const name = this.lowerCaseTagNames ? this.getSlice(start, endIndex).toLowerCase() : this.getSlice(start, endIndex);
    if (!(this.lowerCaseTagNames && this.htmlMode)) {
      return name;
    }
    if (this.foreignContext[0] === ForeignContext.Svg) {
      return svgTagNameAdjustments.get(name) ?? name;
    }
    if (this.foreignContext.length > 1) {
      const adjusted = svgTagNameAdjustments.get(name);
      if (adjusted !== void 0 && this.stack.includes(adjusted)) {
        return adjusted;
      }
    }
    if (!this.isInForeignContext()) {
      return name === "image" ? "img" : name;
    }
    return name;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    this.emitOpenTag(this.readTagName(start, endIndex));
  }
  emitOpenTag(name) {
    var _a, _b;
    this.openTagStart = this.startIndex;
    this.tagname = name;
    if (this.htmlMode && name === "form" && this.stack.includes("form")) {
      this.tagname = "";
      return;
    }
    const impliesClose = this.htmlMode && openImpliesClose.get(name);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
        this.popElement(true);
      }
    }
    if (!this.isVoidElement(name)) {
      this.stack.unshift(name);
      if (this.htmlMode) {
        if (name === "svg") {
          this.foreignContext.unshift(ForeignContext.Svg);
        } else if (name === "math") {
          this.foreignContext.unshift(ForeignContext.MathML);
        } else if (htmlIntegrationElements.has(name)) {
          this.foreignContext.unshift(ForeignContext.None);
        }
      }
    }
    (_b = (_a = this.cbs).onopentagname) == null ? void 0 : _b.call(_a, name);
    if (this.cbs.onopentag)
      this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a, _b;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b = (_a = this.cbs).onopentag) == null ? void 0 : _b.call(_a, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  /**
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onclosetag(start, endIndex) {
    var _a, _b, _c, _d, _e, _f;
    this.endIndex = endIndex;
    const name = this.readTagName(start, endIndex);
    if (!this.isVoidElement(name)) {
      const pos = this.stack.indexOf(name);
      if (pos !== -1) {
        for (let index2 = 0; index2 < pos; index2++) {
          this.popElement(true);
        }
        this.popElement(false);
      } else if (this.htmlMode && name === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (this.htmlMode && name === "br") {
      (_b = (_a = this.cbs).onopentagname) == null ? void 0 : _b.call(_a, "br");
      (_d = (_c = this.cbs).onopentag) == null ? void 0 : _d.call(_c, "br", {}, true);
      (_f = (_e = this.cbs).onclosetag) == null ? void 0 : _f.call(_e, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  /**
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.recognizeSelfClosing || this.isInForeignContext()) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  /**
   * Pop the top element off the stack, emit a close event, and maintain
   * the foreign context stack.
   * @param implied Whether this close is implied (not from an explicit end tag).
   */
  popElement(implied) {
    var _a, _b;
    const element = this.stack.shift();
    if (this.htmlMode && (foreignContextElements.has(element) || htmlIntegrationElements.has(element))) {
      this.foreignContext.shift();
    }
    (_b = (_a = this.cbs).onclosetag) == null ? void 0 : _b.call(_a, element, implied);
  }
  closeCurrentTag(isOpenImplied) {
    const name = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[0] === name) {
      this.popElement(!isOpenImplied);
    }
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  /**
   * @param cp Current Unicode code point.
   * @internal
   */
  onattribentity(cp) {
    this.attribvalue += fromCodePoint(cp);
  }
  /**
   * @param quote Quote type used for the current attribute.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onattribend(quote, endIndex) {
    var _a, _b;
    this.endIndex = endIndex;
    (_b = (_a = this.cbs).onattribute) == null ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
    if (this.attribs && !Object.hasOwn(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index2 = value.search(reNameEnd);
    let name = index2 < 0 ? value : value.substr(0, index2);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    return name;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.htmlMode ? this.lowerCaseTagNames ? DOCUMENT_TYPE : value.slice(0, DOCUMENT_TYPE.length) : this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @param offset Offset applied when computing parser indices.
   * @internal
   */
  oncomment(start, endIndex, offset) {
    var _a, _b, _c, _d;
    this.endIndex = endIndex;
    (_b = (_a = this.cbs).oncomment) == null ? void 0 : _b.call(_a, this.getSlice(start, endIndex - offset));
    (_d = (_c = this.cbs).oncommentend) == null ? void 0 : _d.call(_c);
    this.startIndex = endIndex + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @param offset Offset applied when computing parser indices.
   * @internal
   */
  oncdata(start, endIndex, offset) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (!this.htmlMode || this.options.recognizeCDATA) {
      (_b = (_a = this.cbs).oncdatastart) == null ? void 0 : _b.call(_a);
      (_d = (_c = this.cbs).ontext) == null ? void 0 : _d.call(_c, value);
      (_f = (_e = this.cbs).oncdataend) == null ? void 0 : _f.call(_e);
    } else if (this.isInForeignContext()) {
      (_h = (_g = this.cbs).ontext) == null ? void 0 : _h.call(_g, value);
    } else {
      (_j = (_i = this.cbs).oncomment) == null ? void 0 : _j.call(_i, `[CDATA[${value}]]`);
      (_l = (_k = this.cbs).oncommentend) == null ? void 0 : _l.call(_k);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onend() {
    var _a, _b;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index2 = 0; index2 < this.stack.length; index2++) {
        this.cbs.onclosetag(this.stack[index2], true);
      }
    }
    (_b = (_a = this.cbs).onend) == null ? void 0 : _b.call(_a);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var _a, _b, _c, _d;
    (_b = (_a = this.cbs).onreset) == null ? void 0 : _b.call(_a);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d = (_c = this.cbs).onparserinit) == null ? void 0 : _d.call(_c, this);
    this.buffers.length = 0;
    this.foreignContext.length = 0;
    this.foreignContext.unshift(ForeignContext.None);
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   * @param data Document to parse.
   */
  parseComplete(data) {
    this.reset();
    this.end(data);
  }
  getSlice(start, end) {
    if (start === end) {
      return "";
    }
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
    while (end - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice += this.buffers[0].slice(0, end - this.bufferOffset);
    }
    return slice;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   * @param chunk Chunk to parse.
   */
  write(chunk) {
    var _a, _b;
    if (this.ended) {
      (_b = (_a = this.cbs).onerror) == null ? void 0 : _b.call(_a, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   * @param chunk Optional final chunk to parse.
   */
  end(chunk) {
    var _a, _b;
    if (this.ended) {
      (_b = (_a = this.cbs).onerror) == null ? void 0 : _b.call(_a, new Error(".end() after done!"));
      return;
    }
    if (chunk)
      this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended)
      this.tokenizer.end();
  }
};
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag$1(element) {
  return element.type === ElementType.Tag || element.type === ElementType.Script || element.type === ElementType.Style;
}
const Root$7 = ElementType.Root;
const Text$1 = ElementType.Text;
const Directive = ElementType.Directive;
const Comment$6 = ElementType.Comment;
const Script = ElementType.Script;
const Style = ElementType.Style;
const Tag = ElementType.Tag;
const CDATA$1 = ElementType.CDATA;
const Doctype = ElementType.Doctype;
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CDATA: CDATA$1,
  Comment: Comment$6,
  Directive,
  Doctype,
  get ElementType() {
    return ElementType;
  },
  Root: Root$7,
  Script,
  Style,
  Tag,
  Text: Text$1,
  isTag: isTag$1
}, Symbol.toStringTag, { value: "Module" }));
let Node$5 = class Node {
  constructor() {
    /** Parent of the node */
    __publicField(this, "parent", null);
    /** Previous sibling */
    __publicField(this, "prev", null);
    /** Next sibling */
    __publicField(this, "next", null);
    /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
    __publicField(this, "startIndex", null);
    /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
    __publicField(this, "endIndex", null);
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent) {
    this.parent = parent;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(previous) {
    this.prev = previous;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next) {
    this.next = next;
  }
  /**
   * Clone this node, and optionally its children.
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive = false) {
    return cloneNode$1(this, recursive);
  }
};
class DataNode extends Node$5 {
  /**
   * @param data The content of the data node
   */
  constructor(data) {
    super();
    __publicField(this, "data");
    this.data = data;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data) {
    this.data = data;
  }
}
class Text extends DataNode {
  constructor() {
    super(...arguments);
    __publicField(this, "type", ElementType.Text);
  }
  get nodeType() {
    return 3;
  }
}
let Comment$5 = class Comment extends DataNode {
  constructor() {
    super(...arguments);
    __publicField(this, "type", ElementType.Comment);
  }
  get nodeType() {
    return 8;
  }
};
class ProcessingInstruction extends DataNode {
  constructor(name, data) {
    super(data);
    __publicField(this, "type", ElementType.Directive);
    __publicField(this, "name");
    /** If this is a doctype, the document type name (parse5 only). */
    __publicField(this, "x-name");
    /** If this is a doctype, the document type public identifier (parse5 only). */
    __publicField(this, "x-publicId");
    /** If this is a doctype, the document type system identifier (parse5 only). */
    __publicField(this, "x-systemId");
    this.name = name;
  }
  get nodeType() {
    return 1;
  }
}
class NodeWithChildren extends Node$5 {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(children) {
    super();
    __publicField(this, "children");
    this.children = children;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    return this.children[0] ?? null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(children) {
    this.children = children;
  }
}
class CDATA extends NodeWithChildren {
  constructor() {
    super(...arguments);
    __publicField(this, "type", ElementType.CDATA);
  }
  get nodeType() {
    return 4;
  }
}
let Document$5 = class Document2 extends NodeWithChildren {
  constructor() {
    super(...arguments);
    __publicField(this, "type", ElementType.Root);
  }
  get nodeType() {
    return 9;
  }
};
let Element$1 = class Element2 extends NodeWithChildren {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   * @param type Node type used for the new node instance.
   */
  constructor(name, attribs, children = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
    super(children);
    __publicField(this, "name");
    __publicField(this, "attribs");
    __publicField(this, "type");
    /** Element namespace (parse5 only). */
    __publicField(this, "namespace");
    /** Element attribute namespaces (parse5 only). */
    __publicField(this, "x-attribsNamespace");
    /** Element attribute namespace-related prefixes (parse5 only). */
    __publicField(this, "x-attribsPrefix");
    this.name = name;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(name) {
    this.name = name;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name) => {
      var _a, _b;
      return {
        name,
        value: this.attribs[name],
        namespace: (_a = this["x-attribsNamespace"]) == null ? void 0 : _a[name],
        prefix: (_b = this["x-attribsPrefix"]) == null ? void 0 : _b[name]
      };
    });
  }
};
function isTag(node2) {
  return isTag$1(node2);
}
function isCDATA(node2) {
  return node2.type === ElementType.CDATA;
}
function isText(node2) {
  return node2.type === ElementType.Text;
}
function isComment(node2) {
  return node2.type === ElementType.Comment;
}
function isDirective(node2) {
  return node2.type === ElementType.Directive;
}
function isDocument(node2) {
  return node2.type === ElementType.Root;
}
function hasChildren(node2) {
  return Object.hasOwn(node2, "children");
}
function cloneNode$1(node2, recursive = false) {
  let result2;
  if (isText(node2)) {
    result2 = new Text(node2.data);
  } else if (isComment(node2)) {
    result2 = new Comment$5(node2.data);
  } else if (isTag(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Element$1(node2.name, { ...node2.attribs }, children);
    for (const child of children) {
      child.parent = clone;
    }
    if (node2.namespace != null) {
      clone.namespace = node2.namespace;
    }
    if (node2["x-attribsNamespace"]) {
      clone["x-attribsNamespace"] = { ...node2["x-attribsNamespace"] };
    }
    if (node2["x-attribsPrefix"]) {
      clone["x-attribsPrefix"] = { ...node2["x-attribsPrefix"] };
    }
    result2 = clone;
  } else if (isCDATA(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new CDATA(children);
    for (const child of children) {
      child.parent = clone;
    }
    result2 = clone;
  } else if (isDocument(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Document$5(children);
    for (const child of children) {
      child.parent = clone;
    }
    if (node2["x-mode"]) {
      clone["x-mode"] = node2["x-mode"];
    }
    result2 = clone;
  } else if (isDirective(node2)) {
    const instruction = new ProcessingInstruction(node2.name, node2.data);
    if (node2["x-name"] != null) {
      instruction["x-name"] = node2["x-name"];
      instruction["x-publicId"] = node2["x-publicId"];
      instruction["x-systemId"] = node2["x-systemId"];
    }
    result2 = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node2.type}`);
  }
  result2.startIndex = node2.startIndex;
  result2.endIndex = node2.endIndex;
  if (node2.sourceCodeLocation != null) {
    result2.sourceCodeLocation = node2.sourceCodeLocation;
  }
  return result2;
}
function cloneChildren(childs) {
  const children = childs.map((child) => cloneNode$1(child, true));
  for (let index2 = 1; index2 < children.length; index2++) {
    children[index2].prev = children[index2 - 1];
    children[index2 - 1].next = children[index2];
  }
  return children;
}
const defaultOptions = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};
class DomHandler {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(callback, options2, elementCB) {
    /** The elements of the DOM */
    __publicField(this, "dom", []);
    /** The root element for the DOM */
    __publicField(this, "root", new Document$5(this.dom));
    /** Called once parsing has completed. */
    __publicField(this, "callback");
    /** Settings for the handler. */
    __publicField(this, "options");
    /** Callback whenever a tag is closed. */
    __publicField(this, "elementCB");
    /** Indicated whether parsing has been completed. */
    __publicField(this, "done", false);
    /** Stack of open tags. */
    __publicField(this, "tagStack", [this.root]);
    /** A data node that is still being written to. */
    __publicField(this, "lastNode", null);
    /** Reference to the parser instance. Used for location information. */
    __publicField(this, "parser", null);
    if (typeof options2 === "function") {
      elementCB = options2;
      options2 = defaultOptions;
    }
    if (typeof callback === "object") {
      options2 = callback;
      callback = void 0;
    }
    this.callback = callback ?? null;
    this.options = options2 ?? defaultOptions;
    this.elementCB = elementCB ?? null;
  }
  onparserinit(parser2) {
    this.parser = parser2;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [];
    this.root = new Document$5(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    if (this.done)
      return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const element = this.tagStack.pop();
    if (this.options.withEndIndices && this.parser) {
      element.endIndex = this.parser.endIndex;
    }
    if (this.elementCB)
      this.elementCB(element);
  }
  onopentag(name, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : void 0;
    const element = new Element$1(name, attribs, void 0, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data;
      if (this.options.withEndIndices && this.parser) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node2 = new Text(data);
      this.addNode(node2);
      this.lastNode = node2;
    }
  }
  oncomment(data) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data;
      return;
    }
    const node2 = new Comment$5(data);
    this.addNode(node2);
    this.lastNode = node2;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text = new Text("");
    const node2 = new CDATA([text]);
    this.addNode(node2);
    text.parent = node2;
    this.lastNode = text;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name, data) {
    const node2 = new ProcessingInstruction(name, data);
    this.addNode(node2);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node2) {
    const parent = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent.children[parent.children.length - 1];
    if (this.options.withStartIndices && this.parser) {
      node2.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices && this.parser) {
      node2.endIndex = this.parser.endIndex;
    }
    parent.children.push(node2);
    if (previousSibling) {
      node2.prev = previousSibling;
      previousSibling.next = node2;
    }
    node2.parent = parent;
    this.lastNode = null;
  }
}
function filter$1(test, node2, recurse = true, limit = Number.POSITIVE_INFINITY) {
  return find(test, Array.isArray(node2) ? node2 : [node2], recurse, limit);
}
function find(test, nodes, recurse, limit) {
  const result2 = [];
  const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (indexStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const element = nodeStack[0][indexStack[0]++];
    if (test(element)) {
      result2.push(element);
      if (--limit <= 0)
        return result2;
    }
    if (recurse && hasChildren(element) && element.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(element.children);
    }
  }
}
function findOne(test, nodes, recurse = true) {
  const searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
  for (const node2 of searchedNodes) {
    if (isTag(node2) && test(node2)) {
      return node2;
    }
    if (recurse && hasChildren(node2) && node2.children.length > 0) {
      const found = findOne(test, node2.children, true);
      if (found)
        return found;
    }
  }
  return null;
}
function existsOne(test, nodes) {
  return (Array.isArray(nodes) ? nodes : [nodes]).some((node2) => isTag(node2) && test(node2) || hasChildren(node2) && existsOne(test, node2.children));
}
function findAll(test, nodes) {
  const result2 = [];
  const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const element = nodeStack[0][indexStack[0]++];
    if (isTag(element) && test(element))
      result2.push(element);
    if (hasChildren(element) && element.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(element.children);
    }
  }
}
const Checks = {
  tag_name(name) {
    if (typeof name === "function") {
      return (element) => isTag(element) && name(element.name);
    }
    if (name === "*") {
      return isTag;
    }
    return (element) => isTag(element) && element.name === name;
  },
  tag_type(type) {
    if (typeof type === "function") {
      return (element) => type(element.type);
    }
    return (element) => element.type === type;
  },
  tag_contains(data) {
    if (typeof data === "function") {
      return (element) => isText(element) && data(element.data);
    }
    return (element) => isText(element) && element.data === data;
  }
};
function getAttribCheck(attrib, value) {
  if (typeof value === "function") {
    return (element) => isTag(element) && value(element.attribs[attrib]);
  }
  return (element) => isTag(element) && element.attribs[attrib] === value;
}
function combineFuncs(a, b) {
  return (element) => a(element) || b(element);
}
function compileTest(options2) {
  const funcs = Object.keys(options2).map((key) => {
    const value = options2[key];
    return Object.hasOwn(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
  });
  return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options2, node2) {
  const test = compileTest(options2);
  return test ? test(node2) : true;
}
function getElements(options2, nodes, recurse, limit = Number.POSITIVE_INFINITY) {
  const test = compileTest(options2);
  return test ? filter$1(test, nodes, recurse, limit) : [];
}
function getElementById(id2, nodes, recurse = true) {
  if (!Array.isArray(nodes))
    nodes = [nodes];
  return findOne(getAttribCheck("id", id2), nodes, recurse);
}
function getElementsByTagName(tagName, nodes, recurse = true, limit = Number.POSITIVE_INFINITY) {
  return filter$1(Checks["tag_name"](tagName), nodes, recurse, limit);
}
function getElementsByClassName(className, nodes, recurse = true, limit = Number.POSITIVE_INFINITY) {
  return filter$1(getAttribCheck("class", className), nodes, recurse, limit);
}
function getElementsByTagType(type, nodes, recurse = true, limit = Number.POSITIVE_INFINITY) {
  return filter$1(Checks["tag_type"](type), nodes, recurse, limit);
}
function getEscape(char) {
  return char === 34 ? "&quot;" : char === 38 ? "&amp;" : char === 39 ? "&apos;" : char === 60 ? "&lt;" : char === 62 ? "&gt;" : "&nbsp;";
}
const XML_BITSET_VALUE = 1342177476;
const xmlEncodeRegex = /["&'<>\u0080-\uFFFF]/g;
function isXmlEscapable(code) {
  return code >= 128 || code >= 32 && code < 64 && (XML_BITSET_VALUE >>> code & 1) === 1;
}
function encodeXML(input2) {
  const { length } = input2;
  let out;
  let last = 0;
  let index2 = 0;
  while (index2 < length) {
    const char = input2.charCodeAt(index2);
    if (!isXmlEscapable(char)) {
      const bound = Math.min(index2 + 32, length);
      let next = index2 + 1;
      while (next < bound && !isXmlEscapable(input2.charCodeAt(next))) {
        next++;
      }
      if (next < bound) {
        index2 = next;
        continue;
      }
      if (next >= length)
        break;
      xmlEncodeRegex.lastIndex = next;
      if (!xmlEncodeRegex.test(input2))
        break;
      index2 = xmlEncodeRegex.lastIndex - 1;
      continue;
    }
    if (out === void 0)
      out = input2.substring(0, index2);
    else if (last !== index2)
      out += input2.substring(last, index2);
    if (char < 64) {
      out += getEscape(char);
      last = index2 += 1;
      continue;
    }
    const cp = input2.codePointAt(index2);
    out += `&#x${cp.toString(16)};`;
    if (cp !== char)
      index2++;
    last = index2 += 1;
  }
  if (out === void 0)
    return input2;
  if (last < length)
    out += input2.substr(last);
  return out;
}
function escapeWithRegex(re2, data) {
  re2.lastIndex = 0;
  if (!re2.test(data))
    return data;
  let out = "";
  let last = 0;
  do {
    const index2 = re2.lastIndex - 1;
    if (last !== index2)
      out += data.substring(last, index2);
    const char = data.charCodeAt(index2);
    out += getEscape(char);
    last = index2 + 1;
  } while (re2.test(data));
  return out + data.substring(last);
}
const attributeEscapeRegex = /["&\u{A0}]/gu;
function escapeAttribute(data) {
  return escapeWithRegex(attributeEscapeRegex, data);
}
const textEscapeRegex = /[&<>\u{A0}]/gu;
function escapeText(data) {
  return escapeWithRegex(textEscapeRegex, data);
}
const elementNames = new Map("altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath".split(" ").map((name) => [name.toLowerCase(), name]));
const attributeNames = new Map("definitionURL attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits diffuseConstant edgeMode filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" ").map((name) => [name.toLowerCase(), name]));
const unencodedElements = new Set("style script xmp iframe noembed noframes plaintext noscript".split(" "));
const voidElements = new Set("area base basefont br col command embed frame hr img input isindex keygen link meta param source track wbr".split(" "));
const foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
const foreignModeIntegrationPoints = new Set("mi mo mn ms mtext annotation-xml foreignObject desc title".split(" "));
function render(node2, options2 = {}) {
  const nodes = "length" in node2 ? node2 : [node2];
  const xmlMode = options2.xmlMode ?? false;
  let output = "";
  for (let index2 = 0; index2 < nodes.length; index2++) {
    output += renderNode(nodes[index2], options2, xmlMode);
  }
  return output;
}
function renderChildren(children, options2, xmlMode) {
  let output = "";
  for (let index2 = 0; index2 < children.length; index2++) {
    output += renderNode(children[index2], options2, xmlMode);
  }
  return output;
}
function renderNode(node2, options2, xmlMode) {
  switch (node2.type) {
    case Root$7: {
      return renderChildren(node2.children, options2, xmlMode);
    }
    case Directive: {
      return `<${node2.data}>`;
    }
    case Comment$6: {
      return `<!--${node2.data}-->`;
    }
    case CDATA$1: {
      return `<![CDATA[${node2.children[0].data}]]>`;
    }
    case Script:
    case Style:
    case Tag: {
      return renderTag(node2, options2, xmlMode);
    }
    case Text$1: {
      const element = node2;
      const data = element.data || "";
      if ((options2.encodeEntities ?? options2.decodeEntities) !== false && !(!xmlMode && element.parent && unencodedElements.has(element.parent.name))) {
        return xmlMode || options2.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
      }
      return data;
    }
  }
}
function renderTag(element, options2, xmlMode) {
  if (xmlMode === "foreign") {
    element.name = elementNames.get(element.name) ?? element.name;
    if (element.parent && foreignModeIntegrationPoints.has(element.parent.name)) {
      xmlMode = false;
    }
  }
  if (!xmlMode && foreignElements.has(element.name)) {
    xmlMode = "foreign";
  }
  const { name, children } = element;
  const isVoid = !xmlMode && voidElements.has(name);
  let tag = `<${name}${formatAttributes(element.attribs, options2, xmlMode)}`;
  if (children.length === 0 && (xmlMode ? options2.selfClosingTags !== false : options2.selfClosingTags && isVoid)) {
    tag += xmlMode ? "/>" : " />";
  } else {
    tag += ">";
    if (children.length > 0) {
      tag += renderChildren(children, options2, xmlMode);
    }
    if (!isVoid) {
      tag += `</${name}>`;
    }
  }
  return tag;
}
function replaceQuotes(value) {
  return value.replaceAll('"', "&quot;");
}
function formatAttributes(attributes, options2, xmlMode) {
  if (!attributes)
    return "";
  const encode = (options2.encodeEntities ?? options2.decodeEntities) === false ? replaceQuotes : xmlMode || options2.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  const isForeign = xmlMode === "foreign";
  const showEmpty = !!(options2.emptyAttrs ?? xmlMode);
  let result2 = "";
  for (const key in attributes) {
    if (!Object.hasOwn(attributes, key))
      continue;
    const value = attributes[key];
    const k2 = isForeign ? attributeNames.get(key) ?? key : key;
    result2 += !showEmpty && (value == null || value === "") ? ` ${k2}` : ` ${k2}="${encode(value == null ? "" : String(value))}"`;
  }
  return result2;
}
function getOuterHTML(node2, options2) {
  return render(node2, options2);
}
function getInnerHTML(node2, options2) {
  return hasChildren(node2) ? node2.children.map((node3) => getOuterHTML(node3, options2)).join("") : "";
}
function getText(node2) {
  if (Array.isArray(node2))
    return node2.map(getText).join("");
  if (isTag(node2))
    return node2.name === "br" ? "\n" : getText(node2.children);
  if (isCDATA(node2))
    return getText(node2.children);
  if (isText(node2))
    return node2.data;
  return "";
}
function textContent(node2) {
  if (Array.isArray(node2))
    return node2.map(textContent).join("");
  if (hasChildren(node2) && !isComment(node2)) {
    return textContent(node2.children);
  }
  if (isText(node2))
    return node2.data;
  return "";
}
function innerText(node2) {
  if (Array.isArray(node2))
    return node2.map(innerText).join("");
  if (hasChildren(node2) && (node2.type === ElementType.Tag || isCDATA(node2))) {
    return innerText(node2.children);
  }
  if (isText(node2))
    return node2.data;
  return "";
}
function getFeed(document2) {
  const feedRoot = getOneElement(isValidFeed, document2);
  return feedRoot ? feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot) : null;
}
function getAtomFeed(feedRoot) {
  var _a;
  const childs = feedRoot.children;
  const feed = {
    type: "atom",
    items: getElementsByTagName("entry", childs).map((item) => {
      var _a2;
      const { children } = item;
      const entry = { media: getMediaElements(children) };
      addConditionally(entry, "id", "id", children);
      addConditionally(entry, "title", "title", children);
      const href2 = (_a2 = getOneElement("link", children)) == null ? void 0 : _a2.attribs["href"];
      if (href2) {
        entry.link = href2;
      }
      const description = fetch$1("summary", children) || fetch$1("content", children);
      if (description) {
        entry.description = description;
      }
      const pubDate = fetch$1("updated", children);
      if (pubDate) {
        entry.pubDate = new Date(pubDate);
      }
      return entry;
    })
  };
  addConditionally(feed, "id", "id", childs);
  addConditionally(feed, "title", "title", childs);
  const href = (_a = getOneElement("link", childs)) == null ? void 0 : _a.attribs["href"];
  if (href) {
    feed.link = href;
  }
  addConditionally(feed, "description", "subtitle", childs);
  const updated = fetch$1("updated", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "email", childs, true);
  return feed;
}
function getRssFeed(feedRoot) {
  var _a;
  const childs = ((_a = getOneElement("channel", feedRoot.children)) == null ? void 0 : _a.children) ?? [];
  const feed = {
    type: feedRoot.name.substr(0, 3),
    id: "",
    items: getElementsByTagName("item", feedRoot.children).map((item) => {
      const { children } = item;
      const entry = { media: getMediaElements(children) };
      addConditionally(entry, "id", "guid", children);
      addConditionally(entry, "title", "title", children);
      addConditionally(entry, "link", "link", children);
      addConditionally(entry, "description", "description", children);
      const pubDate = fetch$1("pubDate", children) || fetch$1("dc:date", children);
      if (pubDate)
        entry.pubDate = new Date(pubDate);
      return entry;
    })
  };
  addConditionally(feed, "title", "title", childs);
  addConditionally(feed, "link", "link", childs);
  addConditionally(feed, "description", "description", childs);
  const updated = fetch$1("lastBuildDate", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "managingEditor", childs, true);
  return feed;
}
const MEDIA_KEYS_STRING = ["url", "type", "lang"];
const MEDIA_KEYS_INT = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function getMediaElements(where) {
  return getElementsByTagName("media:content", where).map((element) => {
    const { attribs } = element;
    const media = {
      medium: attribs["medium"],
      isDefault: !!attribs["isDefault"]
    };
    for (const attrib of MEDIA_KEYS_STRING) {
      if (attribs[attrib]) {
        media[attrib] = attribs[attrib];
      }
    }
    for (const attrib of MEDIA_KEYS_INT) {
      if (attribs[attrib]) {
        media[attrib] = Number.parseInt(attribs[attrib], 10);
      }
    }
    if (attribs["expression"]) {
      media.expression = attribs["expression"];
    }
    return media;
  });
}
function getOneElement(tagName, node2) {
  return getElementsByTagName(tagName, node2, true, 1)[0];
}
function fetch$1(tagName, where, recurse = false) {
  return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
}
function addConditionally(object2, property, tagName, where, recurse = false) {
  const value = fetch$1(tagName, where, recurse);
  if (value)
    object2[property] = value;
}
function isValidFeed(value) {
  return value === "rss" || value === "feed" || value === "rdf:RDF";
}
function removeSubsets(nodes) {
  let index2 = nodes.length;
  while (--index2 >= 0) {
    const node2 = nodes[index2];
    if (index2 > 0 && nodes.lastIndexOf(node2, index2 - 1) >= 0) {
      nodes.splice(index2, 1);
      continue;
    }
    for (let ancestor = node2.parent; ancestor; ancestor = ancestor.parent) {
      if (nodes.includes(ancestor)) {
        nodes.splice(index2, 1);
        break;
      }
    }
  }
  return nodes;
}
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
function compareDocumentPosition(nodeA, nodeB) {
  const aParents = [];
  const bParents = [];
  if (nodeA === nodeB) {
    return 0;
  }
  let current2 = hasChildren(nodeA) ? nodeA : nodeA.parent;
  while (current2) {
    aParents.unshift(current2);
    current2 = current2.parent;
  }
  current2 = hasChildren(nodeB) ? nodeB : nodeB.parent;
  while (current2) {
    bParents.unshift(current2);
    current2 = current2.parent;
  }
  const maxIndex = Math.min(aParents.length, bParents.length);
  let index2 = 0;
  while (index2 < maxIndex && aParents[index2] === bParents[index2]) {
    index2++;
  }
  if (index2 === 0) {
    return DocumentPosition.DISCONNECTED;
  }
  const sharedParent = aParents[index2 - 1];
  const siblings = sharedParent.children;
  const aSibling = aParents[index2];
  const bSibling = bParents[index2];
  if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
    if (sharedParent === nodeB) {
      return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
    }
    return DocumentPosition.FOLLOWING;
  }
  if (sharedParent === nodeA) {
    return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
  }
  return DocumentPosition.PRECEDING;
}
function uniqueSort(nodes) {
  nodes = nodes.filter((node2, index2, array2) => !array2.includes(node2, index2 + 1));
  nodes.sort((a, b) => {
    const relative2 = compareDocumentPosition(a, b);
    if (relative2 & DocumentPosition.PRECEDING) {
      return -1;
    }
    if (relative2 & DocumentPosition.FOLLOWING) {
      return 1;
    }
    return 0;
  });
  return nodes;
}
function removeElement(element) {
  if (element.prev)
    element.prev.next = element.next;
  if (element.next)
    element.next.prev = element.prev;
  if (element.parent) {
    const childs = element.parent.children;
    const childsIndex = childs.lastIndexOf(element);
    if (childsIndex !== -1) {
      childs.splice(childsIndex, 1);
    }
  }
  element.next = null;
  element.prev = null;
  element.parent = null;
}
function replaceElement(element, replacement) {
  replacement.prev = element.prev;
  if (replacement.prev) {
    replacement.prev.next = replacement;
  }
  replacement.next = element.next;
  if (replacement.next) {
    replacement.next.prev = replacement;
  }
  replacement.parent = element.parent;
  if (replacement.parent) {
    const { children } = replacement.parent;
    const elementIndex = children.lastIndexOf(element);
    if (elementIndex === -1) {
      return;
    }
    children[elementIndex] = replacement;
    element.parent = null;
  }
}
function appendChild(parent, child) {
  removeElement(child);
  child.next = null;
  child.parent = parent;
  if (parent.children.push(child) > 1) {
    const sibling = parent.children[parent.children.length - 2];
    sibling.next = child;
    child.prev = sibling;
  } else {
    child.prev = null;
  }
}
function append(element, next) {
  removeElement(next);
  const { parent } = element;
  const currentNext = element.next;
  next.next = currentNext;
  next.prev = element;
  element.next = next;
  next.parent = parent;
  if (currentNext) {
    currentNext.prev = next;
    if (parent) {
      const childs = parent.children;
      childs.splice(childs.lastIndexOf(currentNext), 0, next);
    }
  } else if (parent) {
    parent.children.push(next);
  }
}
function prependChild(parent, child) {
  removeElement(child);
  child.parent = parent;
  child.prev = null;
  if (parent.children.unshift(child) === 1) {
    child.next = null;
  } else {
    const sibling = parent.children[1];
    sibling.prev = child;
    child.next = sibling;
  }
}
function prepend(element, previous) {
  removeElement(previous);
  const { parent } = element;
  if (parent) {
    const childs = parent.children;
    childs.splice(childs.indexOf(element), 0, previous);
  }
  if (element.prev) {
    element.prev.next = previous;
  }
  previous.parent = parent;
  previous.prev = element.prev;
  previous.next = element;
  element.prev = previous;
}
function getChildren(element) {
  return hasChildren(element) ? element.children : [];
}
function getParent(element) {
  return element.parent || null;
}
function getSiblings(element) {
  const parent = getParent(element);
  if (parent != null)
    return getChildren(parent);
  const siblings = [element];
  let { prev, next } = element;
  while (prev != null) {
    siblings.unshift(prev);
    ({ prev } = prev);
  }
  while (next != null) {
    siblings.push(next);
    ({ next } = next);
  }
  return siblings;
}
function getAttributeValue(element, name) {
  const { attribs } = element;
  return attribs == null ? void 0 : attribs[name];
}
function hasAttrib(element, name) {
  const { attribs } = element;
  return attribs != null && Object.hasOwn(attribs, name) && attribs[name] != null;
}
function getName(element) {
  return element.name;
}
function nextElementSibling(element) {
  let { next } = element;
  while (next !== null && !isTag(next))
    ({ next } = next);
  return next;
}
function prevElementSibling(element) {
  let { prev } = element;
  while (prev !== null && !isTag(prev))
    ({ prev } = prev);
  return prev;
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return DocumentPosition;
  },
  append,
  appendChild,
  compareDocumentPosition,
  existsOne,
  filter: filter$1,
  find,
  findAll,
  findOne,
  getAttributeValue,
  getChildren,
  getElementById,
  getElements,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagType,
  getFeed,
  getInnerHTML,
  getName,
  getOuterHTML,
  getParent,
  getSiblings,
  getText,
  hasAttrib,
  innerText,
  nextElementSibling,
  prepend,
  prependChild,
  prevElementSibling,
  removeElement,
  removeSubsets,
  replaceElement,
  testElement,
  textContent,
  uniqueSort
}, Symbol.toStringTag, { value: "Module" }));
function parseDocument(data, options2) {
  const handler = new DomHandler(void 0, options2);
  new Parser$2(handler, options2).end(data);
  return handler.root;
}
function createDocumentStream(callback, options2, elementCallback) {
  const handler = new DomHandler((error) => callback(error, handler.root), options2, elementCallback);
  return new Parser$2(handler, options2);
}
const parseFeedDefaultOptions = { xmlMode: true };
function parseFeed(feed, options2 = parseFeedDefaultOptions) {
  return getFeed(parseDocument(feed, options2).children);
}
const dist = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DefaultHandler: DomHandler,
  DomHandler,
  DomUtils: index,
  ElementType: index$1,
  Parser: Parser$2,
  get QuoteType() {
    return QuoteType;
  },
  Tokenizer,
  createDocumentStream,
  getFeed,
  parseDocument,
  parseFeed
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(dist);
var escapeStringRegexp$1 = (string2) => {
  if (typeof string2 !== "string") {
    throw new TypeError("Expected a string");
  }
  return string2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
};
var isPlainObject$2 = {};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject$1(o) {
  var ctor, prot;
  if (isObject(o) === false) return false;
  ctor = o.constructor;
  if (ctor === void 0) return true;
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
isPlainObject$2.isPlainObject = isPlainObject$1;
var parseSrcset$1 = { exports: {} };
(function(module) {
  (function(root2, factory) {
    if (module.exports) {
      module.exports = factory();
    } else {
      root2.parseSrcset = factory();
    }
  })(commonjsGlobal, function() {
    return function(input2) {
      function isSpace(c2) {
        return c2 === " " || // space
        c2 === "	" || // horizontal tab
        c2 === "\n" || // new line
        c2 === "\f" || // form feed
        c2 === "\r";
      }
      function collectCharacters(regEx) {
        var chars, match = regEx.exec(input2.substring(pos));
        if (match) {
          chars = match[0];
          pos += chars.length;
          return chars;
        }
      }
      var inputLength = input2.length, regexLeadingSpaces = /^[ \t\n\r\u000c]+/, regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/, regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/, regexTrailingCommas = /[,]+$/, regexNonNegativeInteger = /^\d+$/, regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, url, descriptors, currentDescriptor, state, c, pos = 0, candidates = [];
      while (true) {
        collectCharacters(regexLeadingCommasOrSpaces);
        if (pos >= inputLength) {
          return candidates;
        }
        url = collectCharacters(regexLeadingNotSpaces);
        descriptors = [];
        if (url.slice(-1) === ",") {
          url = url.replace(regexTrailingCommas, "");
          parseDescriptors();
        } else {
          tokenize2();
        }
      }
      function tokenize2() {
        collectCharacters(regexLeadingSpaces);
        currentDescriptor = "";
        state = "in descriptor";
        while (true) {
          c = input2.charAt(pos);
          if (state === "in descriptor") {
            if (isSpace(c)) {
              if (currentDescriptor) {
                descriptors.push(currentDescriptor);
                currentDescriptor = "";
                state = "after descriptor";
              }
            } else if (c === ",") {
              pos += 1;
              if (currentDescriptor) {
                descriptors.push(currentDescriptor);
              }
              parseDescriptors();
              return;
            } else if (c === "(") {
              currentDescriptor = currentDescriptor + c;
              state = "in parens";
            } else if (c === "") {
              if (currentDescriptor) {
                descriptors.push(currentDescriptor);
              }
              parseDescriptors();
              return;
            } else {
              currentDescriptor = currentDescriptor + c;
            }
          } else if (state === "in parens") {
            if (c === ")") {
              currentDescriptor = currentDescriptor + c;
              state = "in descriptor";
            } else if (c === "") {
              descriptors.push(currentDescriptor);
              parseDescriptors();
              return;
            } else {
              currentDescriptor = currentDescriptor + c;
            }
          } else if (state === "after descriptor") {
            if (isSpace(c)) ;
            else if (c === "") {
              parseDescriptors();
              return;
            } else {
              state = "in descriptor";
              pos -= 1;
            }
          }
          pos += 1;
        }
      }
      function parseDescriptors() {
        var pError = false, w2, d, h, i, candidate = {}, desc, lastChar, value, intVal, floatVal;
        for (i = 0; i < descriptors.length; i++) {
          desc = descriptors[i];
          lastChar = desc[desc.length - 1];
          value = desc.substring(0, desc.length - 1);
          intVal = parseInt(value, 10);
          floatVal = parseFloat(value);
          if (regexNonNegativeInteger.test(value) && lastChar === "w") {
            if (w2 || d) {
              pError = true;
            }
            if (intVal === 0) {
              pError = true;
            } else {
              w2 = intVal;
            }
          } else if (regexFloatingPoint.test(value) && lastChar === "x") {
            if (w2 || d || h) {
              pError = true;
            }
            if (floatVal < 0) {
              pError = true;
            } else {
              d = floatVal;
            }
          } else if (regexNonNegativeInteger.test(value) && lastChar === "h") {
            if (h || d) {
              pError = true;
            }
            if (intVal === 0) {
              pError = true;
            } else {
              h = intVal;
            }
          } else {
            pError = true;
          }
        }
        if (!pError) {
          candidate.url = url;
          if (w2) {
            candidate.w = w2;
          }
          if (d) {
            candidate.d = d;
          }
          if (h) {
            candidate.h = h;
          }
          candidates.push(candidate);
        } else if (console && console.log) {
          console.log("Invalid srcset descriptor found in '" + input2 + "' at '" + desc + "'.");
        }
      }
    };
  });
})(parseSrcset$1);
var parseSrcsetExports = parseSrcset$1.exports;
var picocolors_browser = { exports: {} };
var x = String;
var create = function() {
  return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x, blackBright: x, redBright: x, greenBright: x, yellowBright: x, blueBright: x, magentaBright: x, cyanBright: x, whiteBright: x, bgBlackBright: x, bgRedBright: x, bgGreenBright: x, bgYellowBright: x, bgBlueBright: x, bgMagentaBright: x, bgCyanBright: x, bgWhiteBright: x };
};
picocolors_browser.exports = create();
picocolors_browser.exports.createColors = create;
var picocolors_browserExports = picocolors_browser.exports;
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
let pico = picocolors_browserExports;
let terminalHighlight$1 = require$$2;
let CssSyntaxError$3 = class CssSyntaxError extends Error {
  constructor(message, line, column, source, file, plugin2) {
    super(message);
    this.name = "CssSyntaxError";
    this.reason = message;
    if (file) {
      this.file = file;
    }
    if (source) {
      this.source = source;
    }
    if (plugin2) {
      this.plugin = plugin2;
    }
    if (typeof line !== "undefined" && typeof column !== "undefined") {
      if (typeof line === "number") {
        this.line = line;
        this.column = column;
      } else {
        this.line = line.line;
        this.column = line.column;
        this.endLine = column.line;
        this.endColumn = column.column;
      }
    }
    this.setMessage();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CssSyntaxError);
    }
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "";
    this.message += this.file ? this.file : "<css input>";
    if (typeof this.line !== "undefined") {
      this.message += ":" + this.line + ":" + this.column;
    }
    this.message += ": " + this.reason;
  }
  showSourceCode(color) {
    if (!this.source) return "";
    let css = this.source;
    if (color == null) color = pico.isColorSupported;
    let aside = (text) => text;
    let mark = (text) => text;
    let highlight = (text) => text;
    if (color) {
      let { bold, gray, red } = pico.createColors(true);
      mark = (text) => bold(red(text));
      aside = (text) => gray(text);
      if (terminalHighlight$1) {
        highlight = (text) => terminalHighlight$1(text);
      }
    }
    let lines = css.split(/\r?\n/);
    let start = Math.max(this.line - 3, 0);
    let end = Math.min(this.line + 2, lines.length);
    let maxWidth = String(end).length;
    return lines.slice(start, end).map((line, index2) => {
      let number2 = start + 1 + index2;
      let gutter = " " + (" " + number2).slice(-maxWidth) + " | ";
      if (number2 === this.line) {
        if (line.length > 160) {
          let padding = 20;
          let subLineStart = Math.max(0, this.column - padding);
          let subLineEnd = Math.max(
            this.column + padding,
            this.endColumn + padding
          );
          let subLine = line.slice(subLineStart, subLineEnd);
          let spacing2 = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, padding - 1)).replace(/[^\t]/g, " ");
          return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing2 + mark("^");
        }
        let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
      }
      return " " + aside(gutter) + highlight(line);
    }).join("\n");
  }
  toString() {
    let code = this.showSourceCode();
    if (code) {
      code = "\n\n" + code + "\n";
    }
    return this.name + ": " + this.message + code;
  }
};
var cssSyntaxError = CssSyntaxError$3;
CssSyntaxError$3.default = CssSyntaxError$3;
const AT_NAME_END = /[\t\n\f\r "#'()/;[\\\]{}]/;
const DEFAULT_RAW = {
  after: "\n",
  beforeClose: "\n",
  beforeComment: "\n",
  beforeDecl: "\n",
  beforeOpen: " ",
  beforeRule: "\n",
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: false
};
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function atruleStart(str, node2) {
  let name = "@" + node2.name;
  let params = node2.params ? str.rawValue(node2, "params") : "";
  let afterName = node2.raws.afterName;
  if (typeof afterName === "undefined") {
    afterName = params ? " " : "";
  } else if (afterName === "" && params && !AT_NAME_END.test(params[0])) {
    afterName = " ";
  }
  return name + afterName + params;
}
function isCustomProperty(node2) {
  if (!node2.prop.startsWith("--")) return false;
  let before = node2.raws.before;
  return typeof before === "undefined" || !/[^\s;]$/.test(before);
}
function pushBody(str, stack, node2) {
  let nodes = node2.nodes;
  let last = nodes.length - 1;
  while (last > 0) {
    if (nodes[last].type !== "comment") break;
    last -= 1;
  }
  let semicolon = str.raw(node2, "semicolon");
  let isDocument2 = node2.type === "document";
  for (let i = nodes.length - 1; i >= 0; i--) {
    let child = nodes[i];
    let childSemicolon = last !== i || semicolon;
    if (!childSemicolon && i < nodes.length - 1 && (child.type === "atrule" && !child.nodes || child.type === "decl" && isCustomProperty(child))) {
      childSemicolon = true;
    }
    stack.push({
      document: isDocument2,
      node: child,
      semicolon: childSemicolon
    });
  }
}
function pushBlock(str, stack, node2, start) {
  let between = str.raw(node2, "between", "beforeOpen");
  str.builder(start + between + "{", node2, "start");
  let hasNodes = node2.nodes && node2.nodes.length;
  let close = () => {
    let after = hasNodes ? str.raw(node2, "after") : str.raw(node2, "after", "emptyBody");
    if (after) str.builder(after);
    str.builder("}", node2, "end");
    if (node2.type === "rule" && node2.raws.ownSemicolon) {
      str.builder(node2.raws.ownSemicolon, node2, "end");
    }
  };
  if (hasNodes) {
    stack.push(close);
    pushBody(str, stack, node2);
  } else {
    close();
  }
}
let Stringifier$2 = class Stringifier {
  constructor(builder) {
    this.builder = builder;
  }
  atrule(node2, semicolon) {
    let start = atruleStart(this, node2);
    if (node2.nodes) {
      this.block(node2, start);
    } else {
      let end = (node2.raws.between || "") + (semicolon ? ";" : "");
      this.builder(start + end, node2);
    }
  }
  beforeAfter(node2, detect) {
    let value;
    if (node2.type === "decl") {
      value = this.raw(node2, null, "beforeDecl");
    } else if (node2.type === "comment") {
      value = this.raw(node2, null, "beforeComment");
    } else if (detect === "before") {
      value = this.raw(node2, null, "beforeRule");
    } else {
      value = this.raw(node2, null, "beforeClose");
    }
    let buf = node2.parent;
    let depth = 0;
    while (buf && buf.type !== "root") {
      depth += 1;
      buf = buf.parent;
    }
    if (value.includes("\n")) {
      let indent = this.raw(node2, null, "indent");
      if (indent.length) {
        for (let step = 0; step < depth; step++) value += indent;
      }
    }
    return value;
  }
  block(node2, start) {
    let between = this.raw(node2, "between", "beforeOpen");
    this.builder(start + between + "{", node2, "start");
    let after;
    if (node2.nodes && node2.nodes.length) {
      this.body(node2);
      after = this.raw(node2, "after");
    } else {
      after = this.raw(node2, "after", "emptyBody");
    }
    if (after) this.builder(after);
    this.builder("}", node2, "end");
  }
  body(node2) {
    let proto = Stringifier.prototype;
    let expandable = ["atrule", "block", "body", "rule", "stringify"].every(
      (method) => this[method] === proto[method]
    );
    let stack = [];
    pushBody(this, stack, node2);
    while (stack.length > 0) {
      let entry = stack.pop();
      if (typeof entry === "function") {
        entry();
        continue;
      }
      let child = entry.node;
      let before = this.raw(child, "before");
      if (before) {
        this.builder(before);
      }
      if (expandable && child.type === "rule") {
        pushBlock(this, stack, child, this.rawValue(child, "selector"));
      } else if (expandable && child.type === "atrule" && child.nodes) {
        pushBlock(this, stack, child, atruleStart(this, child));
      } else {
        this.stringify(child, entry.semicolon);
      }
    }
  }
  comment(node2) {
    let left = this.raw(node2, "left", "commentLeft");
    let right = this.raw(node2, "right", "commentRight");
    this.builder("/*" + left + node2.text + right + "*/", node2);
  }
  decl(node2, semicolon) {
    let raws = node2.raws;
    let between = this.raw(node2, "between", "colon");
    let string2 = node2.prop + between + this.rawValue(node2, "value");
    if (node2.important) {
      string2 += raws.important || " !important";
    }
    if (semicolon) string2 += ";";
    this.builder(string2, node2);
  }
  document(node2) {
    this.body(node2);
  }
  raw(node2, own, detect) {
    let value;
    if (!detect) detect = own;
    if (own) {
      value = node2.raws[own];
      if (typeof value !== "undefined") return value;
    }
    let parent = node2.parent;
    if (detect === "before") {
      if (!parent || parent.type === "root" && parent.first === node2) {
        return "";
      }
      if (parent && parent.type === "document") {
        return "";
      }
    }
    if (!parent) return DEFAULT_RAW[detect];
    let root2 = node2.root();
    let cache = root2.rawCache || (root2.rawCache = {});
    if (typeof cache[detect] !== "undefined") {
      return cache[detect];
    }
    if (detect === "before" || detect === "after") {
      return this.beforeAfter(node2, detect);
    } else {
      let method = "raw" + capitalize(detect);
      if (this[method]) {
        value = this[method](root2, node2);
      } else {
        root2.walk((i) => {
          value = i.raws[own];
          if (typeof value !== "undefined") return false;
        });
      }
    }
    if (typeof value === "undefined") value = DEFAULT_RAW[detect];
    cache[detect] = value;
    return value;
  }
  rawBeforeClose(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== "undefined") {
          value = i.raws.after;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      }
    });
    if (value) value = value.replace(/\S/g, "");
    return value;
  }
  rawBeforeComment(root2, node2) {
    let value;
    root2.walkComments((i) => {
      if (typeof i.raws.before !== "undefined") {
        value = i.raws.before;
        if (value.includes("\n")) {
          value = value.replace(/[^\n]+$/, "");
        }
        return false;
      }
    });
    if (typeof value === "undefined") {
      value = this.raw(node2, null, "beforeDecl");
    } else if (value) {
      value = value.replace(/\S/g, "");
    }
    return value;
  }
  rawBeforeDecl(root2, node2) {
    let value;
    root2.walkDecls((i) => {
      if (typeof i.raws.before !== "undefined") {
        value = i.raws.before;
        if (value.includes("\n")) {
          value = value.replace(/[^\n]+$/, "");
        }
        return false;
      }
    });
    if (typeof value === "undefined") {
      value = this.raw(node2, null, "beforeRule");
    } else if (value) {
      value = value.replace(/\S/g, "");
    }
    return value;
  }
  rawBeforeOpen(root2) {
    let value;
    root2.walk((i) => {
      if (i.type !== "decl") {
        value = i.raws.between;
        if (typeof value !== "undefined") return false;
      }
    });
    return value;
  }
  rawBeforeRule(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
        if (typeof i.raws.before !== "undefined") {
          value = i.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      }
    });
    if (value) value = value.replace(/\S/g, "");
    return value;
  }
  rawColon(root2) {
    let value;
    root2.walkDecls((i) => {
      if (typeof i.raws.between !== "undefined") {
        value = i.raws.between.replace(/[^\s:]/g, "");
        return false;
      }
    });
    return value;
  }
  rawEmptyBody(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after;
        if (typeof value !== "undefined") return false;
      }
    });
    return value;
  }
  rawIndent(root2) {
    if (root2.raws.indent) return root2.raws.indent;
    let value;
    root2.walk((i) => {
      let p2 = i.parent;
      if (p2 && p2 !== root2 && p2.parent && p2.parent === root2) {
        if (typeof i.raws.before !== "undefined") {
          let parts = i.raws.before.split("\n");
          value = parts[parts.length - 1];
          value = value.replace(/\S/g, "");
          return false;
        }
      }
    });
    return value;
  }
  rawSemicolon(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && i.nodes.length && i.last.type === "decl") {
        value = i.raws.semicolon;
        if (typeof value !== "undefined") return false;
      }
    });
    return value;
  }
  rawValue(node2, prop) {
    let value = node2[prop];
    let raw = node2.raws[prop];
    if (raw && raw.value === value) {
      return raw.raw;
    }
    return value;
  }
  root(node2) {
    let inDocument = node2.parent && node2.parent.type === "document";
    if (!inDocument && node2.source && node2.source.input.hasBOM) {
      this.builder("\uFEFF", node2, "start");
    }
    this.body(node2);
    if (node2.raws.after) {
      this.builder(node2.raws.after);
    }
  }
  rule(node2) {
    this.block(node2, this.rawValue(node2, "selector"));
    if (node2.raws.ownSemicolon) {
      this.builder(node2.raws.ownSemicolon, node2, "end");
    }
  }
  stringify(node2, semicolon) {
    if (!this[node2.type]) {
      throw new Error(
        "Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier."
      );
    }
    this[node2.type](node2, semicolon);
  }
};
var stringifier = Stringifier$2;
Stringifier$2.default = Stringifier$2;
let Stringifier$1 = stringifier;
const STYLE_TAG = /(<)(\/?style\b)/gi;
const COMMENT_OPEN = /(<)(!--)/g;
function escapeHTMLInCSS(str) {
  if (!str.includes("<")) return str;
  return str.replace(STYLE_TAG, "\\3c $2").replace(COMMENT_OPEN, "\\3c $2");
}
function cutEscaped(chunks, css, escaped) {
  let parts = [];
  let at = 0;
  let into = 0;
  for (let i = 0; i < chunks.length; i += 3) {
    let from = into;
    let end = at + chunks[i].length;
    while (at < end) {
      if (css[at] === escaped[into]) {
        at += 1;
        into += 1;
      } else {
        at += 1;
        into += 4;
      }
    }
    parts.push(escaped.slice(from, into));
  }
  return parts;
}
class SafeStringifier extends Stringifier$1 {
  escapeHTML(print) {
    let builder = this.builder;
    let chunks, css;
    this.builder = (str, child, type) => {
      if (chunks) {
        css += str;
        chunks.push(str, child, type);
      } else if (str.includes("<")) {
        css = str;
        chunks = [str, child, type];
      } else {
        builder(str, child, type);
      }
    };
    print();
    this.builder = builder;
    if (!chunks) return;
    let escaped = escapeHTMLInCSS(css);
    if (escaped === css) {
      for (let i = 0; i < chunks.length; i += 3) {
        builder(chunks[i], chunks[i + 1], chunks[i + 2]);
      }
    } else {
      let parts = cutEscaped(chunks, css, escaped);
      for (let i = 0; i < chunks.length; i += 3) {
        builder(parts[i / 3], chunks[i + 1], chunks[i + 2]);
      }
    }
  }
  root(node2) {
    if (node2.parent && node2.parent.type === "document") {
      this.escapeHTML(() => this.body(node2));
      if (node2.raws.after) this.builder(node2.raws.after);
    } else {
      this.escapeHTML(() => super.root(node2));
    }
  }
}
function stringify$4(node2, builder) {
  let str = new SafeStringifier(builder);
  if (node2.type === "root" || node2.type === "document") {
    str.stringify(node2);
  } else {
    str.escapeHTML(() => str.stringify(node2));
  }
}
var stringify_1 = stringify$4;
stringify$4.default = stringify$4;
var symbols = {};
symbols.isClean = Symbol("isClean");
symbols.my = Symbol("my");
let CssSyntaxError$2 = cssSyntaxError;
let Stringifier2 = stringifier;
let stringify$3 = stringify_1;
let { isClean: isClean$2, my: my$3 } = symbols;
function cloneNode(obj, parent) {
  let cloned = new obj.constructor();
  let stack = [[obj, cloned, parent]];
  while (stack.length > 0) {
    let [source, target, targetParent] = stack.pop();
    for (let i in source) {
      if (!Object.prototype.hasOwnProperty.call(source, i)) {
        continue;
      }
      if (i === "proxyCache") continue;
      let value = source[i];
      let type = typeof value;
      if (i === "parent" && type === "object") {
        if (targetParent) target[i] = targetParent;
      } else if (i === "source") {
        target[i] = value;
      } else if (Array.isArray(value)) {
        let children = [];
        target[i] = children;
        for (let j of value) {
          let childClone = new j.constructor();
          children.push(childClone);
          stack.push([j, childClone, target]);
        }
      } else {
        if (type === "object" && value !== null) {
          let valueClone = new value.constructor();
          stack.push([value, valueClone, void 0]);
          value = valueClone;
        }
        target[i] = value;
      }
    }
  }
  return cloned;
}
function sourceOffset(inputCSS, position) {
  if (position && typeof position.offset !== "undefined") {
    return position.offset;
  }
  let column = 1;
  let line = 1;
  let offset = 0;
  for (let i = 0; i < inputCSS.length; i++) {
    if (line === position.line && column === position.column) {
      offset = i;
      break;
    }
    if (inputCSS[i] === "\n") {
      column = 1;
      line += 1;
    } else {
      column += 1;
    }
  }
  return offset;
}
let Node$4 = class Node2 {
  get proxyOf() {
    return this;
  }
  constructor(defaults = {}) {
    this.raws = {};
    this[isClean$2] = false;
    this[my$3] = true;
    for (let name of Object.keys(defaults)) {
      if (name === "__proto__") continue;
      if (name === "nodes") {
        this.nodes = [];
        for (let node2 of defaults[name]) {
          if (typeof node2.clone === "function" && node2.parent) {
            this.append(node2.clone());
          } else {
            this.append(node2);
          }
        }
      } else {
        this[name] = defaults[name];
      }
    }
  }
  addToError(error) {
    error.postcssNode = this;
    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
      let s = this.source;
      error.stack = error.stack.replace(
        /\n\s{4}at /,
        `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
      );
    }
    return error;
  }
  after(add) {
    this.parent.insertAfter(this, add);
    return this;
  }
  assign(overrides = {}) {
    for (let name in overrides) {
      this[name] = overrides[name];
    }
    return this;
  }
  before(add) {
    this.parent.insertBefore(this, add);
    return this;
  }
  cleanRaws(keepBetween) {
    delete this.raws.before;
    delete this.raws.after;
    if (!keepBetween) delete this.raws.between;
  }
  clone(overrides = {}) {
    let cloned = cloneNode(this);
    for (let name in overrides) {
      cloned[name] = overrides[name];
    }
    return cloned;
  }
  cloneAfter(overrides = {}) {
    let cloned = this.clone(overrides);
    this.parent.insertAfter(this, cloned);
    return cloned;
  }
  cloneBefore(overrides = {}) {
    let cloned = this.clone(overrides);
    this.parent.insertBefore(this, cloned);
    return cloned;
  }
  error(message, opts = {}) {
    if (this.source) {
      let { end, start } = this.rangeBy(opts);
      return this.source.input.error(
        message,
        { column: start.column, line: start.line },
        { column: end.column, line: end.line },
        opts
      );
    }
    return new CssSyntaxError$2(message);
  }
  getProxyProcessor() {
    return {
      get(node2, prop) {
        if (prop === "proxyOf") {
          return node2;
        } else if (prop === "root") {
          return () => node2.root().toProxy();
        } else {
          return node2[prop];
        }
      },
      set(node2, prop, value) {
        if (node2[prop] === value) return true;
        node2[prop] = value;
        if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
        prop === "text") {
          node2.markDirty();
        }
        return true;
      }
    };
  }
  /* c8 ignore next 3 */
  markClean() {
    this[isClean$2] = true;
  }
  markDirty() {
    if (this[isClean$2]) {
      this[isClean$2] = false;
      let next = this;
      while (next = next.parent) {
        next[isClean$2] = false;
      }
    }
  }
  next() {
    if (!this.parent) return void 0;
    let index2 = this.parent.index(this);
    return this.parent.nodes[index2 + 1];
  }
  positionBy(opts = {}) {
    let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
    let pos = {
      column: this.source.start.column,
      line: this.source.start.line,
      offset: sourceOffset(inputString, this.source.start)
    };
    if (opts.index) {
      pos = this.positionInside(opts.index);
    } else if (opts.word) {
      let stringRepresentation = inputString.slice(
        sourceOffset(inputString, this.source.start),
        this.rangeBy().end.offset
      );
      let index2 = stringRepresentation.indexOf(opts.word);
      if (index2 !== -1) pos = this.positionInside(index2);
    }
    return pos;
  }
  positionInside(index2) {
    let column = this.source.start.column;
    let line = this.source.start.line;
    let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
    let offset = sourceOffset(inputString, this.source.start);
    let end = offset + index2;
    for (let i = offset; i < end; i++) {
      if (inputString[i] === "\n") {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }
    return { column, line, offset: end };
  }
  prev() {
    if (!this.parent) return void 0;
    let index2 = this.parent.index(this);
    return this.parent.nodes[index2 - 1];
  }
  rangeBy(opts = {}) {
    let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
    let start = {
      column: this.source.start.column,
      line: this.source.start.line,
      offset: sourceOffset(inputString, this.source.start)
    };
    let end = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line,
      offset: typeof this.source.end.offset === "number" ? (
        // `source.end.offset` is exclusive, so we don't need to add 1
        this.source.end.offset
      ) : (
        // Since line/column in this.source.end is inclusive,
        // the `sourceOffset(... , this.source.end)` returns an inclusive offset.
        // So, we add 1 to convert it to exclusive.
        sourceOffset(inputString, this.source.end) + 1
      )
    } : {
      column: start.column + 1,
      line: start.line,
      offset: start.offset + 1
    };
    if (opts.word) {
      let stringRepresentation = inputString.slice(
        sourceOffset(inputString, this.source.start),
        end.offset
      );
      let index2 = stringRepresentation.indexOf(opts.word);
      if (index2 !== -1) {
        start = this.positionInside(index2);
        end = this.positionInside(index2 + opts.word.length);
      }
    } else {
      if (opts.start) {
        start = {
          column: opts.start.column,
          line: opts.start.line,
          offset: sourceOffset(inputString, opts.start)
        };
      } else if (typeof opts.index === "number") {
        start = this.positionInside(opts.index);
      }
      if (opts.end) {
        end = {
          column: opts.end.column,
          line: opts.end.line,
          offset: sourceOffset(inputString, opts.end)
        };
      } else if (typeof opts.endIndex === "number") {
        end = this.positionInside(opts.endIndex);
      } else if (typeof opts.index === "number") {
        end = this.positionInside(opts.index + 1);
      }
    }
    if (end.line < start.line || end.line === start.line && end.column <= start.column) {
      end = {
        column: start.column + 1,
        line: start.line,
        offset: start.offset + 1
      };
    }
    return { end, start };
  }
  raw(prop, defaultType) {
    let str = new Stringifier2();
    return str.raw(this, prop, defaultType);
  }
  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = void 0;
    return this;
  }
  replaceWith(...nodes) {
    if (this.parent) {
      let bookmark = this;
      let foundSelf = false;
      for (let node2 of nodes) {
        if (node2 === this) {
          foundSelf = true;
        } else if (foundSelf) {
          this.parent.insertAfter(bookmark, node2);
          bookmark = node2;
        } else {
          this.parent.insertBefore(bookmark, node2);
        }
      }
      if (!foundSelf) {
        this.remove();
      }
    }
    return this;
  }
  root() {
    let result2 = this;
    while (result2.parent && result2.parent.type !== "document") {
      result2 = result2.parent;
    }
    return result2;
  }
  toJSON(_, inputs) {
    let emitInputs = inputs == null;
    inputs = inputs || /* @__PURE__ */ new Map();
    let holderOfRoot = [];
    let queue = [[this, holderOfRoot, 0]];
    for (let step = 0; step < queue.length; step++) {
      let [node2, holder, key] = queue[step];
      let fixed2 = {};
      holder[key] = fixed2;
      for (let name in node2) {
        if (!Object.prototype.hasOwnProperty.call(node2, name)) {
          continue;
        }
        if (name === "parent" || name === "proxyCache") continue;
        let value = node2[name];
        if (Array.isArray(value)) {
          let fixedArray = [];
          fixed2[name] = fixedArray;
          for (let i = 0; i < value.length; i++) {
            let item = value[i];
            if (typeof item === "object" && item.toJSON) {
              if (item.toJSON === Node2.prototype.toJSON) {
                queue.push([item, fixedArray, i]);
              } else {
                fixedArray[i] = item.toJSON(null, inputs);
              }
            } else {
              fixedArray[i] = item;
            }
          }
        } else if (typeof value === "object" && value.toJSON) {
          if (value.toJSON === Node2.prototype.toJSON) {
            queue.push([value, fixed2, name]);
          } else {
            fixed2[name] = value.toJSON(null, inputs);
          }
        } else if (name === "source") {
          if (value == null) continue;
          let inputId = inputs.get(value.input);
          if (inputId == null) {
            inputId = inputs.size;
            inputs.set(value.input, inputId);
          }
          fixed2[name] = {
            end: value.end,
            inputId,
            start: value.start
          };
        } else {
          fixed2[name] = value;
        }
      }
    }
    let fixed = holderOfRoot[0];
    if (emitInputs) {
      fixed.inputs = [...inputs.keys()].map((input2) => input2.toJSON());
    }
    return fixed;
  }
  toProxy() {
    if (!this.proxyCache) {
      this.proxyCache = new Proxy(this, this.getProxyProcessor());
    }
    return this.proxyCache;
  }
  toString(stringifier2 = stringify$3) {
    if (stringifier2.stringify) stringifier2 = stringifier2.stringify;
    let result2 = "";
    stringifier2(this, (i) => {
      result2 += i;
    });
    return result2;
  }
  warn(result2, text, opts = {}) {
    let data = { node: this };
    for (let i in opts) data[i] = opts[i];
    return result2.warn(text, data);
  }
};
var node = Node$4;
Node$4.default = Node$4;
let Node$3 = node;
let Comment$4 = class Comment2 extends Node$3 {
  constructor(defaults) {
    super(defaults);
    this.type = "comment";
  }
};
var comment = Comment$4;
Comment$4.default = Comment$4;
let Node$2 = node;
let Declaration$4 = class Declaration extends Node$2 {
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
  constructor(defaults) {
    if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
      defaults = { ...defaults, value: String(defaults.value) };
    }
    super(defaults);
    this.type = "decl";
  }
};
var declaration = Declaration$4;
Declaration$4.default = Declaration$4;
let Comment$3 = comment;
let Declaration$3 = declaration;
let Node$1 = node;
let { isClean: isClean$1, my: my$2 } = symbols;
let AtRule$4, parse$4, Root$6, Rule$4;
function cleanSource(nodes) {
  let stack = nodes.slice();
  while (stack.length > 0) {
    let node2 = stack.pop();
    delete node2.source;
    if (node2.nodes) {
      node2.nodes = node2.nodes.slice();
      for (let i of node2.nodes) stack.push(i);
    }
  }
  return nodes.slice();
}
function markTreeDirty(node2) {
  let stack = [node2];
  while (stack.length > 0) {
    let next = stack.pop();
    next[isClean$1] = false;
    if (next.proxyOf.nodes) {
      for (let i of next.proxyOf.nodes) stack.push(i);
    }
  }
}
let Container$8 = class Container extends Node$1 {
  get first() {
    if (!this.proxyOf.nodes) return void 0;
    return this.proxyOf.nodes[0];
  }
  get last() {
    if (!this.proxyOf.nodes) return void 0;
    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
  append(...children) {
    for (let child of children) {
      let nodes = this.normalize(child, this.last);
      for (let node2 of nodes) this.proxyOf.nodes.push(node2);
    }
    this.markDirty();
    return this;
  }
  cleanRaws(keepBetween) {
    let stack = [this];
    while (stack.length > 0) {
      let node2 = stack.pop();
      if (node2 !== this && node2.cleanRaws !== Container.prototype.cleanRaws) {
        node2.cleanRaws(keepBetween);
        continue;
      }
      Node$1.prototype.cleanRaws.call(node2, keepBetween);
      if (node2.nodes) {
        for (let child of node2.nodes) stack.push(child);
      }
    }
  }
  each(callback) {
    if (!this.proxyOf.nodes) return void 0;
    let iterator = this.getIterator();
    let index2, result2;
    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
      index2 = this.indexes[iterator];
      result2 = callback(this.proxyOf.nodes[index2], index2);
      if (result2 === false) break;
      this.indexes[iterator] += 1;
    }
    delete this.indexes[iterator];
    return result2;
  }
  every(condition) {
    return this.nodes.every(condition);
  }
  getIterator() {
    if (!this.lastEach) this.lastEach = 0;
    if (!this.indexes) this.indexes = {};
    this.lastEach += 1;
    let iterator = this.lastEach;
    this.indexes[iterator] = 0;
    return iterator;
  }
  getProxyProcessor() {
    return {
      get(node2, prop) {
        if (prop === "proxyOf") {
          return node2;
        } else if (!node2[prop]) {
          return node2[prop];
        } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
          return (...args) => {
            return node2[prop](
              ...args.map((i) => {
                if (typeof i === "function") {
                  return (child, index2) => i(child.toProxy(), index2);
                } else {
                  return i;
                }
              })
            );
          };
        } else if (prop === "every" || prop === "some") {
          return (cb2) => {
            return node2[prop](
              (child, ...other) => cb2(child.toProxy(), ...other)
            );
          };
        } else if (prop === "root") {
          return () => node2.root().toProxy();
        } else if (prop === "nodes") {
          return node2.nodes.map((i) => i.toProxy());
        } else if (prop === "first" || prop === "last") {
          return node2[prop].toProxy();
        } else {
          return node2[prop];
        }
      },
      set(node2, prop, value) {
        if (node2[prop] === value) return true;
        node2[prop] = value;
        if (prop === "name" || prop === "params" || prop === "selector") {
          node2.markDirty();
        }
        return true;
      }
    };
  }
  index(child) {
    if (typeof child === "number") return child;
    if (child.proxyOf) child = child.proxyOf;
    return this.proxyOf.nodes.indexOf(child);
  }
  insertAfter(exist, add) {
    let existIndex = this.index(exist);
    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
    existIndex = this.index(exist);
    for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
    let index2;
    for (let id2 in this.indexes) {
      index2 = this.indexes[id2];
      if (existIndex < index2) {
        this.indexes[id2] = index2 + nodes.length;
      }
    }
    this.markDirty();
    return this;
  }
  insertBefore(exist, add) {
    let existIndex = this.index(exist);
    let type = existIndex === 0 ? "prepend" : false;
    let nodes = this.normalize(
      add,
      this.proxyOf.nodes[existIndex],
      type
    ).reverse();
    existIndex = this.index(exist);
    for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex, 0, node2);
    let index2;
    for (let id2 in this.indexes) {
      index2 = this.indexes[id2];
      if (existIndex <= index2) {
        this.indexes[id2] = index2 + nodes.length;
      }
    }
    this.markDirty();
    return this;
  }
  normalize(nodes, sample) {
    if (typeof nodes === "string") {
      nodes = cleanSource(parse$4(nodes).nodes);
    } else if (typeof nodes === "undefined") {
      nodes = [];
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0);
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, "ignore");
      }
    } else if (nodes.type === "root" && this.type !== "document") {
      nodes = nodes.nodes.slice(0);
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, "ignore");
      }
    } else if (nodes.type) {
      nodes = [nodes];
    } else if (nodes.prop) {
      if (typeof nodes.value === "undefined") {
        throw new Error("Value field is missed in node creation");
      } else if (typeof nodes.value !== "string") {
        nodes.value = String(nodes.value);
      }
      nodes = [new Declaration$3(nodes)];
    } else if (nodes.selector || nodes.selectors) {
      nodes = [new Rule$4(nodes)];
    } else if (nodes.name) {
      nodes = [new AtRule$4(nodes)];
    } else if (nodes.text) {
      nodes = [new Comment$3(nodes)];
    } else {
      throw new Error("Unknown node type in node creation");
    }
    let processed = nodes.map((i) => {
      if (!i[my$2]) Container.rebuild(i);
      i = i.proxyOf;
      if (i.parent) i.parent.removeChild(i);
      if (i[isClean$1]) markTreeDirty(i);
      if (!i.raws) i.raws = {};
      if (typeof i.raws.before === "undefined") {
        if (sample && typeof sample.raws.before !== "undefined") {
          i.raws.before = sample.raws.before.replace(/\S/g, "");
        }
      }
      i.parent = this.proxyOf;
      return i;
    });
    return processed;
  }
  prepend(...children) {
    children = children.reverse();
    for (let child of children) {
      let nodes = this.normalize(child, this.first, "prepend").reverse();
      for (let node2 of nodes) this.proxyOf.nodes.unshift(node2);
      for (let id2 in this.indexes) {
        this.indexes[id2] = this.indexes[id2] + nodes.length;
      }
    }
    this.markDirty();
    return this;
  }
  push(child) {
    child.parent = this;
    this.proxyOf.nodes.push(child);
    return this;
  }
  removeAll() {
    for (let node2 of this.proxyOf.nodes) node2.parent = void 0;
    this.proxyOf.nodes = [];
    this.markDirty();
    return this;
  }
  removeChild(child) {
    child = this.index(child);
    this.proxyOf.nodes[child].parent = void 0;
    this.proxyOf.nodes.splice(child, 1);
    let index2;
    for (let id2 in this.indexes) {
      index2 = this.indexes[id2];
      if (index2 >= child) {
        this.indexes[id2] = index2 - 1;
      }
    }
    this.markDirty();
    return this;
  }
  replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts;
      opts = {};
    }
    this.walkDecls((decl) => {
      if (opts.props && !opts.props.includes(decl.prop)) return;
      if (opts.fast && !decl.value.includes(opts.fast)) return;
      decl.value = decl.value.replace(pattern, callback);
    });
    this.markDirty();
    return this;
  }
  some(condition) {
    return this.nodes.some(condition);
  }
  walk(callback) {
    if (!this.proxyOf.nodes) return void 0;
    let stack = [{ iterator: this.getIterator(), node: this.proxyOf }];
    while (stack.length > 0) {
      let { iterator, node: node2 } = stack[stack.length - 1];
      let index2 = node2.indexes[iterator];
      if (index2 >= node2.proxyOf.nodes.length) {
        delete node2.indexes[iterator];
        stack.pop();
        let parent = stack[stack.length - 1];
        if (parent) parent.node.indexes[parent.iterator] += 1;
        continue;
      }
      let child = node2.proxyOf.nodes[index2];
      let result2;
      try {
        result2 = callback(child, index2);
      } catch (e) {
        throw child.addToError(e);
      }
      if (result2 === false) {
        for (let opened of stack) {
          delete opened.node.indexes[opened.iterator];
        }
        return false;
      }
      if (child.walk && child.proxyOf.nodes) {
        stack.push({ iterator: child.getIterator(), node: child });
      } else {
        node2.indexes[iterator] += 1;
      }
    }
    return void 0;
  }
  walkAtRules(name, callback) {
    if (!callback) {
      callback = name;
      return this.walk((child, i) => {
        if (child.type === "atrule") {
          return callback(child, i);
        }
      });
    }
    if (name instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === "atrule" && name.test(child.name)) {
          return callback(child, i);
        }
      });
    }
    return this.walk((child, i) => {
      if (child.type === "atrule" && child.name === name) {
        return callback(child, i);
      }
    });
  }
  walkComments(callback) {
    return this.walk((child, i) => {
      if (child.type === "comment") {
        return callback(child, i);
      }
    });
  }
  walkDecls(prop, callback) {
    if (!callback) {
      callback = prop;
      return this.walk((child, i) => {
        if (child.type === "decl") {
          return callback(child, i);
        }
      });
    }
    if (prop instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === "decl" && prop.test(child.prop)) {
          return callback(child, i);
        }
      });
    }
    return this.walk((child, i) => {
      if (child.type === "decl" && child.prop === prop) {
        return callback(child, i);
      }
    });
  }
  walkRules(selector, callback) {
    if (!callback) {
      callback = selector;
      return this.walk((child, i) => {
        if (child.type === "rule") {
          return callback(child, i);
        }
      });
    }
    if (selector instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === "rule" && selector.test(child.selector)) {
          return callback(child, i);
        }
      });
    }
    return this.walk((child, i) => {
      if (child.type === "rule" && child.selector === selector) {
        return callback(child, i);
      }
    });
  }
};
Container$8.registerParse = (dependant) => {
  parse$4 = dependant;
};
Container$8.registerRule = (dependant) => {
  Rule$4 = dependant;
};
Container$8.registerAtRule = (dependant) => {
  AtRule$4 = dependant;
};
Container$8.registerRoot = (dependant) => {
  Root$6 = dependant;
};
var container = Container$8;
Container$8.default = Container$8;
Container$8.rebuild = (node2) => {
  let stack = [node2];
  while (stack.length > 0) {
    let next = stack.pop();
    if (next.type === "atrule") {
      Object.setPrototypeOf(next, AtRule$4.prototype);
    } else if (next.type === "rule") {
      Object.setPrototypeOf(next, Rule$4.prototype);
    } else if (next.type === "decl") {
      Object.setPrototypeOf(next, Declaration$3.prototype);
    } else if (next.type === "comment") {
      Object.setPrototypeOf(next, Comment$3.prototype);
    } else if (next.type === "root") {
      Object.setPrototypeOf(next, Root$6.prototype);
    }
    next[my$2] = true;
    if (next.nodes) {
      for (let child of next.nodes) stack.push(child);
    }
  }
};
let Container$7 = container;
let AtRule$3 = class AtRule extends Container$7 {
  constructor(defaults) {
    super(defaults);
    this.type = "atrule";
  }
  append(...children) {
    if (!this.proxyOf.nodes) this.nodes = [];
    return super.append(...children);
  }
  prepend(...children) {
    if (!this.proxyOf.nodes) this.nodes = [];
    return super.prepend(...children);
  }
};
var atRule = AtRule$3;
AtRule$3.default = AtRule$3;
Container$7.registerAtRule(AtRule$3);
let Container$6 = container;
let LazyResult$4, Processor$3;
let Document$4 = class Document3 extends Container$6 {
  constructor(defaults) {
    super({ type: "document", ...defaults });
    if (!this.nodes) {
      this.nodes = [];
    }
  }
  toResult(opts = {}) {
    let lazy = new LazyResult$4(new Processor$3(), this, opts);
    return lazy.stringify();
  }
};
Document$4.registerLazyResult = (dependant) => {
  LazyResult$4 = dependant;
};
Document$4.registerProcessor = (dependant) => {
  Processor$3 = dependant;
};
var document$1 = Document$4;
Document$4.default = Document$4;
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id2 = "";
    let i = size | 0;
    while (i-- > 0) {
      id2 += alphabet[Math.random() * alphabet.length | 0];
    }
    return id2;
  };
};
let nanoid$1 = (size = 21) => {
  let id2 = "";
  let i = size | 0;
  while (i-- > 0) {
    id2 += urlAlphabet[Math.random() * 64 | 0];
  }
  return id2;
};
var nonSecure = { nanoid: nanoid$1, customAlphabet };
let { existsSync, readFileSync, realpathSync } = require$$2;
let { dirname: dirname$1, isAbsolute: isAbsolute$1, join, relative: relative$1, sep: sep$1 } = require$$2;
let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = require$$2;
function realPath(path) {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
}
function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, "base64").toString();
  } else {
    return window.atob(str);
  }
}
let PreviousMap$2 = class PreviousMap {
  constructor(css, opts) {
    if (opts.map === false) return;
    if (opts.unsafeMap) this.unsafeMap = true;
    this.loadAnnotation(css);
    this.inline = this.startWith(this.annotation, "data:");
    let prev = opts.map ? opts.map.prev : void 0;
    let text = this.loadMap(opts.from, prev);
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from;
    }
    if (this.mapFile) this.root = dirname$1(this.mapFile);
    if (text) this.text = text;
  }
  consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new SourceMapConsumer$2(this.json || this.text);
    }
    return this.consumerCache;
  }
  decodeInline(text) {
    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
    let baseUri = /^data:application\/json;base64,/;
    let charsetUri = /^data:application\/json;charset=utf-?8,/;
    let uri = /^data:application\/json,/;
    let uriMatch = text.match(charsetUri) || text.match(uri);
    if (uriMatch) {
      return decodeURIComponent(text.substr(uriMatch[0].length));
    }
    let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
    if (baseUriMatch) {
      return fromBase64(text.substr(baseUriMatch[0].length));
    }
    let encoding = text.slice("data:application/json;".length);
    encoding = encoding.slice(0, encoding.indexOf(","));
    throw new Error("Unsupported source map encoding " + encoding);
  }
  getAnnotationURL(sourceMapString) {
    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(map) {
    if (typeof map !== "object") return false;
    return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
  }
  loadAnnotation(css) {
    let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
    if (!comments) return;
    let start = css.lastIndexOf(comments.pop());
    let end = css.indexOf("*/", start);
    if (start > -1 && end > -1) {
      this.annotation = this.getAnnotationURL(css.substring(start, end));
    }
  }
  loadFile(path, cssFile, trusted) {
    if (!trusted && !this.unsafeMap) {
      if (!/\.map$/i.test(path)) return void 0;
      if (!cssFile) return void 0;
      let rel = relative$1(realPath(dirname$1(cssFile)), realPath(path));
      if (rel === ".." || rel.startsWith(".." + sep$1) || isAbsolute$1(rel)) {
        return void 0;
      }
    }
    this.root = dirname$1(path);
    if (existsSync(path)) {
      this.mapFile = path;
      return readFileSync(path, "utf-8").toString().trim();
    }
  }
  loadMap(file, prev) {
    if (prev === false) return false;
    if (prev) {
      if (typeof prev === "string") {
        return prev;
      } else if (typeof prev === "function") {
        let prevPath = prev(file);
        if (prevPath) {
          let map = this.loadFile(prevPath, file, true);
          if (!map) {
            throw new Error(
              "Unable to load previous source map: " + prevPath.toString()
            );
          }
          return map;
        }
      } else if (prev instanceof SourceMapConsumer$2) {
        return SourceMapGenerator$2.fromSourceMap(prev).toString();
      } else if (prev instanceof SourceMapGenerator$2) {
        return prev.toString();
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev);
      } else {
        throw new Error(
          "Unsupported previous source map format: " + prev.toString()
        );
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation);
    } else if (this.annotation) {
      let map = this.annotation;
      if (file) map = join(dirname$1(file), map);
      let unknown = this.loadFile(map, file, false);
      if (unknown) {
        try {
          this.json = JSON.parse(unknown.replace(/^\)]}'[^\n]*\n/, ""));
        } catch {
          return void 0;
        }
      }
      return unknown;
    }
  }
  startWith(string2, start) {
    if (!string2) return false;
    return string2.substr(0, start.length) === start;
  }
  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var previousMap = PreviousMap$2;
PreviousMap$2.default = PreviousMap$2;
let { nanoid } = nonSecure;
let { isAbsolute, resolve: resolve$1 } = require$$2;
let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = require$$2;
let { fileURLToPath, pathToFileURL: pathToFileURL$1 } = require$$2;
let CssSyntaxError$1 = cssSyntaxError;
let PreviousMap$1 = previousMap;
let terminalHighlight = require$$2;
let lineToIndexCache = Symbol("lineToIndexCache");
let sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
let pathAvailable$1 = Boolean(resolve$1 && isAbsolute);
function getLineToIndex(input2) {
  if (input2[lineToIndexCache]) return input2[lineToIndexCache];
  let lines = input2.css.split("\n");
  let lineToIndex = new Array(lines.length);
  let prevIndex = 0;
  for (let i = 0, l2 = lines.length; i < l2; i++) {
    lineToIndex[i] = prevIndex;
    prevIndex += lines[i].length + 1;
  }
  input2[lineToIndexCache] = lineToIndex;
  return lineToIndex;
}
let Input$4 = class Input {
  get from() {
    return this.file || this.id;
  }
  constructor(css, opts = {}) {
    if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
      throw new Error(`PostCSS received ${css} instead of CSS string`);
    }
    this.css = css.toString();
    if (this.css[0] === "\uFEFF" || this.css[0] === "￾") {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }
    this.document = this.css;
    if (opts.document) this.document = opts.document.toString();
    if (opts.from) {
      if (!pathAvailable$1 || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
        this.file = opts.from;
      } else {
        this.file = resolve$1(opts.from);
      }
    }
    if (pathAvailable$1 && sourceMapAvailable$1) {
      let map = new PreviousMap$1(this.css, opts);
      if (map.text) {
        this.map = map;
        let file = map.consumer().file;
        if (!this.file && file) this.file = this.mapResolve(file);
      }
    }
    if (!this.file) {
      this.id = "<input css " + nanoid(6) + ">";
    }
    if (this.map) this.map.file = this.from;
  }
  error(message, line, column, opts = {}) {
    let endColumn, endLine, endOffset, offset, result2;
    if (line && typeof line === "object") {
      let start = line;
      let end = column;
      if (typeof start.offset === "number") {
        offset = start.offset;
        let pos = this.fromOffset(offset);
        line = pos.line;
        column = pos.col;
      } else {
        line = start.line;
        column = start.column;
        offset = this.fromLineAndColumn(line, column);
      }
      if (typeof end.offset === "number") {
        endOffset = end.offset;
        let pos = this.fromOffset(endOffset);
        endLine = pos.line;
        endColumn = pos.col;
      } else {
        endLine = end.line;
        endColumn = end.column;
        endOffset = this.fromLineAndColumn(end.line, end.column);
      }
    } else if (!column) {
      offset = line;
      let pos = this.fromOffset(offset);
      line = pos.line;
      column = pos.col;
    } else {
      offset = this.fromLineAndColumn(line, column);
    }
    let origin = this.origin(line, column, endLine, endColumn);
    if (origin) {
      result2 = new CssSyntaxError$1(
        message,
        origin.endLine === void 0 ? origin.line : { column: origin.column, line: origin.line },
        origin.endLine === void 0 ? origin.column : { column: origin.endColumn, line: origin.endLine },
        origin.source,
        origin.file,
        opts.plugin
      );
    } else {
      result2 = new CssSyntaxError$1(
        message,
        endLine === void 0 ? line : { column, line },
        endLine === void 0 ? column : { column: endColumn, line: endLine },
        this.css,
        this.file,
        opts.plugin
      );
    }
    result2.input = {
      column,
      endColumn,
      endLine,
      endOffset,
      line,
      offset,
      source: this.css
    };
    if (this.file) {
      if (pathToFileURL$1) {
        result2.input.url = pathToFileURL$1(this.file).toString();
      }
      result2.input.file = this.file;
    }
    return result2;
  }
  fromLineAndColumn(line, column) {
    let lineToIndex = getLineToIndex(this);
    let index2 = lineToIndex[line - 1];
    return index2 + column - 1;
  }
  fromOffset(offset) {
    let lineToIndex = getLineToIndex(this);
    let lastLine = lineToIndex[lineToIndex.length - 1];
    let min = 0;
    if (offset >= lastLine) {
      min = lineToIndex.length - 1;
    } else {
      let max = lineToIndex.length - 2;
      let mid;
      while (min < max) {
        mid = min + (max - min >> 1);
        if (offset < lineToIndex[mid]) {
          max = mid - 1;
        } else if (offset >= lineToIndex[mid + 1]) {
          min = mid + 1;
        } else {
          min = mid;
          break;
        }
      }
    }
    return {
      col: offset - lineToIndex[min] + 1,
      line: min + 1
    };
  }
  mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file;
    }
    return resolve$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
  }
  origin(line, column, endLine, endColumn) {
    if (!this.map) return false;
    let consumer = this.map.consumer();
    let from = consumer.originalPositionFor({ column: column - 1, line });
    if (!from.source) return false;
    let to;
    if (typeof endLine === "number") {
      let toPosition = consumer.originalPositionFor({
        column: endColumn - 1,
        line: endLine
      });
      if (toPosition.source) to = toPosition;
    }
    let fromUrl;
    if (isAbsolute(from.source)) {
      fromUrl = pathToFileURL$1(from.source);
    } else {
      fromUrl = new URL(
        from.source,
        pathToFileURL$1(this.map.mapFile || resolve$1(".") + "/")
      );
    }
    let result2 = {
      column: from.column + 1,
      endColumn: to && to.column + 1,
      endLine: to && to.line,
      line: from.line,
      url: fromUrl.toString()
    };
    if (fromUrl.protocol === "file:") {
      if (fileURLToPath) {
        result2.file = fileURLToPath(fromUrl);
      } else {
        throw new Error(`file: protocol is not available in this PostCSS build`);
      }
    }
    let source = consumer.sourceContentFor(from.source);
    if (source) result2.source = source;
    return result2;
  }
  toJSON() {
    let json = {};
    for (let name of ["hasBOM", "css", "file", "id"]) {
      if (this[name] != null) {
        json[name] = this[name];
      }
    }
    if (this.map) {
      json.map = { ...this.map };
      if (json.map.consumerCache) {
        json.map.consumerCache = void 0;
      }
    }
    return json;
  }
};
var input = Input$4;
Input$4.default = Input$4;
if (terminalHighlight && terminalHighlight.registerInput) {
  terminalHighlight.registerInput(Input$4);
}
let Container$5 = container;
let LazyResult$3, Processor$2;
let Root$5 = class Root extends Container$5 {
  constructor(defaults) {
    super(defaults);
    this.type = "root";
    if (!this.nodes) this.nodes = [];
  }
  normalize(child, sample, type) {
    let keepBefore = /* @__PURE__ */ new Set();
    for (let node2 of Array.isArray(child) ? child : [child]) {
      if (node2 && typeof node2 === "object" && !node2.parent && node2.raws && typeof node2.raws.before !== "undefined") {
        keepBefore.add(node2.raws);
      }
    }
    let nodes = super.normalize(child);
    if (sample) {
      if (type === "prepend") {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before;
        } else {
          delete sample.raws.before;
        }
      } else if (this.first !== sample) {
        for (let node2 of nodes) {
          if (!keepBefore.has(node2.raws)) {
            node2.raws.before = sample.raws.before;
          }
        }
      }
    }
    return nodes;
  }
  removeChild(child, ignore) {
    let index2 = this.index(child);
    if (!ignore && index2 === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index2].raws.before;
    }
    return super.removeChild(child);
  }
  toResult(opts = {}) {
    let lazy = new LazyResult$3(new Processor$2(), this, opts);
    return lazy.stringify();
  }
};
Root$5.registerLazyResult = (dependant) => {
  LazyResult$3 = dependant;
};
Root$5.registerProcessor = (dependant) => {
  Processor$2 = dependant;
};
var root = Root$5;
Root$5.default = Root$5;
Container$5.registerRoot(Root$5);
let list$2 = {
  comma(string2) {
    return list$2.split(string2, [","], true);
  },
  space(string2) {
    let spaces = [" ", "\n", "	"];
    return list$2.split(string2, spaces);
  },
  split(string2, separators, last) {
    if (typeof string2 !== "string") return [];
    let array2 = [];
    let current2 = "";
    let split = false;
    let func = 0;
    let inQuote = false;
    let prevQuote = "";
    let escape2 = false;
    let inComment = false;
    for (let i = 0; i < string2.length; i++) {
      let letter = string2[i];
      if (inComment) {
        current2 += letter;
        if (letter === "*" && string2[i + 1] === "/") {
          current2 += "/";
          i += 1;
          inComment = false;
        }
        continue;
      }
      if (escape2) {
        escape2 = false;
      } else if (letter === "\\") {
        escape2 = true;
      } else if (inQuote) {
        if (letter === prevQuote) {
          inQuote = false;
        }
      } else if (letter === '"' || letter === "'") {
        inQuote = true;
        prevQuote = letter;
      } else if (letter === "/" && string2[i + 1] === "*") {
        current2 += "/*";
        i += 1;
        inComment = true;
        continue;
      } else if (letter === "(") {
        func += 1;
      } else if (letter === ")") {
        if (func > 0) func -= 1;
      } else if (func === 0) {
        if (separators.includes(letter)) split = true;
      }
      if (split) {
        let value2 = current2.trim();
        if (last || value2 !== "") array2.push(value2);
        current2 = "";
        split = false;
      } else {
        current2 += letter;
      }
    }
    let value = current2.trim();
    if (last || value !== "") array2.push(value);
    return array2;
  }
};
var list_1 = list$2;
list$2.default = list$2;
let Container$4 = container;
let list$1 = list_1;
let Rule$3 = class Rule extends Container$4 {
  get selectors() {
    return list$1.comma(this.selector);
  }
  set selectors(values) {
    let match = this.selector ? this.selector.match(/,\s*/) : null;
    let sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
    this.selector = values.join(sep2);
  }
  constructor(defaults) {
    super(defaults);
    this.type = "rule";
    if (!this.nodes) this.nodes = [];
  }
};
var rule = Rule$3;
Rule$3.default = Rule$3;
Container$4.registerRule(Rule$3);
let AtRule$2 = atRule;
let Comment$2 = comment;
let Declaration$2 = declaration;
let Input$3 = input;
let PreviousMap2 = previousMap;
let Root$4 = root;
let Rule$2 = rule;
function hydrateInputs(json, inputs) {
  if (!json.inputs) return inputs;
  return json.inputs.map((input2) => {
    let inputHydrated = { ...input2, __proto__: Input$3.prototype };
    if (inputHydrated.map) {
      inputHydrated.map = {
        ...inputHydrated.map,
        __proto__: PreviousMap2.prototype
      };
    }
    return inputHydrated;
  });
}
function constructNode(json, inputs, children) {
  let defaults = { ...json };
  delete defaults.inputs;
  delete defaults.nodes;
  if (defaults.source) {
    let { inputId, ...source } = defaults.source;
    defaults.source = source;
    if (inputId != null) {
      defaults.source.input = inputs[inputId];
    }
  }
  let node2;
  if (defaults.type === "root") {
    node2 = new Root$4(defaults);
  } else if (defaults.type === "decl") {
    node2 = new Declaration$2(defaults);
  } else if (defaults.type === "rule") {
    node2 = new Rule$2(defaults);
  } else if (defaults.type === "comment") {
    node2 = new Comment$2(defaults);
  } else if (defaults.type === "atrule") {
    node2 = new AtRule$2(defaults);
  } else {
    throw new Error("Unknown node type: " + json.type);
  }
  if (children) {
    node2.nodes = children;
    for (let child of children) child.parent = node2;
  }
  return node2;
}
function fromJSON$1(json, inputs) {
  if (Array.isArray(json)) return json.map((n2) => fromJSON$1(n2));
  let result2;
  let stack = [
    { childIndex: 0, children: [], inputs: hydrateInputs(json, inputs), json }
  ];
  while (stack.length > 0) {
    let frame = stack[stack.length - 1];
    let jsonNodes = frame.json.nodes;
    if (jsonNodes && frame.childIndex < jsonNodes.length) {
      let childJson = jsonNodes[frame.childIndex];
      frame.childIndex += 1;
      stack.push({
        childIndex: 0,
        children: [],
        inputs: hydrateInputs(childJson, frame.inputs),
        json: childJson
      });
      continue;
    }
    stack.pop();
    let node2 = constructNode(
      frame.json,
      frame.inputs,
      jsonNodes ? frame.children : void 0
    );
    if (stack.length > 0) {
      stack[stack.length - 1].children.push(node2);
    } else {
      result2 = node2;
    }
  }
  return result2;
}
var fromJSON_1 = fromJSON$1;
fromJSON$1.default = fromJSON$1;
let { dirname, relative, resolve, sep } = require$$2;
let { SourceMapConsumer, SourceMapGenerator } = require$$2;
let { pathToFileURL } = require$$2;
let Input$2 = input;
let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
let pathAvailable = Boolean(dirname && resolve && relative && sep);
let MapGenerator$2 = class MapGenerator {
  constructor(stringify2, root2, opts, cssString) {
    this.stringify = stringify2;
    this.mapOpts = opts.map || {};
    this.root = root2;
    this.opts = opts;
    this.css = cssString;
    this.originalCSS = cssString;
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
    this.memoizedFileURLs = /* @__PURE__ */ new Map();
    this.memoizedPaths = /* @__PURE__ */ new Map();
    this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let content;
    if (this.isInline()) {
      content = "data:application/json;base64," + this.toBase64(this.map.toString());
    } else if (typeof this.mapOpts.annotation === "string") {
      content = this.mapOpts.annotation;
    } else if (typeof this.mapOpts.annotation === "function") {
      content = this.mapOpts.annotation(this.opts.to, this.root);
    } else {
      content = this.outputFile() + ".map";
    }
    let eol = "\n";
    if (this.css.includes("\r\n")) eol = "\r\n";
    this.css += eol + "/*# sourceMappingURL=" + content + " */";
  }
  applyPrevMaps() {
    for (let prev of this.previous()) {
      let from = this.toUrl(this.path(prev.file));
      let root2 = prev.root || dirname(prev.file);
      let map;
      if (this.mapOpts.sourcesContent === false) {
        map = new SourceMapConsumer(prev.text);
        if (map.sourcesContent) {
          map.sourcesContent = null;
        }
      } else {
        map = prev.consumer();
      }
      this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation === false) return;
    if (this.root) {
      let node2;
      for (let i = this.root.nodes.length - 1; i >= 0; i--) {
        node2 = this.root.nodes[i];
        if (node2.type !== "comment") continue;
        if (node2.text.startsWith("# sourceMappingURL=")) {
          this.root.removeChild(i);
        }
      }
    } else if (this.css) {
      let annotation = "/*# sourceMappingURL=";
      let css = "";
      let cursor = 0;
      let startIndex;
      while ((startIndex = this.css.indexOf(annotation, cursor)) !== -1) {
        let endIndex = this.css.indexOf("*/", startIndex + annotation.length);
        if (endIndex === -1) break;
        while (startIndex > cursor && this.css[startIndex - 1] === "\n") {
          startIndex--;
        }
        css += this.css.slice(cursor, startIndex);
        cursor = endIndex + 2;
      }
      if (cursor > 0) this.css = css + this.css.slice(cursor);
    }
  }
  generate() {
    this.clearAnnotation();
    if (pathAvailable && sourceMapAvailable && this.isMap()) {
      return this.generateMap();
    } else {
      let result2 = "";
      this.stringify(this.root, (i) => {
        result2 += i;
      });
      return [result2];
    }
  }
  generateMap() {
    if (this.root) {
      this.generateString();
    } else if (this.previous().length === 1) {
      let prev = this.previous()[0].consumer();
      prev.file = this.outputFile();
      this.map = SourceMapGenerator.fromSourceMap(prev, {
        ignoreInvalidMapping: true
      });
    } else {
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });
      this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    }
    if (this.isSourcesContent()) this.setSourcesContent();
    if (this.root && this.previous().length > 0) this.applyPrevMaps();
    if (this.isAnnotation()) this.addAnnotation();
    if (this.isInline()) {
      return [this.css];
    } else {
      return [this.css, this.map];
    }
  }
  generateString() {
    this.css = "";
    this.map = new SourceMapGenerator({
      file: this.outputFile(),
      ignoreInvalidMapping: true
    });
    let line = 1;
    let column = 1;
    let noSource = "<no source>";
    let mapping = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    };
    let last, lines;
    this.stringify(this.root, (str, node2, type) => {
      this.css += str;
      if (node2 && type !== "end") {
        mapping.generated.line = line;
        mapping.generated.column = column - 1;
        if (node2.source && node2.source.start) {
          mapping.source = this.sourcePath(node2);
          mapping.original.line = node2.source.start.line;
          mapping.original.column = node2.source.start.column - 1;
          this.map.addMapping(mapping);
        } else {
          mapping.source = noSource;
          mapping.original.line = 1;
          mapping.original.column = 0;
          this.map.addMapping(mapping);
        }
      }
      lines = str.match(/\n/g);
      if (lines) {
        line += lines.length;
        last = str.lastIndexOf("\n");
        column = str.length - last;
      } else {
        column += str.length;
      }
      if (node2 && type !== "start") {
        let p2 = node2.parent || { raws: {} };
        let childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
        if (!childless || node2 !== p2.last || p2.raws.semicolon) {
          if (node2.source && node2.source.end) {
            mapping.source = this.sourcePath(node2);
            mapping.original.line = node2.source.end.line;
            mapping.original.column = node2.source.end.column - 1;
            mapping.generated.line = line;
            mapping.generated.column = column - 2;
            this.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            this.map.addMapping(mapping);
          }
        }
      }
    });
  }
  isAnnotation() {
    if (this.isInline()) {
      return true;
    }
    if (typeof this.mapOpts.annotation !== "undefined") {
      return this.mapOpts.annotation;
    }
    if (this.previous().length) {
      return this.previous().some((i) => i.annotation);
    }
    return true;
  }
  isInline() {
    if (typeof this.mapOpts.inline !== "undefined") {
      return this.mapOpts.inline;
    }
    let annotation = this.mapOpts.annotation;
    if (typeof annotation !== "undefined" && annotation !== true) {
      return false;
    }
    if (this.previous().length) {
      return this.previous().some((i) => i.inline);
    }
    return true;
  }
  isMap() {
    if (typeof this.opts.map !== "undefined") {
      return !!this.opts.map;
    }
    return this.previous().length > 0;
  }
  isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== "undefined") {
      return this.mapOpts.sourcesContent;
    }
    if (this.previous().length) {
      return this.previous().some((i) => i.withContent());
    }
    return true;
  }
  outputFile() {
    if (this.opts.to) {
      return this.path(this.opts.to);
    } else if (this.opts.from) {
      return this.path(this.opts.from);
    } else {
      return "to.css";
    }
  }
  path(file) {
    if (this.mapOpts.absolute) return file;
    if (file.charCodeAt(0) === 60) return file;
    if (/^\w+:\/\//.test(file)) return file;
    let cached = this.memoizedPaths.get(file);
    if (cached) return cached;
    let from = this.opts.to ? dirname(this.opts.to) : ".";
    if (typeof this.mapOpts.annotation === "string") {
      from = dirname(resolve(from, this.mapOpts.annotation));
    }
    let path = relative(from, file);
    this.memoizedPaths.set(file, path);
    return path;
  }
  previous() {
    if (!this.previousMaps) {
      this.previousMaps = [];
      if (this.root) {
        this.root.walk((node2) => {
          if (node2.source && node2.source.input.map) {
            let map = node2.source.input.map;
            if (!this.previousMaps.includes(map)) {
              this.previousMaps.push(map);
            }
          }
        });
      } else {
        let input2 = new Input$2(this.originalCSS, this.opts);
        if (input2.map) this.previousMaps.push(input2.map);
      }
    }
    return this.previousMaps;
  }
  setSourcesContent() {
    let already = {};
    if (this.root) {
      this.root.walk((node2) => {
        if (node2.source) {
          let from = node2.source.input.from;
          if (from && !already[from]) {
            already[from] = true;
            let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
            this.map.setSourceContent(fromUrl, node2.source.input.css);
          }
        }
      });
    } else if (this.css) {
      let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(from, this.css);
    }
  }
  sourcePath(node2) {
    if (this.mapOpts.from) {
      return this.toUrl(this.mapOpts.from);
    } else if (this.usesFileUrls) {
      return this.toFileUrl(node2.source.input.from);
    } else {
      return this.toUrl(this.path(node2.source.input.from));
    }
  }
  toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString("base64");
    } else {
      return window.btoa(unescape(encodeURIComponent(str)));
    }
  }
  toFileUrl(path) {
    let cached = this.memoizedFileURLs.get(path);
    if (cached) return cached;
    if (pathToFileURL) {
      let fileURL = pathToFileURL(path).toString();
      this.memoizedFileURLs.set(path, fileURL);
      return fileURL;
    } else {
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
    }
  }
  toUrl(path) {
    let cached = this.memoizedURLs.get(path);
    if (cached) return cached;
    if (sep === "\\") {
      path = path.replace(/\\/g, "/");
    }
    let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
    this.memoizedURLs.set(path, url);
    return url;
  }
};
var mapGenerator = MapGenerator$2;
const SINGLE_QUOTE = "'".charCodeAt(0);
const DOUBLE_QUOTE = '"'.charCodeAt(0);
const BACKSLASH = "\\".charCodeAt(0);
const SLASH = "/".charCodeAt(0);
const NEWLINE = "\n".charCodeAt(0);
const SPACE = " ".charCodeAt(0);
const FEED = "\f".charCodeAt(0);
const TAB = "	".charCodeAt(0);
const CR = "\r".charCodeAt(0);
const OPEN_SQUARE = "[".charCodeAt(0);
const CLOSE_SQUARE = "]".charCodeAt(0);
const OPEN_PARENTHESES = "(".charCodeAt(0);
const CLOSE_PARENTHESES = ")".charCodeAt(0);
const OPEN_CURLY = "{".charCodeAt(0);
const CLOSE_CURLY = "}".charCodeAt(0);
const SEMICOLON = ";".charCodeAt(0);
const ASTERISK = "*".charCodeAt(0);
const COLON = ":".charCodeAt(0);
const AT = "@".charCodeAt(0);
const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
const RE_HEX_ESCAPE = /[\da-f]/i;
var tokenize = function tokenizer(input2, options2 = {}) {
  let css = input2.css.valueOf();
  let ignore = options2.ignoreErrors;
  let code, content, escape2, next, quote;
  let currentToken, escaped, escapePos, n2, prev;
  let length = css.length;
  let pos = 0;
  let buffer = [];
  let returned = [];
  let lastBadParen = -1;
  function position() {
    return pos;
  }
  function unclosed(what) {
    throw input2.error("Unclosed " + what, pos);
  }
  function endOfFile() {
    return returned.length === 0 && pos >= length;
  }
  function nextToken(opts) {
    if (returned.length) return returned.pop();
    if (pos >= length) return;
    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
    code = css.charCodeAt(pos);
    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED: {
        next = pos;
        do {
          next += 1;
          code = css.charCodeAt(next);
        } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
        currentToken = ["space", css.slice(pos, next)];
        pos = next - 1;
        break;
      }
      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES: {
        let controlChar = String.fromCharCode(code);
        currentToken = [controlChar, controlChar, pos];
        break;
      }
      case OPEN_PARENTHESES: {
        prev = buffer.length ? buffer.pop()[1] : "";
        n2 = css.charCodeAt(pos + 1);
        if (prev === "url" && n2 !== SINGLE_QUOTE && n2 !== DOUBLE_QUOTE && n2 !== SPACE && n2 !== NEWLINE && n2 !== TAB && n2 !== FEED && n2 !== CR) {
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(")", next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos;
                break;
              } else {
                unclosed("bracket");
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
          pos = next;
        } else if (pos <= lastBadParen) {
          currentToken = ["(", "(", pos];
        } else {
          next = css.indexOf(")", pos + 1);
          content = css.slice(pos, next + 1);
          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            lastBadParen = next === -1 ? length : next;
            currentToken = ["(", "(", pos];
          } else {
            currentToken = ["brackets", content, pos, next];
            pos = next;
          }
        }
        break;
      }
      case SINGLE_QUOTE:
      case DOUBLE_QUOTE: {
        quote = code === SINGLE_QUOTE ? "'" : '"';
        next = pos;
        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);
          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1;
              break;
            } else {
              unclosed("string");
            }
          }
          escapePos = next;
          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);
        currentToken = ["string", css.slice(pos, next + 1), pos, next];
        pos = next;
        break;
      }
      case AT: {
        RE_AT_END.lastIndex = pos + 1;
        RE_AT_END.test(css);
        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1;
        } else {
          next = RE_AT_END.lastIndex - 2;
        }
        currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
        pos = next;
        break;
      }
      case BACKSLASH: {
        next = pos;
        escape2 = true;
        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1;
          escape2 = !escape2;
        }
        code = css.charCodeAt(next + 1);
        if (escape2 && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
          next += 1;
          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1;
            }
            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1;
            }
          }
        }
        currentToken = ["word", css.slice(pos, next + 1), pos, next];
        pos = next;
        break;
      }
      default: {
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf("*/", pos + 2) + 1;
          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length;
            } else {
              unclosed("comment");
            }
          }
          currentToken = ["comment", css.slice(pos, next + 1), pos, next];
          pos = next;
        } else {
          RE_WORD_END.lastIndex = pos + 1;
          RE_WORD_END.test(css);
          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_WORD_END.lastIndex - 2;
          }
          currentToken = ["word", css.slice(pos, next + 1), pos, next];
          buffer.push(currentToken);
          pos = next;
        }
        break;
      }
    }
    pos++;
    return currentToken;
  }
  function back(token) {
    returned.push(token);
  }
  return {
    back,
    endOfFile,
    nextToken,
    position
  };
};
let AtRule$1 = atRule;
let Comment$1 = comment;
let Declaration$1 = declaration;
let Root$3 = root;
let Rule$1 = rule;
let tokenizer2 = tokenize;
const SAFE_COMMENT_NEIGHBOR = {
  empty: true,
  space: true
};
function findLastWithPosition(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    let token = tokens[i];
    let pos = token[3] || token[2];
    if (pos) return pos;
  }
}
function tokensToString(tokens, from, to) {
  let result2 = "";
  for (let i = from; i < to; i++) result2 += tokens[i][1];
  return result2;
}
let Parser$1 = class Parser2 {
  constructor(input2) {
    this.input = input2;
    this.root = new Root$3();
    this.current = this.root;
    this.spaces = "";
    this.semicolon = false;
    this.createTokenizer();
    this.root.source = { input: input2, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(token) {
    let node2 = new AtRule$1();
    node2.name = token[1].slice(1);
    if (node2.name === "") {
      this.unnamedAtrule(node2, token);
    }
    this.init(node2, token[2]);
    let type;
    let prev;
    let shift;
    let last = false;
    let open = false;
    let params = [];
    let brackets = [];
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      type = token[0];
      if (type === "(" || type === "[") {
        brackets.push(type === "(" ? ")" : "]");
      } else if (type === "{" && brackets.length > 0) {
        brackets.push("}");
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
      }
      if (brackets.length === 0) {
        if (type === ";") {
          node2.source.end = this.getPosition(token[2]);
          node2.source.end.offset++;
          this.semicolon = true;
          break;
        } else if (type === "{") {
          open = true;
          break;
        } else if (type === "}") {
          if (params.length > 0) {
            shift = params.length - 1;
            prev = params[shift];
            while (prev && prev[0] === "space") {
              prev = params[--shift];
            }
            if (prev) {
              node2.source.end = this.getPosition(prev[3] || prev[2]);
              node2.source.end.offset++;
            }
          }
          this.end(token);
          break;
        } else {
          params.push(token);
        }
      } else {
        params.push(token);
      }
      if (this.tokenizer.endOfFile()) {
        last = true;
        break;
      }
    }
    node2.raws.between = this.spacesAndCommentsFromEnd(params);
    if (params.length) {
      node2.raws.afterName = this.spacesAndCommentsFromStart(params);
      this.raw(node2, "params", params);
      if (last) {
        token = params[params.length - 1];
        node2.source.end = this.getPosition(token[3] || token[2]);
        node2.source.end.offset++;
        this.spaces = node2.raws.between;
        node2.raws.between = "";
      }
    } else {
      node2.raws.afterName = "";
      node2.params = "";
    }
    if (open) {
      node2.nodes = [];
      this.current = node2;
    }
  }
  checkMissedSemicolon(tokens) {
    let colon = this.colon(tokens);
    if (colon === false) return;
    let founded = 0;
    let token;
    for (let j = colon - 1; j >= 0; j--) {
      token = tokens[j];
      if (token[0] !== "space") {
        founded += 1;
        if (founded === 2) break;
      }
    }
    throw this.input.error(
      "Missed semicolon",
      token[0] === "word" ? token[3] + 1 : token[2]
    );
  }
  colon(tokens) {
    let brackets = 0;
    let prev, token, type;
    for (let [i, element] of tokens.entries()) {
      token = element;
      type = token[0];
      if (type === "(") {
        brackets += 1;
      }
      if (type === ")") {
        brackets -= 1;
      }
      if (brackets === 0 && type === ":") {
        if (!prev) {
          this.doubleColon(token);
        } else if (prev[0] === "word" && prev[1] === "progid") {
          continue;
        } else {
          return i;
        }
      }
      prev = token;
    }
    return false;
  }
  comment(token) {
    let node2 = new Comment$1();
    this.init(node2, token[2]);
    node2.source.end = this.getPosition(token[3] || token[2]);
    node2.source.end.offset++;
    let text = token[1].slice(2, -2);
    if (!text.trim()) {
      node2.text = "";
      node2.raws.left = text;
      node2.raws.right = "";
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
      node2.text = match[2];
      node2.raws.left = match[1];
      node2.raws.right = match[3];
    }
  }
  createTokenizer() {
    this.tokenizer = tokenizer2(this.input);
  }
  decl(tokens, customProperty) {
    let node2 = new Declaration$1();
    this.init(node2, tokens[0][2]);
    let last = tokens[tokens.length - 1];
    if (last[0] === ";") {
      this.semicolon = true;
      tokens.pop();
    }
    node2.source.end = this.getPosition(
      last[3] || last[2] || findLastWithPosition(tokens)
    );
    node2.source.end.offset++;
    let start = 0;
    while (tokens[start][0] !== "word") {
      if (start === tokens.length - 1) this.unknownWord([tokens[start]]);
      start++;
    }
    node2.raws.before += tokensToString(tokens, 0, start);
    node2.source.start = this.getPosition(tokens[start][2]);
    let propStart = start;
    while (start < tokens.length) {
      let type = tokens[start][0];
      if (type === ":" || type === "space" || type === "comment") {
        break;
      }
      start++;
    }
    node2.prop = tokensToString(tokens, propStart, start);
    let betweenStart = start;
    let token;
    while (start < tokens.length) {
      token = tokens[start];
      start++;
      if (token[0] === ":") break;
      if (token[0] === "word" && /\w/.test(token[1])) {
        this.unknownWord([token]);
      }
    }
    node2.raws.between = tokensToString(tokens, betweenStart, start);
    if (node2.prop[0] === "_" || node2.prop[0] === "*") {
      node2.raws.before += node2.prop[0];
      node2.prop = node2.prop.slice(1);
    }
    let firstSpacesStart = start;
    while (start < tokens.length) {
      let next = tokens[start][0];
      if (next !== "space" && next !== "comment") break;
      start++;
    }
    let firstSpaces = tokens.slice(firstSpacesStart, start);
    tokens = tokens.slice(start);
    this.precheckMissedSemicolon(tokens);
    for (let i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];
      if (token[1].toLowerCase() === "!important") {
        node2.important = true;
        let string2 = this.stringFrom(tokens, i);
        string2 = this.spacesFromEnd(tokens) + string2;
        if (string2 !== " !important") node2.raws.important = string2;
        break;
      } else if (token[1].toLowerCase() === "important") {
        let cache = tokens.slice(0);
        let str = "";
        for (let j = i; j > 0; j--) {
          let type = cache[j][0];
          if (str.trim().startsWith("!") && type !== "space") {
            break;
          }
          str = cache.pop()[1] + str;
        }
        if (str.trim().startsWith("!")) {
          node2.important = true;
          node2.raws.important = str;
          tokens = cache;
        }
      }
      if (token[0] !== "space" && token[0] !== "comment") {
        break;
      }
    }
    let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
    if (hasWord) {
      node2.raws.between += firstSpaces.map((i) => i[1]).join("");
      firstSpaces = [];
    }
    this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
    if (node2.value.includes(":") && !customProperty) {
      this.checkMissedSemicolon(tokens);
    }
  }
  doubleColon(token) {
    throw this.input.error(
      "Double colon",
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    );
  }
  emptyRule(token) {
    let node2 = new Rule$1();
    this.init(node2, token[2]);
    node2.selector = "";
    node2.raws.between = "";
    this.current = node2;
  }
  end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.semicolon = false;
    this.current.raws.after = (this.current.raws.after || "") + this.spaces;
    this.spaces = "";
    if (this.current.parent) {
      this.current.source.end = this.getPosition(token[2]);
      this.current.source.end.offset++;
      this.current = this.current.parent;
    } else {
      this.unexpectedClose(token);
    }
  }
  endFile() {
    if (this.current.parent) this.unclosedBlock();
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.current.raws.after = (this.current.raws.after || "") + this.spaces;
    this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(token) {
    this.spaces += token[1];
    if (this.current.nodes) {
      let prev = this.current.nodes[this.current.nodes.length - 1];
      if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces;
        this.spaces = "";
        prev.source.end = this.getPosition(token[2]);
        prev.source.end.offset++;
      }
    }
  }
  // Helpers
  getPosition(offset) {
    let pos = this.input.fromOffset(offset);
    return {
      column: pos.col,
      line: pos.line,
      offset
    };
  }
  init(node2, offset) {
    this.current.push(node2);
    node2.source = {
      input: this.input,
      start: this.getPosition(offset)
    };
    node2.raws.before = this.spaces;
    this.spaces = "";
    if (node2.type !== "comment") this.semicolon = false;
  }
  other(start) {
    let end = false;
    let type = null;
    let colon = false;
    let bracket = null;
    let brackets = [];
    let customProperty = start[1].startsWith("--");
    let tokens = [];
    let token = start;
    while (token) {
      type = token[0];
      tokens.push(token);
      if (type === "(" || type === "[") {
        if (!bracket) bracket = token;
        brackets.push(type === "(" ? ")" : "]");
      } else if (customProperty && colon && type === "{") {
        if (!bracket) bracket = token;
        brackets.push("}");
      } else if (brackets.length === 0) {
        if (type === ";") {
          if (colon) {
            this.decl(tokens, customProperty);
            return;
          } else {
            break;
          }
        } else if (type === "{") {
          this.rule(tokens);
          return;
        } else if (type === "}") {
          this.tokenizer.back(tokens.pop());
          end = true;
          break;
        } else if (type === ":") {
          colon = true;
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
        if (brackets.length === 0) bracket = null;
      }
      token = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile()) end = true;
    if (brackets.length > 0) this.unclosedBracket(bracket);
    if (end && colon) {
      if (!customProperty) {
        while (tokens.length) {
          token = tokens[tokens.length - 1][0];
          if (token !== "space" && token !== "comment") break;
          this.tokenizer.back(tokens.pop());
        }
      }
      this.decl(tokens, customProperty);
    } else {
      this.unknownWord(tokens);
    }
  }
  parse() {
    let token;
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      switch (token[0]) {
        case "space":
          this.spaces += token[1];
          break;
        case ";":
          this.freeSemicolon(token);
          break;
        case "}":
          this.end(token);
          break;
        case "comment":
          this.comment(token);
          break;
        case "at-word":
          this.atrule(token);
          break;
        case "{":
          this.emptyRule(token);
          break;
        default:
          this.other(token);
          break;
      }
    }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(node2, prop, tokens, customProperty) {
    let token, type;
    let length = tokens.length;
    let value = "";
    let last = "";
    let clean = true;
    let next, prev;
    for (let i = 0; i < length; i += 1) {
      token = tokens[i];
      type = token[0];
      if (type === "space" && i === length - 1 && !customProperty) {
        clean = false;
      } else if (type === "comment") {
        prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
        next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
        if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
          if (last === ",") {
            clean = false;
          } else {
            value += token[1];
            last = token[1].slice(-1);
          }
        } else {
          clean = false;
        }
      } else {
        value += token[1];
        last = token[1].slice(-1);
      }
    }
    if (!clean) {
      let raw = tokens.reduce((all, i) => all + i[1], "");
      node2.raws[prop] = { raw, value };
    }
    node2[prop] = value;
  }
  rule(tokens) {
    tokens.pop();
    let node2 = new Rule$1();
    this.init(node2, tokens[0][2]);
    node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
    this.raw(node2, "selector", tokens);
    this.current = node2;
  }
  spacesAndCommentsFromEnd(tokens) {
    let lastTokenType;
    let spaces = "";
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== "space" && lastTokenType !== "comment") break;
      spaces = tokens.pop()[1] + spaces;
    }
    return spaces;
  }
  // Errors
  spacesAndCommentsFromStart(tokens) {
    let next;
    let spaces = "";
    while (tokens.length) {
      next = tokens[0][0];
      if (next !== "space" && next !== "comment") break;
      spaces += tokens.shift()[1];
    }
    return spaces;
  }
  spacesFromEnd(tokens) {
    let lastTokenType;
    let spaces = "";
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== "space") break;
      spaces = tokens.pop()[1] + spaces;
    }
    return spaces;
  }
  stringFrom(tokens, from) {
    let result2 = "";
    for (let i = from; i < tokens.length; i++) {
      result2 += tokens[i][1];
    }
    tokens.splice(from, tokens.length - from);
    return result2;
  }
  unclosedBlock() {
    let pos = this.current.source.start;
    throw this.input.error("Unclosed block", pos.line, pos.column);
  }
  unclosedBracket(bracket) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: bracket[2] },
      { offset: bracket[2] + 1 }
    );
  }
  unexpectedClose(token) {
    throw this.input.error(
      "Unexpected }",
      { offset: token[2] },
      { offset: token[2] + 1 }
    );
  }
  unknownWord(tokens) {
    throw this.input.error(
      "Unknown word " + tokens[0][1],
      { offset: tokens[0][2] },
      { offset: tokens[0][2] + tokens[0][1].length }
    );
  }
  unnamedAtrule(node2, token) {
    throw this.input.error(
      "At-rule without name",
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    );
  }
};
var parser = Parser$1;
let Container$3 = container;
let Input$1 = input;
let Parser3 = parser;
function parse$3(css, opts) {
  let input2 = new Input$1(css, opts);
  let parser2 = new Parser3(input2);
  try {
    parser2.parse();
  } catch (e) {
    throw e;
  }
  return parser2.root;
}
var parse_1 = parse$3;
parse$3.default = parse$3;
Container$3.registerParse(parse$3);
let Container$2 = container;
let { my: my$1 } = symbols;
let Warning$2 = class Warning {
  constructor(text, opts = {}) {
    this.type = "warning";
    this.text = text;
    if (opts.node && opts.node.source) {
      if (!opts.node[my$1]) {
        Container$2.rebuild(opts.node);
      }
      let range = opts.node.rangeBy(opts);
      this.line = range.start.line;
      this.column = range.start.column;
      this.endLine = range.end.line;
      this.endColumn = range.end.column;
    }
    for (let opt in opts) this[opt] = opts[opt];
  }
  toString() {
    if (this.node) {
      return this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        start: this.start,
        word: this.word
      }).message;
    }
    if (this.plugin) {
      return this.plugin + ": " + this.text;
    }
    return this.text;
  }
};
var warning = Warning$2;
Warning$2.default = Warning$2;
let Warning$1 = warning;
let Result$3 = class Result {
  get content() {
    return this.css;
  }
  constructor(processor2, root2, opts) {
    this.processor = processor2;
    this.messages = [];
    this.root = root2;
    this.opts = opts;
    this.css = "";
    this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(text, opts = {}) {
    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }
    let warning2 = new Warning$1(text, opts);
    this.messages.push(warning2);
    return warning2;
  }
  warnings() {
    return this.messages.filter((i) => i.type === "warning");
  }
};
var result = Result$3;
Result$3.default = Result$3;
let Container$1 = container;
let Document$3 = document$1;
let MapGenerator$1 = mapGenerator;
let parse$2 = parse_1;
let Result$2 = result;
let Root$2 = root;
let stringify$2 = stringify_1;
let { isClean, my } = symbols;
const TYPE_TO_CLASS_NAME = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
};
const PLUGIN_PROPS = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
};
const NOT_VISITORS = {
  Once: true,
  postcssPlugin: true,
  prepare: true
};
const CHILDREN = 0;
function isPromise(obj) {
  return typeof obj === "object" && typeof obj.then === "function";
}
function getEvents(node2) {
  let key = false;
  let type = TYPE_TO_CLASS_NAME[node2.type];
  if (node2.type === "decl") {
    key = node2.prop.toLowerCase();
  } else if (node2.type === "atrule") {
    key = node2.name.toLowerCase();
  }
  if (key && node2.append) {
    return [
      type,
      type + "-" + key,
      CHILDREN,
      type + "Exit",
      type + "Exit-" + key
    ];
  } else if (key) {
    return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
  } else if (node2.append) {
    return [type, CHILDREN, type + "Exit"];
  } else {
    return [type, type + "Exit"];
  }
}
function toStack(node2) {
  let events;
  if (node2.type === "document") {
    events = ["Document", CHILDREN, "DocumentExit"];
  } else if (node2.type === "root") {
    events = ["Root", CHILDREN, "RootExit"];
  } else {
    events = getEvents(node2);
  }
  return {
    eventIndex: 0,
    events,
    iterator: 0,
    node: node2,
    visitorIndex: 0,
    visitors: []
  };
}
function cleanMarks(node2) {
  let stack = [node2];
  while (stack.length > 0) {
    let next = stack.pop();
    next[isClean] = false;
    if (next.nodes) {
      for (let i of next.nodes) stack.push(i);
    }
  }
  return node2;
}
let postcss$1 = {};
let LazyResult$2 = class LazyResult {
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
  constructor(processor2, css, opts) {
    this.stringified = false;
    this.processed = false;
    let root2;
    if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
      root2 = cleanMarks(css);
    } else if (css instanceof LazyResult || css instanceof Result$2) {
      root2 = cleanMarks(css.root);
      if (css.map) {
        if (typeof opts.map === "undefined") opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      let parser2 = parse$2;
      if (opts.syntax) parser2 = opts.syntax.parse;
      if (opts.parser) parser2 = opts.parser;
      if (parser2.parse) parser2 = parser2.parse;
      try {
        root2 = parser2(css, opts);
      } catch (error) {
        this.processed = true;
        this.error = error;
      }
      if (root2 && !root2[my]) {
        Container$1.rebuild(root2);
      }
    }
    this.result = new Result$2(processor2, root2, opts);
    this.helpers = { ...postcss$1, postcss: postcss$1, result: this.result };
    this.plugins = this.processor.plugins.map((plugin2) => {
      if (typeof plugin2 === "object" && plugin2.prepare) {
        return { ...plugin2, ...plugin2.prepare(this.result) };
      } else {
        return plugin2;
      }
    });
  }
  async() {
    if (this.error) return Promise.reject(this.error);
    if (this.processed) return Promise.resolve(this.result);
    if (!this.processing) {
      this.processing = this.runAsync();
    }
    return this.processing;
  }
  catch(onRejected) {
    return this.async().catch(onRejected);
  }
  finally(onFinally) {
    return this.async().finally(onFinally);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(error, node2) {
    let plugin2 = this.result.lastPlugin;
    try {
      if (node2) node2.addToError(error);
      this.error = error;
      if (error.name === "CssSyntaxError" && !error.plugin) {
        error.plugin = plugin2.postcssPlugin;
        error.setMessage();
      } else if (plugin2.postcssVersion) {
        if (false) ;
      }
    } catch (err) {
      if (console && console.error) console.error(err);
    }
    return error;
  }
  prepareVisitors() {
    this.listeners = {};
    let add = (plugin2, type, cb2) => {
      if (!this.listeners[type]) this.listeners[type] = [];
      this.listeners[type].push([plugin2, cb2]);
    };
    for (let plugin2 of this.plugins) {
      if (typeof plugin2 === "object") {
        for (let event in plugin2) {
          if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
            throw new Error(
              `Unknown event ${event} in ${plugin2.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          }
          if (!NOT_VISITORS[event]) {
            if (typeof plugin2[event] === "object") {
              for (let filter2 in plugin2[event]) {
                if (filter2 === "*") {
                  add(plugin2, event, plugin2[event][filter2]);
                } else {
                  add(
                    plugin2,
                    event + "-" + filter2.toLowerCase(),
                    plugin2[event][filter2]
                  );
                }
              }
            } else if (typeof plugin2[event] === "function") {
              add(plugin2, event, plugin2[event]);
            }
          }
        }
      }
    }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin2 = this.plugins[i];
      let promise = this.runOnRoot(plugin2);
      if (isPromise(promise)) {
        try {
          await promise;
        } catch (error) {
          throw this.handleError(error);
        }
      }
    }
    this.prepareVisitors();
    if (this.hasListener) {
      let root2 = this.result.root;
      while (!root2[isClean]) {
        root2[isClean] = true;
        let stack = [toStack(root2)];
        while (stack.length > 0) {
          let promise = this.visitTick(stack);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (e) {
              let node2 = stack[stack.length - 1].node;
              throw this.handleError(e, node2);
            }
          }
        }
      }
      if (this.listeners.OnceExit) {
        for (let [plugin2, visitor] of this.listeners.OnceExit) {
          this.result.lastPlugin = plugin2;
          try {
            if (root2.type === "document") {
              let roots = root2.nodes.map(
                (subRoot) => visitor(subRoot, this.helpers)
              );
              await Promise.all(roots);
            } else {
              await visitor(root2, this.helpers);
            }
          } catch (e) {
            throw this.handleError(e);
          }
        }
      }
    }
    this.processed = true;
    return this.stringify();
  }
  runOnRoot(plugin2) {
    this.result.lastPlugin = plugin2;
    try {
      if (typeof plugin2 === "object" && plugin2.Once) {
        if (this.result.root.type === "document") {
          let roots = this.result.root.nodes.map(
            (root2) => plugin2.Once(root2, this.helpers)
          );
          if (isPromise(roots[0])) {
            return Promise.all(roots);
          }
          return roots;
        }
        return plugin2.Once(this.result.root, this.helpers);
      } else if (typeof plugin2 === "function") {
        return plugin2(this.result.root, this.result);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = true;
    this.sync();
    let opts = this.result.opts;
    let str = stringify$2;
    if (opts.syntax) str = opts.syntax.stringify;
    if (opts.stringifier) str = opts.stringifier;
    if (str.stringify) str = str.stringify;
    let rootSource = this.result.root.source;
    if (opts.map === void 0 && !(rootSource && rootSource.input && rootSource.input.map)) {
      let result2 = "";
      str(this.result.root, (i) => {
        result2 += i;
      });
      this.result.css = result2;
      return this.result;
    }
    let map = new MapGenerator$1(str, this.result.root, this.result.opts);
    let data = map.generate();
    this.result.css = data[0];
    this.result.map = data[1];
    return this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    this.processed = true;
    if (this.processing) {
      throw this.getAsyncError();
    }
    for (let plugin2 of this.plugins) {
      let promise = this.runOnRoot(plugin2);
      if (isPromise(promise)) {
        throw this.getAsyncError();
      }
    }
    this.prepareVisitors();
    if (this.hasListener) {
      let root2 = this.result.root;
      while (!root2[isClean]) {
        root2[isClean] = true;
        this.walkSync(root2);
      }
      if (this.listeners.OnceExit) {
        if (root2.type === "document") {
          for (let subRoot of root2.nodes) {
            this.visitSync(this.listeners.OnceExit, subRoot);
          }
        } else {
          this.visitSync(this.listeners.OnceExit, root2);
        }
      }
    }
    return this.result;
  }
  then(onFulfilled, onRejected) {
    return this.async().then(onFulfilled, onRejected);
  }
  toString() {
    return this.css;
  }
  visitSync(visitors, node2) {
    for (let [plugin2, visitor] of visitors) {
      this.result.lastPlugin = plugin2;
      let promise;
      try {
        promise = visitor(node2, this.helpers);
      } catch (e) {
        throw this.handleError(e, node2.proxyOf);
      }
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        return true;
      }
      if (isPromise(promise)) {
        throw this.getAsyncError();
      }
    }
  }
  visitTick(stack) {
    let visit = stack[stack.length - 1];
    let { node: node2, visitors } = visit;
    if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
      stack.pop();
      return;
    }
    if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
      let [plugin2, visitor] = visitors[visit.visitorIndex];
      visit.visitorIndex += 1;
      if (visit.visitorIndex === visitors.length) {
        visit.visitors = [];
        visit.visitorIndex = 0;
      }
      this.result.lastPlugin = plugin2;
      try {
        return visitor(node2.toProxy(), this.helpers);
      } catch (e) {
        throw this.handleError(e, node2);
      }
    }
    if (visit.iterator !== 0) {
      let iterator = visit.iterator;
      if (visit.descending) {
        visit.descending = false;
        node2.indexes[iterator] += 1;
      }
      let child;
      while (child = node2.nodes[node2.indexes[iterator]]) {
        if (!child[isClean]) {
          child[isClean] = true;
          visit.descending = true;
          stack.push(toStack(child));
          return;
        }
        node2.indexes[iterator] += 1;
      }
      visit.iterator = 0;
      delete node2.indexes[iterator];
    }
    let events = visit.events;
    while (visit.eventIndex < events.length) {
      let event = events[visit.eventIndex];
      visit.eventIndex += 1;
      if (event === CHILDREN) {
        if (node2.nodes && node2.nodes.length) {
          node2[isClean] = true;
          visit.iterator = node2.getIterator();
        }
        return;
      } else if (this.listeners[event]) {
        visit.visitors = this.listeners[event];
        return;
      }
    }
    stack.pop();
  }
  walkSync(node2) {
    node2[isClean] = true;
    let stack = [{ eventIndex: 0, events: getEvents(node2), iterator: 0, node: node2 }];
    while (stack.length > 0) {
      let visit = stack[stack.length - 1];
      let visitNode = visit.node;
      if (visit.iterator !== 0) {
        let iterator = visit.iterator;
        if (visit.descending) {
          visit.descending = false;
          visitNode.indexes[iterator] += 1;
        }
        let child;
        let descended = false;
        while (child = visitNode.nodes[visitNode.indexes[iterator]]) {
          if (!child[isClean]) {
            child[isClean] = true;
            visit.descending = true;
            stack.push({
              eventIndex: 0,
              events: getEvents(child),
              iterator: 0,
              node: child
            });
            descended = true;
            break;
          }
          visitNode.indexes[iterator] += 1;
        }
        if (descended) continue;
        visit.iterator = 0;
        delete visitNode.indexes[iterator];
      }
      if (visit.eventIndex < visit.events.length) {
        let event = visit.events[visit.eventIndex];
        visit.eventIndex += 1;
        if (event === CHILDREN) {
          if (visitNode.nodes && visitNode.nodes.length) {
            visit.iterator = visitNode.getIterator();
          }
        } else {
          let visitors = this.listeners[event];
          if (visitors) {
            if (this.visitSync(visitors, visitNode.toProxy())) stack.pop();
          }
        }
        continue;
      }
      stack.pop();
    }
  }
  warnings() {
    return this.sync().warnings();
  }
};
LazyResult$2.registerPostcss = (dependant) => {
  postcss$1 = dependant;
};
var lazyResult = LazyResult$2;
LazyResult$2.default = LazyResult$2;
Root$2.registerLazyResult(LazyResult$2);
Document$3.registerLazyResult(LazyResult$2);
let MapGenerator2 = mapGenerator;
let parse$1 = parse_1;
let Result$1 = result;
let stringify$1 = stringify_1;
let NoWorkResult$1 = class NoWorkResult {
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root) {
      return this._root;
    }
    let root2;
    let parser2 = parse$1;
    try {
      root2 = parser2(this._css, this._opts);
    } catch (error) {
      this.error = error;
    }
    if (this.error) {
      throw this.error;
    } else {
      this._root = root2;
      return root2;
    }
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
  constructor(processor2, css, opts) {
    css = css.toString();
    this.stringified = false;
    this._processor = processor2;
    this._css = css;
    this._opts = opts;
    this._map = void 0;
    let str = stringify$1;
    this.result = new Result$1(this._processor, void 0, this._opts);
    this.result.css = css;
    let self2 = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return self2.root;
      }
    });
    let map = new MapGenerator2(str, void 0, this._opts, css);
    if (map.isMap()) {
      let [generatedCSS, generatedMap] = map.generate();
      if (generatedCSS) {
        this.result.css = generatedCSS;
      }
      if (generatedMap) {
        this.result.map = generatedMap;
      }
    } else {
      map.clearAnnotation();
      this.result.css = map.css;
    }
  }
  async() {
    if (this.error) return Promise.reject(this.error);
    return Promise.resolve(this.result);
  }
  catch(onRejected) {
    return this.async().catch(onRejected);
  }
  finally(onFinally) {
    return this.async().finally(onFinally);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(onFulfilled, onRejected) {
    return this.async().then(onFulfilled, onRejected);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
};
var noWorkResult = NoWorkResult$1;
NoWorkResult$1.default = NoWorkResult$1;
let Document$2 = document$1;
let LazyResult$1 = lazyResult;
let NoWorkResult2 = noWorkResult;
let Root$1 = root;
let Processor$1 = class Processor {
  constructor(plugins2 = []) {
    this.version = "8.5.32";
    this.plugins = this.normalize(plugins2);
  }
  normalize(plugins2) {
    let normalized = [];
    for (let i of plugins2) {
      if (i.postcss === true) {
        i = i();
      } else if (i.postcss) {
        i = i.postcss;
      }
      if (typeof i === "object" && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === "object" && i.postcssPlugin) {
        normalized.push(i);
      } else if (typeof i === "function") {
        normalized.push(i);
      } else if (typeof i === "object" && (i.parse || i.stringify)) ;
      else {
        throw new Error(i + " is not a PostCSS plugin");
      }
    }
    return normalized;
  }
  process(css, opts = {}) {
    if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
      return new NoWorkResult2(this, css, opts);
    } else {
      return new LazyResult$1(this, css, opts);
    }
  }
  use(plugin2) {
    this.plugins = this.plugins.concat(this.normalize([plugin2]));
    return this;
  }
};
var processor = Processor$1;
Processor$1.default = Processor$1;
Root$1.registerProcessor(Processor$1);
Document$2.registerProcessor(Processor$1);
var define_process_env_default = { API_URL: "https://backend.revenuehunt.com", REMIX_BASENAME: "/v2", SENTRY_DSN: "https://f5bd9289b4f35ee9dfb3e335f01911b9@o4508088844288000.ingest.us.sentry.io/4508240980934656", SHOPIFY_API_KEY: "66c8f4d8af29534c6f3d5888d7d93e9e", NODE_ENV: "production" };
let AtRule2 = atRule;
let Comment3 = comment;
let Container2 = container;
let CssSyntaxError2 = cssSyntaxError;
let Declaration2 = declaration;
let Document$1 = document$1;
let fromJSON = fromJSON_1;
let Input2 = input;
let LazyResult2 = lazyResult;
let list = list_1;
let Node3 = node;
let parse = parse_1;
let Processor2 = processor;
let Result2 = result;
let Root2 = root;
let Rule2 = rule;
let stringify = stringify_1;
let Warning2 = warning;
function postcss(...plugins2) {
  if (plugins2.length === 1 && Array.isArray(plugins2[0])) {
    plugins2 = plugins2[0];
  }
  return new Processor2(plugins2);
}
postcss.plugin = function plugin(name, initializer) {
  let warningPrinted = false;
  function creator(...args) {
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true;
      console.warn(
        name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
      );
      if (define_process_env_default.LANG && define_process_env_default.LANG.startsWith("zh")) {
        console.warn(
          name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226"
        );
      }
    }
    let transformer = initializer(...args);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new Processor2().version;
    return transformer;
  }
  let cache;
  Object.defineProperty(creator, "postcss", {
    get() {
      if (!cache) cache = creator();
      return cache;
    }
  });
  creator.process = function(css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };
  return creator;
};
postcss.stringify = stringify;
postcss.parse = parse;
postcss.fromJSON = fromJSON;
postcss.list = list;
postcss.comment = (defaults) => new Comment3(defaults);
postcss.atRule = (defaults) => new AtRule2(defaults);
postcss.decl = (defaults) => new Declaration2(defaults);
postcss.rule = (defaults) => new Rule2(defaults);
postcss.root = (defaults) => new Root2(defaults);
postcss.document = (defaults) => new Document$1(defaults);
postcss.CssSyntaxError = CssSyntaxError2;
postcss.Declaration = Declaration2;
postcss.Container = Container2;
postcss.Processor = Processor2;
postcss.Document = Document$1;
postcss.Comment = Comment3;
postcss.Warning = Warning2;
postcss.AtRule = AtRule2;
postcss.Result = Result2;
postcss.Input = Input2;
postcss.Rule = Rule2;
postcss.Root = Root2;
postcss.Node = Node3;
LazyResult2.registerPostcss(postcss);
var postcss_1 = postcss;
postcss.default = postcss;
var launder = { exports: {} };
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t2, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t2 = 1e3, e = 6e4, n2 = 36e5, r2 = "millisecond", i = "second", s = "minute", u2 = "hour", a = "day", o = "week", c = "month", f2 = "quarter", h = "year", d = "date", l2 = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
      var e2 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
      return "[" + t3 + (e2[(n3 - 20) % 10] || e2[n3] || e2[0]) + "]";
    } }, m2 = function(t3, e2, n3) {
      var r3 = String(t3);
      return !r3 || r3.length >= e2 ? t3 : "" + Array(e2 + 1 - r3.length).join(n3) + t3;
    }, v2 = { s: m2, z: function(t3) {
      var e2 = -t3.utcOffset(), n3 = Math.abs(e2), r3 = Math.floor(n3 / 60), i2 = n3 % 60;
      return (e2 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i2, 2, "0");
    }, m: function t3(e2, n3) {
      if (e2.date() < n3.date()) return -t3(n3, e2);
      var r3 = 12 * (n3.year() - e2.year()) + (n3.month() - e2.month()), i2 = e2.clone().add(r3, c), s2 = n3 - i2 < 0, u3 = e2.clone().add(r3 + (s2 ? -1 : 1), c);
      return +(-(r3 + (n3 - i2) / (s2 ? i2 - u3 : u3 - i2)) || 0);
    }, a: function(t3) {
      return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
    }, p: function(t3) {
      return { M: c, y: h, w: o, d: a, D: d, h: u2, m: s, s: i, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t3) {
      return void 0 === t3;
    } }, g = "en", D2 = {};
    D2[g] = M2;
    var p2 = "$isDayjsObject", S2 = function(t3) {
      return t3 instanceof _ || !(!t3 || !t3[p2]);
    }, w2 = function t3(e2, n3, r3) {
      var i2;
      if (!e2) return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D2[s2] && (i2 = s2), n3 && (D2[s2] = n3, i2 = s2);
        var u3 = e2.split("-");
        if (!i2 && u3.length > 1) return t3(u3[0]);
      } else {
        var a2 = e2.name;
        D2[a2] = e2, i2 = a2;
      }
      return !r3 && i2 && (g = i2), i2 || !r3 && g;
    }, O2 = function(t3, e2) {
      if (S2(t3)) return t3.clone();
      var n3 = "object" == typeof e2 ? e2 : {};
      return n3.date = t3, n3.args = arguments, new _(n3);
    }, b = v2;
    b.l = w2, b.i = S2, b.w = function(t3, e2) {
      return O2(t3, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M3(t3) {
        this.$L = w2(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p2] = true;
      }
      var m3 = M3.prototype;
      return m3.parse = function(t3) {
        this.$d = function(t4) {
          var e2 = t4.date, n3 = t4.utc;
          if (null === e2) return /* @__PURE__ */ new Date(NaN);
          if (b.u(e2)) return /* @__PURE__ */ new Date();
          if (e2 instanceof Date) return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r3 = e2.match($);
            if (r3) {
              var i2 = r3[2] - 1 || 0, s2 = (r3[7] || "0").substring(0, 3);
              return n3 ? new Date(Date.UTC(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2)) : new Date(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t3), this.init();
      }, m3.init = function() {
        var t3 = this.$d;
        this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
      }, m3.$utils = function() {
        return b;
      }, m3.isValid = function() {
        return !(this.$d.toString() === l2);
      }, m3.isSame = function(t3, e2) {
        var n3 = O2(t3);
        return this.startOf(e2) <= n3 && n3 <= this.endOf(e2);
      }, m3.isAfter = function(t3, e2) {
        return O2(t3) < this.startOf(e2);
      }, m3.isBefore = function(t3, e2) {
        return this.endOf(e2) < O2(t3);
      }, m3.$g = function(t3, e2, n3) {
        return b.u(t3) ? this[e2] : this.set(n3, t3);
      }, m3.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m3.valueOf = function() {
        return this.$d.getTime();
      }, m3.startOf = function(t3, e2) {
        var n3 = this, r3 = !!b.u(e2) || e2, f3 = b.p(t3), l3 = function(t4, e3) {
          var i2 = b.w(n3.$u ? Date.UTC(n3.$y, e3, t4) : new Date(n3.$y, e3, t4), n3);
          return r3 ? i2 : i2.endOf(a);
        }, $2 = function(t4, e3) {
          return b.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n3);
        }, y3 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
        switch (f3) {
          case h:
            return r3 ? l3(1, 0) : l3(31, 11);
          case c:
            return r3 ? l3(1, M4) : l3(0, M4 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D3 = (y3 < g2 ? y3 + 7 : y3) - g2;
            return l3(r3 ? m4 - D3 : m4 + (6 - D3), M4);
          case a:
          case d:
            return $2(v3 + "Hours", 0);
          case u2:
            return $2(v3 + "Minutes", 1);
          case s:
            return $2(v3 + "Seconds", 2);
          case i:
            return $2(v3 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m3.endOf = function(t3) {
        return this.startOf(t3, false);
      }, m3.$set = function(t3, e2) {
        var n3, o2 = b.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a] = f3 + "Date", n3[d] = f3 + "Date", n3[c] = f3 + "Month", n3[h] = f3 + "FullYear", n3[u2] = f3 + "Hours", n3[s] = f3 + "Minutes", n3[i] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h) {
          var y3 = this.clone().set(d, 1);
          y3.$d[l3]($2), y3.init(), this.$d = y3.set(d, Math.min(this.$D, y3.daysInMonth())).$d;
        } else l3 && this.$d[l3]($2);
        return this.init(), this;
      }, m3.set = function(t3, e2) {
        return this.clone().$set(t3, e2);
      }, m3.get = function(t3) {
        return this[b.p(t3)]();
      }, m3.add = function(r3, f3) {
        var d2, l3 = this;
        r3 = Number(r3);
        var $2 = b.p(f3), y3 = function(t3) {
          var e2 = O2(l3);
          return b.w(e2.date(e2.date() + Math.round(t3 * r3)), l3);
        };
        if ($2 === c) return this.set(c, this.$M + r3);
        if ($2 === h) return this.set(h, this.$y + r3);
        if ($2 === a) return y3(1);
        if ($2 === o) return y3(7);
        var M4 = (d2 = {}, d2[s] = e, d2[u2] = n2, d2[i] = t2, d2)[$2] || 1, m4 = this.$d.getTime() + r3 * M4;
        return b.w(m4, this);
      }, m3.subtract = function(t3, e2) {
        return this.add(-1 * t3, e2);
      }, m3.format = function(t3) {
        var e2 = this, n3 = this.$locale();
        if (!this.isValid()) return n3.invalidDate || l2;
        var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u3 = this.$m, a2 = this.$M, o2 = n3.weekdays, c2 = n3.months, f3 = n3.meridiem, h2 = function(t4, n4, i3, s3) {
          return t4 && (t4[n4] || t4(e2, r3)) || i3[n4].slice(0, s3);
        }, d2 = function(t4) {
          return b.s(s2 % 12 || 12, t4, "0");
        }, $2 = f3 || function(t4, e3, n4) {
          var r4 = t4 < 12 ? "AM" : "PM";
          return n4 ? r4.toLowerCase() : r4;
        };
        return r3.replace(y2, function(t4, r4) {
          return r4 || function(t5) {
            switch (t5) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h2(n3.monthsShort, a2, c2, 3);
              case "MMMM":
                return h2(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h2(n3.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h2(n3.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u3, true);
              case "A":
                return $2(s2, u3, false);
              case "m":
                return String(u3);
              case "mm":
                return b.s(u3, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t4) || i2.replace(":", "");
        });
      }, m3.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m3.diff = function(r3, d2, l3) {
        var $2, y3 = this, M4 = b.p(d2), m4 = O2(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e, g2 = this - m4, D3 = function() {
          return b.m(y3, m4);
        };
        switch (M4) {
          case h:
            $2 = D3() / 12;
            break;
          case c:
            $2 = D3();
            break;
          case f2:
            $2 = D3() / 3;
            break;
          case o:
            $2 = (g2 - v3) / 6048e5;
            break;
          case a:
            $2 = (g2 - v3) / 864e5;
            break;
          case u2:
            $2 = g2 / n2;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t2;
            break;
          default:
            $2 = g2;
        }
        return l3 ? $2 : b.a($2);
      }, m3.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m3.$locale = function() {
        return D2[this.$L];
      }, m3.locale = function(t3, e2) {
        if (!t3) return this.$L;
        var n3 = this.clone(), r3 = w2(t3, e2, true);
        return r3 && (n3.$L = r3), n3;
      }, m3.clone = function() {
        return b.w(this.$d, this);
      }, m3.toDate = function() {
        return new Date(this.valueOf());
      }, m3.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m3.toISOString = function() {
        return this.$d.toISOString();
      }, m3.toString = function() {
        return this.$d.toUTCString();
      }, M3;
    }(), Y2 = _.prototype;
    return O2.prototype = Y2, [["$ms", r2], ["$s", i], ["$m", s], ["$H", u2], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t3) {
      Y2[t3[1]] = function(e2) {
        return this.$g(e2, t3[0], t3[1]);
      };
    }), O2.extend = function(t3, e2) {
      return t3.$i || (t3(e2, _, O2), t3.$i = true), O2;
    }, O2.locale = w2, O2.isDayjs = S2, O2.unix = function(t3) {
      return O2(1e3 * t3);
    }, O2.en = D2[g], O2.Ls = D2, O2.p = {}, O2;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = dayjs_minExports;
function cleanHref(href) {
  href = href.replace(/[\x00-\x20]+/g, "");
  while (true) {
    const firstIndex = href.indexOf("<!--");
    if (firstIndex === -1) {
      break;
    }
    const lastIndex = href.indexOf("-->", firstIndex + 4);
    if (lastIndex === -1) {
      break;
    }
    href = href.substring(0, firstIndex) + href.substring(lastIndex + 3);
  }
  return href;
}
function naughtyHref(href, options2) {
  options2 = options2 || {};
  const allowedSchemes = options2.allowedSchemes || ["http", "https", "ftp", "mailto", "tel", "sms"];
  const allowProtocolRelative = options2.allowProtocolRelative !== false;
  if (typeof href !== "string") {
    return false;
  }
  href = cleanHref(href);
  const matches = href.match(/^([a-zA-Z][a-zA-Z0-9.\-+]*):/);
  if (!matches) {
    if (href.match(/^[/\\]{2}/)) {
      return !allowProtocolRelative;
    }
    return false;
  }
  const scheme = matches[1].toLowerCase();
  return allowedSchemes.indexOf(scheme) === -1;
}
launder.exports = function(options2) {
  const self2 = {};
  self2.options = options2 || {};
  self2.filterTag = self2.options.filterTag || function(tag) {
    tag = tag.trim();
    return tag.toLowerCase();
  };
  self2.string = function(s, def) {
    if (typeof s !== "string") {
      if (typeof s === "number" || typeof s === "boolean") {
        s += "";
      } else {
        s = "";
      }
    }
    s = s.trim();
    if (def !== void 0) {
      if (s === "") {
        s = def;
      }
    }
    return s;
  };
  self2.strings = function(strings) {
    if (!Array.isArray(strings)) {
      return [];
    }
    return strings.map(function(s) {
      return self2.string(s);
    });
  };
  self2.integer = function(i, def, min, max) {
    if (def === void 0) {
      def = 0;
    }
    if (typeof i === "number") {
      i = Math.floor(i);
    } else {
      try {
        i = parseInt(i, 10);
        if (isNaN(i)) {
          i = def;
        }
      } catch (e) {
        i = def;
      }
    }
    if (typeof min === "number" && i < min) {
      i = min;
    }
    if (typeof max === "number" && i > max) {
      i = max;
    }
    return i;
  };
  self2.padInteger = function(i, places) {
    let s = i + "";
    while (s.length < places) {
      s = "0" + s;
    }
    return s;
  };
  self2.float = function(i, def, min, max) {
    if (def === void 0) {
      def = 0;
    }
    if (!(typeof i === "number")) {
      try {
        i = parseFloat(i, 10);
        if (isNaN(i)) {
          i = def;
        }
      } catch (e) {
        i = def;
      }
    }
    if (typeof min === "number" && i < min) {
      i = min;
    }
    if (typeof max === "number" && i > max) {
      i = max;
    }
    return i;
  };
  self2.naughtyHref = naughtyHref;
  self2.url = function(s, def, httpsFix) {
    s = self2.string(s, def);
    if (s === def) {
      return s;
    }
    s = cleanHref(s);
    if (naughtyHref(s)) {
      return def;
    }
    s = fixUrl(s);
    if (s === null) {
      return def;
    }
    return s;
    function fixUrl(href) {
      if (href.match(/^(((https?|ftp):\/\/)|((mailto|tel|sms):)|#|([^/.]+)?\/|[^/.]+$)/)) {
        return href;
      } else if (href.match(/^[^/.]+\.[^/.]+/)) {
        const protocol = httpsFix ? "https://" : "http://";
        return protocol + href;
      } else {
        return null;
      }
    }
  };
  self2.select = function(s, choices, def) {
    s = self2.string(s);
    if (!choices || !choices.length) {
      return def;
    }
    let choice;
    if (typeof choices[0] === "object") {
      choice = choices.find(function(choice2) {
        if (choice2.value === null || choice2.value === void 0) {
          return false;
        }
        return choice2.value.toString() === s;
      });
      if (choice != null) {
        return choice.value;
      }
      return def;
    }
    choice = choices.find(function(choice2) {
      if (choice2 === null || choice2 === void 0) {
        return false;
      }
      return choice2.toString() === s;
    });
    if (choice !== void 0) {
      return choice;
    }
    return def;
  };
  self2.boolean = function(b, def) {
    if (b === true) {
      return true;
    }
    if (b === false) {
      return false;
    }
    b = self2.string(b, def);
    if (b === def) {
      if (b === void 0) {
        return false;
      }
      return b;
    }
    b = b.toLowerCase().charAt(0);
    if (b === "" || b === "n" || b === "0" || b === "f") {
      return false;
    }
    if (b === "t" || b === "y" || b === "1") {
      return true;
    }
    return false;
  };
  self2.addBooleanFilterToCriteria = function(options3, name, criteria, def) {
    if (def === void 0) {
      def = null;
    }
    let value = typeof options3 === "object" && options3 !== null ? options3[name] : options3;
    value = value === void 0 ? def : value;
    value = self2.booleanOrNull(value);
    if (value === null) ;
    else if (!value) {
      criteria[name] = { $ne: true };
    } else {
      criteria[name] = true;
    }
  };
  self2.booleanOrNull = function(b, def) {
    if (b === true) {
      return b;
    }
    if (b === false) {
      return b;
    }
    if (b === null) {
      return b;
    }
    b = self2.string(b, def);
    if (b === def) {
      if (def === void 0) {
        return null;
      }
      return b;
    }
    if (b === "null") {
      return null;
    }
    b = b.toLowerCase().charAt(0);
    if (b === "" || b === "n" || b === "0" || b === "f") {
      return false;
    }
    if (b === "t" || b === "y" || b === "1") {
      return true;
    }
    if (b === "a") {
      return null;
    }
    return def;
  };
  self2.date = function(date, def, now) {
    let components;
    function returnDefault() {
      if (def === void 0) {
        def = dayjs().format("YYYY-MM-DD");
      }
      return def;
    }
    if (typeof date === "string") {
      if (date.match(/\//)) {
        components = date.split("/");
        if (components.length === 2) {
          return (now || /* @__PURE__ */ new Date()).getFullYear() + "-" + self2.padInteger(components[0], 2) + "-" + self2.padInteger(components[1], 2);
        } else if (components.length === 3) {
          if (components[2] < 100) {
            const d = now || /* @__PURE__ */ new Date();
            const nowYear = d.getFullYear() % 100;
            const nowCentury = d.getFullYear() - nowYear;
            let theirYear = parseInt(components[2]) + nowCentury;
            if (theirYear - d.getFullYear() > 50) {
              theirYear -= 100;
            }
            components[2] = theirYear;
          }
          return self2.padInteger(components[2], 4) + "-" + self2.padInteger(components[0], 2) + "-" + self2.padInteger(components[1], 2);
        } else {
          return returnDefault();
        }
      } else if (date.match(/-/)) {
        components = date.split("-");
        if (components.length === 2) {
          return (now || /* @__PURE__ */ new Date()).getFullYear() + "-" + self2.padInteger(components[0], 2) + "-" + self2.padInteger(components[1], 2);
        } else if (components.length === 3) {
          return self2.padInteger(components[0], 4) + "-" + self2.padInteger(components[1], 2) + "-" + self2.padInteger(components[2], 2);
        } else {
          return returnDefault();
        }
      }
    }
    try {
      if (date === null) {
        return returnDefault();
      }
      date = now || new Date(date);
      if (isNaN(date.getTime())) {
        return returnDefault();
      }
      return date.getFullYear() + "-" + self2.padInteger(date.getMonth() + 1, 2) + "-" + self2.padInteger(date.getDate(), 2);
    } catch (e) {
      return returnDefault();
    }
  };
  self2.formatDate = function(date) {
    return dayjs(date).format("YYYY-MM-DD");
  };
  self2.time = function(time, def) {
    time = self2.string(time).toLowerCase();
    time = time.trim();
    const components = time.match(/^(\d+)([:|.](\d+))?([:|.](\d+))?\s*(am|pm|AM|PM|a|p|A|M)?$/);
    if (components) {
      let hours = parseInt(components[1], 10);
      const minutes = components[3] !== void 0 ? parseInt(components[3], 10) : 0;
      const seconds = components[5] !== void 0 ? parseInt(components[5], 10) : 0;
      let ampm = components[6] ? components[6].toLowerCase() : components[6];
      ampm = ampm && ampm.charAt(0);
      if (hours === 12 && ampm === "a") {
        hours -= 12;
      } else if (hours === 12 && ampm === "p") ;
      else if (ampm === "p") {
        hours += 12;
      }
      if (hours === 24 || hours === "24") {
        hours = 0;
      }
      return self2.padInteger(hours, 2) + ":" + self2.padInteger(minutes, 2) + ":" + self2.padInteger(seconds, 2);
    } else {
      if (def !== void 0) {
        return def;
      }
      return dayjs().format("HH:mm");
    }
  };
  self2.formatTime = function(date) {
    return dayjs(date).format("HH:mm:ss");
  };
  self2.tags = function(tags, filter2) {
    if (typeof tags === "string") {
      tags = tags.split(/,\s*/);
    }
    if (!Array.isArray(tags)) {
      return [];
    }
    const strings = tags.map((tag) => self2.string(tag));
    const rewritten = strings.map(filter2 || self2.filterTag);
    const filtered = rewritten.filter((tag) => tag.length > 0);
    return filtered;
  };
  self2.idRegExp = self2.options.idRegExp || /^[A-Za-z0-9_]+$/;
  self2.id = function(s, def) {
    const id2 = self2.string(s, def);
    if (id2 === def) {
      return id2;
    }
    if (!id2.match(self2.idRegExp)) {
      return def;
    }
    return id2;
  };
  self2.ids = function(ids) {
    if (!Array.isArray(ids)) {
      return [];
    }
    const result2 = ids.filter(function(id2) {
      return self2.id(id2) !== void 0;
    });
    return result2;
  };
  return self2;
};
launder.exports.naughtyHref = naughtyHref;
var launderExports = launder.exports;
const htmlparser = require$$0;
const escapeStringRegexp = escapeStringRegexp$1;
const { isPlainObject } = isPlainObject$2;
const parseSrcset = parseSrcsetExports;
const { parse: postcssParse } = postcss_1;
const { naughtyHref: launderNaughtyHref } = launderExports;
const mediaTags = [
  "img",
  "audio",
  "video",
  "picture",
  "svg",
  "object",
  "map",
  "iframe",
  "embed"
];
const vulnerableTags = ["script", "style"];
const svgAnimationTags = [
  "animate",
  "animatecolor",
  "animatemotion",
  "animatetransform",
  "set"
];
const alwaysUrlAttributes = ["href"];
const severities = ["debug", "info", "warn", "error"];
function loggerFor(options2) {
  const source = options2 && options2.logger || console;
  const logger = {};
  for (const severity of severities) {
    logger[severity] = typeof source[severity] === "function" ? (...args) => source[severity](...args) : (...args) => console[severity](...args);
  }
  return logger;
}
function each(obj, cb2) {
  if (obj) {
    Object.keys(obj).forEach(function(key) {
      cb2(obj[key], key);
    });
  }
}
function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function mergeClasses(specific, wildcard) {
  if (!Array.isArray(specific) || !Array.isArray(wildcard)) {
    return wildcard;
  }
  return specific.concat(wildcard);
}
function mergeStyles(specific, wildcard) {
  const merged = /* @__PURE__ */ Object.create(null);
  for (const rules of [specific, wildcard]) {
    for (const prop of Object.keys(rules)) {
      merged[prop] = has(merged, prop) ? merged[prop].concat(rules[prop]) : rules[prop];
    }
  }
  return merged;
}
function filter(a, cb2) {
  const n2 = [];
  each(a, function(v2) {
    if (cb2(v2)) {
      n2.push(v2);
    }
  });
  return n2;
}
function isEmptyObject(obj) {
  for (const key in obj) {
    if (has(obj, key)) {
      return false;
    }
  }
  return true;
}
function stringifySrcset(parsedSrcset) {
  return parsedSrcset.map(function(part) {
    if (!part.url) {
      throw new Error("URL missing");
    }
    return part.url + (part.w ? ` ${part.w}w` : "") + (part.h ? ` ${part.h}h` : "") + (part.d ? ` ${part.d}x` : "");
  }).join(", ");
}
var sanitizeHtml_1 = sanitizeHtml;
const VALID_HTML_ATTRIBUTE_NAME = /^[^\0\t\n\f\r /<=>]+$/;
const MAX_IFRAME_FALLBACK_DEPTH = 8;
function sanitizeHtml(html, options2, _fallback) {
  if (html == null) {
    return "";
  }
  const baseDepth = _fallback && _fallback.depth || 0;
  const iframeFallbackDepth = _fallback && _fallback.iframeFallbackDepth || 0;
  if (typeof html === "number") {
    html = html.toString();
  }
  let result2 = "";
  let tempResult = "";
  function Frame(tag, attribs) {
    const that = this;
    this.tag = tag;
    this.attribs = attribs || {};
    this.tagPosition = result2.length;
    this.text = "";
    this.openingTagLength = 0;
    this.mediaChildren = [];
    this.updateParentNodeText = function() {
      if (stack.length) {
        const parentFrame = stack[stack.length - 1];
        parentFrame.text += that.text;
      }
    };
    this.updateParentNodeMediaChildren = function() {
      if (stack.length && mediaTags.includes(this.tag)) {
        const parentFrame = stack[stack.length - 1];
        parentFrame.mediaChildren.push(this.tag);
      }
    };
  }
  options2 = Object.assign({}, sanitizeHtml.defaults, options2);
  options2.parser = Object.assign({}, htmlParserDefaults, options2.parser);
  const logger = loggerFor(options2);
  const tagAllowed = function(name) {
    return options2.allowedTags === false || (options2.allowedTags || []).indexOf(name) > -1;
  };
  vulnerableTags.forEach(function(tag) {
    if (tagAllowed(tag) && !options2.allowVulnerableTags) {
      logger.warn(
        `Your \`allowedTags\` option includes \`${tag}\`, which is inherently vulnerable to XSS attacks. Please remove it from \`allowedTags\`, or, to disable this warning, add the \`allowVulnerableTags\` option and ensure you are accounting for this risk.`
      );
    }
  });
  const nonTextTagsArray = options2.nonTextTags || [
    "script",
    "style",
    "textarea",
    "option",
    "xmp"
  ];
  let allowedAttributesMap;
  let allowedAttributesGlobMap;
  if (options2.allowedAttributes) {
    allowedAttributesMap = {};
    allowedAttributesGlobMap = {};
    each(options2.allowedAttributes, function(attributes, tag) {
      allowedAttributesMap[tag] = [];
      const globRegex = [];
      attributes.forEach(function(obj) {
        if (typeof obj === "string" && obj.indexOf("*") >= 0) {
          globRegex.push(escapeStringRegexp(obj).replace(/\\\*/g, ".*"));
        } else {
          allowedAttributesMap[tag].push(obj);
        }
      });
      if (globRegex.length) {
        allowedAttributesGlobMap[tag] = new RegExp("^(" + globRegex.join("|") + ")$");
      }
    });
  }
  const allowedClassesMap = {};
  const allowedClassesGlobMap = {};
  const allowedClassesRegexMap = {};
  each(options2.allowedClasses, function(classes, tag) {
    if (allowedAttributesMap) {
      if (!has(allowedAttributesMap, tag)) {
        allowedAttributesMap[tag] = [];
      }
      allowedAttributesMap[tag].push("class");
    }
    allowedClassesMap[tag] = classes;
    if (Array.isArray(classes)) {
      const globRegex = [];
      allowedClassesMap[tag] = [];
      allowedClassesRegexMap[tag] = [];
      classes.forEach(function(obj) {
        if (typeof obj === "string" && obj.indexOf("*") >= 0) {
          globRegex.push(escapeStringRegexp(obj).replace(/\\\*/g, ".*"));
        } else if (obj instanceof RegExp) {
          allowedClassesRegexMap[tag].push(obj);
        } else {
          allowedClassesMap[tag].push(obj);
        }
      });
      if (globRegex.length) {
        allowedClassesGlobMap[tag] = new RegExp("^(" + globRegex.join("|") + ")$");
      }
    }
  });
  const transformTagsMap = {};
  let transformTagsAll;
  each(options2.transformTags, function(transform2, tag) {
    let transFun;
    if (typeof transform2 === "function") {
      transFun = transform2;
    } else if (typeof transform2 === "string") {
      transFun = sanitizeHtml.simpleTransform(transform2);
    }
    if (tag === "*") {
      transformTagsAll = transFun;
    } else {
      transformTagsMap[tag] = transFun;
    }
  });
  let depth;
  let stack;
  let skipMap;
  let transformMap;
  let skipText;
  let skipTextDepth;
  let rawTextEnd;
  let skipRawText;
  let addedText = false;
  initializeState();
  const parser2 = new htmlparser.Parser({
    onopentag: function(name, attribs) {
      if (options2.onOpenTag) {
        options2.onOpenTag(name, attribs);
      }
      updateRawTextRegion();
      if (options2.enforceHtmlBoundary && name === "html") {
        initializeState();
      }
      if (skipRawText) {
        return;
      }
      if (skipText) {
        skipTextDepth++;
        return;
      }
      const frame = new Frame(name, attribs);
      stack.push(frame);
      let skip = false;
      const hasText = !!frame.text;
      let transformedTag;
      if (has(transformTagsMap, name)) {
        transformedTag = transformTagsMap[name](name, attribs);
        frame.attribs = attribs = transformedTag.attribs;
        if (transformedTag.text !== void 0) {
          frame.innerText = transformedTag.text;
        }
        if (name !== transformedTag.tagName) {
          frame.name = name = transformedTag.tagName;
          transformMap[depth] = transformedTag.tagName;
        }
      }
      if (transformTagsAll) {
        transformedTag = transformTagsAll(name, attribs);
        frame.attribs = attribs = transformedTag.attribs;
        if (name !== transformedTag.tagName) {
          frame.name = name = transformedTag.tagName;
          transformMap[depth] = transformedTag.tagName;
        }
      }
      if (!tagAllowed(name) || animatesUrlAttribute(name, attribs) || options2.disallowedTagsMode === "recursiveEscape" && !isEmptyObject(skipMap) || options2.nestingLimit != null && depth >= options2.nestingLimit) {
        skip = true;
        skipMap[depth] = true;
        if (options2.disallowedTagsMode === "discard" || options2.disallowedTagsMode === "completelyDiscard") {
          if (nonTextTagsArray.indexOf(name) !== -1) {
            skipText = true;
            skipTextDepth = 1;
            if (frame.tag.toLowerCase() === "noscript") {
              rawTextEnd = findRawTextEnd("noscript", parser2.endIndex + 1);
            }
          }
        }
      }
      depth++;
      if (skip) {
        if (options2.disallowedTagsMode === "discard" || options2.disallowedTagsMode === "completelyDiscard") {
          if (frame.innerText && !hasText) {
            const escaped = escapeHtml2(frame.innerText);
            if (options2.textFilter) {
              result2 += options2.textFilter(escaped, name);
            } else {
              result2 += escaped;
            }
            addedText = true;
          }
          return;
        }
        tempResult = result2;
        result2 = "";
      }
      result2 += "<" + name;
      if (name === "script") {
        if (options2.allowedScriptHostnames || options2.allowedScriptDomains) {
          frame.innerText = "";
        }
      }
      const isBeingEscaped = skip && (options2.disallowedTagsMode === "escape" || options2.disallowedTagsMode === "recursiveEscape");
      const shouldPreserveEscapedAttributes = isBeingEscaped && options2.preserveEscapedAttributes;
      if (shouldPreserveEscapedAttributes) {
        each(attribs, function(value, a) {
          result2 += " " + a + '="' + escapeHtml2(value || "", true) + '"';
        });
      } else if (!allowedAttributesMap || has(allowedAttributesMap, name) || allowedAttributesMap["*"]) {
        each(attribs, function(value, a) {
          if (!VALID_HTML_ATTRIBUTE_NAME.test(a)) {
            delete frame.attribs[a];
            return;
          }
          if (value === "" && !options2.allowedEmptyAttributes.includes(a) && (options2.nonBooleanAttributes.includes(a) || options2.nonBooleanAttributes.includes("*"))) {
            delete frame.attribs[a];
            return;
          }
          let passedAllowedAttributesMapCheck = false;
          if (!allowedAttributesMap || has(allowedAttributesMap, name) && allowedAttributesMap[name].indexOf(a) !== -1 || allowedAttributesMap["*"] && allowedAttributesMap["*"].indexOf(a) !== -1 || has(allowedAttributesGlobMap, name) && allowedAttributesGlobMap[name].test(a) || allowedAttributesGlobMap["*"] && allowedAttributesGlobMap["*"].test(a)) {
            passedAllowedAttributesMapCheck = true;
          } else if (allowedAttributesMap && allowedAttributesMap[name]) {
            for (const o of allowedAttributesMap[name]) {
              if (isPlainObject(o) && o.name && o.name === a) {
                passedAllowedAttributesMapCheck = true;
                let newValue = "";
                if (o.multiple === true) {
                  const splitStrArray = value.split(" ");
                  for (const s of splitStrArray) {
                    if (o.values.indexOf(s) !== -1) {
                      if (newValue === "") {
                        newValue = s;
                      } else {
                        newValue += " " + s;
                      }
                    }
                  }
                } else if (o.values.indexOf(value) >= 0) {
                  newValue = value;
                }
                value = newValue;
              }
            }
          }
          if (passedAllowedAttributesMapCheck) {
            if (options2.allowedSchemesAppliedToAttributes.indexOf(a) !== -1) {
              if (naughtyHref2(name, value)) {
                delete frame.attribs[a];
                return;
              }
            }
            if (name === "meta" && a.toLowerCase() === "content" && isRefresh(attribs) && naughtyRefresh(value)) {
              delete frame.attribs[a];
              return;
            }
            if (name === "script" && a === "src") {
              let allowed = true;
              try {
                const parsed = parseUrl(value);
                if (options2.allowedScriptHostnames || options2.allowedScriptDomains) {
                  const allowedHostname = (options2.allowedScriptHostnames || []).find(function(hostname) {
                    return hostname === parsed.url.hostname;
                  });
                  const allowedDomain = (options2.allowedScriptDomains || []).find(function(domain) {
                    return parsed.url.hostname === domain || parsed.url.hostname.endsWith(`.${domain}`);
                  });
                  allowed = allowedHostname || allowedDomain;
                }
              } catch (e) {
                allowed = false;
              }
              if (!allowed) {
                delete frame.attribs[a];
                return;
              }
            }
            if (name === "iframe" && a === "src") {
              let allowed = true;
              try {
                const parsed = parseUrl(value);
                if (parsed.isRelativeUrl) {
                  allowed = has(options2, "allowIframeRelativeUrls") ? options2.allowIframeRelativeUrls : !options2.allowedIframeHostnames && !options2.allowedIframeDomains;
                } else if (options2.allowedIframeHostnames || options2.allowedIframeDomains) {
                  const allowedHostname = (options2.allowedIframeHostnames || []).find(function(hostname) {
                    return hostname === parsed.url.hostname;
                  });
                  const allowedDomain = (options2.allowedIframeDomains || []).find(function(domain) {
                    return parsed.url.hostname === domain || parsed.url.hostname.endsWith(`.${domain}`);
                  });
                  allowed = allowedHostname || allowedDomain;
                }
              } catch (e) {
                allowed = false;
              }
              if (!allowed) {
                delete frame.attribs[a];
                return;
              }
            }
            if (a === "srcset" || a === "imagesrcset") {
              try {
                let parsed = parseSrcset(value);
                parsed.forEach(function(value2) {
                  if (naughtyHref2(name, value2.url)) {
                    value2.evil = true;
                  }
                });
                parsed = filter(parsed, function(v2) {
                  return !v2.evil;
                });
                if (!parsed.length) {
                  delete frame.attribs[a];
                  return;
                } else {
                  value = stringifySrcset(filter(parsed, function(v2) {
                    return !v2.evil;
                  }));
                  frame.attribs[a] = value;
                }
              } catch (e) {
                delete frame.attribs[a];
                return;
              }
            }
            if (a === "class") {
              const allowedSpecificClasses = allowedClassesMap[name];
              const allowedWildcardClasses = allowedClassesMap["*"];
              const allowedSpecificClassesGlob = allowedClassesGlobMap[name];
              const allowedSpecificClassesRegex = allowedClassesRegexMap[name];
              const allowedWildcardClassesRegex = allowedClassesRegexMap["*"];
              const allowedWildcardClassesGlob = allowedClassesGlobMap["*"];
              const allowedClassesGlobs = [
                allowedSpecificClassesGlob,
                allowedWildcardClassesGlob
              ].concat(allowedSpecificClassesRegex, allowedWildcardClassesRegex).filter(function(t2) {
                return t2;
              });
              if (allowedSpecificClasses && allowedWildcardClasses) {
                value = filterClasses(
                  value,
                  mergeClasses(allowedSpecificClasses, allowedWildcardClasses),
                  allowedClassesGlobs
                );
              } else {
                value = filterClasses(
                  value,
                  allowedSpecificClasses || allowedWildcardClasses,
                  allowedClassesGlobs
                );
              }
              if (!value.length) {
                delete frame.attribs[a];
                return;
              }
            }
            if (a === "style") {
              if (options2.parseStyleAttributes) {
                try {
                  const abstractSyntaxTree = postcssParse(name + " {" + value + "}", { map: false });
                  const filteredAST = filterCss(
                    abstractSyntaxTree,
                    options2.allowedStyles
                  );
                  value = stringifyStyleAttributes(filteredAST);
                  if (value.length === 0) {
                    delete frame.attribs[a];
                    return;
                  }
                } catch (e) {
                  if (typeof window !== "undefined") {
                    logger.warn(
                      `Failed to parse "${name} {${value}}". If you are running this in a browser, we recommend disabling style parsing with the parseStyleAttributes option, since it only works in a node environment due to a postcss dependency. More info: https://github.com/apostrophecms/sanitize-html/issues/547`
                    );
                  }
                  delete frame.attribs[a];
                  return;
                }
              } else if (options2.allowedStyles) {
                throw new Error("allowedStyles option cannot be used together with parseStyleAttributes: false.");
              }
            }
            result2 += " " + a;
            if (value && value.length) {
              result2 += '="' + escapeHtml2(value, true) + '"';
            } else if (options2.allowedEmptyAttributes.includes(a)) {
              result2 += '=""';
            }
          } else {
            delete frame.attribs[a];
          }
        });
      }
      if (options2.selfClosing.indexOf(name) !== -1) {
        result2 += " />";
      } else {
        result2 += ">";
        if (frame.innerText && !hasText) {
          const escaped = escapeHtml2(frame.innerText);
          if (options2.textFilter) {
            result2 += options2.textFilter(escaped, name);
          } else {
            result2 += escaped;
          }
          addedText = true;
        }
      }
      if (skip) {
        result2 = tempResult + escapeHtml2(result2);
        tempResult = "";
      }
      frame.openingTagLength = result2.length - frame.tagPosition;
    },
    ontext: function(text) {
      updateRawTextRegion();
      if (skipText || skipRawText) {
        return;
      }
      const lastFrame = stack[stack.length - 1];
      let tag;
      if (lastFrame) {
        tag = lastFrame.tag;
        text = lastFrame.innerText !== void 0 ? lastFrame.innerText : text;
      }
      if (options2.disallowedTagsMode === "completelyDiscard" && !tagAllowed(tag)) {
        text = "";
      } else if (tag && tagAllowed(tag) && (options2.disallowedTagsMode === "discard" || options2.disallowedTagsMode === "completelyDiscard") && (tag === "script" || tag === "style")) {
        result2 += text;
      } else if (tag && tagAllowed(tag) && (options2.disallowedTagsMode === "discard" || options2.disallowedTagsMode === "completelyDiscard") && (tag === "textarea" || tag === "xmp")) {
        if (tag === "xmp") {
          result2 += text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else {
          result2 += escapeHtml2(text, false);
        }
      } else if (
        // htmlparser2 treats <iframe> as a raw-text element, so markup inside
        // (including after an unclosed <iframe>) arrives as a single text node.
        // When the iframe is discarded, re-sanitize that fallback markup as HTML
        // instead of escaping it as plain text (issue #5550).
        // The nested call continues from the current depth so that
        // `nestingLimit` applies to the whole output.
        tag === "iframe" && !tagAllowed(tag) && options2.disallowedTagsMode === "discard" && iframeFallbackDepth < MAX_IFRAME_FALLBACK_DEPTH
      ) {
        result2 += sanitizeHtml(text, options2, {
          depth,
          iframeFallbackDepth: iframeFallbackDepth + 1
        });
      } else if (!addedText) {
        const escaped = escapeHtml2(text, false);
        if (options2.textFilter) {
          result2 += options2.textFilter(escaped, tag);
        } else {
          result2 += escaped;
        }
      }
      if (stack.length) {
        const frame = stack[stack.length - 1];
        frame.text += text;
      }
    },
    onclosetag: function(name, isImplied) {
      if (options2.onCloseTag) {
        options2.onCloseTag(name, isImplied);
      }
      updateRawTextRegion();
      if (skipRawText) {
        const lastFrame = stack[stack.length - 1];
        if (!lastFrame || lastFrame.tag !== name) {
          return;
        }
      } else if (skipText) {
        skipTextDepth--;
        if (!skipTextDepth) {
          skipText = false;
          if (rawTextEnd !== null) {
            skipRawText = true;
          }
        } else {
          return;
        }
      }
      const frame = stack.pop();
      if (!frame) {
        return;
      }
      if (frame.tag !== name) {
        stack.push(frame);
        return;
      }
      skipText = options2.enforceHtmlBoundary ? name === "html" : false;
      depth--;
      const skip = skipMap[depth];
      if (skip) {
        delete skipMap[depth];
        if (options2.disallowedTagsMode === "discard" || options2.disallowedTagsMode === "completelyDiscard") {
          frame.updateParentNodeText();
          return;
        }
        tempResult = result2;
        result2 = "";
      }
      if (transformMap[depth]) {
        name = transformMap[depth];
        delete transformMap[depth];
      }
      if (options2.exclusiveFilter) {
        const filterResult = options2.exclusiveFilter(frame);
        if (filterResult === "excludeTag") {
          if (skip) {
            result2 = tempResult;
            tempResult = "";
          }
          result2 = result2.substring(0, frame.tagPosition) + result2.substring(frame.tagPosition + frame.openingTagLength);
          return;
        } else if (filterResult) {
          result2 = result2.substring(0, frame.tagPosition);
          return;
        }
      }
      frame.updateParentNodeMediaChildren();
      frame.updateParentNodeText();
      if (
        // Already output />
        options2.selfClosing.indexOf(name) !== -1 || // Escaped tag, closing tag is implied
        isImplied && !tagAllowed(name) && ["escape", "recursiveEscape"].indexOf(options2.disallowedTagsMode) >= 0
      ) {
        if (skip) {
          result2 = tempResult;
          tempResult = "";
        }
        return;
      }
      result2 += "</" + name + ">";
      if (skip) {
        result2 = tempResult + escapeHtml2(result2);
        tempResult = "";
      }
      addedText = false;
    }
  }, options2.parser);
  parser2.write(html);
  parser2.end();
  if (options2.disallowedTagsMode === "escape" || options2.disallowedTagsMode === "recursiveEscape") {
    const lastParsedIndex = parser2.endIndex;
    if (lastParsedIndex != null && lastParsedIndex >= 0 && lastParsedIndex < html.length) {
      const unparsed = html.substring(lastParsedIndex);
      result2 += escapeHtml2(unparsed);
    } else if ((lastParsedIndex == null || lastParsedIndex < 0) && html.length > 0 && result2 === "") {
      result2 = escapeHtml2(html);
    }
  }
  return result2;
  function initializeState() {
    result2 = "";
    depth = baseDepth;
    stack = [];
    skipMap = {};
    transformMap = {};
    skipText = false;
    skipTextDepth = 0;
    rawTextEnd = null;
    skipRawText = false;
  }
  function updateRawTextRegion() {
    if (rawTextEnd !== null && parser2.startIndex >= rawTextEnd) {
      rawTextEnd = null;
      skipRawText = false;
    }
  }
  function findRawTextEnd(tagName, from) {
    const re2 = new RegExp("</" + tagName + "[\\t\\n\\f\\r />]", "ig");
    re2.lastIndex = from;
    const match = re2.exec(html);
    return match ? match.index : Infinity;
  }
  function escapeHtml2(s, quote) {
    if (typeof s !== "string") {
      s = s + "";
    }
    if (options2.parser.decodeEntities) {
      s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      if (quote) {
        s = s.replace(/"/g, "&quot;");
      }
    }
    s = s.replace(/&(?![a-zA-Z0-9#]{1,20};)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (quote) {
      s = s.replace(/"/g, "&quot;");
    }
    return s;
  }
  function naughtyHref2(name, href) {
    const allowedSchemes = has(options2.allowedSchemesByTag, name) ? options2.allowedSchemesByTag[name] : options2.allowedSchemes || [];
    return launderNaughtyHref(href, {
      allowedSchemes,
      allowProtocolRelative: options2.allowProtocolRelative
    });
  }
  function isRefresh(attribs) {
    return Object.keys(attribs).some(function(a) {
      return a.toLowerCase() === "http-equiv" && String(attribs[a]).trim().toLowerCase() === "refresh";
    });
  }
  function naughtyRefresh(content) {
    const input2 = String(content);
    const isWhitespace2 = function(c) {
      return c === " " || c === "	" || c === "\n" || c === "\f" || c === "\r";
    };
    let position = 0;
    const skipWhitespace = function() {
      while (position < input2.length && isWhitespace2(input2[position])) {
        position++;
      }
    };
    const lowerAt = function(i) {
      return (input2[i] || "").toLowerCase();
    };
    skipWhitespace();
    const timeStart = position;
    while (position < input2.length && /[0-9.]/.test(input2[position])) {
      position++;
    }
    if (position === timeStart) {
      return true;
    }
    if (position < input2.length) {
      const c = input2[position];
      if (c !== ";" && c !== "," && !isWhitespace2(c)) {
        return true;
      }
      skipWhitespace();
      if (input2[position] === ";" || input2[position] === ",") {
        position++;
      }
      skipWhitespace();
    }
    if (position >= input2.length) {
      return false;
    }
    let url = input2.slice(position);
    let quoted = true;
    if (lowerAt(position) === "u") {
      quoted = false;
      if (lowerAt(position + 1) === "r" && lowerAt(position + 2) === "l") {
        position += 3;
        skipWhitespace();
        if (input2[position] === "=") {
          position++;
          skipWhitespace();
          quoted = true;
        }
      }
    }
    if (quoted) {
      const quote = input2[position];
      if (quote === '"' || quote === "'") {
        position++;
      }
      url = input2.slice(position);
      if (quote === '"' || quote === "'") {
        const end = url.indexOf(quote);
        if (end !== -1) {
          url = url.slice(0, end);
        }
      }
    }
    return naughtyHref2("meta", url);
  }
  function animatesUrlAttribute(name, attribs) {
    if (svgAnimationTags.indexOf(localPart(name)) === -1) {
      return false;
    }
    const schemeCheckedAttributes = options2.allowedSchemesAppliedToAttributes || [];
    return Object.keys(attribs || {}).some(function(attributeName) {
      if (localPart(attributeName) !== "attributename") {
        return false;
      }
      const target = (attribs[attributeName] || "").trim().toLowerCase();
      const localName = target.slice(target.lastIndexOf(":") + 1);
      return alwaysUrlAttributes.indexOf(localName) !== -1 || schemeCheckedAttributes.indexOf(target) !== -1 || schemeCheckedAttributes.indexOf(localName) !== -1;
    });
  }
  function localPart(name) {
    const lower = name.toLowerCase();
    return lower.slice(lower.lastIndexOf(":") + 1);
  }
  function parseUrl(value) {
    value = value.replace(/^(\w+:)?\s*[\\/]\s*[\\/]/, "$1//");
    if (value.startsWith("relative:")) {
      throw new Error("relative: exploit attempt");
    }
    let base = "relative://relative-site";
    for (let i = 0; i < 100; i++) {
      base += `/${i}`;
    }
    const parsed = new URL(value, base);
    const isRelativeUrl = parsed && parsed.hostname === "relative-site" && parsed.protocol === "relative:";
    return {
      isRelativeUrl,
      url: parsed
    };
  }
  function filterCss(abstractSyntaxTree, allowedStyles) {
    if (!allowedStyles) {
      return abstractSyntaxTree;
    }
    const astRules = abstractSyntaxTree.nodes[0];
    let selectedRule;
    if (allowedStyles[astRules.selector] && allowedStyles["*"]) {
      selectedRule = mergeStyles(
        allowedStyles[astRules.selector],
        allowedStyles["*"]
      );
    } else {
      selectedRule = allowedStyles[astRules.selector] || allowedStyles["*"];
    }
    if (selectedRule) {
      abstractSyntaxTree.nodes[0].nodes = astRules.nodes.reduce(filterDeclarations(selectedRule), []);
    }
    return abstractSyntaxTree;
  }
  function stringifyStyleAttributes(filteredAST) {
    return filteredAST.nodes[0].nodes.reduce(function(extractedAttributes, attrObject) {
      extractedAttributes.push(
        `${attrObject.prop}:${attrObject.value}${attrObject.important ? " !important" : ""}`
      );
      return extractedAttributes;
    }, []).join(";");
  }
  function filterDeclarations(selectedRule) {
    return function(allowedDeclarationsList, attributeObject) {
      if (has(selectedRule, attributeObject.prop)) {
        const matchesRegex = selectedRule[attributeObject.prop].some(function(regularExpression) {
          return regularExpression.test(attributeObject.value);
        });
        if (matchesRegex) {
          allowedDeclarationsList.push(attributeObject);
        }
      }
      return allowedDeclarationsList;
    };
  }
  function filterClasses(classes, allowed, allowedGlobs) {
    if (!allowed) {
      return classes;
    }
    classes = classes.split(/\s+/);
    return classes.filter(function(clss) {
      return allowed.indexOf(clss) !== -1 || allowedGlobs.some(function(glob) {
        return glob.test(clss);
      });
    }).join(" ");
  }
}
const htmlParserDefaults = {
  decodeEntities: true
};
sanitizeHtml.defaults = {
  allowedTags: [
    // Sections derived from MDN element categories and limited to the more
    // benign categories.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    // Content sectioning
    "address",
    "article",
    "aside",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hgroup",
    "main",
    "nav",
    "section",
    // Text content
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "hr",
    "li",
    "menu",
    "ol",
    "p",
    "pre",
    "ul",
    // Inline text semantics
    "a",
    "abbr",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "code",
    "data",
    "dfn",
    "em",
    "i",
    "kbd",
    "mark",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "time",
    "u",
    "var",
    "wbr",
    // Table content
    "caption",
    "col",
    "colgroup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  ],
  // Tags that cannot be boolean
  nonBooleanAttributes: [
    "abbr",
    "accept",
    "accept-charset",
    "accesskey",
    "action",
    "allow",
    "alt",
    "as",
    "autocapitalize",
    "autocomplete",
    "blocking",
    "charset",
    "cite",
    "class",
    "color",
    "cols",
    "colspan",
    "content",
    "contenteditable",
    "coords",
    "crossorigin",
    "data",
    "datetime",
    "decoding",
    "dir",
    "dirname",
    "download",
    "draggable",
    "enctype",
    "enterkeyhint",
    "fetchpriority",
    "for",
    "form",
    "formaction",
    "formenctype",
    "formmethod",
    "formtarget",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "http-equiv",
    "id",
    "imagesizes",
    "imagesrcset",
    "inputmode",
    "integrity",
    "is",
    "itemid",
    "itemprop",
    "itemref",
    "itemtype",
    "kind",
    "label",
    "lang",
    "list",
    "loading",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "name",
    "nonce",
    "optimum",
    "pattern",
    "ping",
    "placeholder",
    "popover",
    "popovertarget",
    "popovertargetaction",
    "poster",
    "preload",
    "referrerpolicy",
    "rel",
    "rows",
    "rowspan",
    "sandbox",
    "scope",
    "shape",
    "size",
    "sizes",
    "slot",
    "span",
    "spellcheck",
    "src",
    "srcdoc",
    "srclang",
    "srcset",
    "start",
    "step",
    "style",
    "tabindex",
    "target",
    "title",
    "translate",
    "type",
    "usemap",
    "value",
    "width",
    "wrap",
    // Event handlers
    "onauxclick",
    "onafterprint",
    "onbeforematch",
    "onbeforeprint",
    "onbeforeunload",
    "onbeforetoggle",
    "onblur",
    "oncancel",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "onclose",
    "oncontextlost",
    "oncontextmenu",
    "oncontextrestored",
    "oncopy",
    "oncuechange",
    "oncut",
    "ondblclick",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "onformdata",
    "onhashchange",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onlanguagechange",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onmessage",
    "onmessageerror",
    "onmousedown",
    "onmouseenter",
    "onmouseleave",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onoffline",
    "ononline",
    "onpagehide",
    "onpageshow",
    "onpaste",
    "onpause",
    "onplay",
    "onplaying",
    "onpopstate",
    "onprogress",
    "onratechange",
    "onreset",
    "onresize",
    "onrejectionhandled",
    "onscroll",
    "onscrollend",
    "onsecuritypolicyviolation",
    "onseeked",
    "onseeking",
    "onselect",
    "onslotchange",
    "onstalled",
    "onstorage",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "ontoggle",
    "onunhandledrejection",
    "onunload",
    "onvolumechange",
    "onwaiting",
    "onwheel"
  ],
  disallowedTagsMode: "discard",
  allowedAttributes: {
    a: ["href", "name", "target"],
    // We don't currently allow img itself by default, but
    // these attributes would make sense if we did.
    img: ["src", "srcset", "alt", "title", "width", "height", "loading"]
  },
  allowedEmptyAttributes: [
    "alt"
  ],
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta", "col"],
  // URL schemes we permit
  allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [
    "href",
    "src",
    "cite",
    "action",
    "formaction",
    "data",
    "xlink:href",
    "poster",
    "background",
    "ping",
    "longdesc",
    "usemap",
    "codebase",
    "classid",
    "archive",
    "profile",
    "manifest",
    "itemid",
    "dynsrc",
    "lowsrc"
  ],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false,
  parseStyleAttributes: true,
  preserveEscapedAttributes: false
};
sanitizeHtml.simpleTransform = function(newTagName, newAttribs, merge) {
  merge = merge === void 0 ? true : merge;
  newAttribs = newAttribs || {};
  return function(tagName, attribs) {
    let attrib;
    if (merge) {
      for (attrib in newAttribs) {
        attribs[attrib] = newAttribs[attrib];
      }
    } else {
      attribs = newAttribs;
    }
    return {
      tagName: newTagName,
      attribs
    };
  };
};
const sanitizeHtml$1 = /* @__PURE__ */ getDefaultExportFromCjs(sanitizeHtml_1);
function sanitizeCanvasHtml(html) {
  return sanitizeHtml$1(html, {
    allowedTags: [
      ...sanitizeHtml$1.defaults.allowedTags,
      "img",
      "button",
      "input",
      "select",
      "option",
      "optgroup",
      "textarea",
      "label",
      "form",
      "fieldset",
      "legend",
      "iframe",
      "style",
      "video",
      "audio",
      "source",
      "track",
      "picture",
      "details",
      "summary"
    ],
    // Styles are part of the authored layout. Scripts and embedded HTML are not.
    allowVulnerableTags: true,
    allowedAttributes: {
      "*": [
        "class",
        "style",
        "id",
        "data-*",
        "aria-*",
        "role",
        "href",
        "src",
        "alt",
        "title",
        "width",
        "height",
        "type",
        "name",
        "value",
        "placeholder",
        "target",
        "rel",
        "allow",
        "allowfullscreen",
        "frameborder",
        "loading",
        "for",
        "method",
        "action",
        "enctype",
        "disabled",
        "checked",
        "selected",
        "multiple",
        "required",
        "readonly",
        "min",
        "max",
        "step",
        "minlength",
        "maxlength",
        "pattern",
        "autocomplete",
        "rows",
        "cols",
        "colspan",
        "rowspan",
        "scope",
        "controls",
        "autoplay",
        "muted",
        "loop",
        "preload",
        "poster",
        "kind",
        "srclang",
        "label",
        "default",
        "tabindex",
        "dir",
        "lang",
        "open"
      ]
    },
    allowedSchemesAppliedToAttributes: ["href", "src", "action", "poster"],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"], iframe: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      iframe: (_tagName, attribs) => {
        if (!/^https:\/\//i.test(attribs.src || "")) delete attribs.src;
        return { tagName: "iframe", attribs };
      }
    }
  });
}
function useLiquidRenderer() {
  const engineRef = reactExports.useRef(null);
  const loadingRef = reactExports.useRef(null);
  const [engineReady, setEngineReady] = reactExports.useState(false);
  const getEngine = reactExports.useCallback(async () => {
    if (engineRef.current) {
      return engineRef.current;
    }
    if (loadingRef.current) {
      await loadingRef.current;
      return engineRef.current;
    }
    loadingRef.current = (async () => {
      try {
        const { Liquid } = await __vitePreload(async () => {
          const { Liquid: Liquid2 } = await import("./quiz-renderer-liquid.browser-DDGCWSWt.js");
          return { Liquid: Liquid2 };
        }, true ? [] : void 0, import.meta.url);
        engineRef.current = new Liquid();
        setEngineReady(true);
      } catch (error) {
        console.error(
          `LIQUID LOAD ERROR: Failed to load liquidjs - ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      }
    })();
    await loadingRef.current;
    return engineRef.current;
  }, []);
  const hasLiquidSyntax = reactExports.useCallback((content) => {
    return /\{\{|\{%/.test(content);
  }, []);
  const convertLegacyDynamicContent = reactExports.useCallback((content) => {
    dynamicContentPattern.lastIndex = 0;
    const processedContent = content.replace(dynamicContentPattern, (_match, dataRef) => {
      return `{{ quiz.answers.byBlock['${dataRef}'].value }}`;
    });
    return processedContent;
  }, []);
  const render2 = reactExports.useCallback(
    async (content, context) => {
      try {
        const engine = await getEngine();
        if (!engine) {
          const errorMessage = "Engine failed to initialize";
          console.error(`LIQUID RENDER ERROR: ${errorMessage}`);
          return {
            rendered: content,
            error: { message: errorMessage }
          };
        }
        const processedContent = convertLegacyDynamicContent(content);
        const safeContext = sanitizeLiquidContext(context);
        const rendered = await engine.parseAndRender(processedContent, safeContext);
        return { rendered };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        let line;
        let column;
        if (error instanceof Error) {
          const lineMatch = errorMessage.match(/line (\d+)/i);
          if (lineMatch) {
            line = parseInt(lineMatch[1], 10);
          }
          const columnMatch = errorMessage.match(/col(?:umn)? (\d+)/i);
          if (columnMatch) {
            column = parseInt(columnMatch[1], 10);
          }
        }
        console.error(`LIQUID RENDER ERROR: ${errorMessage}`);
        return {
          rendered: content,
          error: {
            message: errorMessage,
            line,
            column
          }
        };
      }
    },
    [getEngine, convertLegacyDynamicContent]
  );
  return {
    render: render2,
    hasLiquidSyntax,
    engineReady
  };
}
function buildQuizContext(get, options2) {
  const state = get();
  const {
    id: id2,
    answers,
    questions,
    results,
    variableScores = {},
    highestVariableRef,
    quizNavigationPastStates = [],
    responseId = "",
    selectedLocale: language = "en",
    inBuilder = false,
    isStoreRenderer = false,
    cartItems: storeCartItems = []
  } = state;
  const { mode, currentPage, slotItems = {}, cartItems } = options2;
  const currentQuestion = mode === "question" && currentPage && "blocks" in currentPage ? currentPage : null;
  const currentResult = mode === "result" && currentPage && "sections" in currentPage ? currentPage : null;
  const answersList = answers.map((answer) => ({
    blockRef: answer.blockRef,
    questionRef: findQuestionRefForBlockRef(answer.blockRef, questions),
    type: answer.type,
    choicesRefs: answer.choicesRefs,
    value: answer.value,
    isValid: answer.isValid
  }));
  const byBlock = {};
  answersList.forEach((answer) => {
    byBlock[answer.blockRef] = answer;
  });
  const byQuestion = {};
  answersList.forEach((answer) => {
    const questionRef = answer.questionRef;
    if (questionRef) {
      if (!byQuestion[questionRef]) {
        byQuestion[questionRef] = {
          questionRef,
          answers: []
        };
      }
      byQuestion[questionRef].answers.push(answer);
    }
  });
  const latestAnswer = answersList.length > 0 ? answersList[answersList.length - 1] : null;
  const index2 = quizNavigationPastStates.length;
  const totalQuestions = questions.length;
  const uniqueQuestionsAnswered = new Set(answersList.map((a) => a.questionRef).filter(Boolean)).size;
  const percentComplete = totalQuestions > 0 ? Math.round(uniqueQuestionsAnswered / totalQuestions * 100) : 0;
  const finalCartItems = cartItems && cartItems.length > 0 ? cartItems : storeCartItems;
  let resultContext = null;
  if (mode === "result") {
    resultContext = {
      slotItems,
      cartItems: finalCartItems,
      discounts: {
        applied: [],
        eligible: finalCartItems.length > 0
      }
    };
  }
  return {
    quiz: {
      id: id2,
      mode,
      currentPage,
      currentQuestion,
      currentResult,
      questions,
      results,
      answers: {
        list: answersList,
        byBlock,
        byQuestion,
        latest: latestAnswer
      },
      variables: {
        scores: variableScores,
        highest: highestVariableRef
      },
      progress: {
        index: index2,
        displayStep: index2 + 1,
        totalQuestions,
        answersCompleted: uniqueQuestionsAnswered,
        percentComplete,
        hasPrevious: index2 > 0,
        hasNext: index2 < totalQuestions - 1
      },
      metadata: {
        responseId,
        language,
        inBuilder,
        isStoreRenderer
      },
      resultContext
    }
  };
}
function findQuestionRefForBlockRef(blockRef, questions) {
  for (const question of questions) {
    if (question.blocks.some((block) => block.ref === blockRef)) {
      return question.ref;
    }
  }
  return null;
}
const removeHtmlTags = (str) => {
  if (!str) return str;
  if (!str.includes("<")) return str;
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.body.textContent || "";
};
function useRenderedContent(content, options2) {
  const { mode, headingLevel = 2, context = "question", blockRef, liquidVariables } = options2;
  const { render: render2, hasLiquidSyntax } = useLiquidRenderer();
  const storeApi = useQuizStoreApi();
  const runsMerchantCode = useQuizStore((s) => s.runsMerchantCode);
  const getFormattedDynamicContent = useQuizStore((s) => s.getFormattedDynamicContent);
  const getQuestionByQuestionBlockRef = useQuizStore((s) => s.getQuestionByQuestionBlockRef);
  const answers = useQuizStore((s) => s.answers);
  const currentQuizPage = useQuizStore((s) => s.currentQuizPage);
  const variableScores = useQuizStore((s) => s.variableScores);
  const slotItems = useQuizStore((s) => s.slotItems);
  const cartItems = useQuizStore((s) => s.cartItems);
  const convertToHeading = reactExports.useCallback(
    (html) => {
      const tag = `h${headingLevel}`;
      return html.replace(/<p>/g, `<${tag}>`).replace(/<\/p>/g, `</${tag}>`);
    },
    [headingLevel]
  );
  const postProcess = reactExports.useCallback(
    (processed) => {
      let result22 = processed;
      if (mode === "heading") {
        result22 = convertToHeading(result22);
      }
      if (mode === "plainText") {
        result22 = removeHtmlTags(result22);
      }
      return result22;
    },
    [mode, convertToHeading]
  );
  const [result2, setResult] = reactExports.useState(() => postProcess(content || ""));
  reactExports.useEffect(() => {
    if (!content) {
      setResult("");
      return;
    }
    const processContent = async () => {
      const hasLiquid = hasLiquidSyntax(content);
      const hasLegacyDynamic = hasDynamicContent(content);
      if (!hasLiquid && !hasLegacyDynamic) {
        setResult(postProcess(content));
        return;
      }
      if (!hasLiquid && hasLegacyDynamic) {
        const formatted = getFormattedDynamicContent(content);
        setResult(postProcess(formatted));
        return;
      }
      const state = storeApi.getState();
      let currentPage = state.currentQuizPage;
      if (context === "question" && blockRef) {
        const parentQuestion = getQuestionByQuestionBlockRef(blockRef);
        if (parentQuestion) {
          currentPage = parentQuestion;
        }
      }
      const liquidContext = buildQuizContext(() => state, {
        mode: context === "result" ? "result" : "question",
        currentPage,
        slotItems: context === "result" ? slotItems : void 0,
        cartItems: context === "result" ? cartItems : void 0
      });
      const { rendered } = await render2(content, { ...liquidContext, ...liquidVariables });
      setResult(postProcess(rendered));
    };
    processContent();
  }, [
    content,
    mode,
    context,
    blockRef,
    liquidVariables,
    render2,
    hasLiquidSyntax,
    getFormattedDynamicContent,
    getQuestionByQuestionBlockRef,
    postProcess,
    storeApi,
    // Reactivity dependencies
    answers,
    currentQuizPage,
    variableScores,
    slotItems,
    cartItems
  ]);
  return reactExports.useMemo(
    () => !runsMerchantCode && mode !== "plainText" ? sanitizeCanvasHtml(result2) : result2,
    [runsMerchantCode, mode, result2]
  );
}
function usePlainTextContent(content) {
  return useRenderedContent(content, { mode: "plainText" });
}
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React$2.createContext && /* @__PURE__ */ React$2.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t2) {
  if (null == e) return {};
  var o, r2, i = _objectWithoutPropertiesLoose(e, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r2, e) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e = 1; e < arguments.length; e++) {
      var t2 = arguments[e];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r2) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e;
}
function _defineProperty(e, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e ? Object.defineProperty(e, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r2] = t2, e;
}
function _toPropertyKey(t2) {
  var i = _toPrimitive(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t2, r2 || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function Tree2Element(tree) {
  return tree && tree.map((node2, i) => /* @__PURE__ */ React$2.createElement(node2.tag, _objectSpread({
    key: i
  }, node2.attr), Tree2Element(node2.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React$2.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var attr = props.attr, size = props.size, title = props.title, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React$2.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React$2.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React$2.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function FaVolumeUp(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z" }, "child": [] }] })(props);
}
function FaVolumeMute(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" }, "child": [] }] })(props);
}
function FaUndo(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" }, "child": [] }] })(props);
}
function FaPlus(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" }, "child": [] }] })(props);
}
function FaPlay(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" }, "child": [] }] })(props);
}
function FaPause(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" }, "child": [] }] })(props);
}
function FaMinus(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" }, "child": [] }] })(props);
}
function FaChevronUp(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" }, "child": [] }] })(props);
}
function FaChevronRight(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 320 512" }, "child": [{ "tag": "path", "attr": { "d": "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }, "child": [] }] })(props);
}
function FaChevronLeft(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 320 512" }, "child": [{ "tag": "path", "attr": { "d": "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" }, "child": [] }] })(props);
}
function FaChevronDown(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }, "child": [] }] })(props);
}
function FaCamera(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" }, "child": [] }] })(props);
}
const RenderedContent = reactExports.memo(function RenderedContent2({
  content,
  as = "span",
  mode = "html",
  context,
  blockRef,
  headingLevel,
  className,
  hidden,
  style,
  dir,
  id: id2
}) {
  const options2 = {
    mode,
    context,
    blockRef,
    headingLevel
  };
  const renderedContent = useRenderedContent(content, options2);
  return reactExports.createElement(as, {
    id: id2,
    className,
    hidden,
    style,
    dir,
    dangerouslySetInnerHTML: { __html: renderedContent }
  });
});
const ChoiceItem = ({
  choice,
  block,
  answer,
  isPictureChoice,
  preferences,
  isAllOfTheAboveSelected,
  isNoneOfTheAboveSelected,
  onChoiceInteraction,
  inputRef,
  onArrowNav,
  idx,
  containerRef,
  isActive = false
}) => {
  const getChoiceDisabled = () => {
    const { include } = choice;
    if (isAllOfTheAboveSelected) {
      return include !== IncludeOption.ALL_OF_THE_ABOVE;
    }
    if (isNoneOfTheAboveSelected) {
      return include !== IncludeOption.NONE_OF_THE_ABOVE;
    }
    return false;
  };
  const dir = useLanguageDirection();
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      if (onArrowNav) onArrowNav(e, idx);
      return;
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!getChoiceDisabled()) {
        onChoiceInteraction(choice.ref, {
          target: { value: choice.ref }
        });
      }
    }
  };
  const handleContainerClick = (e) => {
    if (!getChoiceDisabled()) {
      onChoiceInteraction(choice.ref, e);
    }
  };
  const isSelected = answer.choicesRefs.includes(choice.ref);
  const choiceName = usePlainTextContent(choice.label);
  const getChoiceLabelClass = () => {
    return clsx("question-choice__label", {
      "question-choice__label-selected": isSelected
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      role: "option",
      "aria-selected": answer.choicesRefs.includes(choice.ref),
      "aria-label": choiceName,
      "data-cy": "question-choice-item",
      className: getChoiceLabelClass(),
      onKeyDown: handleInputKeyDown,
      onClick: handleContainerClick,
      tabIndex: isActive ? 0 : -1,
      dir,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: clsx("question-choice__label-content", {
              "question-choice__label-content-hidden": isPictureChoice && (preferences.pictureSize === PictureType.MEDIUM_SQUARE || preferences.pictureSize === PictureType.LARGE_FOUR_THREE) && preferences.hideCheckboxRadio && preferences.hideImageLabel
            }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "multipleSelection" in preferences && preferences.multipleSelection ? "checkbox" : "radio",
                  name: "multipleSelection" in preferences && preferences.multipleSelection ? choice.label : block.ref,
                  id: choice.ref,
                  value: choice.ref,
                  checked: answer.choicesRefs.includes(choice.ref),
                  disabled: getChoiceDisabled(),
                  hidden: isPictureChoice && preferences.hideCheckboxRadio,
                  ...{ inert: "" },
                  "aria-hidden": "true",
                  tabIndex: -1,
                  readOnly: true,
                  onChange: () => {
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RenderedContent,
                {
                  as: "p",
                  content: choice.label,
                  hidden: isPictureChoice && (preferences.pictureSize === PictureType.MEDIUM_SQUARE || preferences.pictureSize === PictureType.LARGE_FOUR_THREE) && preferences.hideImageLabel
                }
              )
            ]
          }
        ),
        isPictureChoice && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: choice.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: processImagePictureChoice(
              choice.imageUrl,
              preferences.optimizeImageSize,
              preferences.pictureSize
            ),
            alt: choice.imageAltText || choice.label + " image",
            className: clsx("question-choice__label-thumbnail", {
              "question-choice__label-thumbnail-contain": preferences.imageObjectFitContain
            })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "question-choice__label-thumbnail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCamera, { size: 36, color: "#FFFFFF" }) }) })
      ]
    }
  );
};
const MultipleChoiceList = ({ block, answer, handleSetChoicesRefs }) => {
  const InspectorWrapper = useInspectorWrapper();
  const preferences = block.preferences;
  const choices = block.preferences.choices;
  const [isAllOfTheAboveSelected, setIsAllOfTheAboveSelected] = reactExports.useState(false);
  const [isNoneOfTheAboveSelected, setIsNoneOfTheAboveSelected] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsAllOfTheAboveSelected(false);
    setIsNoneOfTheAboveSelected(false);
  }, [block]);
  const choiceRefs = reactExports.useRef([]);
  if (choiceRefs.current.length !== choices.length) {
    choiceRefs.current = Array(choices.length).fill(null).map((_, idx) => choiceRefs.current[idx] || React$2.createRef());
  }
  const optionRefs = reactExports.useRef([]);
  if (optionRefs.current.length !== choices.length) {
    optionRefs.current = Array(choices.length).fill(null).map((_, idx) => optionRefs.current[idx] || React$2.createRef());
  }
  const handleArrowNav = (e, idx) => {
    var _a, _b;
    let nextIdx = idx;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIdx = (idx + 1) % choices.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIdx = (idx - 1 + choices.length) % choices.length;
    }
    (_b = (_a = optionRefs.current[nextIdx]) == null ? void 0 : _a.current) == null ? void 0 : _b.focus();
  };
  const handleChoiceInteraction = reactExports.useCallback(
    (choiceRef, _e) => {
      const selectedChoice = choices.find((choice) => choice.ref === choiceRef);
      const includeOption = selectedChoice == null ? void 0 : selectedChoice.include;
      let newChoiceRefs = [];
      if ("multipleSelection" in preferences && preferences.multipleSelection) {
        if (includeOption === IncludeOption.ALL_OF_THE_ABOVE) {
          const allChoices = choices.map((choice) => choice.ref);
          const shouldSelect = !isAllOfTheAboveSelected;
          setIsAllOfTheAboveSelected(shouldSelect);
          newChoiceRefs = shouldSelect ? allChoices : [];
        } else if (includeOption === IncludeOption.NONE_OF_THE_ABOVE) {
          const shouldSelect = !isNoneOfTheAboveSelected;
          setIsNoneOfTheAboveSelected(shouldSelect);
          newChoiceRefs = shouldSelect ? [choiceRef] : [];
        } else {
          newChoiceRefs = [...answer.choicesRefs];
          const index2 = newChoiceRefs.indexOf(choiceRef);
          if (index2 === -1) {
            newChoiceRefs.push(choiceRef);
          } else {
            newChoiceRefs.splice(index2, 1);
          }
        }
      } else {
        newChoiceRefs = [choiceRef];
      }
      handleSetChoicesRefs(newChoiceRefs);
    },
    [
      choices,
      preferences,
      isAllOfTheAboveSelected,
      isNoneOfTheAboveSelected,
      answer.choicesRefs,
      handleSetChoicesRefs
    ]
  );
  const isPictureChoice = preferences.type === ChoiceType.PICTURE_CHOICE;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: choices.map((choice, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(React$2.Fragment, { children: InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    InspectorWrapper,
    {
      elementRef: choice.ref,
      elementName: "choice",
      maxWidth: "100%",
      elementType: "choice",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChoiceItem,
        {
          choice,
          block,
          answer,
          isPictureChoice,
          preferences,
          isAllOfTheAboveSelected,
          isNoneOfTheAboveSelected,
          onChoiceInteraction: handleChoiceInteraction,
          inputRef: choiceRefs.current[idx],
          onArrowNav: handleArrowNav,
          idx,
          containerRef: optionRefs.current[idx],
          isActive: idx === 0
        }
      )
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ChoiceItem,
    {
      choice,
      block,
      answer,
      isPictureChoice,
      preferences,
      isAllOfTheAboveSelected,
      isNoneOfTheAboveSelected,
      onChoiceInteraction: handleChoiceInteraction,
      inputRef: choiceRefs.current[idx],
      onArrowNav: handleArrowNav,
      idx,
      containerRef: optionRefs.current[idx],
      isActive: idx === 0
    }
  ) }, choice.ref)) });
};
const getFilteredBlocksWithAnswers = (blocks) => {
  return blocks.filter(
    (block) => block.type === BlockType.CHOICE || block.type === BlockType.INPUT
  );
};
const getFilteredChoiceBlocks = (blocks) => {
  return blocks.filter((block) => block.type === BlockType.CHOICE);
};
const hasMoreThanOneAnswerBlock = (blocks) => {
  return getFilteredBlocksWithAnswers(blocks).length > 1;
};
const hasNoChoiceBlocks = (blocks) => {
  return getFilteredChoiceBlocks(blocks).length === 0;
};
const hasOnlyOneSingleChoiceBlock = (blocks) => {
  if (hasMoreThanOneAnswerBlock(blocks) || hasNoChoiceBlocks(blocks)) {
    return false;
  }
  const answerBlock = getFilteredChoiceBlocks(blocks)[0];
  if ("multipleSelection" in answerBlock.preferences && answerBlock.preferences.multipleSelection === true) {
    return false;
  }
  if (answerBlock.preferences.type === ChoiceType.SLIDER_CHOICE && answerBlock.preferences.sliderType === SliderType.SLIDER) {
    return false;
  }
  return true;
};
const hasAValidAnswerPreviouslySelected = (blocks, answers) => {
  if (hasMoreThanOneAnswerBlock(blocks) || hasNoChoiceBlocks(blocks)) {
    return false;
  }
  const answerBlock = getFilteredChoiceBlocks(blocks)[0];
  const answer = answers.find((answer2) => answer2.blockRef === answerBlock.ref);
  if (!answer) {
    return false;
  }
  return answer.isValid;
};
const hideNextButton = (blocks, answers, quizNavigationFutureStates, isRedirectInProgress = false) => {
  if (isRedirectInProgress) {
    return true;
  }
  const hasQuizNavigationFutureStates = quizNavigationFutureStates.length > 0;
  return hasOnlyOneSingleChoiceBlock(blocks) && !hasQuizNavigationFutureStates && !hasAValidAnswerPreviouslySelected(blocks, answers);
};
const shouldGoToNextQuestionOnChoiceSelection = (blocks) => {
  return hasOnlyOneSingleChoiceBlock(blocks);
};
const QuestionHeadingIdContext = reactExports.createContext(void 0);
const useQuestionHeadingId = () => reactExports.useContext(QuestionHeadingIdContext);
const useQuestionLabelledBy = (...ids) => {
  const headingId = useQuestionHeadingId();
  return headingId ? [headingId, ...ids].filter(Boolean).join(" ") : void 0;
};
const needsRendering = (label) => /\{[{%]/.test(label) || hasDynamicContent(label);
const SliderBar = ({
  block,
  handleSetChoicesRefs
}) => {
  var _a, _b, _c, _d, _e, _f;
  const { getAnswerByBlockRef } = useQuizStore((state) => ({
    getAnswerByBlockRef: state.getAnswerByBlockRef
  }));
  const answer = getAnswerByBlockRef(block.ref);
  const answerChoicesRefs = (_a = answer == null ? void 0 : answer.choicesRefs) == null ? void 0 : _a[0];
  const { preferences } = block;
  const dir = useLanguageDirection();
  const answerIndex = (_b = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _b.findIndex((choice) => choice.ref === answerChoicesRefs);
  const validAnswerIndex = answerIndex !== -1 && answerIndex !== null && answerIndex !== void 0 ? answerIndex : 0;
  const [value, setValue] = reactExports.useState(validAnswerIndex);
  const [tooltipPosition, setTooltipPosition] = reactExports.useState(0);
  const [showTooltip, setShowTooltip] = reactExports.useState(false);
  const rangeRef = reactExports.useRef(null);
  const tooltipRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const hideTooltipTimeoutRef = reactExports.useRef(null);
  const touchMovedRef = reactExports.useRef(false);
  const maxValue = (((_c = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _c.length) ?? 0) - 1;
  const minValue = 0;
  const calculateTooltipPosition = () => {
    if (!rangeRef.current || !tooltipRef.current || !containerRef.current) return;
    const rangeRect = rangeRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
    const totalSteps = Math.max(1, maxValue - minValue);
    const ltrPercentage = (value - minValue) / totalSteps;
    const isRtl = dir === "rtl";
    const percentage = isRtl ? 1 - ltrPercentage : ltrPercentage;
    const trackStart = rangeRect.left - containerRect.left;
    const trackEnd = rangeRect.right - containerRect.left;
    let leftPx;
    if (value <= minValue) {
      leftPx = isRtl ? trackEnd - tooltipWidth : trackStart;
    } else if (value >= maxValue) {
      leftPx = isRtl ? trackStart : trackEnd - tooltipWidth;
    } else {
      const markerCenterX = containerRect.width * percentage;
      leftPx = markerCenterX - tooltipWidth / 2;
      leftPx = Math.max(0, Math.min(containerRect.width - tooltipWidth, leftPx));
    }
    setTooltipPosition(leftPx);
  };
  const handleChange = (e) => {
    var _a2;
    const newValue = Number(e.target.value);
    setValue(newValue);
    if ((_a2 = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _a2[newValue]) {
      const choiceRef = preferences.choices[newValue].ref;
      handleSetChoicesRefs([choiceRef]);
    }
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (rangeRef.current) {
      rangeRef.current.focus();
    }
    if (hideTooltipTimeoutRef.current) {
      window.clearTimeout(hideTooltipTimeoutRef.current);
      hideTooltipTimeoutRef.current = null;
    }
    setShowTooltip(true);
    touchMovedRef.current = false;
  };
  const setValueFromTouch = (touch) => {
    var _a2;
    if (!rangeRef.current || !touch) return;
    const slider = rangeRef.current;
    const rect = slider.getBoundingClientRect();
    const x2 = touch.clientX - rect.left;
    const percentage = dir === "rtl" ? 1 - x2 / rect.width : x2 / rect.width;
    const newValue = Math.round(percentage * maxValue);
    const boundedValue = Math.max(minValue, Math.min(maxValue, newValue));
    setValue(boundedValue);
    if ((_a2 = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _a2[boundedValue]) {
      const choiceRef = preferences.choices[boundedValue].ref;
      handleSetChoicesRefs([choiceRef]);
    }
  };
  const handleTouchMove = (e) => {
    touchMovedRef.current = true;
    setValueFromTouch(e.touches[0]);
  };
  const handleTouchEnd = (e) => {
    if (!touchMovedRef.current) setValueFromTouch(e.changedTouches[0]);
    if (hideTooltipTimeoutRef.current) {
      window.clearTimeout(hideTooltipTimeoutRef.current);
    }
    hideTooltipTimeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
      hideTooltipTimeoutRef.current = null;
    }, 500);
  };
  const totalStepsForFill = Math.max(1, maxValue - minValue);
  const percentFilled = (value - minValue) / totalStepsForFill * 100;
  const rangerStyle = {
    background: dir === "rtl" ? `linear-gradient(90deg, var(--choice-background-color) ${100 - percentFilled}%, var(--choice-selected-background-color) ${100 - percentFilled + 0.1}%)` : `linear-gradient(90deg, var(--choice-selected-background-color) ${percentFilled}%, var(--choice-background-color) ${percentFilled + 0.1}%)`
  };
  reactExports.useEffect(() => {
    var _a2;
    if (answerIndex === -1 || answerIndex === null || answerIndex === void 0) {
      setValue(0);
      if ((_a2 = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _a2[0]) {
        handleSetChoicesRefs([preferences.choices[0].ref]);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    calculateTooltipPosition();
  }, [value, dir]);
  reactExports.useEffect(() => {
    if (showTooltip) {
      calculateTooltipPosition();
    }
  }, [showTooltip, dir]);
  reactExports.useEffect(() => {
    window.addEventListener("resize", calculateTooltipPosition);
    return () => window.removeEventListener("resize", calculateTooltipPosition);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (hideTooltipTimeoutRef.current) {
        window.clearTimeout(hideTooltipTimeoutRef.current);
      }
    };
  }, []);
  const tooltipValue = ((_e = (_d = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _d[value]) == null ? void 0 : _e.label) || value;
  const headingId = useQuestionHeadingId();
  const renderedValueText = usePlainTextContent(String(tooltipValue));
  const valueText = needsRendering(String(tooltipValue)) ? renderedValueText : removeHtmlTags(String(tooltipValue));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, style: { position: "relative", width: "100%" }, dir, children: [
    preferences.displayValueTooltip && showTooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        ref: tooltipRef,
        style: {
          position: "absolute",
          left: `${tooltipPosition}px`,
          top: "-18px",
          transform: "translateY(-50%)",
          // Same pair as a selected answer, so the value text keeps 4.5:1 (WCAG 1.4.3).
          // It used to sit on the icon colour, which only has to contrast with a white tick.
          background: "var(--choice-selected-background-color)",
          color: "var(--choice-selected-text-color)",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RenderedContent, { content: String(tooltipValue) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: rangeRef,
        type: "range",
        className: "range-slider__input",
        max: maxValue,
        min: minValue,
        value,
        title: headingId ? void 0 : "Slider bar",
        "aria-labelledby": headingId,
        "aria-valuetext": valueText,
        onChange: handleChange,
        onMouseEnter: () => setShowTooltip(true),
        onMouseLeave: () => setShowTooltip(false),
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onFocus: () => setShowTooltip(true),
        onBlur: () => setShowTooltip(false),
        style: rangerStyle,
        dir
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "relative", height: "10px", width: "100%", marginTop: "5px" }, children: (_f = preferences == null ? void 0 : preferences.choices) == null ? void 0 : _f.map((choice, index2) => {
      const position = index2 / maxValue * 100;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "slider-bar__marker",
          style: {
            position: "absolute",
            left: `${position}%`,
            transform: "translateX(-50%)",
            width: "2px",
            height: "6px",
            backgroundColor: "var(--question-text-color)",
            borderRadius: "2px"
          }
        },
        choice.ref
      );
    }) })
  ] });
};
const SliderButtons = ({
  block,
  handleSetChoicesRefs
}) => {
  const headingId = useQuestionHeadingId();
  const { preferences } = block;
  const { getAnswerByBlockRef } = useQuizStore((state) => ({
    getAnswerByBlockRef: state.getAnswerByBlockRef
  }));
  const answer = getAnswerByBlockRef(block.ref);
  const choices = preferences.choices;
  const handleSelectChoice = (choiceRef) => {
    handleSetChoicesRefs([choiceRef]);
  };
  const buttonStyle = {
    flex: choices.length <= 5 ? "1 1 0%" : "0 1 18.5%"
  };
  const handleButtonKeyDown = useArrowKeyFocusNavigation();
  const buttonSelectedClass = (choiceRef) => {
    return clsx("slider-buttons__button", {
      "slider-buttons__button--selected": answer == null ? void 0 : answer.choicesRefs.includes(choiceRef)
    });
  };
  return (
    // The buttons are named after the question as a group (WCAG 1.3.1)
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slider-buttons", role: "group", "aria-labelledby": headingId, children: choices.map((choice) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: buttonSelectedClass(choice.ref),
        "aria-pressed": (answer == null ? void 0 : answer.choicesRefs.includes(choice.ref)) ?? false,
        onClick: () => handleSelectChoice(choice.ref),
        style: buttonStyle,
        onKeyDown: handleButtonKeyDown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RenderedContent, { content: choice.label })
      },
      choice.ref
    )) })
  );
};
const StarFilled = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--star-filled",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 576 512",
      style: {
        display: "inline-block",
        marginRight: "2px",
        fill: "var(--choice-selected-background-color)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" })
    }
  );
};
const StarHalf = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--star-half",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 576 512",
      style: { display: "inline-block", marginRight: "2px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "halfStarGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "var(--choice-selected-background-color)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "transparent" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z",
            fill: "url(#halfStarGradient)",
            stroke: "var(--choice-selected-background-color)",
            strokeWidth: "50"
          }
        )
      ]
    }
  );
};
const StarEmpty = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--star-empty",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 576 512",
      style: { display: "inline-block", marginRight: "2px" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z",
          fill: "transparent",
          stroke: "var(--choice-selected-background-color)",
          strokeWidth: "50"
        }
      )
    }
  );
};
const HeartFilled = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--heart-filled",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 24 24",
      style: {
        display: "inline-block",
        marginRight: "2px",
        fill: "var(--choice-selected-background-color)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
    }
  );
};
const HeartHalf = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--heart-half",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 24 24",
      style: { display: "inline-block", marginRight: "2px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "halfHeartGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "var(--choice-selected-background-color)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "transparent" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
            fill: "url(#halfHeartGradient)",
            stroke: "var(--choice-selected-background-color)",
            strokeWidth: "2"
          }
        )
      ]
    }
  );
};
const HeartEmpty = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--heart-empty",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 24 24",
      style: { display: "inline-block", marginRight: "2px" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
          fill: "transparent",
          stroke: "var(--choice-selected-background-color)",
          strokeWidth: "2"
        }
      )
    }
  );
};
const CircleFilled = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--circle-filled",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 24 24",
      style: {
        display: "inline-block",
        marginRight: "2px",
        fill: "var(--choice-selected-background-color)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" })
    }
  );
};
const CircleHalf = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--circle-half",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 24 24",
      style: { display: "inline-block", marginRight: "2px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "halfCircleGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "var(--choice-selected-background-color)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "transparent" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
            fill: "url(#halfCircleGradient)",
            stroke: "var(--choice-selected-background-color)",
            strokeWidth: "2"
          }
        )
      ]
    }
  );
};
const CircleEmpty = ({ size = 30 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "rating-icon rating-icon--circle-empty",
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 24 24",
      style: { display: "inline-block", marginRight: "2px" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: "12",
          cy: "12",
          r: "10",
          fill: "transparent",
          stroke: "var(--choice-selected-background-color)",
          strokeWidth: "2"
        }
      )
    }
  );
};
function RatingButton({
  choice,
  ratingStyle,
  isHighlighted,
  isSelected,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onKeyDown
}) {
  const ariaLabel = usePlainTextContent(choice.label);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: "slider-star",
      onClick: onSelect,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur: onMouseLeave,
      onKeyDown,
      "aria-label": ariaLabel,
      "aria-pressed": isSelected,
      tabIndex: 0,
      type: "button",
      children: [
        ratingStyle === RatingStyle.HEARTS && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isHighlighted ? /* @__PURE__ */ jsxRuntimeExports.jsx(HeartFilled, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(HeartEmpty, {}) }),
        ratingStyle === RatingStyle.CIRCLES && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isHighlighted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleFilled, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleEmpty, {}) }),
        ratingStyle === RatingStyle.STARS && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isHighlighted ? /* @__PURE__ */ jsxRuntimeExports.jsx(StarFilled, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(StarEmpty, {}) })
      ]
    }
  );
}
const SliderStars = ({
  block,
  handleSetChoicesRefs
}) => {
  const headingId = useQuestionHeadingId();
  const { getAnswerByBlockRef } = useQuizStore((state) => ({
    getAnswerByBlockRef: state.getAnswerByBlockRef
  }));
  const answer = getAnswerByBlockRef(block.ref);
  const { preferences } = block;
  const [hoveredIndex, setHoveredIndex] = reactExports.useState(null);
  const choices = preferences.choices;
  const ratingStyle = preferences.ratingStyle || RatingStyle.STARS;
  const handleSelectChoice = (choiceRef) => {
    handleSetChoicesRefs([choiceRef]);
  };
  const handleMouseEnter = (index2) => {
    setHoveredIndex(index2);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const isStarHighlighted = (index2) => {
    const answerChoicesRefs = answer == null ? void 0 : answer.choicesRefs[0];
    if (answerChoicesRefs) {
      const selectedIndex = choices.findIndex((choice) => choice.ref === answerChoicesRefs);
      return index2 <= selectedIndex;
    }
    return hoveredIndex !== null && index2 <= hoveredIndex;
  };
  const handleStarKeyDown = useArrowKeyFocusNavigation();
  const handleStarFocus = (index2) => {
    handleMouseEnter(index2);
  };
  return (
    // The buttons are named after the question as a group (WCAG 1.3.1)
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "slider-stars", role: "group", "aria-labelledby": headingId, children: choices.map((choice, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      RatingButton,
      {
        choice,
        ratingStyle,
        isHighlighted: isStarHighlighted(index2),
        isSelected: (answer == null ? void 0 : answer.choicesRefs[0]) === choice.ref,
        onSelect: () => handleSelectChoice(choice.ref),
        onMouseEnter: () => handleMouseEnter(index2),
        onMouseLeave: handleMouseLeave,
        onFocus: () => handleStarFocus(index2),
        onKeyDown: handleStarKeyDown
      },
      choice.ref
    )) })
  );
};
const SliderBlock = ({
  block,
  handleSetChoicesRefs
}) => {
  const { preferences } = block;
  const dir = useLanguageDirection();
  const { sliderType, startLabel, endLabel, middleLabel, choices } = preferences;
  const haveLabels = startLabel || endLabel || middleLabel;
  const renderBySliderType = {
    [SliderType.SLIDER]: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderBar,
      {
        block,
        handleSetChoicesRefs
      }
    ),
    [SliderType.BUTTONS_SCALE]: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderButtons,
      {
        block,
        handleSetChoicesRefs
      }
    ),
    [SliderType.RATING_SCALE]: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderStars,
      {
        block,
        handleSetChoicesRefs
      }
    )
  };
  const renderUpperLabels = (sliderType2) => {
    if (haveLabels && sliderType2 === SliderType.BUTTONS_SCALE && choices && choices.length > 5) {
      return true;
    }
    return false;
  };
  const renderLowerLabels = (sliderType2) => {
    if (haveLabels && sliderType2 === SliderType.SLIDER) {
      return true;
    }
    if (haveLabels && sliderType2 === SliderType.BUTTONS_SCALE && choices && choices.length <= 5) {
      return true;
    }
    return false;
  };
  const getFirstChoice = reactExports.useMemo(() => {
    if (choices && choices.length > 0) {
      return choices[0];
    }
    return { label: "" };
  }, [choices]);
  const getMiddleChoice = reactExports.useMemo(() => {
    if (choices && choices.length > 0) {
      return choices[Math.floor(choices.length / 2)];
    }
    return { label: "" };
  }, [choices]);
  const getLastChoice = reactExports.useMemo(() => {
    if (choices && choices.length > 0) {
      return choices[choices.length - 1];
    }
    return { label: "" };
  }, [choices]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir, children: [
    renderUpperLabels(sliderType) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider__labels--separate", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider__labels--separate__item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RenderedContent, { content: getFirstChoice.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "➜" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: startLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider__labels--separate__item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RenderedContent, { content: getMiddleChoice.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "➜" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: middleLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider__labels--separate__item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RenderedContent, { content: getLastChoice.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "➜" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: endLabel })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: sliderType === SliderType.SLIDER ? "slider-container" : "", children: renderBySliderType[sliderType] }),
    renderLowerLabels(sliderType) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider__labels", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: startLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: middleLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: endLabel })
    ] })
  ] });
};
const Dropdown = reactExports.lazy(() => __vitePreload(() => import("./quiz-renderer-dropdown-DufWh-qn.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0, import.meta.url));
const ChoiceBlock = ({ block, isActiveQuestion = false }) => {
  var _a;
  const { choices, type } = block.preferences;
  const {
    getAnswerByBlockRef,
    updateAnswerByBlockRef,
    getQuestionByQuestionBlockRef,
    next,
    getTranslatedContent
  } = useQuizStore((state) => ({
    getAnswerByBlockRef: state.getAnswerByBlockRef,
    updateAnswerByBlockRef: state.updateAnswerByBlockRef,
    getQuestionByQuestionBlockRef: state.getQuestionByQuestionBlockRef,
    next: state.next,
    getTranslatedContent: state.getTranslatedContent
  }));
  const answer = getAnswerByBlockRef(block.ref);
  const [touched, setTouched] = reactExports.useState(false);
  const isActiveQuestionRef = reactExports.useRef(isActiveQuestion);
  isActiveQuestionRef.current = isActiveQuestion;
  const effectiveAnswer = answer || {
    blockRef: block.ref,
    type: block.preferences.type,
    choicesRefs: [],
    value: "",
    isValid: true
  };
  const handleSetChoicesRefs = (choicesRefs) => {
    if (!answer) return;
    setTouched(true);
    const isValid = "optional" in block.preferences && block.preferences.optional || !("multipleSelection" in block.preferences && block.preferences.multipleSelection) || "multipleSelection" in block.preferences && block.preferences.multipleSelection && "minSelected" in block.preferences && choicesRefs.length >= block.preferences.minSelected && choicesRefs.length <= block.preferences.maxSelected;
    updateAnswerByBlockRef(block.ref, { choicesRefs }, isValid);
    if (!isActiveQuestionRef.current) {
      return;
    }
    const questionForBlock = getQuestionByQuestionBlockRef(block.ref);
    if (questionForBlock && shouldGoToNextQuestionOnChoiceSelection(questionForBlock.blocks)) {
      next(questionForBlock.ref);
    }
  };
  const errorMessage = "errorMessage" in block.preferences && "minSelected" in block.preferences ? block.preferences.errorMessage.replace("{{minSelected}}", block.preferences.minSelected.toString()).replace("{{maxSelected}}", block.preferences.maxSelected.toString()) : "";
  const errorId = `${block.ref}-error`;
  const headingId = useQuestionHeadingId();
  const showError = "multipleSelection" in block.preferences && block.preferences.multipleSelection && !(effectiveAnswer == null ? void 0 : effectiveAnswer.isValid) && touched;
  const haveActiveScrollSnap = type === ChoiceType.PICTURE_CHOICE && (block.preferences.pictureSize === PictureType.LARGE_FOUR_THREE || block.preferences.pictureSize === PictureType.MEDIUM_SQUARE);
  const numberOfChoicesClass = type === ChoiceType.PICTURE_CHOICE ? `picture-choice-${choices.length}-choices` : "";
  const isPictureChoice = type === ChoiceType.PICTURE_CHOICE && "pictureSize" in block.preferences;
  const picturePreferences = isPictureChoice ? block.preferences : null;
  const pictureChoiceClass = clsx({
    "picture-choice__tiny": isPictureChoice && (picturePreferences == null ? void 0 : picturePreferences.pictureSize) === PictureType.TINY_ICON,
    "picture-choice__small": isPictureChoice && (picturePreferences == null ? void 0 : picturePreferences.pictureSize) === PictureType.SMALL_ICON,
    "picture-choice__medium": isPictureChoice && (picturePreferences == null ? void 0 : picturePreferences.pictureSize) === PictureType.MEDIUM_SQUARE,
    "picture-choice__large": isPictureChoice && (picturePreferences == null ? void 0 : picturePreferences.pictureSize) === PictureType.LARGE_FOUR_THREE
  });
  const questionChoiceListClass = clsx(
    "question-choice_list",
    pictureChoiceClass,
    type === ChoiceType.MULTIPLE_CHOICE && "question-choice_list--multiple-choice",
    type === ChoiceType.PICTURE_CHOICE && "question-choice_list--picture-choice",
    type === ChoiceType.SLIDER_CHOICE && "question-choice_list--slider-choice",
    haveActiveScrollSnap && (picturePreferences == null ? void 0 : picturePreferences.mobileLayout) === MobileLayout.CAROUSEL && (picturePreferences == null ? void 0 : picturePreferences.pictureSize) === PictureType.MEDIUM_SQUARE && "question-choice_list--scroll-snap",
    (picturePreferences == null ? void 0 : picturePreferences.mobileLayout) === MobileLayout.TWO_PER_ROW && (picturePreferences == null ? void 0 : picturePreferences.pictureSize) === PictureType.MEDIUM_SQUARE && "question-choice_list--two-per-row",
    numberOfChoicesClass
  );
  const adjustChoicesHeight = reactExports.useCallback(() => {
    var _a2, _b;
    const refWidth = (_a2 = choiceListRef.current) == null ? void 0 : _a2.getBoundingClientRect().width;
    const refHeight = (_b = choiceListRef.current) == null ? void 0 : _b.getBoundingClientRect().height;
    if (choiceListRef.current && refWidth && refHeight) {
      const choiceElements = choiceListRef.current.querySelectorAll(
        ".question-choice__label-content p"
      );
      let maxHeight = 0;
      choiceElements.forEach((element) => {
        const height = element.clientHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });
      const choiceContainers = choiceListRef.current.querySelectorAll(
        ".question-choice__label-content"
      );
      choiceContainers.forEach((element) => {
        element.style.height = `${maxHeight}px`;
      });
    }
  }, []);
  const choiceListRef = reactExports.useRef(null);
  const choiceListWidth = (_a = choiceListRef.current) == null ? void 0 : _a.getBoundingClientRect().width;
  reactExports.useEffect(() => {
    if (type === ChoiceType.PICTURE_CHOICE || type === ChoiceType.MULTIPLE_CHOICE) {
      const choiceListElement = choiceListRef.current;
      if (choiceListElement && choiceListElement.getBoundingClientRect().height > 0) {
        adjustChoicesHeight();
      }
    }
  }, [choices, type, choiceListWidth]);
  const isOptionList = type === ChoiceType.PICTURE_CHOICE || type === ChoiceType.MULTIPLE_CHOICE || type === ChoiceType.YES_NO || type === ChoiceType.LEGAL_GDPR;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: choiceListRef,
        id: block.ref,
        className: questionChoiceListClass,
        "data-cy": "question-choice-list",
        ...isOptionList && {
          role: "listbox",
          // Named after the question; the label is the fallback when the heading is empty
          "aria-labelledby": headingId,
          "aria-label": getTranslatedContent({ key: "ada_question_choices" }),
          "aria-multiselectable": "multipleSelection" in block.preferences && block.preferences.multipleSelection ? true : void 0
        },
        "aria-describedby": showError ? errorId : void 0,
        children: [
          isOptionList && /* @__PURE__ */ jsxRuntimeExports.jsx(
            MultipleChoiceList,
            {
              answer: effectiveAnswer,
              block,
              handleSetChoicesRefs
            }
          ),
          type === ChoiceType.DROPDOWN_CHOICE && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Dropdown,
            {
              content: block.preferences.content,
              enableOptionsSearch: block.preferences.enableOptionsSearch,
              placeholder: block.preferences.content,
              choices,
              multipleSelection: "multipleSelection" in block.preferences ? block.preferences.multipleSelection : false,
              handleSetChoicesRefs,
              selectedChoiceRefs: effectiveAnswer.choicesRefs
            }
          ) }),
          type === ChoiceType.SLIDER_CHOICE && /* @__PURE__ */ jsxRuntimeExports.jsx(
            SliderBlock,
            {
              block,
              handleSetChoicesRefs
            }
          )
        ]
      }
    ),
    "multipleSelection" in block.preferences && block.preferences.multipleSelection && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: errorId,
        role: "alert",
        className: "question-block__choice-error-message",
        "aria-live": "polite",
        children: showError ? errorMessage : ""
      }
    )
  ] });
};
const CloudIcon = ({ color = "#cccccc", width = 48, height = 48 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", width, height, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: color,
      d: "M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
    }
  ) });
};
const FileUploadBlock = ({ block }) => {
  var _a, _b;
  const { updateAnswerByBlockRef, design, getTranslatedContent } = useQuizStore((state) => ({
    updateAnswerByBlockRef: state.updateAnswerByBlockRef,
    design: state.design,
    getTranslatedContent: state.getTranslatedContent
  }));
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [showSizeWarning, setShowSizeWarning] = reactExports.useState(false);
  const [showFormatWarning, setShowFormatWarning] = reactExports.useState(false);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const { inputTextColor } = design;
  const formatsAllowed = "application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/csv, application/msword, audio/mpeg, application/pdf, image/jpeg, image/png, image/gif";
  const sizeAllowed = 10485760;
  const convertBytesToMB = (bytes) => {
    return bytes / 1024 / 1024;
  };
  const validateAndSetFile = (file) => {
    if (file.size > sizeAllowed) {
      setShowSizeWarning(true);
      updateAnswerByBlockRef(block.ref, { value: "" }, false);
      return;
    }
    if (!formatsAllowed.includes(file.type)) {
      setShowFormatWarning(true);
      updateAnswerByBlockRef(block.ref, { value: "" }, false);
      return;
    }
    setShowSizeWarning(false);
    setShowFormatWarning(false);
    const isValid = block.preferences.optional || file;
    setSelectedFile(file);
    updateAnswerByBlockRef(block.ref, { value: file.name }, !!isValid);
  };
  const handleFileChange = (event) => {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (file) {
      validateAndSetFile(file);
    }
    event.target.value = "";
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    var _a2;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = (_a2 = e.dataTransfer.files) == null ? void 0 : _a2[0];
    if (file) {
      validateAndSetFile(file);
    }
  };
  const placeholder = block.preferences.inputPlaceholder || getTranslatedContent({ key: "input_placeholder_upload" });
  const labelClass = clsx("file-upload-label", {
    dragging: isDragging
  });
  reactExports.useEffect(() => {
    if (showSizeWarning) {
      setTimeout(() => {
        setShowSizeWarning(false);
      }, 5e3);
    }
  }, [showSizeWarning]);
  const inputId = `${block.ref}-file`;
  const sizeErrorId = `${block.ref}-size-error`;
  const formatErrorId = `${block.ref}-format-error`;
  const errorIds = [showSizeWarning && sizeErrorId, showFormatWarning && formatErrorId].filter(Boolean).join(" ");
  const labelTextId = `${block.ref}-file-label`;
  const labelledBy = useQuestionLabelledBy(labelTextId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "file-upload-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: inputId,
        className: labelClass,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              onChange: handleFileChange,
              id: inputId,
              className: "file-upload-input visually-hidden",
              accept: formatsAllowed,
              size: sizeAllowed,
              "aria-label": placeholder,
              "aria-labelledby": labelledBy,
              "aria-describedby": errorIds || void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CloudIcon, { color: inputTextColor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: labelTextId, className: "file-upload-label-text", children: placeholder }),
          selectedFile && selectedFile.name ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "file-upload-text", children: selectedFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "file-upload-text file-size-warning", children: isDragging ? getTranslatedContent({ key: "drop_file_here" }) : (_a = block.preferences.fileUploadDescription) == null ? void 0 : _a.replace(
            "{{size}}",
            convertBytesToMB(sizeAllowed).toString()
          ) })
        ]
      }
    ) }),
    showSizeWarning && // Announced when shown (WCAG 3.3.1)
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: sizeErrorId, className: "file-upload-size-warning", role: "alert", children: (_b = block.preferences.errorMessageFileSize) == null ? void 0 : _b.replace(
      "{{size}}",
      convertBytesToMB(sizeAllowed).toString()
    ) }),
    showFormatWarning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: formatErrorId, className: "file-upload-format-warning", role: "alert", children: block.preferences.errorMessageFileFormat })
  ] });
};
const HeadingBlock = ({ block }) => {
  const { headingSize, content, headingAlignment } = block.preferences;
  const dir = useLanguageDirection();
  const headingLevel = headingSize === HeadingSize.SMALL ? 3 : headingSize === HeadingSize.MEDIUM ? 2 : 1;
  const renderedContent = useRenderedContent(content || "", {
    mode: "heading",
    headingLevel,
    context: "question",
    blockRef: block.ref
  });
  const headingBlockClass = clsx("heading question-heading", {
    "heading__small question-heading__small": headingSize === HeadingSize.SMALL,
    "heading__medium question-heading__small": headingSize === HeadingSize.MEDIUM,
    "heading__large question-heading__large": headingSize === HeadingSize.LARGE,
    "heading__left question-heading__left": headingAlignment === Alignment.LEFT,
    "heading__center question-heading__center": headingAlignment === Alignment.CENTER,
    "heading__right question-heading__right": headingAlignment === Alignment.RIGHT
  });
  const isEmptyMessage = renderedContent === null || renderedContent === "" || renderedContent === "<p><br></p>";
  if (isEmptyMessage) return null;
  const hasHeadingTag = /<h[1-6][\s>]/i.test(renderedContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: block.ref,
      className: headingBlockClass,
      ...!hasHeadingTag && { role: "heading", "aria-level": headingLevel },
      tabIndex: -1,
      dangerouslySetInnerHTML: { __html: renderedContent },
      dir
    }
  );
};
const VideoPlaceholder = ({
  videoAspectRatio,
  videoAlignment
}) => {
  const placeholderClass = clsx("question-video__placeholder", {
    "question-video__placeholder--full": videoAspectRatio === VideoAspectRatio.ADAPT_TO_VIDEO,
    "question-video__placeholder--horizontal-16-9": videoAspectRatio === VideoAspectRatio.HORIZONTAL_16_9,
    "question-video__placeholder--horizontal-4-3": videoAspectRatio === VideoAspectRatio.HORIZONTAL_4_3,
    "question-video__placeholder--vertical-9-16": videoAspectRatio === VideoAspectRatio.VERTICAL_9_16,
    "question-video__placeholder--vertical-3-4": videoAspectRatio === VideoAspectRatio.VERTICAL_3_4,
    "question-video__placeholder--left": videoAlignment === Alignment.LEFT,
    "question-video__placeholder--center": videoAlignment === Alignment.CENTER,
    "question-video__placeholder--right": videoAlignment === Alignment.RIGHT
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: placeholderClass, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { size: 36, color: "#FFFFFF" }) });
};
const ImagePlaceholder = ({ imageSize, imageAlignment }) => {
  const placeholderClass = clsx("question-image__placeholder", {
    "question-image__placeholder--full": imageSize === ImageSize.FULL,
    "question-image__placeholder--tiny": imageSize === ImageSize.TINY,
    "question-image__placeholder--small": imageSize === ImageSize.SMALL,
    "question-image__placeholder--medium": imageSize === ImageSize.MEDIUM,
    "question-image__placeholder--large": imageSize === ImageSize.LARGE,
    "question-image__placeholder--left": imageAlignment === Alignment.LEFT,
    "question-image__placeholder--center": imageAlignment === Alignment.CENTER,
    "question-image__placeholder--right": imageAlignment === Alignment.RIGHT
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: placeholderClass, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCamera, { size: 36, color: "#FFFFFF" }) });
};
const ImageBlock = ({ block }) => {
  const { imageUrl, imageSize, imageAlignment, imageAltText } = block.preferences;
  const imageClass = clsx("question-image-block__image", {
    "question-image-block__image--full": imageSize === ImageSize.FULL,
    "question-image-block__image--tiny": imageSize === ImageSize.TINY,
    "question-image-block__image--small": imageSize === ImageSize.SMALL,
    "question-image-block__image--medium": imageSize === ImageSize.MEDIUM,
    "question-image-block__image--large": imageSize === ImageSize.LARGE,
    "question-image-block__image--left": imageAlignment === Alignment.LEFT,
    "question-image-block__image--center": imageAlignment === Alignment.CENTER,
    "question-image-block__image--right": imageAlignment === Alignment.RIGHT
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "question-image-block", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: imageAltText || imageSize + " image", className: imageClass }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ImagePlaceholder,
    {
      imageSize,
      imageAlignment
    }
  ) });
};
function getVideoContainerClassName({
  prefix,
  videoAspectRatio,
  videoAlignment
}) {
  return clsx("video-container", {
    [`${prefix}--horizontal-16-9`]: videoAspectRatio === VideoAspectRatio.HORIZONTAL_16_9,
    [`${prefix}--horizontal-4-3`]: videoAspectRatio === VideoAspectRatio.HORIZONTAL_4_3,
    [`${prefix}--vertical-9-16`]: videoAspectRatio === VideoAspectRatio.VERTICAL_9_16,
    [`${prefix}--vertical-3-4`]: videoAspectRatio === VideoAspectRatio.VERTICAL_3_4,
    [`${prefix}--full`]: videoAspectRatio === VideoAspectRatio.ADAPT_TO_VIDEO,
    [`${prefix}--left`]: videoAlignment === Alignment.LEFT,
    [`${prefix}--center`]: videoAlignment === Alignment.CENTER,
    [`${prefix}--right`]: videoAlignment === Alignment.RIGHT
  });
}
function formatVideoTime(totalSeconds) {
  const safeSeconds = Number.isFinite(totalSeconds) && totalSeconds > 0 ? totalSeconds : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = Math.floor(safeSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}
function seekVideo(event, videoRef) {
  if (!videoRef.current) {
    return;
  }
  const progressContainer = event.currentTarget;
  const rect = progressContainer.getBoundingClientRect();
  const x2 = (event.clientX ?? 0) - rect.left;
  const width = rect.right - rect.left;
  const percentage = Math.max(0, Math.min(1, x2 / width));
  videoRef.current.currentTime = videoRef.current.duration * percentage;
}
const VideoPlayer = ({
  videoUrl,
  controls = false,
  autoPlay = true,
  loop = true,
  className
}) => {
  var _a, _b;
  const videoRef = reactExports.useRef(null);
  const [isPristine, setPristine] = reactExports.useState(true);
  const [isPaused, setPaused] = reactExports.useState(true);
  const [muted, setMuted] = reactExports.useState(true);
  const [speed, setSpeed] = reactExports.useState(1);
  const [progress, setProgress] = reactExports.useState(0);
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration || 0;
      const current2 = videoRef.current.currentTime || 0;
      const percentage = duration > 0 ? current2 / duration * 100 : 0;
      setProgress(percentage);
    }
  };
  const togglePlayPause = async () => {
    if (!videoRef.current) return;
    try {
      if (isPaused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setPaused(!isPaused);
    } catch (error) {
      console.error("Error toggling video playback:", error);
    }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    try {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    } catch (error) {
      console.error("Error toggling video mute:", error);
    }
  };
  const toggleSpeed = () => {
    if (!videoRef.current) return;
    try {
      const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
      videoRef.current.playbackRate = nextSpeed;
      setSpeed(nextSpeed);
    } catch (error) {
      console.error("Error changing video speed:", error);
    }
  };
  const clickOnVideo = () => {
    if (!videoRef.current) {
      return;
    }
    if (isPristine) {
      setPristine(false);
      setPaused(false);
      setMuted(false);
      videoRef.current.currentTime = 0;
    } else {
      togglePlayPause();
    }
  };
  const getMimeType = (url) => {
    const lower = url.split("?")[0].toLowerCase();
    if (lower.endsWith(".m3u8")) return "application/vnd.apple.mpegurl";
    if (lower.endsWith(".mpd")) return "application/dash+xml";
    if (lower.endsWith(".mp4")) return "video/mp4";
    if (lower.endsWith(".webm")) return "video/webm";
    if (lower.endsWith(".ogv") || lower.endsWith(".ogg")) return "video/ogg";
    return void 0;
  };
  const commonVideoProps = {
    className: className || "video-player__video",
    playsInline: true,
    preload: "metadata",
    crossOrigin: "anonymous",
    onError: (e) => {
      const el2 = e.currentTarget;
      console.error("Video error", {
        error: el2.error,
        networkState: el2.networkState,
        readyState: el2.readyState,
        src: el2.currentSrc || videoUrl
      });
    },
    onWaiting: (e) => {
      const el2 = e.currentTarget;
      console.debug("Video waiting", { readyState: el2.readyState, networkState: el2.networkState });
    },
    onStalled: (e) => {
      const el2 = e.currentTarget;
      console.debug("Video stalled", { readyState: el2.readyState, networkState: el2.networkState });
    },
    onSuspend: (e) => {
      const el2 = e.currentTarget;
      console.debug("Video suspend", { readyState: el2.readyState, networkState: el2.networkState });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "video",
      {
        ref: videoRef,
        ...commonVideoProps,
        autoPlay,
        muted,
        loop,
        controls,
        disablePictureInPicture: true,
        onTimeUpdate: handleTimeUpdate,
        onClick: () => {
          clickOnVideo();
        },
        children: [
          (() => {
            const type = getMimeType(videoUrl);
            return type ? /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: videoUrl, type }) : /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: videoUrl });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions", srcLang: "en", label: "English", default: true })
        ]
      }
    ),
    !isPristine && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "video-player-progress-container",
          onClick: (event) => seekVideo(event, videoRef),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              const container2 = e.currentTarget;
              const rect = container2.getBoundingClientRect();
              const middleEvent = {
                clientX: rect.left + rect.width / 2,
                currentTarget: container2
              };
              seekVideo(middleEvent, videoRef);
            }
          },
          role: "progressbar",
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": Math.round(progress),
          "aria-label": "Video progress - click to seek",
          tabIndex: 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "video-player-progress-bar",
              style: {
                width: `${progress}%`
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "video-player-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { id: "video-play-pause-button", onClick: () => togglePlayPause(), children: isPaused ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, { size: 12 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { id: "video-mute-unmute-button", onClick: () => toggleMute(), children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { id: "video-speed-button", onClick: () => toggleSpeed(), children: speed === 1 ? "1x" : speed === 2 ? "2x" : "1.5x" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "video-progress-counter", children: [
          formatVideoTime(((_a = videoRef.current) == null ? void 0 : _a.currentTime) || 0),
          " /",
          " ",
          formatVideoTime(((_b = videoRef.current) == null ? void 0 : _b.duration) || 0)
        ] })
      ] })
    ] }),
    isPaused && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "video-play-button",
        onClick: () => clickOnVideo(),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            clickOnVideo();
          }
        },
        role: "button",
        tabIndex: 0,
        "aria-label": "Play video",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { size: 24 })
      }
    )
  ] });
};
const VideoBlock = ({ block }) => {
  const { videoUrl, videoAspectRatio, videoAlignment, videoAltText } = block.preferences;
  const videoClass = getVideoContainerClassName({
    prefix: "question-video-block__video",
    videoAspectRatio,
    videoAlignment
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "question-video-block", children: videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: videoClass, title: videoAltText || videoAspectRatio + " video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { videoUrl }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    VideoPlaceholder,
    {
      videoAspectRatio,
      videoAlignment
    }
  ) });
};
const DateBlock = ({ block }) => {
  var _a;
  const { updateAnswerByBlockRef, getAnswerByBlockRef } = useQuizStore((state) => ({
    updateAnswerByBlockRef: state.updateAnswerByBlockRef,
    getAnswerByBlockRef: state.getAnswerByBlockRef
  }));
  const initialDate = (_a = getAnswerByBlockRef(block.ref)) == null ? void 0 : _a.value;
  const dateFormat = block.preferences.dateFormat || "MM/DD/YYYY";
  const alignment = block.preferences.alignment;
  const parsedDate = initialDate ? (() => {
    const values = initialDate.split("/");
    const dateObj = {};
    const formats = dateFormat.split("/");
    formats.forEach((format, index2) => {
      dateObj[format] = values[index2];
    });
    return [dateObj.DD || "", dateObj.MM || "", dateObj.YYYY || ""];
  })() : ["", "", ""];
  const [dateValues, setDateValues] = reactExports.useState({
    DD: parsedDate[0],
    MM: parsedDate[1],
    YYYY: parsedDate[2]
  });
  const [touched, setTouched] = reactExports.useState(false);
  const dateFormatArray = dateFormat.split("/");
  const maxYear = (/* @__PURE__ */ new Date()).getFullYear() + 100;
  const isDateValid = (date) => {
    const values = date.split("/");
    const dateObj = {};
    dateFormatArray.forEach((format, index2) => {
      dateObj[format] = values[index2];
    });
    const isDayValid = dateObj.DD && dateObj.DD.length === 2 && parseInt(dateObj.DD) <= 31 && parseInt(dateObj.DD) > 0;
    const isMonthValid = dateObj.MM && dateObj.MM.length === 2 && parseInt(dateObj.MM) <= 12 && parseInt(dateObj.MM) > 0;
    const isYearValid = dateObj.YYYY && dateObj.YYYY.length === 4 && parseInt(dateObj.YYYY) <= maxYear && parseInt(dateObj.YYYY) > 1900;
    return isDayValid && isMonthValid && isYearValid;
  };
  const getInputClass = (date) => {
    const parseDate = {
      DD: "day",
      MM: "month",
      YYYY: "year"
    };
    return `question-block-input-date question-block-input-date-${parseDate[date]}`;
  };
  const getInputMaxLength = (date) => {
    const parseDate = {
      DD: 2,
      MM: 2,
      YYYY: 4
    };
    return parseDate[date];
  };
  const getInputAriaLabel = (date) => {
    const labels = {
      DD: "Day (2 digits)",
      MM: "Month (2 digits)",
      YYYY: "Year (4 digits)"
    };
    return labels[date];
  };
  const getInputMax = (date) => {
    const parseDate = {
      DD: 31,
      MM: 12,
      YYYY: maxYear
    };
    return parseDate[date];
  };
  const onChange = reactExports.useCallback(
    (e, dateType) => {
      const value = e.target.value.replace(/[^\d]/g, "");
      setTouched(true);
      const nextValues = { ...dateValues, [dateType]: value };
      setDateValues(nextValues);
      const combinedDate = dateFormatArray.map((format) => nextValues[format]).join("/");
      if (isDateValid(combinedDate)) {
        updateAnswerByBlockRef(block.ref, { value: combinedDate }, true);
      } else if (Object.values(nextValues).some((val) => val !== "")) {
        updateAnswerByBlockRef(block.ref, { value: "" }, false);
      } else {
        updateAnswerByBlockRef(block.ref, { value: "" }, block.preferences.optional || false);
      }
    },
    [block.ref, dateValues]
  );
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.currentTarget.focus();
    e.currentTarget.click();
  };
  const answer = getAnswerByBlockRef(block.ref);
  const containerClassName = `input-date__container input-date__container--${alignment}`;
  const errorId = `${block.ref}-error`;
  const headingId = useQuestionHeadingId();
  const showError = !(answer == null ? void 0 : answer.isValid) && touched && block.preferences.errorMessage;
  const isRequired = !block.preferences.optional;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClassName, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "question-block-input-date-container",
        role: "group",
        "aria-label": "Date input",
        "aria-labelledby": headingId,
        children: dateFormatArray.map((date, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${block.ref}-${date.toLowerCase()}`,
              type: "tel",
              inputMode: "numeric",
              placeholder: date,
              className: getInputClass(date),
              onChange: (e) => onChange(e, date),
              onTouchStart: handleTouchStart,
              maxLength: getInputMaxLength(date),
              max: getInputMax(date),
              value: dateValues[date],
              "aria-label": getInputAriaLabel(date),
              "aria-invalid": !(answer == null ? void 0 : answer.isValid) && touched,
              "aria-describedby": showError ? errorId : void 0,
              "aria-required": isRequired
            }
          ) }),
          index2 < dateFormatArray.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "question-block-input-date-separator", "aria-hidden": "true", children: "/" }) })
        ] }, date))
      }
    ),
    showError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: errorId, role: "alert", className: "question-block__input-error-message", children: block.preferences.errorMessage })
  ] });
};
const NumberBlock = ({ block }) => {
  const { getAnswerByBlockRef, updateAnswerByBlockRef, getTranslatedContent } = useQuizStore(
    (state) => ({
      getAnswerByBlockRef: state.getAnswerByBlockRef,
      updateAnswerByBlockRef: state.updateAnswerByBlockRef,
      getTranslatedContent: state.getTranslatedContent
    })
  );
  const dir = useLanguageDirection();
  const inputRef = reactExports.useRef(null);
  const [touched, setTouched] = reactExports.useState(false);
  const answer = getAnswerByBlockRef(block.ref);
  const { minRange = 0, maxRange = 100, optional: optional2 = false } = block.preferences;
  const isValidValue = (value) => value >= minRange && value <= maxRange;
  const updateValue = (newValue) => {
    const numValue = Number(newValue);
    const isValid = optional2 || isValidValue(numValue);
    updateAnswerByBlockRef(block.ref, { value: newValue.toString() }, isValid);
  };
  const handleChange = (e) => {
    setTouched(true);
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      updateValue(value === "-" ? value : parseFloat(value) || "");
    }
  };
  const handleTouchStart = (e) => {
    var _a;
    e.stopPropagation();
    if (document.activeElement !== e.currentTarget) {
      e.currentTarget.focus();
      (_a = inputRef.current) == null ? void 0 : _a.click();
    }
  };
  const handleIncrement = () => {
    const currentValue = parseFloat((answer == null ? void 0 : answer.value) || minRange.toString());
    if (optional2 || currentValue < maxRange) {
      updateValue(currentValue + 1);
    }
  };
  const handleDecrement = () => {
    const currentValue = parseFloat((answer == null ? void 0 : answer.value) || maxRange.toString());
    if (optional2 || currentValue > minRange) {
      updateValue(currentValue - 1);
    }
  };
  const handleTouchInteraction = (e, action) => {
    e.preventDefault();
    if (action === "increment") {
      handleIncrement();
    } else {
      handleDecrement();
    }
  };
  const placeholder = block.preferences.inputPlaceholder || getTranslatedContent({ key: "input_placeholder_number" });
  const errorMessage = block.preferences.errorMessage.replace("{{minRange}}", block.preferences.minRange.toString()).replace("{{maxRange}}", block.preferences.maxRange.toString());
  const errorId = `${block.ref}-error`;
  const labelledBy = useQuestionLabelledBy(block.ref);
  const showError = !(answer == null ? void 0 : answer.isValid) && touched && errorMessage;
  const isRequired = !optional2;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-number__container", dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "minus",
          onClick: (e) => handleTouchInteraction(e, "decrement"),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleDecrement();
            }
          },
          role: "button",
          tabIndex: 0,
          "aria-label": "Decrease value",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMinus, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          id: block.ref,
          type: "tel",
          inputMode: "numeric",
          min: block.preferences.minRange,
          max: block.preferences.maxRange,
          placeholder,
          value: (answer == null ? void 0 : answer.value) || "",
          onChange: handleChange,
          onTouchStart: handleTouchStart,
          pattern: "[0-9.-]*",
          "aria-label": placeholder,
          "aria-labelledby": labelledBy,
          "aria-invalid": !(answer == null ? void 0 : answer.isValid) && touched,
          "aria-describedby": showError ? errorId : void 0,
          "aria-required": isRequired,
          dir
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "plus",
          onClick: (e) => handleTouchInteraction(e, "increment"),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleIncrement();
            }
          },
          role: "button",
          tabIndex: 0,
          "aria-label": "Increase value",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { size: 16 })
        }
      )
    ] }),
    showError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: errorId, role: "alert", className: "question-block__input-error-message", dir, children: errorMessage })
  ] }) });
};
const options = countryData.map((country) => ({
  label: `${country.code} ${country.name}`,
  value: country.code
}));
const PhoneInput = ({ countryCode, setCountryCode }) => {
  const prefix = getPrefixFromCountryCode(countryCode || "US");
  const countryName = getCountryName(countryCode || "US");
  const countryLabel = countryName ? `${prefix} (${countryName})` : prefix;
  const { getTranslatedContent } = useQuizStore((state) => ({
    getTranslatedContent: state.getTranslatedContent
  }));
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [searchText, setSearchText] = reactExports.useState("");
  const [selectedIndex, setSelectedIndex] = reactExports.useState(-1);
  const triggerRef = reactExports.useRef(null);
  const dropdownRef = reactExports.useRef(null);
  const optionTouchStartY = reactExports.useRef(null);
  const searchTimeout = reactExports.useRef();
  const [isMobile, setIsMobile] = reactExports.useState(false);
  const selectRef = reactExports.useRef(null);
  const hiddenCountryCodeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    const button = triggerRef.current;
    const root2 = button == null ? void 0 : button.getRootNode();
    if (isMobile && button && (root2 == null ? void 0 : root2.activeElement) === button) (_a = selectRef.current) == null ? void 0 : _a.focus();
  }, [isMobile]);
  reactExports.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  reactExports.useEffect(() => {
    if (!isMobile && hiddenCountryCodeRef.current) {
      const hiddenInput = hiddenCountryCodeRef.current;
      let hasProcessedAutofill = false;
      const handleAutofill = () => {
        const value = hiddenInput.value.trim();
        if (value && !hasProcessedAutofill) {
          const matchingCountry = countryData.find((country) => {
            const countryPrefix = getPrefixFromCountryCode(country.code);
            return countryPrefix === `+${value}`;
          });
          if (matchingCountry && matchingCountry.code !== countryCode) {
            setCountryCode == null ? void 0 : setCountryCode(matchingCountry.code);
          }
          hasProcessedAutofill = true;
        }
      };
      hiddenInput.addEventListener("input", handleAutofill);
      hiddenInput.addEventListener("change", handleAutofill);
      const checkAutofill = () => {
        const isAutofilled = hiddenInput.matches(":-webkit-autofill");
        if (isAutofilled && !hasProcessedAutofill) {
          handleAutofill();
        }
      };
      const autofillCheck = setInterval(checkAutofill, 500);
      return () => {
        hiddenInput.removeEventListener("input", handleAutofill);
        hiddenInput.removeEventListener("change", handleAutofill);
        clearInterval(autofillCheck);
      };
    }
  }, [isMobile, countryCode, setCountryCode]);
  reactExports.useEffect(() => {
    if (isOpen && prefix) {
      setTimeout(() => {
        const selectedOption = document.querySelector(
          `.custom-select-option[data-prefix="${prefix}"]`
        );
        if (selectedOption) {
          selectedOption.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }, 0);
    }
  }, [isOpen, prefix]);
  reactExports.useEffect(() => {
    const handleClickOutside = (e) => {
      const path = e.composedPath();
      const isInsideComponent = path.some((element) => {
        var _a, _b, _c;
        if (element instanceof Element) {
          return ((_a = element.classList) == null ? void 0 : _a.contains("custom-select-dropdown")) || ((_b = element.classList) == null ? void 0 : _b.contains("custom-select-option")) || ((_c = element.classList) == null ? void 0 : _c.contains("custom-select-trigger"));
        }
        return false;
      });
      if (!isInsideComponent) {
        setIsOpen(false);
        setSearchText("");
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, { capture: true });
    return () => document.removeEventListener("mousedown", handleClickOutside, { capture: true });
  }, []);
  const findMatchingOptionIndex = (search) => {
    return options.findIndex((option) => {
      const searchLower = search.toLowerCase();
      const [countryCode2, ...rest] = option.label.split(" ");
      const countryName2 = rest.join(" ").toLowerCase();
      const prefix2 = getPrefixFromCountryCode(option.value);
      return countryName2.startsWith(searchLower) || prefix2.includes(searchLower) || countryCode2.toLowerCase().startsWith(searchLower);
    });
  };
  const scrollToOption = (index2) => {
    if (!dropdownRef.current) return;
    const dropdown = dropdownRef.current;
    const optionElement = dropdown.querySelector(`[data-index="${index2}"]`);
    if (!optionElement) return;
    const dropdownHeight = dropdown.offsetHeight;
    const optionTop = optionElement.offsetTop;
    const optionHeight = optionElement.offsetHeight;
    dropdown.scrollTop = optionTop - (dropdownHeight - optionHeight) / 2;
  };
  const handleKeyDown = (e) => {
    var _a, _b;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          const newIndex2 = e.key === "ArrowDown" ? 0 : options.length - 1;
          setSelectedIndex(newIndex2);
          setTimeout(() => scrollToOption(newIndex2), 50);
          return;
        }
        const newIndex = e.key === "ArrowDown" ? selectedIndex < options.length - 1 ? selectedIndex + 1 : 0 : selectedIndex > 0 ? selectedIndex - 1 : options.length - 1;
        setSelectedIndex(newIndex);
        scrollToOption(newIndex);
        break;
      }
      case "Backspace": {
        if (searchText) {
          e.preventDefault();
          const newSearchText = searchText.slice(0, -1);
          setSearchText(newSearchText);
          if (newSearchText) {
            const matchIndex = findMatchingOptionIndex(newSearchText);
            if (matchIndex !== -1) {
              setSelectedIndex(matchIndex);
              scrollToOption(matchIndex);
            }
          }
        }
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(0);
          return;
        }
        if (selectedIndex >= 0) {
          const selected = options[selectedIndex];
          setCountryCode == null ? void 0 : setCountryCode(selected.value);
          setIsOpen(false);
          setSearchText("");
          (_a = triggerRef.current) == null ? void 0 : _a.focus();
        }
        break;
      }
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          setSelectedIndex(-1);
          (_b = triggerRef.current) == null ? void 0 : _b.focus();
        }
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        break;
      case " ":
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
          setSelectedIndex(0);
        }
        break;
      default: {
        if (e.key.length === 1) {
          if (!isOpen) {
            setIsOpen(true);
          }
          const newSearchText = searchText + e.key;
          setSearchText(newSearchText);
          if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
          }
          searchTimeout.current = setTimeout(() => {
            setSearchText("");
          }, 1500);
          const matchIndex = findMatchingOptionIndex(newSearchText);
          if (matchIndex !== -1) {
            setSelectedIndex(matchIndex);
            scrollToOption(matchIndex);
          }
        }
      }
    }
  };
  const handleTriggerClick = () => {
    var _a;
    if (isMobile) {
      (_a = selectRef.current) == null ? void 0 : _a.click();
    } else {
      setIsOpen(!isOpen);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-select-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-wrapper", children: [
      isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          name: "country_prefix",
          "aria-label": countryLabel,
          autoComplete: "tel-country-code",
          ref: selectRef,
          value: countryCode || "",
          onChange: (e) => {
            const selectedCountryCode = e.target.value;
            setCountryCode == null ? void 0 : setCountryCode(selectedCountryCode);
            setIsOpen(false);
            setSearchText("");
          },
          className: "mobile-select",
          onTouchStart: (e) => {
            e.stopPropagation();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
            options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: `${getPrefixFromCountryCode(option.value)} (${getCountryName(option.value)})` }, option.value))
          ]
        }
      ),
      !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: hiddenCountryCodeRef,
          type: "text",
          name: "country_code_autofill",
          autoComplete: "tel-country-code",
          style: {
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none"
          },
          tabIndex: -1,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          ref: triggerRef,
          type: "button",
          className: "custom-select-trigger",
          onClick: handleTriggerClick,
          onKeyDown: handleKeyDown,
          "aria-label": countryLabel,
          "aria-expanded": isOpen,
          tabIndex: isMobile ? -1 : void 0,
          "aria-hidden": isMobile ? true : void 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-select-flag", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getFlagImage(countryCode || "US"),
                alt: `Flag of ${getCountryName(countryCode || "US")}`,
                width: 20,
                height: 20
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "custom-select-value", children: prefix }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-select-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M4 6L8 10L12 6",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            ) }) })
          ]
        }
      )
    ] }),
    !isMobile && // Focus stays on the button while the arrow keys move through the list, so the
    // highlighted country is announced here (WCAG 4.1.2)
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", role: "status", children: isOpen && options[selectedIndex] ? `${getPrefixFromCountryCode(options[selectedIndex].value)} (${getCountryName(options[selectedIndex].value)})` : "" }),
    !isMobile && isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "custom-select-dropdown",
        role: "listbox",
        tabIndex: -1,
        onKeyDown: handleKeyDown,
        ref: dropdownRef,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-select-search-message", children: searchText ? getTranslatedContent({ key: "phone_filtering" }) + `: ${searchText}` : getTranslatedContent({ key: "phone_please_select" }) }),
          options.map((option, index2) => {
            const [optionCountryCode, ...rest] = option.label.split(" ");
            const countryName2 = rest.join(" ");
            const optionPrefix = getPrefixFromCountryCode(option.value);
            const isSelected = option.value === countryCode;
            const isHighlighted = index2 === selectedIndex;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "option",
                "data-index": index2,
                "aria-selected": isSelected,
                "data-prefix": optionPrefix,
                className: `custom-select-option ${isSelected ? "selected" : ""} ${isHighlighted ? "highlighted" : ""}`,
                onClick: () => {
                  setCountryCode == null ? void 0 : setCountryCode(option.value);
                  setIsOpen(false);
                  setSearchText("");
                },
                onTouchStart: (e) => {
                  var _a;
                  e.stopPropagation();
                  optionTouchStartY.current = ((_a = e.changedTouches[0]) == null ? void 0 : _a.clientY) ?? null;
                },
                onTouchEnd: (e) => {
                  var _a;
                  e.stopPropagation();
                  const startY = optionTouchStartY.current;
                  optionTouchStartY.current = null;
                  const endY = (_a = e.changedTouches[0]) == null ? void 0 : _a.clientY;
                  if (startY === null || endY === void 0 || Math.abs(endY - startY) > 10) return;
                  e.preventDefault();
                  setCountryCode == null ? void 0 : setCountryCode(option.value);
                  setIsOpen(false);
                  setSearchText("");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: getFlagImage(optionCountryCode),
                      alt: `Flag of ${getCountryName(optionCountryCode)}`,
                      width: 20,
                      height: 20
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "prefix-value", children: optionPrefix }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "country-name", children: countryName2 })
                ]
              },
              option.value
            );
          })
        ]
      }
    )
  ] });
};
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PhoneBlock$1 = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-phone-block-YVbQwkKf.js"), true ? __vite__mapDeps([11,1,9,4,5,6,7,8]) : void 0, import.meta.url).then((module) => ({
    default: module.PhoneBlock
  }))
);
const getInputType = (block) => {
  switch (block.preferences.type) {
    case InputType.EMAIL:
      return "email";
    case InputType.DATE:
      return "date";
    default:
      return "text";
  }
};
const getInputAutocomplete = (block) => {
  switch (block.preferences.type) {
    case InputType.FULL_NAME:
      return "name";
    case InputType.FIRST_NAME:
      return "given-name";
    case InputType.LAST_NAME:
      return "family-name";
    case InputType.EMAIL:
      return "email";
    default:
      return "";
  }
};
const getInputName = (block) => {
  switch (block.preferences.type) {
    case InputType.FULL_NAME:
      return "firstName";
    case InputType.FIRST_NAME:
      return "firstName";
    case InputType.LAST_NAME:
      return "lastName";
    case InputType.EMAIL:
      return "email";
    default:
      return "";
  }
};
const InputBlock = ({ block }) => {
  const {
    getAnswerByBlockRef,
    updateAnswerByBlockRef,
    next,
    getAnswersByBlockRef,
    getQuestionByQuestionBlockRef
  } = useQuizStore((state) => ({
    getAnswerByBlockRef: state.getAnswerByBlockRef,
    updateAnswerByBlockRef: state.updateAnswerByBlockRef,
    next: state.next,
    getAnswersByBlockRef: state.getAnswersByBlockRef,
    getQuestionByQuestionBlockRef: state.getQuestionByQuestionBlockRef
  }));
  const dir = useLanguageDirection();
  const textareaRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const answer = getAnswerByBlockRef(block.ref);
  const [touched, setTouched] = reactExports.useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && block.preferences.type !== InputType.LONG_TEXT) {
      e.preventDefault();
      const isDisabled = getAnswersByBlockRef(block.ref).some((answer2) => !answer2.isValid);
      if (!isDisabled) {
        const question = getQuestionByQuestionBlockRef(block.ref);
        if (question) next(question.ref);
      }
    }
  };
  const handleChange = (e, type) => {
    const { value } = e.target;
    setTouched(true);
    let isValid = false;
    if (type === InputType.EMAIL && value) {
      isValid = regexEmail.test(value);
    } else if (block.preferences.optional) {
      isValid = true;
    } else if ("minLength" in block.preferences) {
      isValid = value.length >= block.preferences.minLength && value.length <= block.preferences.maxLength;
    }
    updateAnswerByBlockRef(block.ref, { value }, isValid);
  };
  const handleFocus = (e) => {
    e.currentTarget.focus();
  };
  const inputType = getInputType(block);
  const inputAutocomplete = getInputAutocomplete(block);
  const inputName = getInputName(block);
  let errorMessage = block.preferences.errorMessage;
  if ("errorMessage" in block.preferences && "minLength" in block.preferences) {
    errorMessage = block.preferences.errorMessage.replace("{{minLength}}", block.preferences.minLength.toString()).replace("{{maxLength}}", block.preferences.maxLength.toString());
  }
  const errorId = `${block.ref}-error`;
  const hasPlaceholder = "inputPlaceholder" in block.preferences && !!block.preferences.inputPlaceholder;
  const labelledBy = useQuestionLabelledBy(hasPlaceholder && block.ref);
  const showError = !(answer == null ? void 0 : answer.isValid) && touched && errorMessage;
  const isRequired = !block.preferences.optional;
  return block.preferences.type === InputType.LONG_TEXT ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "question-block__input-container", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        ref: textareaRef,
        id: block.ref,
        placeholder: block.preferences.inputPlaceholder,
        value: (answer == null ? void 0 : answer.value) || "",
        className: "question-block__input long-text",
        onChange: (e) => handleChange(e, inputType),
        onKeyDown: handleKeyDown,
        "aria-label": block.preferences.inputPlaceholder,
        "aria-labelledby": labelledBy,
        "aria-invalid": !(answer == null ? void 0 : answer.isValid) && touched,
        "aria-describedby": showError ? errorId : void 0,
        "aria-required": isRequired
      }
    ),
    showError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: errorId, role: "alert", className: "question-block__input-error-message", children: errorMessage })
  ] }) : block.preferences.type === InputType.UPLOAD ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileUploadBlock, { block }) : block.preferences.type === InputType.PHONE ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneBlock$1, { block }) }) : block.preferences.type === InputType.NUMBER ? /* @__PURE__ */ jsxRuntimeExports.jsx(NumberBlock, { block }) : block.preferences.type === InputType.DATE ? /* @__PURE__ */ jsxRuntimeExports.jsx(DateBlock, { block }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "question-block__input-container", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        id: block.ref,
        type: inputType,
        autoComplete: inputAutocomplete,
        placeholder: block.preferences.inputPlaceholder,
        className: "question-block__input",
        value: (answer == null ? void 0 : answer.value) || "",
        name: inputName,
        onChange: (e) => handleChange(e, inputType),
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        "aria-label": block.preferences.inputPlaceholder,
        "aria-labelledby": labelledBy,
        "aria-invalid": !(answer == null ? void 0 : answer.isValid) && touched,
        "aria-describedby": showError ? errorId : void 0,
        "aria-required": isRequired,
        dir
      }
    ),
    showError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: errorId, role: "alert", className: "question-block__input-error-message", children: errorMessage })
  ] });
};
const TextBlock = ({ block }) => {
  const { content, textSize, textAlignment } = block.preferences;
  const dir = useLanguageDirection();
  const renderedContent = useRenderedContent(content || "", {
    mode: "richHtml",
    context: "question",
    blockRef: block.ref
  });
  const textClass = clsx("text question-text", {
    "question-text-large": textSize === "large",
    "question-text-medium": textSize === "medium",
    "question-text-small": textSize === "small",
    "question-text--left": textAlignment === "left",
    "question-text--center": textAlignment === "center",
    "question-text--right": textAlignment === "right"
  });
  const isEmptyMessage = renderedContent === null || renderedContent === "" || renderedContent === "<p><br></p>";
  if (isEmptyMessage) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: block.ref,
      className: textClass,
      "data-cy": "question-text",
      "aria-label": "Question text",
      dangerouslySetInnerHTML: { __html: renderedContent },
      dir
    }
  );
};
function createQuizDOMHelpers() {
  const getContext = () => {
    var _a;
    return ((_a = document.querySelector("#shadow-quiz")) == null ? void 0 : _a.shadowRoot) || document;
  };
  return {
    querySelector: (selector) => getContext().querySelector(selector),
    querySelectorAll: (selector) => getContext().querySelectorAll(selector),
    getElementById: (id2) => {
      const context = getContext();
      return context instanceof Document ? context.getElementById(id2) : context.querySelector(`#${id2}`);
    }
  };
}
function useCustomHtmlScripts(params) {
  const { containerRef, renderedContent, mode, currentPage, actions } = params;
  const storeApi = useQuizStoreApi();
  const runsMerchantCode = useQuizStore((s) => s.runsMerchantCode);
  const hasScripts = reactExports.useMemo(() => /<script\b/i.test(renderedContent), [renderedContent]);
  const actionsRef = reactExports.useRef(actions);
  const modeRef = reactExports.useRef(mode);
  const currentPageRef = reactExports.useRef(currentPage);
  const paramsRef = reactExports.useRef(params);
  actionsRef.current = actions;
  modeRef.current = mode;
  currentPageRef.current = currentPage;
  paramsRef.current = params;
  const lastExecutedContentRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!runsMerchantCode || !hasScripts) {
      return;
    }
    if (lastExecutedContentRef.current === renderedContent) {
      return;
    }
    lastExecutedContentRef.current = renderedContent;
    const contextOptions = modeRef.current === "question" ? {
      mode: "question",
      currentPage: currentPageRef.current ?? null
    } : {
      mode: "result",
      currentPage: currentPageRef.current ?? null,
      slotItems: paramsRef.current.slotItems ?? {},
      cartItems: paramsRef.current.cartItems
    };
    const quizContext = buildQuizContext(() => storeApi.getState(), contextOptions);
    const { setAnswerWithPayload, setAnswers, appendAnswerValue, clearAnswer, removeAnswer } = storeApi.getState();
    const answerActions = {
      setAnswer: (blockRef, payload) => {
        if (typeof payload === "string") {
          setAnswerWithPayload(blockRef, { value: payload });
        } else {
          setAnswerWithPayload(blockRef, payload);
        }
      },
      setAnswers,
      appendAnswerValue,
      clearAnswer,
      removeAnswer
    };
    const allActions = {
      ...actionsRef.current,
      ...answerActions
    };
    if (typeof window !== "undefined") {
      const prevQuiz = window.quiz || {};
      window.quiz = {
        ...quizContext.quiz,
        actions: allActions,
        onChange: typeof prevQuiz.onChange === "function" ? prevQuiz.onChange : void 0,
        ...createQuizDOMHelpers()
      };
    }
    const timeoutId = setTimeout(() => {
      executeScriptsInElement(containerRef.current);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [runsMerchantCode, hasScripts, renderedContent, storeApi, containerRef]);
}
function executeScriptsInElement(containerElement) {
  if (!containerElement) return;
  if (typeof window === "undefined") return;
  const scripts = containerElement.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    var _a;
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    const scriptContent = oldScript.textContent;
    if (scriptContent && !oldScript.hasAttribute("src")) {
      newScript.textContent = `(function() {
${scriptContent}
})();`;
    } else {
      newScript.textContent = scriptContent;
    }
    (_a = oldScript.parentNode) == null ? void 0 : _a.replaceChild(newScript, oldScript);
  });
}
const QuestionCustomHtmlBlock = reactExports.memo(function QuestionCustomHtmlBlock2({
  block
}) {
  const { content } = block.preferences;
  const containerRef = reactExports.useRef(null);
  const {
    getQuestionByQuestionBlockRef,
    answers,
    variableScores,
    currentQuizPage,
    next,
    previous,
    overrideNext
  } = useQuizStore((state) => ({
    getQuestionByQuestionBlockRef: state.getQuestionByQuestionBlockRef,
    answers: state.answers,
    variableScores: state.variableScores,
    currentQuizPage: state.currentQuizPage,
    next: state.next,
    previous: state.previous,
    overrideNext: state.overrideNext
  }));
  const storeApi = useQuizStoreApi();
  const { render: render2, hasLiquidSyntax } = useLiquidRenderer();
  const [renderedContent, setRenderedContent] = reactExports.useState(content || "");
  const runsMerchantCode = useQuizStore((s) => s.runsMerchantCode);
  reactExports.useEffect(() => {
    const renderContent = async () => {
      if (!content) {
        setRenderedContent("");
        return;
      }
      const blockParentQuestion = getQuestionByQuestionBlockRef(block.ref);
      const context = buildQuizContext(() => storeApi.getState(), {
        mode: "question",
        currentPage: blockParentQuestion
      });
      let processedContent = content;
      if (hasLiquidSyntax(content)) {
        const { rendered } = await render2(content, context);
        processedContent = rendered;
      }
      setRenderedContent(processedContent);
    };
    renderContent();
  }, [
    content,
    block.ref,
    render2,
    hasLiquidSyntax,
    getQuestionByQuestionBlockRef,
    answers,
    variableScores,
    currentQuizPage,
    storeApi
  ]);
  const safeContent = runsMerchantCode ? renderedContent : sanitizeCanvasHtml(renderedContent);
  useCustomHtmlScripts({
    mode: "question",
    containerRef,
    renderedContent: safeContent,
    currentPage: getQuestionByQuestionBlockRef(block.ref),
    actions: { next, previous, overrideNext }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: block.ref, className: "custom-html", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, dangerouslySetInnerHTML: { __html: safeContent } }) });
});
const QuestionChartBlock = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-index-1sobdtHv.js").then((n2) => n2.index), true ? __vite__mapDeps([12,1,5,13]) : void 0, import.meta.url).then((module) => ({
    default: module.QuestionChartBlock
  }))
);
const PhoneBlock = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-phone-block-YVbQwkKf.js"), true ? __vite__mapDeps([11,1,9,4,5,6,7,8]) : void 0, import.meta.url).then((module) => ({
    default: module.PhoneBlock
  }))
);
const QuestionBlock = ({ block, isActiveQuestion = false }) => {
  const InspectorWrapper = useInspectorWrapper();
  const executeCustomFeatures = useQuizStore((state) => state.executeCustomFeatures);
  const getElementName = () => {
    if (block.type === BlockType.CHOICE && block.preferences.type === ChoiceType.SLIDER_CHOICE) {
      const sliderPreferences = block.preferences;
      const nameBySliderType = {
        [SliderType.SLIDER]: "slider",
        [SliderType.BUTTONS_SCALE]: "buttons_scale",
        [SliderType.RATING_SCALE]: "rating_scale"
      };
      return nameBySliderType[sliderPreferences.sliderType] || block.preferences.type;
    }
    if (block.type === BlockType.RATING_CHART) {
      return "rating_display";
    }
    if (block.type === BlockType.CUSTOM_CHART) {
      return "custom_chart";
    }
    return block.preferences.type;
  };
  const chartBlock = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionChartBlock, { block }) });
  const phoneBlock = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneBlock, { block }) });
  const shouldRenderBlock = () => {
    if (block.type === BlockType.CUSTOM_HTML || block.type === BlockType.CUSTOM_CHART) {
      return executeCustomFeatures;
    }
    return true;
  };
  if (!shouldRenderBlock()) {
    return null;
  }
  const renderByBlockType = {
    [BlockType.HEADING]: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingBlock, { block }),
    [BlockType.TEXT]: /* @__PURE__ */ jsxRuntimeExports.jsx(TextBlock, { block }),
    [BlockType.CHOICE]: /* @__PURE__ */ jsxRuntimeExports.jsx(ChoiceBlock, { block, isActiveQuestion }),
    [BlockType.IMAGE]: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageBlock, { block }),
    [BlockType.VIDEO]: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoBlock, { block }),
    [BlockType.INPUT]: /* @__PURE__ */ jsxRuntimeExports.jsx(InputBlock, { block }),
    [BlockType.PHONE]: phoneBlock,
    [BlockType.BUTTON]: /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonBlock, { block }),
    [BlockType.CUSTOM_HTML]: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCustomHtmlBlock, { block }),
    // Chart blocks (all use the same lazy-loaded adapter component)
    [BlockType.GAUGE_CHART]: chartBlock,
    [BlockType.RADAR_CHART]: chartBlock,
    [BlockType.BAR_CHART]: chartBlock,
    [BlockType.CUSTOM_CHART]: chartBlock,
    [BlockType.RATING_CHART]: chartBlock
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    InspectorWrapper,
    {
      elementRef: block.ref,
      elementName: getElementName(),
      elementType: "questionBlock",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block question-block", "data-block-ref": block.ref, children: renderByBlockType[block.type] })
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block question-block", "data-block-ref": block.ref, children: renderByBlockType[block.type] }) });
};
var MEDIA_QUERY_TYPES = /* @__PURE__ */ ((MEDIA_QUERY_TYPES2) => {
  MEDIA_QUERY_TYPES2["MEDIA_XS"] = "mediaXs";
  MEDIA_QUERY_TYPES2["MEDIA_SM"] = "mediaSm";
  MEDIA_QUERY_TYPES2["MEDIA_MD"] = "mediaMd";
  MEDIA_QUERY_TYPES2["MEDIA_2XL"] = "media2XL";
  MEDIA_QUERY_TYPES2["MEDIA_LG"] = "mediaLg";
  return MEDIA_QUERY_TYPES2;
})(MEDIA_QUERY_TYPES || {});
const MEDIA_QUERY_MIN_WIDTHS = {
  [
    "media2XL"
    /* MEDIA_2XL */
  ]: 1200,
  [
    "mediaLg"
    /* MEDIA_LG */
  ]: 992,
  [
    "mediaMd"
    /* MEDIA_MD */
  ]: 768,
  [
    "mediaSm"
    /* MEDIA_SM */
  ]: 668
};
const getCurrentViewportWidth = () => {
  var _a, _b, _c, _d;
  if (typeof window !== "object") return 0;
  return window.innerWidth || ((_b = (_a = window.document) == null ? void 0 : _a.documentElement) == null ? void 0 : _b.clientWidth) || ((_d = (_c = window.document) == null ? void 0 : _c.body) == null ? void 0 : _d.clientWidth) || 0;
};
const getMediaQueryTypeForWidth = (width) => {
  if (width >= MEDIA_QUERY_MIN_WIDTHS[
    "media2XL"
    /* MEDIA_2XL */
  ])
    return "media2XL";
  if (width >= MEDIA_QUERY_MIN_WIDTHS[
    "mediaLg"
    /* MEDIA_LG */
  ])
    return "mediaLg";
  if (width >= MEDIA_QUERY_MIN_WIDTHS[
    "mediaMd"
    /* MEDIA_MD */
  ])
    return "mediaMd";
  if (width >= MEDIA_QUERY_MIN_WIDTHS[
    "mediaSm"
    /* MEDIA_SM */
  ])
    return "mediaSm";
  return "mediaXs";
};
const getCurrentMediaQueryType = () => getMediaQueryTypeForWidth(getCurrentViewportWidth());
const useMediaQuery = () => {
  const [mediaQuerySize, setMediaQuerySize] = reactExports.useState(
    MEDIA_QUERY_TYPES.MEDIA_MD
  );
  reactExports.useEffect(() => {
    const updateSize = () => {
      setMediaQuerySize(getCurrentMediaQueryType());
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return mediaQuerySize;
};
let cachedSupport = null;
function supportsScopeAtRule() {
  if (cachedSupport !== null) return cachedSupport;
  if (typeof document === "undefined") return false;
  try {
    const style = document.createElement("style");
    style.textContent = "@scope (:root) {}";
    document.head.appendChild(style);
    const supported = !!style.sheet && style.sheet.cssRules.length > 0;
    document.head.removeChild(style);
    cachedSupport = supported;
    return supported;
  } catch (_) {
    cachedSupport = false;
    return false;
  }
}
function wrapWithScope(css, scopeSelector) {
  if (!css) return "";
  try {
    if (supportsScopeAtRule()) {
      return `@scope (${scopeSelector}) {
${css}
}`;
    }
  } catch (_) {
  }
  return css;
}
const QuestionsPreview = ({
  currentQuizPage,
  isVisible = true,
  isExiting = false,
  focusHeadingOnShow = false,
  skipHeightTracking = false,
  onContentHeightChange
}) => {
  var _a, _b;
  const mediaQuerySize = useMediaQuery();
  const questionContentRef = reactExports.useRef(null);
  const storeApi = useQuizStoreApi();
  const {
    questions,
    results,
    answers,
    inBuilder,
    runsMerchantCode,
    isModalLink,
    isInlineQuiz,
    quizInlineHeightEnabled,
    isStoreRenderer,
    executeCustomFeatures,
    quizModalHeight,
    quizInlineHeight,
    quizNavigationVisitedStates,
    quizNavigationFutureStates,
    next,
    previous,
    overrideNext,
    variableScores,
    highestVariableRef,
    isRedirectInProgress
  } = useQuizStore((state) => ({
    next: state.next,
    previous: state.previous,
    overrideNext: state.overrideNext,
    questions: state.questions,
    answers: state.answers,
    results: state.results,
    inBuilder: state.inBuilder,
    runsMerchantCode: state.runsMerchantCode,
    isModalLink: state.isModalLink,
    isInlineQuiz: state.isInlineQuiz,
    quizInlineHeightEnabled: state.quizInlineHeightEnabled,
    quizNavigationFutureStates: state.quizNavigationFutureStates,
    design: state.design,
    isStoreRenderer: state.isStoreRenderer,
    executeCustomFeatures: state.executeCustomFeatures,
    quizModalHeight: state.quizModalHeight,
    quizInlineHeight: state.quizInlineHeight,
    quizNavigationVisitedStates: state.quizNavigationVisitedStates,
    variableScores: state.variableScores,
    highestVariableRef: state.highestVariableRef,
    isRedirectInProgress: state.isRedirectInProgress
  }));
  const { blocks } = currentQuizPage;
  const headingId = (_a = blocks.find((block) => block.type === BlockType.HEADING)) == null ? void 0 : _a.ref;
  const { imagePosition } = currentQuizPage.preferences;
  const shouldShowButton = !hideNextButton(
    blocks,
    answers,
    quizNavigationFutureStates,
    isRedirectInProgress
  );
  const visitedState = quizNavigationVisitedStates.find(
    (s) => {
      var _a2;
      return ((_a2 = s.question) == null ? void 0 : _a2.ref) === currentQuizPage.ref;
    }
  );
  reactExports.useEffect(() => {
    const requiresUserInput = blocks.some(
      (block) => block.type === BlockType.CHOICE || block.type === BlockType.INPUT
    );
    let timeoutId;
    if (isVisible && currentQuizPage && currentQuizPage.preferences.autoAdvanceEnabled && !inBuilder && !requiresUserInput) {
      timeoutId = setTimeout(() => {
        next(currentQuizPage.ref);
      }, currentQuizPage.preferences.autoAdvanceDelay * 1e3);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentQuizPage]);
  reactExports.useEffect(() => {
    if (isVisible && currentQuizPage) {
      if (typeof window !== "undefined") {
        const prevQuiz = window.Quiz || {};
        const getState = () => storeApi.getState();
        const quizContext = buildQuizContext(() => getState(), {
          mode: "question",
          currentPage: currentQuizPage
        });
        const quizObj = {
          next,
          previous,
          overrideNext,
          // Preserve a previously assigned global change handler
          onChange: typeof prevQuiz.onChange === "function" ? prevQuiz.onChange : void 0,
          context: quizContext.quiz,
          // Expose unified context
          ...createQuizDOMHelpers()
        };
        Object.defineProperties(quizObj, {
          currentQuestion: { get: () => getState().currentQuizPage, configurable: true },
          questions: { get: () => getState().questions, configurable: true },
          results: { get: () => getState().results, configurable: true },
          answers: { get: () => getState().answers, configurable: true },
          variableScores: { get: () => getState().variableScores, configurable: true },
          highestVariableRef: { get: () => getState().highestVariableRef, configurable: true }
        });
        window.Quiz = quizObj;
        const { setAnswerWithPayload, setAnswers, appendAnswerValue, clearAnswer, removeAnswer } = getState();
        const actions = {
          next,
          previous,
          overrideNext,
          // Use store helper with backward compatibility wrapper
          setAnswer: (blockRef, payload) => {
            if (typeof payload === "string") {
              setAnswerWithPayload(blockRef, { value: payload });
            } else {
              setAnswerWithPayload(blockRef, payload);
            }
          },
          // Expose additional helpers
          setAnswers,
          appendAnswerValue,
          clearAnswer,
          removeAnswer
        };
        const prevLower = window.quiz || {};
        window.quiz = {
          ...quizContext.quiz,
          actions,
          // Preserve previously assigned onChange handler if any
          onChange: typeof prevLower.onChange === "function" ? prevLower.onChange : void 0,
          // Include DOM helpers (Shadow DOM-aware)
          ...createQuizDOMHelpers()
        };
      }
    }
    const canExecuteCustomJS = executeCustomFeatures;
    if (isVisible && currentQuizPage && currentQuizPage.preferences.customJS && runsMerchantCode && canExecuteCustomJS) {
      try {
        const getState = () => storeApi.getState();
        const quizContext = buildQuizContext(() => getState(), {
          mode: "question",
          currentPage: currentQuizPage
        });
        const { setAnswerWithPayload, setAnswers, appendAnswerValue, clearAnswer, removeAnswer } = getState();
        const actions = {
          next,
          previous,
          overrideNext,
          // Use store helper with backward compatibility wrapper
          setAnswer: (blockRef, payload) => {
            if (typeof payload === "string") {
              setAnswerWithPayload(blockRef, { value: payload });
            } else {
              setAnswerWithPayload(blockRef, payload);
            }
          },
          // Expose additional helpers
          setAnswers,
          appendAnswerValue,
          clearAnswer,
          removeAnswer
        };
        const customFunction = new Function(
          "quiz",
          "actions",
          currentQuizPage.preferences.customJS
        );
        if (customFunction.length > 2) {
          console.warn(
            "DEPRECATION WARNING: Custom JS using old signature (9 positional parameters). Please update to use the new signature: function(quiz, actions) { ... }. The old signature will be removed in a future version."
          );
          const oldSignatureFunction = new Function(
            "currentQuestion",
            "questions",
            "answers",
            "results",
            "variableScores",
            "highestVariableRef",
            "next",
            "previous",
            "overrideNext",
            currentQuizPage.preferences.customJS
          );
          oldSignatureFunction(
            currentQuizPage,
            questions,
            answers,
            results,
            variableScores,
            highestVariableRef,
            next,
            previous,
            overrideNext
          );
        } else {
          customFunction(quizContext.quiz, actions);
        }
      } catch (error) {
        console.error("Error evaluating custom JS:", error);
      }
    }
  }, [
    currentQuizPage,
    questions,
    answers,
    results,
    variableScores,
    highestVariableRef,
    next,
    previous,
    overrideNext,
    inBuilder,
    runsMerchantCode,
    isStoreRenderer,
    executeCustomFeatures,
    isVisible
  ]);
  reactExports.useEffect(() => {
    if (skipHeightTracking || !isVisible || !onContentHeightChange) {
      return;
    }
    const element = questionContentRef.current;
    if (!element) {
      return;
    }
    const updateHeight = () => {
      onContentHeightChange(element.offsetHeight);
    };
    updateHeight();
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(element);
    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [
    skipHeightTracking,
    currentQuizPage,
    mediaQuerySize,
    imagePosition,
    shouldShowButton,
    visitedState,
    currentQuizPage.ref,
    isVisible,
    onContentHeightChange
  ]);
  const questionClass = clsx("question", {
    "question-split": imagePosition === "split",
    "question-builder": inBuilder,
    "question-store-renderer": isStoreRenderer,
    mobile: mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_XS || mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_SM,
    "question-builder-mobile": (mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_XS || mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_SM) && inBuilder
  });
  const questionContentClass = clsx(
    {
      "content-split": imagePosition === "split"
    },
    "content question-content"
  );
  const getMinHeight = () => {
    if (isModalLink) {
      return `calc(${quizModalHeight}vh - 24px)`;
    } else if (quizInlineHeightEnabled && isInlineQuiz) {
      return `calc(${quizInlineHeight}px - 24px)`;
    } else if (!isStoreRenderer) {
      return "undefined";
    }
    return "fit-content";
  };
  const scopedOrRawCustomCss = reactExports.useMemo(() => {
    var _a2;
    let css = ((_a2 = currentQuizPage == null ? void 0 : currentQuizPage.preferences) == null ? void 0 : _a2.customCSS) || "";
    const id2 = (currentQuizPage == null ? void 0 : currentQuizPage.ref) || "";
    if (!css || !id2) return "";
    if (inBuilder) {
      css = transformMediaToContainerQueries(css);
    }
    return wrapWithScope(css, `#${id2}`);
  }, [(_b = currentQuizPage == null ? void 0 : currentQuizPage.preferences) == null ? void 0 : _b.customCSS, currentQuizPage == null ? void 0 : currentQuizPage.ref, inBuilder]);
  const canInjectCustomCSS = executeCustomFeatures;
  const shouldInjectCustomCss = Boolean(
    (isVisible || isExiting) && scopedOrRawCustomCss && canInjectCustomCSS
  );
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (!isVisible || !focusHeadingOnShow || inBuilder) return;
    const content = questionContentRef.current;
    const heading = headingId ? (_a2 = content == null ? void 0 : content.getRootNode()) == null ? void 0 : _a2.getElementById(headingId) : null;
    if (!content || !heading) return;
    const quizActive = content.getRootNode().activeElement;
    const pageActive = document.activeElement;
    const focusInQuiz = !!quizActive && !!((_b2 = content.closest("main")) == null ? void 0 : _b2.contains(quizActive)) || !!(pageActive == null ? void 0 : pageActive.closest(".react-dropdown-select-dropdown"));
    const focusNowhere = !pageActive || pageActive === document.body;
    if (!focusInQuiz && !focusNowhere) return;
    const frame = requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [isVisible, focusHeadingOnShow, inBuilder, headingId, currentQuizPage.ref]);
  const currentQuestionIndex = questions.findIndex((q2) => q2.ref === currentQuizPage.ref);
  const totalQuestions = questions.length;
  const questionNumber = currentQuestionIndex >= 0 ? currentQuestionIndex + 1 : null;
  const ariaLabel = questionNumber !== null ? `Question ${questionNumber} of ${totalQuestions}` : "Question";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "question-preview",
      role: "region",
      "aria-label": ariaLabel,
      children: [
        shouldInjectCustomCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: scopedOrRawCustomCss }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: questionClass,
            style: {
              minHeight: getMinHeight()
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: currentQuizPage.ref, className: questionContentClass, ref: questionContentRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionHeadingIdContext.Provider, { value: headingId, children: blocks.map((block) => {
              if (block.type === BlockType.BUTTON) {
                if (!shouldShowButton) return null;
                if ((visitedState == null ? void 0 : visitedState.time) && visitedState.time > Date.now() - 1e3) {
                  return null;
                } else {
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    QuestionBlock,
                    {
                      block,
                      isActiveQuestion: isVisible
                    },
                    block.ref
                  );
                }
              } else {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuestionBlock,
                  {
                    block,
                    isActiveQuestion: isVisible
                  },
                  block.ref
                );
              }
            }) }) })
          }
        )
      ]
    },
    currentQuizPage.ref
  );
};
const NavigationBar = ({ currentQuizPageRef, onHeightChange }) => {
  const InspectorWrapper = useInspectorWrapper();
  const navBarRef = reactExports.useRef(null);
  const {
    design,
    questions,
    previous,
    next,
    isQuestionAnswered,
    inBuilder,
    getQuestionByQuestionRef,
    quizNavigationPastStates,
    quizNavigationPastStatesInBuilder,
    getTranslatedContent
  } = useQuizStore((state) => ({
    design: state.design,
    questions: state.questions,
    getQuestionByQuestionRef: state.getQuestionByQuestionRef,
    previous: state.previous,
    next: state.next,
    isQuestionAnswered: state.isQuestionAnswered,
    inBuilder: state.inBuilder,
    currentQuizPage: state.currentQuizPage,
    quizNavigationPastStates: state.quizNavigationPastStates,
    quizNavigationPastStatesInBuilder: state.quizNavigationPastStatesInBuilder,
    getTranslatedContent: state.getTranslatedContent
  }));
  const dir = useLanguageDirection();
  const question = getQuestionByQuestionRef(currentQuizPageRef);
  const currentQuestionIndex = questions.findIndex((q2) => q2.ref === currentQuizPageRef);
  const isAnswered = isQuestionAnswered(currentQuizPageRef);
  const totalQuestions = questions.length;
  const navigationStates = inBuilder ? quizNavigationPastStatesInBuilder : quizNavigationPastStates;
  const handleNavButtonKeyDown = useArrowKeyFocusNavigation();
  reactExports.useEffect(() => {
    if (!onHeightChange) {
      return;
    }
    const element = navBarRef.current;
    if (!element) {
      return;
    }
    const updateHeight = () => {
      onHeightChange(element.offsetHeight);
    };
    updateHeight();
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(element);
    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [design, InspectorWrapper, onHeightChange]);
  const { preferences } = question || {};
  const { overwriteProgressBarText, allowOverwriteProgressBar } = preferences || {};
  const progress = Math.round(currentQuestionIndex / totalQuestions * 100);
  const progressText = getTranslatedContent({ key: "x_complete", values: { percent: progress } });
  const displayedProgressText = allowOverwriteProgressBar ? overwriteProgressBarText : progressText;
  const spokenProgressText = displayedProgressText || progressText;
  const showsProgress = design.showProgressPercentage || design.showNavigationBar;
  const progressBarWidth = `${progress}%`;
  if (!question) {
    return null;
  }
  const navigationBarContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "navigation-bar__container", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "navigation-bar__progress",
        dir,
        ...showsProgress && {
          role: "progressbar",
          "aria-label": getTranslatedContent({ key: "ada_quiz_progress" }),
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": progress,
          "aria-valuetext": spokenProgressText
        },
        children: [
          design.showProgressPercentage && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "navigation-bar__progress-text", children: displayedProgressText }),
          design.showNavigationBar && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "navigation-bar__progress-bar", dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "navigation-bar__progress-bar-fill",
              style: {
                width: `${progressBarWidth}`,
                ...dir === "rtl" ? { marginLeft: "auto" } : {}
              }
            }
          ) })
        ]
      }
    ),
    showsProgress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "status", className: "visually-hidden", children: spokenProgressText }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "navigation-bar__buttons",
        dir,
        "data-arrow-direction": design.arrowsDirection,
        style: { width: design.showNavigationBar ? "auto" : "100%" },
        children: [
          design.arrowsDirection === "left-right" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "navigation-bar__button",
                disabled: (navigationStates == null ? void 0 : navigationStates.length) <= 0,
                "aria-label": (navigationStates == null ? void 0 : navigationStates.length) <= 0 || currentQuestionIndex <= 0 ? getTranslatedContent({ key: "ada_no_previous_question" }) : getTranslatedContent({ key: "ada_previous_question" }),
                onClick: () => previous(),
                onKeyDown: handleNavButtonKeyDown,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronLeft, { size: 14 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "navigation-bar__button",
                "aria-label": !isAnswered || currentQuestionIndex === totalQuestions ? getTranslatedContent({ key: "ada_answer_before_proceeding" }) : getTranslatedContent({ key: "ada_next_question" }),
                onClick: () => next(currentQuizPageRef),
                onKeyDown: handleNavButtonKeyDown,
                disabled: !isAnswered || currentQuestionIndex === totalQuestions,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronRight, { size: 14 })
              }
            )
          ] }),
          design.arrowsDirection === "up-down" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "navigation-bar__button",
                disabled: (navigationStates == null ? void 0 : navigationStates.length) <= 0,
                "aria-label": (navigationStates == null ? void 0 : navigationStates.length) <= 0 ? getTranslatedContent({ key: "ada_no_previous_question" }) : getTranslatedContent({ key: "ada_previous_question" }),
                onClick: () => previous(),
                onKeyDown: handleNavButtonKeyDown,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronUp, { size: 14 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "navigation-bar__button",
                disabled: !isAnswered || currentQuestionIndex === totalQuestions,
                "aria-label": !isAnswered || currentQuestionIndex === totalQuestions ? getTranslatedContent({ key: "ada_answer_before_proceeding" }) : getTranslatedContent({ key: "ada_next_question" }),
                onClick: () => next(currentQuizPageRef),
                onKeyDown: handleNavButtonKeyDown,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronDown, { size: 14 })
              }
            )
          ] })
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: navBarRef,
      className: "navigation-bar",
      "aria-label": getTranslatedContent({ key: "ada_quiz_navigation_buttons" }),
      role: "navigation",
      children: InspectorWrapper ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        InspectorWrapper,
        {
          elementRef: "qnb-000001",
          elementName: "Navigation Bar",
          maxWidth: "100%",
          elementType: "navigation",
          children: navigationBarContent
        }
      ) : navigationBarContent
    }
  );
};
const QuestionBackground = ({ question }) => {
  const { imageUrl, imageOpacity, imagePosition } = question.preferences;
  const { backgroundColor } = useQuizStore((state) => ({
    backgroundColor: state.design.quizBackgroundColor
  }));
  const mediaQuerySize = useMediaQuery();
  const questionBgImageStyle = imageUrl ? {
    backgroundImage: `url("${imageUrl}")`,
    backgroundColor,
    opacity: imageOpacity ? imageOpacity / 100 : 20
  } : {};
  const questionBgClass = clsx("question-background", {
    background: imagePosition === "background",
    "background-split": imagePosition === "split",
    mobile: mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_XS || mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_SM
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: questionBgClass }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: clsx("question-background-image", {
          mobile: mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_XS || mediaQuerySize === MEDIA_QUERY_TYPES.MEDIA_SM,
          "question-background-image--split": imagePosition === "split"
        }),
        style: questionBgImageStyle
      }
    )
  ] });
};
const QuestionPreviewWrapper = () => {
  const [currentQuestionNavigationIndex, setCurrentQuestionNavigationIndex] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(false);
  const [wrapperHeight, setWrapperHeight] = reactExports.useState("auto");
  const [wrapperMinHeight, setWrapperMinHeight] = reactExports.useState("auto");
  const [questionContentHeight, setQuestionContentHeight] = reactExports.useState(null);
  const [navBarHeight, setNavBarHeight] = reactExports.useState(0);
  const {
    currentQuizPage,
    quizNavigationPastStates,
    quizNavigationFutureStates,
    quizNavigationPastStatesInBuilder,
    quizNavigationFutureStatesInBuilder,
    arrowsDirection,
    inBuilder,
    direction,
    isInlineQuiz,
    quizInlineHeightEnabled,
    quizInlineHeight,
    quizInlineHeightUnit
  } = useQuizStore((state) => ({
    quizNavigationPastStates: state.quizNavigationPastStates,
    quizNavigationFutureStates: state.quizNavigationFutureStates,
    quizNavigationPastStatesInBuilder: state.quizNavigationPastStatesInBuilder,
    quizNavigationFutureStatesInBuilder: state.quizNavigationFutureStatesInBuilder,
    currentQuizPage: state.currentQuizPage,
    arrowsDirection: state.design.arrowsDirection,
    inBuilder: state.inBuilder,
    direction: state.direction,
    isInlineQuiz: state.isInlineQuiz,
    quizInlineHeightEnabled: state.quizInlineHeightEnabled,
    quizInlineHeight: state.quizInlineHeight,
    quizInlineHeightUnit: state.quizInlineHeightUnit
  }));
  const [isFirstLoad, setIsFirstLoad] = reactExports.useState(
    inBuilder ? quizNavigationFutureStatesInBuilder.length === 0 && quizNavigationPastStatesInBuilder.length === 0 : quizNavigationFutureStates.length === 0 && quizNavigationPastStates.length === 0
  );
  const [questionsNavigation, setQuestionsNavigation] = reactExports.useState([]);
  const animationDirection = arrowsDirection === "up-down" ? "vertical" : "horizontal";
  const questionWrapperClass = clsx("question-wrapper", {
    "question-wrapper-hide-next-button": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "hideNextButton" in currentQuizPage.preferences && currentQuizPage.preferences.hideNextButton,
    "question-wrapper-split": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "imagePosition" in currentQuizPage.preferences && currentQuizPage.preferences.imagePosition === "split",
    "question-wrapper-split-desktop-left": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "imagePositionSplitDesktop" in currentQuizPage.preferences && currentQuizPage.preferences.imagePositionSplitDesktop === "left",
    "question-wrapper-split-desktop-right": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "imagePositionSplitDesktop" in currentQuizPage.preferences && currentQuizPage.preferences.imagePositionSplitDesktop === "right",
    "question-wrapper-split-mobile-above": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "imagePositionSplitMobile" in currentQuizPage.preferences && currentQuizPage.preferences.imagePositionSplitMobile === "above",
    "question-wrapper-split-mobile-below": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "imagePositionSplitMobile" in currentQuizPage.preferences && currentQuizPage.preferences.imagePositionSplitMobile === "below",
    "question-wrapper-split-mobile-hidden": (currentQuizPage == null ? void 0 : currentQuizPage.preferences) && "imagePositionSplitMobile" in currentQuizPage.preferences && currentQuizPage.preferences.imagePositionSplitMobile === "hidden",
    [`${currentQuizPage == null ? void 0 : currentQuizPage.ref}`]: currentQuizPage == null ? void 0 : currentQuizPage.ref
  });
  reactExports.useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    const lastPastState = inBuilder ? quizNavigationPastStatesInBuilder.slice(-1) : quizNavigationPastStates.slice(-1);
    const firstFutureState = inBuilder ? quizNavigationFutureStatesInBuilder.slice(-1) : quizNavigationFutureStates.slice(-1);
    const newCalculatedSlides = direction === "forward" ? [...lastPastState, currentQuizPage].filter(
      (slide) => slide !== null && slide !== void 0
    ) : [currentQuizPage, ...firstFutureState].filter(
      (slide) => slide !== null && slide !== void 0
    );
    const newQuestionNavigationIndex = newCalculatedSlides.findIndex(
      (slide) => slide.ref === (currentQuizPage == null ? void 0 : currentQuizPage.ref)
    );
    setQuestionsNavigation(newCalculatedSlides);
    if (newQuestionNavigationIndex !== 0) {
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
    }
    setCurrentQuestionNavigationIndex(newQuestionNavigationIndex);
    setLoading(false);
  }, [currentQuizPage]);
  reactExports.useEffect(() => {
    if (!isInlineQuiz || quizInlineHeightEnabled) {
      setWrapperHeight("100%");
    } else if (typeof questionContentHeight === "number") {
      setWrapperHeight(`${questionContentHeight + navBarHeight}px`);
    } else {
      setWrapperHeight("auto");
    }
    if (quizInlineHeight && quizInlineHeight > 0) {
      const qihu = quizInlineHeightUnit || "px";
      setWrapperMinHeight(`${quizInlineHeight}${qihu}`);
    } else {
      setWrapperMinHeight("auto");
    }
  }, [
    isInlineQuiz,
    quizInlineHeightEnabled,
    quizInlineHeight,
    quizInlineHeightUnit,
    questionContentHeight,
    navBarHeight
  ]);
  const handleQuestionContentHeightChange = reactExports.useCallback((height) => {
    setQuestionContentHeight(
      (currentHeight) => currentHeight === height ? currentHeight : height
    );
  }, []);
  const handleNavBarHeightChange = reactExports.useCallback((height) => {
    setNavBarHeight((currentHeight) => currentHeight === height ? currentHeight : height);
  }, []);
  const getAnimationDirection = (index2) => {
    return currentQuestionNavigationIndex === index2 ? "enter" : "exit";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: questionWrapperClass,
        style: { height: wrapperHeight, minHeight: wrapperMinHeight },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionBackground, { question: currentQuizPage }),
          questionsNavigation.map((question, index2) => {
            const isVisible = index2 === currentQuestionNavigationIndex;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `question-navigation-item ${!isFirstLoad ? `${animationDirection}-${direction}` : ""} ${getAnimationDirection(index2)}`,
                "aria-hidden": !isVisible,
                "data-visible": isVisible,
                ...!isVisible ? { inert: "" } : {},
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuestionsPreview,
                  {
                    currentQuizPage: question,
                    isVisible,
                    onContentHeightChange: isVisible ? handleQuestionContentHeightChange : void 0,
                    isExiting: !isFirstLoad && getAnimationDirection(index2) === "exit",
                    focusHeadingOnShow: !isFirstLoad
                  }
                )
              },
              index2 + question.ref
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavigationBar,
      {
        currentQuizPageRef: (currentQuizPage == null ? void 0 : currentQuizPage.ref) || "",
        onHeightChange: handleNavBarHeightChange
      }
    )
  ] });
};
const OverPlanPage = ({ timerCount }) => {
  const { quizBackgroundColor, questionHeadingColor, questionTextColor } = useQuizStore(
    (state) => ({
      quizBackgroundColor: state.design.quizBackgroundColor,
      questionHeadingColor: state.design.questionHeadingColor,
      questionTextColor: state.design.questionTextColor
    })
  );
  const isIndefiniteBlock = timerCount > OVER_PLAN_MAX_COUNTDOWN;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "question-preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "question-wrapper",
      style: { height: "100%", minHeight: "100%", backgroundColor: quizBackgroundColor },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "question", style: { minHeight: "fit-content" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content question-content", style: { textAlign: "center" }, children: isIndefiniteBlock ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontSize: 18,
              fontWeight: 700,
              margin: "0 0 10px",
              color: questionHeadingColor
            },
            children: OVER_PLAN_COPY.blocked.title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, margin: 0, color: questionTextColor }, children: OVER_PLAN_COPY.blocked.body })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontSize: 18,
              fontWeight: 700,
              margin: "0 0 10px",
              color: questionHeadingColor
            },
            children: OVER_PLAN_COPY.countdown.title(timerCount)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, margin: 0, color: questionTextColor }, children: OVER_PLAN_COPY.countdown.body })
      ] }) }) })
    }
  ) });
};
const ResultsPreview = reactExports.lazy(
  () => __vitePreload(() => import("./quiz-renderer-result-preview-7PYqPT8-.js"), true ? __vite__mapDeps([19,8,1,6,7,20,3,2,5,21,22,23,24,4,9]) : void 0, import.meta.url).then((module) => ({
    default: module.ResultsPreview
  }))
);
const Quiz = ({
  InspectorWrapper = void 0,
  DraftProductPlaceholder = void 0,
  quizPreview,
  type = "modal",
  shop,
  overPlanAt
}) => {
  const {
    answers,
    currentQuizPage,
    getPlainCssFromDesign,
    id: id2,
    inBuilder,
    initializeAnswers,
    rendererInstanceId,
    rendererType,
    isCurrentQuestion,
    isCurrentResult,
    questions,
    saveQuizProgress,
    design,
    showQuestions,
    setResponseId,
    responseLoaded,
    results
  } = useQuizStore((state) => ({
    answers: state.answers,
    currentQuizPage: state.currentQuizPage,
    getPlainCssFromDesign: state.getPlainCssFromDesign,
    id: state.id,
    inBuilder: state.inBuilder,
    initializeAnswers: state.initializeAnswers,
    rendererInstanceId: state.rendererInstanceId,
    rendererType: state.rendererType,
    isCurrentQuestion: state.isCurrentQuestion,
    isCurrentResult: state.isCurrentResult,
    questions: state.questions,
    saveQuizProgress: state.preferences.saveQuizProgress,
    design: state.design,
    showQuestions: state.showQuestions,
    setResponseId: state.setResponseId,
    responseLoaded: state.responseLoaded,
    results: state.results
  }));
  const languageDir = useLanguageDirection();
  const languageTag = useQuizLanguageTag();
  const [shadow, setShadow] = reactExports.useState(void 0);
  const [answersHasBeenInitialized, setAnswersHasBeenInitialized] = reactExports.useState(false);
  const [width] = useWindowResizeFromShadowDom({
    shadowRoot: shadow,
    quizPreview
  });
  const mobileWidthClass = width < 480 && "mobile";
  const hasNavigatedRef = reactExports.useRef(false);
  const [fetchedStyles, setFetchedStyles] = reactExports.useState("");
  const isDev = false;
  const stylesContent = fetchedStyles;
  reactExports.useEffect(() => {
    {
      fetch(quizStylesUrl).then((response) => response.text()).then((css) => setFetchedStyles(css)).catch(console.error);
    }
  }, [isDev]);
  const shadowClass = clsx("quiz", mobileWidthClass, {
    "quiz-question": isCurrentQuestion(),
    "quiz-result": isCurrentResult(),
    results: isCurrentResult(),
    "quiz-modal": type === "modal",
    "quiz-inline": type === "inline",
    "use-font-family-heading": design.fontFamilyHeading !== "inherit",
    "use-font-family-body": design.fontFamily !== "inherit",
    "in-quiz-builder": inBuilder
  });
  const isResultPage = isCurrentResult();
  const [timerCount, setTimerCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setTimerCount(overPlanSeconds(overPlanAt));
  }, [overPlanAt]);
  reactExports.useEffect(() => {
    if (timerCount > 0 && timerCount <= OVER_PLAN_MAX_COUNTDOWN) {
      const id22 = setTimeout(() => setTimerCount((c) => c - 1), 1e3);
      return () => clearTimeout(id22);
    }
  }, [timerCount]);
  reactExports.useEffect(() => {
    if (!id2) {
      return;
    }
    if (inBuilder) {
      if (showQuestions) {
        setResponseId("");
      }
      initializeAnswers();
      return;
    }
    if (saveQuizProgress) {
      if (showQuestions) {
        !answers.length && initializeAnswers();
      } else {
        if (!responseLoaded) {
          initializeAnswers();
        }
      }
      setAnswersHasBeenInitialized(true);
    } else if (!answersHasBeenInitialized) {
      const isPastResponsePreview = showQuestions === false;
      if (!responseLoaded && !isPastResponsePreview) {
        initializeAnswers();
      }
      if (!isPastResponsePreview) {
        setResponseId("");
      }
      setAnswersHasBeenInitialized(true);
    } else ;
  }, [id2, questions, responseLoaded]);
  reactExports.useEffect(() => {
    if (questions && questions.length > 0 && !inBuilder) {
      preloadQuestionBlocks(questions);
    }
  }, [questions, inBuilder]);
  reactExports.useEffect(() => {
    if (!currentQuizPage || inBuilder) {
      return;
    }
    const currentIndex = questions.findIndex((q2) => q2.ref === currentQuizPage.ref);
    if (currentIndex === 1 && !hasNavigatedRef.current && questions.length > 0) {
      hasNavigatedRef.current = true;
      preloadQuestionImages(questions);
    }
  }, [currentQuizPage, questions, inBuilder]);
  reactExports.useEffect(() => {
    if (!currentQuizPage || inBuilder) {
      return;
    }
    const currentIndex = questions.findIndex((q2) => q2.ref === currentQuizPage.ref);
    const isLastQuestion = currentIndex === questions.length - 1;
    const isNavigatingToResults = isCurrentResult();
    if (isLastQuestion || isNavigatingToResults) {
      preloadResultsPage();
      if (results && results.length > 0) {
        preloadResultBlocks(results);
      }
    }
  }, [currentQuizPage, questions, inBuilder, isCurrentResult, results]);
  reactExports.useEffect(() => {
    if (!currentQuizPage) {
      return;
    }
    if (!(currentQuizPage == null ? void 0 : currentQuizPage.ref)) {
      return;
    }
  }, []);
  reactExports.useEffect(() => {
    if (!rendererInstanceId) return;
    postQuizRendererMessage({
      targetWindow: window.parent,
      instanceId: rendererInstanceId,
      rendererType,
      type: isResultPage ? "isResult" : "isQuestion"
    });
  }, [isResultPage, rendererInstanceId, rendererType]);
  reactExports.useEffect(() => {
    const fontImports = getPlainCssFromDesign().match(/@import url\((['"])(.*?)\1\);/g);
    const links = [];
    if (fontImports) {
      fontImports.forEach((fontImport) => {
        const match = fontImport.match(/url\((['"])(.*?)\1\);/);
        const fontUrl = match == null ? void 0 : match[2];
        if (fontUrl) {
          const link = document.createElement("link");
          link.href = fontUrl;
          link.rel = "stylesheet";
          document.head.appendChild(link);
          links.push(link);
        }
      });
    }
    return () => {
      links.forEach((link) => {
        try {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        } catch (error) {
          console.warn("Failed to remove font link:", error);
        }
      });
    };
  }, [getPlainCssFromDesign()]);
  const designCss = reactExports.useMemo(() => {
    const css = getPlainCssFromDesign();
    return inBuilder ? transformMediaToContainerQueries(css) : css;
  }, [getPlainCssFromDesign(), inBuilder]);
  if (!currentQuizPage) {
    return null;
  }
  if (!stylesContent) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ShadowDom, { shadow, setShadow, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: stylesContent }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: designCss }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        id: `quiz-${id2}`,
        className: shadowClass,
        dir: languageDir,
        lang: languageTag,
        "aria-label": "Product recommendation quiz",
        tabIndex: -1,
        style: inBuilder ? { containerType: "inline-size" } : void 0,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuizBuilderProvider,
          {
            InspectorWrapper,
            DraftProductPlaceholder,
            children: timerCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(OverPlanPage, { timerCount }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              isCurrentQuestion() && showQuestions && /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionPreviewWrapper, {}),
              (isCurrentResult() || !showQuestions) && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsPreview, { shop }) })
            ] })
          }
        )
      }
    )
  ] });
};
const loadTrackersIfEnabled = (preferences, cb2) => {
  if (!(preferences.trackGA4Events || preferences.trackMetaPixel || preferences.trackTiktokPixel)) {
    return;
  }
  __vitePreload(() => import("./quiz-renderer-trackers-bundle-Do5Gpowk.js").then((n2) => n2.trackersBundle), true ? __vite__mapDeps([6,1]) : void 0, import.meta.url).then(cb2).catch((e) => console.error("Failed to load trackers bundle", e));
};
const trackQuestionViewed = (ref, title, preferences) => {
  loadTrackersIfEnabled(
    preferences,
    ({
      GA4EventTypes,
      MetaEventTypes,
      TiktokEventTypes,
      trackGA4Event,
      trackMetaEvent,
      trackTiktokEvent
    }) => {
      if (preferences.trackGA4Events) {
        trackGA4Event(GA4EventTypes.QUESTION_VIEWED, { question_title: title });
      }
      if (preferences.trackMetaPixel) {
        const fbqParams = { content_name: title, content_category: "question" };
        trackMetaEvent(MetaEventTypes.QUESTION_VIEWED.toUpperCase(), fbqParams);
      }
      if (preferences.trackTiktokPixel) {
        trackTiktokEvent(
          TiktokEventTypes.QUESTION_VIEWED,
          { content_name: "Question Viewed: " + title, content_id: ref },
          preferences.tiktokPixelId
        );
      }
    }
  );
};
const trackQuizCompletionConversion = (quizName, preferences) => {
  loadTrackersIfEnabled(
    preferences,
    ({
      GA4EventTypes,
      MetaEventTypes,
      TiktokEventTypes,
      trackGA4Event,
      trackMetaEvent,
      trackTiktokEvent
    }) => {
      if (preferences.trackGA4Events) {
        trackGA4Event(GA4EventTypes.GENERATE_LEAD, { quiz_name: quizName });
      }
      if (preferences.trackMetaPixel) {
        trackMetaEvent(MetaEventTypes.RESULTS_PAGE_VIEWED_LEAD.toUpperCase(), {});
      }
      if (preferences.trackTiktokPixel) {
        trackTiktokEvent(
          TiktokEventTypes.RESULTS_PAGE_VIEWED_LEAD,
          {},
          preferences.tiktokPixelId
        );
      }
    }
  );
};
const trackResultViewed = (ref, title, preferences, quizName = title) => {
  loadTrackersIfEnabled(
    preferences,
    ({
      GA4EventTypes,
      MetaEventTypes,
      TiktokEventTypes,
      trackGA4Event,
      trackMetaEvent,
      trackTiktokEvent
    }) => {
      if (preferences.trackGA4Events) {
        trackGA4Event(GA4EventTypes.RESULTS_PAGE_VIEWED, { results_page_title: title });
      }
      if (preferences.trackMetaPixel) {
        const fbqParams = { content_name: title, content_category: "results" };
        trackMetaEvent(MetaEventTypes.RESULTS_PAGE_VIEWED.toUpperCase(), fbqParams);
      }
      if (preferences.trackTiktokPixel) {
        trackTiktokEvent(
          TiktokEventTypes.RESULTS_PAGE_VIEWED,
          { content_name: "Results Page Viewed: " + title, content_id: ref },
          preferences.tiktokPixelId
        );
      }
    }
  );
  trackQuizCompletionConversion(quizName, preferences);
};
const useQuizTrackingEffects = (currentQuizPage) => {
  const {
    quizId,
    quizName,
    isCurrentQuestion,
    isCurrentResult,
    getQuestionTitle,
    getResultTitle,
    preferences
  } = useQuizStore((state) => ({
    quizId: state.id,
    quizName: state.name,
    isCurrentQuestion: state.isCurrentQuestion,
    isCurrentResult: state.isCurrentResult,
    getQuestionTitle: state.getQuestionTitle,
    getResultTitle: state.getResultTitle,
    preferences: state.preferences
  }));
  reactExports.useEffect(() => {
    if (!(currentQuizPage == null ? void 0 : currentQuizPage.ref) || !quizId) return;
    if (isCurrentQuestion()) {
      trackQuestionViewed(currentQuizPage.ref, getQuestionTitle(currentQuizPage.ref), preferences);
    }
    if (isCurrentResult()) {
      trackResultViewed(
        currentQuizPage.ref,
        getResultTitle(currentQuizPage.ref),
        preferences,
        quizName
      );
    }
  }, [currentQuizPage == null ? void 0 : currentQuizPage.ref, quizId, preferences, quizName]);
};
const getStoredQuizId = (quizHandle) => {
  var _a;
  try {
    if (!("localStorage" in globalThis)) return null;
    const cacheKey = `revenuehunt${quizHandle ? `-${quizHandle}` : ""}`;
    const storedData = localStorage.getItem(cacheKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return ((_a = parsedData.state) == null ? void 0 : _a.id) || null;
    }
  } catch (error) {
    console.error("Error reading stored quiz ID:", error);
  }
  return null;
};
const isDatabaseTimestampFromCacheEqualsThanDatabase = (quizFromDatabase, persistedState) => {
  const quizCacheTimestamp = persistedState.databaseTimestamp ?? 0;
  const quizFromDatabaseTimestamp = quizFromDatabase.databaseTimestamp ?? 0;
  return quizCacheTimestamp && quizFromDatabaseTimestamp && quizCacheTimestamp === quizFromDatabaseTimestamp;
};
const getQuizFromPersistedState = (quizHandle) => {
  try {
    if (!("localStorage" in globalThis)) return null;
    const quizCache = localStorage.getItem(`revenuehunt${quizHandle ? `-${quizHandle}` : ""}`) || null;
    if (!quizCache) return null;
    return JSON.parse(quizCache).state;
  } catch (error) {
    console.error("Failed to parse revenuehunt cache:", error);
    return null;
  }
};
const shouldRehydrate = (quizFromDatabase, persistedState, handle) => {
  if (!persistedState) return false;
  const isSameStoreId = getStoredQuizId(handle) === (quizFromDatabase == null ? void 0 : quizFromDatabase.id);
  return Boolean(persistedState) && isSameStoreId && persistedState && isDatabaseTimestampFromCacheEqualsThanDatabase(quizFromDatabase, persistedState);
};
const getPropsToHydrateAlways = (quizFromDatabase, persistedState) => {
  return isDatabaseTimestampFromCacheEqualsThanDatabase(quizFromDatabase, persistedState) ? [
    "quizNavigationPastStates",
    "quizNavigationFutureStates",
    "currentQuizPage",
    "answers",
    "responseId",
    "recommendations"
  ] : [];
};
const getHydratedAlwaysProps = (quizFromDatabase, persistedState) => {
  if (!persistedState) return {};
  return getPropsToHydrateAlways(quizFromDatabase, persistedState).reduce((acc, prop) => {
    if (prop in persistedState || prop in quizFromDatabase) {
      acc[prop] = persistedState[prop] ?? quizFromDatabase[prop];
    }
    return acc;
  }, {});
};
const usePreviewPersistHook = ({
  quiz,
  responsePayload,
  storeHandle
}) => {
  const [quizState, setQuizState] = reactExports.useState(null);
  const [responsePayloadState, setResponsePayloadState] = reactExports.useState(null);
  const [persitanceReconciliationFinished, setPersitanceReconciliationFinished] = reactExports.useState(false);
  const quizFromDatabase = quiz;
  const responsePayloadFromDatabase = responsePayload;
  const persistedState = getQuizFromPersistedState(storeHandle);
  reactExports.useEffect(() => {
    if (responsePayloadFromDatabase) {
      setResponsePayloadState(responsePayloadFromDatabase);
    } else {
      if (!quizFromDatabase || persitanceReconciliationFinished) {
        return;
      }
      setPersitanceReconciliationFinished(true);
      const shouldRehydrate$1 = shouldRehydrate(quizFromDatabase, persistedState, storeHandle);
      if (shouldRehydrate$1) {
        setQuizState(persistedState);
      } else {
        const hydratedAlwaysProps = getHydratedAlwaysProps(quizFromDatabase, persistedState);
        setQuizState({
          ...quizFromDatabase,
          ...hydratedAlwaysProps
        });
      }
    }
  }, [quizFromDatabase, responsePayloadFromDatabase, storeHandle]);
  return { quizState, responsePayloadState, persitanceReconciliationFinished };
};
const Loader = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "loader-spinner" }) });
};
const QuizManager = ({
  initialQuiz,
  initialResponse,
  type,
  quizInlineHeightEnabled,
  quizHeight,
  quizHeightUnit,
  overPlanAt,
  handle
}) => {
  const { quizState, responsePayloadState } = usePreviewPersistHook({
    quiz: initialQuiz,
    responsePayload: initialResponse,
    storeHandle: handle
  });
  const {
    setQuiz,
    setResponsePayload,
    currentQuizPage,
    renderResult,
    initializeCurrentQuizPage,
    setIsModalLink,
    setIsInlineQuiz,
    setQuizInlineHeightEnabled,
    setQuizInlineHeight,
    setQuizInlineHeightUnit,
    setQuizModalHeight
  } = useQuizStore((state) => ({
    setQuiz: state.setQuiz,
    setResponsePayload: state.setResponsePayload,
    currentQuizPage: state.currentQuizPage,
    renderResult: state.renderResult,
    initializeCurrentQuizPage: state.initializeCurrentQuizPage,
    results: state.results,
    setIsModalLink: state.setIsModalLink,
    setIsInlineQuiz: state.setIsInlineQuiz,
    setQuizInlineHeightEnabled: state.setQuizInlineHeightEnabled,
    setQuizInlineHeight: state.setQuizInlineHeight,
    setQuizInlineHeightUnit: state.setQuizInlineHeightUnit,
    setQuizModalHeight: state.setQuizModalHeight
  }));
  reactExports.useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data === "isModalLink") {
        setIsModalLink(true);
      }
      if (event.data === "isInlineQuiz") {
        setIsInlineQuiz(true);
      }
    });
    const version = "1.0.23";
    localStorage.setItem("quiz-renderer-version", version);
    console.log("==== version", version);
  }, [setIsInlineQuiz, setIsModalLink]);
  reactExports.useEffect(() => {
    if (quizState) {
      const parsedPublicState = safeParse(statePublicSchema, quizState);
      if (parsedPublicState.success) {
        console.log("==== parsedPublicState success", parsedPublicState.output);
        setQuiz(parsedPublicState.output);
      } else {
        console.error("==== parsedPublicState", parsedPublicState);
        setQuiz(quizState);
      }
      initializeCurrentQuizPage();
    }
  }, [quizState == null ? void 0 : quizState.id]);
  reactExports.useEffect(() => {
    if (responsePayloadState) {
      setResponsePayload(responsePayloadState);
      renderResult(responsePayloadState.resultRef);
    }
  }, [responsePayloadState, setResponsePayload, renderResult]);
  reactExports.useEffect(() => {
    if (type === "inline") {
      setIsInlineQuiz(true);
      setQuizInlineHeight(quizHeight);
      setQuizInlineHeightUnit(quizHeightUnit);
      if (quizInlineHeightEnabled) {
        setQuizInlineHeightEnabled(true);
      }
    }
    if (type === "modal") {
      setQuizModalHeight(quizHeight);
    }
  }, []);
  useQuizTrackingEffects(currentQuizPage);
  if ((quizState == null ? void 0 : quizState.questions.length) === 0 && (quizState == null ? void 0 : quizState.results.length) === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Quiz, { type, overPlanAt });
};
const QuizStoreWrapper = ({
  initialQuiz,
  initialResponse,
  target,
  type,
  instanceId,
  quizInlineHeightEnabled,
  quizHeight,
  quizHeightUnit,
  overPlanAt,
  executeCustomFeatures,
  myshopifyDomain
}) => {
  const quizHandle = target;
  const initialState = {
    runsMerchantCode: true,
    isStoreRenderer: true,
    executeCustomFeatures: executeCustomFeatures ?? true,
    // Default to true (allow by default)
    rendererInstanceId: instanceId,
    rendererType: type,
    myshopifyDomain
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: quizHandle && /* @__PURE__ */ jsxRuntimeExports.jsx(RendererStoreProvider, { handle: quizHandle, initialState, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuizManager,
    {
      initialQuiz,
      initialResponse,
      type,
      quizInlineHeightEnabled,
      quizHeight,
      quizHeightUnit,
      overPlanAt,
      handle: quizHandle
    }
  ) }) });
};
function App({
  initialQuiz,
  initialResponse,
  target = "",
  type = "modal",
  instanceId,
  quizInlineHeightEnabled = false,
  quizHeight = 0,
  quizHeightUnit = "px",
  overPlanAt,
  executeCustomFeatures,
  myshopifyDomain
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuizStoreWrapper,
    {
      initialQuiz,
      initialResponse,
      target,
      type,
      instanceId,
      quizInlineHeightEnabled,
      quizHeight,
      quizHeightUnit,
      overPlanAt,
      executeCustomFeatures,
      myshopifyDomain
    }
  );
}
const MissingQuiz = () => {
  const missingContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  };
  const missingTextStyles = {
    fontSize: "1.5rem",
    fontWeight: "600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "missing-quiz__container", style: missingContainerStyles, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: missingTextStyles, children: "This quiz is not live yet" }) });
};
function parseJsonQuiz(value) {
  return parse$5(quizPublicSchema, value);
}
function mountJsonQuiz(host, context, { quiz, response }) {
  const root2 = createRoot(host);
  root2.render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, { ...context, initialQuiz: quiz, initialResponse: response }));
  return () => root2.unmount();
}
function mountMissingQuiz(host) {
  const root2 = createRoot(host);
  root2.render(/* @__PURE__ */ jsxRuntimeExports.jsx(MissingQuiz, {}));
  return () => root2.unmount();
}
const jsonRenderer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mountJsonQuiz,
  mountMissingQuiz,
  parseJsonQuiz
}, Symbol.toStringTag, { value: "Module" }));
export {
  Alignment,
  BarOrientation,
  ChartValueSource,
  CircleEmpty,
  CircleFilled,
  CircleHalf,
  DataPointType,
  FaMinus,
  FaPlus,
  FaUndo,
  HeadingSize,
  HeartEmpty,
  HeartFilled,
  HeartHalf,
  ImagePlaceholder,
  ImageSize,
  ImageSourceType,
  Loader,
  MEDIA_QUERY_TYPES,
  NeedleStyle,
  PhoneInput,
  RatingStyle,
  React$3 as React,
  RenderedContent,
  ResultBlockType,
  SlotBlockType,
  SlotType,
  SlotsLayout,
  StarEmpty,
  StarFilled,
  StarHalf,
  VideoPlaceholder,
  VideoPlayer,
  buildQuizContext,
  clsx,
  commonjsGlobal,
  createQuizDOMHelpers,
  createQuizResponse,
  dynamicContentPattern,
  escapeHtml,
  getAugmentedNamespace,
  getDataRefsFromDynamicContent,
  getDefaultExportFromCjs,
  getQuizResponse,
  getSubmissionAnswers,
  getVideoContainerClassName,
  hasDynamicContent,
  jsonRenderer,
  jsxRuntimeExports,
  reactDomExports,
  reactExports,
  removeHtmlTags,
  replaceHtmlTags,
  sanitizeCanvasHtml,
  transformMediaToContainerQueries,
  useArrowKeyFocusNavigation,
  useCustomHtmlScripts,
  useDraftProductPlaceholder,
  useInspectorWrapper,
  useLanguageDirection,
  useLiquidRenderer,
  useMediaQuery,
  usePlainTextContent,
  useQuestionHeadingId,
  useQuestionLabelledBy,
  useQuizLanguageTag,
  useQuizStore,
  useQuizStoreApi,
  useRenderedContent,
  wrapWithScope
};

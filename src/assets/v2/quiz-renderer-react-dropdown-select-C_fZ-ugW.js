import { React, reactExports, getAugmentedNamespace, commonjsGlobal, getDefaultExportFromCjs, reactDomExports, useInspectorWrapper, useQuizStore, useLanguageDirection, useQuizLanguageTag, useQuestionHeadingId, jsxRuntimeExports, usePlainTextContent, RenderedContent } from "./quiz-renderer-json-renderer-CJBOnGnk.js";
import { choiceSelectIndicator } from "./quiz-renderer-slot-result-block-helper-B64MgNga.js";
import "./quiz-renderer-index-BXMeXr7c.js";
import "./quiz-renderer-image-processing-B3Hir3-2.js";
import "./quiz-renderer-trackers-bundle-Do5Gpowk.js";
import "./quiz-renderer.js";
import "./quiz-renderer-shopifyCart-BtEmfGDv.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
import "./quiz-renderer-country-data-CuDUzlny.js";
import "./quiz-renderer-storeFrontClient-Dh-TPIVy.js";
var lib = {};
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var isDevelopment$1 = false;
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? !isDevelopment$1 : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      var _tag$parentNode;
      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent) return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        case 109:
          if (charat(value, length2 + 4) !== 45) break;
        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        case 115:
          return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115) break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"]) switch (element.type) {
      case DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(element, {
          value: replace(element.value, "@", "@" + WEBKIT)
        })], callback);
      case RULESET:
        if (element.length) return combine(element.props, function(value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            case ":read-only":
            case ":read-write":
              return serialize([copy(element, {
                props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
              })], callback);
            case "::placeholder":
              return serialize([copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
              })], callback);
          }
          return "";
        });
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser === false) && cache.registered[className] === void 0
  ) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var isDevelopment = false;
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  var componentSelector = interpolation;
  if (componentSelector.__emotion_styles !== void 0) {
    return componentSelector;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      var keyframes = interpolation;
      if (keyframes.anim === 1) {
        cursor = {
          name: keyframes.name,
          styles: keyframes.styles,
          next: cursor
        };
        return keyframes.name;
      }
      var serializedStyles = interpolation;
      if (serializedStyles.styles !== void 0) {
        var next2 = serializedStyles.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = serializedStyles.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  var asString = interpolation;
  if (registered == null) {
    return asString;
  }
  var cached = registered[asString];
  return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value !== "object") {
        var asString = value;
        if (registered != null && registered[asString] !== void 0) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === "NO_COMPONENT_SELECTOR" && isDevelopment) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (key) {
            case "animation":
            case "animationName": {
              string += processStyleName(key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;
    styles += asTemplateStringsArr[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      var templateStringsArr = strings;
      styles += templateStringsArr[i];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
}
var syncFallback = function syncFallback2(create) {
  return create();
};
var useInsertionEffect = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var EmotionCacheContext = /* @__PURE__ */ reactExports.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
    var cache = reactExports.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* @__PURE__ */ reactExports.createContext({});
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = reactExports.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as") continue;
        if (
          // $FlowFixMe
          finalShouldForwardProp(_key)
        ) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Insertion, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ reactExports.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
const emotionStyledBase_browser_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: createStyled
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(emotionStyledBase_browser_esm);
var ClickOutside = {};
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var propTypesExports = propTypes.exports;
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _react = _interopRequireDefault(reactExports);
  _interopRequireDefault(propTypesExports);
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function _inheritsLoose(a, b) {
    a.prototype = Object.create(b.prototype), a.prototype.constructor = a, _setPrototypeOf(a, b);
  }
  function _setPrototypeOf(a, b) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a2, b2) {
      return a2.__proto__ = b2, a2;
    }, _setPrototypeOf(a, b);
  }
  var ClickOutside2 = /* @__PURE__ */ function(a) {
    function b() {
      for (var b2, c2 = arguments.length, d = Array(c2), e = 0; e < c2; e++) d[e] = arguments[e];
      return b2 = a.call.apply(a, [this].concat(d)) || this, b2.container = /* @__PURE__ */ _react.default.createRef(), b2.handleClick = function(a2) {
        var c3 = b2.container.current, d2 = a2.target, e2 = b2.props.onClickOutside;
        (c3 && c3 === d2 || c3 && !c3.contains(d2)) && e2(a2);
      }, b2;
    }
    _inheritsLoose(b, a);
    var c = b.prototype;
    return c.componentDidMount = function componentDidMount() {
      document.addEventListener("click", this.handleClick, true);
    }, c.componentWillUnmount = function componentWillUnmount() {
      document.removeEventListener("click", this.handleClick, true);
    }, c.render = function render() {
      var a2 = this.props, b2 = a2.className, c2 = a2.children;
      return /* @__PURE__ */ _react.default.createElement("div", { className: b2, ref: this.container }, c2);
    }, b;
  }(_react.default.Component), _default = ClickOutside2;
  exports.default = _default;
})(ClickOutside);
var Content = {};
var Option = {};
var util = {};
(function(exports) {
  exports.__esModule = true, exports.valueExistInSelected = exports.isomorphicWindow = exports.isEqual = exports.hexToRGBA = exports.getProp = exports.getByPath = exports.debounce = void 0;
  var valueExistInSelected = function(a, b, c) {
    return !!b.find(function(b2) {
      return getByPath(b2, c.valueField) === a || getByPath(b2, c.labelField) === a;
    });
  };
  exports.valueExistInSelected = valueExistInSelected;
  var hexToRGBA = function(a, b) {
    4 === a.length && (a = "" + a[1] + a[1] + a[2] + a[2] + a[3] + a[3] + "}");
    var c = parseInt(a.slice(1, 3), 16), d = parseInt(a.slice(3, 5), 16), e = parseInt(a.slice(5, 7), 16);
    return "rgba(" + c + ", " + d + ", " + e + (b && ", " + b) + ")";
  };
  exports.hexToRGBA = hexToRGBA;
  var debounce = function(a, b) {
    void 0 === b && (b = 0);
    var c;
    return function() {
      for (var d = arguments.length, e = Array(d), f = 0; f < d; f++) e[f] = arguments[f];
      c && clearTimeout(c), c = setTimeout(function() {
        a.apply(void 0, e), c = null;
      }, b);
    };
  };
  exports.debounce = debounce;
  var isEqual = function(c, a) {
    return JSON.stringify(c) === JSON.stringify(a);
  };
  exports.isEqual = isEqual;
  var getByPath = function(a, b) {
    return b ? b.split(".").reduce(function(a2, b2) {
      return a2[b2];
    }, a) : void 0;
  };
  exports.getByPath = getByPath;
  var getProp = function(a, b, c) {
    if (!b) return a;
    var d = Array.isArray(b) ? b : b.split(".").filter(function(a2) {
      return a2.length;
    });
    return d.length ? getProp(a[d.shift()], d, c) : void 0 === a ? c : a;
  };
  exports.getProp = getProp;
  var isomorphicWindow = function() {
    return "undefined" == typeof window && (commonjsGlobal.window = {}), window;
  };
  exports.isomorphicWindow = isomorphicWindow;
})(util);
var constants = {};
(function(exports) {
  exports.__esModule = true, exports.LIB_NAME = void 0;
  exports.LIB_NAME = "react-dropdown-select";
})(constants);
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _util = util, _constants = constants;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var Option2 = function(a) {
    var b = a.item, c = a.props, d = a.state, e = a.methods;
    return b && c.optionRenderer ? c.optionRenderer({ item: b, props: c, state: d, methods: e }) : /* @__PURE__ */ _react.default.createElement(OptionComponent, { role: "listitem", disabled: c.disabled, direction: c.direction, className: _constants.LIB_NAME + "-option", color: c.color }, /* @__PURE__ */ _react.default.createElement("span", { className: _constants.LIB_NAME + "-option-label" }, (0, _util.getByPath)(b, c.labelField)), /* @__PURE__ */ _react.default.createElement("span", { className: _constants.LIB_NAME + "-option-remove", onClick: function onClick(a2) {
      return e.removeItem(a2, b, c.closeOnSelect);
    } }, "×"));
  }, OptionComponent = /* @__PURE__ */ (0, _base.default)("span", { target: "e1l4eby50" })("padding:0 5px;border-radius:2px;line-height:21px;margin:3px 0 3px 5px;background:", function(a) {
    var b = a.color;
    return b;
  }, ";color:#fff;display:flex;flex-direction:", function(a) {
    var b = a.direction;
    return "rtl" === b ? "row-reverse" : "row";
  }, ";.", _constants.LIB_NAME, "-option-remove{cursor:pointer;width:22px;height:22px;display:inline-block;text-align:center;margin:0 -5px 0 0px;border-radius:0 3px 3px 0;:hover{color:tomato;}}:hover,:hover>span{opacity:0.9;}"), _default = Option2;
  exports.default = _default;
})(Option);
var Input = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireWildcard(reactExports), _util = util;
  _interopRequireWildcard(propTypesExports);
  var _constants = constants;
  function _getRequireWildcardCache(a) {
    if ("function" != typeof WeakMap) return null;
    var b = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(a2) {
      return a2 ? c : b;
    })(a);
  }
  function _interopRequireWildcard(a, b) {
    if (a && a.__esModule) return a;
    if (null === a || "object" != typeof a && "function" != typeof a) return { default: a };
    var c = _getRequireWildcardCache(b);
    if (c && c.has(a)) return c.get(a);
    var d = {}, e = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a) if ("default" != f && Object.prototype.hasOwnProperty.call(a, f)) {
      var g = e ? Object.getOwnPropertyDescriptor(a, f) : null;
      g && (g.get || g.set) ? Object.defineProperty(d, f, g) : d[f] = a[f];
    }
    return d.default = a, c && c.set(a, d), d;
  }
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function _inheritsLoose(a, b) {
    a.prototype = Object.create(b.prototype), a.prototype.constructor = a, _setPrototypeOf(a, b);
  }
  function _setPrototypeOf(a, b) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a2, b2) {
      return a2.__proto__ = b2, a2;
    }, _setPrototypeOf(a, b);
  }
  var handlePlaceHolder = function(a, b) {
    var c = a.addPlaceholder, d = a.searchable, e = a.placeholder, f = b.values && 0 === b.values.length, g = b.values && 0 < b.values.length;
    return g && c && d ? c : f ? e : g && !d ? "" : "";
  }, Input2 = /* @__PURE__ */ function(a) {
    function b() {
      for (var b2, c2 = arguments.length, d = Array(c2), e = 0; e < c2; e++) d[e] = arguments[e];
      return b2 = a.call.apply(a, [this].concat(d)) || this, b2.input = /* @__PURE__ */ _react.default.createRef(), b2.onBlur = function(a2) {
        return a2.stopPropagation(), b2.props.state.dropdown ? b2.input.current.focus() : b2.input.current.blur();
      }, b2.handleKeyPress = function(a2) {
        var c3 = b2.props, d2 = c3.props, e2 = c3.state, f = c3.methods;
        return d2.create && "Enter" === a2.key && !(0, _util.valueExistInSelected)(e2.search, [].concat(e2.values, d2.options), b2.props) && e2.search && null === e2.cursor && f.createNew(e2.search);
      }, b2;
    }
    _inheritsLoose(b, a);
    var c = b.prototype;
    return c.componentDidUpdate = function componentDidUpdate(a2) {
      (this.props.state.dropdown || a2.state.dropdown !== this.props.state.dropdown && this.props.state.dropdown || this.props.props.autoFocus) && this.input.current.focus(), a2.state.dropdown === this.props.state.dropdown || this.props.state.dropdown || this.input.current.blur();
    }, c.render = function render() {
      var a2 = this.props, b2 = a2.props, c2 = a2.state, d = a2.methods;
      return b2.inputRenderer ? b2.inputRenderer({ props: b2, state: c2, methods: d, inputRef: this.input }) : /* @__PURE__ */ _react.default.createElement(InputComponent, { ref: this.input, tabIndex: "-1", onFocus: function onFocus(a3) {
        return a3.stopPropagation();
      }, className: _constants.LIB_NAME + "-input", size: d.getInputSize(), value: c2.search, readOnly: !b2.searchable, onClick: function onClick() {
        return d.dropDown("open");
      }, onKeyPress: this.handleKeyPress, onChange: d.setSearch, onBlur: this.onBlur, placeholder: handlePlaceHolder(b2, c2), disabled: b2.disabled });
    }, b;
  }(_react.Component), InputComponent = /* @__PURE__ */ (0, _base.default)("input", { target: "e11wid6y0" })("line-height:inherit;border:none;margin-left:5px;background:transparent;padding:0;width:calc(", function(a) {
    var b = a.size;
    return b + "ch";
  }, " + 5px);font-size:smaller;", function(a) {
    var b = a.readOnly;
    return b && "cursor: pointer;";
  }, " :focus{outline:none;}"), _default = Input2;
  exports.default = _default;
})(Input);
var SelectPropsModel = {};
(function(exports) {
  var _propTypes = _interopRequireDefault(propTypesExports);
  exports.__esModule = true, exports.default = void 0;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var SelectPropsModel2 = Object.freeze({
    /**
    * Secondary placeholder on search field if any value selected
    */
    addPlaceholder: _propTypes.default.string,
    /**
    * Additional props to pass to Select
    */
    additionalProps: _propTypes.default.object,
    /**
    * If true, and searchable, dropdown will autofocus
    */
    autoFocus: _propTypes.default.bool,
    /**
    * If true, backspace key will delete last value
    */
    backspaceDelete: _propTypes.default.bool,
    /**
    * CSS class attribute to pass to select
    */
    className: _propTypes.default.string,
    /**
    * Label for "Clear all"
    */
    clearAllLabel: _propTypes.default.string,
    /**
    * If true, and searchable, search value will be cleared on blur
    */
    clearOnBlur: _propTypes.default.bool,
    /**
    * If true, and searchable, search value will be cleared upon value select/de-select
    */
    clearOnSelect: _propTypes.default.bool,
    /**
    * Overrides internal clear button
    */
    clearRenderer: _propTypes.default.func,
    /**
    * Clear all indicator
    */
    clearable: _propTypes.default.bool,
    /**
    * If true, scrolling the page will close the dropdown
    */
    closeOnScroll: _propTypes.default.bool,
    /**
    * If true, selecting option will close the dropdown
    */
    closeOnSelect: _propTypes.default.bool,
    /**
    * If true, clicking input will close the dropdown if you are not searching.
    */
    closeOnClickInput: _propTypes.default.bool,
    /**
    * Base color (any CSS compatible) to use in component, also can be overwritten via CSS
    */
    color: _propTypes.default.string,
    /**
    * Compare values override function
    */
    compareValuesFunc: _propTypes.default.func,
    /**
    * Overrides internal content component (the contents of the select component)
    * | <a href="https://sanusart.github.io/react-dropdown-select/prop/content-renderer">example</a>
    */
    contentRenderer: _propTypes.default.func,
    /**
    * If true, select will create value from search string and fire onCreateNew callback prop
    */
    create: _propTypes.default.bool,
    /**
    * If create set to true, this will be the label of the "add new" component. {search} will be replaced by search value
    */
    createNewLabel: _propTypes.default.string,
    /**
    * Debounce Delay for updates upon component interactions
    */
    debounceDelay: _propTypes.default.number,
    /**
    * Direction of a dropdown "ltr", "rtl" or "auto"
    */
    direction: _propTypes.default.string,
    /**
    * Disable select and all interactions
    */
    disabled: _propTypes.default.bool,
    /**
    * Label shown on disabled field (after) the text
    */
    disabledLabel: _propTypes.default.string,
    /**
    * Gap between select element and dropdown
    */
    dropdownGap: _propTypes.default.number,
    /**
    * Show or hide dropdown handle to open/close dropdown
    */
    dropdownHandle: _propTypes.default.bool,
    /**
    * Overrides internal dropdown handle
    */
    dropdownHandleRenderer: _propTypes.default.func,
    /**
    * Minimum height of a dropdown
    */
    dropdownHeight: _propTypes.default.string,
    /**
    * Available options are "auto", "top" and "bottom" defaults to "bottom". Auto will adjust itself according Select's position on the page
    * | <a href="https://sanusart.github.io/react-dropdown-select/prop/dropdown-position">example</a>
    */
    dropdownPosition: _propTypes.default.oneOf(["top", "bottom", "auto"]),
    /**
    * Overrides internal dropdown handle
    */
    dropdownRenderer: _propTypes.default.func,
    /**
    * Overrides internal keyDown function
    */
    handleKeyDownFn: _propTypes.default.func,
    /**
    * Overrides internal input text
    */
    inputRenderer: _propTypes.default.func,
    /**
    * Overrides internal item in a dropdown
    */
    itemRenderer: _propTypes.default.func,
    /**
    * If true, dropdown will always stay open (good for debugging)
    */
    keepOpen: _propTypes.default.bool,
    /**
    * If false, selected item will not appear in a list
    */
    keepSelectedInList: _propTypes.default.bool,
    /**
    * Field in data to use for label
    */
    labelField: _propTypes.default.string,
    /**
    * Loading indicator
    */
    loading: _propTypes.default.bool,
    /**
    * Overrides internal loading
    */
    loadingRenderer: _propTypes.default.func,
    /**
    * If true - will act as multi-select, if false - only one option will be selected at the time
    */
    multi: _propTypes.default.bool,
    /**
    * If set, input type hidden would be added in the component with the value of the `name` prop as `name` and select's `values` as `value`
    * Useful for HTML forms
    */
    name: _propTypes.default.string,
    /**
    * Label for "No data"
    */
    noDataLabel: _propTypes.default.string,
    /**
    * Overrides internal "no data" (shown where search has no results)
    */
    noDataRenderer: _propTypes.default.func,
    /**
    * onChange callback handler
    */
    onChange: _propTypes.default.func.isRequired,
    /**
    * Fires upon clearing all values (via custom renderers)
    */
    onClearAll: _propTypes.default.func,
    /**
    * Fires upon creation of new item if create prop set to true
    */
    onCreateNew: _propTypes.default.func,
    /**
    * Fires upon dropdown close
    */
    onDropdownClose: _propTypes.default.func,
    /**
    * Fires upon dropdown closing state, stops the closing and provides own method close()
    * @return undefined
    */
    onDropdownCloseRequest: _propTypes.default.func,
    /**
    * Fires upon dropdown open
    */
    onDropdownOpen: _propTypes.default.func,
    /**
    * Fires upon selecting all values (via custom renderers)
    */
    onSelectAll: _propTypes.default.func,
    /**
    * Overrides internal option (the pillow with an "x") on the select content
    */
    optionRenderer: _propTypes.default.func,
    /**
    * Available options, (option with key disabled: true will be disabled)
    */
    options: _propTypes.default.array.isRequired,
    /**
    * If set, input type hidden would be added in the component with pattern prop as regex
    */
    pattern: _propTypes.default.string,
    /**
    * Placeholder shown where there are no selected values
    */
    placeholder: _propTypes.default.string,
    /**
    * If valid DOM element specified - dropdown will break out to render inside the specified element
    */
    portal: _propTypes.default.element,
    /**
    * If set, input type hidden would be added in the component with required prop as true/false
    */
    required: _propTypes.default.bool,
    /**
    * Search by object property in values
    */
    searchBy: _propTypes.default.string,
    /**
    * Overrides internal search function
    */
    searchFn: _propTypes.default.func,
    /**
    * If true, select will have search input text
    */
    searchable: _propTypes.default.bool,
    /**
    * Allow to select all (if select is multi-select)
    */
    selectAll: _propTypes.default.bool,
    /**
    * Label for "Select all"
    */
    selectAllLabel: _propTypes.default.string,
    /**
    * Separator line between close all and dropdown handle
    */
    separator: _propTypes.default.bool,
    /**
    * Overrides internal separator
    */
    separatorRenderer: _propTypes.default.func,
    /**
    * Sort by object property in values
    */
    sortBy: _propTypes.default.string,
    /**
    * Style object to pass to select
    */
    style: _propTypes.default.object,
    /**
    * Field in data to use for value
    */
    valueField: _propTypes.default.string,
    /**
    * Selected values
    */
    values: _propTypes.default.array,
    /**
    * If true, dropdown will be open by default
    */
    defaultMenuIsOpen: _propTypes.default.bool
  }), _default = SelectPropsModel2;
  exports.default = _default;
})(SelectPropsModel);
var SelectMethodsModel = {};
(function(exports) {
  var _propTypes = _interopRequireDefault(propTypesExports);
  exports.__esModule = true, exports.default = void 0;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var SelectMethodsModel2 = Object.freeze({
    activeCursorItem: _propTypes.default.func,
    /**
    * Add a new item
    */
    addItem: _propTypes.default.func.isRequired,
    /**
    * Check if all items are selected
    */
    areAllSelected: _propTypes.default.func.isRequired,
    /**
    * Clear all selected items
    */
    clearAll: _propTypes.default.func.isRequired,
    /**
    * Create a new item
    */
    createNew: _propTypes.default.func.isRequired,
    /**
    * Close/Toggle/Open
    */
    dropDown: _propTypes.default.func.isRequired,
    /**
    * Get the input size
    */
    getInputSize: _propTypes.default.func.isRequired,
    /**
    * Get the bounds of the select component
    */
    getSelectBounds: _propTypes.default.func.isRequired,
    /**
    * Get the reference to the select component
    */
    getSelectRef: _propTypes.default.func.isRequired,
    /**
    * Handle key down event
    */
    handleKeyDown: _propTypes.default.func.isRequired,
    /**
    * Check if an item is selected
    */
    isSelected: _propTypes.default.func.isRequired,
    /**
    * Remove an item
    */
    removeItem: _propTypes.default.func.isRequired,
    /**
    * Make a string safe
    */
    safeString: _propTypes.default.func.isRequired,
    /**
    * Get search results
    */
    searchResults: _propTypes.default.func.isRequired,
    /**
    * Select all items
    */
    selectAll: _propTypes.default.func.isRequired,
    /**
    * Set the search string
    */
    setSearch: _propTypes.default.func.isRequired,
    /**
    * Sort items
    */
    sortBy: _propTypes.default.func.isRequired,
    /**
    * Toggle select all
    */
    toggleSelectAll: _propTypes.default.func.isRequired
  }), _default = SelectMethodsModel2;
  exports.default = _default;
})(SelectMethodsModel);
var SelectStateModel = {};
(function(exports) {
  var _propTypes = _interopRequireDefault(propTypesExports);
  exports.__esModule = true, exports.default = void 0;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var SelectStateModel2 = Object.freeze({
    /**
    * Flag indicating whether the dropdown is open or closed
    */
    dropdown: _propTypes.default.bool.isRequired,
    /**
    * Array of selected values
    */
    values: _propTypes.default.arrayOf(_propTypes.default.shape({})),
    /**
    * Search string
    */
    search: _propTypes.default.string.isRequired,
    /**
    * Array of bounds for the select component
    */
    selectBounds: _propTypes.default.shape({}),
    /**
    * Cursor position
    */
    cursor: _propTypes.default.number,
    /**
    * Array of search results
    */
    searchResults: _propTypes.default.arrayOf(_propTypes.default.shape({}))
  }), _default = SelectStateModel2;
  exports.default = _default;
})(SelectStateModel);
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports);
  _interopRequireDefault(propTypesExports);
  var _Option = _interopRequireDefault(Option), _Input = _interopRequireDefault(Input), _constants = constants, _util = util;
  _interopRequireDefault(SelectPropsModel);
  _interopRequireDefault(SelectMethodsModel);
  _interopRequireDefault(SelectStateModel);
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var Content2 = function(a) {
    var b = a.props, c = a.state, d = a.methods;
    return /* @__PURE__ */ _react.default.createElement(ContentComponent, { className: _constants.LIB_NAME + "-content " + (b.multi ? _constants.LIB_NAME + "-type-multi" : _constants.LIB_NAME + "-type-single"), onClick: function onClick(a2) {
      return a2.stopPropagation(), true === c.dropdown && b.closeOnClickInput && !c.search ? d.dropDown("close") : d.dropDown("open");
    } }, b.contentRenderer ? b.contentRenderer({ props: b, state: c, methods: d }) : /* @__PURE__ */ _react.default.createElement(_react.default.Fragment, null, b.multi ? c.values && c.values.map(function(a2) {
      return /* @__PURE__ */ _react.default.createElement(_Option.default, { key: "" + (0, _util.getByPath)(a2, b.valueField) + (0, _util.getByPath)(a2, b.labelField), item: a2, state: c, props: b, methods: d });
    }) : c.values && 0 < c.values.length && /* @__PURE__ */ _react.default.createElement("span", null, (0, _util.getByPath)(c.values[0], b.labelField)), /* @__PURE__ */ _react.default.createElement(_Input.default, { props: b, methods: d, state: c })));
  }, ContentComponent = /* @__PURE__ */ (0, _base.default)("div", { target: "e1gn6jc30" })({ name: "1m5113o", styles: "display:flex;flex:1;flex-wrap:wrap" }), _default = Content2;
  exports.default = _default;
})(Content);
var Dropdown = {};
var NoData = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _constants = constants;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var NoData2 = function(a) {
    var b = a.props, c = a.state, d = a.methods;
    return b.noDataRenderer ? b.noDataRenderer({ props: b, state: c, methods: d }) : /* @__PURE__ */ _react.default.createElement(NoDataComponent, { className: _constants.LIB_NAME + "-no-data", color: b.color }, b.noDataLabel);
  }, NoDataComponent = /* @__PURE__ */ (0, _base.default)("div", { target: "e1l5ho1t0" })("padding:10px;text-align:center;color:", function(a) {
    var b = a.color;
    return b;
  }, ";"), _default = NoData2;
  exports.default = _default;
})(NoData);
var Item = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireWildcard(reactExports), _util = util;
  _interopRequireWildcard(propTypesExports);
  var _constants = constants;
  function _getRequireWildcardCache(a) {
    if ("function" != typeof WeakMap) return null;
    var b = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(a2) {
      return a2 ? c : b;
    })(a);
  }
  function _interopRequireWildcard(a, b) {
    if (a && a.__esModule) return a;
    if (null === a || "object" != typeof a && "function" != typeof a) return { default: a };
    var c = _getRequireWildcardCache(b);
    if (c && c.has(a)) return c.get(a);
    var d = {}, e = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a) if ("default" != f && Object.prototype.hasOwnProperty.call(a, f)) {
      var g = e ? Object.getOwnPropertyDescriptor(a, f) : null;
      g && (g.get || g.set) ? Object.defineProperty(d, f, g) : d[f] = a[f];
    }
    return d.default = a, c && c.set(a, d), d;
  }
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function _inheritsLoose(a, b) {
    a.prototype = Object.create(b.prototype), a.prototype.constructor = a, _setPrototypeOf(a, b);
  }
  function _setPrototypeOf(a, b) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a2, b2) {
      return a2.__proto__ = b2, a2;
    }, _setPrototypeOf(a, b);
  }
  var Item2 = /* @__PURE__ */ function(a) {
    function b() {
      for (var b2, c2 = arguments.length, d = Array(c2), e = 0; e < c2; e++) d[e] = arguments[e];
      return b2 = a.call.apply(a, [this].concat(d)) || this, b2.item = /* @__PURE__ */ _react.default.createRef(), b2;
    }
    _inheritsLoose(b, a);
    var c = b.prototype;
    return c.componentDidMount = function componentDidMount() {
      var a2 = this.props, b2 = a2.props, c2 = a2.methods;
      this.item.current && !b2.multi && b2.keepSelectedInList && c2.isSelected(this.props.item) && this.item.current.scrollIntoView({ block: "nearest", inline: "start" });
    }, c.componentDidUpdate = function componentDidUpdate() {
      this.props.state.cursor === this.props.itemIndex && this.item.current && this.item.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }, c.render = function render() {
      var a2 = this.props, b2 = a2.props, c2 = a2.state, d = a2.methods, e = a2.item, f = a2.itemIndex;
      return b2.itemRenderer ? b2.itemRenderer({ item: e, itemIndex: f, props: b2, state: c2, methods: d }) : !b2.keepSelectedInList && d.isSelected(e) ? null : /* @__PURE__ */ _react.default.createElement(ItemComponent, { role: "option", ref: this.item, "aria-selected": d.isSelected(e), "aria-disabled": e.disabled, "aria-label": (0, _util.getByPath)(e, b2.labelField), disabled: e.disabled, key: "" + (0, _util.getByPath)(e, b2.valueField) + (0, _util.getByPath)(e, b2.labelField), tabIndex: "-1", className: _constants.LIB_NAME + "-item " + (d.isSelected(e) ? _constants.LIB_NAME + "-item-selected" : "") + " " + (c2.cursor === f ? _constants.LIB_NAME + "-item-active" : "") + " " + (e.disabled ? _constants.LIB_NAME + "-item-disabled" : ""), onClick: e.disabled ? void 0 : function() {
        return d.addItem(e);
      }, onKeyPress: e.disabled ? void 0 : function() {
        return d.addItem(e);
      }, color: b2.color }, (0, _util.getByPath)(e, b2.labelField), " ", e.disabled && /* @__PURE__ */ _react.default.createElement("ins", null, b2.disabledLabel));
    }, b;
  }(_react.Component), ItemComponent = /* @__PURE__ */ (0, _base.default)("span", { target: "evc32pp0" })("padding:5px 10px;cursor:pointer;border-bottom:1px solid #fff;&.", _constants.LIB_NAME, "-item-active{border-bottom:1px solid #fff;", function(a) {
    var b = a.disabled, c = a.color;
    return !b && c && "background: " + (0, _util.hexToRGBA)(c, 0.1) + ";";
  }, ";}:hover,:focus{background:", function(a) {
    var b = a.color;
    return b && (0, _util.hexToRGBA)(b, 0.1);
  }, ";outline:none;}&.", _constants.LIB_NAME, "-item-selected{", function(a) {
    var b = a.disabled, c = a.color;
    return b ? "\n    background: #f2f2f2;\n    color: #ccc;\n    " : "\n    background: " + c + ";\n    color: #fff;\n    border-bottom: 1px solid #fff;\n    ";
  }, ";}", function(a) {
    var b = a.disabled;
    return b ? "\n    background: #f2f2f2;\n    color: #ccc;\n\n    ins {\n      text-decoration: none;\n      border:1px solid #ccc;\n      border-radius: 2px;\n      padding: 0px 3px;\n      font-size: x-small;\n      text-transform: uppercase;\n    }\n    " : "";
  }, ";"), _default = Item2;
  exports.default = _default;
})(Item);
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _constants = constants, _NoData = _interopRequireDefault(NoData), _Item = _interopRequireDefault(Item), _util = util;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var dropdownPosition = function(a, b) {
    var c = b.getSelectRef().getBoundingClientRect(), d = c.bottom + parseInt(a.dropdownHeight, 10) + parseInt(a.dropdownGap, 10);
    return "auto" === a.dropdownPosition ? d > (0, _util.isomorphicWindow)().innerHeight && d > c.top ? "top" : "bottom" : a.dropdownPosition;
  }, Dropdown2 = function(a) {
    var b = a.props, c = a.state, d = a.methods;
    return /* @__PURE__ */ _react.default.createElement(DropDown, { tabIndex: "-1", "aria-expanded": "true", role: "list", dropdownPosition: dropdownPosition(b, d), selectBounds: c.selectBounds, portal: b.portal, dropdownGap: b.dropdownGap, dropdownHeight: b.dropdownHeight, className: _constants.LIB_NAME + "-dropdown " + _constants.LIB_NAME + "-dropdown-position-" + dropdownPosition(b, d) }, b.dropdownRenderer ? b.dropdownRenderer({ props: b, state: c, methods: d }) : /* @__PURE__ */ _react.default.createElement(_react.default.Fragment, null, b.create && c.search && !(0, _util.valueExistInSelected)(c.search, [].concat(c.values, b.options), b) && /* @__PURE__ */ _react.default.createElement(AddNew, { role: "button", className: _constants.LIB_NAME + "-dropdown-add-new", color: b.color, onClick: function onClick() {
      return d.createNew(c.search);
    } }, b.createNewLabel.replace("{search}", '"' + c.search + '"')), 0 === c.searchResults.length ? /* @__PURE__ */ _react.default.createElement(_NoData.default, { className: _constants.LIB_NAME + "-no-data", state: c, props: b, methods: d }) : c.searchResults.map(function(a2, e) {
      return /* @__PURE__ */ _react.default.createElement(_Item.default, { key: a2[b.valueField].toString(), item: a2, itemIndex: e, state: c, props: b, methods: d });
    }), b.selectAll && b.options && b.multi && /* @__PURE__ */ _react.default.createElement(SelectAll, { role: "button", className: _constants.LIB_NAME + "-dropdown-select-all", color: b.color, onClick: function onClick() {
      return d.areAllSelected() ? d.clearAll() : d.selectAll();
    } }, d.areAllSelected() ? b.clearAllLabel : b.selectAllLabel)));
  }, DropDown = /* @__PURE__ */ (0, _base.default)("div", { target: "e1qjn9k92" })("position:absolute;", function(a) {
    var b = a.selectBounds, c = a.dropdownGap, d = a.dropdownPosition;
    return "top" === d ? "bottom: " + (b.height + 2 + c) + "px" : "top: " + (b.height + 2 + c) + "px";
  }, ";", function(a) {
    var b = a.selectBounds, c = a.dropdownGap, d = a.dropdownPosition, e = a.portal;
    return e ? "\n      position: fixed;\n      " + ("bottom" === d ? "top: " + (b.bottom + c) + "px;" : "bottom: " + ((0, _util.isomorphicWindow)().innerHeight - b.top + c) + "px;") + "\n      left: " + (b.left - 1) + "px;" : "left: -1px;";
  }, ";border:1px solid #ccc;width:", function(a) {
    var b = a.selectBounds;
    return b.width;
  }, "px;padding:0;display:flex;flex-direction:column;background:#fff;border-radius:2px;box-shadow:0 0 10px 0 ", function() {
    return (0, _util.hexToRGBA)("#000000", 0.2);
  }, ";max-height:", function(a) {
    var b = a.dropdownHeight;
    return b;
  }, ";overflow:auto;z-index:9;:focus{outline:none;}"), AddNew = /* @__PURE__ */ (0, _base.default)("div", { target: "e1qjn9k91" })("color:", function(a) {
    var b = a.color;
    return b;
  }, ";padding:5px 10px;:hover{background:", function(a) {
    var b = a.color;
    return b && (0, _util.hexToRGBA)(b, 0.1);
  }, ";outline:none;cursor:pointer;}"), SelectAll = /* @__PURE__ */ (0, _base.default)("div", { target: "e1qjn9k90" })("color:", function(a) {
    var b = a.color;
    return b;
  }, ";padding:5px 10px;position:sticky;bottom:0;margin:0;opacity:1;background:#fff;box-shadow:0 0 10px 0 ", function() {
    return (0, _util.hexToRGBA)("#000000", 0.2);
  }, ";:hover{outline:none;cursor:pointer;}"), _default = Dropdown2;
  exports.default = _default;
})(Dropdown);
var Loading = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _constants = constants;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var Loading2 = function(a) {
    var b = a.props;
    return b.loadingRenderer ? b.loadingRenderer({ props: b }) : /* @__PURE__ */ _react.default.createElement(LoadingComponent, { className: _constants.LIB_NAME + "-loading", color: b.color });
  }, LoadingComponent = /* @__PURE__ */ (0, _base.default)("div", { target: "e1l5cpc30" })("@keyframes dual-ring-spin{0%{transform:rotate(0deg);}100%{transform:rotate(180deg);}}padding:0 5px;display:block;width:auto;height:auto;:after{content:' ';display:block;width:16px;height:16px;border-radius:50%;border-width:1px;border-style:solid;border-color:", function(a) {
    var b = a.color;
    return b;
  }, " transparent;animation:dual-ring-spin 0.7s ease-in-out infinite;margin:0 0 0 -10px;}"), _default = Loading2;
  exports.default = _default;
})(Loading);
var Clear = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _constants = constants;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var Clear2 = function(a) {
    var b = a.props, c = a.state, d = a.methods;
    return b.clearRenderer ? b.clearRenderer({ props: b, state: c, methods: d }) : /* @__PURE__ */ _react.default.createElement(ClearComponent, { className: _constants.LIB_NAME + "-clear", tabIndex: "-1", onClick: function onClick() {
      return d.clearAll();
    }, onKeyPress: function onKeyPress() {
      return d.clearAll();
    } }, "×");
  }, ClearComponent = /* @__PURE__ */ (0, _base.default)("div", { target: "e11qlq5e0" })({ name: "992gsg", styles: "line-height:25px;margin:0 10px;cursor:pointer;:focus{outline:none;}:hover{color:tomato;}" }), _default = Clear2;
  exports.default = _default;
})(Clear);
var Separator = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _constants = constants;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var Separator2 = function(a) {
    var b = a.props, c = a.state, d = a.methods;
    return b.separatorRenderer ? b.separatorRenderer({ props: b, state: c, methods: d }) : /* @__PURE__ */ _react.default.createElement(SeparatorComponent, { className: _constants.LIB_NAME + "-separator" });
  }, SeparatorComponent = /* @__PURE__ */ (0, _base.default)("div", { target: "e19h5j1v0" })({ name: "cmi1n0", styles: "border-left:1px solid #ccc;width:1px;height:25px;display:block" }), _default = Separator2;
  exports.default = _default;
})(Separator);
var DropdownHandle = {};
(function(exports) {
  exports.__esModule = true, exports.default = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireDefault(reactExports), _constants = constants;
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var DropdownHandle2 = function(a) {
    var b = a.props, c = a.state, d = a.methods;
    return /* @__PURE__ */ _react.default.createElement(DropdownHandleComponent, { tabIndex: "-1", onClick: function onClick(a2) {
      return d.dropDown(c.dropdown ? "close" : "open", a2);
    }, dropdownOpen: c.dropdown, onKeyPress: function onKeyPress(a2) {
      return d.dropDown("toggle", a2);
    }, onKeyDown: function onKeyDown(a2) {
      return d.dropDown("toggle", a2);
    }, className: _constants.LIB_NAME + "-dropdown-handle", rotate: b.dropdownHandleRenderer ? 0 : 1, color: b.color }, b.dropdownHandleRenderer ? b.dropdownHandleRenderer({ props: b, state: c, methods: d }) : /* @__PURE__ */ _react.default.createElement("svg", { fill: "currentColor", viewBox: "0 0 40 40" }, /* @__PURE__ */ _react.default.createElement("path", { d: "M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z" })));
  }, DropdownHandleComponent = /* @__PURE__ */ (0, _base.default)("div", { target: "e1vudypg0" })("text-align:center;", function(a) {
    var b = a.dropdownOpen, c = a.rotate;
    return b ? "\n      pointer-events: all;\n      " + (c ? "transform: rotate(0deg);margin: 0px 0 -3px 5px;" : "") + "\n      " : "\n      pointer-events: none;\n      " + (c ? "margin: 0 0 0 5px;transform: rotate(180deg);" : "") + "\n      ";
  }, ";cursor:pointer;svg{width:16px;height:16px;}:hover{path{stroke:", function(a) {
    var b = a.color;
    return b;
  }, ";}}:focus{outline:none;path{stroke:", function(a) {
    var b = a.color;
    return b;
  }, ";}}"), _default = DropdownHandle2;
  exports.default = _default;
})(DropdownHandle);
(function(exports) {
  exports.__esModule = true, exports.default = exports.Select = void 0;
  var _base = _interopRequireDefault(require$$0), _react = _interopRequireWildcard(reactExports), _reactDom = _interopRequireDefault(reactDomExports), _ClickOutside = _interopRequireDefault(ClickOutside), _Content = _interopRequireDefault(Content), _Dropdown = _interopRequireDefault(Dropdown), _Loading = _interopRequireDefault(Loading), _Clear = _interopRequireDefault(Clear), _Separator = _interopRequireDefault(Separator), _DropdownHandle = _interopRequireDefault(DropdownHandle), _util = util, _constants = constants;
  _interopRequireDefault(SelectPropsModel);
  function _getRequireWildcardCache(a) {
    if ("function" != typeof WeakMap) return null;
    var b = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(a2) {
      return a2 ? c : b;
    })(a);
  }
  function _interopRequireWildcard(a, b) {
    if (a && a.__esModule) return a;
    if (null === a || "object" != typeof a && "function" != typeof a) return { default: a };
    var c = _getRequireWildcardCache(b);
    if (c && c.has(a)) return c.get(a);
    var d = {}, e = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var f in a) if ("default" != f && Object.prototype.hasOwnProperty.call(a, f)) {
      var g = e ? Object.getOwnPropertyDescriptor(a, f) : null;
      g && (g.get || g.set) ? Object.defineProperty(d, f, g) : d[f] = a[f];
    }
    return d.default = a, c && c.set(a, d), d;
  }
  function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function _extends2() {
    return _extends2 = Object.assign ? Object.assign.bind() : function(a) {
      for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
      return a;
    }, _extends2.apply(this, arguments);
  }
  function _assertThisInitialized(a) {
    if (void 0 === a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return a;
  }
  function _inheritsLoose(a, b) {
    a.prototype = Object.create(b.prototype), a.prototype.constructor = a, _setPrototypeOf(a, b);
  }
  function _setPrototypeOf(a, b) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a2, b2) {
      return a2.__proto__ = b2, a2;
    }, _setPrototypeOf(a, b);
  }
  var Select2 = /* @__PURE__ */ function(a) {
    function b(b2) {
      var c2;
      return c2 = a.call(this, b2) || this, c2.onDropdownClose = function() {
        c2.setState({ cursor: null }), c2.props.onDropdownClose();
      }, c2.onScroll = function() {
        c2.props.closeOnScroll && c2.dropDown("close"), c2.updateSelectBounds();
      }, c2.updateSelectBounds = function() {
        return c2.select.current && c2.setState({ selectBounds: c2.select.current.getBoundingClientRect() });
      }, c2.getSelectBounds = function() {
        return c2.state.selectBounds;
      }, c2.dropDown = function(a2, b3, d) {
        void 0 === a2 && (a2 = "toggle"), void 0 === d && (d = false);
        var e = b3 && b3.target || b3 && b3.srcElement;
        return void 0 !== c2.props.onDropdownCloseRequest && c2.state.dropdown && false === d && "close" === a2 ? c2.props.onDropdownCloseRequest({ props: c2.props, methods: c2.methods, state: c2.state, close: function close() {
          return c2.dropDown("close", null, true);
        } }) : c2.props.portal && !c2.props.closeOnScroll && !c2.props.closeOnSelect && b3 && e && e.offsetParent && e.offsetParent.classList.contains("react-dropdown-select-dropdown") ? void 0 : c2.props.keepOpen ? c2.setState({ dropdown: true }) : "close" === a2 && c2.state.dropdown ? (c2.select.current.blur(), c2.setState({ dropdown: false, search: c2.props.clearOnBlur ? "" : c2.state.search, searchResults: c2.props.options })) : "open" !== a2 || c2.state.dropdown ? "toggle" === a2 && (c2.select.current.focus(), c2.setState({ dropdown: !c2.state.dropdown })) : c2.setState({ dropdown: true });
      }, c2.getSelectRef = function() {
        return c2.select.current;
      }, c2.addItem = function(a2) {
        if (c2.props.multi) {
          if ((0, _util.valueExistInSelected)((0, _util.getByPath)(a2, c2.props.valueField), c2.state.values, c2.props)) return c2.removeItem(null, a2, false);
          c2.setState({ values: [].concat(c2.state.values, [a2]) }), c2.props.onSelect([].concat(c2.state.values, [a2]));
        } else c2.setState({ values: [a2], dropdown: false }), c2.props.onSelect([a2]);
        return c2.props.clearOnSelect && c2.setState({ search: "" }, function() {
          c2.setState({ searchResults: c2.searchResults() });
        }), true;
      }, c2.removeItem = function(a2, b3, d) {
        void 0 === d && (d = false), a2 && d && (a2.preventDefault(), a2.stopPropagation(), c2.dropDown("close"));
        var e = c2.state.values.filter(function(a3) {
          return (0, _util.getByPath)(a3, c2.props.valueField) !== (0, _util.getByPath)(b3, c2.props.valueField);
        });
        c2.setState({ values: e }), c2.props.onDeselect(e);
      }, c2.setSearch = function(a2) {
        c2.setState({ cursor: null }), c2.setState({ search: a2.target.value }, function() {
          c2.setState({ searchResults: c2.searchResults() });
        });
      }, c2.getInputSize = function() {
        return c2.state.search ? c2.state.search.length : 0 < c2.state.values.length ? c2.props.addPlaceholder.length : c2.props.placeholder.length;
      }, c2.toggleSelectAll = function() {
        return c2.setState({ values: 0 === c2.state.values.length ? c2.selectAll() : c2.clearAll() });
      }, c2.clearAll = function() {
        c2.props.onClearAll(), c2.setState({ values: [] });
      }, c2.selectAll = function(a2) {
        void 0 === a2 && (a2 = []), c2.props.onSelectAll();
        var b3 = 0 < a2.length ? a2 : c2.props.options.filter(function(a3) {
          return !a3.disabled;
        });
        c2.setState({ values: b3 });
      }, c2.isSelected = function(a2) {
        return !!c2.state.values.find(function(b3) {
          return (0, _util.getByPath)(b3, c2.props.valueField) === (0, _util.getByPath)(a2, c2.props.valueField);
        });
      }, c2.areAllSelected = function() {
        return c2.state.values.length === c2.props.options.filter(function(a2) {
          return !a2.disabled;
        }).length;
      }, c2.safeString = function(a2) {
        return a2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }, c2.sortBy = function() {
        var a2 = c2.props, d = a2.sortBy, e = a2.options;
        return d ? (e.sort(function(c3, a3) {
          return (0, _util.getProp)(c3, d) < (0, _util.getProp)(a3, d) ? -1 : (0, _util.getProp)(c3, d) > (0, _util.getProp)(a3, d) ? 1 : 0;
        }), e) : e;
      }, c2.searchFn = function(a2) {
        var b3 = a2.state, d = a2.methods, e = new RegExp(d.safeString(b3.search), "i");
        return d.sortBy().filter(function(a3) {
          return e.test((0, _util.getByPath)(a3, c2.props.searchBy) || (0, _util.getByPath)(a3, c2.props.valueField));
        });
      }, c2.searchResults = function() {
        var a2 = { state: c2.state, props: c2.props, methods: c2.methods };
        return c2.props.searchFn(a2) || c2.searchFn(a2);
      }, c2.activeCursorItem = function(a2) {
        return c2.setState({ activeCursorItem: a2 });
      }, c2.handleKeyDown = function(a2) {
        var b3 = { event: a2, state: c2.state, props: c2.props, methods: c2.methods, setState: c2.setState.bind(_assertThisInitialized(c2)) };
        return c2.props.handleKeyDownFn(b3) || c2.handleKeyDownFn(b3);
      }, c2.handleKeyDownFn = function(a2) {
        var b3 = a2.event, d = a2.state, e = a2.props, f = a2.methods, g = a2.setState, h = d.cursor, i = d.searchResults, j = "Escape" === b3.key, k = "Enter" === b3.key, l = "ArrowUp" === b3.key, m = "ArrowDown" === b3.key, n = "Backspace" === b3.key, o = "Tab" === b3.key && !b3.shiftKey, p = b3.shiftKey && "Tab" === b3.key;
        if (m && !d.dropdown) return b3.preventDefault(), c2.dropDown("open"), g({ cursor: 0 });
        if ((m || o && d.dropdown) && null === h) return g({ cursor: 0 });
        if ((l || m || p && d.dropdown || o && d.dropdown) && b3.preventDefault(), j && c2.dropDown("close"), k) {
          var q = i[h];
          if (q && !q.disabled) {
            if (e.create && (0, _util.valueExistInSelected)(d.search, d.values, e)) return null;
            f.addItem(q);
          }
        }
        return (m || o && d.dropdown) && i.length === h ? g({ cursor: 0 }) : void ((m || o && d.dropdown) && g(function(a3) {
          return { cursor: a3.cursor + 1 };
        }), (l || p && d.dropdown) && 0 < h && g(function(a3) {
          return { cursor: a3.cursor - 1 };
        }), (l || p && d.dropdown) && 0 === h && g({ cursor: i.length }), n && e.backspaceDelete && 0 === c2.getInputSize() && c2.setState({ values: c2.state.values.slice(0, -1) }));
      }, c2.renderDropdown = function() {
        return c2.props.portal ? /* @__PURE__ */ _reactDom.default.createPortal(/* @__PURE__ */ _react.default.createElement(_Dropdown.default, { props: c2.props, state: c2.state, methods: c2.methods }), c2.dropdownRoot) : /* @__PURE__ */ _react.default.createElement(_Dropdown.default, { props: c2.props, state: c2.state, methods: c2.methods });
      }, c2.createNew = function(a2) {
        var b3, d = (b3 = {}, b3[c2.props.labelField] = a2, b3[c2.props.valueField] = a2, b3);
        c2.addItem(d), c2.props.onCreateNew(d), c2.setState({ search: "" });
      }, c2.state = { dropdown: false, values: b2.values, search: "", selectBounds: {}, cursor: null, searchResults: b2.options }, c2.methods = { activeCursorItem: c2.activeCursorItem, addItem: c2.addItem, areAllSelected: c2.areAllSelected, clearAll: c2.clearAll, createNew: c2.createNew, dropDown: c2.dropDown, getInputSize: c2.getInputSize, getSelectBounds: c2.getSelectBounds, getSelectRef: c2.getSelectRef, handleKeyDown: c2.handleKeyDown, isSelected: c2.isSelected, removeItem: c2.removeItem, safeString: c2.safeString, searchResults: c2.searchResults, selectAll: c2.selectAll, setSearch: c2.setSearch, sortBy: c2.sortBy, toggleSelectAll: c2.toggleSelectAll }, c2.select = /* @__PURE__ */ _react.default.createRef(), c2.dropdownRoot = "undefined" != typeof document && document.createElement("div"), c2;
    }
    _inheritsLoose(b, a);
    var c = b.prototype;
    return c.componentDidMount = function componentDidMount() {
      this.props.portal && this.props.portal.appendChild(this.dropdownRoot), (0, _util.isomorphicWindow)().addEventListener("resize", (0, _util.debounce)(this.updateSelectBounds)), (0, _util.isomorphicWindow)().addEventListener("scroll", (0, _util.debounce)(this.onScroll)), this.dropDown("close"), this.select && this.updateSelectBounds(), this.props.defaultMenuIsOpen && this.dropDown("open");
    }, c.componentDidUpdate = function componentDidUpdate(a2, b2) {
      var c2 = this;
      !this.props.compareValuesFunc(a2.values, this.props.values) && this.props.compareValuesFunc(a2.values, b2.values) && (this.setState({ values: this.props.values }, function() {
        c2.props.onChange(c2.state.values);
      }), this.updateSelectBounds()), a2.options !== this.props.options && this.setState({ searchResults: this.searchResults() }), b2.values !== this.state.values && (this.props.onChange(this.state.values), this.updateSelectBounds()), b2.search !== this.state.search && this.updateSelectBounds(), b2.values !== this.state.values && this.props.closeOnSelect && this.dropDown("close"), a2.multi !== this.props.multi && this.updateSelectBounds(), b2.dropdown && b2.dropdown !== this.state.dropdown && this.onDropdownClose(), b2.dropdown || b2.dropdown === this.state.dropdown || this.props.onDropdownOpen();
    }, c.componentWillUnmount = function componentWillUnmount() {
      this.props.portal && this.props.portal.removeChild(this.dropdownRoot), (0, _util.isomorphicWindow)().removeEventListener("resize", (0, _util.debounce)(this.updateSelectBounds, this.props.debounceDelay)), (0, _util.isomorphicWindow)().removeEventListener("scroll", (0, _util.debounce)(this.onScroll, this.props.debounceDelay));
    }, c.render = function render() {
      var a2 = this;
      return /* @__PURE__ */ _react.default.createElement(_ClickOutside.default, { onClickOutside: function onClickOutside(b2) {
        return a2.dropDown("close", b2);
      } }, /* @__PURE__ */ _react.default.createElement(ReactDropdownSelect2, _extends2({ onKeyDown: this.handleKeyDown, "aria-label": "Dropdown select", "aria-expanded": this.state.dropdown, onClick: function onClick(b2) {
        return a2.dropDown("open", b2);
      }, tabIndex: this.props.disabled ? "-1" : "0", direction: this.props.direction, style: this.props.style, ref: this.select, disabled: this.props.disabled, className: _constants.LIB_NAME + " " + this.props.className, color: this.props.color }, this.props.additionalProps), /* @__PURE__ */ _react.default.createElement(_Content.default, { props: this.props, state: this.state, methods: this.methods }), (this.props.name || this.props.required) && /* @__PURE__ */ _react.default.createElement("input", { tabIndex: -1, style: { opacity: 0, width: 0, position: "absolute" }, name: this.props.name, required: this.props.required, pattern: this.props.pattern, defaultValue: this.state.values.map(function(b2) {
        return b2[a2.props.labelField];
      }).toString() || [], disabled: this.props.disabled }), this.props.loading && /* @__PURE__ */ _react.default.createElement(_Loading.default, { props: this.props }), this.props.clearable && /* @__PURE__ */ _react.default.createElement(_Clear.default, { props: this.props, state: this.state, methods: this.methods }), this.props.separator && /* @__PURE__ */ _react.default.createElement(_Separator.default, { props: this.props, state: this.state, methods: this.methods }), this.props.dropdownHandle && /* @__PURE__ */ _react.default.createElement(_DropdownHandle.default, { onClick: function onClick() {
        return a2.select.current.focus();
      }, props: this.props, state: this.state, methods: this.methods }), this.state.dropdown && !this.props.disabled && this.renderDropdown()));
    }, b;
  }(_react.Component);
  exports.Select = Select2, Select2.defaultProps = { addPlaceholder: "", additionalProps: null, autoFocus: false, backspaceDelete: true, clearAllLabel: "Clear all", clearOnBlur: true, clearOnSelect: true, clearable: false, closeOnScroll: false, closeOnSelect: false, closeOnClickInput: false, color: "#0074D9", compareValuesFunc: _util.isEqual, create: false, createNewLabel: "add {search}", debounceDelay: 0, direction: "ltr", disabled: false, disabledLabel: "disabled", dropdownGap: 5, dropdownHandle: true, dropdownHeight: "300px", dropdownPosition: "bottom", handleKeyDownFn: function handleKeyDownFn() {
  }, keepOpen: false, keepSelectedInList: true, labelField: "label", loading: false, multi: false, name: null, noDataLabel: "No data", onChange: function onChange() {
  }, onSelect: function onSelect() {
  }, onDeselect: function onDeselect() {
  }, onClearAll: function onClearAll() {
  }, onCreateNew: function onCreateNew() {
  }, onDropdownClose: function onDropdownClose() {
  }, onDropdownCloseRequest: void 0, onDropdownOpen: function onDropdownOpen() {
  }, onSelectAll: function onSelectAll() {
  }, options: [], pattern: void 0, placeholder: "Select...", portal: null, required: false, searchBy: "label", searchFn: function searchFn() {
  }, searchable: true, selectAll: false, selectAllLabel: "Select all", separator: false, sortBy: null, valueField: "value", values: [], defaultMenuIsOpen: false };
  var ReactDropdownSelect2 = /* @__PURE__ */ (0, _base.default)("div", { target: "e1gzf2xs0" })("box-sizing:border-box;position:relative;display:flex;border:1px solid #ccc;width:100%;border-radius:2px;padding:2px 5px;flex-direction:row;direction:", function(a) {
    var b = a.direction;
    return b;
  }, ";align-items:center;cursor:pointer;min-height:36px;", function(a) {
    var b = a.disabled;
    return b ? "cursor: not-allowed;pointer-events: none;opacity: 0.3;" : "pointer-events: all;";
  }, " :hover,:focus-within{border-color:", function(a) {
    var b = a.color;
    return b;
  }, ";}:focus,:focus-within{outline:0;box-shadow:0 0 0 3px ", function(a) {
    var b = a.color;
    return (0, _util.hexToRGBA)(b, 0.2);
  }, ";}*{box-sizing:border-box;}"), _default = Select2;
  exports.default = _default;
})(lib);
const Select = /* @__PURE__ */ getDefaultExportFromCjs(lib);
function PlainTextOption({ value, label, dir }) {
  const plainText = usePlainTextContent(label);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, dir, children: plainText });
}
function PlainTextLabel({ label }) {
  const plainText = usePlainTextContent(label);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: plainText });
}
function RemoveOptionButton({ label, onRemove }) {
  const plainText = usePlainTextContent(label);
  const getTranslatedContent = useQuizStore((state) => state.getTranslatedContent);
  const removeText = getTranslatedContent({
    key: "ada_remove_option",
    values: { label: plainText }
  });
  const removeLabel3 = removeText.includes(plainText) ? removeText : `${removeText} ${plainText}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "react-dropdown-select-option-remove",
      role: "button",
      tabIndex: 0,
      "aria-label": removeLabel3,
      onClick: (e) => {
        e.stopPropagation();
        onRemove();
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          onRemove();
        }
      },
      children: "×"
    }
  );
}
const useBrowserLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
const DROPDOWN_GAP = 5;
const DROPDOWN_MAX_HEIGHT = 300;
const ReactDropdownSelect = ({
  options,
  content,
  multipleSelection,
  handleSetChoicesRefs,
  clearable = false,
  disabled = false,
  dropdownPosition = "auto",
  keepSelectedInList = true,
  closeOnSelect = false,
  loading = false,
  customItemRenderer,
  customNoDataRenderer,
  searchable = false,
  enableOptionsSearch = false,
  placeholder,
  selectedChoiceRefs
}) => {
  var _a;
  const InspectorWrapper = useInspectorWrapper();
  const { getTranslatedContent, design, currentQuestionIdFromStore } = useQuizStore((state) => {
    var _a2;
    return {
      getTranslatedContent: state.getTranslatedContent,
      design: state.design,
      currentQuestionIdFromStore: (_a2 = state.currentQuizPage) == null ? void 0 : _a2.ref
    };
  });
  const [selectedValues, setSelectedValues] = reactExports.useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = reactExports.useState(false);
  const [dropdownComputedStyle, setDropdownComputedStyle] = reactExports.useState({});
  const selectWrapperRef = reactExports.useRef(null);
  const dropdownOptionsRef = reactExports.useRef(null);
  const dir = useLanguageDirection();
  const languageTag = useQuizLanguageTag();
  const headingId = useQuestionHeadingId();
  const listboxRef = reactExports.useCallback((listbox) => {
    var _a2;
    dropdownOptionsRef.current = listbox;
    const combobox = (_a2 = selectWrapperRef.current) == null ? void 0 : _a2.querySelector(".react-dropdown-select");
    if (combobox) combobox.ariaControlsElements = listbox ? [listbox] : null;
  }, []);
  const handleSelectKeyDownCapture = (e) => {
    const target = e.target;
    if ((e.key === "Enter" || e.key === " ") && !isDropdownOpen && target.classList.contains("react-dropdown-select")) {
      e.preventDefault();
      e.stopPropagation();
      target.click();
    }
  };
  const [portalTarget, setPortalTarget] = reactExports.useState(void 0);
  useBrowserLayoutEffect(() => {
    var _a2;
    const root = (_a2 = selectWrapperRef.current) == null ? void 0 : _a2.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : null;
    setPortalTarget((host == null ? void 0 : host.closest("#quiz-container .quiz-content")) ?? document.body);
  }, []);
  const optionsByValue = reactExports.useMemo(() => {
    return new Map(options.map((option) => [option.value, option]));
  }, [options]);
  reactExports.useEffect(() => {
    const nextSelectedValues = selectedChoiceRefs.map((choiceRef) => optionsByValue.get(choiceRef)).filter((option) => Boolean(option));
    const hasSameLength = nextSelectedValues.length === selectedValues.length;
    const hasSameOrder = hasSameLength ? nextSelectedValues.every((value, index) => {
      var _a2;
      return value.value === ((_a2 = selectedValues[index]) == null ? void 0 : _a2.value);
    }) : false;
    if (!hasSameLength || !hasSameOrder) {
      setSelectedValues(nextSelectedValues);
    }
  }, [optionsByValue, selectedChoiceRefs, selectedValues]);
  const updateDropdownPosition = reactExports.useCallback(() => {
    var _a2;
    const list = (_a2 = dropdownOptionsRef.current) == null ? void 0 : _a2.closest(
      ".react-dropdown-select-dropdown"
    );
    if (!isDropdownOpen || !selectWrapperRef.current || !list) return;
    const rect = selectWrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - DROPDOWN_GAP;
    const spaceAbove = rect.top - DROPDOWN_GAP;
    const listHeight = Math.min(list.scrollHeight + 2, DROPDOWN_MAX_HEIGHT);
    const openAbove = spaceBelow < listHeight && spaceAbove > spaceBelow;
    setDropdownComputedStyle({
      top: openAbove ? "auto" : `${rect.bottom + DROPDOWN_GAP}px`,
      bottom: openAbove ? `${window.innerHeight - rect.top + DROPDOWN_GAP}px` : "auto",
      left: `${rect.left}px`,
      maxHeight: `${Math.min(Math.max(openAbove ? spaceAbove : spaceBelow, 0), DROPDOWN_MAX_HEIGHT)}px`
    });
  }, [isDropdownOpen]);
  reactExports.useEffect(() => {
    updateDropdownPosition();
  }, [isDropdownOpen, currentQuestionIdFromStore, selectedValues, updateDropdownPosition]);
  reactExports.useEffect(() => {
    const handleResize = () => {
      updateDropdownPosition();
    };
    const handleScroll = () => {
      updateDropdownPosition();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isDropdownOpen, updateDropdownPosition]);
  reactExports.useEffect(() => {
    if (isDropdownOpen && dropdownOptionsRef.current) {
      const firstOption = dropdownOptionsRef.current.querySelector(
        ".react-dropdown-select-item"
      );
      firstOption == null ? void 0 : firstOption.focus();
    }
  }, [isDropdownOpen]);
  const handleChange = (values) => {
    setSelectedValues(values);
    handleSetChoicesRefs(values.map((option) => option.value));
  };
  const handleDropdownOpen = () => setIsDropdownOpen(true);
  const handleDropdownClose = () => setIsDropdownOpen(false);
  const customDropdownRenderer = ({ state }) => {
    const availableOptions = options.filter((option) => {
      if (multipleSelection) return true;
      return !selectedValues.some((selected) => selected.value === option.value);
    }).filter((option) => {
      if (!(state == null ? void 0 : state.search)) return true;
      return option.label.toLowerCase().includes(state.search.toLowerCase());
    });
    const dropdownDynamicStyle = `
      .react-dropdown-select-dropdown {
        background-color: ${design.inputBackgroundColor || "#ffffff"};
        color: ${design.inputTextColor || "#181212"};
        border: 1px solid ${design.inputBorderColor || "#333333"};
        border-radius: 4px;
        left: ${dropdownComputedStyle.left || "auto"};
        top: ${dropdownComputedStyle.top || "auto"};
        bottom: ${dropdownComputedStyle.bottom || "auto"};
        max-height: ${dropdownComputedStyle.maxHeight || `${DROPDOWN_MAX_HEIGHT}px`};
        overflow-y: auto;
      }
      .react-dropdown-select-no-options{
        min-height: 48px;
        line-height: 48px;
        padding: 0 12px;
        font-family: ${design.fontFamily || "sans-serif"};
        border-color: ${design.inputBorderColor || "#333333"};
        color: ${design.inputTextColor || "#181212"};
        background-color: ${design.inputBackgroundColor || "#ffffff"};
        cursor: default;
      }
      .react-dropdown-select-item {
        background-color: ${design.inputBackgroundColor || "#ffffff"};
        font-family: ${design.fontFamily || "sans-serif"};
        color: ${design.inputTextColor || "#181212"};
        border-bottom: none;
        padding: 0 12px;
        min-height: 48px;
        line-height: 48px;
        cursor: pointer;
        outline: none;
      }
      .react-dropdown-select-item:hover,
      .react-dropdown-select-item:focus {
        background-color: ${design.choiceSelectedBackgroundColor || "#ffffff"};
        color: ${design.choiceSelectedTextColor || "#181212"};
        outline: 2px solid ${design.choiceSelectedTextColor || "#181212"};
        outline-offset: -2px;
      }
      .react-dropdown-select-item-selected {
        background-color: ${design.choiceSelectedBackgroundColor || "#ffffff"};
        color: ${design.choiceSelectedTextColor || "#181212"};
      }
      .react-dropdown-select-options {
        background-color: ${design.inputBackgroundColor || "#ffffff"};
        border-color: ${design.inputBorderColor || "#333333"};
        position: static;
      }
      .react-dropdown-select-option-label {
        padding: 6px 6px 6px 0;
        display: inline-block;
      }
      [dir='rtl'] .react-dropdown-select-item,
      [dir='rtl'] .react-dropdown-select-item-selected,
      [dir='rtl'] .react-dropdown-select-no-options {
        text-align: right;
      }
    `;
    if (availableOptions.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: dropdownDynamicStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "react-dropdown-select-no-options", dir, ref: dropdownOptionsRef, children: getTranslatedContent({ key: "dropdown_no_more_options_available" }) })
      ] });
    }
    const handleOptionSelect = (option) => {
      if (!multipleSelection) {
        handleChange([option]);
        return;
      }
      const isSelected = selectedValues.some((s) => s.value === option.value);
      if (isSelected) {
        handleChange(selectedValues.filter((s) => s.value !== option.value));
      } else {
        handleChange([...selectedValues, option]);
      }
    };
    const handleOptionKeyDown = (e, value, index) => {
      var _a2, _b, _c;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOptionSelect(value);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = index + 1;
        if (nextIndex < availableOptions.length) {
          const nextElement = (_a2 = e.currentTarget.parentElement) == null ? void 0 : _a2.children[nextIndex];
          nextElement == null ? void 0 : nextElement.focus();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          const prevElement = (_b = e.currentTarget.parentElement) == null ? void 0 : _b.children[prevIndex];
          prevElement == null ? void 0 : prevElement.focus();
        }
      } else if (e.key === "Escape" || e.key === "Tab") {
        if (e.key === "Escape") {
          e.preventDefault();
        }
        setIsDropdownOpen(false);
        const selectEl = (_c = selectWrapperRef.current) == null ? void 0 : _c.querySelector(
          ".react-dropdown-select"
        );
        selectEl == null ? void 0 : selectEl.focus();
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: dropdownDynamicStyle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "react-dropdown-select-options",
          role: "listbox",
          dir,
          lang: languageTag,
          ref: listboxRef,
          children: availableOptions.map((value, index) => {
            const isSelected = selectedValues.some((selected) => selected.value === value.value);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "option",
                "aria-selected": isSelected,
                className: `react-dropdown-select-item ${isSelected ? "react-dropdown-select-item-selected" : ""}`,
                onClick: () => handleOptionSelect(value),
                onKeyDown: (e) => handleOptionKeyDown(e, value, index),
                tabIndex: 0,
                dir,
                children: [
                  multipleSelection && isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", style: { marginRight: "8px" }, children: "✓" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RenderedContent, { content: value.label })
                ]
              },
              value.value
            );
          })
        }
      )
    ] });
  };
  reactExports.useEffect(() => {
    document.documentElement.style.setProperty(
      "--input-background-color",
      design.inputBackgroundColor || "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--input-text-color",
      design.inputTextColor || "#181212"
    );
    document.documentElement.style.setProperty(
      "--input-border-color",
      design.inputBorderColor || "#333333"
    );
    document.documentElement.style.setProperty(
      "--choice-selected-background-color",
      design.choiceSelectedBackgroundColor || "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--choice-selected-text-color",
      design.choiceSelectedTextColor || "#181212"
    );
  }, [design]);
  const placeholderOption = {
    label: content,
    value: ""
  };
  const selectedSingleValue = ((_a = selectedValues[0]) == null ? void 0 : _a.value) ?? "";
  const customContentRenderer = ({ state }) => {
    const values = state.values;
    if (values.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "react-dropdown-select-placeholder", children: placeholder });
    }
    if (!multipleSelection) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PlainTextLabel, { label: values[0].label });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "react-dropdown-select-content", children: values.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "react-dropdown-select-option", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "react-dropdown-select-option-label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlainTextLabel, { label: item.label }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RemoveOptionButton,
        {
          label: item.label,
          onRemove: () => handleChange(values.filter((v) => v.value !== item.value))
        }
      )
    ] }, item.value)) });
  };
  const selectComponent = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          .choice-select-container .react-dropdown-select-input {
            font-size: 16px;
          }
        ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: selectWrapperRef,
        className: `${dir}`,
        onKeyDownCapture: handleSelectKeyDownCapture,
        children: portalTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            options,
            values: selectedValues,
            multi: multipleSelection,
            placeholder,
            addPlaceholder: placeholder,
            onChange: handleChange,
            onSelect: () => {
            },
            onDeselect: () => {
            },
            className: "choice-select-container",
            portal: portalTarget,
            dropdownPosition,
            searchBy: "label",
            searchable: enableOptionsSearch ? true : searchable,
            clearable,
            disabled,
            loading,
            keepSelectedInList,
            closeOnSelect,
            closeOnClickInput: true,
            style: {
              minHeight: "48px",
              fontSize: "14px",
              cursor: disabled ? "not-allowed" : "pointer",
              WebkitTapHighlightColor: "transparent",
              opacity: disabled ? 0.5 : 1
            },
            noDataRenderer: customNoDataRenderer,
            itemRenderer: customItemRenderer,
            contentRenderer: enableOptionsSearch ? void 0 : customContentRenderer,
            dropdownHandle: true,
            additionalProps: {
              role: "combobox",
              "aria-haspopup": "listbox",
              "aria-label": placeholder,
              "aria-labelledby": headingId
            },
            dropdownRenderer: customDropdownRenderer,
            onDropdownOpen: handleDropdownOpen,
            onDropdownClose: handleDropdownClose,
            dropdownHandleRenderer: () => {
              return choiceSelectIndicator;
            }
          }
        )
      }
    )
  ] });
  const nativeSelectComponent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-variants-container", ref: selectWrapperRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        className: "select-variants",
        dir,
        value: selectedSingleValue,
        onChange: (event) => {
          const selectedOption = options.find((option) => option.value === event.target.value);
          handleChange([selectedOption ?? placeholderOption]);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", dir, children: content }),
          options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlainTextOption, { value: option.value, label: option.label, dir }, option.value))
        ]
      }
    ),
    choiceSelectIndicator
  ] });
  if (InspectorWrapper) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      InspectorWrapper,
      {
        elementRef: options[0].value,
        elementName: options[0].label,
        elementType: "choice",
        children: multipleSelection ? selectComponent : nativeSelectComponent
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "select-wrapper",
      onTouchStart: (e) => {
        e.stopPropagation();
      },
      onTouchEnd: (e) => {
        e.stopPropagation();
      },
      children: multipleSelection ? selectComponent : nativeSelectComponent
    }
  );
};
export {
  ReactDropdownSelect
};

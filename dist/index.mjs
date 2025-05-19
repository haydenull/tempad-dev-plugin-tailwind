// node_modules/.pnpm/@tempad-dev+plugins@0.5.0/node_modules/@tempad-dev/plugins/dist/index.js
function definePlugin(plugin) {
  return plugin;
}

// node_modules/.pnpm/transform-to-tailwindcss-core@0.0.35/node_modules/transform-to-tailwindcss-core/dist/index.js
var cssMathFnRE = /^(?:calc|clamp|min|max)\s*\(.*\)/;
var numberWithUnitRE = /^-?[0-9.]+(px|rem|em|%|vw|vh|vmin|vmax|deg|s|ms)$/;
var positionMap = [
  "top",
  "right",
  "bottom",
  "left",
  "center"
];
function isCalc(s) {
  return s.startsWith("calc(");
}
function getFirstName(s) {
  return s.split("-")[0];
}
function getLastName(s) {
  const all = s.split("-");
  return all[all.length - 1];
}
function isUrl(s) {
  return s.startsWith("url(");
}
function isPercent(s) {
  return s.endsWith("%");
}
function isHex(hex) {
  return /^#[0-9A-F]{2,}$/i.test(hex);
}
function isRgb(s) {
  return s.startsWith("rgb");
}
function isHsl(s) {
  return s.startsWith("hsl");
}
function isGradient(s) {
  return s.startsWith("linear-gradient") || s.startsWith("radial-gradient") || s.startsWith("conic-gradient");
}
function isCubicBezier(s) {
  return s.startsWith("cubic-bezier");
}
function isAttr(s) {
  return /^attr\(/i.test(s);
}
function isRepeatingLinearGradient(s) {
  return /^repeating-linear-gradient\(/i.test(s);
}
function isRepeatingRadialGradient(s) {
  return /^repeating-radial-gradient\(/i.test(s);
}
function isConstant(s) {
  return /^constant\(/.test(s);
}
function isEnv(s) {
  return /^env\(/.test(s);
}
function isFraction(s) {
  return /^\d+\/\d+$/.test(s);
}
function isDynamic(val) {
  return isFraction(val) || isUrl(val) || isColor(val) || cssMathFnRE.test(val) || numberWithUnitRE.test(val) || isGradient(val) || isVar(val) || isCalc(val) || isCubicBezier(val) || isAttr(val) || isRepeatingLinearGradient(val) || isRepeatingRadialGradient(val) || isConstant(val) || isEnv(val);
}
function getVal(val, transform$1, prefix = "", isDynamicFlag = false) {
  val = String(val);
  if (isDynamicFlag || isDynamic(val)) return `-[${prefix}${trim(transform$1 ? transform$1(val) : val, "all").replace(/['"]/g, "")}]`;
  return prefix ? `-[${prefix}${transform$1 ? transform$1(val) : val}]` : `-${transform$1 ? transform$1(val) : val}`;
}
function getHundred(n) {
  if (n.endsWith("%") || n.endsWith("deg") || n === "0") return n;
  const v = +n * 100;
  return Number.isNaN(v) ? v : `${v}%`;
}
function joinWithLine(s) {
  return s.replace(/\s+/g, " ").split(/\s/g).join("-");
}
function joinWithUnderLine(s) {
  return s.replace(/\s+/g, " ").split(/\s/g).join("_");
}
function trim(s, type = "around") {
  if (type === "pre") return s.replace(/(^\s*)/g, "");
  if (type === "post") return s.replace(/(\s*$)/g, "");
  if (type === "all") return s.replace(/\s+/g, "");
  if (type === "around") return s.replace(/(^\s*)|(\s*$)/g, "");
  return s;
}
function transformImportant(v, trimSpace = true) {
  if (trimSpace) v = v.replace(/\s+/g, " ").replace(/\s*,\s*/g, ",").replace(/\s*\/\s*/g, "/");
  if (/calc\([^)]+\)/.test(v)) v = v.replace(/calc\(([^)]+)\)/g, (all, k) => {
    return all.replace(k, k.replace(/\s/g, ""));
  });
  if (/rgb/.test(v)) v = v.replace(/rgba?\(([^)]+)\)/g, (all, k) => {
    const _k = k.trim().split(" ");
    return all.replace(k, _k.map((i, index) => i.endsWith(",") ? i : i + (_k.length - 1 === index ? "" : ",")).join(""));
  });
  if (/hsl/.test(v)) v = v.replace(/hsla?\(([^)]+)\)/g, (all, k) => {
    const _k = k.trim().split(" ");
    return all.replace(k, _k.map((i, index) => i.endsWith(",") ? i : i + (_k.length - 1 === index ? "" : ",")).join(""));
  });
  if (/var\([^)]+\)/.test(v)) v = v.replace(/var\(([^)]+)\)/g, (all, k) => {
    return all.replace(k, k.replace(/\s/g, "_"));
  });
  if (v.endsWith("!important")) return [v.replace(/\s*!important/, "").trim(), "!"];
  return [v.trim(), ""];
}
function joinEmpty(str) {
  return str.replace(/\(\s*/g, "(").replace(/\s*\)/g, ")").replace(/\s*,\s*/g, ",");
}
function isVar(s) {
  return s.startsWith("var(--");
}
function isSize(s) {
  return cssMathFnRE.test(s) || numberWithUnitRE.test(s) || positionMap.includes(s);
}
function isColor(s) {
  return isHex(s) || isRgb(s) || isHsl(s);
}
var browserReg = /-webkit-|-moz-|-ms-|-o-/g;
var linearGradientReg = /linear-gradient\(\s*to([\w\s]+),?([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/;
var linearGradientReg1 = /linear-gradient\(\s*([^,]*),?([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/;
var otherGradientReg = /(radial|conic)-gradient\(([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/;
var commaReplacer = "__comma__";
var alignMap = [
  "align-self",
  "align-items",
  "align-content"
];
function align(key, val) {
  if (!alignMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}${getLastName(key)}-${value.split(" ").reverse().map(getLastName).join("-")}`;
}
var animationMap = [
  "animation",
  "animation-name",
  "animation-duration",
  "animation-delay",
  "animation-timing-function",
  "animation-iteration-count",
  "animation-direction",
  "animation-fill-mode",
  "animation-play-state"
];
function animation(key, val) {
  if (!animationMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}animate-[${joinWithUnderLine(value)}]`;
}
var aspectMap = ["aspect-ratio"];
function aspect(key, val) {
  if (!aspectMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (value === "auto") return `${important}${getFirstName(key)}-${value}`;
  return `${important}${getFirstName(key)}${getVal(value)}`;
}
var validKey = ["box-shadow", "drop-shadow"];
var boxMap = [
  "box-sizing",
  "box-decoration-break",
  "box-shadow",
  "drop-shadow"
];
function box(key, val) {
  if (!boxMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key.startsWith("box-decoration")) return `${important}box-decoration-${value}`;
  if (key === "box-sizing") return `${important}box-${getFirstName(value)}`;
  if (validKey.includes(key)) return `${important}shadow-[${value.split(" ").join("_")}]`;
}
var hundredMap = [
  "contrast",
  "brightness",
  "saturate"
];
var percent = [
  "grayscale",
  "invert",
  "sepia"
];
var filterMap = ["filter", "backdrop-filter"];
function filter(key, val) {
  if (!filterMap.includes(key)) return;
  const [v, important] = transformImportant(val);
  const [_, name, value] = v.match(/([\w-]+)\((.*)\)/);
  if (hundredMap.includes(name) || percent.includes(name)) {
    const hundred = getHundred(value);
    if (Number.isNaN(hundred)) return `${important}${name}${getVal(value)}`;
    return `${important}${name}${getVal(getHundred(value))}`;
  }
  if (name === "drop-shadow") return `${important}drop-${box(name, value)}`;
  if (name === "hue-rotate") return `${important}${name}${getVal(value.slice(0, -3))}`;
  return `${important}${name}${getVal(value)}`;
}
var backdropMap = ["backdrop-filter"];
function backdrop(key, val) {
  if (!backdropMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}backdrop-${filter(key, value)}`;
}
var backgroundMap = [
  "background-color",
  "background-attachment",
  "background-position",
  "background-size",
  "background-image",
  "background",
  "background-blend-mode",
  "background-origin",
  "background-clip",
  "background-repeat"
];
var lengthRe = "\\d*\\.?\\d+(?:px|em|rem|%|vw|vh)?";
var positionPair = `(${lengthRe})\\s+(${lengthRe})`;
var optimizedReg = new RegExp(`${positionPair}\\s*,\\s*${positionPair}`);
function background(key, val) {
  if (!backgroundMap.includes(key)) return;
  let [value, important] = transformImportant(val);
  if (key === "background-size") return /\d/.test(value) ? `${important}bg${getVal(value, joinWithUnderLine, "length:", true)}` : `${important}bg${getVal(value, joinWithLine, "length:")}`;
  if (key === "background-position") {
    if (/\d/.test(value)) return `${important}bg${getVal(value, joinWithUnderLine, "position:")}`;
    return `${important}bg${getVal(value, joinWithUnderLine, "position:")}`;
  }
  if (["background-color", "background-attachment"].includes(key)) return `${important}bg${getVal(value, joinWithUnderLine)}`;
  if (["background", "background-image"].includes(key)) {
    if (isSize(value)) return `${important}bg${getVal(value, joinWithLine, "position:")}`;
    const temp = value.replace(/rgba?\([^)]+\)/g, "temp");
    if (/\)\s*,/.test(temp)) return `bg-[${matchMultipleBgAttrs(value)}]`;
    if (value.startsWith("linear-gradient")) {
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) => all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)));
      const matcher = newValue.match(linearGradientReg);
      if (matcher) {
        let [direction, from, via, to] = matcher.slice(1);
        direction = direction.split(" ").map((item) => item[0]).join("");
        return direction ? `bg-gradient-to-${direction}${getLinearGradientPosition$1(from, via, to)}` : getLinearGradientPosition$1(from, via, to);
      }
      const matcher1 = newValue.match(linearGradientReg1);
      if (!matcher1) return `bg-[${matchMultipleBgAttrs(value)}]`;
      return `bg-gradient-linear bg-gradient-[${matcher1[1]}${matcher1[2] ? `,${matcher1[2].replace(/\s+/, "_").replaceAll(commaReplacer, ",")}` : ""},${matcher1[3].replace(/\s+/, "_").replaceAll(commaReplacer, ",")}]`;
    } else if (/^(?:radial|conic)-gradient/.test(value)) {
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) => all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)));
      const matcher = newValue.match(otherGradientReg);
      if (!matcher) return "";
      const name = matcher[1];
      let [from, via, to] = matcher.slice(2);
      return `bg-gradient-${name}${getLinearGradientPosition$1(from, via, to)}`;
    }
    const match = value.match(/^rgba?\([^)]+\)$/);
    if (match) {
      const rgb = match[0];
      value = value.replace(rgb, `[${rgb}]`);
    }
    const urlMatch = value.match(/^url\(["'\s.\-\w/@]*\)$/);
    if (urlMatch) return `bg-${value.replace(urlMatch[0], `[${urlMatch[0].replace(/['"]/g, "")}]${important}`)}`;
    const safeValueMap = /* @__PURE__ */ new Map();
    let i = 0;
    const safeValue = value.replace(/url\([^)]+\)/g, (m) => {
      const key$1 = `__URL__${i++}`;
      safeValueMap.set(key$1, m);
      return key$1;
    }).replace(/rgba?\([^)]+\)/g, (m) => {
      const key$1 = `__RGBA__${i++}`;
      safeValueMap.set(key$1, m);
      return key$1;
    });
    if (safeValue.includes("/")) {
      const [positionRawSafe, afterSlashRawSafe] = safeValue.split("/").map((v) => v.trim());
      const afterSlashPartsSafe = afterSlashRawSafe.split(/\s+/);
      const sizeParts = afterSlashPartsSafe.slice(0, 2);
      const others = afterSlashPartsSafe.slice(2).map((v) => {
        const m = v.match(/__URL__(\d+)/);
        if (m) return safeValueMap.get(`__URL__${m[1]}`);
        const m1 = v.match(/__RGBA__(\d+)/);
        if (m1) return safeValueMap.get(`__RGBA__${m1[1]}`);
        return v;
      });
      const size$1 = sizeParts.join(" ");
      const posStr = background("background-position", `${positionRawSafe}${important ? " !important" : ""}`);
      const sizeStr = size$1 ? background("background-size", `${size$1}${important ? " !important" : ""}`) : "";
      let othersStr = "";
      if (others.length) othersStr = others.map((v) => background(key, `${v}${important ? " !important" : ""}`)).join(" ");
      return [
        posStr,
        sizeStr,
        othersStr
      ].filter(Boolean).join(" ");
    } else if (safeValue.includes(" ")) {
      const m = safeValue.match(optimizedReg);
      if (m) {
        const others = safeValue.replace(m[0], "").trim().split(" ").map((v) => {
          const m$1 = v.match(/__URL__(\d+)/);
          if (m$1) return safeValueMap.get(`__URL__${m$1[1]}`);
          const m1 = v.match(/__RGBA__(\d+)/);
          if (m1) return safeValueMap.get(`__RGBA__${m1[1]}`);
          return v;
        });
        let othersStr = "";
        if (others.length) othersStr = others.map((v) => background(key, `${v}${important ? " !important" : ""}`)).join(" ");
        const posStr = background("background-position", `${m[0]}${important ? " !important" : ""}`);
        return [posStr, othersStr].filter(Boolean).join(" ");
      }
      const parts = safeValue.split(/\s+/).map((v) => {
        const m$1 = v.match(/__URL__(\d+)/);
        if (m$1) return safeValueMap.get(`__URL__${m$1[1]}`);
        const m1 = v.match(/__RGBA__(\d+)/);
        if (m1) return safeValueMap.get(`__RGBA__${m1[1]}`);
        return v;
      });
      let r = parts.map((v) => background(key, `${v}${important ? " !important" : ""}`)).join(" ");
      const bgPositionReg = /bg-\[position:([^\]]*)\]/g;
      const bgPosition = r.match(bgPositionReg);
      if (bgPosition && bgPosition.length > 1) {
        const t = `bg-[position:${bgPosition.map((item) => item.replace(bgPositionReg, "$1")).join("_")}]`;
        r = `${r.replace(bgPositionReg, "").replace(/\s+/g, " ").split(" ").filter(Boolean).concat([t]).join(" ")}`;
      }
      return r;
    }
    return `${important}bg${getVal(value, joinWithLine)}`;
  } else if (key === "background-blend-mode") return `${important}bg-blend-${value}`;
  return `${important}${replaceBackground(key, value)}-${transformBox(value)}`;
}
function replaceBackground(s, val) {
  if (val.endsWith("repeat")) return "bg";
  return s.replace("background", "bg");
}
function transformBox(s) {
  const reg = /border|content|padding-box/;
  if (reg.test(s)) return s.replace("-box", "");
  if (s.startsWith("repeat-")) return s.replace("repeat-", "");
  return joinWithLine(s);
}
function getLinearGradientPosition$1(from, via, to) {
  let result = "";
  if (via && !to) {
    to = via;
    via = "";
  }
  if (from) {
    from = from.replaceAll(commaReplacer, ",");
    const [fromColor, fromPosition] = from.split(" ");
    if (fromPosition) result += ` from-${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor} from-${fromPosition}`;
    else if (fromColor) result += ` from-${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor}`;
  }
  if (via) {
    via = via.replaceAll(commaReplacer, ",");
    const [viaColor, viaPosition] = via.split(" ");
    if (viaPosition) result += ` via-${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor} via-${viaPosition}`;
    else if (viaColor) result += ` via-${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor}`;
  }
  if (to) {
    to = to.replaceAll(commaReplacer, ",");
    const [toColor, toPosition] = to.split(" ");
    if (toPosition) result += ` to-${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor} to-${toPosition}`;
    else if (toColor) result += ` to-${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor}`;
  }
  return result;
}
var CONSTANTFLAG = "__transform_to_unocss__";
function matchMultipleBgAttrs(value) {
  const map$2 = {};
  let i = 0;
  value = value.replace(/(rgba?|hsla?|lab|lch|hwb|color)\(\)*\)/, (_) => {
    map$2[i++] = _;
    return `${CONSTANTFLAG}${i}}`;
  });
  value = value.split(/\)\s*,/).map((item) => `${item.replace(/\s*,\s*/g, ",").replace(/\s+/g, "_")}`).join("),");
  Object.keys(map$2).forEach((key) => {
    value = value.replace(`${CONSTANTFLAG}${key}}`, map$2[key]);
  });
  return value;
}
var borderSize = [
  "border-left",
  "border-top",
  "border-right",
  "border-bottom"
];
var widthMatchMap = {
  "inline": "x",
  "block": "y",
  "inline-start": "s",
  "inline-end": "e",
  "top": "t",
  "right": "r",
  "bottom": "b",
  "left": "l"
};
var radiusMatchMap = {
  top: "t",
  right: "r",
  bottom: "b",
  left: "l",
  end: "e",
  start: "s"
};
function border(key, val) {
  const [value, important] = transformImportant(val);
  if (key === "border-spacing") return `${important}${key}${getVal(value, joinWithUnderLine, "", true)}`;
  if (key === "border-color") return `${important}border${getVal(value)}`;
  const radiusMatch = key.match(/border(-start|-end|-top|-bottom)?(-start|-end|-left|-right)?-radius/);
  if (radiusMatch) {
    const [_, start, end] = radiusMatch;
    if (start && end) return `${important}rounded-${radiusMatchMap[start.slice(1)]}${radiusMatchMap[end.slice(1)]}${getVal(value, joinWithUnderLine)}`;
    if (start || end) return `${important}rounded-${radiusMatchMap[(start === null || start === void 0 ? void 0 : start.slice(1)) || (end === null || end === void 0 ? void 0 : end.slice(1))]}${getVal(value, joinWithUnderLine)}`;
    return `${important}rounded${getVal(value, joinWithUnderLine, "", true)}`;
  }
  const widthMatch = key.match(/border(-inline|-block|-inline-start|-inline-end|-top|-right|-bottom|-left)?-(width|color)/);
  if (widthMatch) {
    if (widthMatch[1]) {
      const widthType = widthMatchMap[widthMatch[1].slice(1)];
      return `${important}border-${widthType}${getVal(value, joinWithUnderLine, "length:")}`;
    }
    return `${important}border${getVal(value, joinWithUnderLine, "length:")}`;
  }
  if (borderSize.some((b) => key.startsWith(b))) {
    const keys = key.split("-");
    if (keys.slice(-1)[0] === "radius") return value.split(" ").map((v) => `${important}rounded-${keys.slice(1, -1).map((s) => s[0]).join("")}${getVal(v)}`).join(" ");
    return value.split(" ").map((v) => `${important}border-${key.split("-")[1][0]}${getVal(v)}`).join(" ");
  }
  if (key.startsWith("border-image")) return;
  if (/^\d[%|(px)rem]$/.test(value) || key === "border-collapse") return `${important}border-${value}`;
  if (key === "border-width" || key === "border-style") return `${important}border${getVal(value)}`;
  if (key === "border-color") {
    if (value === "currentColor") return `${important}border-current`;
    return `${important}border${getVal(value)}`;
  }
  return value.split(" ").map((v) => {
    if (value === "currentColor") return `${important}border-current`;
    return `${important}border${getVal(v)}`;
  }).join(" ");
}
var colorMap = ["color"];
function color(key, val) {
  if (!colorMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}text${getVal(value)}`;
}
var columnMap = ["column-gap"];
function column(key, val) {
  if (!columnMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "column-gap") return `${important}gap-x${getVal(value)}`;
  return `${important}${key}${getVal(value)}`;
}
var contentMap = ["content", "content-visibility"];
function content(key, val) {
  if (!contentMap.includes(key)) return;
  const [value, important] = transformImportant(val, false);
  if (key === "content-visibility") return `content-visibility-${value}${important}`;
  const match = value.match(/^(["'])(.*?)\1$/);
  if (match) return `content-['${match[2].replace(/\s/g, "_")}']${important}`;
  return `content-[${value}]${important}`;
}
var cursorMap = ["cursor"];
function cursor(key, val) {
  if (!cursorMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}${key}${getVal(value)}`;
}
var displayMap = [
  "display",
  "visibility",
  "position"
];
function display(key, val) {
  if (!displayMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (value === "none") return `${important}hidden`;
  if (value === "hidden") return `${important}invisible`;
  return `${important}${value}`;
}
var emptyKey = {
  show: "visible",
  hide: "hidden"
};
var emptyMap = ["empty-cells"];
function empty(key, val) {
  if (!emptyMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (emptyKey[value]) return `${important}table-empty-cells-${emptyKey[value] ?? value}`;
}
var lastMaps = [
  "flex-basis",
  "flex-grow",
  "flex-shrink"
];
var flexMap = [
  "flex",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "flex-wrap",
  "flex-direction"
];
function flex(key, val) {
  if (!flexMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "flex-shrink" && value === "1") return `${important}shrink`;
  if (lastMaps.includes(key)) return `${important}${getLastName(key)}${getVal(value)}`;
  if (value === "1") return `${important}flex-1`;
  const firstVal = value[0];
  if (key === "flex" && (firstVal === "0" || firstVal === "1")) return `${important}flex-[${joinWithUnderLine(value)}]`;
  return `${important}${getFirstName(key)}-${value.replace("column", "col")}`;
}
var floatMap = [
  "float",
  "clear",
  "pointer-events",
  "fill",
  "order",
  "perspective",
  "columns",
  "break-inside",
  "break-before"
];
function float(key, val) {
  if (!floatMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (positionMap.includes(value)) return `${important}${key}${getVal(value)}`;
  return `${important}${key}${getVal(value)}`;
}
function font(key, val) {
  const [value, important] = transformImportant(val);
  if (key === "font-size") {
    if ([
      "inherit",
      "initial",
      "revert",
      "unset",
      "revert-layer"
    ].includes(value)) return `${important}font-size-${value}`;
    return `${important}text${getVal(value)}`;
  }
  if (key === "font-weight") return `${important}font-${value}`;
  if (key === "font-family") {
    const match = value.match(/ui-(\w{0,4})/);
    if (!match) return `${important}font-[${joinWithUnderLine(val)}]`;
    const [_, family] = match;
    return `${important}font-${family}`;
  }
  if (key === "font-style") {
    if (value === "normal") return `${important}font-not-italic`;
    return `${important}font-${value}`;
  }
  if (key === "font-variant-numeric") {
    if (value === "normal") return `${important}normal-nums`;
    return `${important}${value}`;
  }
  return transformFont(value, important);
}
function transformFont(v, important) {
  return v.split(" ").map((item) => /^\d/.test(item) ? `${important}text-[${item}]` : `${important}font-${item}`).join(" ");
}
var gridMap = [
  "grid",
  "grid-row",
  "grid-column",
  "grid-template-columns",
  "grid-template-rows",
  "grid-auto-flow",
  "grid-auto-columns",
  "grid-auto-rows",
  "grid-column-start",
  "grid-column-end",
  "grid-row-start",
  "grid-row-end"
];
function grid(key, val) {
  if (!gridMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key.startsWith("grid-template")) {
    const matcher$1 = value.match(/repeat\s*\(\s*(\d+)/);
    if (matcher$1) return `${important}grid-${getLastName(key) === "rows" ? "rows" : "cols"}-${matcher$1[1]}`;
    return `${important}grid-${getLastName(key) === "rows" ? "rows" : "cols"}-${value.includes(" ") ? `[${joinWithUnderLine(value)}]` : value}`;
  }
  if (key === "grid-auto-flow") return `${important}grid-flow-${joinWithLine(value).replace("column", "col")}`;
  if (key.startsWith("grid-auto")) {
    const matcher$1 = value.match(/minmax\s*\(\s*0\s*,\s*1fr/);
    return `${important}auto-${getLastName(key) === "rows" ? "rows" : "cols"}-${matcher$1 ? "fr" : getFirstName(value)}`;
  }
  const matcher = value.match(/span\s+(\d)/);
  if (matcher) return `${important}${key.slice(5).replace("column", "col")}-span-${matcher[1]}`;
  if (value === "1/-1") return `${important}${key.slice(5).replace("column", "col")}-span-full`;
  return `${important}${key.slice(5).replace("column", "col")}-${value}`;
}
var isolationMap = ["isolation"];
function isolation(key, val) {
  if (!isolationMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (val === "isolate") return `${important}${value}`;
  return `${important}${key}-${value}`;
}
var justifyMap = [
  "justify",
  "justify-content",
  "justify-items",
  "justify-self"
];
function justify(key, val) {
  if (!justifyMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (value.includes(" ")) return `${key}-${value.split(" ").reverse().map(getLastName).join("-")}${important}`;
  if (key === "justify-content") return `${important}justify-${getLastName(value)}`;
  return `${important}${key}-${getLastName(value)}`;
}
var letterMap = ["letter-spacing"];
function letter(key, val) {
  if (!letterMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}tracking${getVal(value)}`;
}
var lineKey = {
  1: "none",
  1.25: "tight",
  1.375: "snug",
  1.5: "normal",
  1.625: "relaxed",
  2: "loose"
};
var lineMap = ["line-height"];
function line(key, val) {
  if (!lineMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (lineKey[value]) return `${important}leading-${lineKey[value]}`;
  return `${important}leading${getVal(value, (v) => /\d$/.test(v) ? `[${v}]` : v)}`;
}
var listMap = [
  "list-style",
  "list-style-type",
  "list-style-position",
  "list-style-image",
  "caption-side",
  "appearance",
  "touch-action",
  "table-layout",
  "caret-color",
  "backface-visibility",
  "stroke-width",
  "stroke",
  "accent",
  "accent-color"
];
function list(key, val) {
  if (!listMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "list-style-image") {
    if (value === "none") return `${important}${getFirstName(key)}-none`;
    return `${important}${getFirstName(key)}${getVal(value)}`;
  }
  return `${important}${getFirstName(key)}${getVal(value)}`;
}
var map$1 = {
  "margin-left": "ml",
  "margin-right": "mr",
  "margin-top": "mt",
  "margin-bottom": "mb",
  "margin-inline-start": "ms",
  "margin-inline-end": "me",
  "padding-left": "pl",
  "padding-right": "pr",
  "padding-top": "pt",
  "padding-bottom": "pb",
  "padding-inline-start": "ps",
  "padding-inline-end": "pe"
};
function transformMargin(key, val) {
  const [value, important] = transformImportant(val);
  const specail = map$1[key];
  if (specail) return `${important}${specail}${getVal(value)}`;
  const values = value.split(" ");
  const len = values.length;
  if (len === 1) return `${important}${key[0]}${getVal(values[0])}`;
  if (len === 2) return `${important}${key[0]}x${getVal(values[1])} ${important}${key[0]}y${getVal(values[0])}`;
  if (len === 3) return `${important}${key[0]}x${getVal(values[1])} ${important}${key[0]}t${getVal(values[0])} ${important}${key[0]}b${getVal(values[2])}`;
  return `${important}${key[0]}t${getVal(values[0])} ${important}${key[0]}b${getVal(values[2])} ${important}${key[0]}l${getVal(values[3])} ${important}${key[0]}r${getVal(values[1])}`;
}
var maskMap = [
  "mask-position",
  "mask-origin",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "mask-image",
  "mask-mode",
  "mask-composite",
  "mask-clip",
  "mask-type"
];
function mask(key, val) {
  if (!maskMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if ([
    "mask-clip",
    "mask-origin",
    "mask-type"
  ].includes(key)) return `${important}${key}-${getFirstName(value)}`;
  if (["mask-mode", "mask-composite"].includes(key)) return `${important}${getFirstName(key)}-${getFirstName(value)}`;
  if (["mask-position", "mask-size"].includes(key)) {
    if (isDynamic(value)) return `${important}${key}${getVal(value)}`;
    if (/\d/.test(value)) return `${important}[${key}:${joinWithUnderLine(value)}]`;
    return `${important}${getFirstName(key)}-${joinWithLine(value)}`;
  }
  if (key === "mask-repeat") {
    if (value.includes("-")) return `${important}mask-${value}`;
    return `${important}${key}-${value}`;
  }
  if (key === "mask-image") {
    if (isGradient(value)) {
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) => all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)));
      const matcher = newValue.match(linearGradientReg);
      if (!matcher) return;
      let [direction, from, via, to] = matcher.slice(1);
      direction = direction.split(" ").map((item) => item[0]).join("");
      const type = value.startsWith("linear-gradient") ? "linear" : value.startsWith("radial-gradient") ? "radial" : value.startsWith("conic-gradient") ? "conic" : "";
      return direction ? `${getLinearGradientPosition(`mask-${direction}`, from, via, to).trim()}` : getLinearGradientPosition(`mask-${type}`, from, via, to).trim();
    }
    return `${important}mask${getVal(value)}`;
  }
  return `${important}${key}${getVal(value)}`;
}
function getLinearGradientPosition(prefix, from, via, to) {
  let result = "";
  if (via && !to) {
    to = via;
    via = "";
  }
  if (from) {
    from = from.replaceAll(commaReplacer, ",");
    const [fromColor, fromPosition] = from.split(" ");
    if (fromPosition) result += ` ${prefix}-from-${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor} ${prefix}-from${getVal(fromPosition)}`;
    else if (fromColor) result += ` ${prefix}-from-${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor}`;
  }
  if (via) {
    via = via.replaceAll(commaReplacer, ",");
    const [viaColor, viaPosition] = via.split(" ");
    if (viaPosition) result += ` ${prefix}-via${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor} ${prefix}-via${getVal(viaPosition)}`;
    else if (viaColor) result += ` ${prefix}-via${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor}`;
  }
  if (to) {
    to = to.replaceAll(commaReplacer, ",");
    const [toColor, toPosition] = to.split(" ");
    if (toPosition) result += ` ${prefix}-to-${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor} ${prefix}-to${getVal(toPosition)}`;
    else if (toColor) result += ` ${prefix}-to-${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor}`;
  }
  return result;
}
var maxMap = [
  "max-height",
  "max-width",
  "max-block-size",
  "max-inline-size",
  "min-height",
  "min-width",
  "min-block-size",
  "min-inline-size"
];
function max(key, val) {
  if (!maxMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  const all = key.split("-");
  const attributeValue = isCalc(value) || isVar(value) ? getVal(value) : getVal(getFirstName(value));
  return `${important}${all[0]}-${all[1][0]}${attributeValue}`;
}
function mix(key, val) {
  const [value, important] = transformImportant(val);
  return `${important}mix-blend-${value}`;
}
var objectMap = ["object-fit", "object-position"];
function object(key, val) {
  if (!objectMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "object-position") return `${important}${getFirstName(key)}-${joinWithLine(value)}`;
  return `${important}${getFirstName(key)}-${value}`;
}
var opacityMap = ["opacity"];
function opacity(key, val) {
  if (!opacityMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (isPercent(val)) return `${important}op-${value.replace(/%/g, "")}`;
  return `${important}op-${+value * 100}`;
}
var outlineMap = [
  "outline-width",
  "outline-style",
  "outline-offset",
  "outline",
  "outline-color"
];
function outline(key, val) {
  if (!outlineMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "outline-offset") return `${important}${key}-${value}`;
  return `${important}${getFirstName(key)}-${value}`;
}
var overflowMap = [
  "overflow",
  "overflow-x",
  "overflow-y",
  "overflow-wrap"
];
function overflow(key, val) {
  if (!overflowMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "overflow-wrap") return `${important}wrap-${value}`;
  return `${important}${key}-${value}`;
}
var overscrollMap = [
  "overscroll-behavior",
  "overscroll-behavior-x",
  "overscroll-behavior-y"
];
function overscroll(key, val) {
  if (!overscrollMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  const [prefix, _, suffix] = key.split("-");
  if (suffix) return `${important}${prefix}-${suffix}-${value}`;
  return `${important}${prefix}-${value}`;
}
var placeMap = [
  "place-content",
  "place-items",
  "place-self"
];
function place(key, val) {
  if (!placeMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (value.includes(" ")) return `${key}-${value.split(" ").reverse().map(getLastName).join("-")}${important}`;
  return `${important}${key}-${getLastName(value)}`;
}
var map = {
  vertical: "y",
  horizontal: "x"
};
function resize(key, val) {
  const [value, important] = transformImportant(val);
  if (value === "both") return `${important}${key}`;
  return `${important}${key}-${map[value] || value}`;
}
var rowMap = ["row-gap"];
function row(key, val) {
  if (!rowMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}gap-y${getVal(value)}`;
}
var scrollMap = [
  "scroll-snap-type",
  "scroll-snap-stop",
  "scroll-snap-align",
  "scroll-padding",
  "scroll-padding-inline",
  "scroll-padding-block",
  "scroll-padding-inline-start",
  "scroll-padding-inline-end",
  "scroll-padding-block-start",
  "scroll-padding-block-end",
  "scroll-padding-top",
  "scroll-padding-right",
  "scroll-padding-bottom",
  "scroll-padding-left",
  "scroll-margin",
  "scroll-margin-inline",
  "scroll-margin-block",
  "scroll-margin-inline-start",
  "scroll-margin-inline-end",
  "scroll-margin-block-start",
  "scroll-margin-block-end",
  "scroll-margin-top",
  "scroll-margin-right",
  "scroll-margin-bottom",
  "scroll-margin-left",
  "scroll-behavior"
];
function scroll(key, val) {
  if (!scrollMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key.startsWith("scroll-snap")) {
    if (value.includes(" ")) {
      const [pre, after] = value.split(" ");
      return `${important}snap-${pre}${getVal(after)}`;
    }
    return `${important}snap-${value}`;
  }
  if (key === "scroll-behavior") return `${important}scroll-${value}`;
  const [_, prefix, suffix, way] = key.match(/scroll-(margin|padding)-?(\w+)?-?(\w+)?/);
  if (suffix === "inline" && way) return `${important}scroll-${prefix[0]}${way[0]}${getVal(value)}`;
  if (suffix) return `${important}scroll-${prefix[0]}${suffix[0]}${getVal(value)}`;
  return `${important}scroll-${prefix[0]}${getVal(value)}`;
}
var sizeMap = [
  "z-index",
  "width",
  "height"
];
function size(key, val) {
  if (!sizeMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}${key[0]}${getVal(value, isDynamic(value) ? void 0 : getFirstName)}`;
}
var textMap = [
  "text-align",
  "text-align-last",
  "text-decoration-line",
  "text-decoration-style",
  "text-decoration-color",
  "text-decoration-thickness",
  "text-indent",
  "text-underline-offset",
  "text-transform",
  "text-wrap",
  "text-overflow",
  "text-justify",
  "text-shadow"
];
function text(key, val) {
  if (!textMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (positionMap.includes(value)) return `${important}text-${value}`;
  if (key === "text-decoration-line") {
    if (value === "none") return `${important}no-underline`;
    return `${important}${value}`;
  }
  if (key === "text-transform") {
    if (value === "none") return `${important}normal-case`;
    return `${important}${value}`;
  }
  if (key.startsWith("text-decoration") || key === "text-indent") return `${important}${key.split("-")[1]}${getVal(value)}`;
  if (key === "text-underline-offset") return `${important}underline-offset-${value}`;
  if ([
    "inherit",
    "initial",
    "revert",
    "unset",
    "revert-layer"
  ].includes(value)) return `${important}text-align-${value}`;
  return `${important}text${getVal(value)}`;
}
var topMap = [
  "top",
  "right",
  "bottom",
  "left",
  "field-sizing",
  "forced-color-adjust",
  "hyphens",
  "gap",
  "gap-x",
  "gap-y"
];
function top(key, val) {
  if (!topMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}${key}${getVal(value)}`;
}
var transformMap = [
  "transform",
  "transform-origin",
  "transform-style"
];
function transform(key, val) {
  if (!transformMap.includes(key)) return;
  const [v, important] = transformImportant(val);
  if (key === "transform-origin") {
    if (isVar(v) || isCalc(v)) return `${important}origin${getVal(v)}`;
    return `${important}origin-${/\d/.test(v) && v.includes(" ") ? `[${joinWithUnderLine(v)}]` : joinWithLine(v)}`;
  }
  if (key === "transform-style") return `${important}transform-${v}`;
  if (val === "none") return `${important}${key}-none`;
  return joinEmpty(v).split(" ").map((v$1) => {
    const matcher = v$1.match(/([a-z]+)(3d)?([A-Z])?\((.*)\)/);
    if (!matcher) return void 0;
    const [_, namePrefix, is3d, nameSuffix, value] = matcher;
    if (nameSuffix) {
      const values = value.replace(/,(?![^()]*\))/g, " ").split(" ");
      if (values.length > 1) return `${important}${namePrefix}-[${nameSuffix.toLowerCase()}-${values.map((v$2) => {
        return isVar(v$2) ? v$2 : getVal(namePrefix === "scale" ? getHundred(v$2) : v$2);
      }).join("_")}]`;
      return `${important}${namePrefix}-${nameSuffix.toLowerCase()}${isVar(values[0]) ? `-[${values[0]}]` : getVal(namePrefix === "scale" ? getHundred(values[0]) : values[0])}`;
    } else {
      const values = value.replace(/,(?![^()]*\))/g, " ").split(" ");
      if (namePrefix === "scale") {
        if (values.length > 1) return `${important}${namePrefix}-[${values.join("_")}]`;
        return `${important}${namePrefix}${isVar(value) || isCalc(value) ? `-[${value}]` : getVal(namePrefix === "scale" ? getHundred(value) : value)}`;
      }
      const [x, y] = values;
      return `${important}${namePrefix}-x${getVal(x)} ${important}${namePrefix}-y${getVal(y ?? x)}`;
    }
  }).filter(Boolean).join(" ");
}
var times = ["transition-delay", "transition-duration"];
var transitionMap = [
  "transition",
  "transition-property",
  "transition-duration",
  "transition-delay",
  "transition-timing-function",
  "transition-behavior"
];
function transition(key, val) {
  if (!transitionMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key === "transition-timing-function") {
    if (value === "linear") return `${important}ease-${value}`;
    return `${important}ease-[${value}]`;
  }
  if (key === "transition") return transformTransition(value, important);
  if (key === "transition-property") {
    if (value.includes("color")) return `${important}transition-color`;
    if (value === "box-shadow") return `${important}transition-shadow`;
    return `${important}transition-${value}`;
  }
  if (key === "transition-behavior") return `${important}transition-${getLastName(value)}`;
  const _val = getVal(value);
  if (_val === `-${value}` && times.includes(key)) {
    let num = value.trim();
    if (num.endsWith("ms")) num = num.replace(/ms$/, "");
    else if (num.endsWith("s")) num = (Number.parseFloat(num.replace(/s$/, "")) * 1e3).toString();
    return `${important}${key.split("-")[1]}-${num}`;
  }
  return `${important}${key.split("-")[1]}${_val}`;
}
function transformTransition(v, important) {
  let hasDuration = false;
  return v.split(" ").map((item) => {
    if (/^\d/.test(item) || /^\.\d/.test(item)) {
      if (hasDuration) return `${important}delay${getVal(item, void 0)}`;
      hasDuration = true;
      return `${important}duration${getVal(item, void 0)}`;
    }
    if (item === "background-color") return `${important}transition-colors`;
    if (/^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(item)) return `${important}ease-[${item}]`;
    else if (item.startsWith("cubic-bezier") || item.startsWith("steps")) return `${important}ease-[${item}]`;
    return `${important}transition${getVal(item)}`;
  }).join(" ");
}
var userMap = ["user-select"];
function user(key, val) {
  if (!userMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}${getLastName(key)}-${value}`;
}
var verticalMap = ["vertical-align"];
function vertical(key, val) {
  if (!verticalMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}align${getVal(value)}`;
}
var whiteMap$1 = ["white-space"];
function white(key, val) {
  if (!whiteMap$1.includes(key)) return;
  const [value, important] = transformImportant(val);
  return `${important}whitespace-${value}`;
}
var willMap = ["will-change"];
var willChangeKeys = {
  "auto": "auto",
  "scroll-position": "scroll",
  "contents": "contents",
  "transform": "transform"
};
function will(key, val) {
  if (!willMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (value in willChangeKeys) return `will-change-${willChangeKeys[value]}${important}`;
  return `${important}${key}-[${joinWithUnderLine(value)}]`;
}
var wordMap = [
  "word-break",
  "word-spacing",
  "word-wrap",
  "overflow-wrap"
];
function word(key, val) {
  if (!wordMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (key.startsWith("word-spacing")) return `${important}word-spacing${getVal(val)}`;
  if (value === "keep-all") return `${important}break-keep`;
  if (value === "break-word") return `${important}break-words`;
  return `${important}break-${getLastName(value)}`;
}
var whiteMap = ["writing-mode"];
function writing(key, val) {
  if (!whiteMap.includes(key)) return;
  const [value, important] = transformImportant(val);
  if (value === "horizontal-tb") return `${important}write-normal`;
  return `${important}write-${value.replace("-rl", "-right").replace("-lr", "-left")}`;
}
var typeMap = {
  animation,
  aspect,
  backface: list,
  caption: list,
  column,
  columns: float,
  break: float,
  empty,
  box,
  writing,
  display,
  float,
  clear: float,
  isolation,
  object,
  overflow,
  overscroll,
  position: display,
  top,
  hyphens: top,
  mask,
  field: top,
  forced: top,
  left: top,
  right: top,
  bottom: top,
  visibility: display,
  z: size,
  flex,
  order: float,
  grid,
  gap: top,
  justify,
  align,
  place,
  padding: transformMargin,
  perspective: float,
  margin: transformMargin,
  width: size,
  min: max,
  max,
  height: size,
  font,
  letter,
  line,
  list,
  text,
  vertical,
  white,
  word,
  content,
  background,
  border,
  outline,
  opacity,
  mix,
  filter,
  backdrop,
  table: list,
  transition,
  transform,
  accent: list,
  appearance: list,
  cursor,
  caret: list,
  pointer: float,
  resize,
  scroll,
  touch: list,
  user,
  will,
  fill: float,
  stroke: list,
  color,
  row
};
var splitReg = /([\w-]+)\s*:\s*([^;]+)/;
function toTailwindcss(css, isRem) {
  var _typeMap$first;
  css = css.replace(browserReg, "");
  const match = css.match(splitReg);
  if (!match) return;
  const [_, key, val] = match;
  const first = getFirstName(key);
  const result = (_typeMap$first = typeMap[first]) === null || _typeMap$first === void 0 ? void 0 : _typeMap$first.call(typeMap, key, val);
  if (result && isRem) return result.replace(/-\[([0-9.]+)px\]/g, (_$1, v) => `-[${+v / 16}rem]`);
  return result;
}

// src/transformToTailwind.ts
var transformToTailwind = (style, isRem) => {
  return Object.entries(style).map(
    ([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, "").replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1).trim()}`
  ).map((str) => toTailwindcss(str, isRem)).join(" ");
};
var transformToTailwind_default = transformToTailwind;

// package.json
var version = "0.0.2";

// src/index.ts
console.log("tailwind plugin version", version);
var index_default = definePlugin({
  name: "Tailwind",
  code: {
    css: {
      title: "Tailwind",
      // Custom code block title
      lang: "css",
      // Custom syntax highlighting language
      transform({ style, options }) {
        return transformToTailwind_default(style, options == null ? void 0 : options.useRem);
      }
    },
    js: false
    // Hides the built-in JavaScript code block
  }
});

export { index_default as default };

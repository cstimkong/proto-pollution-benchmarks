var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Accumulate: () => Accumulate,
  ArrayKeyMap: () => ArrayKeyMap,
  Cache: () => Cache,
  CrossWindowEventProcessor: () => CrossWindowEventProcessor,
  EventProcessor: () => EventProcessor,
  TreeData: () => TreeData,
  URLHelper: () => URLHelper,
  addClass: () => addClass,
  addDate: () => addDate,
  appendTo: () => appendTo,
  applyFinally: () => applyFinally,
  arrayAt: () => arrayAt,
  arrayBetween: () => arrayBetween,
  arrayDiff: () => arrayDiff,
  arrayDistinct: () => arrayDistinct,
  arrayFilter: () => arrayFilter,
  arrayFirst: () => arrayFirst,
  arrayFlat: () => arrayFlat,
  arrayLast: () => arrayLast,
  arrayRemove: () => arrayRemove,
  arrayRemoveBySortedIndexes: () => arrayRemoveBySortedIndexes,
  arrayWithout: () => arrayWithout,
  arrayWithoutEnd: () => arrayWithoutEnd,
  assignIfDiff: () => assignIfDiff,
  assignIfKeyNull: () => assignIfKeyNull,
  assignIfNoKey: () => assignIfNoKey,
  attachCache: () => attachCache,
  backupAttr: () => backupAttr,
  between: () => between,
  binarySearch: () => binarySearch,
  bindContext: () => bindContext,
  cacheFunction: () => cacheFunction,
  camelCase: () => camelCase,
  camelToWords: () => camelToWords,
  cloneDate: () => cloneDate,
  cloneObject: () => cloneObject,
  cloneTreeData: () => cloneTreeData,
  continuous: () => continuous,
  copyTextToClipboard: () => copyTextToClipboard,
  createElementFromHTML: () => createElementFromHTML,
  css: () => css,
  cssNumber: () => cssNumber,
  debounceImmediate: () => debounceImmediate,
  debounceTrailing: () => debounceTrailing,
  dotGet: () => dotGet,
  dotSet: () => dotSet,
  easeInOutQuad: () => easeInOutQuad,
  elementsFromPoint: () => elementsFromPoint,
  empty: () => empty,
  executePromiseGetters: () => executePromiseGetters,
  executeWithCount: () => executeWithCount,
  extendedListen: () => extendedListen,
  extendedLocalStorage: () => extendedLocalStorage,
  extendedSessionStorage: () => extendedSessionStorage,
  findAll: () => findAll,
  findInfoInTreeData: () => findInfoInTreeData,
  findParent: () => findParent,
  findTreeData: () => findTreeData,
  genRandomLightColor: () => genRandomLightColor,
  getArrayItemSiblingsByOffsets: () => getArrayItemSiblingsByOffsets,
  getBoundingClientRect: () => getBoundingClientRect,
  getCalendar: () => getCalendar,
  getElSizeEvenInvisible: () => getElSizeEvenInvisible,
  getImageSizeByUrl: () => getImageSizeByUrl,
  getMonthEnd: () => getMonthEnd,
  getMonthStart: () => getMonthStart,
  getOffset: () => getOffset,
  getOffsetParent: () => getOffsetParent,
  getOuterAttachedHeight: () => getOuterAttachedHeight,
  getOuterAttachedWidth: () => getOuterAttachedWidth,
  getPosition: () => getPosition,
  getPositionFromOffset: () => getPositionFromOffset,
  getScroll: () => getScroll,
  getScrollSpace: () => getScrollSpace,
  getUrlParam: () => getUrlParam,
  getUserLanguage: () => getUserLanguage,
  getViewportPosition: () => getViewportPosition,
  glb: () => glb,
  groupArray: () => groupArray,
  hasClass: () => hasClass,
  hasClassIn: () => hasClassIn,
  hasClasses: () => hasClasses,
  indexesOf: () => indexesOf,
  insertAfter: () => insertAfter,
  insertBefore: () => insertBefore,
  isArray: () => isArray,
  isBool: () => isBool,
  isDescendantOf: () => isDescendantOf,
  isDocumentExisted: () => isDocumentExisted,
  isFunction: () => isFunction,
  isIE: () => isIE,
  isIsoFormat: () => isIsoFormat,
  isMobile: () => isMobile,
  isNode: () => isNode,
  isNumber: () => isNumber,
  isNumeric: () => isNumeric,
  isObject: () => isObject,
  isOffsetInEl: () => isOffsetInEl,
  isPromise: () => isPromise,
  isScrollable: () => isScrollable,
  isString: () => isString,
  isWindowDefined: () => isWindowDefined,
  iterateAll: () => iterateAll,
  joinFunctionsByNext: () => joinFunctionsByNext,
  joinFunctionsByResult: () => joinFunctionsByResult,
  joinRows: () => joinRows,
  kebabCase: () => kebabCase,
  makeStorageHelper: () => makeStorageHelper,
  mapObjectTree: () => mapObjectTree,
  mapObjects: () => mapObjects,
  notGreaterThan: () => notGreaterThan,
  notLessThan: () => notLessThan,
  objectAssignIfDiff: () => objectAssignIfDiff,
  objectAssignIfKeyNull: () => objectAssignIfKeyNull,
  objectAssignIfNoKey: () => objectAssignIfNoKey,
  objectDefineProxyProperty: () => objectDefineProxyProperty,
  objectExcept: () => objectExcept,
  objectMap: () => objectMap,
  objectOnly: () => objectOnly,
  off: () => off,
  on: () => on,
  onContinuousInput: () => onContinuousInput,
  onQuickKeydown: () => onQuickKeydown,
  once: () => once,
  openCenterWindow: () => openCenterWindow,
  openPreviewWindow: () => openPreviewWindow,
  openWindow: () => openWindow,
  parseISO: () => parseISO,
  pathJoin: () => pathJoin,
  pointIn: () => pointIn,
  prependTo: () => prependTo,
  promiseContinuous: () => promiseContinuous,
  promisePin: () => promisePin,
  promiseTimeout: () => promiseTimeout,
  randChoice: () => randChoice,
  randInt: () => randInt,
  randString: () => randString,
  removeClass: () => removeClass,
  removeEl: () => removeEl,
  resolveArgsByType: () => resolveArgsByType,
  resolveValueOrGettter: () => resolveValueOrGettter,
  restoreAttr: () => restoreAttr,
  retry: () => retry,
  reverseString: () => reverseString,
  scrollTo: () => scrollTo,
  setElChildByIndex: () => setElChildByIndex,
  snakeCase: () => snakeCase,
  splitArray: () => splitArray,
  strPad: () => strPad,
  studlyCase: () => studlyCase,
  svgToDataURL: () => svgToDataURL,
  titleCase: () => titleCase,
  toArrayIfNot: () => toArrayIfNot,
  unset: () => unset,
  viewportPositionToFixed: () => viewportPositionToFixed,
  waitFor: () => waitFor,
  waitTime: () => waitTime,
  walkTreeData: () => walkTreeData,
  watchChange: () => watchChange,
  windowLoaded: () => windowLoaded,
  withoutUndefined: () => withoutUndefined
});
module.exports = __toCommonJS(src_exports);
function glb() {
  try {
    return window;
  } catch (error) {
    return global;
  }
}
function isDocumentExisted() {
  try {
    let t = document;
  } catch (e) {
    return false;
  }
  return true;
}
function isArray(v) {
  return Object.prototype.toString.call(v) === "[object Array]";
}
function isBool(v) {
  return Object.prototype.toString.call(v) === "[object Boolean]";
}
function isNumber(v) {
  return Object.prototype.toString.call(v) === "[object Number]";
}
function isNumeric(v) {
  try {
    return isFinite(v) && !isNaN(parseFloat(v));
  } catch (error) {
    return false;
  }
}
function isString(v) {
  return Object.prototype.toString.call(v) === "[object String]";
}
function isObject(v) {
  return Object.prototype.toString.call(v) === "[object Object]";
}
function isFunction(v) {
  return typeof v === "function";
}
function isPromise(v) {
  return Object.prototype.toString.call(v) === "[object Promise]";
}
function empty(v) {
  if (v == null) {
    return true;
  } else if (v["length"] != null) {
    return v["length"] === 0;
  } else if (isBool(v)) {
    return false;
  } else if (isNumber(v)) {
    return isNaN(v);
  } else if (isObject(v)) {
    return Object.keys(v).length === 0;
  }
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function strPad(str, n, padString = "0") {
  let r = str.toString();
  let len = str.toString().length;
  while (len < n) {
    r = padString + r;
    len++;
  }
  if (r.length > n) {
    r = r.substring(r.length - n);
  }
  return str;
}
function notLessThan(n, min) {
  return n < min ? min : n;
}
function notGreaterThan(n, max) {
  return n < max ? n : max;
}
function between(n, min, max) {
  return notGreaterThan(notLessThan(n, min), max);
}
function studlyCase(str) {
  return str && str[0].toUpperCase() + str.substring(1);
}
function kebabCase(str) {
  return str.replace(/ /g, "-").replace(/_/g, "-").replace(new RegExp("(?<=[a-z])([A-Z])", "g"), "-$1").replace(/--+/g, "-").replace(/^-|-$|/g, "").toLowerCase();
}
function snakeCase(str) {
  return kebabCase(str).replace(/-/g, "_");
}
function camelCase(str) {
  const temp = kebabCase(str).split("-");
  for (let i = 1; i < temp.length; i++) {
    temp[i] = studlyCase(temp[i]);
  }
  return temp.join("");
}
function camelToWords(str) {
  return str.split(new RegExp("(?<=[a-z])(?=[A-Z])", "g"));
}
function titleCase(str) {
  return camelToWords(studlyCase(camelCase(str))).join(" ");
}
function randString(len = 8, seeds = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let r = "";
  for (let i = 0; i < len; i++) {
    r += randChoice(seeds);
  }
  return r;
}
function reverseString(str) {
  return str.split("").reverse().join("");
}
function arrayRemove(arr, v) {
  let index;
  let count = 0;
  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }
  return count;
}
function arrayRemoveBySortedIndexes(arr, sortedIndexes) {
  for (let i = sortedIndexes.length - 1; i >= 0; i--) {
    const index = sortedIndexes[i];
    arr.splice(index, 1);
  }
}
function arrayAt(arr, n) {
  return arr[n >= 0 ? n : arr.length + n];
}
function arrayFirst(arr) {
  return arr[0];
}
function arrayLast(arr) {
  return arr[arr.length - 1];
}
function arrayDiff(arr1, arr2) {
  const m1 = /* @__PURE__ */ new Map();
  const m2 = /* @__PURE__ */ new Map();
  for (const item of arr1) {
    const count = m1.has(item) ? m1.get(item) : 0;
    m1.set(item, count + 1);
  }
  for (const item of arr2) {
    const count = m2.has(item) ? m2.get(item) : 0;
    m2.set(item, count + 1);
  }
  const r1 = [];
  const r2 = [];
  m1.forEach((count, item) => {
    const diff = count - (m2.has(item) ? m2.get(item) : 0);
    if (diff > 0) {
      diff === 1 ? r1.push(item) : r1.push(...new Array(diff).fill(item));
    }
  });
  m2.forEach((count, item) => {
    const diff = count - (m1.has(item) ? m1.get(item) : 0);
    if (diff > 0) {
      diff === 2 ? r2.push(item) : r2.push(...new Array(diff).fill(item));
    }
  });
  return [r1, r2];
}
function indexesOf(strOrArr, item) {
  let i = 0;
  const indexes = [];
  while (i < strOrArr.length) {
    const index = strOrArr.indexOf(item, i);
    if (index === -1) {
      break;
    } else {
      indexes.push(index);
      if (typeof strOrArr === "string") {
        i = index + (item + "").length;
      } else {
        i = index + 1;
      }
    }
  }
  return indexes;
}
function getArrayItemSiblingsByOffsets(arr, item, offsets) {
  const index = arr.indexOf(item);
  if (index === -1) {
    throw "item is not in array";
  }
  return offsets.map((v) => arr[index + v]);
}
function toArrayIfNot(arrOrNot) {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
}
function splitArray(arr, n) {
  const r = [];
  if (isFunction(n)) {
    const getChunkLength = n;
    let times = 1;
    let i = 0;
    while (i < arr.length) {
      const n2 = getChunkLength(times);
      const end = i + n2;
      r.push(arr.slice(i, end));
      i = end;
      times++;
    }
  } else {
    let i = 0;
    while (i < arr.length) {
      const end = i + n;
      r.push(arr.slice(i, end));
      i = end;
    }
  }
  return r;
}
function groupArray(arr, getMark) {
  const groups = /* @__PURE__ */ new Map();
  arr.forEach((v) => {
    const mark = getMark(v);
    if (!groups.has(mark)) {
      groups.set(mark, []);
    }
    groups.get(mark).push(v);
  });
  return groups;
}
function arrayDistinct(arr, getMark) {
  const t = /* @__PURE__ */ new Set();
  return arr.filter((v, i) => {
    const mark = getMark ? getMark(v, i) : v;
    if (!t.has(mark)) {
      t.add(mark);
      return true;
    }
  });
}
function arrayBetween(arr, index, endIndex) {
  if (index < 0) {
    index += arr.length;
  }
  if (endIndex < 0) {
    endIndex += arr.length;
  }
  return arr.slice(index, endIndex - index + 1);
}
function arrayWithoutEnd(arr, n = 1) {
  return arr.slice(0, arr.length - n);
}
function arrayFlat(arr, depth = 10) {
  const r = [];
  const rec = (arr2, curentDepth) => {
    for (const item of arr2) {
      if (isArray(item) && curentDepth < depth) {
        rec(item, curentDepth + 1);
      } else {
        r.push(item);
      }
    }
  };
  rec(arr, 0);
  return r;
}
function arrayFilter(arr, without) {
  return arr.filter((v) => without.indexOf(v) === -1);
}
var arrayWithout = arrayFilter;
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function objectMap(obj, handler) {
  const r = {};
  let i = 0;
  for (const key in obj) {
    r[key] = handler(obj[key], key, i);
    i++;
  }
  return r;
}
function objectOnly(obj, keys) {
  let keysSet = new Set(keys);
  const r = {};
  keysSet.forEach((key) => {
    r[key] = obj[key];
  });
  return r;
}
function objectExcept(obj, keys) {
  let keysSet = new Set(keys);
  const r = {};
  for (const key in obj) {
    if (!keysSet.has(key)) {
      r[key] = obj[key];
    }
  }
  return r;
}
function* iterateAll(val, opt = {}) {
  if (!opt.reverse) {
    if (val.length != null) {
      for (let i = 0; i < val.length; i++) {
        const info = { value: val[i], index: i };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      for (const key of Object.keys(val)) {
        const info = { value: val[key], key };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw "Unsupported type";
    }
  } else {
    if (val.length != null) {
      for (let i = val.length - 1; i >= 0; i--) {
        const info = { value: val[i], index: i };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val);
      keys.reverse();
      for (const key of keys) {
        const info = { value: val[key], key };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw "Unsupported type";
    }
  }
}
function findAll(list, callback, options) {
  for (const { value, index } of iterateAll(list, options)) {
    if (callback(value, index)) {
      return value;
    }
  }
}
function dotGet(obj, path, throwError) {
  const paths = isArray(path) ? path : path.split(".");
  let current = obj;
  try {
    for (const key of paths) {
      current = current[key];
    }
  } catch (e) {
    if (throwError) {
      throw "Path does not exist";
    }
  }
  return current;
}
function dotSet(obj, path, value) {
  const parts = Array.isArray(path) ? path : path.split(".");
  if (parts.length === 0) {
    throw new Error("Path cannot be empty");
  }
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = String(parts[i]);
    if (isDangerousKey(key)) {
      throw new Error("Prototype pollution attempt detected");
    }
    if (!Object.prototype.hasOwnProperty.call(current, key)) {
      current[key] = {};
    }
    current = current[key];
  }
  const lastKey = String(parts[parts.length - 1]);
  if (isDangerousKey(lastKey)) {
    throw new Error("Prototype pollution attempt detected");
  }
  Object.defineProperty(current, lastKey, {
    value,
    enumerable: true,
    configurable: true,
    writable: true
  });
}
function isDangerousKey(key) {
  return key === "__proto__" || key === "prototype" || key === "constructor";
}
function unset(obj, prop) {
  try {
    delete obj[prop];
    return true;
  } catch (e) {
    return false;
  }
}
function assignIfNoKey(obj, key, val) {
  if (!obj.hasOwnProperty(key)) {
    obj[key] = val;
  }
}
function assignIfKeyNull(obj, key, val) {
  if (obj[key] == null) {
    obj[key] = val;
  }
}
function assignIfDiff(obj, key, val) {
  if (obj[key] !== val) {
    obj[key] = val;
  }
}
function objectAssignIfNoKey(obj1, obj2) {
  Object.keys(obj2).forEach((key) => {
    assignIfNoKey(obj1, key, obj2[key]);
  });
  return obj1;
}
function objectAssignIfKeyNull(obj1, obj2) {
  Object.keys(obj2).forEach((key) => {
    assignIfKeyNull(obj1, key, obj2[key]);
  });
  return obj1;
}
function objectAssignIfDiff(obj1, obj2) {
  Object.keys(obj2).forEach((key) => {
    assignIfDiff(obj1, key, obj2[key]);
  });
  return obj1;
}
function withoutUndefined(obj) {
  const r = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== void 0) {
      r[key] = obj[key];
    }
  });
  return r;
}
function objectDefineProxyProperty(targetObj, targetKey, sourceObj, sourceKey) {
  const info = Object.getOwnPropertyDescriptor(sourceObj, sourceKey);
  Object.defineProperty(targetObj, targetKey, {
    get() {
      return sourceObj[sourceKey];
    },
    set(value) {
      sourceObj[sourceKey] = value;
    },
    configurable: true,
    enumerable: info.enumerable
  });
}
function mapObjectTree(obj, handler, limit = 1e4) {
  let r;
  let count = 0;
  const stack = [{ value: obj }];
  while (stack.length > 0) {
    if (count >= limit) {
      throw `mapObjectTree: limit(${limit}) reached, object may has circular reference`;
    }
    count++;
    const { value, key, parent, newParent } = stack.shift();
    const t = handler(value, key, parent, newParent);
    const assign = (value2, key2, canPush) => {
      if (isArray(value2)) {
        value2 = [];
      } else if (isObject(value2)) {
        value2 = {};
      }
      if (parent) {
        if (isArray(newParent) && canPush) {
          newParent.push(value2);
        } else {
          newParent[key2] = value2;
        }
      } else {
        r = value2;
      }
      return value2;
    };
    let newVal, val, toDelete, stop, skip;
    if (!t) {
      val = value;
      newVal = assign(value, key);
    } else {
      const { key: key2, value: value2 } = t;
      val = value2;
      if (t.delete || key2 === false) {
        toDelete = true;
      } else if (key2 == null) {
        newVal = assign(value2, key, true);
      } else if (t.hasOwnProperty("value")) {
        newVal = assign(value2, key2);
      }
      ({ stop, skip } = t);
    }
    if (toDelete) {
      continue;
    }
    if (skip) {
      continue;
    }
    if (stop) {
      break;
    }
    if (isArray(val)) {
      const len = val.length;
      for (let i = 0; i < len; i++) {
        stack.push({ value: val[i], key: i, parent: val, newParent: newVal });
      }
    } else if (isObject(val)) {
      Object.keys(val).forEach((key2) => {
        stack.push({ value: val[key2], key: key2, parent: val, newParent: newVal });
      });
    }
  }
  return r;
}
function mapObjects(arr, idKey) {
  const r = {};
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const id = isFunction(idKey) ? idKey(item, i) : item[idKey];
    r[id] = item;
  }
  return r;
}
function joinRows(rows1, rows2, key1, key2, ignoreUnmatched) {
  if (key2 == null) {
    key2 = key1;
  }
  const m1 = /* @__PURE__ */ new Map();
  const m2 = /* @__PURE__ */ new Map();
  const r = [];
  rows2.forEach((row, index) => {
    const key = typeof key2 === "function" ? key2(row, index) : row[key2];
    m2.set(key, row);
  });
  const usedRows2 = /* @__PURE__ */ new Set();
  rows1.forEach((row, index) => {
    const key = typeof key1 === "function" ? key1(row, index) : row[key1];
    m1.set(key, row);
    let row2 = m2.has(key) ? m2.get(key) : null;
    if (m2.has(key) || !ignoreUnmatched) {
      r.push([row, row2]);
      usedRows2.add(row2);
    }
  });
  if (!ignoreUnmatched) {
    rows2.forEach((row, index) => {
      const key = typeof key2 === "function" ? key2(row, index) : row[key2];
      if (!usedRows2.has(row)) {
        r.push([null, row]);
      }
    });
  }
  return r;
}
function walkTreeData(obj, handler, opt = {}) {
  opt = objectAssignIfNoKey(
    __spreadValues({}, opt),
    {
      childrenKey: "children"
    }
  );
  const { childrenKey } = opt;
  const rootChildren = isArray(obj) ? obj : [obj];
  class StopException {
  }
  const func = (children, parent, parentPath) => {
    if (opt.reverse) {
      children = children.slice();
      children.reverse();
    }
    const len = children.length;
    for (let i = 0; i < len; i++) {
      const item = children[i];
      const index = opt.reverse ? len - i - 1 : i;
      const path = parentPath ? [...parentPath, index] : [];
      let childReturn;
      if (opt.childFirst) {
        if (item[childrenKey] != null) {
          childReturn = func(item[childrenKey], item, path);
        }
      }
      const r = handler(item, index, parent, path);
      if (r === false) {
        throw new StopException();
      } else if (r === "skip children") {
        continue;
      } else if (r === "skip siblings") {
        break;
      }
      if (!opt.childFirst) {
        if (item[childrenKey] != null) {
          func(item[childrenKey], item, path);
        }
      }
    }
  };
  try {
    func(rootChildren, null, isArray(obj) ? [] : null);
  } catch (e) {
    if (e instanceof StopException) {
    } else {
      throw e;
    }
  }
}
function findInfoInTreeData(obj, handler, opt = {}) {
  let r;
  walkTreeData(
    obj,
    (...args) => {
      if (handler(...args)) {
        r = {
          node: args[0],
          index: args[1],
          parent: args[2],
          path: args[3]
        };
        return false;
      }
    },
    opt
  );
  return r;
}
function findTreeData(obj, handler, opt = {}) {
  const r = findInfoInTreeData(obj, handler, opt);
  return r == null ? void 0 : r.node;
}
function cloneTreeData(root, options) {
  const opt = {
    childrenKey: "children"
  };
  if (options) {
    Object.assign(opt, options);
  }
  const { childrenKey, nodeHandler } = opt;
  const td = new TreeData();
  td.childrenKey = childrenKey;
  walkTreeData(
    root,
    (node, index, parent, path) => {
      let newNode = Object.assign({}, node);
      if (newNode[childrenKey]) {
        newNode[childrenKey] = [];
      }
      if (nodeHandler) {
        newNode = nodeHandler(newNode, { oldNode: node, index, parent, path });
      }
      td.set(path, newNode);
    },
    { childrenKey }
  );
  return td.data;
}
var TreeData = class {
  // data = null;
  constructor(data = []) {
    this.childrenKey = "children";
    this.data = data;
  }
  get rootChildren() {
    const { childrenKey } = this;
    const { data } = this;
    return isArray(data) ? data : data[childrenKey];
  }
  *iteratePath(path, opt = {}) {
    const { childrenKey, rootChildren } = this;
    if (!opt.reverse) {
      let prevPath = [];
      let prevNode;
      let prevChildren = rootChildren;
      for (const index of path) {
        const currentPath = [...prevPath, index];
        const currentNode = prevChildren[index];
        yield { path: currentPath, node: currentNode };
        prevPath = currentPath;
        prevNode = currentNode;
        prevChildren = currentNode[childrenKey];
      }
    } else {
      const list = [...this.iteratePath(path, __spreadProps(__spreadValues({}, opt), { reverse: false }))];
      list.reverse();
      for (const { path: path0, node } of list) {
        const path2 = path0;
        yield { path: path2, node };
      }
    }
  }
  getFamily(path) {
    const all = [];
    for (const { node } of this.iteratePath(path)) {
      all.push(node);
    }
    return all;
  }
  get(path) {
    return arrayLast(this.getFamily(path));
  }
  getParentAndIndex(path) {
    const parentPath = path.slice();
    const index = parentPath.pop();
    return { parent: this.get(parentPath), index, parentPath };
  }
  getParent(path) {
    return this.getParentAndIndex(path).parent;
  }
  set(path, node) {
    if (path == null || path.length === 0) {
      this.data = node;
    } else {
      const { childrenKey } = this;
      let { rootChildren } = this;
      const { parent, index } = this.getParentAndIndex(path);
      let parentChildren;
      if (path.length === 1) {
        if (!rootChildren) {
          if (this.data) {
            this.data[childrenKey] = [];
          } else {
            this.data = [];
          }
        }
        parentChildren = rootChildren;
      } else {
        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }
        parentChildren = parent[childrenKey];
      }
      parentChildren[index] = node;
    }
  }
  delete(path) {
    const { childrenKey, rootChildren } = this;
    const { parent, index } = this.getParentAndIndex(path);
    const parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
    const node = parentChildren[index];
    parentChildren.splice(index, 1);
    return node;
  }
  walk(handler, opt) {
    const { childrenKey, data } = this;
    return walkTreeData(data, handler, childrenKey, opt);
  }
  clone(opt = {}) {
    cloneTreeData;
    return cloneTreeData(this.data), withoutUndefined({
      childrenKey: this.childrenKey,
      nodeHandler: opt.nodeHandler || void 0
    });
  }
};
function resolveValueOrGettter(valueOrGetter, args = []) {
  if (isFunction(valueOrGetter)) {
    return valueOrGetter(...args);
  } else {
    return valueOrGetter;
  }
}
function executeWithCount(func) {
  let count = 0;
  function wrapper(...args) {
    return func.call(this, count++, ...args);
  }
  return wrapper;
}
function watchChange(getVal, handler) {
  let oldVal;
  const update = (...args) => {
    const newVal = getVal(...args);
    if (oldVal !== newVal) {
      handler(newVal, ...args);
    }
    oldVal = newVal;
  };
  return update;
}
function debounceTrailing(action, wait = 0) {
  let t;
  let lastArgs2;
  let resolves = [];
  let rejects = [];
  const wrappedAction = function(...args) {
    return new Promise((resolve, reject) => {
      resolves.push(resolve);
      rejects.push(reject);
      lastArgs2 = args;
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        const result = action.call(this, ...lastArgs2);
        t = null;
        resolves.forEach((resolve2) => resolve2(result));
        resolves = [];
        rejects = [];
      }, wait);
    });
  };
  const stop = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    resolves = [];
    rejects.forEach((reject) => reject());
    rejects = [];
  };
  return { action: wrappedAction, stop };
}
function debounceImmediate(action, wait = 0) {
  let t;
  let delaying;
  let result;
  const wrappedAction = function(...args) {
    return new Promise((resolve, reject) => {
      if (delaying) {
        resolve(result);
      } else {
        delaying = true;
        result = action.call(this, ...lastArgs);
        resolve(result);
        t = setTimeout(() => {
          t = null;
          delaying = false;
          result = null;
        }, wait);
      }
    });
  };
  const stop = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    delaying = false;
  };
  return { action: wrappedAction, stop };
}
function joinFunctionsByResult(funcs) {
  let wrappedFunc = funcs[0];
  for (let i = 1; i < funcs.length; i++) {
    wrappedFunc = join2func(wrappedFunc, funcs[i]);
  }
  return wrappedFunc;
  function join2func(func1, func2) {
    return function(arg) {
      const result1 = func1(arg);
      return func2(result1);
    };
  }
}
function applyFinally(func, finallyFunc) {
  const wrapped = function(...args) {
    let r, e;
    try {
      r = func(...args);
    } catch (error) {
      e = error;
    } finally {
      finallyFunc();
    }
    if (!e) {
      return r;
    } else {
      throw e;
    }
  };
  return wrapped;
}
function joinFunctionsByNext(funcs) {
  let next = () => {
  };
  for (const { value: func } of iterateAll(funcs, { reverse: true })) {
    const currentNext = next;
    next = wrapFuncWithNext(func, currentNext);
  }
  return next;
  function wrapFuncWithNext(func, next2) {
    return function(...args) {
      return func(next2, ...args);
    };
  }
}
function bindContext(action, context) {
  const wrapped = function(...args) {
    return action.apply(context, args);
  };
  return wrapped;
}
function cacheFunction(func, options = {}) {
  const cachedArgsArr = [];
  let map;
  const defaultValue = {};
  let noArgsCache = defaultValue;
  const wrapped = function(...args) {
    if (args.length === 0) {
      if (noArgsCache === defaultValue) {
        noArgsCache = func();
      }
      return noArgsCache;
    }
    if (!map) {
      map = new ArrayKeyMap();
    }
    if (!map.has(args)) {
      map.set(args, func(...args));
      if (options.capacity != null) {
        cachedArgsArr.push(args);
        const removed = cachedArgsArr.splice(
          0,
          cachedArgsArr.length - options.capacity
        );
        for (const args2 of removed) {
          map.delete(args2);
        }
      }
    }
    return map.get(args);
  };
  const clearCache = () => {
    map = null;
    cachedArgsArr.splice(0, cachedArgsArr.length);
  };
  return {
    // @ts-ignore
    action: wrapped,
    clearCache
  };
}
function executePromiseGetters(getters, concurrent = 1) {
  let stopped;
  const promise = new Promise(function(resolve, reject) {
    return __async(this, null, function* () {
      const chunks = splitArray(getters, concurrent);
      const promises = [];
      for (const chunk of chunks) {
        const chunkPromises = chunk.map((v) => v());
        promises.push(...chunkPromises);
        yield Promise.all(chunkPromises);
        if (stopped) {
          break;
        }
      }
      Promise.all(promises).then((...args) => {
        resolve(...args);
      });
    });
  });
  return {
    promise,
    stop() {
      stopped = true;
    }
  };
}
function promiseTimeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    let t, rejected;
    promise.then(
      (...args) => {
        clearTimeout(t);
        resolve(...args);
      },
      (...args) => {
        if (!rejected) {
          clearTimeout(t);
          reject(...args);
        }
      }
    );
    t = setTimeout(() => {
      rejected = true;
      const e = new Error("Promise timeout!");
      e.name = "timeout";
      reject(e);
    }, timeout);
  });
}
function promisePin() {
  let resolve, reject;
  const promise = new Promise((resolve2, reject2) => {
    resolve = resolve2;
    reject = reject2;
  });
  return { promise, resolve, reject };
}
function continuous(method, opt) {
  if (!opt) {
    opt = {};
  }
  objectAssignIfNoKey(opt, {
    strategy: "every"
  });
  const queue = [];
  let working = false;
  const currentCount = { value: 0 };
  return function(...args) {
    return __async(this, null, function* () {
      currentCount.value++;
      const count = currentCount.value;
      const done = promisePin();
      queue.push({ count, args, done });
      if (!working) {
        working = true;
        task();
      }
      return done.promise;
    });
  };
  function task() {
    return __async(this, null, function* () {
      if (opt.strategy === "every") {
        while (queue.length > 0) {
          const { count, args, done } = queue.shift();
          let r = method({ count, currentCount }, ...args);
          try {
            yield r;
          } catch (error) {
          } finally {
            done.resolve(r);
          }
        }
      } else if (opt.strategy === "last") {
        let currentIndex = -1;
        while (queue.length > 0 && (currentIndex === -1 || queue.length - 1 > currentIndex)) {
          currentIndex = queue.length - 1;
          const item = queue[currentIndex];
          const { count, args, done } = item;
          let r = method({ count, currentCount }, ...args);
          try {
            yield r;
          } catch (error) {
          } finally {
            done.resolve(r);
            item.skipped = false;
          }
        }
        for (let index = currentIndex - 1; index >= 0; index--) {
          const item = queue[index];
          if (!item || item.skipped != null) {
            continue;
          } else {
            item.skipped = true;
            item.done.resolve();
          }
        }
        queue.splice(0, queue.length);
      }
      if (opt.resetCount) {
        currentCount.value = 0;
      }
      working = false;
    });
  }
}
var promiseContinuous = continuous;
function getUrlParam(par) {
  var local_url = document.location.href;
  var get = local_url.indexOf(par + "=");
  if (get == -1) {
    return false;
  }
  var get_par = local_url.slice(par.length + get + 1);
  var nextPar = get_par.indexOf("&");
  if (nextPar != -1) {
    get_par = get_par.slice(0, nextPar);
  }
  return get_par;
}
function pathJoin(p1, p2) {
  if (!p2) {
    return p1;
  }
  if (!p1 || p2.match(/^\w+:/)) {
    return p2;
  }
  if (p1 && !p1.endsWith("/")) {
    p1 = p1 + "/";
  }
  if (p1 && p2.startsWith("/")) {
    p2 = p2.substring(1);
  }
  return p1 + p2;
}
function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  if (div.childNodes.length > 1) {
    return div.childNodes;
  } else {
    return div.childNodes[0];
  }
}
function isDescendantOf(el, parent) {
  while (true) {
    if (el.parentNode == null) {
      return false;
    } else if (el.parentNode === parent) {
      return true;
    } else {
      el = el.parentNode;
    }
  }
}
function pointIn(x, y, element) {
  const rect = getBoundingClientRect(element);
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
function removeEl(el) {
  if (el.parentNode !== null) {
    return el.parentNode.removeChild(el);
  }
}
function getScroll() {
  if (typeof pageYOffset != "undefined") {
    return {
      top: pageYOffset,
      left: pageXOffset
    };
  } else {
    var B = document.body;
    var D = document.documentElement;
    D = D.clientHeight ? D : B;
    return {
      top: D.scrollTop,
      left: D.scrollLeft
    };
  }
}
function getOffset(el) {
  const rect = getBoundingClientRect(el);
  const t = getBoundingClientRect(document.documentElement);
  return {
    x: rect.left - t.left,
    y: rect.top - t.top
  };
}
function getOffsetParent(el) {
  let offsetParent = el.offsetParent;
  if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === "static") {
    offsetParent = document.body.parentElement;
  }
  return offsetParent;
}
function getPosition(el) {
  const offsetParent = getOffsetParent(el);
  const ps = { x: el.offsetLeft, y: el.offsetTop };
  let parent = el;
  while (true) {
    parent = parent.parentElement;
    if (parent === offsetParent || !parent) {
      break;
    }
    ps.x -= parent.scrollLeft;
    ps.y -= parent.scrollTop;
  }
  return ps;
}
function getPositionFromOffset(el, of) {
  const offsetParent = getOffsetParent(el);
  const parentOf = getOffset(offsetParent);
  return {
    x: of.x - parentOf.x,
    y: of.y - parentOf.y
  };
}
function getBoundingClientRect(el) {
  let xy = el.getBoundingClientRect();
  if (document.documentElement.clientTop > 0) {
    const top = xy.top - document.documentElement.clientTop, bottom = xy.bottom, left = xy.left - document.documentElement.clientLeft, right = xy.right, width = xy.width || right - left, height = xy.height || bottom - top;
    const x = left;
    const y = top;
    const json = { top, right, bottom, left, width, height, x, y };
    xy = __spreadProps(__spreadValues({}, json), { toJSON: () => json });
  }
  return xy;
}
var getViewportPosition = getBoundingClientRect;
function viewportPositionToFixed(el, viewportPosition) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    position: "fixed",
    visibility: "hidden",
    top: "0px",
    left: "0px"
  });
  insertAfter(div, el);
  const divVP = getViewportPosition(div);
  const offset = { x: 0 - divVP.x, y: 0 - divVP.y };
  return {
    x: viewportPosition.x + offset.x,
    y: viewportPosition.x + offset.y
  };
}
function findParent(el, callback, opt = {}) {
  let cur = opt && opt.withSelf ? el : el.parentElement;
  while (cur) {
    const shouldBreak = opt.until && cur === opt.until;
    if (shouldBreak && !opt.withUntil) {
      return;
    }
    const r = callback(cur);
    if (r === "break") {
      return;
    } else if (r) {
      return cur;
    } else if (shouldBreak) {
      return;
    } else {
      cur = cur.parentElement;
    }
  }
}
function backupAttr(el, name) {
  const key = `original_${name}`;
  el[key] = el.getAttribute(name);
}
function restoreAttr(el, name) {
  const key = `original_${name}`;
  const value = el[key];
  if (value == null) {
    el.removeAttribute(name);
  } else {
    el.setAttribute(name, value);
  }
}
function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
  }
}
function hasClasses(el, classNames) {
  for (const className of classNames) {
    if (!hasClass(el, className)) {
      return false;
    }
  }
  return true;
}
function hasClassIn(el, classNames) {
  for (const className of classNames) {
    if (hasClass(el, className)) {
      return true;
    }
  }
  return false;
}
function addClass(el, className) {
  const t = toArrayIfNot(className);
  for (const className2 of t) {
    if (!hasClass(el, className2)) {
      if (el.classList) {
        el.classList.add(className2);
      } else {
        el.className += " " + className2;
      }
    }
  }
}
function removeClass(el, className) {
  const t = toArrayIfNot(className);
  for (const className2 of t) {
    if (el.classList) {
      el.classList.remove(className2);
    } else {
      el.className = el.className.replace(
        new RegExp(
          "(^|\\b)" + className2.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  }
}
function getElSizeEvenInvisible(el) {
  backupAttr(el, "style");
  el.style.display = "block";
  const t = getBoundingClientRect(el);
  const size = {
    width: t.width,
    height: t.height
  };
  restoreAttr(el, "style");
  return size;
}
function isOffsetInEl(x, y, el) {
  const offset = getOffset(el);
  return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y;
}
function setElChildByIndex(el, child, index) {
  child.childComponentIndex = index;
  const len = el.childNodes.length;
  if (len === 0) {
    el.appendChild(child);
  } else if (index === 0) {
    el.insertBefore(child, el.childNodes[0]);
  } else {
    const {
      index: nearestIndex,
      value: nearest,
      greater
    } = binarySearch(
      // @ts-ignore
      el.childNodes,
      (el2) => {
        return el2["childComponentIndex"] - index;
      },
      {
        start: 0,
        end: notGreaterThan(index, len - 1),
        returnNearestIfNoHit: true
      }
    );
    if (greater) {
      el.insertBefore(child, nearest);
    } else {
      const next = el.childNodes[nearestIndex + 1];
      if (next) {
        el.insertBefore(child, next);
      } else {
        el.appendChild(child);
      }
    }
  }
}
function on(el, name, handler, options) {
  if (el.addEventListener) {
    el.addEventListener(name, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent(`on${name}`, handler, options);
  }
}
function off(el, name, handler, options) {
  if (el.removeEventListener) {
    el.removeEventListener(name, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent(`on${name}`, handler, options);
  }
}
function once(el, name, handler, options) {
  const onceHandler = function(...args) {
    let r = handler.call(this, ...args);
    destroy();
    return r;
  };
  on(el, name, onceHandler, options);
  let destroied = false;
  const destroy = () => {
    if (!destroied) {
      off(el, name, onceHandler, options);
    }
    destroied = true;
  };
  return destroy;
}
function extendedListen(info) {
  let destroyFuncs = [];
  const listenAll = () => {
    if (r.listening) {
      return;
    }
    for (const item of info) {
      on.apply(this, item);
      const destroy = () => off.apply(this, item);
      destroyFuncs.push(destroy);
    }
    r.listening = true;
  };
  const destroyAll = () => {
    if (!r.listening) {
      return;
    }
    for (const destroy of destroyFuncs) {
      destroy();
    }
    destroyFuncs = [];
    r.listening = false;
  };
  const r = {
    listening: false,
    stop: destroyAll,
    resume: listenAll,
    start: listenAll
  };
  r.start();
  return r;
}
function getImageSizeByUrl(url) {
  const image = document.createElement("img");
  return new Promise(function(resolve, reject) {
    on(image, "load", () => {
      resolve({ width: image.width, height: image.height });
    });
    on(image, "error", (e) => {
      reject(e);
    });
    image.src = url;
  });
}
function elementsFromPoint(x, y) {
  const args = [x, y];
  const func = document.elementsFromPoint || // @ts-ignore
  document.msElementsFromPoint || elementsFromPoint2;
  return func.apply(document, args);
  function elementsFromPoint2(x2, y2) {
    const parents = [];
    let parent = void 0;
    do {
      if (parent !== document.elementFromPoint(x2, y2)) {
        parent = document.elementFromPoint(x2, y2);
        parents.push(parent);
        parent.style.pointerEvents = "none";
        parent["_pointerEvents_backup"] = parent.style.pointerEvents;
      } else {
        parent = false;
      }
    } while (parent);
    parents.forEach(function(parent2) {
      return parent2.style.pointerEvents = parent2["_pointerEvents_backup"];
    });
    return parents;
  }
}
function getOuterAttachedHeight(el, opt = {}) {
  opt = __spreadValues({
    margin: true,
    border: true
  }, opt);
  const stl = getComputedStyle(el);
  let r = 0;
  const arr = [];
  if (opt.margin) {
    arr.push("margin-top", "margin-bottom");
  }
  if (opt.border) {
    arr.push("border-top-width", "border-bottom-width");
  }
  arr.forEach((key) => {
    r += parseFloat(stl[key]);
  });
  return r;
}
function getOuterAttachedWidth(el, opt = {}) {
  opt = __spreadValues({
    margin: true,
    border: true
  }, opt);
  const stl = getComputedStyle(el);
  let r = 0;
  const arr = [];
  if (opt.margin) {
    arr.push("margin-left", "margin-right");
  }
  if (opt.border) {
    arr.push("border-left-width", "border-right-width");
  }
  arr.forEach((key) => {
    r += parseFloat(stl[key]);
  });
  return r;
}
function css(el, name) {
  const stl = getComputedStyle(el);
  return stl[name];
}
function cssNumber(el, name) {
  return parseFloat(css(el, name));
}
function isScrollable(el, direction) {
  const key = "overflow" + direction.toUpperCase();
  const values = ["auto", "scroll", "overlay"];
  if (el === document.scrollingElement) {
    values.push("visible");
  }
  return values.includes(css(el, key));
}
function getScrollSpace(el, direction) {
  let space;
  if (direction === "left") {
    space = el.scrollLeft;
  } else if (direction === "top") {
    space = el.scrollTop;
  } else {
    if (direction === "right") {
      space = el.scrollWidth - el.clientWidth - el.scrollLeft;
    } else {
      space = el.scrollHeight - el.clientHeight - el.scrollTop;
    }
  }
  return space;
}
function scrollTo(options) {
  if (!options.element) {
    options.element = document.scrollingElement || document.documentElement;
  }
  if (options.duration == null) {
    options.duration = 0;
  }
  const { x, y, duration, element } = options;
  let requestAnimationFrameId;
  let count = 0;
  const startY = element.scrollTop, changeY = y - startY, startX = element.scrollLeft, changeX = x - startX, startDate = +/* @__PURE__ */ new Date(), animateScroll = function() {
    if (options.beforeEveryFrame && options.beforeEveryFrame(count) === false) {
      return;
    }
    const currentDate = (/* @__PURE__ */ new Date()).getTime();
    const changedTime = currentDate - startDate;
    if (y != null) {
      element.scrollTop = parseInt(
        calc(startY, changeY, changedTime, duration)
      );
    }
    if (x != null) {
      element.scrollLeft = parseInt(
        calc(startX, changeX, changedTime, duration)
      );
    }
    if (changedTime < duration) {
      requestAnimationFrameId = requestAnimationFrame(animateScroll);
    } else {
      if (y != null) {
        element.scrollTop = y;
      }
      if (x != null) {
        element.scrollLeft = x;
      }
    }
    count++;
  };
  const stop = () => {
    cancelAnimationFrame(requestAnimationFrameId);
  };
  animateScroll();
  return stop;
  function calc(startValue, changeInValue, changedTime, duration2) {
    return startValue + changeInValue * (changedTime / duration2);
  }
}
function insertBefore(el, target) {
  target.parentElement.insertBefore(el, target);
}
function insertAfter(el, target) {
  target.parentElement.insertBefore(el, target.nextSibling);
}
function prependTo(el, target) {
  target.insertBefore(el, target.firstChild);
}
function appendTo(el, target) {
  target.appendChild(el);
}
function cloneDate(dateObj) {
  return new Date(dateObj.getTime());
}
function addDate(dateObj, n, type) {
  if (!["year", "month", "day", "date"].includes(type)) {
    type += "s";
  }
  let type2 = studlyCase(type);
  if (type2 === "Day") {
    type2 = "Date";
  }
  var setFuncName = "set" + type2;
  var getFuncName = "get" + type2;
  dateObj[setFuncName](dateObj[getFuncName]() + n);
  return dateObj;
}
function getMonthStart(dateObj) {
  const clonedObj = cloneDate(dateObj);
  clonedObj.setDate(1);
  return clonedObj;
}
function getMonthEnd(dateObj) {
  const r = cloneDate(dateObj);
  addDate(r, 1, "month");
  r.setDate(0);
  return r;
}
function getCalendar(year, month, startWeekDay = 0) {
  const results = [];
  const date = new Date(year, month - 1);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  const monthStart = getMonthStart(date);
  const monthStartDay = monthStart.getDay();
  const calendarStart = addDate(
    cloneDate(monthStart),
    -(monthStartDay + startWeekDay),
    "day"
  );
  if (monthStartDay > startWeekDay) {
    const startDate = calendarStart.getDate();
    const year2 = calendarStart.getFullYear();
    const month2 = calendarStart.getMonth() + 1;
    for (let i = startWeekDay; i < monthStartDay; i++) {
      const date2 = startDate + i;
      results.push({
        year: year2,
        month: month2,
        date: date2,
        text: date2,
        prevMonth: true
      });
    }
  }
  const monthEnd = getMonthEnd(date);
  const monthEndtDate = monthEnd.getDate();
  for (let i = 1; i <= monthEndtDate; i++) {
    const date2 = i;
    results.push({
      year,
      month,
      date: date2,
      text: date2,
      currentMonth: true
    });
  }
  const monthEndDay = monthEnd.getDay();
  const endWeekDay = 6 - startWeekDay;
  if (monthEndDay < endWeekDay) {
    const nextMonth = addDate(cloneDate(date), 1, "month");
    const year2 = nextMonth.getFullYear();
    const month2 = nextMonth.getMonth() + 1;
    for (let i = monthEndDay + 1, date2 = 1; i <= endWeekDay; i++, date2++) {
      results.push({
        year: year2,
        month: month2,
        date: date2,
        text: date2,
        nextMonth: true
      });
    }
  }
  return splitArray(results, 7);
}
function isIsoFormat(str) {
  return Boolean(
    str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/)
  );
}
function parseISO(timestamp) {
  const [datePart, timePart] = timestamp.split("T");
  let y, m, d, h = 0, min = 0, s = 0;
  [y, m, d] = datePart.split("-").map((v) => parseInt(v));
  m = m - 1;
  if (timePart) {
    const t = timePart.split(":").map((v) => parseFloat(v));
    h = t[0];
    if (t[1] != null) {
      min = t[1];
    }
    if (t[2] != null) {
      s = t[2];
    }
  }
  const dt = /* @__PURE__ */ new Date();
  dt.setUTCFullYear(y);
  dt.setUTCMonth(m);
  dt.setUTCDate(d);
  dt.setUTCHours(h);
  dt.setUTCMinutes(min);
  dt.setUTCSeconds(s);
  return dt;
}
function binarySearch(arr, callback, opt = {}) {
  opt = __spreadValues({
    start: 0,
    end: arr.length - 1,
    maxTimes: 1e3
  }, opt);
  let { start, end } = opt;
  const { returnNearestIfNoHit, maxTimes } = opt;
  let midNum;
  let mid;
  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }
  let i = 0;
  let r;
  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw Error(
        `binarySearch: loop times is over ${maxTimes}, you can increase the limit.`
      );
    }
    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    const count = i + 1;
    r = callback(mid, midNum, count);
    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return { index: midNum, value: mid, count, hit: true };
    }
    i++;
  }
  return returnNearestIfNoHit ? {
    index: midNum,
    value: mid,
    count: i + 1,
    hit: false,
    greater: r > 0
  } : null;
}
function windowLoaded() {
  return new Promise(function(resolve, reject) {
    if (document && document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", function once2() {
        resolve();
        window.removeEventListener("load", once2);
      });
    }
  });
}
function waitTime(milliseconds, callback) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      callback && callback();
      resolve();
    }, milliseconds);
  });
}
function waitFor(condition, time = 100, maxTimes = 1e3) {
  let interval;
  const promise = new Promise(function(resolve, reject) {
    let count = 0;
    function judge() {
      if (count <= maxTimes) {
        if (condition()) {
          stop();
          resolve();
        }
      } else {
        stop();
        reject(new Error("waitFor: Limit is reached"));
      }
      count++;
    }
    interval = setInterval(function() {
      judge();
    }, time);
    judge();
  });
  return { promise, stop };
  function stop() {
    clearInterval(interval);
  }
}
function retry(action, limitTimes = 3) {
  return __async(this, null, function* () {
    for (let index = 1; index <= limitTimes; index++) {
      try {
        return yield action();
      } catch (error) {
        if (index === limitTimes) {
          throw error;
        }
      }
    }
  });
}
function copyTextToClipboard(text) {
  try {
    navigator.clipboard.writeText(text);
    return;
  } catch (e) {
  }
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
  document.body.removeChild(textArea);
}
function isWindowDefined() {
  try {
    return window && true;
  } catch (error) {
    return false;
  }
}
function isNode() {
  return Boolean(typeof glb().module !== "undefined" && glb().module.exports);
}
function isIE() {
  return Boolean(window.ActiveXObject || "ActiveXObject" in window);
}
function openWindow(url, name, opt = {}) {
  window.open(
    url,
    name,
    Object.keys(opt).map((k) => `${k}=${opt[k]}`).join(",")
  );
}
function openCenterWindow(url, name, width, height, opt = {}) {
  const t = {
    width,
    height,
    top: (window.screen.availHeight - 30 - height) / 2,
    left: (window.screen.availWidth - 30 - width) / 2
  };
  Object.assign(t, opt);
  openWindow(url, name, t);
}
function openPreviewWindow(previewUrl, name = "preview", width = 1e3, height = 800) {
  return openCenterWindow(previewUrl, name, width, height, {
    directories: "no",
    titlebar: "no",
    toolbar: "no",
    location: "no",
    status: "no",
    menubar: "no"
  });
}
var URLHelper = class {
  constructor(baseUrl) {
    this.baseUrl = "";
    // protocol, hostname, port, pastname
    this.search = {};
    let t = decodeURI(baseUrl).split("?");
    this.baseUrl = t[0];
    if (t[1]) {
      t[1].split("&").forEach((v) => {
        let t2 = v.split("=");
        this.search[t2[0]] = t2[1] == null ? "" : decodeURIComponent(t2[1]);
      });
    }
  }
  getHref() {
    const t = [this.baseUrl];
    let searchStr = Object.keys(this.search).map((k) => `${k}=${encodeURIComponent(this.search[k])}`).join("&");
    if (searchStr) {
      t.push(searchStr);
    }
    return t.join("?");
  }
};
function resolveArgsByType(args, types) {
  let argIndex = 0;
  return types.map((v) => {
    let rule, dft;
    if (isArray(v)) {
      rule = v[0];
      dft = v[1];
    } else {
      rule = v;
      dft = void 0;
    }
    if (!isFunction(rule)) {
      if (rule == null) {
        rule = () => true;
      } else {
        const t = rule;
        rule = (x) => Object.prototype.toString.call(x) === `[object ${t}]`;
      }
    }
    const arg = args[argIndex];
    if (rule(arg)) {
      argIndex++;
      return arg;
    } else {
      return dft;
    }
  });
}
function makeStorageHelper(storage) {
  return {
    storage,
    set(name, value, minutes) {
      if (value == null) {
        this.storage.removeItem(name);
      } else {
        this.storage.setItem(
          name,
          JSON.stringify({
            value,
            expired_at: minutes ? (/* @__PURE__ */ new Date()).getTime() + minutes * 60 * 1e3 : null
          })
        );
      }
    },
    get(name) {
      let t = this.storage.getItem(name);
      if (t) {
        t = JSON.parse(t);
        if (!t.expired_at || t.expired_at > (/* @__PURE__ */ new Date()).getTime()) {
          return t.value;
        } else {
          this.storage.removeItem(name);
        }
      }
      return null;
    },
    clear() {
      this.storage.clear();
    }
  };
}
var extendedLocalStorage = cacheFunction(function() {
  return makeStorageHelper(localStorage);
});
var extendedSessionStorage = cacheFunction(function() {
  return makeStorageHelper(sessionStorage);
});
var EventProcessor = class {
  constructor() {
    this.eventStore = [];
  }
  on(name, handler) {
    this.eventStore.push({ name, handler });
  }
  once(name, handler) {
    const off2 = () => {
      this.off(name, wrappedHandler);
    };
    const wrappedHandler = (...args) => {
      handler(...args);
      off2();
    };
    this.on(name, wrappedHandler);
    return off2;
  }
  onceTimeout(name, handler, timeout) {
    let off2;
    const promise = new Promise((resolve, reject) => {
      const wrappedHandler = (...args) => {
        handler(...args);
        resolve();
      };
      off2 = this.once(name, wrappedHandler);
      waitTime(timeout).then(() => {
        off2();
        reject();
      });
    });
    const off22 = () => {
      off2 && off2();
    };
    return { off: off22, promise };
  }
  off(name, handler) {
    const indexes = [];
    const len = this.eventStore.length;
    for (let i = 0; i < len; i++) {
      const item = this.eventStore[i];
      if (item.name === name && item.handler === handler) {
        indexes.unshift(i);
      }
    }
    for (const index of indexes) {
      this.eventStore.splice(index, 1);
    }
  }
  emit(name, ...args) {
    const items = [];
    for (const item of this.eventStore) {
      if (item.name === name) {
        items.push(item);
      }
    }
    for (const item of items) {
      item.handler(...args);
    }
  }
};
var CrossWindowEventProcessor = class extends EventProcessor {
  // id
  constructor(opt) {
    super();
    this.storageName = "_crossWindow";
    this.windows = [];
    this.timeout = 200;
    this.BROADCAST = "__BROADCAST__";
    if (opt) {
      Object.assign(this, opt);
    }
    on(window, "storage", (ev) => {
      if (ev.key === this.storageName) {
        const event = JSON.parse(ev.newValue);
        if (!event.targets || event.targets.includes(this.id)) {
          this.emitLocal(event.name, ...event.args);
        }
      }
    });
    this.id = randString();
    this.windows = [this.id];
    this.ready = new Promise((resolve, reject) => {
      this.onceTimeout(
        "_windows_updated",
        ({ windows }) => {
          this.windows = windows;
        },
        this.timeout
      ).promise.then(
        () => {
          resolve();
        },
        () => {
          resolve();
        }
      );
      this.broadcast("_join", this.id);
    });
    this.ready.then(() => {
      this.on("_join", (id) => {
        this.windows.push(id);
        if (this.isMain()) {
          this.broadcast("_windows_updated", {
            windows: this.windows,
            type: "join",
            id
          });
        }
      });
      this.on("_windows_updated", ({ windows }) => {
        this.windows = windows;
      });
      this.on("_exit", (id) => {
        const oldMain = this.windows[0];
        arrayRemove(this.windows, id);
        if (this.isMain()) {
          this.emit("_windows_updated", {
            windows: this.windows,
            type: "exit",
            id
          });
          if (oldMain != this.id) {
            this.emit("_main_updated", {
              windows: this.windows,
              old: oldMain,
              new: this.id
            });
          }
        }
      });
      on(window, "beforeunload", () => {
        this.exitGroup();
      });
    });
  }
  isMain() {
    return this.id === this.windows[0];
  }
  emitTo(name, targets, ...args) {
    if (targets === this.BROADCAST) {
      targets = null;
    } else {
      if (targets && !isArray(targets)) {
        targets = [targets];
      }
      if (targets.includes(this.id)) {
        super.emit(name, ...args);
      }
    }
    glb().localStorage.setItem(
      this.storageName,
      JSON.stringify({
        name,
        targets,
        args,
        // use random make storage event triggered every time
        // 加入随机保证触发storage事件
        random: Math.random()
      })
    );
  }
  emitLocal(name, ...args) {
    this.emitTo(name, this.id, ...args);
  }
  broadcast(name, ...args) {
    this.emitTo(name, this.BROADCAST, ...args);
  }
  emit(name, ...args) {
    this.emitTo(name, this.windows, ...args);
  }
  exitGroup() {
    this.broadcast("_exit", this.id);
  }
};
function onContinuousInput(handler, opt = {}) {
  opt = __spreadValues({
    timeout: 1e3
  }, opt);
  let input = "";
  let timeoutId;
  const keydownHandler = (e) => {
    if (e.key && e.key.length === 1) {
      input = `${input}${e.key}`;
      handler(input);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      timeoutId = setTimeout(() => {
        input = "";
      }, opt.timeout);
    }
  };
  on(document, "keydown", keydownHandler);
  return () => {
    off(document, "keydown", keydownHandler);
  };
}
var onQuickKeydown = onContinuousInput;
function getUserLanguage() {
  return navigator.language || navigator["userLanguage"];
}
var Cache = class {
  constructor() {
    this.store = {};
  }
  has(name) {
    return this.store.hasOwnProperty(name);
  }
  remember(name, getter) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter()
      };
    }
    return this.store[name].value;
  }
  forget(name) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name];
      }
    } else {
      this.store = {};
    }
  }
};
function attachCache(obj, toCache, cache = new Cache()) {
  for (const key in toCache) {
    const getter = toCache[key];
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => getter.call(this));
      }
    });
  }
}
function easeInOutQuad(startValue, changeInValue, changedTime, duration) {
  let t = changedTime, d = duration, b = startValue, c = changeInValue;
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}
function isMobile() {
  var isMobile2 = false;
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substring(0, 4)
  )) {
    isMobile2 = true;
  }
  return isMobile2;
}
var Accumulate = class {
  constructor(arr) {
    this.arr = [];
    this.cache = [];
    this.arr = arr;
  }
  getValue(item) {
    return item;
  }
  sum(index) {
    if (this.cache[index] == null) {
      let prev = index > 0 ? this.sum(index - 1) : 0;
      this.cache[index] = this.getValue(this.arr[index]) + prev;
    }
    return this.cache[index];
  }
};
function svgToDataURL(svgCode) {
  return "data:image/svg+xml," + svgCode.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E");
}
function genRandomLightColor() {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
var ArrayKeyMap = class {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
    this._values = {};
    this._objCount = 0;
  }
  _keysToString(keys) {
    const { _map } = this;
    let t = [];
    for (const key of keys) {
      if (!_map.has(key)) {
        return null;
      }
      t.push(_map.get(key)[0]);
    }
    return t.toString();
  }
  has(keys) {
    if (this._keysToString(keys) == null) {
      return false;
    }
    return true;
  }
  /**
   * throw error if not found
   * @param keys
   * @returns
   */
  get(keys) {
    const { _values } = this;
    const key2 = this._keysToString(keys);
    if (key2 == null) {
      throw "Value not found by specified keys";
    }
    return _values[key2][1];
  }
  set(keys, value) {
    const { _map, _values } = this;
    let t = [];
    for (const key of keys) {
      let str;
      let count = 1;
      if (_map.has(key)) {
        [str, count] = _map.get(key);
        count++;
      } else {
        this._objCount++;
        str = this._objCount.toString();
      }
      _map.set(key, [str, count]);
      t.push(str);
    }
    _values[t.toString()] = [keys.slice(), value];
  }
  delete(keys) {
    const { _values, _map } = this;
    const key2 = this._keysToString(keys);
    if (key2 == null) {
      throw "Value not found by specified keys";
    }
    delete _values[key2];
    for (const key of keys) {
      let [str, count] = _map.get(key);
      count--;
      if (count === 0) {
        _map.delete(key);
      } else {
        _map.set(key, [str, count]);
      }
    }
  }
  clear() {
    this._map.clear();
    this._values = {};
  }
  *entries() {
    const { _values } = this;
    for (const key in _values) {
      const [keys, value] = _values[key];
      yield [keys, value];
    }
  }
  count() {
    return [...this.entries()].length;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accumulate,
  ArrayKeyMap,
  Cache,
  CrossWindowEventProcessor,
  EventProcessor,
  TreeData,
  URLHelper,
  addClass,
  addDate,
  appendTo,
  applyFinally,
  arrayAt,
  arrayBetween,
  arrayDiff,
  arrayDistinct,
  arrayFilter,
  arrayFirst,
  arrayFlat,
  arrayLast,
  arrayRemove,
  arrayRemoveBySortedIndexes,
  arrayWithout,
  arrayWithoutEnd,
  assignIfDiff,
  assignIfKeyNull,
  assignIfNoKey,
  attachCache,
  backupAttr,
  between,
  binarySearch,
  bindContext,
  cacheFunction,
  camelCase,
  camelToWords,
  cloneDate,
  cloneObject,
  cloneTreeData,
  continuous,
  copyTextToClipboard,
  createElementFromHTML,
  css,
  cssNumber,
  debounceImmediate,
  debounceTrailing,
  dotGet,
  dotSet,
  easeInOutQuad,
  elementsFromPoint,
  empty,
  executePromiseGetters,
  executeWithCount,
  extendedListen,
  extendedLocalStorage,
  extendedSessionStorage,
  findAll,
  findInfoInTreeData,
  findParent,
  findTreeData,
  genRandomLightColor,
  getArrayItemSiblingsByOffsets,
  getBoundingClientRect,
  getCalendar,
  getElSizeEvenInvisible,
  getImageSizeByUrl,
  getMonthEnd,
  getMonthStart,
  getOffset,
  getOffsetParent,
  getOuterAttachedHeight,
  getOuterAttachedWidth,
  getPosition,
  getPositionFromOffset,
  getScroll,
  getScrollSpace,
  getUrlParam,
  getUserLanguage,
  getViewportPosition,
  glb,
  groupArray,
  hasClass,
  hasClassIn,
  hasClasses,
  indexesOf,
  insertAfter,
  insertBefore,
  isArray,
  isBool,
  isDescendantOf,
  isDocumentExisted,
  isFunction,
  isIE,
  isIsoFormat,
  isMobile,
  isNode,
  isNumber,
  isNumeric,
  isObject,
  isOffsetInEl,
  isPromise,
  isScrollable,
  isString,
  isWindowDefined,
  iterateAll,
  joinFunctionsByNext,
  joinFunctionsByResult,
  joinRows,
  kebabCase,
  makeStorageHelper,
  mapObjectTree,
  mapObjects,
  notGreaterThan,
  notLessThan,
  objectAssignIfDiff,
  objectAssignIfKeyNull,
  objectAssignIfNoKey,
  objectDefineProxyProperty,
  objectExcept,
  objectMap,
  objectOnly,
  off,
  on,
  onContinuousInput,
  onQuickKeydown,
  once,
  openCenterWindow,
  openPreviewWindow,
  openWindow,
  parseISO,
  pathJoin,
  pointIn,
  prependTo,
  promiseContinuous,
  promisePin,
  promiseTimeout,
  randChoice,
  randInt,
  randString,
  removeClass,
  removeEl,
  resolveArgsByType,
  resolveValueOrGettter,
  restoreAttr,
  retry,
  reverseString,
  scrollTo,
  setElChildByIndex,
  snakeCase,
  splitArray,
  strPad,
  studlyCase,
  svgToDataURL,
  titleCase,
  toArrayIfNot,
  unset,
  viewportPositionToFixed,
  waitFor,
  waitTime,
  walkTreeData,
  watchChange,
  windowLoaded,
  withoutUndefined
});

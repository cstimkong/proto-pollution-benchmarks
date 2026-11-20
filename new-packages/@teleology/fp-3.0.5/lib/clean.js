"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.empty = void 0;
const is = (arg) => Object.prototype.toString.call(arg).slice(8, -1);
const empty = (v) => {
    const t = is(v);
    return ((t === `String` && v.length === 0) ||
        (t === `Object` && Object.keys(v).length === 0) ||
        (t === `Array` && v.length === 0) ||
        v === null ||
        v === undefined);
};
exports.empty = empty;
const coerce = (v) => {
    if (Array.isArray(v)) {
        return v.filter((it) => !(0, exports.empty)(it));
    }
    return v;
};
// Remove all undefined, null, empty strings, empty object and empty array values
const clean = (src) => JSON.parse(JSON.stringify(src), (k, v) => ((0, exports.empty)(v) ? undefined : coerce(v)));
exports.clean = clean;

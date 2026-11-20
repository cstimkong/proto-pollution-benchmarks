"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const arrays_1 = require("./arrays");
const filter = (arg) => (src) => {
    let fn = arg;
    if (typeof fn !== 'function') {
        fn = (0, arrays_1.objecToEquality)(arg);
    }
    return Array.isArray(src) ? src.filter(fn) : [];
};
exports.filter = filter;

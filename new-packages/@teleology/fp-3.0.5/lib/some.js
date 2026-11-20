"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = void 0;
const arrays_1 = require("./arrays");
const some = (arg) => (src) => {
    let fn = arg;
    if (typeof fn !== 'function') {
        fn = (0, arrays_1.objecToEquality)(arg);
    }
    return Array.isArray(src) ? src.some(fn) : false;
};
exports.some = some;

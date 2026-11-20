"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
const pick_1 = require("./pick");
const map = (arg) => (src) => {
    let fn = arg;
    if (Array.isArray(arg)) {
        fn = (0, pick_1.pick)(arg);
    }
    return Array.isArray(src) ? src.map(fn) : src ? fn(src, 0) : undefined;
};
exports.map = map;

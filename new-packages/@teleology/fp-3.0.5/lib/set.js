"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const dot_1 = require("./dot");
const set = (path, value, src) => {
    if (!src)
        return (src) => (0, exports.set)(path, value, src);
    const paths = (0, dot_1.dot)(path);
    return paths.reduce((current, subpath, index) => {
        if (index === paths.length - 1) {
            current[subpath] = value;
            // last path return src
            return src;
        }
        if (!current[subpath]) {
            const nextSubPath = paths[index + 1];
            // we need to look ahead at what we are expecting, an array index or
            // object key
            current[subpath] = nextSubPath && /\d+/.test(nextSubPath) ? [] : {};
        }
        // traverse to next
        return current[subpath];
    }, src);
};
exports.set = set;

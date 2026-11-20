"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.get = void 0;
const dot_1 = require("./dot");
const clean_1 = require("./clean");
const get = (path, def, src) => {
    if (!src)
        return (src) => (0, exports.get)(path, def, src);
    try {
        return (0, dot_1.dot)(path).reduce((a, b) => a[b], src);
    }
    catch (e) {
        return def;
    }
};
exports.get = get;
const pick = (paths, options) => (src) => {
    const output = Array.isArray(src) ? [] : {};
    for (let j = 0; j < paths.length; j++) {
        const originalPath = paths[j];
        const path = (0, dot_1.dot)(originalPath);
        const value = (0, exports.get)(originalPath, undefined, src);
        // don't try to find something that doesn't exist
        if (!path[0].match(/\d/g) && !src.hasOwnProperty(path[0])) {
            continue;
        }
        let target = output;
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            const next = path[i + 1];
            // already defined and not at the end
            if (target[part]) {
                target = target[part];
                continue;
            }
            // next part is array
            if (next && next.match(/\d/g)) {
                target[part] = [];
                target = target[part];
                continue;
            }
            if (next) {
                target[part] = {};
                target = target[part];
            }
        }
        const last = path[path.length - 1];
        target[last] = value;
    }
    if (options && options.clean) {
        return (0, clean_1.clean)(output);
    }
    return output;
};
exports.pick = pick;

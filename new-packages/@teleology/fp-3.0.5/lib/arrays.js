"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objecToEquality = void 0;
const pick_1 = require("./pick");
const objecToEquality = (obj) => (src) => {
    const keys = Object.keys(obj);
    for (const key of keys) {
        if ((0, pick_1.get)(key, undefined, src) !== obj[key]) {
            return false;
        }
    }
    return true;
};
exports.objecToEquality = objecToEquality;

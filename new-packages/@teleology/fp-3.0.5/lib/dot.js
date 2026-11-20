"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dot = void 0;
const dot = (path) => {
    const LEADING_ARRAY = /\[/g;
    const TRAILING_ARRAY = /^\[|\]/g;
    return path.replace(TRAILING_ARRAY, '').replace(LEADING_ARRAY, '.').split('.');
};
exports.dot = dot;

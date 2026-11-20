"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.race = exports.sleep = void 0;
const sleep = (millis, ...params) => new Promise((resolve) => setTimeout(resolve, millis, ...params));
exports.sleep = sleep;
// Create an alias for Promise.race
exports.race = Promise.race;
const timeout = (fn, millis = 500) => (...args) => Promise.race([(0, exports.sleep)(millis, 'timeout'), fn(...args)]).then((result) => {
    if (result === 'timeout') {
        throw new Error(`Function ${fn.name || 'Anonymous'} timed out`);
    }
    return result;
});
exports.timeout = timeout;

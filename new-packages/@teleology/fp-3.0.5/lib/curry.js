"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = void 0;
const curry = (arity = 0, fn) => (...args) => {
    // we have surpassed the expected arity, so invoke the final function
    if (arity <= args.length) {
        return fn(...args);
    }
    // we still have args we can bind, recurse
    const bound = fn.bind(fn, ...args);
    return (0, exports.curry)(arity - args.length, bound);
};
exports.curry = curry;

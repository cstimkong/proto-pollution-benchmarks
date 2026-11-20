"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
function debounce(func, { timeout = 300, leading = false }) {
    let timer;
    if (leading) {
        return (...args) => {
            if (!timer)
                func.apply(func, args);
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);
        };
    }
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(func, args); }, timeout);
    };
}
exports.debounce = debounce;

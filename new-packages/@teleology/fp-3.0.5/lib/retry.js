"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrySync = exports.retry = void 0;
const DEFAULT_ROLLOFF = (retryCount) => __awaiter(void 0, void 0, void 0, function* () { });
const retry = (fn, max = 3, rolloff = DEFAULT_ROLLOFF) => (...args) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < max; i += 1) {
        try {
            return yield fn(...args);
        }
        catch (e) {
            if (i + 1 >= max) {
                throw e;
            }
            yield rolloff(i + 1);
        }
    }
});
exports.retry = retry;
const retrySync = (fn, max = 3) => (...args) => {
    for (let i = max - 1; i > -1; i -= 1) {
        try {
            return fn(...args);
        }
        catch (e) {
            if (!i) {
                throw e;
            }
        }
    }
};
exports.retrySync = retrySync;

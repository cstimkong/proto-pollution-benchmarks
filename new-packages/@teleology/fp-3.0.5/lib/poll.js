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
exports.poll = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const timeout_1 = require("./timeout");
const DEFAULT_ROLLOFF = (ms = 200) => __awaiter(void 0, void 0, void 0, function* () { return (0, timeout_1.sleep)(ms); });
const poll = (fn, it) => {
    let rolloff;
    if (typeof it === 'function') {
        rolloff = it;
    }
    else if (typeof it === 'number') {
        rolloff = () => __awaiter(void 0, void 0, void 0, function* () { return DEFAULT_ROLLOFF(it); });
    }
    else {
        rolloff = () => __awaiter(void 0, void 0, void 0, function* () { return DEFAULT_ROLLOFF(); });
    }
    let is_cancelled = false;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        let i = 0;
        while (!is_cancelled) {
            yield fn();
            yield rolloff((i += 1));
        }
    }))();
    return () => {
        is_cancelled = true;
    };
};
exports.poll = poll;

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
exports.settle = void 0;
/* eslint-disable no-nested-ternary */
const thennable = (v) => (v && v.then && typeof v.then === 'function') ||
    (v && v[Symbol.toStringTag] === 'AsyncFunction');
const settleOne = (it) => thennable(it)
    ? it.then((x) => ({ success: true, value: x }), (e) => ({ success: false, reason: e }))
    : typeof it === 'function'
        ? it()
        : it;
const settle = (it) => typeof it === 'function'
    ? (...args) => __awaiter(void 0, void 0, void 0, function* () { return settleOne(it(...args)); })
    : Promise.all(it.map(settleOne));
exports.settle = settle;

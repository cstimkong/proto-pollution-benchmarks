"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
const pipe_1 = require("./pipe");
const compose = (...fn) => (0, pipe_1.pipe)(...fn.reverse());
exports.compose = compose;

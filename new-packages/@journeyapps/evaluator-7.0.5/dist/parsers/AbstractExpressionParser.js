"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionParserFactory = exports.AbstractExpressionParser = void 0;
const types_1 = require("@babel/types");
class AbstractExpressionParser {
}
exports.AbstractExpressionParser = AbstractExpressionParser;
class ExpressionParserFactory {
    constructor(types) {
        this.types = Array.isArray(types) ? types : [types];
    }
    canParse(type) {
        return this.types.some((t) => (0, types_1.isType)(type, t));
    }
}
exports.ExpressionParserFactory = ExpressionParserFactory;
//# sourceMappingURL=AbstractExpressionParser.js.map
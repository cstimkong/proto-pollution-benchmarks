"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierExpressionParserFactory = exports.IdentifierExpressionParser = void 0;
const types_1 = require("@babel/types");
const FunctionExpressionContext_1 = require("../context/FunctionExpressionContext");
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class IdentifierExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        var _a, _b;
        const { node, context } = event;
        if ((0, types_1.isLabeledStatement)((_a = node.extra) === null || _a === void 0 ? void 0 : _a.parent)) {
            return null;
        }
        const { name: expression } = node;
        if (FunctionExpressionContext_1.FunctionExpressionContext.isInstanceOf(context)) {
            return new token_expressions_1.FunctionTokenExpression({
                expression: expression
            });
        }
        const format = (_b = node.extra) === null || _b === void 0 ? void 0 : _b.format;
        if (format != null) {
            return new token_expressions_1.FormatShorthandTokenExpression({ expression: expression, format: format });
        }
        return new token_expressions_1.ShorthandTokenExpression({ expression: expression });
    }
}
exports.IdentifierExpressionParser = IdentifierExpressionParser;
class IdentifierExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('Identifier');
    }
    getParser() {
        return new IdentifierExpressionParser();
    }
}
exports.IdentifierExpressionParserFactory = IdentifierExpressionParserFactory;
//# sourceMappingURL=IdentifierExpressionParser.js.map
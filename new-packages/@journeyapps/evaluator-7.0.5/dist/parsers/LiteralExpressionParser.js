"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralExpressionParserFactory = exports.LiteralExpressionParser = void 0;
const types_1 = require("@babel/types");
const FunctionExpressionContext_1 = require("../context/FunctionExpressionContext");
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class LiteralExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, context, source } = event;
        const inFunctionContext = FunctionExpressionContext_1.FunctionExpressionContext.isInstanceOf(context);
        if ((0, types_1.isStringLiteral)(node) || (0, types_1.isDirectiveLiteral)(node)) {
            if (inFunctionContext) {
                return new token_expressions_1.FunctionTokenExpression({ expression: `'${node.value}'` });
            }
            return new token_expressions_1.ConstantTokenExpression({ expression: node.value });
        }
        if ((0, types_1.isNullLiteral)(node)) {
            if (inFunctionContext) {
                return new token_expressions_1.FunctionTokenExpression({ expression: 'null' });
            }
            return new token_expressions_1.PrimitiveConstantTokenExpression({ expression: null, isNullLiteral: true });
        }
        if ('value' in node) {
            if (inFunctionContext) {
                return new token_expressions_1.FunctionTokenExpression({ expression: `${node.value}` });
            }
            return new token_expressions_1.PrimitiveConstantTokenExpression({ expression: node.value });
        }
        if ((0, types_1.isTemplateLiteral)(node)) {
            return new token_expressions_1.FunctionTokenExpression({ expression: source.slice(node.start, node.end) });
        }
        // Fallback to FunctionTokenExpression, until we have a better way to handle this
        return new token_expressions_1.FunctionTokenExpression({ expression: source.slice(node.start, node.end) });
    }
}
exports.LiteralExpressionParser = LiteralExpressionParser;
class LiteralExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super(['Literal', 'StringLiteral', 'TemplateLiteral', 'DirectiveLiteral', 'NullLiteral']);
    }
    getParser() {
        return new LiteralExpressionParser();
    }
}
exports.LiteralExpressionParserFactory = LiteralExpressionParserFactory;
//# sourceMappingURL=LiteralExpressionParser.js.map
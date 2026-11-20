"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalExpressionParserFactory = exports.LogicalExpressionParser = void 0;
const types_1 = require("@babel/types");
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class LogicalExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, source, parseNode } = event;
        const options = {
            expression: source.slice(node.start, node.end)
        };
        if ((0, types_1.isLogicalExpression)(node) || (0, types_1.isBinaryExpression)(node)) {
            const { left, right, operator } = node;
            options.arguments = [left, right].map((arg) => parseNode({ node: arg, source }));
            options.name = `(function(left, right) { return left ${operator} right; })`;
        }
        return new token_expressions_1.FunctionTokenExpression(options);
    }
}
exports.LogicalExpressionParser = LogicalExpressionParser;
class LogicalExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super(['LogicalExpression', 'UnaryExpression', 'BinaryExpression']);
    }
    getParser() {
        return new LogicalExpressionParser();
    }
}
exports.LogicalExpressionParserFactory = LogicalExpressionParserFactory;
//# sourceMappingURL=LogicalExpressionParser.js.map
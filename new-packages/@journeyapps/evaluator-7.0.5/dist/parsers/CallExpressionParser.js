"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallExpressionParserFactory = exports.CallExpressionParser = void 0;
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class CallExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, source, parseNode } = event;
        const calleeExpr = parseNode({ node: node.callee, source: source });
        const name = calleeExpr.stringify();
        const args = node.arguments.map((arg) => parseNode({ node: arg, source: source }));
        return new token_expressions_1.FunctionTokenExpression({
            expression: source.slice(node.start, node.end),
            name: name,
            arguments: args
        });
    }
}
exports.CallExpressionParser = CallExpressionParser;
class CallExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('CallExpression');
    }
    getParser() {
        return new CallExpressionParser();
    }
}
exports.CallExpressionParserFactory = CallExpressionParserFactory;
//# sourceMappingURL=CallExpressionParser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalExpressionParserFactory = exports.ConditionalExpressionParser = void 0;
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class ConditionalExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, source, parseNode } = event;
        const { test, consequent, alternate } = node;
        const args = [test, consequent, alternate].map((arg) => parseNode({ node: arg, source }));
        return new token_expressions_1.TernaryFunctionTokenExpression({
            expression: source.slice(node.start, node.end),
            arguments: [args[0], args[1], args[2]]
        });
    }
}
exports.ConditionalExpressionParser = ConditionalExpressionParser;
class ConditionalExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('ConditionalExpression');
    }
    getParser() {
        return new ConditionalExpressionParser();
    }
}
exports.ConditionalExpressionParserFactory = ConditionalExpressionParserFactory;
//# sourceMappingURL=ConditionalExpressionParser.js.map
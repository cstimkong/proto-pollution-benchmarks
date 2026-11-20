"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayExpressionParserFactory = exports.ArrayExpressionParser = void 0;
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class ArrayExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, source, parseNode } = event;
        const elements = node.elements.map((element) => parseNode({ node: element, source }));
        return new token_expressions_1.ArrayTokenExpression({
            expression: source.slice(node.start, node.end),
            elements: elements
        });
    }
}
exports.ArrayExpressionParser = ArrayExpressionParser;
class ArrayExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('ArrayExpression');
    }
    getParser() {
        return new ArrayExpressionParser();
    }
}
exports.ArrayExpressionParserFactory = ArrayExpressionParserFactory;
//# sourceMappingURL=ArrayExpressionParser.js.map
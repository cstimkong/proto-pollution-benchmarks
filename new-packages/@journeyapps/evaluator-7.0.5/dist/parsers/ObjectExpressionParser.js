"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectExpressionParserFactory = exports.ObjectExpressionParser = void 0;
const types_1 = require("@babel/types");
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class ObjectExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, source, parseNode } = event;
        const props = {};
        for (const prop of node.properties) {
            if ((0, types_1.isObjectProperty)(prop) && (0, types_1.isIdentifier)(prop.key)) {
                props[prop.key.name] = parseNode({ node: prop.value, source });
            }
        }
        return new token_expressions_1.ObjectTokenExpression({ expression: source.slice(node.start, node.end), properties: props });
    }
}
exports.ObjectExpressionParser = ObjectExpressionParser;
class ObjectExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('ObjectExpression');
    }
    getParser() {
        return new ObjectExpressionParser();
    }
}
exports.ObjectExpressionParserFactory = ObjectExpressionParserFactory;
//# sourceMappingURL=ObjectExpressionParser.js.map
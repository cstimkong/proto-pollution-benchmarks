"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackExpressionParser = void 0;
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class FallbackExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node, source } = event;
        return new token_expressions_1.FunctionTokenExpression({
            expression: source.slice(node.start, node.end)
        });
    }
}
exports.FallbackExpressionParser = FallbackExpressionParser;
//# sourceMappingURL=FallbackExpressionParser.js.map
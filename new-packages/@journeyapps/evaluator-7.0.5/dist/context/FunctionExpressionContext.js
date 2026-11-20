"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionExpressionContextFactory = exports.FunctionExpressionContext = void 0;
const token_expressions_1 = require("../token-expressions");
const ParseContext_1 = require("./ParseContext");
class FunctionExpressionContext extends ParseContext_1.ParseContext {
    static isInstanceOf(context) {
        return (context === null || context === void 0 ? void 0 : context.type) === FunctionExpressionContext.TYPE;
    }
    constructor() {
        super(FunctionExpressionContext.TYPE);
    }
}
exports.FunctionExpressionContext = FunctionExpressionContext;
FunctionExpressionContext.TYPE = 'function-expression-context';
class FunctionExpressionContextFactory extends ParseContext_1.ParseContextFactory {
    inferParseContext(source) {
        if (token_expressions_1.FunctionTokenExpression.hasPrefix(source.trim())) {
            return new FunctionExpressionContext();
        }
        return null;
    }
}
exports.FunctionExpressionContextFactory = FunctionExpressionContextFactory;
//# sourceMappingURL=FunctionExpressionContext.js.map
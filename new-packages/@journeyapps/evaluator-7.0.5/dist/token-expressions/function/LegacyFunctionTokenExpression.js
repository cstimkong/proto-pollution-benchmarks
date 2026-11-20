"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyFunctionTokenExpression = void 0;
/**
 * Legacy function token expression.
 */
const TokenExpression_1 = require("../TokenExpression");
const ConstantTokenExpression_1 = require("../constant/ConstantTokenExpression");
class LegacyFunctionTokenExpression extends TokenExpression_1.TokenExpression {
    constructor(options) {
        super(LegacyFunctionTokenExpression.TYPE, Object.assign(Object.assign({}, options), { isFunction: true }));
    }
    /**
     * Generate a constant token expression from legacy function token expression.
     * @param {boolean} [includeEscapeTags] if "{" and "}" format string escape tags should be included or not
     */
    toConstant(includeEscapeTags = false) {
        let constantExpression = this.expression;
        if (includeEscapeTags) {
            constantExpression = '{' + constantExpression + '}';
        }
        return new ConstantTokenExpression_1.ConstantTokenExpression({ expression: constantExpression, start: this.start });
    }
    tokenEvaluatePromise(scope) {
        throw new Error('not implemented');
    }
    clone() {
        return new LegacyFunctionTokenExpression(this.options);
    }
}
exports.LegacyFunctionTokenExpression = LegacyFunctionTokenExpression;
LegacyFunctionTokenExpression.TYPE = 'legacy-function-expression';
//# sourceMappingURL=LegacyFunctionTokenExpression.js.map
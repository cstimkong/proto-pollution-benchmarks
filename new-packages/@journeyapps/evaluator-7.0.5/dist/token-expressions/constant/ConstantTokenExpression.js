"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantTokenExpression = void 0;
/**
 * Constant token expression.
 */
const TokenExpression_1 = require("../TokenExpression");
class ConstantTokenExpression extends TokenExpression_1.TokenExpression {
    static isInstanceOf(obj) {
        return (obj === null || obj === void 0 ? void 0 : obj.type) === ConstantTokenExpression.TYPE;
    }
    constructor(options) {
        super(ConstantTokenExpression.TYPE, Object.assign(Object.assign({}, options), { isConstant: true }));
    }
    /**
     * Concatenate a token to current token and return a new token.
     */
    concat(token) {
        // start value should be start of first token
        return new ConstantTokenExpression({ expression: this.expression.concat(token.expression), start: this.start });
    }
    async tokenEvaluatePromise(scope) {
        return this.expression;
    }
    /**
     * Get the value of the constant token expression.
     */
    valueOf() {
        return this.expression;
    }
    stringify() {
        return `'${this.expression}'`;
    }
    clone() {
        return new ConstantTokenExpression(this.options);
    }
}
exports.ConstantTokenExpression = ConstantTokenExpression;
ConstantTokenExpression.TYPE = 'constant-expression';
//# sourceMappingURL=ConstantTokenExpression.js.map
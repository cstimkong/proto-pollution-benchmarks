"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveConstantTokenExpression = void 0;
/**
 *  Non-String Constant token expression
 */
const ConstantTokenExpression_1 = require("./ConstantTokenExpression");
class PrimitiveConstantTokenExpression extends ConstantTokenExpression_1.ConstantTokenExpression {
    static isInstanceOf(obj) {
        return (obj === null || obj === void 0 ? void 0 : obj.type) === PrimitiveConstantTokenExpression.TYPE;
    }
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { isPrimitive: true }));
        this.type = PrimitiveConstantTokenExpression.TYPE;
    }
    isNullLiteral() {
        var _a;
        return (_a = this.options.isNullLiteral) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Concatenate a token to current token and return a new token.
     */
    concat(token) {
        // start value should be start of first token
        return new ConstantTokenExpression_1.ConstantTokenExpression({
            expression: `${this.expression}`.concat(token.expression),
            start: this.start
        });
    }
    stringify() {
        return `${this.expression}`;
    }
    clone() {
        return new PrimitiveConstantTokenExpression(this.options);
    }
}
exports.PrimitiveConstantTokenExpression = PrimitiveConstantTokenExpression;
PrimitiveConstantTokenExpression.TYPE = 'primitive-constant-expression';
//# sourceMappingURL=PrimitiveConstantTokenExpression.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectTokenExpression = void 0;
const TokenExpression_1 = require("../TokenExpression");
/**
 * Expression that represents an object literal.
 * Example {a: user.name, b: "foo"}
 */
class ObjectTokenExpression extends TokenExpression_1.TokenExpression {
    constructor(options) {
        super(ObjectTokenExpression.TYPE, options);
    }
    get properties() {
        return this.options.properties;
    }
    async tokenEvaluatePromise(scope) {
        return scope.evaluateFunctionExpression(this.expression);
    }
    clone() {
        const cloneProps = Object.fromEntries(Object.entries(this.properties).map(([key, value]) => [key, value.clone()]));
        return new ObjectTokenExpression(Object.assign(Object.assign({}, this.options), { properties: cloneProps }));
    }
}
exports.ObjectTokenExpression = ObjectTokenExpression;
ObjectTokenExpression.TYPE = 'object-expression';
//# sourceMappingURL=ObjectTokenExpression.js.map
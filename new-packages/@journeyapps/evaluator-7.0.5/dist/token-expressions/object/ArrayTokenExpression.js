"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTokenExpression = void 0;
const TokenExpression_1 = require("../TokenExpression");
class ArrayTokenExpression extends TokenExpression_1.TokenExpression {
    constructor(options) {
        super(ArrayTokenExpression.TYPE, options);
    }
    async tokenEvaluatePromise(scope) {
        return scope.evaluateFunctionExpression(this.expression);
    }
    clone() {
        return new ArrayTokenExpression(Object.assign(Object.assign({}, this.options), { elements: [...this.options.elements.map((e) => e.clone())] }));
    }
}
exports.ArrayTokenExpression = ArrayTokenExpression;
ArrayTokenExpression.TYPE = 'array-expression';
//# sourceMappingURL=ArrayTokenExpression.js.map
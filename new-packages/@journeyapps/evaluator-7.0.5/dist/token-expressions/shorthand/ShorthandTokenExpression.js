"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValueAsync = exports.ShorthandTokenExpression = void 0;
const tools_1 = require("../../tools");
const TokenExpression_1 = require("../TokenExpression");
class ShorthandTokenExpression extends TokenExpression_1.TokenExpression {
    constructor(options) {
        var _a;
        super(ShorthandTokenExpression.TYPE, Object.assign(Object.assign({}, options), { isShorthand: true, name: (_a = options.name) !== null && _a !== void 0 ? _a : options.expression }));
    }
    async tokenEvaluatePromise(scope) {
        let expression = this.expression;
        if (expression.length > 0 && expression[0] == '?') {
            expression = expression.substring(1);
        }
        const value = await scope.getValuePromise(expression);
        const type = scope.getExpressionType(expression);
        return formatValueAsync(value, type, this.format);
    }
    clone() {
        return new ShorthandTokenExpression(this.options);
    }
}
exports.ShorthandTokenExpression = ShorthandTokenExpression;
ShorthandTokenExpression.TYPE = 'shorthand-expression';
async function formatValueAsync(value, type, format) {
    if (value != null && typeof value._display == 'function') {
        // Object - recursive promise-based formatting.
        return value._display();
    }
    else {
        return (0, tools_1.formatValue)(value, type, format);
    }
}
exports.formatValueAsync = formatValueAsync;
//# sourceMappingURL=ShorthandTokenExpression.js.map
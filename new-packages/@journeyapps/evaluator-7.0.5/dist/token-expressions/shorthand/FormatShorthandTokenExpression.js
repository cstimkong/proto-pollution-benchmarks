"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatShorthandTokenExpression = void 0;
/**
 * Shorthand token expression with format specifier.
 */
const ShorthandTokenExpression_1 = require("./ShorthandTokenExpression");
/**
 * asset.price:.2f
 */
class FormatShorthandTokenExpression extends ShorthandTokenExpression_1.ShorthandTokenExpression {
    constructor(options) {
        super(options);
        this.type = FormatShorthandTokenExpression.TYPE;
    }
    stringify() {
        return `${super.stringify()}:${this.options.format}`;
    }
    toString() {
        return '[object ' + this.constructor.name + ' <' + this.expression + ', ' + this.start + ', ' + this.format + '>]';
    }
}
exports.FormatShorthandTokenExpression = FormatShorthandTokenExpression;
FormatShorthandTokenExpression.TYPE = 'format-shorthand-expression';
//# sourceMappingURL=FormatShorthandTokenExpression.js.map
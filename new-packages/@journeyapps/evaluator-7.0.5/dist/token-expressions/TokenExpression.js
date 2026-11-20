"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpression = void 0;
class TokenExpression {
    constructor(type, options) {
        if (this.constructor === TokenExpression) {
            throw new Error('Cannot instantiate abstract TokenExpression class!');
        }
        this.type = type;
        this.options = Object.assign({ isPrimitive: false, isConstant: false, isShorthand: false, isFunction: false, isComputed: false }, options);
        this.expression = this.options.expression;
        this.isPrimitive = this.options.isPrimitive;
    }
    get start() {
        return this.options.start;
    }
    set start(start) {
        this.options.start = start;
    }
    get format() {
        var _a;
        return (_a = this.options.format) !== null && _a !== void 0 ? _a : null;
    }
    isConstant() {
        return this.options.isConstant;
    }
    isShorthand() {
        return this.options.isShorthand;
    }
    isFunction() {
        return this.options.isFunction;
    }
    stringify() {
        return this.expression;
    }
    toString() {
        return '[object ' + this.constructor.name + ' <' + this.expression + ', ' + this.start + '>]';
    }
}
exports.TokenExpression = TokenExpression;
//# sourceMappingURL=TokenExpression.js.map
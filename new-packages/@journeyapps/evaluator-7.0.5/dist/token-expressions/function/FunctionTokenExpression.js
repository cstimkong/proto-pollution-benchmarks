"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionTokenExpression = void 0;
const FunctionExpressionContext_1 = require("../../context/FunctionExpressionContext");
const TokenExpressionParser_1 = require("../../TokenExpressionParser");
const TokenExpression_1 = require("../TokenExpression");
const ConstantTokenExpression_1 = require("../constant/ConstantTokenExpression");
class FunctionTokenExpression extends TokenExpression_1.TokenExpression {
    static isInstanceOf(obj) {
        return (obj === null || obj === void 0 ? void 0 : obj.type) === FunctionTokenExpression.TYPE;
    }
    static parse(source) {
        return TokenExpressionParser_1.TokenExpressionParser.get().parse({
            source,
            context: new FunctionExpressionContext_1.FunctionExpressionContext()
        });
    }
    constructor(options) {
        super(FunctionTokenExpression.TYPE, Object.assign(Object.assign({}, options), { isFunction: true }));
        this.expression = FunctionTokenExpression.trimPrefix(this.expression);
        if (!this.options.name) {
            const startBracket = this.expression.indexOf('(');
            this.setFunctionName(this.expression.slice(0, startBracket > 0 ? startBracket : this.expression.length));
        }
    }
    get arguments() {
        return this.options.arguments;
    }
    functionName() {
        return this.options.name;
    }
    setFunctionName(name) {
        this.options.name = name;
    }
    isCallExpression() {
        return this.arguments != null;
    }
    async tokenEvaluatePromise(scope) {
        return scope.evaluateFunctionExpression(this.expression);
    }
    /**
     * Generate a constant token expression from function token expression.
     * @param {boolean} [includeEscapeTags] if "{" and "}" format string escape tags should be included or not
     */
    toConstant(includeEscapeTags = false) {
        let constantExpression = `${FunctionTokenExpression.PREFIX}${this.expression}`;
        if (includeEscapeTags) {
            constantExpression = '{' + constantExpression + '}';
        }
        return new ConstantTokenExpression_1.ConstantTokenExpression({ expression: constantExpression, start: this.start });
    }
    stringify() {
        if (this.isCallExpression()) {
            const argStrings = this.arguments.map((arg) => arg.stringify());
            return `${this.functionName()}(${argStrings.join(', ')})`;
        }
        return this.expression;
    }
    clone() {
        return new FunctionTokenExpression(Object.assign(Object.assign({}, this.options), { arguments: this.arguments != null ? [...this.arguments.map((a) => a.clone())] : undefined }));
    }
    static trimPrefix(expression) {
        // remove indicator prefix from expression
        expression = expression.trim();
        if (FunctionTokenExpression.hasPrefix(expression)) {
            return expression.slice(FunctionTokenExpression.PREFIX.length);
        }
        return expression;
    }
    static hasPrefix(expression) {
        return expression.startsWith(FunctionTokenExpression.PREFIX);
    }
}
exports.FunctionTokenExpression = FunctionTokenExpression;
FunctionTokenExpression.TYPE = 'function-token-expression';
/**
 * Prefix for function token expressions.
 */
FunctionTokenExpression.PREFIX = '$:';
//# sourceMappingURL=FunctionTokenExpression.js.map
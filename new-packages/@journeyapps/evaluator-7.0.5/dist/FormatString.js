"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEnclosingBraces = exports.FormatString = void 0;
const FormatStringContext_1 = require("./context/FormatStringContext");
const FunctionExpressionContext_1 = require("./context/FunctionExpressionContext");
const token_expressions_1 = require("./token-expressions");
const TokenExpressionParser_1 = require("./TokenExpressionParser");
const tools_1 = require("./tools");
/**
 * Construct a new format string expression.
 */
class FormatString {
    static isInstanceOf(val) {
        return (val === null || val === void 0 ? void 0 : val.type) === FormatString.TYPE;
    }
    constructor(options) {
        this.expression = options.expression || '';
        this.tokens = FormatString.compile(this.expression);
        this.type = FormatString.TYPE;
    }
    static fromTokens(tokens) {
        const result = new FormatString({ expression: '' });
        result.tokens = [];
        let start = 0;
        tokens.forEach((token) => {
            token.start = start;
            if (token.isConstant() && !token.isPrimitive) {
                result.expression += token.expression;
                start += token.expression.length;
            }
            else {
                let exp = '{';
                if (token_expressions_1.FunctionTokenExpression.isInstanceOf(token)) {
                    exp += token_expressions_1.FunctionTokenExpression.PREFIX;
                }
                exp += `${token.stringify()}}`;
                result.expression += exp;
                start += exp.length;
            }
            result.tokens.push(token);
        });
        return result;
    }
    /**
     * Compile a format string expression into tokens.
     */
    static compile(expression) {
        const parser = TokenExpressionParser_1.TokenExpressionParser.get();
        let start = 0;
        const tokens = [];
        const len = expression.length;
        while (true) {
            const i = expression.indexOf('{', start);
            if (i < 0 || i == len - 1) {
                // end of string - everything is normal text
                const rest = FormatString.unescape(expression.substring(start));
                if (rest.length > 0) {
                    tokens.push(new token_expressions_1.ConstantTokenExpression({ expression: rest, start }));
                }
                break;
            }
            // normal text in the gaps between curly braces
            const betweenText = FormatString.unescape(expression.substring(start, i));
            if (betweenText.length > 0) {
                tokens.push(new token_expressions_1.ConstantTokenExpression({ expression: betweenText, start }));
            }
            if (expression[i + 1] == '{') {
                // Double left brace - escape and continue
                tokens.push(new token_expressions_1.ConstantTokenExpression({ expression: '{', start }));
                start = i + 2;
                continue;
            }
            const parsedBraces = FormatString.parseEnclosingBraces(expression.substring(i));
            if (!parsedBraces) {
                // Brace pair faulty (no closing brace), return as a constant
                tokens.push(new token_expressions_1.ConstantTokenExpression({ expression: expression.substring(i), start }));
                break;
            }
            // Next start is at the end of the currently parsed brace pair
            start = i + parsedBraces.length + 1;
            // `spec` is everything between the curly braces "{" and "}".
            const spec = expression.substring(i + 1, i + parsedBraces.length).trim();
            if (spec.indexOf('?') === 0) {
                throw new Error('Usage of ? in expressions is not supported.');
            }
            const context = token_expressions_1.FunctionTokenExpression.hasPrefix(spec)
                ? new FunctionExpressionContext_1.FunctionExpressionContext()
                : new FormatStringContext_1.FormatStringContext();
            const parsedToken = parser.parse({ source: spec, context: context });
            if (parsedToken) {
                parsedToken.start = i;
                tokens.push(parsedToken);
            }
        }
        // concatenate any neighbouring constant token expressions
        const result = [];
        let last = null;
        for (let j = 0; j < tokens.length; j++) {
            const token = tokens[j];
            if (token_expressions_1.ConstantTokenExpression.isInstanceOf(token) || token_expressions_1.PrimitiveConstantTokenExpression.isInstanceOf(token)) {
                if (last == null) {
                    last = token;
                }
                else {
                    last = last.concat(token);
                }
            }
            else {
                if (last != null) {
                    result.push(last);
                    last = null;
                }
                result.push(token);
            }
        }
        if (last != null) {
            result.push(last);
        }
        return result;
    }
    /**
     * If the format string is constant (i.e. no values need to be evaluated).
     */
    isConstant() {
        // constants format strings will only contain a single constant token
        return this.tokens.length == 1 && this.tokens[0].isConstant();
    }
    // Example on an asset:
    // '{room} {room.name} {room.building.name}' => {'room' => {'building' => {}}}
    // This will recursively evaluate format strings where required.
    extractRelationshipStructure(type, depth, into) {
        if (depth == null) {
            depth = 0;
        }
        else if (depth > 5) {
            return {};
        }
        const result = into || {};
        const tokens = this.tokens;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.isShorthand()) {
                const expression = token.expression;
                (0, tools_1.extract)(type, expression, result, depth);
            }
        }
        return result;
    }
    validate(scopeType) {
        const tokens = this.tokens;
        const results = [];
        for (let i = 0; i < tokens.length; i++) {
            // validate all shorthand and function token expressions (ignore constant token expressions)
            const token = tokens[i];
            let expression = token.expression;
            if (token.isShorthand()) {
                let warnQuestionMark = false;
                if (expression.length > 0 && expression[0] == '?') {
                    expression = expression.substring(1);
                    warnQuestionMark = true;
                }
                const type = scopeType.getType(expression);
                if (type == null) {
                    results.push({
                        start: token.start + 1,
                        end: token.start + 1 + token.expression.length,
                        type: 'error',
                        message: "'" + token.expression + "' is not defined"
                    });
                }
                else if (warnQuestionMark) {
                    results.push({
                        start: token.start + 1,
                        end: token.start + 2,
                        type: 'warning',
                        message: 'Usage of ? in expressions is deprecated.'
                    });
                }
            }
            if (token.isFunction()) {
                // TODO: validate that function exists in view
            }
        }
        return results;
    }
    validateAndReturnRecordings(scopeType) {
        const tokens = this.tokens;
        const recordings = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (!token.isConstant()) {
                const expression = token.expression;
                // We are interested in the type and name of the final two variables in the expression
                const arrayOfVariables = scopeType.getVariableTypeAndNameWithParent(expression);
                if (arrayOfVariables[0] == null && scopeType.name != 'view') {
                    // This can happen in, e.g., an object table where the attribute is on its own as a property
                    arrayOfVariables[0] = {
                        // Override to the scopeType
                        type: scopeType.name,
                        isPrimitiveType: scopeType.isPrimitiveType,
                        name: 'n/a'
                    };
                }
                recordings.push(arrayOfVariables);
            }
        }
        return recordings;
    }
    getConstantValue() {
        if (!this.isConstant()) {
            throw new Error('Not constant!');
        }
        return this.tokens[0].valueOf();
    }
    async evaluatePromise(scope) {
        const tokens = this.tokens;
        let promises = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.isConstant()) {
                // Constant tokens are skipped here (nothing to evaluate).
            }
            else {
                const promise = token.tokenEvaluatePromise(scope);
                promises.push(promise);
            }
        }
        let results = await Promise.all(promises);
        let result = '';
        let promiseIndex = 0;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.isConstant()) {
                result += token.valueOf();
            }
            else {
                result += results[promiseIndex];
                promiseIndex += 1;
            }
        }
        return result;
    }
    /**
     * If not all values are loaded yet, null is returned.
     */
    evaluate(scope) {
        const tokens = this.tokens;
        let result = '';
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.isConstant() && !(token_expressions_1.PrimitiveConstantTokenExpression.isInstanceOf(token) && token.isNullLiteral())) {
                result += `${token.valueOf()}`;
            }
            else if (token.isFunction()) {
                // Not supported - return the original expression
                result += token.toConstant(true).valueOf();
            }
            else {
                let expression = `${token.expression}`;
                if (expression.length > 0 && expression[0] == '?') {
                    expression = expression.substring(1);
                }
                const value = scope.getValue(expression);
                if (value === undefined) {
                    // Still loading
                    return null;
                }
                else {
                    const type = scope.getExpressionType(expression);
                    const text = (0, tools_1.formatValue)(value, type, token.format);
                    result += text;
                }
            }
        }
        return result;
    }
    // This helps speed up dirty-checking.
    // With this, we can use "by reference" checking in watches.
    valueOf() {
        return this.expression;
    }
    toString() {
        return this.expression;
    }
    static parseEnclosingBraces(format) {
        const i = format.indexOf('{');
        if (i === -1) {
            return null;
        }
        // We want to skip through these sections
        // i.e. do not match { in a string, e.g. "{"
        const SPECIAL_SECTIONS = ["'", '"'];
        for (let k = i + 1; k < format.length; k++) {
            const character = format[k];
            if (SPECIAL_SECTIONS.indexOf(character) !== -1) {
                // This is the start of a string, jump to its end
                const endChar = format.indexOf(character, k + 1);
                if (endChar === -1) {
                    // Unless the end doesn't exist. Error out.
                    return null;
                }
                k = endChar;
                continue;
            }
            if (character === '{') {
                // Start of a pair of inner braces,
                // recursively parse them
                const inner = FormatString.parseEnclosingBraces(format.substring(k));
                if (!inner) {
                    // Faulty inner, return null
                    return null;
                }
                k += inner.length;
                continue;
            }
            if (character === '}') {
                // Found closing part for current level of braces
                // Return the length to the caller
                return { length: k - i };
            }
        }
        // Came to end of loop without a match. Faulty, return null
        return null;
    }
    /**
     * Removes one set of curly braces from the string.
     * Example {{foo}} -> {foo}
     */
    static unescape(s) {
        let start = 0;
        let result = '';
        const len = s.length;
        while (true) {
            const i = s.indexOf('}', start);
            if (i == -1 || i == len - 1) {
                result += s.substring(start);
                break;
            }
            result += s.substring(start, i + 1);
            // We assume that the character at i+1 is another right brace, but we don't do any checking.
            start = i + 2;
        }
        return result;
    }
}
exports.FormatString = FormatString;
FormatString.TYPE = 'format-string';
exports.parseEnclosingBraces = FormatString.parseEnclosingBraces;
//# sourceMappingURL=FormatString.js.map
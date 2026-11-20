"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = exports.getObjectType = exports.extract = exports.formatValue = exports.actionableTokenExpression = exports.functionTokenExpression = exports.formatString = void 0;
const FormatString_1 = require("./FormatString");
const token_expressions_1 = require("./token-expressions");
/**
 * Create format string.
 */
function formatString(expression) {
    if (expression == null) {
        return null;
    }
    else {
        return new FormatString_1.FormatString({ expression });
    }
}
exports.formatString = formatString;
/**
 # Construct a function token expression from a raw expression string.
 */
function functionTokenExpression(expression, allowLegacy = true) {
    if (expression == null) {
        return null;
    }
    if (expression.trim().indexOf(token_expressions_1.FunctionTokenExpression.PREFIX) === 0) {
        return token_expressions_1.FunctionTokenExpression.parse(expression);
    }
    if (allowLegacy) {
        // assume legacy function token expression (if allowed) at this point
        return new token_expressions_1.LegacyFunctionTokenExpression({ expression });
    }
    return null;
}
exports.functionTokenExpression = functionTokenExpression;
/**
 * Create a token expression that can be evaluated.
 */
function actionableTokenExpression(expression) {
    if (expression == null) {
        return null;
    }
    if (expression.trim().indexOf(token_expressions_1.FunctionTokenExpression.PREFIX) === 0) {
        return token_expressions_1.FunctionTokenExpression.parse(expression);
    }
    const colon = expression.indexOf(':');
    if (colon === -1) {
        return new token_expressions_1.ShorthandTokenExpression({ expression });
    }
    return new token_expressions_1.FormatShorthandTokenExpression({
        expression: expression.substring(0, colon),
        format: expression.substring(colon + 1)
    });
}
exports.actionableTokenExpression = actionableTokenExpression;
/**
 * Format an expression with a specific format.
 */
function formatValue(value, type, format) {
    if (value == null) {
        return '';
    }
    else if (type != null) {
        return type.format(value, format);
    }
    else {
        // This should generally not happen. However, we still try to handle it gracefully.
        // This is useful for tests where we don't want to define the type for every variable.
        return value.toString();
    }
}
exports.formatValue = formatValue;
function extract(type, expression, into, depth) {
    const dot = expression.indexOf('.');
    if (dot < 0) {
        const objectType = getObjectType(type, expression);
        if (objectType == null) {
            // Not an object - don't continue
        }
        else {
            const b = {};
            b[expression] = objectType.displayFormat.extractRelationshipStructure(objectType, depth + 1);
            deepMerge(into, b);
        }
    }
    else {
        const head = expression.substring(0, dot); // The first part of the expression
        const tail = expression.substring(dot + 1); // The rest of the expression
        const child = getObjectType(type, head);
        if (child == null) {
            // nothing
        }
        else {
            if (!(head in into)) {
                into[head] = {};
            }
            extract(child, tail, into[head], depth + 1);
        }
    }
}
exports.extract = extract;
function getObjectType(parent, name) {
    const variable = parent.getAttribute(name);
    if (variable != null) {
        const type = variable.type;
        if (type.isObject) {
            return type;
        }
    }
    return null;
}
exports.getObjectType = getObjectType;
// Merge hashes of hashes (no non-hash values)
// Sample:
//   deepMerge({a: {}}, {b: {}}) => {a: {}, b: {}}
//   deepMerge({a: {b: {c: {}}}, d: {}}, {a: {e: {}}}) => {a: {b: {c: {}}, e: {}}, d: {}}
function deepMerge(a, b) {
    if (typeof a != 'object' || typeof b != 'object') {
        throw new Error('Parameters must be objects only');
    }
    Object.keys(b).forEach(function (key) {
        if (!(key in a)) {
            // There are no actual "values" here, except for more nested hashes.
            // The presence of keys is the important part.
            a[key] = {};
        }
        deepMerge(a[key], b[key]);
    });
    return a;
}
exports.deepMerge = deepMerge;
//# sourceMappingURL=tools.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableFormatStringScope = void 0;
class VariableFormatStringScope {
    constructor(variableScope) {
        this.variableScope = variableScope;
    }
    getExpressionType(expression) {
        if (this.variableScope.type == null) {
            // Mostly for tests, which are too lazy to define this.
            return null;
        }
        return this.variableScope.type.getType(expression);
    }
    getValue(expression) {
        if (expression.length > 0 && expression[0] == '?') {
            expression = expression.substring(1);
        }
        return VariableFormatStringScope.getValue(this.variableScope, expression);
    }
    getValuePromise(expression) {
        return VariableFormatStringScope.getValuePromise(this.variableScope, expression);
    }
    evaluateFunctionExpression(expression) {
        throw new Error('Not supported');
    }
    static getValue(scope, expression, depth) {
        return VariableFormatStringScope.retrieveValue(scope, expression, depth, false);
    }
    static async getValuePromise(scope, expression, depth = 0) {
        return VariableFormatStringScope.retrieveValue(scope, expression, depth, true);
    }
    static retrieveValue(scope, expression, depth, isPromise) {
        if (expression == 'null' || expression == null) {
            return null;
        }
        if (expression == 'true') {
            return true;
        }
        if (expression == 'false') {
            return false;
        }
        if (scope == null) {
            return null;
        }
        if (typeof expression != 'string') {
            throw new Error('Expression must be a string got: ' + typeof expression);
        }
        const dot = expression.indexOf('.');
        if (dot < 0) {
            return isPromise
                ? VariableFormatStringScope.promise(scope, expression)
                : VariableFormatStringScope.cached(scope, expression);
        }
        const head = expression.substring(0, dot); // The first part of the expression
        const tail = expression.substring(dot + 1); // The rest of the expression
        if (isPromise) {
            return VariableFormatStringScope.promise(scope, head).then((child) => {
                return VariableFormatStringScope.retrieveValue(child, tail, depth + 1, isPromise);
            });
        }
        const child = VariableFormatStringScope.cached(scope, head);
        if (child === undefined) {
            return undefined;
        }
        return VariableFormatStringScope.retrieveValue(child, tail, depth + 1, isPromise);
    }
    static async promise(scope, name) {
        if (typeof scope._get == 'function') {
            // DatabaseObject
            return scope._get(name);
        }
        if (typeof scope[name] == 'function') {
            return scope[name]();
        }
        return scope[name];
    }
    static cached(scope, name) {
        if (typeof scope._cached == 'function') {
            return scope._cached(name);
        }
        else {
            const val = scope[name];
            if (val === undefined) {
                return null;
            }
            else {
                return val;
            }
        }
    }
}
exports.VariableFormatStringScope = VariableFormatStringScope;
//# sourceMappingURL=VariableFormatStringScope.js.map
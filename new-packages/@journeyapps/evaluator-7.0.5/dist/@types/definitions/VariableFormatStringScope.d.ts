import { FormatStringScope } from './FormatStringScope';
import { TypeInterface } from './TypeInterface';
import { VariableScope } from './VariableScope';
export declare class VariableFormatStringScope implements FormatStringScope {
    variableScope: VariableScope;
    constructor(variableScope: VariableScope);
    getExpressionType(expression: string): TypeInterface;
    getValue(expression: string): any;
    getValuePromise(expression: string): Promise<any>;
    evaluateFunctionExpression(expression: string): Promise<any>;
    static getValue(scope: VariableScope, expression: string, depth?: number): any;
    static getValuePromise(scope: VariableScope, expression: string, depth?: number): Promise<any>;
    static retrieveValue(scope: VariableScope, expression: string, depth: number, isPromise: boolean): any;
    static promise(scope: VariableScope, name: string): Promise<any>;
    static cached(scope: VariableScope, name: string): any;
}

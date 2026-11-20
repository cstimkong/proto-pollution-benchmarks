import { AttributeValidationError } from '@journeyapps/core-xml';
import { FormatStringScope } from './definitions/FormatStringScope';
import { TypeInterface } from './definitions/TypeInterface';
import { TokenExpression } from './token-expressions';
export interface FormatStringOptions {
    expression: string;
}
/**
 * Construct a new format string expression.
 */
export declare class FormatString {
    static TYPE: string;
    type: string;
    expression: string;
    tokens: TokenExpression[];
    static isInstanceOf(val: any): val is FormatString;
    constructor(options: FormatStringOptions);
    static fromTokens(tokens: TokenExpression[]): FormatString;
    /**
     * Compile a format string expression into tokens.
     */
    static compile(expression: string): TokenExpression[];
    /**
     * If the format string is constant (i.e. no values need to be evaluated).
     */
    isConstant(): boolean;
    extractRelationshipStructure(type: TypeInterface, depth?: number, into?: any): any;
    validate(scopeType: TypeInterface): AttributeValidationError[];
    validateAndReturnRecordings(scopeType: TypeInterface): {
        type: string;
        isPrimitiveType: boolean;
        name: string;
    }[][];
    getConstantValue(): any;
    evaluatePromise(scope: FormatStringScope): Promise<string>;
    /**
     * If not all values are loaded yet, null is returned.
     */
    evaluate(scope: FormatStringScope): string;
    valueOf(): string;
    toString(): string;
    static parseEnclosingBraces(format: string): {
        length: number;
    };
    /**
     * Removes one set of curly braces from the string.
     * Example {{foo}} -> {foo}
     */
    static unescape(s: string): string;
}
export declare const parseEnclosingBraces: typeof FormatString.parseEnclosingBraces;

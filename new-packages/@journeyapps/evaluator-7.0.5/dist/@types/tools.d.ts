import { TypeInterface } from './definitions/TypeInterface';
import { FormatString } from './FormatString';
import { FormatShorthandTokenExpression, FunctionTokenExpression, LegacyFunctionTokenExpression, ShorthandTokenExpression } from './token-expressions';
/**
 * Create format string.
 */
export declare function formatString(expression: string): FormatString | null;
/**
 # Construct a function token expression from a raw expression string.
 */
export declare function functionTokenExpression(expression: string, allowLegacy?: boolean): FunctionTokenExpression<import("./token-expressions").FunctionTokenExpressionOptions> | LegacyFunctionTokenExpression;
/**
 * Create a token expression that can be evaluated.
 */
export declare function actionableTokenExpression(expression: string): FunctionTokenExpression | ShorthandTokenExpression | FormatShorthandTokenExpression;
/**
 * Format an expression with a specific format.
 */
export declare function formatValue(value: any, type: TypeInterface, format: string): string;
export declare function extract(type: TypeInterface, expression: string, into: any, depth: number): void;
export declare function getObjectType(parent: any, name: string): any;
export declare function deepMerge(a: any, b: any): any;

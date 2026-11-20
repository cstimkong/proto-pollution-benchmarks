/**
 * Constant token expression.
 */
import { TokenExpression, TokenExpressionOptions } from '../TokenExpression';
import { FormatStringScope } from '../../definitions/FormatStringScope';
export declare class ConstantTokenExpression<O extends TokenExpressionOptions = TokenExpressionOptions> extends TokenExpression<O> {
    static TYPE: string;
    static isInstanceOf(obj: any): obj is ConstantTokenExpression;
    constructor(options: O);
    /**
     * Concatenate a token to current token and return a new token.
     */
    concat(token: ConstantTokenExpression): ConstantTokenExpression;
    tokenEvaluatePromise(scope: FormatStringScope): Promise<string>;
    /**
     * Get the value of the constant token expression.
     */
    valueOf(): string;
    stringify(): string;
    clone(): this;
}

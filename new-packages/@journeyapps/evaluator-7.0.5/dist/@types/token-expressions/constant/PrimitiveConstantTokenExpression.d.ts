/**
 *  Non-String Constant token expression
 */
import { ConstantTokenExpression } from './ConstantTokenExpression';
import { TokenExpressionOptions } from '../TokenExpression';
export interface PrimitiveConstantTokenExpressionOptions extends TokenExpressionOptions {
    expression: any;
    isNullLiteral?: boolean;
}
export declare class PrimitiveConstantTokenExpression extends ConstantTokenExpression<PrimitiveConstantTokenExpressionOptions> {
    static readonly TYPE = "primitive-constant-expression";
    static isInstanceOf(obj: any): obj is PrimitiveConstantTokenExpression;
    constructor(options: PrimitiveConstantTokenExpressionOptions);
    isNullLiteral(): boolean;
    /**
     * Concatenate a token to current token and return a new token.
     */
    concat(token: ConstantTokenExpression): ConstantTokenExpression;
    stringify(): string;
    clone(): this;
}

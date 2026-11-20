import { FormatStringScope } from '../../definitions/FormatStringScope';
import { TokenExpression, TokenExpressionOptions } from '../TokenExpression';
export interface ArrayExpressionTokenOptions extends TokenExpressionOptions {
    elements: TokenExpression[];
}
export declare class ArrayTokenExpression extends TokenExpression<ArrayExpressionTokenOptions> {
    static readonly TYPE = "array-expression";
    constructor(options: ArrayExpressionTokenOptions);
    tokenEvaluatePromise(scope: FormatStringScope): Promise<any>;
    clone(): this;
}

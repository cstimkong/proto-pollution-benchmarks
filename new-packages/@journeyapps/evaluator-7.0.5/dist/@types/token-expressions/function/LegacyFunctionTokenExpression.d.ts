/**
 * Legacy function token expression.
 */
import { TokenExpression, TokenExpressionOptions } from '../TokenExpression';
import { ConstantTokenExpression } from '../constant/ConstantTokenExpression';
import { FormatStringScope } from '../../definitions/FormatStringScope';
export declare class LegacyFunctionTokenExpression extends TokenExpression {
    static readonly TYPE = "legacy-function-expression";
    constructor(options: TokenExpressionOptions);
    /**
     * Generate a constant token expression from legacy function token expression.
     * @param {boolean} [includeEscapeTags] if "{" and "}" format string escape tags should be included or not
     */
    toConstant(includeEscapeTags?: boolean): ConstantTokenExpression;
    tokenEvaluatePromise(scope: FormatStringScope): Promise<string>;
    clone(): this;
}

/**
 * Shorthand token expression with format specifier.
 */
import { ShorthandTokenExpression, ShorthandTokenExpressionOptions } from './ShorthandTokenExpression';
export interface FormatShorthandTokenExpressionOptions extends ShorthandTokenExpressionOptions {
    format: string;
}
/**
 * asset.price:.2f
 */
export declare class FormatShorthandTokenExpression extends ShorthandTokenExpression<FormatShorthandTokenExpressionOptions> {
    static readonly TYPE = "format-shorthand-expression";
    constructor(options: FormatShorthandTokenExpressionOptions);
    stringify(): string;
    toString(): string;
}

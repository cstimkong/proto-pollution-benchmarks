import { FormatStringScope } from '../../definitions/FormatStringScope';
import { TypeInterface } from '../../definitions/TypeInterface';
import { TokenExpression, TokenExpressionOptions } from '../TokenExpression';
/**
 * Shorthand token expression.
 *
 * <var name="my_user" type="user">
 *
 * <info value="{my_user.name}" />
 *
 * Above is a shorthand for
 *
 * <info value="{$:view.my_user.name}" />
 */
export interface ShorthandTokenExpressionOptions extends TokenExpressionOptions {
    name?: string;
    properties?: TokenExpression[];
}
export declare class ShorthandTokenExpression<O extends ShorthandTokenExpressionOptions = ShorthandTokenExpressionOptions> extends TokenExpression<O> {
    static TYPE: string;
    constructor(options: O);
    tokenEvaluatePromise(scope: FormatStringScope): Promise<string>;
    clone(): this;
}
export declare function formatValueAsync(value: any, type: TypeInterface, format: string): Promise<string>;

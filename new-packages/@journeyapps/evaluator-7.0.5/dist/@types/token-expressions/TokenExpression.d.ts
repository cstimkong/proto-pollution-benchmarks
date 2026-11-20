import { FormatStringScope } from '../definitions/FormatStringScope';
export interface TokenExpressionOptions {
    expression: string;
    start?: number;
    format?: string;
    isPrimitive?: boolean;
    isConstant?: boolean;
    isShorthand?: boolean;
    /**
     * If the token expression is a function that needs to be called or not.
     */
    isFunction?: boolean;
    isComputed?: boolean;
}
export declare abstract class TokenExpression<O extends TokenExpressionOptions = TokenExpressionOptions, V extends any = any> {
    type: string;
    expression: string;
    options: O;
    isPrimitive: boolean;
    protected constructor(type: string, options: O);
    abstract tokenEvaluatePromise(scope: FormatStringScope): Promise<V>;
    abstract clone(): this;
    get start(): number | null;
    set start(start: number);
    get format(): string | null;
    isConstant(): boolean;
    isShorthand(): boolean;
    isFunction(): boolean;
    stringify(): string;
    toString(): string;
}

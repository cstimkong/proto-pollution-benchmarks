import { TokenExpression, TokenExpressionOptions } from '../TokenExpression';
import { ConstantTokenExpression } from '../constant/ConstantTokenExpression';
import { FormatStringScope } from '../../definitions/FormatStringScope';
export interface FunctionTokenExpressionOptions extends TokenExpressionOptions {
    name?: string;
    arguments?: TokenExpression[];
    /**
     * Used for non-call expressions to store properties.
     * Example: `$:object.property` or `$:view.user['name']`
     */
    properties?: TokenExpression[];
}
export declare class FunctionTokenExpression<T extends FunctionTokenExpressionOptions = FunctionTokenExpressionOptions> extends TokenExpression<T> {
    static TYPE: string;
    static isInstanceOf(obj: any): obj is FunctionTokenExpression;
    /**
     * Prefix for function token expressions.
     */
    static PREFIX: string;
    static parse(source: string): FunctionTokenExpression<FunctionTokenExpressionOptions>;
    constructor(options: T);
    get arguments(): TokenExpression[] | null;
    functionName(): string;
    setFunctionName(name: string): void;
    isCallExpression(): boolean;
    tokenEvaluatePromise(scope: FormatStringScope): Promise<any>;
    /**
     * Generate a constant token expression from function token expression.
     * @param {boolean} [includeEscapeTags] if "{" and "}" format string escape tags should be included or not
     */
    toConstant(includeEscapeTags?: boolean): ConstantTokenExpression;
    stringify(): string;
    clone(): this;
    static trimPrefix(expression: string): string;
    static hasPrefix(expression: string): boolean;
}

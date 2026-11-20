import { FormatStringScope } from '../../definitions/FormatStringScope';
import { TokenExpression, TokenExpressionOptions } from '../TokenExpression';
export interface ObjectExpressionTokenOptions extends TokenExpressionOptions {
    properties: Record<string, TokenExpression>;
}
/**
 * Expression that represents an object literal.
 * Example {a: user.name, b: "foo"}
 */
export declare class ObjectTokenExpression extends TokenExpression<ObjectExpressionTokenOptions, object> {
    static readonly TYPE = "object-expression";
    constructor(options: ObjectExpressionTokenOptions);
    get properties(): Record<string, TokenExpression>;
    tokenEvaluatePromise(scope: FormatStringScope): Promise<any>;
    clone(): this;
}

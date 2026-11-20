import { TokenExpression } from '../TokenExpression';
import { FunctionTokenExpression, FunctionTokenExpressionOptions } from './FunctionTokenExpression';
export interface TernaryFunctionTokenExpressionOptions extends Omit<FunctionTokenExpressionOptions, 'name' | 'arguments'> {
    arguments: TokenExpression[];
}
export declare class TernaryFunctionTokenExpression extends FunctionTokenExpression<TernaryFunctionTokenExpressionOptions> {
    constructor(options: TernaryFunctionTokenExpressionOptions);
    stringify(): string;
    clone(): this;
}

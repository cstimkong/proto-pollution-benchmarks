import { ParseContext, ParseContextFactory } from './ParseContext';
export declare class FunctionExpressionContext extends ParseContext {
    static readonly TYPE = "function-expression-context";
    static isInstanceOf(context: ParseContext | null): context is FunctionExpressionContext;
    constructor();
}
export declare class FunctionExpressionContextFactory extends ParseContextFactory<FunctionExpressionContext> {
    inferParseContext(source: string): FunctionExpressionContext | null;
}

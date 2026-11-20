import { CallExpression } from '@babel/types';
import { FunctionTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export declare class CallExpressionParser extends AbstractExpressionParser<CallExpression, FunctionTokenExpression> {
    parse(event: ExpressionNodeParseEvent<CallExpression>): FunctionTokenExpression<{
        expression: string;
        name: string;
        arguments: import("../token-expressions").TokenExpression<import("../token-expressions").TokenExpressionOptions, any>[];
    }>;
}
export declare class CallExpressionParserFactory extends ExpressionParserFactory<CallExpressionParser> {
    constructor();
    getParser(): CallExpressionParser;
}

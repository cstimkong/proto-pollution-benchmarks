import { ConditionalExpression } from '@babel/types';
import { FunctionTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export declare class ConditionalExpressionParser extends AbstractExpressionParser<ConditionalExpression, FunctionTokenExpression> {
    parse(event: ExpressionNodeParseEvent<ConditionalExpression>): FunctionTokenExpression;
}
export declare class ConditionalExpressionParserFactory extends ExpressionParserFactory<ConditionalExpressionParser> {
    constructor();
    getParser(): ConditionalExpressionParser;
}

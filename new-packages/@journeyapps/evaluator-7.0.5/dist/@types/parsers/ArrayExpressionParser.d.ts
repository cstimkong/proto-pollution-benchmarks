import { ArrayExpression } from '@babel/types';
import { ArrayTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionNodeParseEvent, ExpressionParserFactory } from './AbstractExpressionParser';
export declare class ArrayExpressionParser extends AbstractExpressionParser<ArrayExpression, ArrayTokenExpression> {
    parse(event: ExpressionNodeParseEvent<ArrayExpression>): ArrayTokenExpression;
}
export declare class ArrayExpressionParserFactory extends ExpressionParserFactory<ArrayExpressionParser> {
    constructor();
    getParser(): ArrayExpressionParser;
}

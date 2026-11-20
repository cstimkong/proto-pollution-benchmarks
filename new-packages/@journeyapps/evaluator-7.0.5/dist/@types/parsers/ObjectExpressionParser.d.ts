import { ObjectExpression } from '@babel/types';
import { ObjectTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionNodeParseEvent, ExpressionParserFactory } from './AbstractExpressionParser';
export declare class ObjectExpressionParser extends AbstractExpressionParser<ObjectExpression, ObjectTokenExpression> {
    parse(event: ExpressionNodeParseEvent<ObjectExpression>): ObjectTokenExpression;
}
export declare class ObjectExpressionParserFactory extends ExpressionParserFactory<ObjectExpressionParser> {
    constructor();
    getParser(): ObjectExpressionParser;
}

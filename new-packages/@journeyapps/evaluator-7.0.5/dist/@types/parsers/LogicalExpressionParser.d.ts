import { LogicalExpression, UnaryExpression, BinaryExpression } from '@babel/types';
import { FunctionTokenExpression, FunctionTokenExpressionOptions } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export type LogicalExpressionType = LogicalExpression | UnaryExpression | BinaryExpression;
export declare class LogicalExpressionParser extends AbstractExpressionParser<LogicalExpressionType, FunctionTokenExpression> {
    parse(event: ExpressionNodeParseEvent<LogicalExpressionType>): FunctionTokenExpression<FunctionTokenExpressionOptions>;
}
export declare class LogicalExpressionParserFactory extends ExpressionParserFactory<LogicalExpressionParser> {
    constructor();
    getParser(): LogicalExpressionParser;
}

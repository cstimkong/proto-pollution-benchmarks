import { Directive, ExpressionStatement, LabeledStatement } from '@babel/types';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export type ExpressionType = ExpressionStatement | Directive | LabeledStatement;
export declare class ExpressionNodeParser extends AbstractExpressionParser<ExpressionType> {
    parse(event: ExpressionNodeParseEvent<ExpressionType>): import("..").TokenExpression<import("..").TokenExpressionOptions, any>;
}
export declare class ExpressionNodeParserFactory extends ExpressionParserFactory<ExpressionNodeParser> {
    constructor();
    getParser(): ExpressionNodeParser;
}

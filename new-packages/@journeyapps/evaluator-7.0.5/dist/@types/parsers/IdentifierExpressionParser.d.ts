import { Identifier } from '@babel/types';
import { FormatShorthandTokenExpression, FunctionTokenExpression, ShorthandTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export type ParsedIdentifierExpressionType = FunctionTokenExpression | ShorthandTokenExpression | FormatShorthandTokenExpression;
export declare class IdentifierExpressionParser extends AbstractExpressionParser<Identifier, ParsedIdentifierExpressionType> {
    parse(event: ExpressionNodeParseEvent<Identifier>): FunctionTokenExpression<{
        expression: string;
    }> | ShorthandTokenExpression<{
        expression: string;
    }>;
}
export declare class IdentifierExpressionParserFactory extends ExpressionParserFactory<IdentifierExpressionParser> {
    constructor();
    getParser(): IdentifierExpressionParser;
}

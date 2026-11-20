import { DirectiveLiteral, Literal } from '@babel/types';
import { ConstantTokenExpression, FunctionTokenExpression, PrimitiveConstantTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export type LiteralExpression = Literal | DirectiveLiteral;
export type ParsedLiteralExpressionType = ConstantTokenExpression | FunctionTokenExpression | PrimitiveConstantTokenExpression;
export declare class LiteralExpressionParser extends AbstractExpressionParser<LiteralExpression, ParsedLiteralExpressionType> {
    parse(event: ExpressionNodeParseEvent<LiteralExpression>): PrimitiveConstantTokenExpression | FunctionTokenExpression<{
        expression: string;
    }> | ConstantTokenExpression<{
        expression: string;
    }>;
}
export declare class LiteralExpressionParserFactory extends ExpressionParserFactory<LiteralExpressionParser> {
    constructor();
    getParser(): LiteralExpressionParser;
}

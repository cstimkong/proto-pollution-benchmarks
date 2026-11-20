import { BlockStatement } from '@babel/types';
import { ConstantTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export declare class BlockStatementParser extends AbstractExpressionParser<BlockStatement> {
    parse(event: ExpressionNodeParseEvent<BlockStatement>): import("../token-expressions").TokenExpression<import("../token-expressions").TokenExpressionOptions, any> | ConstantTokenExpression<{
        expression: string;
    }>;
}
export declare class BlockStatementParserFactory extends ExpressionParserFactory<BlockStatementParser> {
    constructor();
    getParser(): BlockStatementParser;
}

import { FunctionTokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionNodeParseEvent } from './AbstractExpressionParser';
import { Node } from '@babel/types';
export declare class FallbackExpressionParser extends AbstractExpressionParser<Node, FunctionTokenExpression> {
    parse(event: ExpressionNodeParseEvent): FunctionTokenExpression;
}

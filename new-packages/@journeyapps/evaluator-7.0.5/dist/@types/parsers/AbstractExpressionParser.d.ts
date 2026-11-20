import { Node, Aliases } from '@babel/types';
import { TokenExpression } from '../token-expressions';
import { ParseNodeEvent } from '../TokenExpressionParser';
export type NodeType = Node['type'] | keyof Aliases;
export interface ExpressionNodeParseEvent<N extends Node = Node> extends ParseNodeEvent<N> {
    parseNode(event: ParseNodeEvent): TokenExpression | null;
}
export declare abstract class AbstractExpressionParser<N extends Node = Node, T extends TokenExpression = TokenExpression, E extends ExpressionNodeParseEvent<N> = ExpressionNodeParseEvent<N>> {
    abstract parse(event: E): T;
}
export declare abstract class ExpressionParserFactory<P extends AbstractExpressionParser = AbstractExpressionParser> {
    types: NodeType[];
    constructor(types: NodeType | NodeType[]);
    abstract getParser(): P;
    canParse(type: NodeType): boolean;
}

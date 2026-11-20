/// <reference types="lodash" />
import { Node } from '@babel/types';
import LRUCache from 'lru-cache';
import { ParseContext, ParseContextFactory } from './context/ParseContext';
import { AbstractExpressionParser, ExpressionParserFactory, NodeType } from './parsers';
import { TokenExpression } from './token-expressions';
export interface TokenExpressionParseEvent {
    source: string;
    context?: ParseContext;
}
export interface ParseNodeEvent<N extends Node = Node> extends TokenExpressionParseEvent {
    node: N;
}
export declare class TokenExpressionParser {
    cache: LRUCache<string, TokenExpression>;
    parserFactories: ExpressionParserFactory[];
    contextFactories: ParseContextFactory[];
    static instance: TokenExpressionParser;
    static get(): TokenExpressionParser;
    constructor();
    parse<T extends TokenExpression = TokenExpression>(event: TokenExpressionParseEvent): T | null;
    parseNode(event: ParseNodeEvent): TokenExpression | null;
    registerParserFactory(factory: ExpressionParserFactory): void;
    registerContextFactory(factory: ParseContextFactory): void;
    transformSource(event: TokenExpressionParseEvent): string;
    getParser: ((nodeType: NodeType) => AbstractExpressionParser) & import("lodash").MemoizedFunction;
    inferContext(source: string): ParseContext | null;
}

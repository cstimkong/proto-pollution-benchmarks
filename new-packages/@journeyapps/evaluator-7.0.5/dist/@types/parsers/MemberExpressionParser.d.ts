import { MemberExpression } from '@babel/types';
import { FormatShorthandTokenExpression, FunctionTokenExpression, ShorthandTokenExpression, ShorthandTokenExpressionOptions, TokenExpression } from '../token-expressions';
import { AbstractExpressionParser, ExpressionParserFactory, ExpressionNodeParseEvent } from './AbstractExpressionParser';
export type MemberExpressionParsedType = FunctionTokenExpression | ShorthandTokenExpression | FormatShorthandTokenExpression;
/**
 * Parses member expressions like:
 *
 * object.property1
 * object[param].property2
 * object['property1'].property2
 */
export declare class MemberExpressionParser extends AbstractExpressionParser<MemberExpression, MemberExpressionParsedType> {
    parse(event: ExpressionNodeParseEvent<MemberExpression>): ShorthandTokenExpression<ShorthandTokenExpressionOptions> | FunctionTokenExpression<ShorthandTokenExpressionOptions>;
    static parseMember(event: ExpressionNodeParseEvent<MemberExpression>, properties?: TokenExpression[]): {
        objectName: string;
        properties: TokenExpression[];
    };
}
export declare class MemberExpressionParserFactory extends ExpressionParserFactory<MemberExpressionParser> {
    constructor();
    getParser(): MemberExpressionParser;
}

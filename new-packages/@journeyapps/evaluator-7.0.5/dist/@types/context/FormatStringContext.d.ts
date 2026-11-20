import { Statement } from '@babel/types';
import { ParseContext, ParseContextFactory } from './ParseContext';
export declare class FormatStringContext extends ParseContext {
    static readonly TYPE = "format-string-context";
    static isInstanceOf(context: ParseContext | null): context is FormatStringContext;
    constructor();
    getFormatSpecifier(stm: Statement | null): string | null;
    static isEnclosedInSingleCurlyBrackets(source: string): boolean;
}
export declare class FormatStringContextFactory extends ParseContextFactory<FormatStringContext> {
    inferParseContext(source: string): FormatStringContext | null;
}

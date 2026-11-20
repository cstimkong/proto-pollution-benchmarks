import { SourceTransformer } from '../transformers';
export interface ParseContextOptions {
    transformers?: SourceTransformer[];
}
export declare abstract class ParseContext {
    readonly type: string;
    options: ParseContextOptions;
    protected constructor(type: string, options?: ParseContextOptions);
    hasTransformers(): boolean;
    /**
     * Transform the source code before parsing.
     */
    transformSource(source: string): string;
}
export declare abstract class ParseContextFactory<C extends ParseContext = ParseContext> {
    abstract inferParseContext(source: string): C | null;
}

import { SourceTransformer } from './SourceTransformer';
/** Transforms format specifiers in source code;
 * value:0n -> value; $format = "0n"
 */
export declare class FormatSpecifierTransformer extends SourceTransformer {
    static TYPE: string;
    static SOURCE_IDENTIFIER: string;
    constructor();
    transform(source: string): string;
}

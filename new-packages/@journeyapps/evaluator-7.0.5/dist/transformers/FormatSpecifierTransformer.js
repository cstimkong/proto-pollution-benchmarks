"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatSpecifierTransformer = void 0;
const SourceTransformer_1 = require("./SourceTransformer");
/**
 * Matches format specifiers in expressions in the form of `value:n`, `value:0n` or `value:.2f`
 */
const MATCH_FORMAT_SPECIFIER = /(?<!['"])[^{}]*[^\$](:(\.?\d+f?)[^{}]*)(?!['"])/;
/** Transforms format specifiers in source code;
 * value:0n -> value; $format = "0n"
 */
class FormatSpecifierTransformer extends SourceTransformer_1.SourceTransformer {
    constructor() {
        super(FormatSpecifierTransformer.TYPE);
    }
    transform(source) {
        // Regex matching is expensive, so we first check if the source at least contains a colon
        if (source.indexOf(':') === -1) {
            return source;
        }
        /**
         * Match the format specifier in the source code.
         * match = [group, format specifier with colon, format specifier value]
         */
        const match = source.match(MATCH_FORMAT_SPECIFIER);
        if (match) {
            const [_, formatWithColon, format] = match;
            return source.replace(formatWithColon, `; ${FormatSpecifierTransformer.SOURCE_IDENTIFIER} = "${format}";`);
        }
        return source;
    }
}
exports.FormatSpecifierTransformer = FormatSpecifierTransformer;
FormatSpecifierTransformer.TYPE = 'format-specifier-transformer';
FormatSpecifierTransformer.SOURCE_IDENTIFIER = `$format`;
//# sourceMappingURL=FormatSpecifierTransformer.js.map
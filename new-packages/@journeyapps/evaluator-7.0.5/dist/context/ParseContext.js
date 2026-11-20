"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseContextFactory = exports.ParseContext = void 0;
class ParseContext {
    constructor(type, options) {
        this.type = type;
        this.options = Object.assign({ transformers: [] }, options);
    }
    hasTransformers() {
        return this.options.transformers.length > 0;
    }
    /**
     * Transform the source code before parsing.
     */
    transformSource(source) {
        return this.options.transformers.reduce((source, transformer) => transformer.transform(source), source);
    }
}
exports.ParseContext = ParseContext;
class ParseContextFactory {
}
exports.ParseContextFactory = ParseContextFactory;
//# sourceMappingURL=ParseContext.js.map
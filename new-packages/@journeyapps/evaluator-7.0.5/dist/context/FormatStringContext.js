"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatStringContextFactory = exports.FormatStringContext = void 0;
const types_1 = require("@babel/types");
const transformers_1 = require("../transformers");
const ParseContext_1 = require("./ParseContext");
class FormatStringContext extends ParseContext_1.ParseContext {
    static isInstanceOf(context) {
        return (context === null || context === void 0 ? void 0 : context.type) === FormatStringContext.TYPE;
    }
    constructor() {
        super(FormatStringContext.TYPE, {
            transformers: [new transformers_1.FormatSpecifierTransformer(), new transformers_1.BlockStatementTransformer()]
        });
    }
    getFormatSpecifier(stm) {
        if (!(0, types_1.isExpressionStatement)(stm)) {
            return null;
        }
        const { expression } = stm;
        if (!(0, types_1.isAssignmentExpression)(expression)) {
            return null;
        }
        return (0, types_1.isStringLiteral)(expression.right) ? expression.right.value : null;
    }
    static isEnclosedInSingleCurlyBrackets(source) {
        // Check if the source is enclosed in curly braces and not in double curly braces
        const trimmed = source.trim();
        if (trimmed.indexOf('{') === 0 && trimmed.lastIndexOf('}') === trimmed.length - 1) {
            if (trimmed.charAt(1) != '{') {
                return true;
            }
        }
        return false;
    }
}
exports.FormatStringContext = FormatStringContext;
FormatStringContext.TYPE = 'format-string-context';
class FormatStringContextFactory extends ParseContext_1.ParseContextFactory {
    inferParseContext(source) {
        if (FormatStringContext.isEnclosedInSingleCurlyBrackets(source)) {
            return new FormatStringContext();
        }
        return null;
    }
}
exports.FormatStringContextFactory = FormatStringContextFactory;
//# sourceMappingURL=FormatStringContext.js.map
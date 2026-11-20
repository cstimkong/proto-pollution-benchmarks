"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockStatementParserFactory = exports.BlockStatementParser = void 0;
const types_1 = require("@babel/types");
const FormatStringContext_1 = require("../context/FormatStringContext");
const FunctionExpressionContext_1 = require("../context/FunctionExpressionContext");
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class BlockStatementParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        var _a;
        const { node, source, context, parseNode } = event;
        // If parent is also a BlockStatement means we have an escaped FormatString, e.g. {{value}}
        // and it will be handled by `ExpressionStatement` lower down
        if ((0, types_1.isBlockStatement)((_a = node.extra) === null || _a === void 0 ? void 0 : _a.parent)) {
            return null;
        }
        const [body, formatStm] = node.body;
        if ((0, types_1.isBlockStatement)(body)) {
            return new token_expressions_1.ConstantTokenExpression({ expression: source.slice(body.start, body.end) });
        }
        // Example `{$:foo()}`
        if ((0, types_1.isLabeledStatement)(body)) {
            const { body: child } = body;
            child.extra = Object.assign(Object.assign({}, child.extra), { parent: node });
            return parseNode(Object.assign(Object.assign({}, event), { node: child, context: new FunctionExpressionContext_1.FunctionExpressionContext() }));
        }
        // Example `{item.price}`
        if ((0, types_1.isExpressionStatement)(body)) {
            const { expression: child } = body;
            child.extra = Object.assign(Object.assign({}, child.extra), { parent: node });
            // Example `{item.price; $format = ".2f"}
            if (FormatStringContext_1.FormatStringContext.isInstanceOf(context)) {
                child.extra.format = context.getFormatSpecifier(formatStm);
            }
            return parseNode(Object.assign(Object.assign({}, event), { node: child }));
        }
    }
}
exports.BlockStatementParser = BlockStatementParser;
class BlockStatementParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('BlockStatement');
    }
    getParser() {
        return new BlockStatementParser();
    }
}
exports.BlockStatementParserFactory = BlockStatementParserFactory;
//# sourceMappingURL=BlockStatementParser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberExpressionParserFactory = exports.MemberExpressionParser = void 0;
const types_1 = require("@babel/types");
const FunctionExpressionContext_1 = require("../context/FunctionExpressionContext");
const token_expressions_1 = require("../token-expressions");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
/**
 * Parses member expressions like:
 *
 * object.property1
 * object[param].property2
 * object['property1'].property2
 */
class MemberExpressionParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        var _a;
        const { node, source, context } = event;
        const expr = source.slice(node.start, node.end);
        const { objectName, properties } = MemberExpressionParser.parseMember(event);
        const options = {
            expression: expr,
            name: objectName,
            properties: properties
        };
        if (FunctionExpressionContext_1.FunctionExpressionContext.isInstanceOf(context)) {
            return new token_expressions_1.FunctionTokenExpression(options);
        }
        const format = (_a = node.extra) === null || _a === void 0 ? void 0 : _a.format;
        return format == null
            ? new token_expressions_1.ShorthandTokenExpression(options)
            : new token_expressions_1.FormatShorthandTokenExpression(Object.assign(Object.assign({}, options), { format: format }));
    }
    static parseMember(event, properties = []) {
        const { node, source, parseNode } = event;
        const propertyExpr = parseNode({
            node: node.property,
            source: source.slice(node.property.start, node.property.end)
        });
        propertyExpr.options.isComputed = node.computed;
        // push to front of array
        properties.unshift(propertyExpr);
        if ((0, types_1.isMemberExpression)(node.object)) {
            return MemberExpressionParser.parseMember(Object.assign(Object.assign({}, event), { node: node.object }), properties);
        }
        const objectExpr = parseNode({ node: node.object, source: source.slice(0, node.object.end) });
        return {
            objectName: objectExpr.stringify(),
            properties: properties
        };
    }
}
exports.MemberExpressionParser = MemberExpressionParser;
class MemberExpressionParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super('MemberExpression');
    }
    getParser() {
        return new MemberExpressionParser();
    }
}
exports.MemberExpressionParserFactory = MemberExpressionParserFactory;
//# sourceMappingURL=MemberExpressionParser.js.map
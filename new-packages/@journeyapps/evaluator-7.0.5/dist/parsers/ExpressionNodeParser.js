"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionNodeParserFactory = exports.ExpressionNodeParser = void 0;
const types_1 = require("@babel/types");
const AbstractExpressionParser_1 = require("./AbstractExpressionParser");
class ExpressionNodeParser extends AbstractExpressionParser_1.AbstractExpressionParser {
    parse(event) {
        const { node } = event;
        let expression;
        if ((0, types_1.isLabeledStatement)(node)) {
            expression = node.body;
        }
        else if ((0, types_1.isDirective)(node)) {
            expression = node.value;
        }
        else if ((0, types_1.isAwaitExpression)(node)) {
            expression = node.argument;
        }
        else if ((0, types_1.isExpressionStatement)(node)) {
            expression = node.expression;
        }
        expression.extra = Object.assign(Object.assign({}, expression.extra), { parent: node });
        return event.parseNode(Object.assign(Object.assign({}, event), { node: expression }));
    }
}
exports.ExpressionNodeParser = ExpressionNodeParser;
class ExpressionNodeParserFactory extends AbstractExpressionParser_1.ExpressionParserFactory {
    constructor() {
        super(['Directive', 'AwaitExpression', 'LabeledStatement', 'ExpressionStatement']);
    }
    getParser() {
        return new ExpressionNodeParser();
    }
}
exports.ExpressionNodeParserFactory = ExpressionNodeParserFactory;
//# sourceMappingURL=ExpressionNodeParser.js.map
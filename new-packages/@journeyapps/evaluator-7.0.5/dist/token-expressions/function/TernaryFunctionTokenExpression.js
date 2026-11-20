"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TernaryFunctionTokenExpression = void 0;
const FunctionTokenExpression_1 = require("./FunctionTokenExpression");
class TernaryFunctionTokenExpression extends FunctionTokenExpression_1.FunctionTokenExpression {
    constructor(options) {
        super(Object.assign({}, options));
        this.setFunctionName('');
    }
    stringify() {
        const [test, consequent, alternate] = this.arguments;
        return `${test.stringify()} ? ${consequent.stringify()} : ${alternate.stringify()}`;
    }
    clone() {
        return new TernaryFunctionTokenExpression(Object.assign(Object.assign({}, this.options), { arguments: this.arguments.map((arg) => arg.clone()) }));
    }
}
exports.TernaryFunctionTokenExpression = TernaryFunctionTokenExpression;
//# sourceMappingURL=TernaryFunctionTokenExpression.js.map
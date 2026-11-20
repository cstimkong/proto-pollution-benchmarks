"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockStatementTransformer = void 0;
const SourceTransformer_1 = require("./SourceTransformer");
const ENCLOSED_IN_CURLY_BRACKETS = /^{.*}$/;
/**
 * Wraps source code in a block statement if it is not already
 */
class BlockStatementTransformer extends SourceTransformer_1.SourceTransformer {
    constructor() {
        super(BlockStatementTransformer.TYPE);
    }
    transform(source) {
        return !ENCLOSED_IN_CURLY_BRACKETS.test(source) ? `{${source}}` : source;
    }
}
exports.BlockStatementTransformer = BlockStatementTransformer;
BlockStatementTransformer.TYPE = 'block-statement-transformer';
//# sourceMappingURL=BlockStatementTransformer.js.map
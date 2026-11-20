import { SourceTransformer } from './SourceTransformer';
/**
 * Wraps source code in a block statement if it is not already
 */
export declare class BlockStatementTransformer extends SourceTransformer {
    static TYPE: string;
    constructor();
    transform(source: string): string;
}

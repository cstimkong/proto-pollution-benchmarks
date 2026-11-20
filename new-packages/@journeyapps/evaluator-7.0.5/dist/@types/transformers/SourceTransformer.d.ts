export declare abstract class SourceTransformer {
    readonly type: string;
    constructor(type: string);
    abstract transform(source: string): string;
}

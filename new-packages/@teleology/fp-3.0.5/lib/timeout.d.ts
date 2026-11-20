export declare const sleep: (millis: number, ...params: any[]) => Promise<unknown>;
export declare const race: {
    <T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;
    <T_1 extends [] | readonly unknown[]>(values: T_1): Promise<Awaited<T_1[number]>>;
};
export declare const timeout: (fn: Function, millis?: number) => (...args: any[]) => Promise<any>;

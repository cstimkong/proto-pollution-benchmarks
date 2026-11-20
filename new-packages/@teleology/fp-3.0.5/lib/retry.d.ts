import { AsyncFunction } from "./types";
export declare const retry: (fn: AsyncFunction, max?: number, rolloff?: (retryCount: number) => Promise<void>) => (...args: any[]) => Promise<any>;
export declare const retrySync: (fn: Function, max?: number) => (...args: any[]) => any;

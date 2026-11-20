import { Iterable } from './types';
declare type CurriedGet = Iterable | ((src: Iterable) => Iterable);
export declare const get: (path: string, def?: any, src?: Iterable | undefined) => CurriedGet;
export declare type PickOptions = {
    clean: boolean;
};
export declare const pick: (paths: string[], options?: PickOptions | undefined) => (src: Iterable) => any;
export {};

import { AsyncFunction } from './types';
export declare const poll: (fn: AsyncFunction, it?: number | Function | undefined) => () => void;

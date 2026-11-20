import { Chainable } from "./types";
export declare const curry: (arity: number | undefined, fn: Chainable) => (...args: any[]) => any;

import { Chainable } from "./types";
export declare const nonce: (fn: Chainable, times?: number) => (...args: any[]) => any;
export declare const once: (fn: Chainable) => (...args: any[]) => any;

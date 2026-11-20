import { Chainable } from "./types";
export declare const thennable: (v: any) => any;
export declare const pipe: (...fn: Chainable[]) => (initial?: any) => any;

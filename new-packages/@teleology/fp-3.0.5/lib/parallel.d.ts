import { Chainable } from "./types";
export declare const parallel: (...fns: Chainable[]) => (...args: any[]) => Promise<any[]>;

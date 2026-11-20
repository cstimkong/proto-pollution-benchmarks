import { Chainable } from "./types";
export declare const settle: (it: Array<Chainable> | Function) => Promise<any[]> | ((...args: any[]) => Promise<any>);

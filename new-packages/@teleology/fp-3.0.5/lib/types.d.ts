export declare type Iterable = {
    [key: string | number | symbol]: any;
};
export declare type Equalizer = (v: any, i: number) => boolean;
export declare type AsyncFunction = (...args: any) => Promise<any>;
export declare type Chainable = Promise<any> | AsyncFunction | Function | any;

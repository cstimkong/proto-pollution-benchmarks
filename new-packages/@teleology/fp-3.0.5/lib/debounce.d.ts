export declare function debounce(func: Function, { timeout, leading }: {
    timeout?: number;
    leading?: boolean;
}): (...args: any[]) => void;

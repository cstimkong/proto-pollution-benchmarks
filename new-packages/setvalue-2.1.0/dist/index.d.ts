export type Key = PropertyKey;
export type Path = Key[];
/**
 * Build a valid object shape for a given path.
 */
export type ValidObject<P extends Path> = P extends [infer K extends Key] ? {
    [P in K]?: unknown;
} : P extends [infer K extends Key, ...infer R extends Path] ? {
    [P in K]?: ValidObject<R> | string | number | boolean | symbol | null | undefined;
} : never;
/**
 * Get the value type for a given path in an object.
 */
export type GetValue<T, P extends Path, F = undefined> = T extends object ? P extends [infer K extends keyof T] ? T[K] : P extends [infer K extends keyof T, ...infer R extends Path] ? GetValue<T[K], R, F> : never : F;
/**
 * Create a setter function for a given path.
 */
export declare function set<P extends Path>(...path: P): <T extends ValidObject<P>, V extends GetValue<T, P, never>>(obj: T, value: V) => V;
/**
 * Create a check function for a given path.
 */
export declare function has<P extends Path>(...path: P): (obj: ValidObject<P>) => boolean;
/**
 * Create a getter function for a given path.
 */
export declare function get<P extends Path>(...path: P): <T extends ValidObject<P>>(obj: T) => GetValue<T, P>;

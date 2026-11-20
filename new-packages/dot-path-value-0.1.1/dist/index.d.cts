//#region src/index.d.ts
type Primitive = null | undefined | string | number | boolean | symbol | bigint;
/**
 * Values that are treated as leaves: paths never descend into them.
 * Without this, `Path<{ createdAt: Date }>` would include every `Date` method.
 */
type Terminal = Primitive | Date | RegExp | Error | ((...args: any[]) => any) | Map<any, any> | WeakMap<any, any> | Set<any> | WeakSet<any> | Promise<any>;
type ArrayKey = number;
/**
 * Keys a path segment can be built from. `number` is required because object
 * literals may declare numeric keys (`{ 1: true }`), and `keyof` reports those
 * as number literals rather than strings.
 */
type PathKey = string | number;
type IsTuple<T extends readonly any[]> = number extends T['length'] ? false : true;
type TupleKeys<T extends readonly any[]> = Exclude<keyof T, keyof any[]>;
type MaxPathDepth = 10;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type PathConcat<TKey extends string | number, TValue, TDepth extends number = MaxPathDepth> = TValue extends Terminal ? `${TKey}` : `${TKey}` | `${TKey}.${Path<TValue, TDepth>}`;
type Path<T, TDepth extends number = MaxPathDepth> = [TDepth] extends [never] ? never : T extends readonly (infer V)[] ? IsTuple<T> extends true ? { [K in TupleKeys<T>]-?: PathConcat<K & PathKey, T[K], Prev[TDepth]>; }[TupleKeys<T>] : PathConcat<ArrayKey, V, Prev[TDepth]> : { [K in keyof T]-?: PathConcat<K & PathKey, T[K], Prev[TDepth]>; }[keyof T];
type ArrayPathConcat<TKey extends string | number, TValue, TDepth extends number = MaxPathDepth> = TValue extends Terminal ? never : TValue extends readonly (infer U)[] ? U extends Terminal ? never : `${TKey}` | `${TKey}.${ArrayPath<TValue, TDepth>}` : `${TKey}.${ArrayPath<TValue, TDepth>}`;
type ArrayPath<T, TDepth extends number = MaxPathDepth> = [TDepth] extends [never] ? never : T extends readonly (infer V)[] ? IsTuple<T> extends true ? { [K in TupleKeys<T>]-?: ArrayPathConcat<K & PathKey, T[K], Prev[TDepth]>; }[TupleKeys<T>] : ArrayPathConcat<ArrayKey, V, Prev[TDepth]> : { [K in keyof T]-?: ArrayPathConcat<K & PathKey, T[K], Prev[TDepth]>; }[keyof T];
/**
 * Maps a path segment back to the key it came from. A segment is always a
 * string, so a numeric key such as `{ 1: true }` has to be matched through its
 * numeric literal form.
 */
type ResolveKey<T, TKey> = TKey extends keyof T ? TKey : TKey extends `${infer N extends number}` ? N extends keyof T ? N : never : never;
type PathValue<T, TPath extends Path<T> | ArrayPath<T>> = T extends any ? TPath extends `${infer K}.${infer R}` ? [ResolveKey<T, K>] extends [never] ? K extends `${ArrayKey}` ? T extends readonly (infer V)[] ? PathValue<V, R & Path<V>> : never : never : ResolveKey<T, K> extends (infer TResolved extends keyof T) ? R extends Path<T[TResolved]> ? undefined extends T[TResolved] ? PathValue<T[TResolved], R> | undefined : PathValue<T[TResolved], R> : never : never : [ResolveKey<T, TPath>] extends [never] ? TPath extends `${ArrayKey}` ? T extends readonly (infer V)[] ? V : never : never : ResolveKey<T, TPath> extends (infer TResolved extends keyof T) ? T[TResolved] : never : never;
declare function getByPath<T extends Record<string, any>, TPath extends Path<T>>(obj: T, path: TPath): PathValue<T, TPath>;
declare function setByPath<T extends Record<string, any>, TPath extends Path<T>>(obj: T, path: TPath, value: PathValue<T, TPath>): T;
//#endregion
export { ArrayPath, MaxPathDepth, Path, PathConcat, PathValue, Primitive, Terminal, getByPath, setByPath };
//# sourceMappingURL=index.d.cts.map
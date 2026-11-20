import { parse as parsePath } from 'pathington';
import * as TS from 'ts-toolbelt';
export declare type PathPart = keyof any;
export declare type Path = string | Array<PathPart> | ReadonlyArray<PathPart>;
export declare type ObjectKey = keyof any;
export declare type ObjectLike = Record<ObjectKey, any>;
export declare type DeepGet<Object, PropertyPath extends Path, Fallback = unknown> = PropertyPath extends readonly PathPart[] ? TS.Object.Path<Object, PropertyPath> : PropertyPath extends string ? TS.Object.Path<Object, TS.String.Split<PropertyPath, '.'>> : Fallback;
export declare type DeepOmit<Object, PropertyPath extends Path> = PropertyPath extends string ? DeepOmit<Object, TS.String.Split<PropertyPath, '.'>> : PropertyPath extends [] ? Object : PropertyPath extends [infer Key, ...infer Rest] ? Rest extends [] ? Key extends keyof Object ? Omit<Object, Key> : Object : Rest extends PathPart[] ? Key extends keyof Object ? {
    [Prop in keyof Object]: DeepOmit<Object[Prop], Rest>;
} : Object : Object : Object;
export declare type DeepOmitPaths<Object, PropertyPaths extends Path[]> = PropertyPaths extends [] ? Object : PropertyPaths extends [infer First, ...infer Rest] ? First extends Path ? Rest extends Path[] ? DeepOmitPaths<DeepOmit<Object, First>, Rest> : never : never : never;
export declare const NotFound: unique symbol;
export declare function isObject(object: unknown): object is ObjectLike;
export declare function traverseObject<Return extends unknown = unknown>(object: unknown, path: string[]): Return | typeof NotFound;
export { parsePath };

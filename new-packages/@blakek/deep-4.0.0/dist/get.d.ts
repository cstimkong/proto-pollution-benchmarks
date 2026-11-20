import { DeepGet, ObjectLike, Path } from './shared';
export declare function get<Return, FallbackValue = Return, Input = ObjectLike, PropertyPath extends string[] = string[]>(path: PropertyPath, object: Input, fallbackValue?: FallbackValue): Return | FallbackValue;
export declare function get<PropertyPath extends string | readonly string[], FallbackValue, Input>(path: PropertyPath, object: Input, fallbackValue?: FallbackValue): DeepGet<Input, PropertyPath, FallbackValue>;
export declare function get<Return, FallbackValue = Return, Input = ObjectLike>(path: Path, object: Input, fallbackValue?: FallbackValue): Return | FallbackValue;
export declare function createGetter<Return = unknown, FallbackValue extends Return = Return, Input = ObjectLike>(path: Path, fallbackValue?: FallbackValue): (object: Input) => Return;

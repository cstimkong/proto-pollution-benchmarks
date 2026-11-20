import { DeepOmit, ObjectLike, Path } from './shared';
export declare function remove<Object extends ObjectLike, PropertyPath extends Path, Return = DeepOmit<Object, PropertyPath>>(path: PropertyPath, object: Object): Return;
export declare function remove<Return extends unknown>(path: Path, object: ObjectLike): Return;
export declare function createRemove<PropertyPath extends Path>(path: PropertyPath): <Object extends ObjectLike, Return = DeepOmit<Object, PropertyPath>>(object: Object) => Return;
export declare function createRemove<PropertyPath extends Path>(path: PropertyPath): <Return = unknown>(object: ObjectLike) => Return;

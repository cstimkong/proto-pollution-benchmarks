import { ObjectLike, Path } from './shared';
export declare function set<Value = unknown, Return extends ObjectLike = unknown, Object extends ObjectLike = Return>(value: Value, path: Path, object: Object): Return;
export declare function createSetter<Value = unknown, Return extends ObjectLike = unknown, Object extends ObjectLike = Return>(path: Path, object: Object): (value: Value) => Return;

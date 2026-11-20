import { DeepOmitPaths, ObjectLike, Path } from './shared';
export declare function omit<Object extends ObjectLike, Paths extends Path[], Return = DeepOmitPaths<Object, Paths>>(properties: Paths, object: Object): Return;
export declare function omit<Return extends unknown>(properties: Path[], object: ObjectLike): Return;
export declare function createOmit<Paths extends Path[]>(properties: Paths): <Object extends ObjectLike, Return = DeepOmitPaths<Object, Paths>>(object: Object) => Return;
export declare function createOmit<Paths extends Path[]>(properties: Paths): <Return = unknown>(object: ObjectLike) => Return;

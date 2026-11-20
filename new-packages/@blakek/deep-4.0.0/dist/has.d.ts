import { ObjectLike, Path } from './shared';
export declare function has(path: Path, object: ObjectLike): boolean;
export declare function createHas(path: Path): (object: ObjectLike) => boolean;

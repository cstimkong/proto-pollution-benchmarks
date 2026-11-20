import { ObjectLike, Path } from './shared';
export declare function pluck<Return extends Record<keyof any, any> = Record<keyof any, unknown>>(properties: Path[], object: ObjectLike): Return;
export declare function createPluck<Return extends Record<keyof any, any> = Record<keyof any, unknown>, Input extends ObjectLike = ObjectLike>(properties: Path[]): (object: Input) => Return;

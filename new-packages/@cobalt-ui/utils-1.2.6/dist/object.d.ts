/** deeply-duplicate an object */
export declare function cloneDeep<T = unknown>(item: T): T;
/** set a nested value within an object safely
 * We can assume that all token ids will be dot-notation, so we don't need to handle
 * array accessors or string accessors.
 */
export declare function set<T extends Record<string, any>>(obj: T, key: keyof T, value: any): T;

/** parse an alias */
export declare function parseAlias(input: string): {
    id: string;
    mode?: string;
};
/** @deprecated use getAliasValue instead */
export declare const getAliasID: typeof getAliasValue;
/** Unwrap an alias value */
export declare function getAliasValue(input: string): string;
/** is this token an alias of another? */
export declare function isAlias(value: unknown): boolean;
/** match token against globs */
export declare function isTokenMatch(tokenID: string, globPatterns: string[]): string | undefined;
/** get last segment of a token ID */
export declare function getLocalID(id: string): string;
/** validate token ID */
export declare function invalidTokenIDError(id: string): string | undefined;
/** does a given token ID have a segment? */
export declare function hasSegment(id: string, segment: string): boolean;

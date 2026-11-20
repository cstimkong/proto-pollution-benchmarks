/** UTF-8 char ranges */
export declare const CHARACTER_RE: string[];
export declare const STARTS_WITH_NUMBER_RE: RegExp;
export declare const CASECHANGE_RE: RegExp;
export declare const KEBAB_COVERT_RE: RegExp;
export declare const CAMEL_CONVERT_RE: RegExp;
export declare const LB_RE: RegExp;
export declare const VALID_KEY: RegExp;
/** convert string to kebab-case */
export declare function kebabinate(input: string): string;
/** convert input to camelCase */
export declare function camelize(input: string): string;
/** wrap bad obj keynames in strings */
export declare function objKey(name: string, wrapper?: string): string;
/** pad string lengths */
export declare function padStr(input: string, length: number, alignment?: 'left' | 'center' | 'right'): string;
/** indent an individual line */
export declare function indentLine(input: string, level?: number): string;
export { indentLine as indent };
/** indent a block of text with spaces */
export declare function indentBlock(input: string, spaces: number): string;

export interface TypeInterface {
    name: string;
    options: object;
    isPrimitiveType: boolean;
    objectType?: TypeInterface;
    getVariable(expression: string): any;
    getVariableTypeAndNameWithParent(expression: string): any;
    getType(expression: string): TypeInterface | null;
    toJSON(): any;
    stringify(): string;
    format(value: any, format?: string): string;
}

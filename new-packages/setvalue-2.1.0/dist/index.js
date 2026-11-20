/**
 * Create a setter function for a given path.
 */
export function set(...path) {
    const len = path.length - 1;
    if (len === -1)
        throw new TypeError("Path cannot be empty");
    return (obj, value) => {
        for (let i = 0; i < len; i++) {
            const key = path[i];
            obj = isObject(obj[key]) ? obj[key] : (obj[key] = {});
        }
        return (obj[path[len]] = value);
    };
}
/**
 * Create a check function for a given path.
 */
export function has(...path) {
    const len = path.length - 1;
    if (len === -1)
        throw new TypeError("Path cannot be empty");
    return (obj) => {
        for (let i = 0; i < len; i++) {
            const key = path[i];
            if (!isObject(obj[key]))
                return false;
            obj = obj[key];
        }
        return path[len] in obj;
    };
}
/**
 * Create a getter function for a given path.
 */
export function get(...path) {
    const len = path.length - 1;
    if (len === -1)
        throw new TypeError("Path cannot be empty");
    return (obj) => {
        for (let i = 0; i < len; i++) {
            const key = path[i];
            if (!isObject(obj[key]))
                return undefined;
            obj = obj[key];
        }
        return obj[path[len]];
    };
}
const isObject = (value) => typeof value === "object" && value !== null;
//# sourceMappingURL=index.js.map
/** deeply-duplicate an object */
export function cloneDeep(item) {
    if (!item || typeof item === 'string' || typeof item === 'boolean' || typeof item === 'number') {
        return item;
    }
    if (Array.isArray(item)) {
        const newArr = [];
        for (const i of item) {
            newArr.push(cloneDeep(i));
        }
        return newArr;
    }
    const newObj = {};
    for (const k in item) {
        newObj[k] = cloneDeep(item[k]);
    }
    return newObj;
}
/** set a nested value within an object safely
 * We can assume that all token ids will be dot-notation, so we don't need to handle
 * array accessors or string accessors.
 */
export function set(obj, key, value) {
    const rest = String(key).split('.');
    const root = rest.shift();
    if (root === '') {
        return obj;
    }
    if (rest.length === 0) {
        obj[root] = value;
        return obj;
    }
    obj[root] = obj[root] ?? {};
    return set(obj[root], rest.join('.'), value);
}
//# sourceMappingURL=object.js.map
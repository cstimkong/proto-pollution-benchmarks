import { parse } from 'pathington';
export { parse as parsePath } from 'pathington';

function clone(value) {
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    if (value instanceof Map) {
        var result_1 = new Map();
        value.forEach(function (nestedValue, key) {
            result_1.set(key, clone(nestedValue));
        });
        return result_1;
    }
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags);
    }
    if (value instanceof Set) {
        var result_2 = new Set();
        value.forEach(function (x) {
            result_2.add(clone(x));
        });
        return result_2;
    }
    if (typeof value === 'object') {
        if (value === null) {
            return null;
        }
        var result = (Array.isArray(value) ? [] : {});
        for (var key in value) {
            result[key] = clone(value[key]);
        }
        return result;
    }
    return value;
}

var NotFound = Symbol('value was not found');
function isObject(object) {
    if (object === null) {
        return false;
    }
    var type = typeof object;
    return type === 'object' || type === 'function';
}
function traverseObject(object, path) {
    // If the path has been exhausted, return the current object
    if (path.length === 0) {
        return object;
    }
    // If the value could not be found, return `defaultValue`
    if (!isObject(object)) {
        return NotFound;
    }
    var key = path[0], keys = path.slice(1);
    // Search deeper in the object
    if (key in object) {
        return traverseObject(object[key], keys);
    }
    // The key was not found in the object.
    return NotFound;
}

function get(path, object, fallbackValue) {
    var parsedPath = parse(path);
    var value = traverseObject(object, parsedPath);
    if (value === NotFound || value === undefined) {
        return fallbackValue;
    }
    return value;
}
function createGetter(path, fallbackValue) {
    return function (object) { return get(path, object, fallbackValue); };
}

function has(path, object) {
    var value = traverseObject(object, parse(path));
    return value !== NotFound;
}
function createHas(path) {
    return function (object) { return has(path, object); };
}

function remove(path, object) {
    if (path === undefined) {
        return object;
    }
    var parsedPath = parse(path);
    var referencePath = parsedPath.slice(0, -1);
    var finalPath = parsedPath[parsedPath.length - 1];
    var reference = traverseObject(object, parse(referencePath));
    if (isObject(reference)) {
        delete reference[finalPath];
    }
    return object;
}
function createRemove(path) {
    return function (object) { return remove(path, object); };
}

function omit(properties, object) {
    var cloned = clone(object);
    properties.forEach(function (property) { return remove(property, cloned); });
    return cloned;
}
function createOmit(properties) {
    return function (object) { return omit(properties, object); };
}

function set(value, path, object) {
    var parsedPath = parse(path);
    var reference = object;
    parsedPath.forEach(function (key, index) {
        var isLastElement = index === parsedPath.length - 1;
        if (isLastElement) {
            reference[key] = value;
            return;
        }
        if (!isObject(reference[key])) {
            reference[key] = {};
        }
        reference = reference[key];
    });
    return object;
}
function createSetter(path, object) {
    return function (value) { return set(value, path, object); };
}

function pluck(properties, object) {
    return properties.reduce(function (subset, property) { return set(get(property, object), property, subset); }, {});
}
function createPluck(properties) {
    return function (object) { return pluck(properties, object); };
}

export { NotFound, clone, createGetter, createHas, createOmit, createPluck, createRemove, createSetter, get, has, isObject, omit, pluck, remove, set, traverseObject };
//# sourceMappingURL=index.esm.js.map

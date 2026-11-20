//#region src/index.ts
const UNSAFE_PATH_SEGMENTS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);
const isArrayIndex = (key) => key !== void 0 && /^(?:0|[1-9]\d*)$/.test(key);
function parsePath(path) {
	if (path === "") throw new TypeError("Path must not be empty");
	const segments = path.split(".");
	for (const segment of segments) {
		if (segment === "") throw new TypeError(`Path "${path}" contains an empty segment`);
		if (UNSAFE_PATH_SEGMENTS.has(segment)) throw new TypeError(`Path segment "${segment}" is not allowed (prototype pollution risk)`);
	}
	return segments;
}
function getByPath(obj, path) {
	let acc = obj;
	for (const key of parsePath(path)) {
		if (acc === null || acc === void 0) return;
		acc = acc[key];
	}
	return acc;
}
function setByPath(obj, path, value) {
	const segments = parsePath(path);
	const lastKey = segments.pop();
	let target = obj;
	for (let i = 0; i < segments.length; i++) {
		const key = segments[i];
		const next = hasOwn(target, key) ? target[key] : void 0;
		if (next === void 0 || next === null) target[key] = isArrayIndex(segments[i + 1] ?? lastKey) ? [] : {};
		else if (typeof next !== "object" && typeof next !== "function") throw new TypeError(`Cannot set "${path}": segment "${key}" holds a ${typeof next}, not an object`);
		target = target[key];
	}
	target[lastKey] = value;
	return obj;
}
//#endregion
export { getByPath, setByPath };

//# sourceMappingURL=index.mjs.map
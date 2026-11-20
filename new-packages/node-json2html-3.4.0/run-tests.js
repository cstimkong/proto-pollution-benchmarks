#!/usr/bin/env node
// Minimal mocha-compatible BDD test runner (no npm dependency available in this sandbox).
// Supports describe()/it() exactly as used by this repo's test files: synchronous only.

let stack = [];
let passed = 0, failed = 0;
const failures = [];

global.describe = function (name, fn) {
	stack.push(name);
	try {
		fn();
	} finally {
		stack.pop();
	}
};

global.it = function (name, fn) {
	const full = [...stack, name].join(" > ");
	try {
		fn();
		passed++;
	} catch (e) {
		failed++;
		failures.push({ full, error: e });
	}
};

const files = [
	"./test/test.render.js",
	"./test/test.component.js",
	"./test/test.totext.js",
];

for (const f of files) {
	// Clear require cache for the module under test between files isn't needed;
	// tests share the same json2html singleton the way mocha would (single process run).
	require(f);
}

console.log(`\n${passed} passing, ${failed} failing (of ${passed + failed})\n`);

if (failed) {
	for (const f of failures) {
		console.log(`FAIL: ${f.full}`);
		console.log(`  ${f.error.message}`);
	}
	process.exit(1);
} else {
	console.log("All tests passed.");
	process.exit(0);
}

/**
 * Convert from array key.
 * @function fromArrayKey
 * @param {string} key - Key to convert.
 * @returns {string} - Converted key.
 */
'use strict';

/** @lends fromArrayKey */
function fromArrayKey(key) {
  const indexKey = key.match(/\[([^\]]+)]$/)[1];
  return {
    name: key.replace(/\[[^\]]+]$/, ''),
    index: /^\d+$/.test(indexKey) ? Number(indexKey) : null,
    key: indexKey
  };
}
module.exports = fromArrayKey;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIuLi8uLi9saWIiLCJzb3VyY2VzIjpbImZyb21fYXJyYXlfa2V5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udmVydCBmcm9tIGFycmF5IGtleS5cbiAqIEBmdW5jdGlvbiBmcm9tQXJyYXlLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBLZXkgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQ29udmVydGVkIGtleS5cbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbi8qKiBAbGVuZHMgZnJvbUFycmF5S2V5ICovXG5mdW5jdGlvbiBmcm9tQXJyYXlLZXkgKGtleSkge1xuICBjb25zdCBpbmRleEtleSA9IGtleS5tYXRjaCgvXFxbKFteXFxdXSspXSQvKVsxXVxuICByZXR1cm4ge1xuICAgIG5hbWU6IGtleS5yZXBsYWNlKC9cXFtbXlxcXV0rXSQvLCAnJyksXG4gICAgaW5kZXg6IC9eXFxkKyQvLnRlc3QoaW5kZXhLZXkpID8gTnVtYmVyKGluZGV4S2V5KSA6IG51bGwsXG4gICAga2V5OiBpbmRleEtleSxcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZyb21BcnJheUtleVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0EsU0FBUyxZQUFZLENBQUUsR0FBRyxFQUFFO0VBQzFCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDLE9BQU87SUFDTCxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO0lBQ25DLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJO0lBQ3ZELEdBQUcsRUFBRTtFQUNQLENBQUM7QUFDSDtBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSIsImlnbm9yZUxpc3QiOltdfQ==
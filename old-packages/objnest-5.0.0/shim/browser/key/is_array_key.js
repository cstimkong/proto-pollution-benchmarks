/**
 * Detect is an array key.
 * @memberof module:objnest/lib/key
 * @function isArrayKey
 * @param {string} key - Key to convert.
 * @returns {boolean} - Is array key or not.
 */
'use strict';

/** @lends isArrayKey */
function isArrayKey(key) {
  return /\[[^\]]*]$/.test(key);
}
module.exports = isArrayKey;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIuLi8uLi9saWIiLCJzb3VyY2VzIjpbImlzX2FycmF5X2tleS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERldGVjdCBpcyBhbiBhcnJheSBrZXkuXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm9iam5lc3QvbGliL2tleVxuICogQGZ1bmN0aW9uIGlzQXJyYXlLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBLZXkgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtib29sZWFufSAtIElzIGFycmF5IGtleSBvciBub3QuXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG4vKiogQGxlbmRzIGlzQXJyYXlLZXkgKi9cbmZ1bmN0aW9uIGlzQXJyYXlLZXkgKGtleSkge1xuICByZXR1cm4gL1xcW1teXFxdXSpdJC8udGVzdChrZXkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUtleVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQSxTQUFTLFVBQVUsQ0FBRSxHQUFHLEVBQUU7RUFDeEIsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUMvQjtBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSIsImlnbm9yZUxpc3QiOltdfQ==
/**
 * Strips all all non-arabic-numerals and
 * symbols except '.';
 * @param {string} value value to be stripped of non-arabic-numerals
 * @returns {string} processed value
 * 
 * @example
 * toNumber("1a2b 3c"); // => "123"
 * toNumber("12,3a.123"); // => "123.123"
 */
export function toNumber(value: string = ""): string {
  return value.replace(/[^0-9.]/g, "")
}

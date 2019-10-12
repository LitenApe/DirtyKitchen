/**
 * Converts an number to a value format which
 * fits the supplied locale.
 * @param {string} value
 * @returns {string} local spesific number format
 * 
 * @example
 * const number = 123456.789;
 * toCurrency()(number); // => "123 456,789"
 * toCurrency("de-DE")(number) // => "123.456,789"
 * toCurrency("en-IN")(number) // => "123,456.789"
 */
export function toCurrency(locale: string = "nb-NO"): (value: number) => string {
  return function converter(value: number): string {
    return new Intl.NumberFormat(locale).format(value);
  };
}

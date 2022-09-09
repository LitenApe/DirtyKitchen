/**
 * Converts the value sent to match the supplied format
 * @param {string} format mask e.g. '### ## ###'
 * @returns {string} masked value
 *
 * @example
 * toNumberFormat("### ## ###")("123456789"); // => "123 45 678"
 * toNumberFormat("##/##/####")("123456789"); // => "12/34/5678"
 * toNumberFormat("###### #####")("123456789123") // => "123456 78912"
 * toNumberFormat("### ### ###")("12345"); // => "123 45"
 */
export function toNumberFormat(format: string): (value: string) => string {
    return function converter(value: string): string {
        if (!format) { return value; }

        const digits = value.match(/\d/g);
        let result = '';

        if (!digits) return result;

        for (let i = 0; i < format.length && digits.length > 0; i++) {
            const char = format.charAt(i);
            result += char === '#' && digits ? digits.shift() : char;
        }

        return result;
    };
}

export function toNumberFormat(format: string): (value: string) => string {
  return function converter(value: string): string {
    if (!format) { return value; }

    let processed = value.replace(/\D/g, "");

    for (let i = 0; i < format.length && i < processed.length; i++) {
      if (format.charAt(i) !== "#") {
        processed = processed.slice(0, i) + format.charAt(i) + processed.slice(i);
      }
    }

    return processed.slice(0, format.length);
  };
}

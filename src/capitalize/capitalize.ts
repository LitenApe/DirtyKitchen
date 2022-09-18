/**
 * Transform the first character in any given
 * string to upper cased
 *
 * @param value string we want to capitalize
 * @returns capitalized string
 */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

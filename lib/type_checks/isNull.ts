/**
 * Checks if a given value is null
 *
 * @param value
 * @returns value is null
 */
export function isNull<T>(value: T | null): value is null {
  return value === null;
}

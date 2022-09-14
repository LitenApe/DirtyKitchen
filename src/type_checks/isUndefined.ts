/**
 * Checks if a given value is undefined
 *
 * @param value
 * @returns value is undefined
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
  return typeof value === 'undefined';
}

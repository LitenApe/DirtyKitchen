import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

/**
 * Check if the given argument is not undefined or null
 *
 * @param value {T | undefined | null} value which we want to verify the presence of
 * @returns returns whether or not the value is defined
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return !isUndefined(value) && !isNull(value);
}

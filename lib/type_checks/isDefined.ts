import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

export function isDefined<T>(value: T | undefined | null): value is T {
  return !isUndefined(value) && !isNull(value);
}

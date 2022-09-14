import { isDefined } from './isDefined';

/**
 * Check whether the object has a given property and verifies
 * that the value stored in the property is not undefined or null
 * @param record
 * @param property
 * @returns whether or not the property on a given object holds a value or not
 */
export function hasProperty<
  R extends Record<string | number | symbol, unknown>,
  P extends string | number | symbol,
>(
  record: R,
  property: P,
): record is R &
  Record<P, P extends keyof R ? Exclude<R[P], undefined | null> : unknown> {
  return isDefined(record[property]);
}

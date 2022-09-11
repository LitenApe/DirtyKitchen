import { isDefined } from './isDefined';

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

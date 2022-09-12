import { isDefined } from '../isDefined';

describe('isDefined', () => {
  test('returns "false" if value is undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });

  test('returns "false" if value is null', () => {
    expect(isDefined(null)).toBe(false);
  });

  test('returns "true" if value is not null or undefined', () => {
    expect(isDefined([])).toBe(true);
    expect(isDefined({})).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(0)).toBe(true);
  });
});

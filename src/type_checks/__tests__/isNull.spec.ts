import { isNull } from '../isNull';

describe('isNull', () => {
  test('returns "true" when value is null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('returns "false" when value is not null', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
  });
});

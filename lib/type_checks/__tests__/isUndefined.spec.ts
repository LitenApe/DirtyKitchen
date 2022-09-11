import { isUndefined } from '../isUndefined';

describe('isUndefined', () => {
    test('returns "true" when value is undefined', () => {
        expect(isUndefined(undefined)).toBe(true);
    });

    test('returns "false" when value is not undefined', () => {
        expect(isUndefined(null)).toBe(false);
        expect(isUndefined('')).toBe(false);
        expect(isUndefined(0)).toBe(false);
        expect(isUndefined([])).toBe(false);
        expect(isUndefined({})).toBe(false);
    });
});

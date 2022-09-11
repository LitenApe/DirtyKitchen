import { hasProperty } from '../hasProperty';

describe('hasProperty', () => {
    test('returns "false" when property does not exist in object', () => {
        const data = {};

        expect(hasProperty(data, 'key')).toBe(false);
    });

    test('returns "true" when property exist in object', () => {
        const data = {
            key: 1,
        };

        expect(hasProperty(data, 'key')).toBe(true);
    });
});

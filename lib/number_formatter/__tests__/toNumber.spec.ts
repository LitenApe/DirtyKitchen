import { toNumber } from '../toNumber';

describe('formats and process string to only contain valid number or symbols associated with numbers', () => {
  test('remove all non numeric characters', () => {
    expect(toNumber('1a2b 3c!@#%#@%$^&*()')).toBe('123');
  });

  test('preserves "." as the only valid separator', () => {
    expect(toNumber('12,3.123')).toBe('123.123');
  });
});

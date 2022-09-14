import { toNumber } from '../toNumber';

describe('toNumber', () => {
  test('remove all non numeric characters', () => {
    expect(toNumber('1a2b 3c!@#%#@%$^&*()')).toBe('123');
  });

  test('preserves "." as the only valid separator', () => {
    expect(toNumber('12,3.123')).toBe('123.123');
  });
});

import { toNumberFormat } from '../toNumberFormat';

describe('toNumberFormat', () => {
  test('non numbers are removed', () => {
    const converter = toNumberFormat('### ## ###');

    expect(converter('adfjkalfa')).toBe('');
    expect(converter('a1b2b3c4d5')).toBe('123 45');
  });

  test('strings shorter then format is handled correctly', () => {
    const converter = toNumberFormat('### ## ###');

    expect(converter('')).toBe('');
    expect(converter('123')).toBe('123');
    expect(converter('1234')).toBe('123 4');
    expect(converter('12345')).toBe('123 45');
    expect(converter('123456')).toBe('123 45 6');
  });

  test('string of propper length is handled correctly', () => {
    const converter = toNumberFormat('### ## ###');

    expect(converter('12345678')).toBe('123 45 678');
  });
});

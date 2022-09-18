import { capitalize } from '../capitalize';

describe('capitalize', () => {
  test('returns empty string when given empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('transform a character to upper cased', () => {
    expect(capitalize('t')).toBe('T');
  });

  test('capitalizes the word', () => {
    expect(capitalize('food')).toBe('Food');
  });

  test('only upper case the first character of the string', () => {
    expect(capitalize('food is good, food is life')).toBe(
      'Food is good, food is life',
    );
  });
});

import { random } from '../random';

const iterations = 1000;

describe('random', () => {
  test('returned number is always higher then minimum boundary', () => {
    const min = 10;
    Array.from({ length: iterations }).forEach(() => {
      expect(random(min, min * 10)).toBeGreaterThan(min);
    });
  });

  test('returned number is always lower the maximum boundary', () => {
    const max = 10000;

    Array.from({ length: iterations }).forEach(() => {
      expect(random(max / 10, max)).toBeLessThan(max);
    });
  });

  test('returned numbers are float by default', () => {
    Array.from({ length: iterations }).forEach(() => {
      const value = random(10, 100);
      expect(value).not.toEqual(parseInt(String(value)));
    });
  });

  test('returned numbers are not float when specified', () => {
    Array.from({ length: iterations }).forEach(() => {
      const value = random(10, 100, true);
      expect(value).toEqual(parseInt(String(value)));
    });
  });
});

describe('retrieves random element from array', () => {
  test('returns "undefined" on empty array', () => {
    const value = random([]);
    expect(value).toBeUndefined();
  });

  test('returns random element in array', () => {
    const data = Array.from({ length: 100 }, () => Math.random());
    Array.from({ length: iterations }).forEach(() => {
      const value = random(data);
      expect(data.includes(value)).toBe(true);
    });
  });
});

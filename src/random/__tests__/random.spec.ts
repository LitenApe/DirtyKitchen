import { random } from '../random';

describe('random', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returned number is minimum boundary when random number is 0', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(0);

    const min = 10;
    expect(random(min, min * 10)).toBe(min);
  });

  test('returned number is maximum boundary when random number is 1', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(1);

    const max = 10000;
    expect(random(max / 10, max)).toBe(max);
  });

  test('returned number is middle of boundaries when random number is 0.5', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(0.5);

    const max = 10000;
    const min = max / 10;
    const expected = 0.5 * (max - min) + min;
    expect(random(min, max)).toBe(expected);
  });

  test('returned number is float by default', () => {
    const value = random(10, 100);
    expect(value).not.toEqual(parseInt(String(value)));
  });

  test('returned number is not float when specified', () => {
    const value = random(10, 100, true);
    expect(value).toEqual(parseInt(String(value)));
  });
});

describe('retrieves random element from array', () => {
  test('returns "undefined" on empty array', () => {
    const value = random([]);
    expect(value).toBeUndefined();
  });

  test('returns first element in array when random number is 0', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(0);

    const array = ['first', 'second', 'third', 'fourth'];

    const value = random(array);
    expect(value).toBe('first');
  });

  test('returns last element in array when random number is 1', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(1);

    const array = ['first', 'second', 'third', 'fourth'];

    const value = random(array);
    expect(value).toBe('fourth');
  });

  test('returns second element in array when random number is 0.5', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(0.5);

    const array = ['first', 'second', 'third', 'fourth'];

    const value = random(array);
    expect(value).toBe('second');
  });

  test('returns third element in array when random number is 0.75', () => {
    const mock = jest.spyOn(Math, 'random');
    mock.mockReturnValue(0.75);

    const array = ['first', 'second', 'third', 'fourth'];

    const value = random(array);
    expect(value).toBe('third');
  });
});

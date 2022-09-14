import { uniqueId } from '../uniqueId';

describe('uniqueId', () => {
  test('incrementally increase id each time invoked', () => {
    Array.from({ length: 1000 }, (_, index) => String(index + 1)).forEach(
      (index) => {
        expect(uniqueId()).toContain(index);
      },
    );
  });

  test('prefix id`s with dirty_ by default', () => {
    expect(uniqueId()).toMatch(/^dirty_/);
  });

  test('use provided prefix', () => {
    expect(uniqueId('clean_')).toMatch(/^clean_/);
  });
});

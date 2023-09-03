import { assert } from '../assert';

describe('assert', () => {
  test('do not throw error on "true" condition', () => {
    expect(() => {
      assert(true, 'message');
    }).not.toThrowError();
  });

  test('throws error on "false" condition', () => {
    expect(() => {
      assert(false, 'message');
    }).toThrowError();
  });

  test('throws error with supplied message', () => {
    expect(() => {
      assert(false, 'this is the error message');
    }).toThrowError('this is the error message');
  });
});

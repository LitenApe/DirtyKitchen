import { throttle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  test('executes function straight immediately', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn);

    expect(mockFn).not.toBeCalled();
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
  });

  test('consecutive function executions are halted', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn);

    expect(mockFn).not.toBeCalled();
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
  });

  test('function execution works when timer is cleared', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn);

    expect(mockFn).not.toBeCalled();
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    jest.runAllTimers();
    throttledFn();
    expect(mockFn).toBeCalledTimes(2);
  });
});

import { debounce } from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  test('function is not executed immedietly', () => {
    const mockFn = jest.fn();
    const [debouncedFn] = debounce(mockFn);

    expect(mockFn).not.toBeCalled();
    debouncedFn();
    expect(mockFn).not.toBeCalled();
  });

  test('function is not executed on consecutive invocations', () => {
    const mockFn = jest.fn();
    const [debouncedFn] = debounce(mockFn);

    expect(mockFn).not.toBeCalled();
    debouncedFn();
    expect(mockFn).not.toBeCalled();
    debouncedFn();
    expect(mockFn).not.toBeCalled();
  });

  test('function is executed after timer is exhausted', () => {
    const mockFn = jest.fn();
    const [debouncedFn] = debounce(mockFn);

    expect(mockFn).not.toBeCalled();
    debouncedFn();
    expect(mockFn).not.toBeCalled();
    jest.runAllTimers();
    expect(mockFn).toBeCalledTimes(1);
  });

  test('cancel prevents function from getting invoked', () => {
    const mockFn = jest.fn();
    const [debouncedFn, { cancel }] = debounce(mockFn);

    expect(mockFn).not.toBeCalled();
    debouncedFn();
    expect(mockFn).not.toBeCalled();
    cancel();
    jest.runAllTimers();
    expect(mockFn).not.toBeCalled();
  });

  test('flush invokes function immediately', () => {
    const mockFn = jest.fn();
    const [debouncedFn, { flush }] = debounce(mockFn);

    expect(mockFn).not.toBeCalled();
    debouncedFn();
    flush();
    expect(mockFn).toBeCalledTimes(1);
  });
});

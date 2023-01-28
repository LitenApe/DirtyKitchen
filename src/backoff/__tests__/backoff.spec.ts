import { backoff } from '../backoff';

const mockWarn = jest.fn();
const originalWarn = console.warn;

describe('backoff', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    console.warn = mockWarn;
    mockWarn.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    console.warn = originalWarn;
  });

  test('resolves correctly', async () => {
    const callback = jest.fn();
    const expectedValue = 3;
    callback.mockResolvedValue(expectedValue);

    const res = backoff(callback, 1, 0);
    jest.runAllTimers();

    expect(callback).toBeCalledTimes(1);
    expect(res).resolves.toBe(expectedValue);
  });

  test('invokes callback x amount of times', (done) => {
    const callback = jest.fn();
    callback.mockRejectedValue('test error message');

    const originalTimeout = globalThis.setTimeout;
    const mockTimeout = jest.fn((cb) => cb());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.setTimeout = mockTimeout;

    backoff(callback, 3, 0)
      .then(() => {
        globalThis.setTimeout = originalTimeout;
        done('operation failed to throw expected error');
      })
      .catch(() => {
        expect(callback).toBeCalledTimes(3);
        globalThis.setTimeout = originalTimeout;
        done();
      });
  });

  test('errors are grouped and thrown at the end', (done) => {
    const callback = jest.fn();
    const expectedValue = 'test error';
    callback.mockRejectedValue(expectedValue);

    const res = backoff(callback, 1, 0);
    jest.runAllTimers();

    res
      .then(() => done('operation failed to throw expected error'))
      .catch((err) => {
        expect(err).toStrictEqual([expectedValue]);
        done();
      });
  });

  test('error message is output on console.warn with callback name', (done) => {
    const callback = jest.fn();
    const expectedValue = 'test error';
    callback.mockRejectedValue(expectedValue);

    const res = backoff(callback, 1, 0);
    jest.runAllTimers();

    res
      .then(() => done('operation failed to throw expected error'))
      .catch(() => {
        expect(mockWarn).toHaveBeenCalledTimes(1);
        expect(mockWarn.mock.calls[0][0]).toStrictEqual(
          `Failed to execute ${mockWarn.name}`,
        );
        done();
      });
  });
});

import { renderHook } from '@testing-library/react';
import { useOnUnmount } from '../useOnUnmount';

describe('useOnUnmount', () => {
  test("don't run effect on mount", () => {
    const mockFn = jest.fn();
    renderHook(() => useOnUnmount(mockFn));

    expect(mockFn).toBeCalledTimes(0);
  });

  test("don't run effect between re-renders", () => {
    const mockFn = jest.fn();
    const { rerender } = renderHook(() => useOnUnmount(mockFn));

    expect(mockFn).toBeCalledTimes(0);
    rerender();
    expect(mockFn).toBeCalledTimes(0);
  });

  test('run effect on unmount', () => {
    const mockFn = jest.fn();
    const { unmount } = renderHook(() => useOnUnmount(mockFn));

    expect(mockFn).toBeCalledTimes(0);
    unmount();
    expect(mockFn).toBeCalledTimes(1);
  });
});

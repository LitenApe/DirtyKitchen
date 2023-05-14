import { renderHook } from '@testing-library/react';
import { useOnMount } from '../useOnMount';

describe('useOnMount', () => {
  test('runs effect on mount', () => {
    const mockFn = jest.fn();
    renderHook(() => useOnMount(mockFn));

    expect(mockFn).toBeCalledTimes(1);
  });

  test("don't run effect between re-renders", () => {
    const mockFn = jest.fn();
    const { rerender } = renderHook(() => useOnMount(mockFn));

    expect(mockFn).toBeCalledTimes(1);
    rerender();
    expect(mockFn).toBeCalledTimes(1);
  });

  test("don't run effect on unmount", () => {
    const mockFn = jest.fn();
    const { unmount } = renderHook(() => useOnMount(mockFn));

    expect(mockFn).toBeCalledTimes(1);
    unmount();
    expect(mockFn).toBeCalledTimes(1);
  });
});

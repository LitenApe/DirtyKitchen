import { isDefined } from '../type_checks';

/**
 * Delay function invocation until after a set time
 * has elapsed since the last time the debounced function
 * was last invoked.
 * @param func function we want to debounce
 * @param delay time in milliseconds before the function is invoked
 * @returns debounced function and utility functions
 */
export function debounce<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
): [(...params: P) => void, { flush: () => void; cancel: () => void }] {
  let timer: NodeJS.Timeout | undefined;
  let lastParams: P | undefined;

  function debouncedFunction(...params: P): void {
    lastParams = params;
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, delay);
  }

  function cancel() {
    clearTimeout(timer);
    timer = undefined;
  }

  function flush(): void {
    cancel();
    if (isDefined(lastParams)) {
      func(...lastParams);
    }
  }

  return [debouncedFunction, { flush, cancel }];
}

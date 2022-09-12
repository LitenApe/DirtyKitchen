import { isDefined } from '../type_checks';

/**
 * Delay function invocation until after a set time
 * has elapsed since the last time the debounced function
 * was last invoked.
 * @param func function we want to debounce
 * @param delay time in milliseconds before the function is invoked
 * @returns debounced function
 */
export function debounce<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
): (...params: P) => void {
  let timer: NodeJS.Timeout | undefined;

  return function (...params: P): { flush: () => void; cancel: () => void } {
    if (isDefined(timer)) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, delay);

    function cancel() {
      if (isDefined(timer)) {
        clearTimeout(timer);
        timer = undefined;
      }
    }

    function flush(): void {
      cancel();
      func(...params);
    }

    return { flush, cancel };
  };
}

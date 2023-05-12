import { useCallback, useRef } from 'react';

type GenericFunction<P extends Array<unknown>, R = unknown> = (...args: P) => R;
type ReturnFunctions<P extends Array<unknown>> = {
  cancel: () => void;
  execute: (...args: P) => void;
  flush: (...agrs: P) => void;
};

export function useDebounce<P extends Array<unknown>>(
  callback: GenericFunction<P>,
  delay = 300,
): ReturnFunctions<P> {
  const timer = useRef<NodeJS.Timer | null>(null);

  /**
   * debounce function, delays execution of callback
   * with a set time after the last time the debounce
   * function was invoked.
   */
  const execute = useCallback(
    (...args: P): void => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setInterval(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  /**
   * resets the debounced function
   * without invoking the callback
   */
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = null;
  }, []);

  /**
   * resets the debounced function while
   * invoking the callback straight away
   */
  const flush = useCallback(
    (...args: P): void => {
      cancel();
      callback(...args);
    },
    [callback, cancel],
  );

  return {
    cancel,
    execute,
    flush,
  };
}

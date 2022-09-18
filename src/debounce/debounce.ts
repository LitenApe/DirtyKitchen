import { isDefined } from '../type_checks';

type GenericFunction<P extends Array<unknown>> = (...params: P) => void;
type Cancelable = {
  readonly cancel: () => void;
  readonly flush: () => void;
};

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
): GenericFunction<P> & Cancelable {
  let timer: NodeJS.Timeout | undefined;
  let lastParams: P | undefined;

  /**
   * debounced function, delays execution of a given
   * function until x milliseconds after last time the
   * debounced function was invoked
   * @param params arguments to be passed to the function
   */
  function debounced(...params: P): void {
    lastParams = params;
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, delay);
  }

  /**
   * resets the debounced function without
   * invoking the function
   */
  debounced.cancel = function (): void {
    clearTimeout(timer);
    timer = undefined;
  };

  /**
   * resets the debounced function in addition
   * to invoking the function straight away
   */
  debounced.flush = function (): void {
    this.cancel();
    if (isDefined(lastParams)) {
      func(...lastParams);
    }
  };

  return debounced;
}

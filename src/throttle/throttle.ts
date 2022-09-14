import { isUndefined } from '../type_checks';

/**
 * Prevent a function from executing too frequently
 * by adding a forced delay between each time the
 * function is invoked
 * @param func function we want to throttle
 * @param delay minimum time interval between each time the function is invoked
 * @returns throttled function
 */
export function throttle<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
) {
  let timer: NodeJS.Timeout | undefined;

  return function (...params: P) {
    if (isUndefined(timer)) {
      func(...params);
      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
    }
  };
}

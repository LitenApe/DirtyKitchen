import { isUndefined } from '../type_checks';

type GenericFunction<P extends Array<unknown>> = (...params: P) => void;

export function debounce<P extends Array<unknown>>(
  func: GenericFunction<P>,
  delay = 300,
) {
  let timer: NodeJS.Timeout | undefined;

  return (...params: P): void => {
    if (!isUndefined(timer)) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, delay);
  };
}

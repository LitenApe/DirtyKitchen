import { isUndefined } from '../type_checks';

type GenericFunction<P extends Array<unknown>> = (...params: P) => void;

export function debounce<P extends Array<unknown>>(
  func: GenericFunction<P>,
  delay = 300,
) {
  let timer: NodeJS.Timeout;

  return (...params: P) => {
    if (!isUndefined(timer)) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...params);
    }, delay);
  };
}

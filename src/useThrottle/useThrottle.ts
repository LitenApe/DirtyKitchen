import { useCallback, useRef } from 'react';

import { isNull } from '../type_checks';

type GenericFunction<P extends Array<unknown>, R = unknown> = (...args: P) => R;

export function useThrottle<P extends Array<unknown>>(
  callback: GenericFunction<P>,
  delay = 300,
) {
  const timeout = useRef<NodeJS.Timer | null>(null);
  const prev = useRef<P | null>(null);

  const execute = useCallback(
    (...args: P) => {
      if (!isNull(timeout.current)) {
        prev.current = args;
        return;
      }

      callback(...args);
      timeout.current = setTimeout(() => {
        timeout.current = null;

        if (!isNull(prev.current) && prev.current !== args) {
          callback(...prev.current);
        }
      }, delay);
    },
    [callback, delay],
  );

  return {
    execute,
  };
}

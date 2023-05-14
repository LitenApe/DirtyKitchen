import { useCallback, useRef } from 'react';

import { isNull } from '../type_checks';
import { useOnUnmount } from '../useOnUnmount';

type GenericFunction<P extends Array<unknown>, R = unknown> = (...args: P) => R;

export function useThrottle<P extends Array<unknown>>(
  callback: GenericFunction<P>,
  delay = 300,
  thrailing: false,
) {
  const timeout = useRef<NodeJS.Timer | null>(null);
  const lastCall = useRef<P | null>(null);

  useOnUnmount(() => {
    if (!isNull(timeout.current)) {
      clearTimeout(timeout.current);
    }
  });

  const execute = useCallback(
    (...args: P) => {
      if (!isNull(timeout.current)) {
        lastCall.current = args;
        return;
      }

      callback(...args);
      lastCall.current = null;

      timeout.current = setTimeout(() => {
        timeout.current = null;

        if (
          thrailing &&
          !isNull(lastCall.current) &&
          lastCall.current !== args
        ) {
          callback(...lastCall.current);
          lastCall.current = null;
        }
      }, delay);
    },
    [callback, delay, thrailing],
  );

  return {
    execute,
  };
}

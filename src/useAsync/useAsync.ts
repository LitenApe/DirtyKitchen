import { useCallback, useReducer } from 'react';
import type { GenericFunction, State } from './domain';
import { reducer } from './reducer';

const initial = {
  loading: false,
  data: null,
  error: null,
};

export function useAsync<E, D, A extends Array<unknown> = Array<unknown>>(
  callback: GenericFunction<D, A>,
): State<D, E> & { execute: (...args: A) => Promise<D> } {
  const [state, dispatch] = useReducer(reducer<D, E>, initial);

  const execute = useCallback(
    async (...args: A): Promise<D> => {
      dispatch({ type: 'START' });

      try {
        const data = await callback(...args);
        dispatch({ type: 'SUCCESS', payload: data });
        return data;
      } catch (e) {
        dispatch({ type: 'FAILED', payload: e as E });
        throw e;
      }
    },
    [callback],
  );

  return {
    ...state,
    execute,
  };
}

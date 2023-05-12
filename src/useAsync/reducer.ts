import type { Action, State } from './domain';

export function reducer<D, E>(
  state: State<D, E>,
  action: Action<D, E>,
): State<D, E> {
  switch (action.type) {
  case 'START': {
    return {
      ...state,
      loading: true,
    };
  }
  case 'SUCCESS': {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  }
  case 'FAILED': {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }
  default:
    return state;
  }
}

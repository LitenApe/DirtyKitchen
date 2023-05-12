export type State<D, E> = {
  loading: boolean;
  data: D | null;
  error: E | null;
};

export type Action<D, E> =
  | {
      type: 'START';
    }
  | {
      type: 'SUCCESS';
      payload: D;
    }
  | {
      type: 'FAILED';
      payload: E;
    };

export type GenericFunction<R, P extends Array<unknown>> = (
  ...args: P
) => Promise<R>;

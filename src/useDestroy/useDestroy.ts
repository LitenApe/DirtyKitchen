import { EffectCallback } from 'react';
import { useMount } from '../useMount';

export function useDestroy(cleanup: ReturnType<EffectCallback>) {
  useMount(() => {
    return cleanup;
  });
}

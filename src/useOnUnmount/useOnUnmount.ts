import { EffectCallback } from 'react';
import { useOnMount } from '../useOnMount';

export function useOnUnmount(cleanup: ReturnType<EffectCallback>) {
  useOnMount(() => {
    return cleanup;
  });
}

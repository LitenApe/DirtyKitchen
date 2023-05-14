import type { EffectCallback } from 'react';
import { useEffect } from 'react';

export function useOnMount(effect: EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

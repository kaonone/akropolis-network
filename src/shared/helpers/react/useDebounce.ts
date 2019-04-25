import { useState, useEffect } from 'react';

import useDebouncedCallback from './useDebouncedCallback';

export default function useDebounce<T>(value: T, delay: number, options?: { maxWait?: number }): [T, () => void];

export default function useDebounce<T>(value: T, delay: number, options?: { maxWait?: number }): [T, () => void] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncedCallback, cancel] = useDebouncedCallback(setDebouncedValue, delay, [value], options);

  useEffect(() => {
    if (debouncedValue !== value) {
      debouncedCallback(value);
    }
  });

  return [debouncedValue, cancel];
}

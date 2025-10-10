import { useRef, useCallback } from "react";

export function useAsyncDeduplicator<T>() {
  const promiseRef = useRef<Promise<T> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetch = useCallback((callback: (signal: AbortSignal) => Promise<T>) => {
    if (promiseRef.current) return promiseRef.current;

    controllerRef.current = new AbortController();

    const promise = callback(controllerRef.current.signal)
      .finally(() => {
        promiseRef.current = null;
        controllerRef.current = null;
      });

    promiseRef.current = promise;
    return promise;
  }, []);

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    promiseRef.current = null;
    controllerRef.current = null;
  }, []);

  const invalidate = useCallback(() => {
    promiseRef.current = null;
  }, []);

  return { fetch, cancel, invalidate };
}
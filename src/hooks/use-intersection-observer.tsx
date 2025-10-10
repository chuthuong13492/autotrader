import { useEffect, useRef, useCallback, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver(
  deps: unknown[] = [],
  callback?: (entry: IntersectionObserverEntry) => void,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { threshold = 0, root = null, rootMargin = '0px', triggerOnce = false } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry) return;

      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && callback && (!triggerOnce || !hasTriggered.current)) {
        callback(entry);
        hasTriggered.current = true;

        if (triggerOnce) {
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      }
    }, { threshold, root, rootMargin });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, root, rootMargin, triggerOnce, ...deps]); // 👈 thêm deps để khi resetCount thay đổi thì remount observer

  return { ref, isIntersecting, entry };
}

export function useItemVisibility(
  onVisible?: (index: number) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const resetToken = useRef({});
  const indexRef = useRef<number>(-1);
  const hasTriggered = useRef(false);

  const { ref, isIntersecting } = useIntersectionObserver(
    [resetToken.current],
    useCallback((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && onVisible && indexRef.current >= 0 && !hasTriggered.current) {
        onVisible(indexRef.current);
        hasTriggered.current = true;
      }
    }, [onVisible]),
    options,

  );

  const setIndex = useCallback((index: number) => {
    indexRef.current = index;
  }, []);

  const reset = useCallback(() => {
    hasTriggered.current = false;
    resetToken.current = {};
  }, []);

  return { ref, setIndex, isIntersecting, reset };
}
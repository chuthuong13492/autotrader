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
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, isIntersecting, entry };
}

export function useItemVisibility(
  onVisible?: (index: number) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const indexRef = useRef<number>(-1);

  const { ref, isIntersecting } = useIntersectionObserver(
    useCallback(
      (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && onVisible && indexRef.current >= 0) {
          onVisible(indexRef.current);
        }
      },
      [onVisible]
    ),
    { ...options, triggerOnce: true } // luôn trigger 1 lần cho item
  );

  const setIndex = useCallback((index: number) => {
    indexRef.current = index;
  }, []);

  return { ref, setIndex, isIntersecting };
}
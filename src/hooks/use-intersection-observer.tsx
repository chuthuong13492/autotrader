import { useEffect, useRef, useCallback, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver(
  callback?: (entry: IntersectionObserverEntry) => void,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry) {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting && callback) {
          if (!triggerOnce || !hasTriggered.current) {
            callback(entry);
            hasTriggered.current = true;
          }
        }
      }
    },
    [callback, triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleIntersection, threshold, root, rootMargin]);

  return {
    ref,
    isIntersecting,
    entry,
  };
}

// Hook đơn giản hơn cho việc trigger callback khi item vào viewport
export function useItemVisibility(
  onVisible?: (index: number) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef<number>(-1);

  const setIndex = useCallback((index: number) => {
    indexRef.current = index;
  }, []);

  const { isIntersecting } = useIntersectionObserver(
    useCallback(
      (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && onVisible && indexRef.current >= 0) {
          onVisible(indexRef.current);
        }
      },
      [onVisible]
    ),
    options
  );

  return {
    ref,
    setIndex,
    isIntersecting,
  };
}
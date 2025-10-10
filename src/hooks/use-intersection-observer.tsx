import { useEffect, useRef, useCallback, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  setIndex: (index: number) => void;
  reset: () => void;
  isIntersecting: boolean;
}

// =====================================
// 🔁 Shared Intersection Observer Manager
// =====================================

// Map quản lý observer + danh sách phần tử được observe
const observerMap = new Map<
  string,
  { observer: IntersectionObserver; elements: Set<Element> }
>();

// Map quản lý callback cho từng element
const elementCallbacks = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function getObserverKey(options: UseIntersectionObserverOptions) {
  const { threshold = 0, root = null, rootMargin = '0px' } = options;
  return `${Array.isArray(threshold) ? threshold.join(',') : threshold}-${rootMargin}-${root ? 'customRoot' : 'nullRoot'}`;
}

function getSharedObserver(options: UseIntersectionObserverOptions) {
  const key = getObserverKey(options);
  const existing = observerMap.get(key);
  if (existing) return existing;

  const elements = new Set<Element>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const cb = elementCallbacks.get(entry.target);
      if (cb) cb(entry);
    }
  }, options);

  const record = { observer, elements };
  observerMap.set(key, record);
  return record;
}

// =====================================
// 🌟 Hook useItemVisibility (shared observer)
// =====================================
export function useItemVisibility(
  onVisible?: (index: number) => void,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef<number>(-1);
  const hasTriggered = useRef(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const callback = useCallback(
    (entry: IntersectionObserverEntry) => {
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && onVisible && indexRef.current >= 0 && !hasTriggered.current) {
        onVisible(indexRef.current);
        hasTriggered.current = true;
      }
    },
    [onVisible]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { observer, elements } = getSharedObserver(options);

    // Lưu callback cho element
    elementCallbacks.set(element, callback);
    elements.add(element);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      elementCallbacks.delete(element);
      elements.delete(element);

      // Tự động cleanup observer khi không còn element nào
      if (elements.size === 0) {
        observer.disconnect();
        observerMap.delete(getObserverKey(options));
      }
    };
  }, [callback, options]);

  const setIndex = useCallback((index: number) => {
    indexRef.current = index;
  }, []);

  const reset = useCallback(() => {
    hasTriggered.current = false;
  }, []);

  return { ref, setIndex, reset, isIntersecting };
}
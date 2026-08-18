import { useEffect, useRef, useCallback } from 'react';

export function useFadeUp() {
  const observerRef = useRef(null);

  const setRef = useCallback((node) => {
    if (node) {
      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              node.classList.add('visible');
              observerRef.current.unobserve(node);
            }
          },
          { threshold: 0.1 }
        );
      }
      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return setRef;
}

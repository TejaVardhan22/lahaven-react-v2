import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseScrollAnimationOptions {
  /** The visibility threshold (0 to 1) at which the observer triggers. Defaults to 0.1. */
  threshold?: number;
  /** Margin around the root element. Defaults to '0px 0px -50px 0px'. */
  rootMargin?: string;
  /** Whether the animation should only trigger once. Defaults to true. */
  triggerOnce?: boolean;
}

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport, useful for triggering scroll-based animations.
 *
 * @param options - Configuration for the IntersectionObserver.
 * @returns A tuple containing the ref to attach to the element and the visibility state.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

export default useScrollAnimation;


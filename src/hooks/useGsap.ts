import { useLayoutEffect, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

// Use useLayoutEffect in browser, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * React hook for GSAP animations with automatic cleanup via gsap.context.
 * Guarantees zero memory leaks, full StrictMode safety, and auto-refresh on route changes.
 *
 * @param callback Function where you create your GSAP tweens / timelines
 * @param dependencies Array of dependencies that trigger re-creation
 * @param scope Optional ref to scope selector queries (e.g. '.card', '.title')
 */
export const useGsap = (
  callback: (context: gsap.Context) => void,
  dependencies: React.DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>
) => {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((context) => {
      savedCallback.current(context);
    }, scope?.current || undefined);

    return () => {
      ctx.revert(); // Automatically kills all tweens, timelines, and ScrollTriggers created in context
    };
  }, dependencies);
};

/**
 * Hook to refresh ScrollTrigger when layout or images change
 */
export const useScrollTriggerRefresh = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
};

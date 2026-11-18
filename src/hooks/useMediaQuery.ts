import { useEffect, useState } from 'react';

/**
 * Custom hook that evaluates a CSS media query and returns whether it currently matches.
 * Updates reactively when the viewport changes.
 *
 * @param query - A CSS media query string, e.g. '(min-width: 768px)'.
 * @returns `true` if the media query matches, `false` otherwise.
 *
 * @example
 * ```tsx
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);

    // Set initial value in case it changed between render and effect
    setMatches(mediaQueryList.matches);

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;


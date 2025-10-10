import { useRouterState } from "@tanstack/react-router";
import { useRef, useMemo } from "react";

/**
 * Hook to get a stable location reference that only changes when
 * the route has fully loaded and the pathname has actually changed.
 * This prevents unnecessary component remounting during navigation.
 */
export function useStableLocation() {
    const { isLoading, pathname, search } = useRouterState({
        select: state => ({ 
            isLoading: state.isLoading, 
            pathname: state.location.pathname,
            search: state.location.search
        })
    });
    
    const matchingLocation = useRef<string>(pathname);
    const matchingSearch = useRef(search);
    
    const stableLocation = useMemo(() => {
        // Only update the stable location when:
        // 1. Route is not loading (!isLoading)
        // 2. Pathname has actually changed
        if (!isLoading && matchingLocation.current !== pathname) {
            matchingLocation.current = pathname;
        }
        return matchingLocation.current;
    }, [isLoading, pathname]);

    const stableSearch = useMemo(() => {
        // Only update the stable search when:
        // 1. Route is not loading (!isLoading)
        // 2. Search params have actually changed
        if (!isLoading && JSON.stringify(matchingSearch.current) !== JSON.stringify(search)) {
            matchingSearch.current = search;
        }
        return matchingSearch.current;
    }, [isLoading, search]);
    
    return { pathname: stableLocation, search: stableSearch };
}

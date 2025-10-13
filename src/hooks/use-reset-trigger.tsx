import { useRef, useCallback } from "react";

/**
 * Hook để quản lý các callback reset
 * Cho phép đăng ký nhiều callback và trigger tất cả cùng lúc
 */
export function useResetTrigger() {
    const resetTriggerRef = useRef<Set<() => void>>(new Set());

    const resetTrigger = useCallback((resetCallback: () => void) => {
        resetTriggerRef.current.add(resetCallback);
        return () => resetTriggerRef.current.delete(resetCallback);
    }, []);

    const triggerAllResets = useCallback(() => {
        resetTriggerRef.current.forEach(reset => reset());
    }, []);

    const clearAllResets = useCallback(() => {
        resetTriggerRef.current.clear();
    }, []);

    const getResetCount = useCallback(() => {
        return resetTriggerRef.current.size;
    }, []);

    return {
        resetTrigger,
        triggerAllResets,
        clearAllResets,
        getResetCount,
    };
}

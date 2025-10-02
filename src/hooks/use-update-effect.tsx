import { useRef, useEffect } from "react"

export function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }
        return effect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
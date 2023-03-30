import { onBeforeRender } from "../../events/onBeforeRender"

export default <T extends object>(
    cb: (target: T) => void | (() => void),
    ticker: typeof onBeforeRender | typeof queueMicrotask = queueMicrotask
) => {
    const queued = new Set<T>()
    const cleanupMap = new WeakMap<T, () => void>()

    let started = false
    const start = () => {
        if (started) return
        started = true
        ticker(() => {
            for (const target of queued) {
                const prevCleanup = cleanupMap.get(target)
                if (prevCleanup) {
                    prevCleanup()
                    cleanupMap.delete(target)
                }
                const cleanup = cb(target)
                cleanup && cleanupMap.set(target, cleanup)
            }
            queued.clear()
            started = false
        }, true)
    }

    return <const>[
        (item: T) => {
            start()
            queued.add(item)
        },
        (item: T) => {
            const prevCleanup = cleanupMap.get(item)
            if (prevCleanup) {
                prevCleanup()
                cleanupMap.delete(item)
            }
            queued.delete(item)
        }
    ]
}

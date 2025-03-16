import { createReactiveWapper, Reactive, Signal } from 'micro-reactive-wrapper'
import { createSignal, SignalOptions } from 'solid-js'
import { createMutable } from 'solid-js/store'

export function useSignal<T>(value: T, options?: SignalOptions<T>): Signal<T> {
    const [get, set] = createSignal(value, options)

    return ((value) => {
        if (value === undefined) return get()
        else return set(value)
    }) as Signal<T>
}

export function useReactive<T>(value: T): Reactive<T> {
    return createReactiveWapper(createMutable([value]), [0])
}

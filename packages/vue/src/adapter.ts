import type { Reactive, Signal } from 'micro-reactive-wrapper'
import type { Ref, UnwrapRef } from 'vue'
import { useReactiveWrapper } from 'micro-reactive-wrapper'
import { reactive, ref } from 'vue'

export function useSignal<T extends Ref>(value: T): Signal<UnwrapRef<T>>
export function useSignal<T>(value: T): Signal<T>
export function useSignal<T>(value: T): Signal<T> | Signal<UnwrapRef<T>> {
    const reactive = ref<T>(value)

    return ((value: unknown) => {
        if (value === undefined) return reactive.value
        else return (reactive.value = value instanceof Function ? value(reactive.value) : value)
    }) as Signal<T> | Signal<UnwrapRef<T>>
}

export const useReactive: <T>(value: T) => Reactive<T> = useReactiveWrapper(reactive)

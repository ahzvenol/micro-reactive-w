/**
 * 读取值的函数
 * @public
 */
export type Accessor<T> = () => T

/**
 * 写入值的函数
 * @public
 */
export type Setter<T> = {
    <U extends T>(value: (prev: T) => U): U
    <U extends T>(value: Exclude<U, Function>): U
}

/**
 * 信号函数
 * @public
 */
export type Signal<T> = Accessor<T> & Setter<T>

/**
 * 响应式对象
 * @public
 */
export type Reactive<T> = Signal<T> &
    (T extends object
        ? {
              readonly [K in keyof T as K]-?: T extends Array<unknown> | ReadonlyArray<unknown>
                  ? K extends typeof Symbol.iterator
                      ? {
                            readonly [K in keyof T]: Reactive<T[K]>
                        }[typeof Symbol.iterator]
                      : Reactive<T[K]>
                  : Reactive<T[K]>
          }
        : {})

/**
 * 只读响应式对象
 * @public
 */
export type ReadonlyReactive<T> = Accessor<T> &
    (T extends object
        ? {
              readonly [K in keyof T as K]-?: T extends Array<unknown> | ReadonlyArray<unknown>
                  ? K extends typeof Symbol.iterator
                      ? {
                            readonly [K in keyof T]: Reactive<T[K]>
                        }[typeof Symbol.iterator]
                      : Reactive<T[K]>
                  : ReadonlyReactive<T[K]>
          }
        : {})

/**
 * 响应式对象的内部值
 * @public
 */
export type UnwrapReactive<T extends Reactive<unknown>> = T extends Reactive<infer V> ? V : never

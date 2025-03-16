import { Reactive, Signal } from './types'

/**
 * 创建信号函数，
 * 信号函数没有参数时为读取操作，
 * 信号函数有参数时为写入操作。
 * @param path - 响应式对象的路径
 * @returns 信号函数
 */
export function createSignalWapper<T>(root: object, path: PropertyKey[]): Signal<T> {
    function signal<U extends T>(): U
    function signal<U extends T>(value: (prev: T) => U): U
    function signal<U extends T>(value: Exclude<U, Function>): U
    function signal<U extends T>(value?: Exclude<U, Function> | ((prev: T) => U)): U {
        if (value === undefined) {
            return path.reduce((obj, k) => obj[k as keyof typeof root], root) as U
        } else {
            const key = path.slice(-1)[0]
            const obj = path.slice(0, -1).reduce((obj, k) => obj[k as keyof typeof obj], root)
            return ((obj[key as keyof typeof obj] as T) =
                value instanceof Function ? value(obj[key as keyof typeof obj]) : value)
        }
    }
    return signal
}

/**
 * 创建响应式代理
 * @param path - 响应式对象的路径
 * @returns 响应式代理
 */
export function createReactiveWapper<T>(root: object, path: PropertyKey[]): Reactive<T> {
    const children = new Map<PropertyKey, Reactive<unknown>>()
    const signal = createSignalWapper<T>(root, path)
    const proxy = new Proxy(signal, {
        get(target, key) {
            const data = target()
            // 非对象类型的值,不能索引出属性
            if (!(typeof data === 'object' && data !== null)) return void 0
            // 对象是否存在该属性
            const has = Reflect.has(data, key)
            // signal函数上的属性
            if (!has && key in target) return Reflect.get(target, key)
            // children子属性
            if (children.has(key)) return children.get(key)!
            // 未初始化then,不能索引出属性
            if (key === 'then' && !has) return void 0
            // 特殊处理迭代器属性,实现数组解构
            if (key === Symbol.iterator && Array.isArray(data)) {
                return function* () {
                    for (let i = 0; ; i++) {
                        yield (proxy as unknown as Record<number, unknown>)[i]
                    }
                }
            }
            // 生成属性的响应式对象,缓存并返回
            const child = createReactiveWapper<T>(root, [...path, key])
            children.set(key, child)
            return child
        }
    }) as Reactive<T>
    return proxy
}

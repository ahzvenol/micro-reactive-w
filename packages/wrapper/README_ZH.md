# MICRO REACTIVE Wrapper

**函数调用风格的响应式实现，基于[micro-reactive](https://github.com/wulongshe/micro-reactive)**

[中文](/README_ZH.md) | [English](/README.md)

## 特点

- 以相同的方式创建和使用响应式变量，而无需考虑是否为基本类型
- 任意解构对象，替换对象，而不会丢失响应式
- 通过包装框架原生API实现，无学习成本

## 使用
```ts
import { Reactive, Signal, useReactiveWrapper } from 'micro-reactive-wrapper'
// 传入创建响应式对象的函数,在solidjs中是`createMutable`,在vue中是`reactive`
export const useReactive: <T>(value: T) => Reactive<T> = useReactiveWrapper(proxy)
```

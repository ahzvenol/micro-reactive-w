# MICRO REACTIVE W

**函数调用风格的响应式实现，基于[micro-reactive](https://github.com/wulongshe/micro-reactive)**

[中文](/README_ZH.md) | [English](/README.md)

## 特点

- 以相同的方式创建和使用响应式变量，而无需考虑是否为基本类型
- 任意解构对象，替换对象，而不会丢失响应式
- 通过包装框架原生API实现，无学习成本

## 使用

```ts
import { useReactive } from 'micro-reactive-solid'

// 创建响应式对象
const primitive = useReactive(1)
const reference = useReactive({ children: { number: 1 } })
// 读取响应式对象
primitive()
// 解构响应式对象
const { number } = reference.children
// 修改响应式对象
// 通过直接传入新值
reference({ children: { number: 2 } })
// 通过传入函数，获取到当前值并返回新值
number((i) => i + 1)
```

# MICRO REACTIVE W

**A reactive implementation based on function-call style, inspired by [micro-reactive](https://github.com/wulongshe/micro-reactive)**

[中文](/README.md) | [English](/README_EN.md)

## Features

- Create and use reactive variables in consistent way, regardless of whether they are primitive types.
- Freely destructure or replace objects without losing reactivity.
- Implemented by wrapping native framework APIs, with zero learning curve.

## Usage

```ts
import { Reactive, Signal, useReactiveWrapper } from 'micro-reactive-wrapper'
// Pass function to create reactive object, in Solid.js it's `createMutable`, in Vue it's `reactive`
export const useReactive: <T>(value: T) => Reactive<T> = useReactiveWrapper(proxy)
```
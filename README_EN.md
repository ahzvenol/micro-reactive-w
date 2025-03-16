# MICRO REACTIVE W

**A reactive implementation based on function-call style, inspired by [micro-reactive](https://github.com/wulongshe/micro-reactive)**

[中文](/README.md) | [English](/README_EN.md)
## Features

- Create and use reactive variables in a consistent way, regardless of whether they are primitive types.
- Freely destructure or replace objects without losing reactivity.
- Implemented by wrapping native framework APIs, with zero learning curve.

## Installation

### Solid:
```
npm i micro-reactive-solid
pnpm i micro-reactive-solid
yarn add micro-reactive-solid
```

### Vue:
```
npm i micro-reactive-vue
pnpm i micro-reactive-vue
yarn add micro-reactive-vue
```

## Usage

```ts
import { useReactive } from "micro-reactive";

// Create reactive objects
const primitive = useReactive(1);
const reference = useReactive({ children: { number: 1 } });

// Read reactive objects
primitive();
reference();
reference.children.number();

// Modify reactive objects
// By directly assigning a new value
reference({ children: { number: 2 } });
// By passing a function that takes the current value and returns a new value
reference.children.number((i) => i + 1);
```
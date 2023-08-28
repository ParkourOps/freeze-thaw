# Freeze | Thaw

> **TypeScript library to ensure objects are immutable in development-time, compile-time, and runtime.**

[![License: MIT](https://badgen.net/github/license/micromatch/micromatch)](https://opensource.org/licenses/MIT)
![Tests: Passing](https://badgen.net/badge/tests/passing/green)
[![npm Release: v1.0.0](https://badgen.net/badge/release/v1.0.0/blue?icon=npm)](https://www.npmjs.com/package/@parkour-ops/freeze-thaw)

## Background / Intro

The highest level of protection that a JavaScript engine provides against improper and unexpected changes is in *runtime:* the ability to [freeze objects.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) Any assignment to a frozen object's property will result in an error being thrown during execution of the script, but *only when* the script is running in __'strict mode.'__

Meanwhile, TypeScript prevents improper assignments through (careful and precise) type declarations. TypeScript-based IDE (integrated development environment) tooling will flag up incorrect assignments during development, and your TypeScript transpiler of choice will fail to transpile code if a variable or property assignment is contrary to its type declaration.

This small library aims to reconcile runtime protection provided by JavaScript's `Object.freeze(...)` with the development-time and transpile-time protection provided by TypeScript's type declarations.

## How to Install

Simply add the package to your 'npm' project using an import statement:

`npm install @parkour-ops/freeze-thaw`

## How to Use

Simply import the functions you would like to use as follows:

### CommonJS Modularity Ecosystem

This is the [Node.js default.](https://nodejs.org/api/esm.html#enabling)

```js
    const { makeCopy, makeFrozenCopy, freeze, thaw } = require("@parkour-ops/freeze-thaw");
```

### ECMAScript Modularity Ecosystem

```js
    import { makeCopy, makeFrozenCopy, freeze, thaw } from "@parkour-ops/freeze-thaw";
```

## Functions

This package provides the following functions:

### deep copy something with `makeCopy(input)`

```js
// start with some object, array, or function, (or anything)
const someObject = { /*...*/ };

// *** deep copy the object ***
const myCopy = makeCopy(someObject);

// test: check if both variables reference the same thing:
console.log(myCopy === someObject);
// => false
```

### make something read-only with `freeze(input)`

```js
// start with some object, array, or function, (or anything)
const someObject = { 
    errorCode: "!!!## ERRORRRRRRR ##!!!" 
};

// *** freeze the object to make it read-only ***
const sameObjectWithReadOnlyTyping = freeze(someObject);

// test: check if both variables reference the same thing:
console.log(sameObjectWithReadOnlyTyping === someObject);
// => true
```

### make a read-only deep copy of something with `makeFrozenCopy(input)`

```js
// start with some object, array, or function, (or anything)
const someObject = { 
    errorCode: "!!!## ERRORRRRRRR ##!!!" 
};

// *** deep copy the object as read-only ***
const myReadOnlyCopy = makeFrozenCopy(someObject);

// test: check if both variables reference the same thing:
console.log(myReadOnlyCopy === someObject);
// => false
```

### make a read-only something writeable again with `thaw(input)`

**Note:** since JavaScript runtime does not allow objects 'frozen' with `Object.freeze(...)` to be 'unfrozen`, this is actually just a deep copy!

The difference between `thaw(input)` and `makeCopy(input)` is that `thaw(input)` actually removes the `readonly` marker from the properties' type declarations.

```js
// start with some frozen/read-only object:
const someReadOnlyObject = freeze({ 
    errorCode: "!!!## ERRORRRRRRR ##!!!" 
});

// make a writeable copy
const myWriteableCopy = thaw(someReadOnlyObject);

// test: check if both variables reference the same thing:
console.log(myWriteableCopy === someObject);
// => false
```

## Dependencies

* `lodash.clonedeep`, used for deep cloning objects.

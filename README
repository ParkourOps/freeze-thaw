# Freeze and Thaw

> **Make objects read-only in development-time, compile-time, and runtime.**

The highest level of protection that a JavaScript engine provides against improper and unexpected changes is in *runtime:* the ability to [freeze objects.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) Any assignment to a frozen object's property will result in an error being thrown during execution of the script, but *only when* the script is running in __'strict mode.'__

Meanwhile, TypeScript prevents improper assignments through (careful and precise) type declarations. TypeScript-based IDE (integrated development environment) tooling will flag up incorrect assignments during development, and your TypeScript transpiler of choice will fail to transpile code if a variable or property assignment is contrary to its type declaration.

This small library aims to reconcile runtime protection provided by JavaScript's `Object.freeze(...)` with the development-time and transpile-time protection provided by TypeScript's type declarations.

## Install

Simply add the package to your 'npm' project using an import statement:

`npm install @parkour-ops/freeze-thaw`

## Use

Simply import the functions you would like to use as follows (NodeJS):

```js

```

## Functions

This package provides the following functions:

### Deep Copy Something with `makeCopy(input)`

```js
// start with some object, array, or function, (or anything)
const someObject = { /*...*/ };

// *** deep copy the object ***
const myCopy = makeCopy(someObject);

// test: check if both variables reference the same thing:
console.log(myCopy === someObject);
// => false
```

### Make Something Read-Only with `freeze(input)`

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

### Deep Copy Something as Read-Only with `makeFrozenCopy(input)`

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

### Make Something Read-Only Writeable Again with `thaw(input)`

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

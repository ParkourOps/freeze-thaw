// The MIT License

// Copyright (c) 2018-2019 Chris Kaczor (github.com/krzkaczor)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type AnyArray<Type = any> = Array<Type> | ReadonlyArray<Type>;
type Builtin = Primitive | Function | Date | Error | RegExp;
type IsTuple<Type> = Type extends readonly any[] ? (any[] extends Type ? never : Type) : never;
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<Type> = 0 extends 1 & Type ? true : false;
type IsUnknown<Type> = IsAny<Type> extends true ? false : unknown extends Type ? true : false;

export type DeepReadonly<Type> = Type extends Exclude<Builtin, Error>
    ? Type
    : Type extends Map<infer Keys, infer Values>
    ? ReadonlyMap<DeepReadonly<Keys>, DeepReadonly<Values>>
    : Type extends ReadonlyMap<infer Keys, infer Values>
    ? ReadonlyMap<DeepReadonly<Keys>, DeepReadonly<Values>>
    : Type extends WeakMap<infer Keys, infer Values>
    ? WeakMap<DeepReadonly<Keys>, DeepReadonly<Values>>
    : Type extends Set<infer Values>
    ? ReadonlySet<DeepReadonly<Values>>
    : Type extends ReadonlySet<infer Values>
    ? ReadonlySet<DeepReadonly<Values>>
    : Type extends WeakSet<infer Values>
    ? WeakSet<DeepReadonly<Values>>
    : Type extends Promise<infer Value>
    ? Promise<DeepReadonly<Value>>
    : Type extends AnyArray<infer Values>
    ? Type extends IsTuple<Type>
        ? { readonly [Key in keyof Type]: DeepReadonly<Type[Key]> }
        : ReadonlyArray<DeepReadonly<Values>>
    : Type extends {}
    ? { readonly [Key in keyof Type]: DeepReadonly<Type[Key]> }
    : IsUnknown<Type> extends true
    ? unknown
    : Readonly<Type>;

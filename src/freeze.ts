import {DeepReadonly} from "ts-essentials";
import { makeCopy } from "./copy";

export interface FreezeOptions {
    attemptFreezeCircularRefs: boolean
    freezeNonEnumerableProps: boolean
}

/**
 * Calls `Object.freeze(...)` recursively on input. 
 *
 */
function _freeze<T = unknown>(nodes: Array<unknown>, currentNode: T, options: FreezeOptions) : undefined {
    // pass through if node is not an object (object includes arrays and functions)
    if (currentNode === undefined || currentNode === null || !(typeof currentNode === "function" || typeof currentNode === "object")) {
        return;
    }    
    // if this node is already in references list, it is a (semi-)circular referencing situation:
    if (nodes.some((n)=>(n === currentNode))) {
        // abort if (semi-)circular references are not allowed.
        if (!options.attemptFreezeCircularRefs) {
            throw Error("could not freeze object: circular reference detected.");
        // skip if (semi-)circular references are allowed.
        } else {
            return;
        }
    }
    // add this node to references list
    nodes.push(currentNode);
    // get list of property keys
    const keys = options.freezeNonEnumerableProps ? Reflect.ownKeys(currentNode) : Object.keys(currentNode);
    // iterate over each property key and recursively freeze the value
    for (const key of keys) {
        _freeze(nodes, (currentNode as Record<string|symbol, unknown>)[key], options);
    }
    // freeze i.e. property keys set to "non-writeable" (read-only) and "non-configurable" (not deleteable)
    Object.freeze(currentNode);
}

/**
 * Transform the input by:
 * 
 *  1. Deeply marking input and its properties as `readonly`; for TypeScript-based IDE and transpile-time protection against mutations.
 *  2. If input happens to be an object (including array or function), then by deeply freezing it using `Object.freeze(...)`; for JavaScript-engine-based runtime protection against mutations.
 *
 */
export function freeze<T = unknown>(input:T, options: FreezeOptions = {
    attemptFreezeCircularRefs: false,
    freezeNonEnumerableProps: false
}) : DeepReadonly<T> {
    // pass through if input is not an object (object includes arrays and functions)
    if (input === undefined || input === null || !(typeof input === "function" || typeof input === "object")) {
        return input as DeepReadonly<T>;
    }
    // handle the object-based types:
    // create array to keep track of references
    const nodes: Array<unknown> = [];
    // recursively freeze
    _freeze(nodes, input, options);
    // return
    return input as DeepReadonly<T>;
}

/**
 * Make a deep copy of the input (preserving inheritance, if any) and transform it by:
 * 
 *  1. Deeply marking input and its properties as `readonly`; for TypeScript-based IDE and transpile-time protection against mutations.
 *  2. If input happens to be an object (including array or function), then by deeply freezing it using `Object.freeze(...)`; for JavaScript-engine-based runtime protection against mutations.
 *
 */
export function makeFrozenCopy<T = unknown>(input: T, options: FreezeOptions = {
    attemptFreezeCircularRefs: false,
    freezeNonEnumerableProps: false
}) : DeepReadonly<T> {
    const _copy = makeCopy(input);
    return freeze(_copy);
}

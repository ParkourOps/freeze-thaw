import deepClone from "lodash.clonedeep"

/**
 * Make a deep copy of the input while preserving object inheritance (if any).
 *
 */
export function makeCopy<T>(input: T) : T {
    return deepClone(input);
}

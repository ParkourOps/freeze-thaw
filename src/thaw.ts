import { DeepReadonly, DeepWritable } from "ts-essentials";
import { makeCopy } from "./copy";

/**
 * Make a deep copy of the frozen input (preserving inheritance, if any).
 *
 * Different from `makeCopy(...)` because it only accepts input types marked as `DeepReadonly` by the `freeze(...)` function.
 *
 */
export function thaw<T = unknown>(input: DeepReadonly<T>): T {
    return makeCopy(input) as T;
}

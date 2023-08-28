import { makeCopy } from "./copy";
import { DeepReadonly } from "./utils";

/**
 * Make a deep copy of the frozen input (preserving inheritance, if any).
 *
 * Different from `makeCopy(...)` because it only accepts input types marked as `DeepReadonly` by the `freeze(...)` function.
 *
 */
export function thaw<T = unknown>(input: DeepReadonly<T>): T {
    return makeCopy(input) as T;
}

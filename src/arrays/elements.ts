import { ArrayIndexOutOfBoundsError } from '../errors/array-index-out-of-bounds-error'

export {}

declare global {
    interface Array<T> {
        /**
         * Retrieve the first element of the array.
         * @throws {ArrayIndexOutOfBoundsError}
         */
        first(): T
    }
}

const ARRAY_FIRST_ELEMENT_INDEX = 0
Array.prototype.first = function <T>(): T {
    const _self = this as Array<T>
    const first = _self[ARRAY_FIRST_ELEMENT_INDEX]
    if (first != undefined && first != null) return first
    throw new ArrayIndexOutOfBoundsError(_self, ARRAY_FIRST_ELEMENT_INDEX)
}

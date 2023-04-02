import { ArrayIndexOutOfBoundsError } from '../errors/array-index-out-of-bounds-error'

export {}

declare global {
    interface Array<T> {
        /**
         * Retrieve the first element of the array.
         * @throws {ArrayIndexOutOfBoundsError}
         * @returns the first element of the array
         */
        first(): T
        /**
         * Retrieve the first element of the array or undefined if the array is empty.
         * @returns the first element of the array or undefined if the array is empty
         */
        firstOrDefualt(): T | undefined
        /**
         * Retrieve the last element of the array.
         * @throws {ArrayIndexOutOfBoundsError}
         * @returns the last element of the array
         */
        last(): T
        /**
         * Retrieve the last element of the array or undefined if the array is empty.
         * @returns the last element of the array or undefined if the array is empty
         */
        lastOrDefualt(): T | undefined
    }
}

const ARRAY_FIRST_ELEMENT_INDEX = 0

Array.prototype.first = function <T>(): T {
    const _self = this as Array<T>
    const first = _self[ARRAY_FIRST_ELEMENT_INDEX]
    if (first != undefined && first != null) return first
    throw new ArrayIndexOutOfBoundsError(_self, ARRAY_FIRST_ELEMENT_INDEX)
}

Array.prototype.firstOrDefualt = function <T>(): T {
    const _self = this as Array<T>
    return _self[ARRAY_FIRST_ELEMENT_INDEX]
}

Array.prototype.last = function <T>(): T {
    const _self = this as Array<T>
    const arrayLastElementIndex = _self.length - 1
    const last = _self[arrayLastElementIndex]
    if (last != undefined && last != null) return last
    throw new ArrayIndexOutOfBoundsError(_self, arrayLastElementIndex)
}

Array.prototype.lastOrDefualt = function <T>(): T {
    const _self = this as Array<T>
    return _self[_self.length - 1]
}

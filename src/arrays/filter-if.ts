export {}

declare global {
    interface Array<T> {
        /**
         * If isApplicable is true, returns the elements of an array that meet the condition specified in a callback function.
         * Otherwise returns the original array.
         * @param isApplicable true if the array has to be filtered, false otherwise
         * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
         * @returns the elements of an array that meet the condition specified in a callback function or the original array
         */
        filterIf<S extends T>(
            isApplicable: boolean,
            predicate: (value: T, index: number, array: T[]) => value is S,
            thisArg?: unknown,
        ): S[]
        /**
         * If isApplicable is true, returns the elements of an array that meet the condition specified in a callback function.
         * Otherwise returns the original array.
         * @param isApplicable true if the array has to be filtered, false otherwise
         * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
         * @returns the elements of an array that meet the condition specified in a callback function or the original array
         */
        filterIf(
            isApplicable: boolean,
            predicate: (value: T, index: number, array: T[]) => unknown,
            thisArg?: unknown,
        ): Array<T>
    }
}

Array.prototype.filterIf = function <T>(
    isApplicable: boolean,
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: unknown,
): Array<T> {
    const _self = this as Array<T>
    if (isApplicable) return _self.filter(predicate, thisArg)

    return _self
}

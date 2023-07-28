export type Case<T, U> = [
    (value: T, index: number, array: T[]) => unknown,
    (value: T, index: number, array: T[]) => U,
]

export type CaseS<T, U, S extends T> = [
    (value: T, index: number, array: T[]) => value is S,
    (value: S, index: number, array: T[]) => U,
]

export function match<T, U, S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    matchedMapper: (value: S, index: number, array: T[]) => U,
): Case<T, U> {
    return [predicate, matchedMapper] as unknown as Case<T, U>
}

declare global {
    interface Array<T> {
        /**
         * Perform filter and map operations in a unique one.
         * @param filter used to identify the items to be mapped with the matched function
         * @param matchedMapper used to map the items when the filter is satisfied
         * @param otherwiseMapper if specified mpas the items that does not satisfy the filter, if not specified these items will be discarded
         * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value
         * @returns a new Array with the resulting items
         */
        singleCollect<U>(
            predicate: (value: T, index: number, array: T[]) => unknown,
            matchedMapper: (value: T, index: number, array: T[]) => U,
            otherwiseMapper?: (value: T, index: number, array: T[]) => U,
            thisArg?: unknown,
        ): Array<U>

        /**
         * Perform filter and map operations in a unique one.
         * @param filter used to identify the items to be mapped with the matched function
         * @param matchedMapper used to map the items when the filter is satisfied
         * @param otherwiseMapper if specified mpas the items that does not satisfy the filter, if not specified these items will be discarded
         * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value
         * @returns a new Array with the resulting items
         */
        singleCollect<U, S extends T>(
            predicate: (value: T, index: number, array: T[]) => value is S,
            matchedMapper: (value: S, index: number, array: T[]) => U,
            otherwiseMapper?: (value: S, index: number, array: T[]) => U,
            thisArg?: unknown,
        ): Array<U>

        /**
         * Perform filter and map operations in a unique one accepting multiple filter cases.
         * @param matchCases if a condition is satisfied the associeted mapping function is applied, if no condition is satisfied the element will be discarded
         * @returns a new RichArray with the resulting items
         */
        collect<U>(
            matchCases: Case<T, U>[],
            otherwiseMapper?: (value: T, index: number, array: T[]) => U,
            thisArg?: unknown,
        ): Array<U>
    }
}

Array.prototype.singleCollect = function <T, U>(
    predicate: (value: T, index: number, array: T[]) => unknown,
    matchedMapper: (value: T, index: number, array: T[]) => U,
    otherwiseMapper?: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown,
): Array<U> {
    const _self = this as Array<T>
    if (otherwiseMapper)
        return _self.map(
            (item, index, array) =>
                predicate(item, index, array)
                    ? matchedMapper(item, index, array)
                    : otherwiseMapper(item, index, array),
            thisArg,
        )

    return _self.flatMap(
        (item, index, array) =>
            predicate(item, index, array)
                ? [matchedMapper(item, index, array)]
                : [],
        thisArg,
    )
}

Array.prototype.collect = function <T, U>(
    matchCases: Case<T, U>[],
    otherwiseMapper?: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown,
): Array<U> {
    const _self = this as Array<T>

    if (otherwiseMapper) {
        return _self.map((item, index, array) => {
            const matchingCase = matchCases.find(([filter]) =>
                filter(item, index, array),
            )

            if (matchingCase != undefined) {
                const [, matchedMapper] = matchingCase
                return matchedMapper(item, index, array)
            }
            return otherwiseMapper(item, index, array)
        }, thisArg)
    }

    return _self.flatMap((item, index, array) => {
        const matchingCase = matchCases.find(([filter]) =>
            filter(item, index, array),
        )

        if (matchingCase != undefined) {
            const [, matchedMapper] = matchingCase
            return [matchedMapper(item, index, array)]
        }

        return []
    })
}

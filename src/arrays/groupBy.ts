export type Mapper<Input, Output> = (input: Input) => Output
export type GroupByMergeFunction<V> = (a: V, b: V) => V

declare global {
    interface Array<T> {
        /**
         * Perform a group by operation grouping by the result of the keyMapper.
         * @param keyMapper used to get the key
         * @param valueMapper used to get the value
         * @param mergeFunction unify two items into a unique items with the same key
         * @returns a map with the elements grouped by the keys generated using the keyMapper
         */
        groupBy<K, V>(
            keyMapper: Mapper<T, K>,
            valueMapper: Mapper<T, V>,
            mergeFunction?: GroupByMergeFunction<V>,
        ): Map<K, V>
        /**
         * Perform a group by operation grouping by the result of the keyMapper.
         * @param keyMapper used to get the key
         * @param valueMapper used to get the value
         * @param mergeFunction unify two items into a unique items with the same key
         * @returns an object with the elements grouped by the keys generated using the keyMapper
         */
        groupByToDictionary<K extends string, V>(
            keyMapper: Mapper<T, K>,
            valueMapper: Mapper<T, V>,
            mergeFunction?: GroupByMergeFunction<V>,
        ): Record<K, V>
        /**
         * Perform a group by operation grouping by the result of the keyMapper.
         * As the simplified version of a groupby this method only allows to
         * group by objects by specific keys generating an array of elements
         * for each key.
         * @param keyMapper used to get the key
         * @returns a map with the elements grouped by the keys generated using the keyMapper
         */
        simpleGroupBy<K>(keyMapper: Mapper<T, K>): Map<K, T[]>
        /**
         * Perform a group by operation grouping by the result of the keyMapper.
         * As the simplified version of a groupby this method only allows to
         * group by objects by specific keys generating an array of elements
         * for each key.
         * @param keyMapper used to get the key
         * @returns a map with the elements grouped by the keys generated using the keyMapper
         */
        simpleGroupByToDictionary<K extends string>(
            keyMapper: Mapper<T, K>,
        ): Record<K, T[]>
    }
}

Array.prototype.groupBy = function <K, V>(
    keyMapper: Mapper<unknown, K>,
    valueMapper: Mapper<unknown, V>,
    mergeFunction: GroupByMergeFunction<V> = (_, b) => b,
): Map<K, V> {
    const _self = this as Array<unknown>
    return _self.reduce<Map<K, V>>((map, item) => {
        const key = keyMapper(item)
        const value = valueMapper(item)
        const prevValue = map.get(key)
        map.set(key, prevValue ? mergeFunction(prevValue, value) : value)
        return map
    }, new Map<K, V>())
}

Array.prototype.groupByToDictionary = function <K extends string, V>(
    keyMapper: Mapper<unknown, K>,
    valueMapper: Mapper<unknown, V>,
    mergeFunction: GroupByMergeFunction<V> = (_, b) => b,
): Record<K, V> {
    const _self = this as Array<unknown>
    return _self.reduce<Record<K, V>>((object, item) => {
        const key = keyMapper(item)
        const value = valueMapper(item)
        const prevValue = object[key]
        object[key] = prevValue ? mergeFunction(prevValue, value) : value
        return object
    }, {} as Record<K, V>)
}

Array.prototype.simpleGroupBy = function <K>(
    keyMapper: Mapper<unknown, K>,
): Map<K, unknown[]> {
    const _self = this as Array<unknown>
    return _self.groupBy(
        keyMapper,
        v => [v],
        (a, b) => a.concat(b),
    )
}

Array.prototype.simpleGroupByToDictionary = function <K extends string>(
    keyMapper: Mapper<unknown, K>,
): Record<K, unknown[]> {
    const _self = this as Array<unknown>
    return _self.groupByToDictionary(
        keyMapper,
        v => [v],
        (a, b) => a.concat(b),
    )
}

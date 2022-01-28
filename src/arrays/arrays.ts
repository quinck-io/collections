import { GroupByMergeFunction, Mapper } from './models'

export { }

declare global {
  interface Array<T> {
    /**
     * Perform a group by operation grouping by the result of the keyMapper.
     * @param keyMapper used to get the key
     * @param valueMapper used to get the value
     * @param mergeFunction unify two items into a unique items with the same key
     * @returns a map with the elements grouped by the keys generated using the keyMapper
     */
    groupby<K,V>(keyMapper: Mapper<T,K>, valueMapper: Mapper<T,V>, mergeFunction?: GroupByMergeFunction<V>): Map<K,V>
    /**
     * Perform a group by operation grouping by the result of the keyMapper.
     * @param keyMapper used to get the key
     * @param valueMapper used to get the value
     * @param mergeFunction unify two items into a unique items with the same key
     * @returns an object with the elements grouped by the keys generated using the keyMapper
     */
    groupbyToDictionary<K extends string,V>(keyMapper: Mapper<T,K>, valueMapper: Mapper<T,V>, mergeFunction?: GroupByMergeFunction<V>): Record<K,V>
  }
}

Array.prototype.groupby = function <K,V>(
    keyMapper: Mapper<unknown,K>,
    valueMapper: Mapper<unknown,V>,
    mergeFunction: GroupByMergeFunction<V> = (_,b) => b
): Map<K,V> {
    const _self = this as Array<unknown>
    return _self.reduce<Map<K,V>>((map,item) => {
        const key = keyMapper(item)
        const value = valueMapper(item)
        const prevValue = map.get(key)
        map.set(key,prevValue ? mergeFunction(prevValue,value) : value)
        return map
    },new Map<K,V>())
}

Array.prototype.groupbyToDictionary = function <K extends string,V>(
    keyMapper: Mapper<unknown,K>,
    valueMapper: Mapper<unknown,V>,
    mergeFunction: GroupByMergeFunction<V> = (_,b) => b
): Record<K,V> {
    const _self = this as Array<unknown>
    return _self.reduce<Record<K,V>>((object,item) => {
        const key = keyMapper(item)
        const value = valueMapper(item)
        const prevValue = object[key]
        object[key] = prevValue ? mergeFunction(prevValue,value) : value
        return object
    },{} as Record<K,V>)
}
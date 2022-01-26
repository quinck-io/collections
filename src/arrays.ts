export { }

declare global {
  interface Array<T> {
    /**
     * Perform a group by operation grouping by the result of the keyMapper.
     * @param keyMapper used to get the key
     * @param valueMapper used to get the value
     * @param mergeFunction unify two items into a unique items with the same key
     * @returns a map with elements grouped
     */
    groupby<K,V>(keyMapper: (x: T) => K, valueMapper: (x: T) => V, mergeFunction?: (a: V, b: V) => V): Map<K,V>
  }
}

Array.prototype.groupby = function <K,V>(
    keyMapper: (x: unknown) => K,
    valueMapper: (x: unknown) => V,
    mergeFunction: (a: V, b: V) => V = (_,b) => b
): Map<K,V> {
    const _self = this as Array<unknown>
    return _self.reduce<Map<K,V>>((map,item) => {
        const k = keyMapper(item)
        const value = valueMapper(item)
        const prevValue = map.get(k)
        map.set(k,prevValue ? mergeFunction(prevValue,value) : value)
        return map
    },new Map<K,V>())
}
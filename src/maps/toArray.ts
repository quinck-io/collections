export { }

declare global {
  interface Map<K,V> {
      /**
       * Creates a new Array with all the elements of the Map.
       * Each element of the new Array will be 
       * an Array with a Key and the relative Value.
       * @returns an Array with the Map entries
       */
      toArray(): Array<[K,V]>
      /**
       * Creates a new Array with all the keys of the Map.
       * @returns an Array with the Map keys
       */
      keysArray(): Array<K>
      /**
       * Creates a new Array with all the values of the Map.
       * @returns an Array with the Map values
       */
      valuesArray(): Array<V>
  }
}

Map.prototype.toArray = function <K,V>(): Array<[K,V]> {
    const _self = this as Map<K,V>
    return Array.from(_self.entries())
}

Map.prototype.keysArray = function <K,V>(): Array<K> {
    const _self = this as Map<K,V>
    return Array.from(_self.keys())
}

Map.prototype.valuesArray = function <K,V>(): Array<V> {
    const _self = this as Map<K,V>
    return Array.from(_self.values())
}
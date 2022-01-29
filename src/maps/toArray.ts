export { }

declare global {
  interface Map<K,V> {
      toArray(): Array<[K,V]>
      keysArray(): Array<K>
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
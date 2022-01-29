export { }

declare global {
  interface Map<K,V> {
      toArray(): Array<[K,V]>
  }
}

Map.prototype.toArray = function <K,V>(): Array<[K,V]> {
    const _self = this as Map<K,V>
    return Array.from(_self.entries())
}
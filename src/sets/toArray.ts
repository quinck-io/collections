export { }

declare global {
  interface Set<T> {
      /**
       * Creates a new Array with all the elements of the Set.
       * @returns an Array with the Set values
       */
      toArray(): Array<T>
  }
}

Set.prototype.toArray = function <T>(): Array<T> {
    const _self = this as Set<T>
    return Array.from(_self.values())
}
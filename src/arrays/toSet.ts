export {}

declare global {
  interface Array<T> {
    /**
     * Creates a new Set with all the elements of the Array.
     * @returns an Set with the Array items
     */
    toSet(): Set<T>
  }
}

Array.prototype.toSet = function <T>(): Set<T> {
    const _self = this as Array<T>
    return new Set(_self)
}
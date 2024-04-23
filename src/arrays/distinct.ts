export {}
import '../maps/toArray'
import './groupBy'

declare global {
    interface Array<T> {
        /**
         * Returns a new Array containing only the distinct elements of the original Array.
         * @returns a new Array containing only the distinct elements of the original Array
         */
        distinct(): Array<T>
        /**
         * Returns a new Array containing only the distinct elements of the original Array.
         * @param f A function that receives an element of the Array and returns a value used to compare the elements
         * @returns a new Array containing only the distinct elements of the original Array
         */
        distinctBy<S>(f: (value: T) => S): Array<T>
    }
}

Array.prototype.distinct = function <T>() {
    const _self = this as Array<T>

    return _self.filter((item, index, array) => array.indexOf(item) === index)
}

Array.prototype.distinctBy = function <T, S>(f: (value: T) => S) {
    const _self = this as Array<T>

    return _self
        .groupBy(
            i => f(i),
            i => i,
            a => a,
        )
        .valuesArray()
}

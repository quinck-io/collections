export {}
import '../maps/toArray'
import './groupBy'

declare global {
    interface Array<T> {
        distinct(): Array<T>
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

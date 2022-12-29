export {}

declare global {
    interface Array<T> {
        /**
         * Considering n the the length of the array and size the number of items per chunck.
         * Splits array items in sn=n/size, rounded up, arrays.
         * The first sn-1 resulting arrays are of length equals to size,
         * while the last array cloud have a length between 1 and size inclusive.
         * I.e.
         * source=[1,2,3,4,5,6] the initial array
         * n=6
         * size=4
         * result=[[1,2,3,4],[5,6]] the rsulting array
         * @param size the number of items per chuck
         * @returns the orginal array splitted into arrays of length <= size
         */
        chunckify(size: number): Array<Array<T>>
    }
}

Array.prototype.chunckify = function <T>(size: number): Array<Array<T>> {
    const _self = this as Array<T>
    const numberOfChuncks = Math.ceil(_self.length / size)
    return Array.from({ length: numberOfChuncks }, (_, i) =>
        _self.slice(i * size, (i + 1) * size),
    )
}

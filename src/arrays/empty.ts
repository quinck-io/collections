export {}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Array<T> {
        /**
         * Verify if an erray is empty or not.
         * @returns true if the array is empty, false otherwise
         */
        isEmpty: boolean
    }
}

const EMPTY_ARRAY_LENGTH = 0

if (!Array.prototype.isEmpty) {
    Object.defineProperty(Array.prototype, 'isEmpty', {
        get: function <T>(): boolean {
            const _self = this as Array<T>
            return _self.length === EMPTY_ARRAY_LENGTH
        },
    })
}

export class ArrayIndexOutOfBoundsError extends Error {
    name = ArrayIndexOutOfBoundsError.name

    constructor(array?: unknown[], index?: number) {
        super(`Index ${index} out of bounds for length ${array?.length}`)
    }
}

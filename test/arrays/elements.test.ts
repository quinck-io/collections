import { expect } from 'chai'
import '../../src'
import { ArrayIndexOutOfBoundsError } from '../../src/errors/array-index-out-of-bounds-error'

describe('Array.first', () => {
    it('should retrieve the first element of an array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const firstElement = array[0]

        const result = array.first()

        expect(result).to.be.equal(firstElement)
    })

    it('should not modify the array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const initialArrayCopy = [...array]

        array.first()

        expect(array).to.be.deep.equal(initialArrayCopy)
    })

    it(`should throw ${ArrayIndexOutOfBoundsError.name} error if the array is empty`, () => {
        const emptyArray: unknown[] = []

        expect(emptyArray.first.bind(emptyArray)).to.throw(
            ArrayIndexOutOfBoundsError,
        )
    })
})

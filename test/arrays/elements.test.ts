import { expect } from 'chai'
import '../../src'
import { ArrayIndexOutOfBoundsError } from '../../src/errors/array-index-out-of-bounds-error'

describe('Array.first', () => {
    it('should retrieve the first element of an array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const firstElement = array[0]

        expect(array.first).to.be.equal(firstElement)
    })

    it('should not modify the array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const initialArrayCopy = [...array]

        array.first

        expect(array).to.be.deep.equal(initialArrayCopy)
    })

    it(`should throw ${ArrayIndexOutOfBoundsError.name} error if the array is empty`, () => {
        const emptyArray: unknown[] = []

        expect(() => emptyArray.first).to.throw(ArrayIndexOutOfBoundsError)
    })
})

describe('Array.firstOrDefault', () => {
    it('should retrieve the first element of an array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const firstElement = array[0]

        expect(array.firstOrDefualt).to.be.equal(firstElement)
    })

    it('should not modify the array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const initialArrayCopy = [...array]

        array.firstOrDefualt

        expect(array).to.be.deep.equal(initialArrayCopy)
    })

    it('should return undefined if the array is empty', () => {
        const emptyArray: unknown[] = []

        expect(emptyArray.firstOrDefualt).to.be.undefined
    })
})

describe('Array.last', () => {
    it('should retrieve the last element of an array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const lastElement = array[array.length - 1]

        expect(array.last).to.be.equal(lastElement)
    })

    it('should not modify the array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const initialArrayCopy = [...array]

        array.last

        expect(array).to.be.deep.equal(initialArrayCopy)
    })

    it(`should throw ${ArrayIndexOutOfBoundsError.name} error if the array is empty`, () => {
        const emptyArray: unknown[] = []

        expect(() => emptyArray.last).to.throw(ArrayIndexOutOfBoundsError)
    })
})

describe('Array.lastOrDefault', () => {
    it('should retrieve the last element of an array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const lastElement = array[array.length - 1]

        expect(array.lastOrDefualt).to.be.equal(lastElement)
    })

    it('should not modify the array', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)
        const initialArrayCopy = [...array]

        array.lastOrDefualt

        expect(array).to.be.deep.equal(initialArrayCopy)
    })

    it('should return undefined if the array is empty', () => {
        const emptyArray: unknown[] = []

        expect(emptyArray.lastOrDefualt).to.be.undefined
    })
})

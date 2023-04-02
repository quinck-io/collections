import { expect } from 'chai'
import '../../src'

describe('Array.empty', () => {
    it('should return true if the array is empty', () => {
        const emptyArray: unknown[] = []

        expect(emptyArray.isEmpty).to.be.true
    })

    it('should return false if the array is not empty', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)

        expect(array.isEmpty).to.be.false
    })
})

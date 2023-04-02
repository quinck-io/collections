import { expect } from 'chai'
import '../../src'

describe('Array.filterIf', () => {
    it('should filter the array if isApplicable is true, producing the same result of an Array.filter', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)

        const predicate = (x: number) => x > 0
        const result = array.filterIf(true, predicate)
        const arrayFilterResult = array.filter(predicate)

        expect(result).to.have.all.members(arrayFilterResult)
    })

    it('should not filter the array if isApplicable is false', () => {
        const array = Array.from({ length: 10 }, (_, i) => i)

        const result = array.filterIf(false, x => x > 0)

        expect(result).to.have.all.members(array)
    })
})

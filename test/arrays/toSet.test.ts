import { expect } from 'chai'
import 'mocha'
import '../../src/arrays/toSet'
import { foods } from './utils'

describe('Tests for Array.toSet', () => {
    it('should return a Set', () => {
        const elements = foods.toSet()

        expect(elements).to.be.instanceOf(Set)
    })

    it('should contain a number of elements equals to the size of the original Array', () => {
        const elements = foods.toSet()

        expect(elements.size).to.be.equal(foods.length)
    })

    it('should contains all the values of the original Array', () => {
        const elements = foods.toSet()

        foods.forEach(food => expect(elements).to.deep.contain(food))
    })
})

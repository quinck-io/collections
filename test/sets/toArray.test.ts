import 'mocha'
import '../../src/sets/toArray'
import { exampleSet } from './utils'
import { expect } from 'chai'

describe('Tests for Set.toArray', () => {

    it('should return an Array', () => {
        const elements = exampleSet.toArray()

        expect(elements).to.be.instanceOf(Array)
    })

    it('should contain a number of elements equals to the size of the original Set', () => {

        const elements = exampleSet.toArray()

        expect(elements.length).to.be.equal(exampleSet.size)

    })

    it('should contains all the entries of the original Set', () => {

        const elements = exampleSet.toArray()
        const originalValues = exampleSet.values()

        for (const originalValue of originalValues) {
            expect(elements).to.contain(originalValue)
        }
    
    })

})
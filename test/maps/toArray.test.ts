import 'mocha'
import '../../src/maps/toArray'
import { exampleMap } from './utils'
import { expect } from 'chai'

describe('Tests for Map.toArray', () => {

    it('should return an Array', () => {
        const elements = exampleMap.toArray()

        expect(elements).to.be.instanceOf(Array)
    })

    it('should contain a number of elements equals to the size of the original Map', () => {

        const elements = exampleMap.toArray()

        expect(elements.length).to.be.equal(exampleMap.size)

    })

    it('should contains all the entries of the original Map', () => {

        const elements = exampleMap.toArray()
        const originalElements = exampleMap.entries()

        for (const originalElement of originalElements) {
            const [originalKey] = originalElement
            const element = elements.find(([key]) => key === originalKey)
            expect(element).to.be.deep.equal(originalElement)
        }
    
    })

})
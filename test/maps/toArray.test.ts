import { expect } from 'chai'
import 'mocha'
import '../../src/maps/toArray'
import { exampleMap } from './utils'

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

describe('Tests for Map.keysArray', () => {
    it('should return an Array', () => {
        const elements = exampleMap.keysArray()

        expect(elements).to.be.instanceOf(Array)
    })

    it('should contain a number of elements equals to the size of the original Map', () => {
        const elements = exampleMap.keysArray()

        expect(elements.length).to.be.equal(exampleMap.size)
    })

    it('should contains all the keys of the original Map', () => {
        const elements = exampleMap.keysArray()
        const originalElements = exampleMap.keys()

        for (const originalKey of originalElements) {
            expect(elements).to.contain(originalKey)
        }
    })
})

describe('Tests for Map.valuesArray', () => {
    it('should return an Array', () => {
        const elements = exampleMap.valuesArray()

        expect(elements).to.be.instanceOf(Array)
    })

    it('should contain a number of elements equals to the size of the original Map', () => {
        const elements = exampleMap.valuesArray()

        expect(elements.length).to.be.equal(exampleMap.size)
    })

    it('should contains all the values of the original Map', () => {
        const elements = exampleMap.valuesArray()
        const originalValues = exampleMap.values()

        for (const originalValue of originalValues) {
            expect(elements).to.deep.contain(originalValue)
        }
    })
})

import 'mocha'
import '../../src/maps/map.constructors.extensions'
import { expect } from 'chai'

describe('Tests for new Map constructor with spread entries', () => {
    it('should allow to build a new Map', () => {
        const map = Map.create<string, string>(
            ['key', 'value'],
            ['key2', 'value2'],
        )
        expect(map).to.be.instanceOf(Map)
    })

    it('should contain a number of elements equals to the size of the specified elements', () => {
        const map = Map.create<string, string>(
            ['key', 'value'],
            ['key2', 'value2'],
        )
        expect(map.size).to.be.equal(2)
    })

    it('should contains all the specified entries', () => {
        const element1: [string, string] = ['key', 'value']
        const element2: [string, string] = ['key2', 'value2']
        const map = Map.create<string, string>(element1, element2)

        expect(map.get(element1[0])).to.be.equal(element1[1])
        expect(map.get(element2[0])).to.be.equal(element2[1])
    })
})

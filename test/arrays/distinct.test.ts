import { expect } from 'chai'
import '../../src/index'

describe('arrays/distinct', () => {
    it('should return distinct elements', () => {
        const input = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        const expected = [1, 2, 3, 4, 5]

        const result = input.distinct()

        expect(result).to.be.deep.equal(expected)
    })

    it('should keep the first element when there are duplicates', () => {
        const input = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        const expected = [1, 2, 3, 4, 5]

        const result = input.distinct()

        expect(result).to.be.deep.equal(expected)
    })
})

describe('arrays/distinctBy', () => {
    it('should return distinct elements by key', () => {
        const input = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' },
            { id: 1, name: 'd' },
            { id: 2, name: 'e' },
            { id: 3, name: 'f' },
        ]
        const expected = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' },
        ]

        const result = input.distinctBy(x => x.id)

        expect(result).to.be.deep.equal(expected)
    })

    it('should keep the first element when there are duplicates', () => {
        const input = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' },
            { id: 1, name: 'd' },
            { id: 2, name: 'e' },
            { id: 3, name: 'f' },
        ]
        const expected = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' },
        ]

        const result = input.distinctBy(x => x.id)

        expect(result).to.be.deep.equal(expected)
    })
})

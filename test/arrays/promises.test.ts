import chai from 'chai'
import chaiPromise from 'chai-as-promised'
import 'mocha'
import '../../src/arrays/promises'

chai.use(chaiPromise)

const { expect } = chai

describe('Tests for Array.awaitAll', () => {
    describe('when the array is an array of awaitable elements', () => {
        it('should fulfill and return the awaited elements if all promises fulfills', () => {
            const elements = ['a', 'b']
            const elementsPromisified = elements.map(e => Promise.resolve(e))
            const results = elementsPromisified.awaitAll()

            expect(results).to.be.eventually.fulfilled.and.be.deep.equal(elements)
        })

        it('should rejects if any promise rejects and throw the error thrown by the rejected promise', () => {
            const result = 'result'
            const error = 'error'
            const elements = [Promise.resolve(result), Promise.reject(error)]
            const results = elements.awaitAll()

            expect(results).to.be.eventually.rejected.and.be.equal(error)
        })
    })

    describe('when the array is an array of non awaitable elements', () => {
        it('should fulfill and return the same elements of the original array', () => {
            const elements = ['a', 'b']
            const results = elements.awaitAll()

            expect(results).to.be.eventually.fulfilled.and.be.deep.equal(elements)
        })
    })
})

describe('Tests for Array.tryToAwaitAll', () => {
    describe('when the array is an array of awaitable elements', () => {
        it('should fulfill and return all the elements fulfilled or rejected', () => {
            const result = 'result'
            const error = 'error'
            const elements = [Promise.resolve(result), Promise.reject(error)]
            const results = elements.tryToAwaitAll()

            const expected: PromiseSettledResult<string>[] = [
                { status: 'fulfilled', value: result },
                { status: 'rejected', reason: error },
            ]

            expect(results).to.be.eventually.rejected.and.be.equal(expected)
        })
    })

    describe('when the array is an array of non awaitable elements', () => {
        it('should fulfill and return the same elements of the original array', () => {
            const elements = ['a', 'b']
            const results = elements.tryToAwaitAll()

            expect(results).to.be.eventually.fulfilled.and.be.deep.equal(elements)
        })
    })
})

describe('Tests for Array.awaitAllFulfilled', () => {
    describe('when the array is an array of awaitable elements', () => {
        it('should fulfill and return all the elements fulfilled', () => {
            const result = 'result'
            const error = 'error'
            const elements = [Promise.resolve(result), Promise.reject(error)]
            const results = elements.awaitAllFulfilled()

            expect(results).to.be.eventually.rejected.and.be.equal([result])
        })
    })

    describe('when the array is an array of non awaitable elements', () => {
        it('should fulfill and return the same elements of the original array', () => {
            const elements = ['a', 'b']
            const results = elements.awaitAllFulfilled()

            expect(results).to.be.eventually.fulfilled.and.be.deep.equal(elements)
        })
    })
})

describe('Tests for Array.awaitAllRejected', () => {
    describe('when the array is an array of awaitable elements', () => {
        it('should fulfill and return all the elements rejected', () => {
            const result = 'result'
            const error = 'error'
            const elements = [Promise.resolve(result), Promise.reject(error)]
            const results = elements.awaitAllRejected()

            expect(results).to.be.eventually.rejected.and.be.equal([error])
        })
    })

    describe('when the array is an array of non awaitable elements', () => {
        it('should fulfill and return the same elements of the original array', () => {
            const elements = ['a', 'b']
            const results = elements.awaitAllRejected()

            expect(results).to.be.eventually.fulfilled.and.be.deep.equal(elements)
        })
    })
})

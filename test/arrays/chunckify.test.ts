import { expect } from 'chai'
import 'mocha'
import '../../src'

type Size = number
type ArrayLength = number
type Describe = string
type It = string
type IsChunckValidCondition = (
    length: ArrayLength,
    size: Size,
) => Parameters<Array<number[]>['every']>[0]
type ChunckifyTestCase = [
    ArrayLength,
    Size,
    Describe,
    It,
    IsChunckValidCondition,
]

describe('Tests for Array.chunckify', () => {
    const testCases: ChunckifyTestCase[] = [
        [
            100,
            10,
            'when the length of the original array is multiple of the specified size',
            'should split the array in chuncks all of length equals to size',
            (_, size) =>
                ({ length }) =>
                    length === size,
        ],
        [
            12,
            10,
            'when the length of the original array is greater than the specified size',
            'should split the array in chuncks all of length equals to size except the last with a length less than size',
            (length, size) => (chunck, index, array) =>
                index === array.length - 1
                    ? chunck.length === length % size
                    : chunck.length === size,
        ],
        [
            8,
            10,
            'when the length of the original array is lower than the specified size',
            'should split the array in one chunck with all the elements of the original array',
            length => chunck => chunck.length === length,
        ],
    ]

    testCases.forEach(
        ([length, size, describeText, itText, isChunckValidCondition]) =>
            describe(describeText, () => {
                it(itText, () => {
                    const input = Array.from({ length }, (_, i) => i)
                    const result = input.chunckify(size)

                    const successCondition = result.every(
                        isChunckValidCondition(length, size),
                    )

                    expect(successCondition).to.be.true
                })

                it('should keep the items in the original order', () => {
                    const input = Array.from({ length }, (_, i) => i)
                    const result = input.chunckify(size)

                    expect(result.flat().length).to.be.equals(input.length)
                    result
                        .flat()
                        .forEach((item, index) => input[index] === item)
                })
            }),
    )
})

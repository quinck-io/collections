import '../../src/arrays/arrays'
import {foods, fruits} from './utils'

describe('Tests for Array.groupByToDictionary', () => {

    test('should return an Object', () => {
        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory).toBeInstanceOf(Object)
    })

    test('should return the results with the correct keys', () => {

        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory.FRUITS).not.toBeNull()
        expect(foodsByCategory.FRUITS).not.toBeUndefined()

        expect(foodsByCategory.VEGETABLES).not.toBeNull()
        expect(foodsByCategory.VEGETABLES).not.toBeUndefined()
    })

    test('should have all keys to be instance of String', () => {

        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        const keys = Object.keys(foodsByCategory)
        keys.forEach(key => expect(typeof key).toStrictEqual<'string'>('string'))
    })

    test('should return the results with the correct values', () => {

        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        const groupedFruits = foodsByCategory.FRUITS
        expect(groupedFruits).not.toBeNull()
        expect(groupedFruits).not.toBeUndefined()
        expect(groupedFruits).toBeInstanceOf(Array)
        fruits.forEach(({foodName}) => expect(groupedFruits).toContain(foodName))
    
    })

    test('should not add additional keys', () => {

        const foodsByCategory = fruits.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory.VEGETABLES).toBe(undefined)
    
    })

})
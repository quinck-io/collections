import '../../src/arrays/arrays'
import {foods, fruits} from './utils'

describe('Tests for Array.simpleGroupByToDictionary', () => {

    test('should return an Object', () => {
        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        expect(foodsByCategory).toBeInstanceOf(Object)
    })

    test('should return the results with the correct keys', () => {

        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        expect(foodsByCategory.FRUITS).not.toBeNull()
        expect(foodsByCategory.FRUITS).not.toBeUndefined()
        expect(foodsByCategory.FRUITS).toBeDefined()

        expect(foodsByCategory.VEGETABLES).not.toBeNull()
        expect(foodsByCategory.VEGETABLES).not.toBeUndefined()
        expect(foodsByCategory.VEGETABLES).toBeDefined()
    })

    test('should have all keys to be instance of String', () => {

        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        const keys = Object.keys(foodsByCategory)
        keys.forEach(key => expect(typeof key).toStrictEqual<'string'>('string'))
    })

    test('should return the results with the correct values', () => {

        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        const groupedFruits = foodsByCategory.FRUITS
        expect(groupedFruits).not.toBeNull()
        expect(groupedFruits).not.toBeUndefined()
        expect(groupedFruits).toBeDefined()
        expect(groupedFruits).toBeInstanceOf(Array)
        const fruitsNames = groupedFruits.map(x => x.foodName)
        fruits.forEach(({foodName}) => expect(fruitsNames).toContain(foodName))
    
    })

    test('should not add additional keys', () => {

        const foodsByCategory = fruits.simpleGroupByToDictionary(({category}) => category)

        expect(foodsByCategory.VEGETABLES).toBeUndefined()
    
    })

})
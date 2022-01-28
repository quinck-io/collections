import '../../src/arrays/arrays'
import {Food, FoodCategory, foods, fruits} from './utils'

describe('Tests for Array.simpleGroupBy', () => {

    test('should return a Map', () => {
        const foodsByCategory = foods.simpleGroupBy(({category}) => category)

        expect(foodsByCategory).toBeInstanceOf(Map)
    })

    test('should return the results with the correct keys', () => {

        const foodsByCategory = foods.simpleGroupBy(({category}) => category)

        expect(foodsByCategory.has(FoodCategory.FRUITS)).toBe(true)
        expect(foodsByCategory.has(FoodCategory.VEGETABLES)).toBe(true)
    })

    test('should return the results with the correct values', () => {

        const foodsByCategory = foods.simpleGroupBy(({category}) => category)

        const groupedFruits = foodsByCategory.get(FoodCategory.FRUITS)
        expect(groupedFruits).not.toBeNull()
        expect(groupedFruits).not.toBeUndefined()
        expect(groupedFruits).toBeDefined()
        expect(groupedFruits).toBeInstanceOf(Array)
        const fruitsNames = (groupedFruits as Food[]).map(x => x.foodName)
        fruits.forEach(({foodName}) => expect(fruitsNames).toContain(foodName))
    
    })

    test('should not add additional keys', () => {

        const foodsByCategory = fruits.simpleGroupBy(({category}) => category)

        expect(foodsByCategory.has(FoodCategory.VEGETABLES)).toBe(false)
    
    })

})
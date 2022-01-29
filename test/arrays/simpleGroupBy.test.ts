import 'mocha'
import '../../src/arrays/arrays'
import {Food, FoodCategory, foods, fruits} from './utils'
import {expect} from 'chai'

describe('Tests for Array.simpleGroupBy', () => {

    it('should return a Map', () => {
        const foodsByCategory = foods.simpleGroupBy(({category}) => category)

        expect(foodsByCategory).to.be.instanceOf(Map)
    })

    it('should return the results with the correct keys', () => {

        const foodsByCategory = foods.simpleGroupBy(({category}) => category)

        expect(foodsByCategory.has(FoodCategory.FRUITS)).to.be.true
        expect(foodsByCategory.has(FoodCategory.VEGETABLES)).to.be.true
    })

    it('should return the results with the correct values', () => {

        const foodsByCategory = foods.simpleGroupBy(({category}) => category)

        const groupedFruits = foodsByCategory.get(FoodCategory.FRUITS)
        expect(groupedFruits).not.to.be.null
        expect(groupedFruits).not.to.be.undefined
        expect(groupedFruits).to.be.instanceOf(Array)
        const fruitsNames = (groupedFruits as Food[]).map(x => x.foodName)
        fruits.forEach(({foodName}) => expect(fruitsNames).to.contain(foodName))
    
    })

    it('should not add additional keys', () => {

        const foodsByCategory = fruits.simpleGroupBy(({category}) => category)

        expect(foodsByCategory.has(FoodCategory.VEGETABLES)).to.be.false
    
    })

})
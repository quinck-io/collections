import 'mocha'
import '../../src/arrays/arrays'
import {FoodCategory, foods, fruits} from './utils'
import { expect } from 'chai'

describe('Tests for Array.groupBy', () => {

    it('should return a Map', () => {
        const foodsByCategory = foods.groupBy(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory).to.be.instanceOf(Map)
    })

    it('should return the results with the correct keys', () => {

        const foodsByCategory = foods.groupBy(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory.has(FoodCategory.FRUITS)).to.be.true
        expect(foodsByCategory.has(FoodCategory.VEGETABLES)).to.be.true
    })

    it('should return the results with the correct values', () => {

        const foodsByCategory = foods.groupBy(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        const groupedFruits = foodsByCategory.get(FoodCategory.FRUITS)
        expect(groupedFruits).not.to.be.null
        expect(groupedFruits).not.to.be.undefined
        expect(groupedFruits).to.be.instanceOf(Array)
        fruits.forEach(({foodName}) => expect(groupedFruits).to.contain(foodName))
    
    })

    it('should not add additional keys', () => {

        const foodsByCategory = fruits.groupBy(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory.has(FoodCategory.VEGETABLES)).to.be.false
    
    })

})
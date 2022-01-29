import 'mocha'
import '../../src/arrays/groupBy'
import {Food, FoodCategory, foods, fruits} from './utils'
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

describe('Tests for Array.groupByToDictionary', () => {

    it('should return an Object', () => {
        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory).to.be.instanceOf(Object)
    })

    it('should return the results with the correct keys', () => {

        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory.FRUITS).not.to.be.null
        expect(foodsByCategory.FRUITS).not.to.be.undefined

        expect(foodsByCategory.VEGETABLES).not.to.be.null
        expect(foodsByCategory.VEGETABLES).not.to.be.undefined
    })

    it('should have all keys to be instance of String', () => {

        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        const keys = Object.keys(foodsByCategory)
        keys.forEach(key => expect(typeof key).to.be.equal('string'))
    })

    it('should return the results with the correct values', () => {

        const foodsByCategory = foods.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        const groupedFruits = foodsByCategory.FRUITS
        expect(groupedFruits).not.to.be.null
        expect(groupedFruits).not.to.be.undefined
        expect(groupedFruits).to.be.instanceOf(Array)
        fruits.forEach(({foodName}) => expect(groupedFruits).to.contain(foodName))
    
    })

    it('should not add additional keys', () => {

        const foodsByCategory = fruits.groupByToDictionary(
            ({category}) => category,
            ({foodName}) => [foodName],
            (a,b) => a.concat(b)
        )

        expect(foodsByCategory.VEGETABLES).to.be.undefined
    
    })

})

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

describe('Tests for Array.simpleGroupByToDictionary', () => {

    it('should return an Object', () => {
        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        expect(foodsByCategory).to.be.instanceOf(Object)
    })

    it('should return the results with the correct keys', () => {

        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        expect(foodsByCategory.FRUITS).not.to.be.null
        expect(foodsByCategory.FRUITS).not.to.be.undefined

        expect(foodsByCategory.VEGETABLES).not.to.be.null
        expect(foodsByCategory.VEGETABLES).not.to.be.undefined
    })

    it('should have all keys to be instance of String', () => {

        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        const keys = Object.keys(foodsByCategory)
        keys.forEach(key => expect(key).to.be.a('string'))
    })

    it('should return the results with the correct values', () => {

        const foodsByCategory = foods.simpleGroupByToDictionary(({category}) => category)

        const groupedFruits = foodsByCategory.FRUITS
        expect(groupedFruits).not.to.be.null
        expect(groupedFruits).not.to.be.undefined
        expect(groupedFruits).to.be.instanceOf(Array)
        const fruitsNames = groupedFruits.map(x => x.foodName)
        fruits.forEach(({foodName}) => expect(fruitsNames).to.contain(foodName))
    
    })

    it('should not add additional keys', () => {

        const foodsByCategory = fruits.simpleGroupByToDictionary(({category}) => category)

        expect(foodsByCategory.VEGETABLES).to.be.undefined
    
    })

})
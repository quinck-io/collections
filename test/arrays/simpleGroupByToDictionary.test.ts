import 'mocha'
import '../../src/arrays/arrays'
import {foods, fruits} from './utils'
import {expect} from 'chai'

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
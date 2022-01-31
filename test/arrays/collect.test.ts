import 'mocha'
import '../../src/arrays/collect'
import {defaultPrice, FoodCategory, foods, FoodWithPrice, fruitPrice, fruits, vegetablePrice, vegetables} from './utils'
import { expect } from 'chai'

describe('Tests for Array.singleCollect', () => {

    describe('When otherwiseMapper is not specified', () => {

        it('should return an Array', () => {
            const collectedFruits = foods.singleCollect(
                ({category}) => category === FoodCategory.FRUITS,
                ({foodName}) => foodName
            )
    
            expect(collectedFruits).to.be.instanceOf(Array)
        })
    
        it('should return the correct values', () => {
    
            const collectedFruits = foods.singleCollect(
                ({category}) => category === FoodCategory.FRUITS,
                ({foodName}) => foodName
            )
            
            fruits.forEach(({foodName}) => expect(collectedFruits).to.contain(foodName))
        
        })
    
        it('should not add accept values that does not satisfy the specified filter', () => {
    
            const collectedFruits = foods.singleCollect(
                ({category}) => category === FoodCategory.FRUITS,
                ({foodName}) => foodName
            )

            vegetables.forEach(vegetable => expect(collectedFruits).not.to.contain(vegetable))
        
        })

    })

    describe('When otherwiseMapper is specified', () => {

        it('should return an Array', () => {
            const collectedFoods = foods.singleCollect<FoodWithPrice>(
                ({category}) => category === FoodCategory.FRUITS,
                food => ({...food, price: fruitPrice}),
                food => ({...food, price: defaultPrice}),
            )
    
            expect(collectedFoods).to.be.instanceOf(Array)
        })
    
        it('should return the correct values', () => {
    
            const collectedFoods = foods.singleCollect<FoodWithPrice>(
                ({category}) => category === FoodCategory.FRUITS,
                food => ({...food, price: fruitPrice}),
                food => ({...food, price: defaultPrice}),
            )
            
            const collectedFoodsNames = collectedFoods.map(x => x.foodName)
            foods.forEach(({foodName}) => expect(collectedFoodsNames).to.contain(foodName))

            expect(collectedFoods.length).to.be.equal(foods.length)
        })

        it('should return both matched and other values correctly', () => {
    
            const collectedFoods = foods.singleCollect<FoodWithPrice>(
                ({category}) => category === FoodCategory.FRUITS,
                food => ({...food, price: fruitPrice}),
                food => ({...food, price: defaultPrice}),
            )

            collectedFoods.forEach(({category,price}) => {
                if (category === FoodCategory.FRUITS)
                    expect(price).to.be.equal(fruitPrice)
                else
                    expect(price).to.be.equal(defaultPrice)
            })
        
        })
        
    })

})


describe('Tests for Array.collect', () => {

    describe('When otherwiseMapper is not specified', () => {

        it('should return an Array', () => {
            const collectedFoods = foods.collect<FoodWithPrice>([
                [({category}) => category === FoodCategory.FRUITS, food => ({...food, price: fruitPrice})],
                [({category}) => category === FoodCategory.VEGETABLES, food => ({...food, price: vegetablePrice})]
            ])

            expect(collectedFoods).to.be.instanceOf(Array)
        })
    
        it('should return the correct values', () => {
    
            const collectedFoods = foods.collect<FoodWithPrice>([
                [({category}) => category === FoodCategory.FRUITS, food => ({...food, price: fruitPrice})],
                [({category}) => category === FoodCategory.VEGETABLES, food => ({...food, price: vegetablePrice})]
            ])

            const collectedFoodsNames = collectedFoods.map(x => x.foodName)

            fruits.forEach(({foodName}) => expect(collectedFoodsNames).to.contain(foodName))

            vegetables.forEach(({foodName}) => expect(collectedFoodsNames).to.contain(foodName))
        
        })
    
        it('should not add accept values that does not satisfy the specified filter', () => {
    
            const collectedFoods = foods.collect<FoodWithPrice>([
                [({category}) => category === FoodCategory.FRUITS, food => ({...food, price: fruitPrice})]
            ])

            vegetables.forEach(vegetable => expect(collectedFoods).not.to.contain(vegetable))
        
        })

    })

    describe('When otherwiseMapper is specified', () => {

        it('should return an Array', () => {

            const collectedFoods = foods.collect<FoodWithPrice>(
                [
                    [({category}) => category === FoodCategory.FRUITS, food => ({...food, price: fruitPrice})],
                    [({category}) => category === FoodCategory.VEGETABLES, food => ({...food, price: vegetablePrice})]
                ],
                food => ({...food, price: defaultPrice})
            )
    
            expect(collectedFoods).to.be.instanceOf(Array)
        })
    
        it('should return all the values of the previus array', () => {
    
            const collectedFoods = foods.collect<FoodWithPrice>(
                [
                    [({category}) => category === FoodCategory.FRUITS, food => ({...food, price: fruitPrice})],
                    [({category}) => category === FoodCategory.VEGETABLES, food => ({...food, price: vegetablePrice})]
                ],
                food => ({...food, price: defaultPrice})
            )
            
            const collectedFoodsNames = collectedFoods.map(x => x.foodName)
            foods.forEach(({foodName}) => expect(collectedFoodsNames).to.contain(foodName))
            expect(collectedFoods.length).to.be.equal(foods.length)
        })

        it('should return both matched and other values correctly', () => {
    
            const collectedFoods = foods.collect<FoodWithPrice>(
                [
                    [({category}) => category === FoodCategory.FRUITS, food => ({...food, price: fruitPrice})],
                    [({category}) => category === FoodCategory.VEGETABLES, food => ({...food, price: vegetablePrice})]
                ],
                food => ({...food, price: defaultPrice})
            )

            collectedFoods.forEach(({category,price}) => {
                if (category === FoodCategory.FRUITS)
                    expect(price).to.be.equal(fruitPrice)
                else if (category === FoodCategory.VEGETABLES)
                    expect(price).to.be.equal(vegetablePrice)
                else
                    expect(price).to.be.equal(defaultPrice)
            })
        
        })
        
    })

})
import { expect } from 'chai'
import 'mocha'
import {
    Food,
    FoodCategory,
    FoodWithPrice,
    defaultPrice,
    foods,
    fruitPrice,
    fruits,
    vegetablePrice,
    vegetables,
} from './utils'

import '../../src'
import { match } from '../../src'

describe('Tests for Array.singleCollect', () => {
    describe('when operating with multi levels arrays', () => {
        it('should not flat items of the original array or resulting from the matchedMapper', () => {
            const input: string[][] = [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
            ]
            const result = input.singleCollect(
                ([first]) => first === 'a',
                item => item,
            )
            expect(result).to.be.deep.equal([['a', 'b', 'c']])
        })
    })

    describe('When otherwiseMapper is not specified', () => {
        it('should return an Array', () => {
            const collectedFruits = foods.singleCollect(
                ({ category }) => category === FoodCategory.FRUITS,
                ({ foodName }) => foodName,
            )

            expect(collectedFruits).to.be.instanceOf(Array)
        })

        it('should return the correct values', () => {
            const collectedFruits = foods.singleCollect(
                ({ category }) => category === FoodCategory.FRUITS,
                ({ foodName }) => foodName,
            )

            fruits.forEach(({ foodName }) =>
                expect(collectedFruits).to.contain(foodName),
            )
        })

        it('should not add accept values that does not satisfy the specified filter', () => {
            const collectedFruits = foods.singleCollect(
                ({ category }) => category === FoodCategory.FRUITS,
                ({ foodName }) => foodName,
            )

            vegetables.forEach(vegetable =>
                expect(collectedFruits).not.to.contain(vegetable),
            )
        })
    })

    describe('When otherwiseMapper is specified', () => {
        it('should return an Array', () => {
            const collectedFoods = foods.singleCollect<FoodWithPrice>(
                ({ category }) => category === FoodCategory.FRUITS,
                food => ({ ...food, price: fruitPrice }),
                food => ({ ...food, price: defaultPrice }),
            )

            expect(collectedFoods).to.be.instanceOf(Array)
        })

        it('should return the correct values', () => {
            const collectedFoods = foods.singleCollect<FoodWithPrice>(
                ({ category }) => category === FoodCategory.FRUITS,
                food => ({ ...food, price: fruitPrice }),
                food => ({ ...food, price: defaultPrice }),
            )

            const collectedFoodsNames = collectedFoods.map(x => x.foodName)
            foods.forEach(({ foodName }) =>
                expect(collectedFoodsNames).to.contain(foodName),
            )

            expect(collectedFoods.length).to.be.equal(foods.length)
        })

        it('should return both matched and other values correctly', () => {
            const collectedFoods = foods.singleCollect<FoodWithPrice>(
                ({ category }) => category === FoodCategory.FRUITS,
                food => ({ ...food, price: fruitPrice }),
                food => ({ ...food, price: defaultPrice }),
            )

            collectedFoods.forEach(({ category, price }) => {
                if (category === FoodCategory.FRUITS)
                    expect(price).to.be.equal(fruitPrice)
                else expect(price).to.be.equal(defaultPrice)
            })
        })
    })

    describe('When a type guard assertation function is used in predicate', () => {
        it('should allow to use object typed in mappers functions', () => {
            const foodsWithAndWithoutPrices = foods.singleCollect<Food>(
                ({ category }) => category === FoodCategory.FRUITS,
                food => ({ ...food, price: fruitPrice }),
                food => food,
            )

            const isFoodWithPrice = (food: Food): food is FoodWithPrice =>
                (food as FoodWithPrice).price !== undefined

            const prices = foodsWithAndWithoutPrices.singleCollect<
                number,
                FoodWithPrice
            >(isFoodWithPrice, food => food.price)

            prices.forEach(price => expect(price).to.be.a('number'))
        })
    })
})

describe('Tests for Array.collect', () => {
    describe('when operating with multi levels arrays', () => {
        it('should not flat items of the original array or resulting from a specified mapper', () => {
            const input: string[][] = [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
            ]
            const result = input.collect([
                [([first]) => first === 'a', item => item],
            ])
            expect(result).to.be.deep.equal([['a', 'b', 'c']])
        })
    })

    describe('When otherwiseMapper is not specified', () => {
        it('should return an Array', () => {
            const collectedFoods = foods.collect<FoodWithPrice>([
                [
                    ({ category }) => category === FoodCategory.FRUITS,
                    food => ({ ...food, price: fruitPrice }),
                ],
                [
                    ({ category }) => category === FoodCategory.VEGETABLES,
                    food => ({ ...food, price: vegetablePrice }),
                ],
            ])

            expect(collectedFoods).to.be.instanceOf(Array)
        })

        it('should return the correct values', () => {
            const collectedFoods = foods.collect<FoodWithPrice>([
                [
                    ({ category }) => category === FoodCategory.FRUITS,
                    food => ({ ...food, price: fruitPrice }),
                ],
                [
                    ({ category }) => category === FoodCategory.VEGETABLES,
                    food => ({ ...food, price: vegetablePrice }),
                ],
            ])

            const collectedFoodsNames = collectedFoods.map(x => x.foodName)

            fruits.forEach(({ foodName }) =>
                expect(collectedFoodsNames).to.contain(foodName),
            )

            vegetables.forEach(({ foodName }) =>
                expect(collectedFoodsNames).to.contain(foodName),
            )
        })

        it('should not add accept values that does not satisfy the specified filter', () => {
            const collectedFoods = foods.collect<FoodWithPrice>([
                [
                    ({ category }) => category === FoodCategory.FRUITS,
                    food => ({ ...food, price: fruitPrice }),
                ],
            ])

            vegetables.forEach(vegetable =>
                expect(collectedFoods).not.to.contain(vegetable),
            )
        })
    })

    describe('When otherwiseMapper is specified', () => {
        it('should return an Array', () => {
            const collectedFoods = foods.collect<FoodWithPrice>(
                [
                    [
                        ({ category }) => category === FoodCategory.FRUITS,
                        food => ({ ...food, price: fruitPrice }),
                    ],
                    [
                        ({ category }) => category === FoodCategory.VEGETABLES,
                        food => ({ ...food, price: vegetablePrice }),
                    ],
                ],
                food => ({ ...food, price: defaultPrice }),
            )

            expect(collectedFoods).to.be.instanceOf(Array)
        })

        it('should return all the values of the previus array', () => {
            const collectedFoods = foods.collect<FoodWithPrice>(
                [
                    [
                        ({ category }) => category === FoodCategory.FRUITS,
                        food => ({ ...food, price: fruitPrice }),
                    ],
                    [
                        ({ category }) => category === FoodCategory.VEGETABLES,
                        food => ({ ...food, price: vegetablePrice }),
                    ],
                ],
                food => ({ ...food, price: defaultPrice }),
            )

            const collectedFoodsNames = collectedFoods.map(x => x.foodName)
            foods.forEach(({ foodName }) =>
                expect(collectedFoodsNames).to.contain(foodName),
            )
            expect(collectedFoods.length).to.be.equal(foods.length)
        })

        it('should return both matched and other values correctly', () => {
            const collectedFoods = foods.collect<FoodWithPrice>(
                [
                    [
                        ({ category }) => category === FoodCategory.FRUITS,
                        food => ({ ...food, price: fruitPrice }),
                    ],
                    [
                        ({ category }) => category === FoodCategory.VEGETABLES,
                        food => ({ ...food, price: vegetablePrice }),
                    ],
                ],
                food => ({ ...food, price: defaultPrice }),
            )

            collectedFoods.forEach(({ category, price }) => {
                if (category === FoodCategory.FRUITS)
                    expect(price).to.be.equal(fruitPrice)
                else if (category === FoodCategory.VEGETABLES)
                    expect(price).to.be.equal(vegetablePrice)
                else expect(price).to.be.equal(defaultPrice)
            })
        })
    })

    describe('When a type guard assertation function is used in cases predicate', () => {
        it('should allow to use object typed in mappers functions', () => {
            const mixed = [1, 'a', undefined]

            const allStrings = mixed.collect(
                [
                    match(
                        (x): x is undefined => typeof x === 'undefined',
                        () => 'undefined',
                    ),
                    match(
                        (x): x is number => typeof x === 'number',
                        x => x.toString(),
                    ),
                    match(
                        (x): x is string => typeof x === 'string',
                        x => x,
                    ),
                    [() => true, () => 'error'],
                ],
                () => 'error',
            )

            allStrings.forEach(value => expect(value).to.be.a('string'))
        })
    })
})

// import '../../src/arrays/arrays'
// import {FoodCategory, foods, fruits} from './utils'

// describe('Tests for Array.groupBy', () => {

//     test('should return a Map', () => {
//         const foodsByCategory = foods.groupBy(
//             ({category}) => category,
//             ({foodName}) => [foodName],
//             (a,b) => a.concat(b)
//         )

//         expect(foodsByCategory).toBeInstanceOf(Map)
//     })

//     test('should return the results with the correct keys', () => {

//         const foodsByCategory = foods.groupBy(
//             ({category}) => category,
//             ({foodName}) => [foodName],
//             (a,b) => a.concat(b)
//         )

//         expect(foodsByCategory.has(FoodCategory.FRUITS)).toBe(true)
//         expect(foodsByCategory.has(FoodCategory.VEGETABLES)).toBe(true)
//     })

//     test('should return the results with the correct values', () => {

//         const foodsByCategory = foods.groupBy(
//             ({category}) => category,
//             ({foodName}) => [foodName],
//             (a,b) => a.concat(b)
//         )

//         const groupedFruits = foodsByCategory.get(FoodCategory.FRUITS)
//         expect(groupedFruits).not.toBeNull()
//         expect(groupedFruits).not.toBeUndefined()
//         expect(groupedFruits).toBeInstanceOf(Array)
//         fruits.forEach(({foodName}) => expect(groupedFruits).toContain(foodName))
    
//     })

//     test('should not add additional keys', () => {

//         const foodsByCategory = fruits.groupBy(
//             ({category}) => category,
//             ({foodName}) => [foodName],
//             (a,b) => a.concat(b)
//         )

//         expect(foodsByCategory.has(FoodCategory.VEGETABLES)).toBe(false)
    
//     })

// })
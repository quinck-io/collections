export enum FoodCategory {
    FRUITS = 'FRUITS',
    VEGETABLES = 'VEGETABLES',
}

export type FoodName = string

export type Food = {
    category: FoodCategory
    foodName: FoodName
}

export const fruits: Food[] = ['APPLE', 'PEAR', 'ORANGE'].map(foodName => ({
    category: FoodCategory.FRUITS,
    foodName,
}))

export const vegetables: Food[] = ['POTATOE', 'CARROT'].map(foodName => ({
    category: FoodCategory.VEGETABLES,
    foodName,
}))

export const foods = fruits.concat(vegetables)

export type FoodPrice = number
export type FoodWithPrice = Food & {
    price: FoodPrice
}
export const fruitPrice: FoodPrice = 10
export const vegetablePrice: FoodPrice = 8
export const defaultPrice: FoodPrice = 5

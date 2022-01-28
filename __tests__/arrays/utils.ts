export enum FoodCategory {
    FRUITS = 'FRUITS',
    VEGETABLES = 'VEGETABLES'
}

export type FoodName = string

export type Food = {
    category: FoodCategory
    foodName: FoodName
}

export const fruits: Food[] = ['APPLE','PEAR','ORANGE']
    .map(foodName => ({category: FoodCategory.FRUITS, foodName}))

export const vegetables: Food[] = ['POTATOE','CARROT']
    .map(foodName => ({category: FoodCategory.VEGETABLES, foodName}))

export const foods = fruits.concat(vegetables)
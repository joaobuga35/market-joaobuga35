interface IProduct {
    id?: number,
    name: string,
    price: number,
    weight: number,
    section: "food" | "cleaning",
    expirationDate?: Date
}

interface ICleaningProducts extends IProduct {}

interface IFoodProduct extends IProduct {
    calories: number
}

export {
    IProduct,
    ICleaningProducts,
    IFoodProduct
}
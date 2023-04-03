import { Request, Response } from "express";
import { databaseID, market } from "./database";
import { IFoodProduct, IProduct } from "./interfaces";

const createProducts = (req: Request, res: Response):Response => {
    const body = req.body 
    let idProduct = databaseID.length + 1
    let newObjects: Array<IProduct | IFoodProduct> = []
    let responseObject = {}
    let accumulator = 0
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setFullYear(currentDate.getFullYear() + 1);

    body.forEach((element: IProduct) => {
  
        newObjects.push({
            id: idProduct,
            ...element,
            expirationDate: expirationDate
        })

        databaseID.push(idProduct)
        accumulator = element.price + accumulator
        idProduct++;
    })
    market.push(...newObjects)

    responseObject = {
        total: accumulator,
        marketProducts: newObjects
    }

    return res.status(201).json(responseObject)
}

const readAllProducts = (req: Request, res: Response):Response => {
    let accumulator: number = 0
    const sum = market.map((elem: IProduct, index: number) => {
        accumulator = elem.price + accumulator
        return accumulator
    })
    const responseObject = {
        total: Math.max(...sum),
        marketProducts: market
    }
    return res.status(200).json(responseObject)
}

const readProductWithID = (req: Request, res: Response):Response => {
    const id: number = Number(req.params.id)

    const product = market.filter((prod) => prod.id === id)

    return res.status(200).json(...product)
}

const editProduct = (req: Request, res: Response):Response => {
    const body = req.body
    const id: number = Number(req.params.id)

    const productIndex = market.findIndex((elem) => elem.id === id)
    const productAlreadyExists = market.find((elem) => elem.name === body.name)

    if (productAlreadyExists) {
        return res.status(409).json({
            error: "Product already registered"
        })
    }  

    if (market[productIndex].section === "food") {
        market[productIndex] = {
            ...market[productIndex],
            name: body.name ? body.name : market[productIndex].name,
            price: body.price ? body.price : market[productIndex].price,
            calories: body.calories,
            weight: body.weight ? body.weight : market[productIndex].weight,

        }
    }

    market[productIndex] = {
        ...market[productIndex],
        name: body.name ? body.name : market[productIndex].name,
        price: body.price ? body.price : market[productIndex].price,
        weight: body.weight ? body.weight : market[productIndex].weight
    }

    return res.status(200).json(market[productIndex])
}

const deleteProduct = (req: Request, res: Response):Response => {
    const id: number = Number(req.params.id)

    const productIndex = market.findIndex((elem) => elem.id === id)

    if (productIndex === -1) {
        return res.status(404).json({
            error: "Product not found"
        })
    }

    market.splice(productIndex, 1)
    return res.status(204).json()
}


export {
    createProducts,
    readAllProducts,
    readProductWithID,
    editProduct,
    deleteProduct
}
import { Request, Response } from "express";
import { databaseID, market } from "./database";
import { IProduct } from "./interfaces";

const createProducts = (req: Request, res: Response):Response => {
    const body = req.body 
    let idProduct = databaseID.length + 1
    let newObjects: Array<IProduct> = []
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


export {
    createProducts,
    readAllProducts
}
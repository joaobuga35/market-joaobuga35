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



export {
    createProducts
}
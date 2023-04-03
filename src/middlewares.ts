import { NextFunction, Request, Response, response } from "express"
import { market,databaseID } from "./database"
import { IProduct } from "./interfaces"

const ensureVerifyNameProduct = (req: Request, res: Response, next:NextFunction): Response | void => {
    const body = req.body
    const names = market.map((elem: IProduct) => elem.name)

    body.forEach((elem: IProduct, index: number) => {
        if(names.includes(elem.name)){
            return res.status(409).json({
                error: "Product already registered"
            })
        }
    })

    return next()
}

const ensureIDExists = (req: Request, res: Response, next:NextFunction): Response | void => {
    const id: number = Number(req.params.id)

    const realID = databaseID.find((elem) => elem === id)

    if (!realID) {
        return res.status(404).json({
            error: "Product not found"
        })
    }

    return next()
}

export {
    ensureVerifyNameProduct,
    ensureIDExists
}
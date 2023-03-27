import { NextFunction, Request, Response } from "express"
import { market } from "./database"
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

export {
    ensureVerifyNameProduct
}
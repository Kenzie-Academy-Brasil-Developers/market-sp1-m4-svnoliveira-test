import { NextFunction, Response, Request } from "express";
import { Product } from "./interfaces";
import { market } from "./database";

export const isProductNameDuplicated = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    const product: Product | undefined = market.find(
        (storedProduct) => {
            if (storedProduct.name.toLowerCase() === String(req.body.name).toLowerCase()) {
                return storedProduct;
            }
        }
    );

    if (product) {
        return res.status(409).json({
            "message": "Product already registered."
        });
    } else {
        return next();
    };
};

export const verifyProductExists = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    const product: Product | undefined = market.find(
        (storedProduct, i) => {
            if (storedProduct.id === Number(req.params.id)){
                res.locals.index = i;
                res.locals.product = storedProduct;
                return storedProduct;
            }
        }
    );

    if (!product) {
        return res.status(404).json({
            "message": "Product not found."
        });
    } else {
        return next();
    };
};
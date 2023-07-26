import { Request, Response } from "express";
import { market } from "./database";
import { Product, ProductsData } from "./interfaces";

export const create = (req: Request, res: Response): Response => {

    const lastId = market.reduce( (prev, current ) => {
        if(current.id > prev){
            return current.id
        } else {
            return prev
        }
    },0 );

    const date = new Date();
    const expirationDate = date.setDate(date.getDate() + 365);

    const newProduct:Product = {
        id: lastId + 1,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        section: req.body.section,
        calories: req.body.calories,
        expirationDate: new Date(expirationDate)
    };

    market.push(newProduct);

    return res.status(201).json(newProduct);
};

export const read = (req: Request, res: Response): Response => {
    const data: ProductsData = {
        total: market.reduce((prev, current) => prev + current.price, 0),
        products: market
    };

    return res.status(200).json(data);
};

export const readById = (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.product);
};

export const update = (req: Request, res: Response): Response => {
    const oldProduct: Product = res.locals.product;
    const targetIndex: number = res.locals.index;

    const newProduct: Product = {
        ...oldProduct,
        ...req.body
    };

    market.splice(targetIndex, 1, newProduct);

    return res.status(200).json(newProduct);
};

export const destroy = (req: Request, res: Response): Response => {
    const targetIndex: number = res.locals.index;

    market.splice(targetIndex, 1);

    return res.status(204).send();
};
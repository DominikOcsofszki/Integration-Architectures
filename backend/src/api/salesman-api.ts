import {Request, Response} from "express";
import {createSalesmanService} from "../service/salesman-service";

export function createSalesman(req: Request, res: Response){
    const salesman = req.body;
    const db = req.app.get('db');
    createSalesmanService(db, salesman)
        .then(() => res.status(200).send('salesman created'))
        .catch(() => res.status(400).send('error on creation of salesman'))
}
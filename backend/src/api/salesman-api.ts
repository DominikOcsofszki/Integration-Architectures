import {Request, Response} from "express";
import {createSalesmanService, readSalesmanService, updateSalesmanService, deleteSalesmanService} from "../service/salesman-service";
import {Salesman} from "../model/Salesman";


export async function createSalesman(req: Request, res: Response){
    const db = req.app.get('db'); // line is duplicated in every method -> better strategy?
    const salesman = req.body;
    if (checkSalesmanData(salesman)){
        await createSalesmanService(db, salesman)
            .then(() => res.status(200).send('Salesman created'))
            .catch((reason) => res.status(400).send('Error on creation of salesman; reason: ' + reason))
    } else {
        res.status(400).send("Insufficient salesman data (id, firstname, lastname, department)")
    }
}

function checkSalesmanData(salesman: Salesman): boolean{
    return !(salesman.id === undefined || salesman.firstname === undefined
        || salesman.lastname === undefined || salesman.department === undefined);
}

// Todo: move error handling to salesman-service?
export async function readSalesman(req: Request, res: Response){
    const db = req.app.get('db');
    const salesmanId = parseInt(req.params.id);
    if (isNaN(salesmanId)){
        res.status(400).send("Id has to be a number")
    } else {
        await readSalesmanService(db, salesmanId)
            .then((value) =>
            {
                if (value === null){
                    res.status(400).send("No salesman with this id")
                } else {
                    res.status(200).send(value)
                }
            })
            .catch((reason) => res.status(400).send('Error on reading of salesman; reason: ' + reason))
    }
}

// Todo: similar code to readSalesman -> outsource to function?
export async function updateSalesman(req: Request, res: Response) {
    const db = req.app.get('db');
    const updatedSalesman = req.body;
    await updateSalesmanService(db, updatedSalesman)
        .then((value) =>
        {
            if (value.matchedCount == 0){
                res.status(400).send("No salesman with this id")
            } else {
                res.status(200).send(value)
            }
        })
        .catch((reason) => res.status(400).send('Error on updating of salesman; reason: ' + reason))
}

export async function deleteSalesman(req: Request, res: Response) {
    const db = req.app.get('db');
    const salesmanId = parseInt(req.params.id);
    if (isNaN(salesmanId)) {
        res.status(400).send("Id has to be a number")
    } else {
        await deleteSalesmanService(db, salesmanId)
            .then(value =>
            {
                if (value.deletedCount == 0){
                    res.status(400).send("No salesman with this id")
                } else {
                    res.status(200).send(value)
                }
            })
            .catch((reason) => res.status(400).send('Error on deleting of salesman; reason: ' + reason))
    }
}
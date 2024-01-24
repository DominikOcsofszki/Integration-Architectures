import { Request, Response } from "express";
import { Salesman, SalesmanModel } from "../../model/Salesman";
import { UserModel } from "../../model/User";
import { hashPassword } from "../../service/user-service";

export async function createSalesman(req: Request, res: Response) {
    await new SalesmanModel(req.body)
        .save()
        .then(() => res.status(200).send("Salesman created"))
        .catch((reason:any) => res.status(400).send(reason));
}

export async function readSalesman(req: Request, res: Response) {
    await SalesmanModel.findOne({ id: req.params.id })
        .then((value:any) => {
            if (value === null) {
                res.status(404).send({
                    message: `No salesman with the id ${req.params.id} found`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason:any) => res.status(400).send(reason));
}

export async function updateSalesman(req: Request, res: Response) {
    await SalesmanModel.findOneAndUpdate({ id: req.params.id }, req.body)
        .then((value:any) => {
            if (value === null) {
                res.status(400).send({
                    message: `No Salesman with the id: ${req.params.id}`,
                });
            } else {
                res.status(200).send(value);
            }
        }) //sends the old value
        .catch((reason:any) => res.status(400).send(reason));
}

export async function deleteSalesman(req: Request, res: Response) {
    await SalesmanModel.findOneAndDelete({ id: req.params.id })
        .then((value:any) => {
            if (value === null) {
                res.status(400).send({
                    message: `No Salesman with the id: ${req.params.id}`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason:any) => res.status(400).send(reason));
}

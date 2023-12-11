import { BonusComputationSheetModel } from "../../model/BonusComputationSheet";
import { Request, Response } from "express";

export async function readSheetStatus(req: Request, res: Response) {
    await BonusComputationSheetModel.find({}).
    then((value) => {
        res.status(200).send(value.map(element => ({salesmanId: element.salesmanId,yearOfEvaluation: element.yearOfEvaluation,status: element.status})));
    }).catch((reason) => res.status(400).send(reason));
}

export async function readPendingSheets(req: Request, res: Response) {
    await BonusComputationSheetModel.find({status: "pending-hr"}).
    then((value) => {
        res.status(200).send(value);
    }).catch((reason) => res.status(400).send(reason));
}

export async function signSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOneAndUpdate(
        {salesmanId: req.params.salesmanId, yearOfEvaluation: req.params.yearOfEvaluation, status: "pending-hr"},
        {status: "pending-ceo"}).then(
            (value) => {
                if(value === null) {
                    res.status(400).send({message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-hr`})
                } else {
                    res.status(200).send(value);
                }
            }
        ).catch((reason) => res.status(400).send(reason));
}

export async function readSalesman(req: Request, res: Response) {
    await BonusComputationSheetModel.find(
        {salesmanId: req.params.salesmanId, yearOfEvaluation: req.params.yearOfEvaluation})
        .then((value) => {
            res.status(200).send(value);
        }).catch((reason) => res.status(400).send(reason));
}
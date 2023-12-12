import { BonusComputationSheet, BonusComputationSheetModel } from "../../model/BonusComputationSheet";
import { Request, Response } from "express";

export async function createBonusComputationSheet(req: Request, res: Response) {
    await new BonusComputationSheetModel(req.body).save()
        .then(() => res.status(200).send('BonusComputationSheet created'))
        .catch((reason) => res.status(400).send(reason));
}

export async function readBonusComputationSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOne({salesmanId: req.params.salesmanId, 
        yearOfEvaluation: req.params.yearOfEvaluation})
        .then((value) => res.status(200).send(value))
        .catch((reason) => res.status(400).send(reason));
}

export async function updateBonusComputationSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOneAndUpdate({salesmanId: req.params.salesmanId, 
        yearOfEvaluation: req.params.yearOfEvaluation}, req.body)
        .then((value) =>
        {   
            if(value === null) {
                res.status(400).send({message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation}`})
            }else {
                res.status(200).send(value);
            }
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function deleteBonusComputationSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOneAndDelete({salesmanId: req.params.salesmanId, 
        yearOfEvaluation: req.params.yearOfEvaluation})
        .then(value =>
        {
            if (value  === null){
                res.status(400).send({message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation}`})
            } else {
                res.status(200).send(value)
            }
        })
        .catch((reason) => res.status(400).send(reason))
}
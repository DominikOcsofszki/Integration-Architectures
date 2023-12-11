import { Response, Request } from "express";
import { BonusComputationSheetModel } from "../../model/BonusComputationSheet";
import { Session } from "../../service/auth-service";

export async function readSheet(req: Request, res: Response) {
    let s = req.session as Session;
    await BonusComputationSheetModel.findOne({salesmanId: s.user?.salesmanId, 
        yearOfEvaluation: req.params.yearOfEvaluation, status: "pending-salesman"})
        .then((value) => res.status(200).send(value))
        .catch((reason) => res.status(400).send(reason));
}

export async function signSheet(req: Request, res: Response) {
    let s = req.session as Session;
    await BonusComputationSheetModel.findOneAndUpdate(
        {salesmanId: s.user?.salesmanId, yearOfEvaluation: req.params.yearOfEvaluation, status: "pending-salesman"},
        {status: "finished"}).then(
            (value) => {
                if(value === null) {
                    res.status(400).send({message: `There exists no BonusComputationSheet for this salesmanId: ${s.user?.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-salesman`})
                } else {
                    res.status(200).send(value);
                }
            }
        ).catch((reason) => res.status(400).send(reason));
}
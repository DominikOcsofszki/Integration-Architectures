import { BonusComputationSheetModel } from "../../model/BonusComputationSheet";
import { Request, Response } from "express";
import { Salesman, SalesmanModel } from "../../model/Salesman";

export async function readSheetStatus(req: Request, res: Response) {
    await BonusComputationSheetModel.find({})
        .then((value) => {
            res.status(200).send(
                value.map((element) => ({
                    salesmanId: element.salesmanId,
                    yearOfEvaluation: element.yearOfEvaluation,
                    status: element.status,
                }))
            );
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function readPendingSheets(req: Request, res: Response) {
    await BonusComputationSheetModel.find({ status: "pending-hr" })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function readNotPendingSheets(req: Request, res: Response) {
    await BonusComputationSheetModel.find({ $or: [{ status: "incomplete" }, { status: "pending-ceo" }, { status: "pending-salesman" }, { status: "finished" }] })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function signSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOneAndUpdate(
        {
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
            status: "pending-hr",
        },
        { status: "pending-ceo" }
    )
        .then((value) => {
            if (value === null) {
                res.status(400).send({
                    message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-hr`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function getSheetByIdAndYear(req: Request, res: Response) {
    await BonusComputationSheetModel.find({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
    })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function getSheetsById(req: Request, res: Response) {
    await BonusComputationSheetModel.find({ salesmanId: req.params.salesmanId })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function getSheetsByYear(req: Request, res: Response) {
    await BonusComputationSheetModel.find({
        yearOfEvaluation: req.params.yearOfEvaluation,
    })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function getAllSheets(req: Request, res: Response) {
    await BonusComputationSheetModel.find({})
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function readPendingValues(req: Request, res: Response) {
    try {
        const pendingSheets = await BonusComputationSheetModel.find({ status: "pending-hr" }).exec();
        const salesmanList: { [id: number]: Salesman } = {};
        const outputList: { salesmanId: number, firstname: string, lastname: string, year: number, status: string, bonus: number }[] = [];
        for (let sheet of pendingSheets) {
            const currentSalesman = await SalesmanModel.find({ id: sheet.salesmanId }).exec() as unknown as Salesman;
            outputList.push({ salesmanId: currentSalesman.id, firstname: currentSalesman.firstname, lastname: currentSalesman.lastname, year: sheet.yearOfEvaluation, status: sheet.status, bonus: sheet.totalBonus })
        }
        res.status(200).send(outputList);
    } catch (reason) {
        res.status(400).send(reason)
    }
}

export async function readNotPendingValues(req: Request, res: Response) {
    try {
        const pendingSheets = await BonusComputationSheetModel.find({ status: $not: { "pending-hr" } });
    const salesmanList: { [id: number]: Salesman } = {};
    const outputList: { salesmanId: number, firstname: string, lastname: string, year: number, status: string, bonus: number }[] = [];
    for (let sheet of pendingSheets) {
        const currentSalesman = await SalesmanModel.find({ id: sheet.salesmanId }).exec() as unknown as Salesman;
        outputList.push({ salesmanId: currentSalesman.id, firstname: currentSalesman.firstname, lastname: currentSalesman.lastname, year: sheet.yearOfEvaluation, status: sheet.status, bonus: sheet.totalBonus })
    }
    res.status(200).send(outputList);
} catch (reason) {
    res.status(400).send(reason)
}
}
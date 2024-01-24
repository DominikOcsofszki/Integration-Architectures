import { Response, Request } from "express";
import { BonusComputationSheetModel } from "../../model/BonusComputationSheet";
import { Session } from "../../service/auth-service";
import { Salesman, SalesmanModel } from "../../model/Salesman";

export async function readSheet(req: Request, res: Response) {
    let s = req.session as Session;
    await BonusComputationSheetModel.findOne({
        salesmanId: s.user?.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
        status: "pending-salesman",
    })
        .then((value) => res.status(200).send(value))
        .catch((reason) => res.status(400).send(reason));
}

export async function signSheet(req: Request, res: Response) {
    let s = req.session as Session;
    await BonusComputationSheetModel.findOneAndUpdate(
        {
            salesmanId: s.user?.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
            status: "pending-salesman",
        },
        { status: "finished" }
    )
        .then((value) => {
            if (value === null) {
                res.status(400).send({
                    message: `There exists no BonusComputationSheet for this salesmanId: ${s.user?.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-salesman`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function signSheetUntilFix(req: Request, res: Response) {//TODO fix cookies then change to other on top
    await BonusComputationSheetModel.findOneAndUpdate(
        {
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
            status: "pending-salesman",
        },
        { status: "finished" }
    )
        .then((value) => {
            if (value === null) {
                res.status(400).send({
                    message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-salesman`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason) => res.status(400).send(reason));
}

export async function readPendingValues(req: Request, res: Response) {
    try {
        const pendingSheets = await BonusComputationSheetModel.find({
            status: "pending-salesman",
            salesmanId: req.params.salesmanId,

        });
        const outputList: {
            salesmanId: number;
            firstname: string;
            lastname: string;
            year: number;
            status: string;
            bonus: number;
        }[] = [];
        for (let sheet of pendingSheets) {
            const currentSalesman = (await SalesmanModel.findOne({
                id: sheet.salesmanId,
            })) as unknown as Salesman;
            outputList.push({
                salesmanId: currentSalesman.id,
                firstname: currentSalesman.firstname,
                lastname: currentSalesman.lastname,
                year: sheet.yearOfEvaluation,
                status: sheet.status,
                bonus: sheet.totalBonus,
            });
        }
        res.status(200).send(outputList);
    } catch (reason) {
        res.status(400).send(reason);
    }
}

export async function readNotPendingValues(req: Request, res: Response) {
    console.log("inside")
    try {
        const notPendingSheets = await BonusComputationSheetModel.find({
                        salesmanId: req.params.salesmanId,
        })
            .where("status")
            .ne("pending-salesman");
        const outputList: {
            salesmanId: number;
            firstname: string;
            lastname: string;
            year: number;
            status: string;
            bonus: number;
        }[] = [];
        for (let sheet of notPendingSheets) {
            const currentSalesman = (await SalesmanModel.findOne({
                id: sheet.salesmanId,
            })) as unknown as Salesman;
            outputList.push({
                salesmanId: currentSalesman.id,
                firstname: currentSalesman.firstname,
                lastname: currentSalesman.lastname,
                year: sheet.yearOfEvaluation,
                status: sheet.status,
                bonus: sheet.totalBonus,
            });
        }
        res.status(200).send(outputList);
    } catch (reason) {
        res.status(400).send(reason);
    }
}

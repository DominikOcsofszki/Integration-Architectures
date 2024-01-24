import { Request, Response } from "express";
import {
    BonusComputationSheetModel,
    Comment,
} from "../../model/BonusComputationSheet";
import { UpdateWriteOpResult } from "mongoose";
import {Salesman, SalesmanModel} from "../../model/Salesman";

export async function readPendingSheets(req: Request, res: Response) {
    await BonusComputationSheetModel.find({ status: "pending-ceo" })
        .then((value:any) => {
            res.status(200).send(value);
        })
        .catch((reason:any) => res.status(400).send(reason));
}

export async function readPendingValues(req: Request, res: Response) {
    try {
        const pendingSheets = await BonusComputationSheetModel.find({
            status: "pending-ceo",
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
    } catch (reason:any) {
        res.status(400).send(reason);
    }
}

export async function readNotPendingValues(req: Request, res: Response) {
    try {
        const notPendingSheets = await BonusComputationSheetModel.find()
            .where("status")
            .ne("pending-ceo");
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
    } catch (reason:any) {
        res.status(400).send(reason);
    }
}

export async function addComments(req: Request, res: Response) {
    const allComments: [Comment] = req.body.comments;
    const allResponses: UpdateWriteOpResult[] = [];
    for (const comment of allComments) {
        if (comment.type == "Order") {
            await BonusComputationSheetModel.updateOne(
                {
                    salesmanId: req.params.salesmanId,
                    yearOfEvaluation: req.params.yearOfEvaluation,
                    "orderEvaluation.orders._id": comment._id,
                    status: "pending-ceo",
                },
                {
                    $set: {
                        "orderEvaluation.orders.$.comment": comment.text,
                    },
                }
            )
                .then((value:any) => allResponses.push(value))
                .catch((reason:any) => allResponses.push(reason));
        } else if (comment.type == "SocialAttribute") {
            await BonusComputationSheetModel.updateOne(
                {
                    salesmanId: req.params.salesmanId,
                    yearOfEvaluation: req.params.yearOfEvaluation,
                    "socialPerformanceEvaluation.socialAttributes._id":
                        comment._id,
                    status: "pending-ceo",
                },
                {
                    $set: {
                        "socialPerformanceEvaluation.socialAttributes.$.comment":
                            comment.text,
                    },
                }
            )
                .then((value:any) => allResponses.push(value))
                .catch((reason:any) => allResponses.push(reason));
        } else {
            await BonusComputationSheetModel.updateOne(
                {
                    salesmanId: req.params.salesmanId,
                    yearOfEvaluation: req.params.yearOfEvaluation,
                    status: "pending-ceo",
                },
                { comment: comment.text }
            )
                .then((value:any) => allResponses.push(value))
                .catch((reason:any) => allResponses.push(reason));
        }
    }
    res.status(200).send(allResponses);
}

export async function signSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOneAndUpdate(
        {
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
            status: "pending-ceo",
        },
        { status: "pending-salesman" }
    )
        .then((value:any) => {
            if (value === null) {
                res.status(400).send({
                    message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-ceo`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason:any) => res.status(400).send(reason));
}

export async function getSheetByIdAndYear(req: Request, res: Response) {
    try {
        const sheet = await BonusComputationSheetModel.findOne({
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
        });
        const salesman = await SalesmanModel.findOne({id: req.params.salesmanId});
        if (sheet !== null && salesman !== null){
            const sheetWithSalesman = {
                salesman: salesman,
                yearOfEvaluation: sheet.yearOfEvaluation,
                totalBonus: sheet.totalBonus,
                status: sheet.status,
                socialPerformanceEvaluation: sheet.socialPerformanceEvaluation,
                orderEvaluation: sheet.orderEvaluation,
                comment: sheet.comment
            };
            res.status(200).send(sheetWithSalesman);
        }
    } catch (reason:any){
        res.status(400).send(reason);
    }
}


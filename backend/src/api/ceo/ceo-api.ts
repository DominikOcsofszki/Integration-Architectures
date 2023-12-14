import { Request, Response } from "express";
import {
    BonusComputationSheetModel,
    Comment,
} from "../../model/BonusComputationSheet";
import { UpdateWriteOpResult } from "mongoose";

export async function readPendingSheets(req: Request, res: Response) {
    await BonusComputationSheetModel.find({ status: "pending-ceo" })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((reason) => res.status(400).send(reason));
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
                .then((value) => allResponses.push(value))
                .catch((reason) => allResponses.push(reason));
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
                .then((value) => allResponses.push(value))
                .catch((reason) => allResponses.push(reason));
        } else {
            await BonusComputationSheetModel.updateOne(
                {
                    salesmanId: req.params.salesmanId,
                    yearOfEvaluation: req.params.yearOfEvaluation,
                    status: "pending-ceo",
                },
                { comment: comment.text }
            )
                .then((value) => allResponses.push(value))
                .catch((reason) => allResponses.push(reason));
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
        .then((value) => {
            if (value === null) {
                res.status(400).send({
                    message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-ceo`,
                });
            } else {
                res.status(200).send(value);
            }
        })
        .catch((reason) => res.status(400).send(reason));
}

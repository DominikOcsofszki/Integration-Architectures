import { Request, Response } from "express";
import {
    BonusComputationSheet,
    BonusComputationSheetModel,
} from "../../model/BonusComputationSheet";
import { Salesman, SalesmanModel } from "../../model/Salesman";

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
    } catch (reason: any) {
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
    } catch (reason: any) {
        res.status(400).send(reason);
    }
}

export async function updateSheet(req: Request, res: Response) {
    const updated: any = req.body.sheet;
    updated.salesmanId = updated.salesman.id;
    const updatedSheet: BonusComputationSheet = updated;
    await BonusComputationSheetModel.findOneAndUpdate(
        {
            salesmanId: updatedSheet.salesmanId,
            yearOfEvaluation: updatedSheet.yearOfEvaluation,
        },
        updatedSheet
    )
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((error) => {
            res.status(400).send({ message: error });
        });
}

import { kafkaErasmuxTopic, kafkaProducer } from "../../kafka/kafka-setup";
const sendMsgToKafka = async (msg: string) => {
    // Producing
    await kafkaProducer.connect();
    await kafkaProducer.send({
        topic: kafkaErasmuxTopic,
        messages: [{ value: msg }],
    });
};

export async function signSheet(req: Request, res: Response) {
    await BonusComputationSheetModel.findOneAndUpdate(
        {
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
            status: "pending-ceo",
        },
        { status: "pending-salesman" }
    )
        .then((value: any) => {
            if (value === null) {
                res.status(400).send({
                    message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-ceo`,
                });
            } else {
                res.status(200).send(value);
                sendMsgToKafka(
                    `${new Date().toDateString()}: Ceo approved ${
                        req.params.salesmanId
                    } for the year ${req.params.yearOfEvaluation}`
                );
            }
        })
        .catch((reason: any) => res.status(400).send(reason));
}

export async function getSheetByIdAndYear(req: Request, res: Response) {
    try {
        const sheet = await BonusComputationSheetModel.findOne({
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
        });
        const salesman = await SalesmanModel.findOne({
            id: req.params.salesmanId,
        });
        if (sheet !== null && salesman !== null) {
            const sheetWithSalesman = {
                salesman: salesman,
                yearOfEvaluation: sheet.yearOfEvaluation,
                totalBonus: sheet.totalBonus,
                status: sheet.status,
                socialPerformanceEvaluation: sheet.socialPerformanceEvaluation,
                orderEvaluation: sheet.orderEvaluation,
                comment: sheet.comment,
            };
            res.status(200).send(sheetWithSalesman);
        }
    } catch (reason: any) {
        res.status(400).send(reason);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSheetByIdAndYear = exports.signSheet = exports.addComments = exports.readNotPendingValues = exports.readPendingValues = exports.readPendingSheets = void 0;
const BonusComputationSheet_1 = require("../../model/BonusComputationSheet");
const Salesman_1 = require("../../model/Salesman");
async function readPendingSheets(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({ status: "pending-ceo" })
        .then((value) => {
        res.status(200).send(value);
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.readPendingSheets = readPendingSheets;
async function readPendingValues(req, res) {
    try {
        const pendingSheets = await BonusComputationSheet_1.BonusComputationSheetModel.find({
            status: "pending-ceo",
        });
        const outputList = [];
        for (let sheet of pendingSheets) {
            const currentSalesman = (await Salesman_1.SalesmanModel.findOne({
                id: sheet.salesmanId,
            }));
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
    }
    catch (reason) {
        res.status(400).send(reason);
    }
}
exports.readPendingValues = readPendingValues;
async function readNotPendingValues(req, res) {
    try {
        const notPendingSheets = await BonusComputationSheet_1.BonusComputationSheetModel.find()
            .where("status")
            .ne("pending-ceo");
        const outputList = [];
        for (let sheet of notPendingSheets) {
            const currentSalesman = (await Salesman_1.SalesmanModel.findOne({
                id: sheet.salesmanId,
            }));
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
    }
    catch (reason) {
        res.status(400).send(reason);
    }
}
exports.readNotPendingValues = readNotPendingValues;
async function addComments(req, res) {
    const allComments = req.body.comments;
    const allResponses = [];
    for (const comment of allComments) {
        if (comment.type == "Order") {
            await BonusComputationSheet_1.BonusComputationSheetModel.updateOne({
                salesmanId: req.params.salesmanId,
                yearOfEvaluation: req.params.yearOfEvaluation,
                "orderEvaluation.orders._id": comment._id,
                status: "pending-ceo",
            }, {
                $set: {
                    "orderEvaluation.orders.$.comment": comment.text,
                },
            })
                .then((value) => allResponses.push(value))
                .catch((reason) => allResponses.push(reason));
        }
        else if (comment.type == "SocialAttribute") {
            await BonusComputationSheet_1.BonusComputationSheetModel.updateOne({
                salesmanId: req.params.salesmanId,
                yearOfEvaluation: req.params.yearOfEvaluation,
                "socialPerformanceEvaluation.socialAttributes._id": comment._id,
                status: "pending-ceo",
            }, {
                $set: {
                    "socialPerformanceEvaluation.socialAttributes.$.comment": comment.text,
                },
            })
                .then((value) => allResponses.push(value))
                .catch((reason) => allResponses.push(reason));
        }
        else {
            await BonusComputationSheet_1.BonusComputationSheetModel.updateOne({
                salesmanId: req.params.salesmanId,
                yearOfEvaluation: req.params.yearOfEvaluation,
                status: "pending-ceo",
            }, { comment: comment.text })
                .then((value) => allResponses.push(value))
                .catch((reason) => allResponses.push(reason));
        }
    }
    res.status(200).send(allResponses);
}
exports.addComments = addComments;
async function signSheet(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.findOneAndUpdate({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
        status: "pending-ceo",
    }, { status: "pending-salesman" })
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-ceo`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.signSheet = signSheet;
async function getSheetByIdAndYear(req, res) {
    try {
        const sheet = await BonusComputationSheet_1.BonusComputationSheetModel.findOne({
            salesmanId: req.params.salesmanId,
            yearOfEvaluation: req.params.yearOfEvaluation,
        });
        const salesman = await Salesman_1.SalesmanModel.findOne({ id: req.params.salesmanId });
        if (sheet !== null && salesman !== null) {
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
    }
    catch (reason) {
        res.status(400).send(reason);
    }
}
exports.getSheetByIdAndYear = getSheetByIdAndYear;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotPendingValues = exports.readPendingValues = exports.signSheetUntilFix = exports.signSheet = exports.readSheet = void 0;
const BonusComputationSheet_1 = require("../../model/BonusComputationSheet");
const Salesman_1 = require("../../model/Salesman");
async function readSheet(req, res) {
    let s = req.session;
    await BonusComputationSheet_1.BonusComputationSheetModel.findOne({
        salesmanId: s.user?.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
        status: "pending-salesman",
    })
        .then((value) => res.status(200).send(value))
        .catch((reason) => res.status(400).send(reason));
}
exports.readSheet = readSheet;
async function signSheet(req, res) {
    let s = req.session;
    await BonusComputationSheet_1.BonusComputationSheetModel.findOneAndUpdate({
        salesmanId: s.user?.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
        status: "pending-salesman",
    }, { status: "finished" })
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `There exists no BonusComputationSheet for this salesmanId: ${s.user?.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-salesman`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.signSheet = signSheet;
async function signSheetUntilFix(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.findOneAndUpdate({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
        status: "pending-salesman",
    }, { status: "finished" })
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-salesman`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.signSheetUntilFix = signSheetUntilFix;
async function readPendingValues(req, res) {
    try {
        const pendingSheets = await BonusComputationSheet_1.BonusComputationSheetModel.find({
            status: "pending-salesman",
            salesmanId: req.params.salesmanId,
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
    console.log("inside");
    try {
        const notPendingSheets = await BonusComputationSheet_1.BonusComputationSheetModel.find({
            salesmanId: req.params.salesmanId,
        })
            .where("status")
            .ne("pending-salesman");
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

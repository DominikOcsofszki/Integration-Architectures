"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBonusCalculation = exports.readNotPendingValues = exports.readPendingValues = exports.getAllSheets = exports.getSheetsByYear = exports.getSheetsById = exports.getSheetByIdAndYear = exports.signSheet = exports.readNotPendingSheets = exports.readPendingSheets = exports.readSheetStatus = void 0;
const BonusComputationSheet_1 = require("../../model/BonusComputationSheet");
const Salesman_1 = require("../../model/Salesman");
const sheet_service_1 = require("../../service/sheet-service");
async function readSheetStatus(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({})
        .then((value) => {
        res.status(200).send(value.map((element) => ({
            salesmanId: element.salesmanId,
            yearOfEvaluation: element.yearOfEvaluation,
            status: element.status,
        })));
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.readSheetStatus = readSheetStatus;
async function readPendingSheets(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({ status: "pending-hr" })
        .then((value) => {
        res.status(200).send(value);
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.readPendingSheets = readPendingSheets;
async function readNotPendingSheets(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({
        $or: [
            { status: "incomplete" },
            { status: "pending-ceo" },
            { status: "pending-salesman" },
            { status: "finished" },
        ],
    })
        .then((value) => {
        res.status(200).send(value);
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.readNotPendingSheets = readNotPendingSheets;
async function signSheet(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.findOneAndUpdate({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
        status: "pending-hr",
    }, { status: "pending-ceo" })
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation} with the status pending-hr`,
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
async function getSheetsById(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({
        salesmanId: req.params.salesmanId,
    })
        .then((value) => {
        res.status(200).send(value);
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.getSheetsById = getSheetsById;
async function getSheetsByYear(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({
        yearOfEvaluation: req.params.yearOfEvaluation,
    })
        .then((value) => {
        res.status(200).send(value);
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.getSheetsByYear = getSheetsByYear;
async function getAllSheets(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.find({})
        .then((value) => {
        res.status(200).send(value);
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.getAllSheets = getAllSheets;
async function readPendingValues(req, res) {
    try {
        const pendingSheets = await BonusComputationSheet_1.BonusComputationSheetModel.find({
            status: "pending-hr",
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
            .ne("pending-hr");
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
async function startBonusCalculation(req, res) {
    (0, sheet_service_1.createSheetsForAllSalesmen)(parseInt(req.params.year), req.app.get("db"))
        .then(() => res.status(200).send())
        .catch((reason) => res.status(400).send(reason));
}
exports.startBonusCalculation = startBonusCalculation;

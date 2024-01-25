"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBonusComputationSheet = exports.updateBonusComputationSheet = exports.readBonusComputationSheet = exports.createBonusComputationSheet = void 0;
const BonusComputationSheet_1 = require("../../model/BonusComputationSheet");
async function createBonusComputationSheet(req, res) {
    await new BonusComputationSheet_1.BonusComputationSheetModel(req.body)
        .save()
        .then(() => res.status(200).send("BonusComputationSheet created"))
        .catch((reason) => res.status(400).send(reason));
}
exports.createBonusComputationSheet = createBonusComputationSheet;
async function readBonusComputationSheet(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.findOne({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
    })
        .then((value) => res.status(200).send(value))
        .catch((reason) => res.status(400).send(reason));
}
exports.readBonusComputationSheet = readBonusComputationSheet;
async function updateBonusComputationSheet(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.findOneAndUpdate({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
    }, req.body)
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation}`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.updateBonusComputationSheet = updateBonusComputationSheet;
async function deleteBonusComputationSheet(req, res) {
    await BonusComputationSheet_1.BonusComputationSheetModel.findOneAndDelete({
        salesmanId: req.params.salesmanId,
        yearOfEvaluation: req.params.yearOfEvaluation,
    })
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `There exists no BonusComputationSheet for this salesmanId: ${req.params.salesmanId} for this year: ${req.params.yearOfEvaluation}`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.deleteBonusComputationSheet = deleteBonusComputationSheet;

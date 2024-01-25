"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signSheet = exports.readSheet = void 0;
const BonusComputationSheet_1 = require("../../model/BonusComputationSheet");
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

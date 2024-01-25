"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBonusComputationSheet = exports.updateBonusComputationSheet = exports.readBonusComputationSheet = exports.createBonusComputationSheet = void 0;
const BonusComputationSheet_1 = require("../model/BonusComputationSheet");
const dbName = "db_task1";
function createBonusComputationSheet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new BonusComputationSheet_1.BonusComputationSheetModel(req.body).save()
            .then(() => res.status(200).send('BonusComputationSheet created'))
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.createBonusComputationSheet = createBonusComputationSheet;
function readBonusComputationSheet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield BonusComputationSheet_1.BonusComputationSheetModel.findOne({
            salesManId: req.params.salesManId,
            yearOfEvaluation: req.params.yearOfEvaluation
        })
            .then((value) => res.status(200).send(value))
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.readBonusComputationSheet = readBonusComputationSheet;
function updateBonusComputationSheet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield BonusComputationSheet_1.BonusComputationSheetModel.findOneAndUpdate({
            salesManId: req.params.salesManId,
            yearOfEvaluation: req.params.yearOfEvaluation
        }, req.body)
            .then((value) => {
            if (value === null) {
                res.status(400).send({ message: `There exists no BonusComputationSheet for this SalesmanId: ${req.params.salesManId} for this year: ${req.params.yearOfEvaluation}` });
            }
            else {
                res.status(200).send(value);
            }
        })
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.updateBonusComputationSheet = updateBonusComputationSheet;
function deleteBonusComputationSheet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield BonusComputationSheet_1.BonusComputationSheetModel.findOneAndDelete({
            salesManId: req.params.salesManId,
            yearOfEvaluation: req.params.yearOfEvaluation
        })
            .then(value => {
            if (value === null) {
                res.status(400).send({ message: `There exists no BonusComputationSheet for this SalesmanId: ${req.params.salesManId} for this year: ${req.params.yearOfEvaluation}` });
            }
            else {
                res.status(200).send(value);
            }
        })
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.deleteBonusComputationSheet = deleteBonusComputationSheet;

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
exports.deleteSalesman = exports.updateSalesman = exports.readSalesman = exports.createSalesman = void 0;
const Salesman_1 = require("../model/Salesman");
function createSalesman(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Salesman_1.SalesmanModel(req.body).save()
            .then(() => res.status(200).send('Salesman created'))
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.createSalesman = createSalesman;
function readSalesman(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Salesman_1.SalesmanModel.findOne({ id: req.params.id })
            .then((value) => {
            if (value === null) {
                res.status(404).send({ message: `No salesman with the id ${req.params.id} found` });
            }
            else {
                res.status(200).send(value);
            }
        })
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.readSalesman = readSalesman;
function updateSalesman(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Salesman_1.SalesmanModel.findOneAndUpdate({ id: req.params.id }, req.body)
            .then((value) => {
            if (value === null) {
                res.status(400).send({ message: `No Salesman with the id: ${req.params.id}` });
            }
            else {
                res.status(200).send(value);
            }
        }) //sends the old value
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.updateSalesman = updateSalesman;
function deleteSalesman(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Salesman_1.SalesmanModel.findOneAndDelete({ id: req.params.id })
            .then(value => {
            if (value === null) {
                res.status(400).send({ message: `No Salesman with the id: ${req.params.id}` });
            }
            else {
                res.status(200).send(value);
            }
        })
            .catch((reason) => res.status(400).send(reason));
    });
}
exports.deleteSalesman = deleteSalesman;

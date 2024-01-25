"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSalesman = exports.updateSalesman = exports.readSalesman = exports.createSalesman = void 0;
const Salesman_1 = require("../../model/Salesman");
async function createSalesman(req, res) {
    await new Salesman_1.SalesmanModel(req.body)
        .save()
        .then(() => res.status(200).send("Salesman created"))
        .catch((reason) => res.status(400).send(reason));
}
exports.createSalesman = createSalesman;
async function readSalesman(req, res) {
    await Salesman_1.SalesmanModel.findOne({ id: req.params.id })
        .then((value) => {
        if (value === null) {
            res.status(404).send({
                message: `No salesman with the id ${req.params.id} found`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.readSalesman = readSalesman;
async function updateSalesman(req, res) {
    await Salesman_1.SalesmanModel.findOneAndUpdate({ id: req.params.id }, req.body)
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `No Salesman with the id: ${req.params.id}`,
            });
        }
        else {
            res.status(200).send(value);
        }
    }) //sends the old value
        .catch((reason) => res.status(400).send(reason));
}
exports.updateSalesman = updateSalesman;
async function deleteSalesman(req, res) {
    await Salesman_1.SalesmanModel.findOneAndDelete({ id: req.params.id })
        .then((value) => {
        if (value === null) {
            res.status(400).send({
                message: `No Salesman with the id: ${req.params.id}`,
            });
        }
        else {
            res.status(200).send(value);
        }
    })
        .catch((reason) => res.status(400).send(reason));
}
exports.deleteSalesman = deleteSalesman;

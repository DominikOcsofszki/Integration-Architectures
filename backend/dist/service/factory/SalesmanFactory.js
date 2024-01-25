"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesman = void 0;
const Salesman_1 = require("../../model/Salesman");
function createSalesman(id, firstname, lastname, department) {
    new Salesman_1.SalesmanModel({
        id: id,
        firstname: firstname,
        lastname: lastname,
        department: department,
    })
        .save()
        .then(() => console.log(`Salesman with id ${id} inserted in database`))
        .catch(() => console.log(`Salesman with id ${id} is already in the database`));
}
exports.createSalesman = createSalesman;

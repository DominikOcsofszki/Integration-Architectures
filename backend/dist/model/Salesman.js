"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesmanModel = exports.SalesmanSchema = exports.Salesman = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Salesman {
    constructor(id, firstName, lastName, department) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.department = department;
    }
    toString() {
        return `
        id:${this.id},
        firstName: ${this.firstname},
        lastName: ${this.lastname},
        department:${this.department}`;
    }
}
exports.Salesman = Salesman;
exports.SalesmanSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    department: { type: String, required: true },
});
exports.SalesmanModel = mongoose_1.default.model("Salesman", exports.SalesmanSchema);

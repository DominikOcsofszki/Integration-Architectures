"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class User {
    constructor(username, firstname, lastname, email, password, role, salemanId) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.salesmanId = salemanId;
    }
}
exports.User = User;
exports.UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    salesmanId: { type: Number }, //Is only needed for salesman
});
exports.UserModel = mongoose_1.default.model("users", exports.UserSchema);

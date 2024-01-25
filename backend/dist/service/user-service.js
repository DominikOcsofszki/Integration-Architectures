"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.verify = void 0;
const crypto_1 = __importDefault(require("crypto"));
const User_1 = require("../model/User");
const salt = "integrationArchitectures";
// export async function add(db: Connection, user: typeof UserSchema): Promise<any> {
//     user.password = hashPassword(user.password);
//     return (await UserModel.create(user)); //return unique ID
// }
async function verify(credentials) {
    let user = (await User_1.UserModel.findOne({
        username: credentials.username,
    }));
    if (!user)
        throw new Error("User was not found!"); //no user found -> throw error
    if (!verifyPassword(credentials.password, user.password))
        throw new Error("Password wrong!");
    return user;
}
exports.verify = verify;
function hashPassword(password) {
    let hash = crypto_1.default.createHmac("sha3-256", salt);
    hash.update(password);
    return hash.digest("base64");
}
exports.hashPassword = hashPassword;
function verifyPassword(password, hash) {
    return hashPassword(password) === hash; //verify by comparing hashes
}

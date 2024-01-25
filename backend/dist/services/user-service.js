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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.get = exports.add = void 0;
const crypto_1 = __importDefault(require("crypto"));
const salt = 'integrationArchitectures';
function add(db, user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.password = hashPassword(user.password);
        return (yield db.collection('users').insertOne(user)).insertedId; //return unique ID
    });
}
exports.add = add;
function get(db, username) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection('users').findOne({ username: username });
    });
}
exports.get = get;
function verify(db, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield get(db, credentials.username); //retrieve user with given email from database
        if (!user)
            throw new Error('User was not found!'); //no user found -> throw error
        if (!verifyPassword(credentials.password, user.password))
            throw new Error('Password wrong!');
        return user;
    });
}
exports.verify = verify;
function hashPassword(password) {
    let hash = crypto_1.default.createHmac('sha3-256', salt);
    hash.update(password);
    return hash.digest('base64');
}
function verifyPassword(password, hash) {
    return hashPassword(password) === hash; //verify by comparing hashes
}

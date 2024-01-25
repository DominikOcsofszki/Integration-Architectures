"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsCRX = void 0;
const axios_1 = __importDefault(require("axios"));
let environment;
if (process.env.NODE_ENV === "development") {
    environment = require("../../environment/environment.js").default;
}
else {
    environment = require("../../environment/environment.prod.js").default;
}
async function getItemsCRX(fullUrl) {
    const credentials = {
        username: `${environment.env.CRX_USERNAME}`,
        password: `${environment.env.CRX_PASSWORD}`,
    };
    const config = {
        headers: { Accept: "application/json" },
        auth: credentials,
    };
    const itemsReturnedAsJson = await axios_1.default.get(fullUrl, config);
    return itemsReturnedAsJson.data;
}
exports.getItemsCRX = getItemsCRX;
// //For testing purposes
// import { crxAccountURL } from './tools-connector';
// async function test() {
//     const items = await getItemsCRX(crxAccountURL);
//     console.log(items);
// }
// test();

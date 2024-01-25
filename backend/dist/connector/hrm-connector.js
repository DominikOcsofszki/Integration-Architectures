"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenHRM = exports.getItemsFromHRM = void 0;
const axios_1 = __importDefault(require("axios"));
let environment;
if (process.env.NODE_ENV === "development") {
    environment = require("../../environment/environment.js").default;
}
else {
    environment = require("../../environment/environment.prod.js").default;
}
async function getItemsFromHRM(fullUrl) {
    const token = await getTokenHRM();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const itemsReturnedAsJson = await axios_1.default.get(fullUrl, config);
    return itemsReturnedAsJson.data;
}
exports.getItemsFromHRM = getItemsFromHRM;
// //For testing purposes, can be deleted later
// import { hrmEmployeeURL } from './tools-connector';
// async function test() {
//     const items = await getItemsFromHRM(hrmEmployeeURL);
//     console.log(items);
// }
// test();
async function getTokenHRM() {
    const baseUrl = `${environment.env.BASE_URL_HRM}`;
    const qs = require("querystring");
    const body = qs.stringify({
        client_id: "api_oauth_id",
        client_secret: "oauth_secret",
        grant_type: "password",
        username: `${environment.env.USER_WEBSITE}`,
        password: `${environment.env.PASSWORD}`,
    });
    const config = {
        headers: {
            Authorization: `Bearer`,
            "Content-Typ": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
    };
    const res = await axios_1.default.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }
    const accessToken = res.data["access_token"];
    // console.log(accessToken);
    return accessToken;
}
exports.getTokenHRM = getTokenHRM;

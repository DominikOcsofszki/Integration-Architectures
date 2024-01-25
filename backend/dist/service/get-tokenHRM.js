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
require('dotenv').config();
function getTokenHRM() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = `${process.env.BASE_URL_HRM}`;
        const axios = require('axios');
        const qs = require('querystring');
        const body = qs.stringify({
            client_id: 'api_oauth_id', client_secret: 'oauth_secret',
            grant_type: 'password', username: `${process.env.USER_WEBSITE}`, password: `${process.env.PASSWORD}`
        });
        const config = { headers: { 'Authorization': `Bearer`, 'Content-Typ': 'application/x-www-form-urlencoded', 'Accept': 'application/json', } };
        // const config = { headers: { 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`, 'Content-Typ': 'application/x-www-form-urlencoded', 'Accept': 'application/json', } };
        const res = yield axios.post(`${baseUrl}/oauth/issueToken`, body, config);
        if (res.data.error) {
            throw Error(res.data.error);
        }
        const accessToken = res.data['access_token'];
        console.log(accessToken);
        return accessToken;
    });
}
module.exports = getTokenHRM;

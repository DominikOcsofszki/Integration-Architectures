import axios from "axios";

export async function getItemsFromHRM(fullUrl: string) {
    const token = await getTokenHRM();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const itemsReturnedAsJson = await axios.get(fullUrl, config);
    return itemsReturnedAsJson.data;
}

// //For testing purposes, can be deleted later
// import { hrmEmployeeURL } from './tools-connector';
// async function test() {
//     const items = await getItemsFromHRM(hrmEmployeeURL);
//     console.log(items);
// }
// test();

async function getTokenHRM() {
    const baseUrl = `${process.env.BASE_URL_HRM}`;
    const qs = require("querystring");
    const body = qs.stringify({
        client_id: "api_oauth_id",
        client_secret: "oauth_secret",
        grant_type: "password",
        username: `${process.env.USER_WEBSITE}`,
        password: `${process.env.PASSWORD}`,
    });
    const config = {
        headers: {
            Authorization: `Bearer`,
            "Content-Typ": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
    };
    const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }
    const accessToken = res.data["access_token"];
    return accessToken;
}

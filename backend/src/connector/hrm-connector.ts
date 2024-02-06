import axios from "axios";

let environment: any;
if (process.env.NODE_ENV === "development") {
    environment = require("../../environment/environment.js").default;
} else {
    environment = require("../../environment/environment.prod.js").default;
}

export async function getItemsFromHRM(fullUrl: string) {
    const token = await getTokenHRM();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const itemsReturnedAsJson = await axios.get(fullUrl, config);
    return itemsReturnedAsJson.data;
}

export async function storeBonus(employeeId: string, bonus: number, year: number){
    const token = await getTokenHRM();
    const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/x-www-form-urlencoded" } };
    const body = `year=${year}&value=${bonus}`;
    const res = await axios.post(`${environment.env.BASE_URL_HRM}/api/v1/employee/${employeeId}/bonussalary`, body, config);
}

// //For testing purposes, can be deleted later
// import { hrmEmployeeURL } from './tools-connector';
// async function test() {
//     const items = await getItemsFromHRM(hrmEmployeeURL);
//     console.log(items);
// }
// test();

export async function getTokenHRM() {
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
    const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }
    const accessToken = res.data["access_token"];
    // console.log(accessToken);
    return accessToken;
}

import axios from "axios";

let environment: any;
if (process.env.NODE_ENV === "development") {
    environment = require("../../environment/environment.js").default;
} else {
    environment = require("../../environment/environment.prod.js").default;
}

export async function getItemsCRX(fullUrl: string) {
    const credentials = {
        username: `${environment.env.CRX_USERNAME}`,
        password: `${environment.env.CRX_PASSWORD}`,
    };
    const config = {
        headers: { Accept: "application/json" },
        auth: credentials,
    };
    const itemsReturnedAsJson = await axios.get(fullUrl, config);
    return itemsReturnedAsJson.data;
}
import axios from "axios";

export async function getItemsCRX(restOfLink: string) {
    require('dotenv').config();
    const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
    const credentials = {
        username: `${process.env.CRX_USERNAME}`,
        password: `${process.env.CRX_PASSWORD}`,
    };
    const config = { headers: { 'Accept': 'application/json' }, auth: credentials, };
    const fullUrl = `${baseUrl}${restOfLink}`;
    const itemsReturnedAsJson = await axios.get(fullUrl, config);
    const objects = itemsReturnedAsJson.data.objects;
    return objects;
}

// //For testing purposes
// import { crxAccountURL } from './tools-connector';
// async function test() {
//     const items = await getItemsCRX(crxAccountURL);
//     console.log(items);
// }
// test();

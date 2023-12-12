import axios from "axios";

export async function getItemsCRX(fullUrl: string) {
    const credentials = {
        username: `${process.env.CRX_USERNAME}`,
        password: `${process.env.CRX_PASSWORD}`,
    };
    const config = { headers: { 'Accept': 'application/json' }, auth: credentials, };
    const itemsReturnedAsJson = await axios.get(fullUrl, config);
    return itemsReturnedAsJson.data;
}

// //For testing purposes
// import { crxAccountURL } from './tools-connector';
// async function test() {
//     const items = await getItemsCRX(crxAccountURL);
//     console.log(items);
// }
// test();

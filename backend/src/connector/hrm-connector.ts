import { getTokenHRM } from "./hrm-token";
import axios from "axios";

export async function getItemsFromHRM(fullUrl: string) {
    const token = await getTokenHRM();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const itemsReturnedAsJson = await axios.get(fullUrl, config);
    const data = await itemsReturnedAsJson.data;
    return data;
}

// //For testing purposes, can be deleted later
// import { hrmEmployeeURL } from './tools-connector';
// async function test() {
//     const items = await getItemsFromHRM(hrmEmployeeURL);
//     console.log(items);
// }
// test();


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSalesmanIdsFromDB = exports.requestAndStoreSalesmanFromHRM = void 0;
const hrm_connector_1 = require("../connector/hrm-connector");
const Salesman_1 = require("../model/Salesman");
/**
 * function to request salesmen from OrangeHRM and store each of them into the database
 */
async function requestAndStoreSalesmanFromHRM(db) {
    const response = await (0, hrm_connector_1.getItemsFromHRM)("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2");
    const salesmen = response.data;
    const salesmenList = [];
    salesmen.forEach((salesman) => {
        const salesmanEntity = new Salesman_1.Salesman(parseInt(salesman.code), salesman.firstName, salesman.lastName, salesman.unit);
        salesmenList.push(salesmanEntity);
    });
    await storeSalesmen(salesmenList, db);
    console.log("Salesmen stored in database");
}
exports.requestAndStoreSalesmanFromHRM = requestAndStoreSalesmanFromHRM;
/**
 * function to store list of salesmen in database
 * @param salesmen
 * @param db
 */
async function storeSalesmen(salesmen, db) {
    for (const element of salesmen) {
        console.log(element);
        await db.collection("salesmen").replaceOne({ id: element.id }, element, { upsert: true });
        console.log(`Salesman with id ${element.id} inserted`);
    }
}
/**
 * Returns list of all ids of salesmen in the database
 */
async function getAllSalesmanIdsFromDB() {
    const salesmanIds = [];
    await Salesman_1.SalesmanModel.find({}).then((salesmen) => {
        salesmen.forEach((salesman) => { salesmanIds.push(salesman.id); });
    });
    return salesmanIds;
}
exports.getAllSalesmanIdsFromDB = getAllSalesmanIdsFromDB;

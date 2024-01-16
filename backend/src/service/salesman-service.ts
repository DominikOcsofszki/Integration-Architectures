import {getItemsFromHRM} from "../connector/hrm-connector";
import {Salesman, SalesmanModel} from "../model/Salesman";
import {Connection} from "mongoose";

/**
 * function to request salesmen from OrangeHRM and store each of them into the database
 */
export async function requestAndStoreSalesmanFromHRM(db: Connection){
    const response = await getItemsFromHRM("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2");
    const salesmen = response.data;
    const salesmenList: Salesman[] = [];
    salesmen.forEach((salesman: any) => {
        const salesmanEntity: Salesman = new Salesman(parseInt(salesman.code), salesman.firstName, salesman.lastName, salesman.unit);
        salesmenList.push(salesmanEntity);
    })
    await storeSalesmen(salesmenList, db);
    console.log("Salesmen stored in database");
}

/**
 * function to store list of salesmen in database
 * @param salesmen
 * @param db
 */
async function storeSalesmen(salesmen: Salesman[], db: Connection){
    for (const element of salesmen){
        console.log(element);
        await db.collection("salesmen").replaceOne({id: element.id}, element, {upsert: true});
        console.log(`Salesman with id ${element.id} inserted`);
    }
}

/**
 * Returns list of all ids of salesmen in the database
 */
export async function getAllSalesmanIdsFromDB(): Promise<number[]>{
    const salesmanIds: number[] = [];
     await SalesmanModel.find({}).then((salesmen) => {
         salesmen.forEach((salesman) => {salesmanIds.push(salesman.id)})
    })
    return salesmanIds;
}
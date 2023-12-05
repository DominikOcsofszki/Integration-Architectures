import { Connection } from "mongoose"
import { Salesman } from "../model/Salesman";
import {getItemsFromHRM} from "../connector/hrm-connector";

const dbName = "db_task1";
const collectionName = "SalesMen";

export async function createSalesmanService(db: Connection, salesman: Salesman){
    return await db.getClient().db(dbName).collection(collectionName).insertOne(salesman);
}

export async function readSalesmanService(db: Connection, salesmanId: number){
    return await db.getClient().db(dbName).collection(collectionName).findOne({id: salesmanId });
}

export async function updateSalesmanService(db: Connection, updatedSalesman: Salesman){
    return await db.getClient().db(dbName).collection(collectionName)
        .replaceOne( {id: updatedSalesman.id }, updatedSalesman);
}

export async function deleteSalesmanService(db: Connection, salesmanId: number){
    return await db.getClient().db(dbName).collection(collectionName).deleteOne( {id: salesmanId});
}

export function getSalesmanFromHRM(){
    const data = getItemsFromHRM("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2");
    data.then((value => {
        const salesmen = value.data;
        salesmen.forEach((element: any) => {
            const id = parseInt(element.code);
            const firstname = element.firstName;
            const lastname = element.lastName;
            createSalesman(id, firstname, lastname);
        });
    }))
}

import { Connection } from "mongoose"
import { Salesman } from "../model/Salesman";

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
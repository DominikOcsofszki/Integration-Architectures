import { Connection } from "mongoose"
import { Salesman } from "../model/Salesman";

const collectionName = "salesmen";

export async function createSalesmanService(db: Connection, salesman: Salesman){
    return await db.collection(collectionName).insertOne(salesman);
}

export async function readSalesmanService(db: Connection, salesmanId: number){
    return await db.collection(collectionName).findOne({id: salesmanId });
}

export async function updateSalesmanService(db: Connection, updatedSalesman: Salesman){
    return await db.collection(collectionName)
        .replaceOne( {id: updatedSalesman.id }, updatedSalesman);
}

export async function deleteSalesmanService(db: Connection, salesmanId: number){
    return await db.collection(collectionName).deleteOne( {id: salesmanId});
}
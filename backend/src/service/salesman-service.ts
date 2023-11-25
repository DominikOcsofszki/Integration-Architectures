import { Connection } from "mongoose"
import { Salesman } from "../model/Salesman";

export function createSalesmanService(db: Connection, salesman: Salesman){
    return db.getClient().db("db_task1").collection("SalesMen").insertOne(salesman);
}
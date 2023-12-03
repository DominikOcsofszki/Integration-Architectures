import { BonusComputationSheet } from "../model/BonusComputationSheet";
import { Request, Response } from "express";
import { Connection } from "mongoose"

const dbName = "db_task1";

export function createBonusComputationSheet(req: Request, res: Response) {
    try {
        const db: Connection = req.app.get('db');
        const sheet: BonusComputationSheet = req.body;
        db.collection("BonusComputationSheet").insertOne(sheet);
        res.send("Creation Successfull");
    } catch(e: unknown) {
        if(e instanceof Error){
            res.status(400).send(e.message);
        }
    }
}

export function readBonusComputationSheet(req: Request, res: Response) {
    try {
        const db: Connection = req.app.get("db");
        const salesManId: number = parseInt(req.params.salesManId);
        const yearOfOrder: number = parseInt(req.params.yearOfOrder);
        const sheet: Promise<BonusComputationSheet> = db.collection("BonusComputationSheet")
            .findOne({salesManId: salesManId, yearOfOrder: yearOfOrder}) as unknown as Promise<BonusComputationSheet>;
        sheet.then((value) => res.status(200).send(value));
    } catch(e: unknown) {
        if(e instanceof Error){
            res.status(400).send(e.message);
        }
    }
}

export function updateBonusComputationSheet(req: Request, res: Response) {
    try {
        const db: Connection = req.app.get("db");
        const salesManId: number = req.body.salesManId;
        const yearOfOrder: number = req.body.yearOfOrder;
        const sheet: BonusComputationSheet = req.body.sheet;
        db.getClient().db(dbName).collection("BonusComputationSheet").replaceOne({salesManId: salesManId, yearOfOrder: yearOfOrder},sheet);
        res.send("Update Successfull")
    } catch(e: unknown) {
        if(e instanceof Error){
            res.status(400).send(e.message);
        }
    }
}

export function deleteBonusComputationSheet(req: Request, res: Response) {
    try {
        const db: Connection = req.app.get("db");
        const salesManId: number = req.body.salesManId;
        const yearOfOrder: number = req.body.yearOfOrder;
        const sheet: BonusComputationSheet = db.getClient().db(dbName).collection("BonusComputationSheet").deleteOne({salesManId: salesManId, yearOfOrder: yearOfOrder}) as unknown as BonusComputationSheet;
        res.status(200).send("Deletion Successfull");
    } catch(e: unknown) {
        if(e instanceof Error){
            res.status(400).send(e.message);
        }
    }
}
/*
    Post /setComputationDate ?
    Get /sheet/status readSheetStatus()
    Get /sheets/pending readPendingSheets()
    Post /sheets/pending/sign/:salesmanId/:yearOfEvaluation signSheet()

    Get /sheet/:year/:salesman readSalesman()
    Get /sheet/:year
    Get /sheet/:salesman 
    Get /sheet/
*/
import { Router } from "express";
import { readPendingSheets, readSheetStatus, signSheet, readSalesman } from "./hr-api";

const hrRouter = Router();

hrRouter.get("/sheet/status", readSheetStatus);
hrRouter.get("/pending/sheet", readPendingSheets);
hrRouter.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);
hrRouter.get("/sheet/:salesmanId/:yearOfEvaluation/", readSalesman);

export default hrRouter;
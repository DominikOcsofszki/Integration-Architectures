/*
    Post /setComputationDate ?
    Get /sheet/status readSheetStatus()
    Get /sheets/pending readPendingSheets()
    Post /sheets/pending/sign/:salesmanId/:yearOfEvaluation signSheet()

    Get /sheet/:year/:salesman getSheets()
    Get /sheet/:year
    Get /sheet/:salesman 
    Get /sheet/
*/
import { Router } from "express";
import { readPendingSheets, readSheetStatus, signSheet, getSheets } from "./hr-api";

const router = Router();

router.get("/sheet/status", readSheetStatus);
router.get("/pending/sheet", readPendingSheets);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheets);
router.get("/sheet/:salesmanId/", getSheets);
router.get("/sheet/year/:yearOfEvaluation/", getSheets);
router.get("/sheet", getSheets);

export default router;
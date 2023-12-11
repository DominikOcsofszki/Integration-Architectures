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
import { readPendingSheets, readSheetStatus, signSheet, 
    getSheetByIdAndYear, getSheetsById, getSheetsByYear, getAllSheets } from "./hr-api";

const router = Router();

router.get("/sheet/status", readSheetStatus);
router.get("/pending/sheet", readPendingSheets);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);
router.get("/sheet/:salesmanId/", getSheetsById);
router.get("/sheet/year/:yearOfEvaluation/", getSheetsByYear);
router.get("/sheet", getAllSheets);

export default router;
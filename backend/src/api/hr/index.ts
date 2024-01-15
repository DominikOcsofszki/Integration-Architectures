/*
    still missing: Post /setComputationDate ?
*/
import { Router } from "express";
import {
    readPendingSheets,
    readSheetStatus,
    signSheet,
    getSheetByIdAndYear,
    getSheetsById,
    getSheetsByYear,
    getAllSheets, readPendingValues,
} from "./hr-api";

const router = Router();

//router.get("/salesman/status/:year", readSalesmanStatus);
//router.get("/salesman/:status/:year", readSalesmanStatus);
// router.get("/pending/sheet", readPendingSheets);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);
router.get("/sheet/:salesmanId/", getSheetsById);
router.get("/sheet/year/:yearOfEvaluation/", getSheetsByYear);
router.get("/sheet", getAllSheets);
router.get("/sheets/pending", readPendingValues);

export default router;

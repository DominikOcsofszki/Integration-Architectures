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
    getAllSheets,
    readPendingValues,
    readNotPendingSheets,
    readNotPendingValues,
    startBonusCalculation,
    updateSheet,
} from "./hr-api";

const router = Router();

router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);
//router.get("/sheet/:salesmanId/", getSheetsById);
//router.get("/sheet/year/:yearOfEvaluation/", getSheetsByYear);
router.get("/sheet", getAllSheets);

router.get("/sheets/pending", readPendingValues);
router.get("/sheets/notpending", readNotPendingValues);
router.post("/sheets/start/:year", startBonusCalculation);
//TODO: impl update sheet for HR
router.post("/sheet/update", updateSheet);


export default router;

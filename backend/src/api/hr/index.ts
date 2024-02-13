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

router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);
router.get("/sheet", getAllSheets);
router.get("/sheets/pending", readPendingValues);
router.get("/sheets/notpending", readNotPendingValues);
router.post("/sheets/start/:year", startBonusCalculation);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);
router.post("/sheet/update", updateSheet);

export default router;

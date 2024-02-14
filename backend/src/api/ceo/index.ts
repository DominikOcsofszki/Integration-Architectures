import { Router } from "express";
import {
    getSheetByIdAndYear,
    readNotPendingValues,
    readPendingValues,
    signSheet,
    updateSheet,
} from "./ceo-api";

const router = Router();

router.get("/sheets/pending", readPendingValues);
router.get("/sheets/notpending", readNotPendingValues);
router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);
router.post("/sheet/update", updateSheet);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

export default router;

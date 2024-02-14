import { Router } from "express";
import {
    readSheet,
    signSheet,
    readPendingValues,
    readNotPendingValues,
    declineSheet,
} from "./salesman-api";

const router = Router();

router.get("/pending/sheet/:yearOfEvaluation", readSheet);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);
router.get("/sheets/pending/:salesmanId", readPendingValues);
router.get("/sheets/notpending/:salesmanId", readNotPendingValues);
router.post("/sheet/decline", declineSheet);

export default router;

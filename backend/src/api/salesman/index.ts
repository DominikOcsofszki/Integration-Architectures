import { Router } from "express";
import { readSheet, signSheet, signSheetUntilFix } from "./salesman-api";

const router = Router();

router.get("/pending/sheet/:yearOfEvaluation", readSheet);

router.post("/pending/sheet/sign/:yearOfEvaluation", signSheet);

router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheetUntilFix); //TODO delete after cookies fixed
export default router;

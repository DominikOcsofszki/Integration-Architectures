import { Router } from "express";
import { readSheet, signSheet } from "./salesman-api";

const router = Router();

router.get("/pending/sheet/:yearOfEvaluation", readSheet);

router.post("/pending/sheet/sign/:yearOfEvaluation", signSheet);

export default router;

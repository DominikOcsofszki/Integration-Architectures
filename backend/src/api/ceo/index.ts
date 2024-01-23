/*
    Get pending/sheet
    Post /pending/sheet/comment/:salesmanId/:yearOfEvaluation
    --> {
        comments: [
            type:BonusCompuatationSheet|Order|SocialAttribute,
            _id: Objectid (only for Order|SocialAttribute),
            text: String
        ]
    }
    Post /pending/sheet/sign/:salesmanId/:yearOfEvaluation
*/

import { Router } from "express";
import {
    addComments,
    getSheetByIdAndYear,
    readNotPendingValues,
    readPendingSheets,
    readPendingValues,
    signSheet
} from "./ceo-api";

const router = Router();

router.get("/pending/sheet", readPendingSheets);
router.get("/sheets/pending", readPendingValues);
router.get("/sheets/notpending", readNotPendingValues);
router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);

router.post(
    "/pending/sheet/comment/:salesmanId/:yearOfEvaluation",
    addComments
);

router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

export default router;

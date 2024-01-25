"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ceo_api_1 = require("./ceo-api");
const router = (0, express_1.Router)();
router.get("/pending/sheet", ceo_api_1.readPendingSheets);
router.get("/sheets/pending", ceo_api_1.readPendingValues);
router.get("/sheets/notpending", ceo_api_1.readNotPendingValues);
router.get("/sheet/:salesmanId/:yearOfEvaluation/", ceo_api_1.getSheetByIdAndYear);
router.post("/pending/sheet/comment/:salesmanId/:yearOfEvaluation", ceo_api_1.addComments);
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", ceo_api_1.signSheet);
// from hr:
// router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);
exports.default = router;

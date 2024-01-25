"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    still missing: Post /setComputationDate ?
*/
const express_1 = require("express");
const hr_api_1 = require("./hr-api");
const router = (0, express_1.Router)();
router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", hr_api_1.signSheet);
router.get("/sheet/:salesmanId/:yearOfEvaluation/", hr_api_1.getSheetByIdAndYear);
//router.get("/sheet/:salesmanId/", getSheetsById);
//router.get("/sheet/year/:yearOfEvaluation/", getSheetsByYear);
router.get("/sheet", hr_api_1.getAllSheets);
router.get("/sheets/pending", hr_api_1.readPendingValues);
router.get("/sheets/notpending", hr_api_1.readNotPendingValues);
router.post("/sheets/start/:year", hr_api_1.startBonusCalculation);
exports.default = router;

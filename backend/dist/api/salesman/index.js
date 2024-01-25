"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesman_api_1 = require("./salesman-api");
const router = (0, express_1.Router)();
router.get("/pending/sheet/:yearOfEvaluation", salesman_api_1.readSheet);
router.post("/pending/sheet/sign/:yearOfEvaluation", salesman_api_1.signSheet);
exports.default = router;

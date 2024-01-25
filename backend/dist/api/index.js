"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hr_1 = __importDefault(require("./hr"));
const ceo_1 = __importDefault(require("./ceo"));
const salesman_1 = __importDefault(require("./salesman"));
const admin_1 = __importDefault(require("./admin"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use("", user_1.default);
// router.use("/hr",checkAuthorization(["hr"]), hrRouter);
router.use("/hr", hr_1.default); //TODO!!!!
// router.use("/ceo", checkAuthorization(["ceo"]), ceoRouter);
router.use("/ceo", ceo_1.default);
// router.use("/salesman", checkAuthorization(["salesman"]), salesmanRouter);
router.use("/salesman", salesman_1.default);
// router.use("/admin", checkAuthorization(["admin"]), adminRouter);
router.use("/admin", admin_1.default);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth-middleware");
const hr_1 = __importDefault(require("./hr"));
const ceo_1 = __importDefault(require("./ceo"));
const salesman_1 = __importDefault(require("./salesman"));
const admin_1 = __importDefault(require("./admin"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use("", user_1.default);
router.use("/hr", (0, auth_middleware_1.checkAuthorization)(["hr"]), hr_1.default);
router.use("/ceo", (0, auth_middleware_1.checkAuthorization)(["ceo"]), ceo_1.default);
router.use("/salesman", (0, auth_middleware_1.checkAuthorization)(["salesman"]), salesman_1.default);
router.use("/admin", (0, auth_middleware_1.checkAuthorization)(["admin"]), admin_1.default);
exports.default = router;

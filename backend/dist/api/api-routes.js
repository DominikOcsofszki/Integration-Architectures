"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_api_1 = require("./auth-api");
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_api_1 = require("./user-api");
const people_demo_api_1 = require("./people-demo-api");
const salesman_api_1 = require("./salesman-api");
const salesman_api_2 = require("./salesman-api");
const salesman_api_3 = require("./salesman-api");
const salesman_api_4 = require("./salesman-api");
const bonus_sheet_api_1 = require("./bonus-sheet-api");
const router = (0, express_1.Router)();
router.post('/login', auth_api_1.login);
router.delete('/login', (0, auth_middleware_1.checkAuthorization)(false), auth_api_1.logout);
router.get('/login', auth_api_1.isLoggedIn);
router.get('/user', (0, auth_middleware_1.checkAuthorization)(false), user_api_1.getSelf);
router.get('/people', (0, auth_middleware_1.checkAuthorization)(true), people_demo_api_1.getPeople);
// REST-Interface for Salesman-CRUD
router.post('/salesman', (0, auth_middleware_1.checkAuthorization)(false), salesman_api_1.createSalesman);
router.get('/salesman/:id', (0, auth_middleware_1.checkAuthorization)(false), salesman_api_2.readSalesman);
router.put('/salesman/:id', (0, auth_middleware_1.checkAuthorization)(false), salesman_api_3.updateSalesman);
router.delete('/salesman/:id', (0, auth_middleware_1.checkAuthorization)(false), salesman_api_4.deleteSalesman);
// REST-Interface for BonusComputationSheet CRUD
router.post("/bonus", (0, auth_middleware_1.checkAuthorization)(false), bonus_sheet_api_1.createBonusComputationSheet);
router.get("/bonus/:salesManId/:yearOfEvaluation", (0, auth_middleware_1.checkAuthorization)(false), bonus_sheet_api_1.readBonusComputationSheet);
router.put("/bonus/:salesManId/:yearOfEvaluation", (0, auth_middleware_1.checkAuthorization)(false), bonus_sheet_api_1.updateBonusComputationSheet);
router.delete("/bonus/:salesManId/:yearOfEvaluation", (0, auth_middleware_1.checkAuthorization)(false), bonus_sheet_api_1.deleteBonusComputationSheet);
exports.default = router;

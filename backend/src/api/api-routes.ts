import { Router } from "express"
import { login, logout, isLoggedIn } from "./auth/auth-api";
import { checkAuthorization } from "../middleware/auth-middleware";
import { getSelf } from "./user-api";
import { createSalesman, createSalesmanUser } from './admin/salesman-api'
import { readSalesman } from './admin/salesman-api'
import { updateSalesman } from "./admin/salesman-api";
import { deleteSalesman } from "./admin/salesman-api";
import { createBonusComputationSheet, readBonusComputationSheet, 
    updateBonusComputationSheet, deleteBonusComputationSheet } from "./admin/bonus-sheet-api";
import hrRouter from "./hr/hr-routes";
import ceoRouter from "./ceo/ceo-routes";
import salesmanRouter from "./salesman/salesman-routes";

const router = Router();

router.post('/login', login);
router.delete('/login', checkAuthorization(["user"]), logout);
router.get('/login', isLoggedIn);

router.get('/user', checkAuthorization(["user"]), getSelf);

// REST-Interface for Salesman-CRUD
router.post('/salesman', checkAuthorization(["admin"]), createSalesman)
router.get('/salesman/:id', checkAuthorization(["admin"]), readSalesman)
router.put('/salesman/:id', checkAuthorization(["admin"]), updateSalesman)
router.delete('/salesman/:id', checkAuthorization(["admin"]), deleteSalesman)
router.post("/creator", createSalesmanUser);

// REST-Interface for BonusComputationSheet CRUD
router.post("/bonus", checkAuthorization(["admin"]), createBonusComputationSheet);
router.get("/bonus/:salesmanId/:yearOfEvaluation", checkAuthorization(["admin"]), readBonusComputationSheet);
router.put("/bonus/:salesmanId/:yearOfEvaluation", checkAuthorization(["admin"]), updateBonusComputationSheet);
router.delete("/bonus/:salesmanId/:yearOfEvaluation", checkAuthorization(["admin"]), deleteBonusComputationSheet);

router.use("/hr",checkAuthorization(["hr"]), hrRouter);

router.use("/ceo", checkAuthorization(["ceo"]), ceoRouter);

router.use("/salesman", checkAuthorization(["salesman"]), salesmanRouter)

export default router;

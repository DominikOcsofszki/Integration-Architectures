import { Router } from "express"
import { login, logout, isLoggedIn } from "./auth-api";
import { checkAuthorization } from "../middleware/auth-middleware";
import { getSelf } from "./user-api";
import { getPeople } from './people-demo-api';
import { createSalesman } from './salesman-api'
import { readSalesman } from './salesman-api'
import { updateSalesman } from "./salesman-api";
import { deleteSalesman } from "./salesman-api";
import { createBonusComputationSheet, readBonusComputationSheet, 
    updateBonusComputationSheet, deleteBonusComputationSheet } from "./bonus-sheet-api";
import hrRouter from "./hr-routes";
import { readSheetStatus } from "./hr-api";

const router = Router();

router.post('/login', login);
router.delete('/login', checkAuthorization(["user"]), logout);
router.get('/login', isLoggedIn);

router.get('/user', checkAuthorization(["user"]), getSelf);

router.get('/people', checkAuthorization(["admin"]), getPeople);

// REST-Interface for Salesman-CRUD
router.post('/salesman', checkAuthorization(["admin"]), createSalesman)
router.get('/salesman/:id', checkAuthorization(["admin"]), readSalesman)
router.put('/salesman/:id', checkAuthorization(["admin"]), updateSalesman)
router.delete('/salesman/:id', checkAuthorization(["admin"]), deleteSalesman)

// REST-Interface for BonusComputationSheet CRUD
router.post("/bonus", checkAuthorization(["admin"]), createBonusComputationSheet);
router.get("/bonus/:salesmanId/:yearOfEvaluation", checkAuthorization(["admin"]), readBonusComputationSheet);
router.put("/bonus/:salesmanId/:yearOfEvaluation", checkAuthorization(["admin"]), updateBonusComputationSheet);
router.delete("/bonus/:salesmanId/:yearOfEvaluation", checkAuthorization(["admin"]), deleteBonusComputationSheet);

router.use("/hr",checkAuthorization(["hr"]), hrRouter);

export default router;

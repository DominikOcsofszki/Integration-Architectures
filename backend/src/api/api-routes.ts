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

const router = Router();

router.post('/login', login);
router.delete('/login', checkAuthorization(false), logout);
router.get('/login', isLoggedIn);

router.get('/user', checkAuthorization(false), getSelf);

router.get('/people', checkAuthorization(true), getPeople);

// REST-Interface for Salesman-CRUD
router.post('/salesman/create', checkAuthorization(false), createSalesman)
router.get('/salesman/read/:id', checkAuthorization(false), readSalesman)
router.put('/salesman/update', checkAuthorization(false), updateSalesman)
router.delete('/salesman/delete/:id', checkAuthorization(false), deleteSalesman)

// REST-Interface for BonusComputationSheet CRUD
router.post("/bonus", checkAuthorization(false), createBonusComputationSheet);
router.get("/bonus/:salesManId/:yearOfOrder", checkAuthorization(false), readBonusComputationSheet);
router.put("/bonus", checkAuthorization(false), updateBonusComputationSheet);
router.delete("/bonus", checkAuthorization(false), deleteBonusComputationSheet);

export default router;

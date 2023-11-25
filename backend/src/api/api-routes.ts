import { Router } from "express"
import { login, logout, isLoggedIn } from "./auth-api";
import { checkAuthorization } from "../middleware/auth-middleware";
import { getSelf } from "./user-api";
import { getPeople } from './people-demo-api';
import { createSalesman } from './salesman-api'

const router = Router();

router.post('/login', login);
router.delete('/login', checkAuthorization(false), logout);
router.get('/login', isLoggedIn);

router.get('/user', checkAuthorization(false), getSelf);

router.get('/people', checkAuthorization(true), getPeople);

// REST-Interface for Salesman-CRUD
router.post('/salesman/create', createSalesman)

export default router;

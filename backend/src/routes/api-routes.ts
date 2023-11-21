import { Router } from "express"
import { login, logout, isLoggedIn } from "../apis/auth-api";
import { checkAuthorization } from "../middlewares/auth-middleware";
import { getSelf } from "../apis/user-api";
import { getPeople } from '../apis/people-demo-api';

const router = Router();

router.post('/login', login);
router.delete('/login', checkAuthorization(false), logout); 
router.get('/login', isLoggedIn);

router.get('/user', checkAuthorization(false), getSelf);

router.get('/people', checkAuthorization(true), getPeople);

export default router;

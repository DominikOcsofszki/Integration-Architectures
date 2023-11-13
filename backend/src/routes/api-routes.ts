import { Router } from "express"
import { login, logout, isLoggedIn } from "../apis/auth-api";
import { checkAuthorization } from "../middlewares/auth-middleware";
import { getSelf } from "../apis/user-api";


const router = Router();

/*
    In this file is the routing for the REST-endpoints under /api managed
*/
router.post('/login', login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization(false), logout); //middlewares can be defined in parameters
router.get('/login', isLoggedIn); //the function, which handles requests is specified as the last parameter

router.get('/user', checkAuthorization(false), getSelf);

const peopleDemoApi = require('../apis/people-demo-api');
router.get('/people', checkAuthorization(false), peopleDemoApi.getPeople);
console.log("Router setup successful");

export default router;

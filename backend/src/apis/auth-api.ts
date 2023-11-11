const userService = require('../services/user-service')
const authService = require('../services/auth-service');
import { Router } from "express";
import { Request } from "express";
import { Response } from "express";
import { User } from "../models/User";

export default class UserApi {
    login(req: Request, res: Response): void {
        const db = req.app.get('db');//get database from express
    
        userService.verify(db, req.body).then((user: User) => { //verify credentials via user-service
            authService.authenticate(req.session, user); //mark session as authenticated
            res.send('login successful');
        }).catch(() =>{
            res.status(401).send('login failed');
        })
    }
    
    logout(req: Request, res: Response): void{
        authService.deAuthenticate(req.session); //destroy session
        res.send('logout successful');
    }
    
    isLoggedIn(req: Request, res: Response): void{
        if(authService.isAuthenticated(req.session)){ //check via auth-service
            res.send({loggedIn: true});
        }else {
            res.send({loggedIn: false});
        }
    }
}

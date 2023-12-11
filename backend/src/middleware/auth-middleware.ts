import { Request } from "express";
import { Response } from "express";
import { NextFunction } from 'express';
import { Session } from "../service/auth-service";
import { Role } from "../model/User";

export function checkAuthorization(role: [Role]) {
    return (req: Request, res: Response, next: NextFunction) => {
        let s = req.session as Session;
        console.log(s.user);
        if (req.session && s.authenticated) {
            //check if session was marked as authenticated
            if (s.user?.role == "admin" || s.user && (role.includes(s.user.role))) { //check if admin-requirement is met
                next(); //proceed with next middleware or handler
                return;
            }
        }
        res.status(401).send(); //intercept request
    }
}
import { Request } from "express";
import { Response } from "express";
import { NextFunction  } from 'express';
import { Session } from "../services/auth-service";

export function checkAuthorization(beAdmin: boolean){
    return (req: Request, res: Response, next: NextFunction ) => {
        let s = req.session as Session;
        if(req.session && s.authenticated){
             //check if session was marked as authenticated
            if(!beAdmin || (s.user && s.user.isAdmin)){ //check if admin-requirement is met
                next(); //proceed with next middleware or handler
                return;
            }
        }
        res.status(401).send(); //intercept request
    }
}
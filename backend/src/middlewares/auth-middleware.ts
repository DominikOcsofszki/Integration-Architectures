import { Request } from "express";
import { Response } from "express";
import { NextFunction  } from 'express';

export function checkAuthorization(beAdmin: boolean){
    return (req: Request, res: Response, next: NextFunction ) => {
        if(req.session && req.session.authenticated){ //check if session was marked as authenticated
            if(!beAdmin || req.session.user.isAdmin){ //check if admin-requirement is met
                next(); //proceed with next middleware or handler
                return;
            }
        }
        res.status(401).send(); //intercept request
    }
}
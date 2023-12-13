import { verify } from "../../service/user-service";
import {
    authenticate,
    isAuthenticated,
    deAuthenticate,
    Session,
} from "../../service/auth-service";
import { Request } from "express";
import { Response } from "express";
import { User } from "../../model/User";

export function login(req: Request, res: Response): void {
    verify(req.body)
        .then((user: User) => {
            //verify credentials via user-service
            authenticate(req.session as Session, user); //mark session as authenticated
            res.send("login successful");
        })
        .catch(() => {
            res.status(401).send("login failed");
        });
}

export function logout(req: Request, res: Response): void {
    deAuthenticate(req.session as Session); //destroy session
    res.send("logout successful");
}

export function isLoggedIn(req: Request, res: Response): void {
    if (isAuthenticated(req.session as Session)) {
        //check via auth-service
        res.send({ loggedIn: true });
    } else {
        res.send({ loggedIn: false });
    }
}

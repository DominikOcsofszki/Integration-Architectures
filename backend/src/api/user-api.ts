import { Request } from "express";
import { Response } from "express";
import { Session } from "../service/auth-service";

export async function getSelf(req: Request, res: Response) {
    if (req.session) {
        let s = req.session as Session;
        res.send(s.user);
    }
}
const peopleDemoService = require("../services/people-demo-service");
import { Request } from "express";
import { Response } from "express";
import { People } from "../models/People"

export function getPeople(req: Request, res: Response){

    peopleDemoService.getPeople().then((people: People) => {
        res.send(people);
    }).catch(() =>{
        res.status(500).send();
    })
}
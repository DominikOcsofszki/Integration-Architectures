import { UserModel } from "../../model/User";
import { hashPassword } from "../../service/user-service";
import { Request, Response } from "express";

export async function createSalesmanUser(req: Request, res: Response) {
    await UserModel.create({
        username: "Mops",
        firstname: "Otto",
        lastname: "Schmitz",
        email: "o.s@os.de",
        password: hashPassword("1234"),
        role: "salesman",
        salesmanId: 7,
    }).then(() => res.status(200).send("Created Otto"));
}
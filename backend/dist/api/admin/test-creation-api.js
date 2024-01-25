"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesmanUser = void 0;
const User_1 = require("../../model/User");
const user_service_1 = require("../../service/user-service");
async function createSalesmanUser(req, res) {
    await User_1.UserModel.create({
        username: "Mops",
        firstname: "Otto",
        lastname: "Schmitz",
        email: "o.s@os.de",
        password: (0, user_service_1.hashPassword)("1234"),
        role: "salesman",
        salesmanId: 7,
    }).then(() => res.status(200).send("Created Otto"));
}
exports.createSalesmanUser = createSalesmanUser;

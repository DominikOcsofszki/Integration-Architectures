
// copied from backend -- 20.01.24
import mongoose from "mongoose";

export type Role = "admin" | "salesman" | "hr" | "ceo" | "user";

export class User {
    _id: undefined;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    salesmanId?: number;
    role: Role;

    constructor(username: string, firstname: string, lastname: string, email: string, password: string, role: Role, salemanId?: number) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.salesmanId = salemanId;
    }
}

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    salesmanId: { type: Number }, //Is only needed for salesman
});

export const UserModel = mongoose.model("users", UserSchema);





// import {User,  Role} from "../../../../backend/src/model/User";
// export { User, Role};


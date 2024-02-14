

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

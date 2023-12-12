import mongoose from "mongoose";

export type Role = "admin"|"salesman"|"hr"|"ceo"|"user";

export interface User{
    _id: undefined;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    salesmanId?: number;
    role: Role;
}
    
export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required:true},
    salesmanId: {type: Number},//Is only needed for salesman
});

export const UserModel = mongoose.model("users",UserSchema);
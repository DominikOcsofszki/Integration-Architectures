import mongoose from "mongoose";

export class Salesman {
    id: number;
    firstname: string;
    lastname: string;
    department: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        department: string
    ) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.department = department;
    }

    toString() {
        return `
        id:${this.id},
        firstName: ${this.firstname},
        lastName: ${this.lastname},
        department:${this.department}`;
    }
}

export const SalesmanSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    department: { type: String, required: true },
});

export const SalesmanModel = mongoose.model("Salesman", SalesmanSchema);

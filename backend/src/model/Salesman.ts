export class Salesman {
    _id: number;
    firstName: String;
    lastName: String;
    email: String;
    constructor(id: number, firstName: String, lastName: String, email: String,) {
        this._id = id,
            this.firstName = firstName,
            this.lastName = lastName,
            this.email = email;
    }
    toString() {
        return `
        id:${this._id},
        firstName: ${this.firstName},
        lastName: ${this.lastName},
        email:${this.email}`;
    }
}
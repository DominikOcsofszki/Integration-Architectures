export class Salesman {
    id: number;
    firstName: String;
    lastName: String;
    department: String;

    constructor(id: number, firstName: String, lastName: String, department: String) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
    }

    toString() {
        return `
        id:${this.id},
        firstName: ${this.firstName},
        lastName: ${this.lastName},
        email:${this.department}`;
    }
}
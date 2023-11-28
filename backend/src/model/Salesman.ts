export class Salesman {
    id: number;
    firstname: String;
    lastname: String;
    department: String;

    constructor(id: number, firstName: String, lastName: String, department: String) {
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
        email:${this.department}`;
    }
}
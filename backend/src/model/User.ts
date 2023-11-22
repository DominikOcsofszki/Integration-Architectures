export class User{
    _id: undefined;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor(username: string, firstname: string, lastname: string, email: string, password: string, isAdmin: boolean) {
        this._id = undefined;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}
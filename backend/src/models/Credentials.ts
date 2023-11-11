/**
 * this model specifies the format to exchange credentials with the frontend
 * @param {string} username
 * @param {string} password
 */
export class Credentials{
    username: string;
    password: string;
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

module.exports = Credentials;
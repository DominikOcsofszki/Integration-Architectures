import crypto from "crypto";
import { Connection } from "mongoose"
import { User } from "../models/User";
import { Credentials } from "../models/Credentials";

const salt = 'integrationArchitectures';

exports.add = async function (db: Connection, user: User): Promise<any>{
    user.password = hashPassword(user.password);

    return (await db.collection('users').insertOne(user)).insertedId; //return unique ID
}


exports.get = async function (db: Connection, username: string): Promise<User | null> {
    return db.collection('users').findOne({ username: username }) as unknown as Promise<User>;
}


exports.verify = async function (db: Connection, credentials: Credentials){
    let user = await this.get(db, credentials.username); //retrieve user with given email from database

    if(!user) throw new Error('User was not found!'); //no user found -> throw error
    if(!verifyPassword(credentials.password, user.password)) throw new Error('Password wrong!');

    return user;
}

function hashPassword(password: string): string{
    let hash = crypto.createHmac('sha3-256', salt);
    hash.update(password);
    return hash.digest('base64');
}

function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash; //verify by comparing hashes
}
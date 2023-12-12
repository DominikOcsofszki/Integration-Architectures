import crypto from "crypto";
import { Connection } from "mongoose"
import { User } from "../model/User";
import { Credentials } from "../model/Credentials";
import { UserModel, UserSchema } from "../model/User";

const salt = 'integrationArchitectures';

// export async function add(db: Connection, user: typeof UserSchema): Promise<any> {
//     user.password = hashPassword(user.password);
//     return (await UserModel.create(user)); //return unique ID
// }

export async function verify(credentials: Credentials): Promise<User> {
    let user = await UserModel.findOne({ username: credentials.username }) as unknown as User;
    if (!user) throw new Error('User was not found!'); //no user found -> throw error
    if (!verifyPassword(credentials.password, user.password)) throw new Error('Password wrong!');
    return user;
}

export function hashPassword(password: string): string {
    let hash = crypto.createHmac('sha3-256', salt);
    hash.update(password);
    return hash.digest('base64');
}

function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash; //verify by comparing hashes
}
import { User } from "../model/User";


export type Session = {
    authenticated?: boolean
    user?: User
};


export function authenticate(session: Session, user: User) {
    session.authenticated = true;
    user.password = "";
    session.user = user;
}


export function isAuthenticated(session: Session) {
    return session.authenticated;
}

export function deAuthenticate(session: Session) {
    session.authenticated = false;
    session.user = undefined;
}
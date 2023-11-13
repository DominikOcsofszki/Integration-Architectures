import { User } from "../models/User";


export type Session  = {
    authenticated?: boolean
    user?: User
};


exports.authenticate = function (session: Session, user: User){
    session.authenticated = true;
    user.password = "";
    session.user = user;
}


exports.isAuthenticated = function (session: Session){
    return session.authenticated;
}

exports.deAuthenticate = function (session: Session){
    session.authenticated = false;
    session.user = undefined;
}
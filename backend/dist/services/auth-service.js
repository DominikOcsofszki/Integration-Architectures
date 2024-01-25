"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deAuthenticate = exports.isAuthenticated = exports.authenticate = void 0;
function authenticate(session, user) {
    session.authenticated = true;
    user.password = "";
    session.user = user;
}
exports.authenticate = authenticate;
function isAuthenticated(session) {
    return session.authenticated;
}
exports.isAuthenticated = isAuthenticated;
function deAuthenticate(session) {
    session.authenticated = false;
    session.user = undefined;
}
exports.deAuthenticate = deAuthenticate;

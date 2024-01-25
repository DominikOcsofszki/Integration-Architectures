"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.logout = exports.login = void 0;
const user_service_1 = require("../services/user-service");
const auth_service_1 = require("../services/auth-service");
function login(req, res) {
    const db = req.app.get('db'); //get database from express
    (0, user_service_1.verify)(db, req.body).then((user) => {
        (0, auth_service_1.authenticate)(req.session, user); //mark session as authenticated
        res.send('login successful');
    }).catch(() => {
        res.status(401).send('login failed');
    });
}
exports.login = login;
function logout(req, res) {
    (0, auth_service_1.deAuthenticate)(req.session); //destroy session
    res.send('logout successful');
}
exports.logout = logout;
function isLoggedIn(req, res) {
    if ((0, auth_service_1.isAuthenticated)(req.session)) { //check via auth-service
        res.send({ loggedIn: true });
    }
    else {
        res.send({ loggedIn: false });
    }
}
exports.isLoggedIn = isLoggedIn;

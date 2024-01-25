"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
function checkAuthorization(role) {
    return (req, res, next) => {
        let s = req.session;
        if (req.session && s.authenticated) {
            //check if session was marked as authenticated
            if (s.user?.role == "admin" ||
                (s.user && role.includes(s.user.role)) ||
                role.includes("user")) {
                //check if admin-requirement is met
                next(); //proceed with next middleware or handler
                return;
            }
        }
        res.status(401).send(); //intercept request
    };
}
exports.checkAuthorization = checkAuthorization;

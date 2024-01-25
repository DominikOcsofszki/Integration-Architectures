"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelf = void 0;
async function getSelf(req, res) {
    if (req.session) {
        let s = req.session;
        res.send(s.user);
    }
}
exports.getSelf = getSelf;

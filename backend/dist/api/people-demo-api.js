"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeople = void 0;
const peopleDemoService = require("../services/people-demo-service");
function getPeople(req, res) {
    peopleDemoService.getPeople().then((people) => {
        res.send(people);
    }).catch(() => {
        res.status(500).send();
    });
}
exports.getPeople = getPeople;

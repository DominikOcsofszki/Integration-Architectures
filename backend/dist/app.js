"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    This file acts as the entrypoint for node.js
 */
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const auth_api_1 = require("./api/user/auth-api");
const mongo_connector_1 = require("./connector/mongo-connector");
require("dotenv").config({ path: "./environment/.env" });
const upload = (0, multer_1.default)();
const app = (0, express_1.default)();
let environment;
if (process.env.NODE_ENV === "development") {
    environment = require("../environment/environment.js").default;
}
else {
    environment = require("../environment/environment.prod.js").default;
}
app.set("environment", environment);
app.use(express_1.default.json()); //adds support for json encoded bodies
app.use(express_1.default.urlencoded({ extended: true })); //adds support url encoded bodies
app.use((0, cors_1.default)({
    // origin: '*',
    origin: environment.corsOrigins,
    credentials: true,
}));
//app.use(upload.array()); //adds support multipart/form-data bodies
app.post("/login", auth_api_1.login);
app.use((0, cookie_session_1.default)({
    secret: crypto_1.default.randomBytes(32).toString("hex"),
    sameSite: false,
    secure: false,
    httpOnly: false,
}));
// app.listen(8080) //TODO this was added
// app.use(
//     cors()
// );
// app.use(
//     cors({
//         origin: environment.corsOrigins,
//         credentials: true,
//     })
// );
// /////////// old
//const apiRouter = require('./routes/api-routes'); //get api-router from routes/api
app.use("/api", api_1.default); //mount api-router at path "/api"
// !!!! attention all middlewares, mounted after the router wont be called for any requests
const connector = new mongo_connector_1.MongoConnector(app);

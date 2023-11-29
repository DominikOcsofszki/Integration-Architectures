/*
    This file acts as the entrypoint for node.js
 */
import express from "express";
import cookieSession from "cookie-session";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";

import { User } from "./model/User"
import apiRouter from './api/api-routes';
import { login } from "./api/auth-api";
import { add } from './service/user-service';
import { MongoConnector } from "./connector/mongo-connector"
import {getItemsFromHRM} from "./connector/hrm-connector";
import {getItemsCRX} from "./connector/crx-connector";
import {crxProductURL} from "./connector/tools-connector";

require('dotenv').config({path: "./environment/.env"});

const upload = multer();
const app = express();

let environment: any;
if (process.env.NODE_ENV === 'development') {
    environment = require('../environment/environment.js').default;
} else {
    environment = require('../environment/environment.prod.js').default;
}

app.set('environment', environment);

app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({ extended: true })); //adds support url encoded bodies
//app.use(upload.array()); //adds support multipart/form-data bodies

app.post("/login", login)

app.use(cookieSession({
    secret: crypto.randomBytes(32).toString('hex'),
    sameSite: false,
    secure: false,
    httpOnly: false
}));

app.use(cors({
    origin: environment.corsOrigins,
    credentials: true
}));

//const apiRouter = require('./routes/api-routes'); //get api-router from routes/api
app.use('/api', apiRouter); //mount api-router at path "/api"
// !!!! attention all middlewares, mounted after the router wont be called for any requests

const connector = new MongoConnector(app);

//Testing of OrangeHRM Api
function getSalesmanFromHRM(){
    const data = getItemsFromHRM("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search");
    data.then((value => {console.log(value)}))
}
getSalesmanFromHRM();

// Testing of OpenCRX Api
function getDataFromCRX(){
    const data = getItemsCRX(crxProductURL);
    data.then((value => {console.log(value)}))
}
getDataFromCRX();
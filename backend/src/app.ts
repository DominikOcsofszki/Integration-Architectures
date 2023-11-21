/*
    This file acts as the entrypoint for node.js
 */
import express from "express";
import cookieSession from "cookie-session";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";

import apiRouter from './routes/api-routes';
import { login } from "./apis/auth-api";
import { add } from './services/user-service';
import { MongoConnector } from "./connector/mongo-connector"

const upload = multer();
const app = express();

let environment: any;
if(process.env.NODE_ENV === 'development'){
    environment = require('../environments/environment.js').default;
}else{
    environment = require('../environments/environment.prod.js').default;
}

app.set('environment', environment);

app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({extended: true})); //adds support url encoded bodies
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
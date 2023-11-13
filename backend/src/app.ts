/*
    This file acts as the entrypoint for node.js
 */
import mongoose from "mongoose";
import express, {Request, Response} from "express";
import cookieSession from "cookie-session";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";

import apiRouter from './routes/api-routes';
import { login } from "./apis/auth-api";

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
console.log(apiRouter);
// !!!! attention all middlewares, mounted after the router wont be called for any requests

//preparing database credentials for establishing the connection:
let db_credentials = '';
if(environment.db.username){
    db_credentials = environment.db.username+':'+environment.db.password+'@';
}

const dbUri = 'mongodb://' + db_credentials + environment.db.host + ':' + environment.db.port + '/?authSource='+environment.db.authSource

// Connect to MongoDB using Mongoose
mongoose.connect(dbUri, {
    // auth: {
    //    authSource: environment.db.authSource,
    // },
    //user: environment.db.username, // Your MongoDB username
    //pass: environment.db.password, // Your MongoDB password
    });
  
const db: mongoose.Connection = mongoose.connection;
  
db.on('error', (err: Error) => {
    console.error('Mongoose connection error:', err);
});
  
db.once('open', async () => {
    console.log('Mongoose connected to MongoDB.');
  
    // You can run your initialization function here if needed
    await initDb(db);

    app.set('db', db);
  
    // Start your Express app after the database connection is established
    app.listen(environment.port, () => {
        console.log('Webserver started.');
    });
});

let schema = new mongoose.Schema({
    name: String,
    age: Number
});
  
let Model = mongoose.model("model", schema, "myCollection");

let doc1 = new Model({ name: "John", age: 21 });

console.log("App is running")

async function initDb(db: mongoose.Connection){
    if(await db.collection('users').count() < 1){ //if no user exists create admin user
        const userService = require('./services/user-service');
        const User = require("./models/User");

        const adminPassword = environment.defaultAdminPassword;
        await userService.add(db, new User('admin', '', 'admin', '', adminPassword, true));

        console.log('created admin user with password: '+adminPassword);
    }
}
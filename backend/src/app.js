/*
    This file acts as the entrypoint for node.js
 */

const express = require('express');
const cookieSession = require('cookie-session');

const multer = require('multer');
const upload = multer();
const app = express();
const crypto = require('crypto');
const cors = require('cors');

const mongoose = require('mongoose')

let environment;
if(process.env.NODE_ENV === 'development'){
    environment = require('../environments/environment.js').default;
}else{
    environment = require('../environments/environment.prod.js').default;
}

app.set('environment', environment);

app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({extended: true})); //adds support url encoded bodies
app.use(upload.array()); //adds support multipart/form-data bodies

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

const apiRouter = require('./routes/api-routes'); //get api-router from routes/api
app.use('/api', apiRouter); //mount api-router at path "/api"
// !!!! attention all middlewares, mounted after the router wont be called for any requests

//preparing database credentials for establishing the connection:
let db_credentials = '';
if(environment.db.username){
    db_credentials = environment.db.username+':'+environment.db.password+'@';
}

const dbUri = 'mongodb://' + db_credentials + environment.db.host + ':' + environment.db.port + '/?authSource='+environment.db.authSource

// Connect to MongoDB using Mongoose
mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    // auth: {
    //   authSource: environment.db.authSource,
    // },
    //user: environment.db.username, // Your MongoDB username
    //pass: environment.db.password, // Your MongoDB password
    });
  
const db = mongoose.connection;
  
db.on('error', (err) => {
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


async function initDb(db){
    if(await db.collection('users').count() < 1){ //if no user exists create admin user
        const userService = require('./services/user-service');
        const User = require("./models/User");

        const adminPassword = environment.defaultAdminPassword;
        await userService.add(db, new User('admin', '', 'admin', '', adminPassword, true));

        console.log('created admin user with password: '+adminPassword);
    }
}
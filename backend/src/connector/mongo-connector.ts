import { Express } from "express";
import mongoose, { Connection } from "mongoose";
import { User, UserModel, UserSchema } from "../model/User";
import { hashPassword } from "../service/user-service";

export class MongoConnector {
    app: Express
    db: Connection

    constructor(app: Express) {
        this.app = app;
        const environment = app.get("environment");
        let db_credentials = '';
        if (environment.db.username) {
            db_credentials = environment.db.username + ':' + environment.db.password + '@';
        }

        const dbUri = 'mongodb://' + db_credentials + environment.db.host + ':' + environment.db.port + "/" +  environment.db.name + '?authSource=' + environment.db.authSource;
        // Connect to MongoDB using Mongoose
        mongoose.connect(dbUri);

        this.db = mongoose.connection;

        this.db.on('error', (err: Error) => {
            console.error('Mongoose connection error:', err);
        });

        this.db.once('open', async () => {
            console.log('Mongoose connected to MongoDB.');
            this.initDb(this.db);
            app.set('db', this.db);
            app.listen(environment.port, () => {
                console.log('Webserver started');
                // logger.info('Webserver started');
            });
        });
        console.log('App is running');
        // logger.info("App is running");

        
    }   


    //@todo: How can I start this method?
    async initDb(db: Connection) {
        if (await db.collection('users').countDocuments() < 1) { //if no user exists create admin user
            const adminPassword = this.app.get("environment").defaultAdminPassword;
            await UserModel.create(
                {
                username:'admin',
                email: 'admin',
                firstname: '',
                lastname: '', 
                password: hashPassword(adminPassword),
                role: "admin"
                }
            );
            console.log('created admin user with password: ' + adminPassword);
        }
    }
}

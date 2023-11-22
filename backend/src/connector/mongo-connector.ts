import { Express } from "express";
import mongoose, { Connection } from "mongoose";
import { add } from "../service/user-service";
import { User } from "../model/User";

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

        const dbUri = 'mongodb://' + db_credentials + environment.db.host + ':' + environment.db.port + '/?authSource=' + environment.db.authSource

        // Connect to MongoDB using Mongoose
        mongoose.connect(dbUri);

        this.db = mongoose.connection;

        this.db.on('error', (err: Error) => {
            console.error('Mongoose connection error:', err);
        });

        this.db.once('open', async () => {
            console.log('Mongoose connected to MongoDB.');
            await this.initDb(this.db);
            app.set('db', this.db);
            app.listen(environment.port, () => {
                console.log('Webserver started.');
            });
        });
        console.log("App is running")
    }

    async initDb(db: Connection) {
        if (await db.collection('users').countDocuments() < 1) { //if no user exists create admin user
            const adminPassword = this.app.get("environment").defaultAdminPassword;
            await add(db, new User('admin', '', 'admin', '', adminPassword, true));
            console.log('created admin user with password: ' + adminPassword);
        }
    }
}

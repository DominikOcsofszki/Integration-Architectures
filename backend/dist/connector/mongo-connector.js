"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnector = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../model/User");
const user_service_1 = require("../service/user-service");
class MongoConnector {
    constructor(app) {
        this.app = app;
        const environment = app.get("environment");
        let db_credentials = "";
        if (environment.db.username) {
            db_credentials =
                environment.db.username + ":" + environment.db.password + "@";
        }
        const dbUri = "mongodb://" +
            db_credentials +
            environment.db.host +
            ":" +
            environment.db.port +
            "/" +
            environment.db.name +
            "?authSource=" +
            environment.db.authSource;
        // Connect to MongoDB using Mongoose
        mongoose_1.default.connect(dbUri);
        this.db = mongoose_1.default.connection;
        this.db.on("error", (err) => {
            console.error("Mongoose connection error:", err);
        });
        this.db.once("open", async () => {
            console.log("Mongoose connected to MongoDB.");
            this.initDb(this.db);
            app.set("db", this.db);
            app.listen(environment.port, () => {
                console.log("Webserver started");
                // logger.info('Webserver started');
            });
        });
        console.log("App is running");
        // logger.info("App is running");
    }
    //@todo: How can I start this method?
    async initDb(db) {
        if ((await db.collection("users").countDocuments()) < 1) {
            //if no user exists create admin user
            const adminPassword = this.app.get("environment").defaultAdminPassword;
            await User_1.UserModel.create({
                username: "admin",
                email: "admin",
                firstname: "",
                lastname: "",
                password: (0, user_service_1.hashPassword)(adminPassword),
                role: "admin",
            });
            console.log("created admin user with password: " + adminPassword);
        }
    }
}
exports.MongoConnector = MongoConnector;

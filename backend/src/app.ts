/*
    This file acts as the entrypoint for node.js
 */
import express from "express";
import cookieSession from "cookie-session";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";

import { User } from "./model/User";
import apiRouter from "./api";
import { login } from "./api/user/auth-api";
import { MongoConnector } from "./connector/mongo-connector";
import { getItemsFromHRM } from "./connector/hrm-connector";
import { getItemsCRX } from "./connector/crx-connector";
import { crxProductURL } from "./connector/tools-connector";
import { requestAndStoreSalesmanFromHRM } from "./service/salesman-service";
import { createLogger, transports } from "winston";
import {
    createOrderEvaluation,
    findSalesOrdersForSalesman,
} from "./service/salesorder-service";
import {createSheetsForAllSalesmen} from "./service/sheet-service";

require("dotenv").config({ path: "./environment/.env" });

const upload = multer();
const app = express();

let environment: any;
if (process.env.NODE_ENV === "development") {
    environment = require("../environment/environment.js").default;
} else {
    environment = require("../environment/environment.prod.js").default;
}

app.set("environment", environment);

app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({ extended: true })); //adds support url encoded bodies
//app.use(upload.array()); //adds support multipart/form-data bodies

app.post("/login", login);

app.use(
    cookieSession({
        secret: crypto.randomBytes(32).toString("hex"),
        sameSite: false,
        secure: false,
        httpOnly: false,
    })
);

app.use(
    cors({
        origin: environment.corsOrigins,
        // credentials: true,
    })
);
// app.use(
//     cors({
//         origin: environment.corsOrigins,
//         credentials: true,
//     })
// );
// /////////// old
//const apiRouter = require('./routes/api-routes'); //get api-router from routes/api
app.use("/api", apiRouter); //mount api-router at path "/api"
// !!!! attention all middlewares, mounted after the router wont be called for any requests

const connector = new MongoConnector(app);

//Testing of OrangeHRM Api
// requestAndStoreSalesmanFromHRM();

// Testing of OpenCRX Api
// getSalesmanFromCRX().then((object) => console.log(object));
// createOrderEvaluation(90124);
// async function test(){
//     const items = await getItemsCRX("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/L0NTAXG7TQTPM0EBHQA5MAZ7J");
//     console.log(items);
// }
// test();

// Testing creation of BonusComputationSheets
// createSheetsForAllSalesmen(2023);
// createOrderEvaluation(90124);

// export const logger = createLogger({
//     transports: [new transports.Console()],
// });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSheetsForAllSalesmen = void 0;
const salesman_service_1 = require("./salesman-service");
const salesorder_service_1 = require("./salesorder-service");
const SheetsDB_1 = require("../model/SheetsDB");
const BonusComputationSheet_1 = require("../model/BonusComputationSheet");
const dbReady = true;
async function createSheetsForAllSalesmen(year, db) {
    await (0, salesman_service_1.requestAndStoreSalesmanFromHRM)(db);
    const salesmanIds = await (0, salesman_service_1.getAllSalesmanIdsFromDB)();
    if (!dbReady) {
        fillDB(salesmanIds, year);
    }
    console.log(salesmanIds);
    let sheetIds = 1;
    for (const salesman of salesmanIds) {
        const orderEvaluation = await (0, salesorder_service_1.createOrderEvaluation)(salesman);
        console.log(`Order Evaluation for salesman ${salesman} created`);
        try {
            const socialPerformanceEvaluation = await getSocialPerformanceEvaluationFromDB(salesman, year);
            console.log(`SocialPerformanceEvaluation for salesman ${salesman} retrieved`);
            const bcs = new BonusComputationSheet_1.BonusComputationSheet(salesman, year, sheetIds++, socialPerformanceEvaluation, orderEvaluation);
            await db.collection("sheets").replaceOne({ id: bcs.id }, bcs, { upsert: true });
            console.log(`BonusComputationSheet for salesman ${salesman} stored`);
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log('BonusComputationSheet creation done');
}
exports.createSheetsForAllSalesmen = createSheetsForAllSalesmen;
async function getSocialPerformanceEvaluationFromDB(salesmanId, year) {
    const spe = await SheetsDB_1.RandomSocialPerformanceEvaluationModel
        .findOne({ salesmanId: salesmanId, year: year });
    if (spe === null) {
        throw new Error(`No socialPerformanceEvaluation found for salesman ${salesmanId}`);
    }
    else {
        return spe.socialPerformanceEvaluation;
    }
}
function fillDB(salesmanIds, year) {
    for (const id of salesmanIds) {
        (0, SheetsDB_1.generateRandomSheetDB)(id, year);
    }
}

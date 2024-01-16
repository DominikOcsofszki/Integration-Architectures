import { getAllSalesmanIdsFromDB, requestAndStoreSalesmanFromHRM } from "./salesman-service";
import { createOrderEvaluation } from "./salesorder-service";
import {
    generateRandomSheetDB,
    RandomSocialPerformanceEvaluation,
    RandomSocialPerformanceEvaluationModel
} from "../model/SheetsDB";
import {
    BonusComputationSheet,
    SocialPerformanceEvaluation
} from "../model/BonusComputationSheet";
import {Connection, Document} from "mongoose";

const dbReady: boolean = true;

export async function createSheetsForAllSalesmen(year: number, db: Connection) {
    await requestAndStoreSalesmanFromHRM();
    const salesmanIds: number[] = await getAllSalesmanIdsFromDB();
    if (!dbReady) {
        fillDB(salesmanIds, year);
    }
    console.log(salesmanIds);
    let sheetIds = 1;
    for (const salesman of salesmanIds) {
        const orderEvaluation = await createOrderEvaluation(salesman);
        console.log(`Order Evaluation for salesman ${salesman} created`);
        try {
            const socialPerformanceEvaluation = await getSocialPerformanceEvaluationFromDB(salesman, year);
            console.log(`SocialPerformanceEvaluation for salesman ${salesman} retrieved`);
            const bcs = new BonusComputationSheet(salesman, year, sheetIds++, socialPerformanceEvaluation, orderEvaluation);
            await db.collection("sheets").replaceOne({ id: bcs.id }, bcs, { upsert: true });
            console.log(`BonusComputationSheet for salesman ${salesman} stored`);
        } catch (e) {
            console.log(e);
        }
    }
    console.log('BonusComputationSheet creation done');
}

async function getSocialPerformanceEvaluationFromDB(salesmanId: number, year: number): Promise<SocialPerformanceEvaluation> {
    const spe = await RandomSocialPerformanceEvaluationModel
        .findOne({ salesmanId: salesmanId, year: year }) as Document & RandomSocialPerformanceEvaluation;
    if (spe === null) {
        throw new Error(`No socialPerformanceEvaluation found for salesman ${salesmanId}`);
    } else {
        return spe.socialPerformanceEvaluation;
    }
}

function fillDB(salesmanIds: number[], year: number) {
    for (const id of salesmanIds) {
        generateRandomSheetDB(id, year);
    }
}
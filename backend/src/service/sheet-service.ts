import {
    getAllSalesmanIdsFromDB,
    requestAndStoreSalesmanFromHRM,
} from "./salesman-service";
import { createOrderEvaluation } from "./salesorder-service";
import {
    generateRandomSheetDB,
    RandomSocialPerformanceEvaluation,
    RandomSocialPerformanceEvaluationModel,
} from "../model/SheetsDB";
import {
    BonusComputationSheet,
    BonusComputationSheetModel,
    SocialPerformanceEvaluation,
} from "../model/BonusComputationSheet";
import { Connection, Document } from "mongoose";
import { getItemsFromHRM, storeBonus } from "../connector/hrm-connector";
import {socialPerformanceBonus} from "./bonus-calculation-service";

const dbReady: boolean = true;

export async function createSheetsForAllSalesmen(year: number, db: Connection) {
    await requestAndStoreSalesmanFromHRM(db);
    const salesmanIds: number[] = await getAllSalesmanIdsFromDB();
    if (!dbReady) {
        fillDB(salesmanIds, year);
    }
    console.log(salesmanIds);
    for (const salesman of salesmanIds) {
        const orderEvaluation = await createOrderEvaluation(salesman);
        console.log(`Order Evaluation for salesman ${salesman} created`);
        try {
            const socialPerformanceEvaluation =
                await getSocialPerformanceEvaluationFromDB(salesman, year);
            console.log(
                `SocialPerformanceEvaluation for salesman ${salesman} retrieved`
            );
            const bcs = new BonusComputationSheet(
                salesman,
                year,
                socialPerformanceEvaluation,
                orderEvaluation
            );
            await BonusComputationSheetModel.replaceOne(
                {
                    salesmanId: bcs.salesmanId,
                    yearOfEvaluation: bcs.yearOfEvaluation,
                },
                bcs,
                { upsert: true }
            );
            console.log(
                `BonusComputationSheet for salesman ${salesman} stored`
            );
        } catch (e) {
            console.log(e);
        }
    }
    console.log("BonusComputationSheet creation done");
}

async function getSocialPerformanceEvaluationFromDB(
    salesmanId: number,
    year: number
): Promise<SocialPerformanceEvaluation> {
    const spe = (await RandomSocialPerformanceEvaluationModel.findOne({
        salesmanId: salesmanId,
        year: year,
    })) as Document & RandomSocialPerformanceEvaluation;
    if (spe === null) {
        throw new Error(
            `No socialPerformanceEvaluation found for salesman ${salesmanId}`
        );
    } else {
        return spe.socialPerformanceEvaluation;
    }
}

function fillDB(salesmanIds: number[], year: number) {
    for (const id of salesmanIds) {
        generateRandomSheetDB(id, year);
    }
}

export async function storeBonusInOrangeHRM(
    salesmanId: number,
    bonus: number,
    year: number
) {
    const response = await getItemsFromHRM(
        "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2"
    );
    const salesmen = response.data;
    for (const salesman of salesmen) {
        if (salesman.code == salesmanId) {
            await storeBonus(salesman.employeeId, bonus, year);
        }
    }
}

/**
 * Updates the socialPerformance bonus and total bonus of given sheet and returns it
 */
export function updateBonus(sheet: BonusComputationSheet) : BonusComputationSheet {
    let newBonus: number = 0;
    let newSheet: BonusComputationSheet = new BonusComputationSheet(sheet.salesmanId, sheet.yearOfEvaluation, sheet.socialPerformanceEvaluation, sheet.orderEvaluation, sheet.comment);
    for (const socialAttribute of newSheet.socialPerformanceEvaluation.socialAttributes) {
        socialAttribute.bonus = socialPerformanceBonus(socialAttribute.targetValue, socialAttribute.actualValue);
        newBonus += socialAttribute.bonus;
    }
    newSheet.socialPerformanceEvaluation.bonussum = newBonus;
    newSheet.totalBonus = newSheet.socialPerformanceEvaluation.bonussum + newSheet.orderEvaluation.bonussum;
    return newSheet;
}

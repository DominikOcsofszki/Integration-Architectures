import {getAllSalesmanIdsFromDB, requestAndStoreSalesmanFromHRM} from "./salesman-service";
import {createOrderEvaluation} from "./salesorder-service";
import {generateRandomSheetDB} from "../model/SheetsDB";

const dbReady: boolean = false;

export async function createSheetsForAllSalesmen(year: number){
    await requestAndStoreSalesmanFromHRM();
    const salesmanIds: number[] = await getAllSalesmanIdsFromDB();
    if (!dbReady) {
        fillDB(salesmanIds, year);
    }
    console.log(salesmanIds);
    for (const salesman of salesmanIds){
        const orderEvaluation = await createOrderEvaluation(salesman);
        console.log(salesman + ": " + orderEvaluation);
    }
}

function fillDB(salesmanIds: number[], year: number){
    for (const id of salesmanIds){
        generateRandomSheetDB(id, year);
    }
}
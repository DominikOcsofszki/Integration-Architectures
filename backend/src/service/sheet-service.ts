import {getAllSalesmanIdsFromDB, requestAndStoreSalesmanFromHRM} from "./salesman-service";

const dbReady: boolean = false;

export async function createSheetsForAllSalesmen(year: number){
    await requestAndStoreSalesmanFromHRM();
    const salesmanIds: number[] = await getAllSalesmanIdsFromDB();
    if (!dbReady) {
        fillDB(salesmanIds)
    }
    console.log(salesmanIds);
}

function fillDB(salesmanIds: number[]){
    for (const id of salesmanIds){
        //methode von dominik(id)
    }
}
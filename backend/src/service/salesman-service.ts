import {getItemsFromHRM} from "../connector/hrm-connector";
import {Salesman, SalesmanModel} from "../model/Salesman";

/**
 * function to request salesmen from OrangeHRM and store each of them into the database
 */
export async function requestAndStoreSalesmanFromHRM(){
    const response = await getItemsFromHRM("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2");
    const salesmen = response.data;
    const salesmenList: Salesman[] = [];
    salesmen.forEach((salesman: any) => {
        const salesmanEntity: Salesman = new Salesman(salesman.code, salesman.firstName, salesman.lastName, salesman.unit);
        salesmenList.push(salesmanEntity);
    })
    await storeSalesmen(salesmenList);
    console.log("Salesmen stored in database");
}

/**
 * function to store list of salesmen in database
 * @param salesmen
 */
async function storeSalesmen(salesmen: Salesman[]){
    for (const element of salesmen){
        SalesmanModel.replaceOne({id: element.id}, element, {upsert: true})
        console.log(`Salesman with id ${element.id} inserted`);
    }
}

/**
 * Returns list of all ids of salesmen in the database
 */
export async function getAllSalesmanIdsFromDB(): Promise<number[]>{
    const salesmanIds: number[] = [];
     await SalesmanModel.find({}).then((salesmen) => {
         salesmen.forEach((salesman) => {salesmanIds.push(salesman.id)})
    })
    return salesmanIds;
}
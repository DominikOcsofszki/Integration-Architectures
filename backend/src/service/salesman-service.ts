import {getItemsFromHRM} from "../connector/hrm-connector";
import {createSalesman} from "./factory/SalesmanFactory";
import {SalesmanModel} from "../model/Salesman";

/**
 * function to request salesmen from OrangeHRM and store each of them into the database
 */
export async function requestAndStoreSalesmanFromHRM(){
    console.log("start")
    const data = await getItemsFromHRM("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2");
    const salesmen = data.data;
    salesmen.forEach((element: any) => {
        createSalesman(parseInt(element.code), element.firstName, element.lastName, element.unit);
        console.log("in creating for salesman")
    });
    console.log("fertig")
}

export async function getAllSalesmanIdsFromDB(): Promise<number[]>{
    const salesmanIds: number[] = [];
     await SalesmanModel.find({}).then((salesmen) => {
         salesmen.forEach((salesman) => {salesmanIds.push(salesman.id)})
    })
    return salesmanIds;
}
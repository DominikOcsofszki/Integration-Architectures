import {getItemsFromHRM} from "../connector/hrm-connector";
import {createSalesman} from "./factory/SalesmanFactory";

export function getSalesmanFromHRM(){
    const data = getItemsFromHRM("https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2");
    data.then((value => {
        const salesmen = value.data;
        salesmen.forEach((element: any) => {
            createSalesman(parseInt(element.code), element.firstName, element.lastName, element.unit);
        });
    }))
}
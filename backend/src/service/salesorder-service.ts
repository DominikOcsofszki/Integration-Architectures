import {getItemsCRX} from "../connector/crx-connector";
import {all} from "axios";

export function getSalesorderFromCRX(){
    const allSalesorders = getItemsCRX("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder");
    allSalesorders.then((salesOrders) => {
        const salesOrderUrl = salesOrders[0]['@href'];
        console.log(salesOrderUrl);
        const customerUrl = salesOrders[0].customer['@href'];
        console.log(customerUrl);
        const salesmanUrl = salesOrders[0].salesRep['@href'];
        const assignedSalesman = getItemsCRX(salesmanUrl);
        assignedSalesman.then((salesman) => {
            // const salesmanId = salesman.governmentId;
            console.log(salesman);
        })
        console.log(salesmanUrl);
    })
}
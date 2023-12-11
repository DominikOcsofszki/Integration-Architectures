import {getItemsCRX} from "../connector/crx-connector";


export async function createOrderEvaluation(salesmanId: number){
    const salesOrders = await findSalesOrdersForSalesman(salesmanId);
    const allCustomers = await getAllCustomerFromCRX();
    salesOrders.forEach((salesOrder: any) => {
        const client = findClientNameForSalesorder(salesOrder, allCustomers);
        const clientRanking = getClientRankingForClient(client, allCustomers);
        console.log(salesOrder.name + ' Client: ' + client + ' ClientRanking: ' + clientRanking);
    })
}

function getClientRankingForClient(client: string, allCustomers: any[]): number{
    for (const customer of allCustomers){
        if (client === customer['name']){
            return parseInt(customer['accountRating']);
        }
    }
    return -1;
}

function findClientNameForSalesorder(salesOrder: any, allCustomers: any[]): string{
    for (const customer of allCustomers){
        if (customer['@href'] === salesOrder.customer['@href']){
            return customer['name'];
        }
    }
    return 'No matching client found';
}

export async function findSalesOrdersForSalesman(salesmanId: number){
    const salesmanUrls = await getSalesmanFromCRX();
    const allSalesOrders = await getSalesordersFromCRX();
    return getSalesordersForSalesman(allSalesOrders, salesmanUrls[salesmanId]);
}

export async function getSalesmanFromCRX(){
    return new Promise<{ [key: number]: string }>((resolve, reject) => {
        const salesman = getItemsCRX("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:Contact");
        let salesmanUrls: { [key: number]: string } = {};
        salesman.then((salesmen) => {
            salesmen.objects.forEach((salesman: any) => {
                if (salesman.governmentId != undefined){
                    const salesmanId = parseInt(salesman.governmentId);
                    salesmanUrls[salesmanId] = salesman['@href'] as string;
                }
            })
            resolve(salesmanUrls);
        }).catch((reason) => {reject(reason)});
    })
}

async function getSalesordersFromCRX(): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
        const allSalesorders = getItemsCRX("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder");
        allSalesorders.then((salesOrders) => {
            const allSalesordersAsList = salesOrders.objects as object[];
            resolve(allSalesordersAsList);
        }).catch((reason) => {
            reject(reason)
        });
    })
}

function getSalesordersForSalesman(salesOrders: any[], salesmanUrl: string) {
    const assignedSalesOrders: object[] = [];
    for (const salesOrder of salesOrders) {
        if (salesOrder.salesRep['@href'] as string === salesmanUrl){
            assignedSalesOrders.push(salesOrder);
        }
    }
    return assignedSalesOrders;
}

async function getAllCustomerFromCRX(){
    return new Promise<any[]>((resolve, reject) => {
        const allCustomer = getItemsCRX("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:LegalEntity");
        allCustomer.then((customers) => {
            const allCustomersAsList = customers.objects;
            resolve(allCustomersAsList);
        }).catch((reason) => {
            reject(reason)
        });
    })
}
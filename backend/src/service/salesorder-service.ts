import { getItemsCRX } from "../connector/crx-connector";
import { createOrder } from "./factory/OrderFactory";

export async function createOrderEvaluation(salesmanId: number) {
    const salesOrders = await findSalesOrdersForSalesman(salesmanId);
    const allCustomers = await getAllCustomersFromCRX();
    for (const salesOrder of salesOrders) {
        const client = findClientNameForSalesorder(salesOrder, allCustomers);
        const clientRanking = getClientRankingForClient(client, allCustomers);
        // console.log(salesOrder.name + ' Client: ' + client + ' ClientRanking: ' + clientRanking);

        const positions = await getPositionsOfSalesOrder(salesOrder);

        try {
            for (const position of positions) {
                const price = position.pricePerUnit;
                const itemAmount = position.quantity;
                const productUrl = position["product"]["@href"] as string;
                const productname = await getProductnameOfPostion(productUrl);
                // console.log('price: ' + price + ' itemAmount: ' + itemAmount + ' productname: ' + productname);
                createOrder(
                    productname,
                    client,
                    clientRanking as 1 | 2 | 3 | 4 | 5,
                    itemAmount,
                    price
                );
            }
        } catch {
            // console.log("No positions found");
        }
    }
}

/**
 * function to get the productname of corresponding product ressource in OpenCRX
 * @param productUrl endpoint for the product in OpenCRX
 */
async function getProductnameOfPostion(productUrl: string) {
    return new Promise<string>((resolve, reject) => {
        const product = getItemsCRX(productUrl);
        product.then((product) => {
            resolve(product["name"]);
        });
        product.catch((reason) => {
            reject(reason);
        });
    });
}

/**
 * function to get all positions of a salesorder in OpenCRX
 * @param salesOrder salesorder object retrieved from OpenCRX
 */
async function getPositionsOfSalesOrder(salesOrder: any) {
    return new Promise<any[]>((resolve, reject) => {
        const salesOrderURl = salesOrder["@href"];
        const positions = getItemsCRX(salesOrderURl + "/position");
        positions.then((positions) => {
            if (positions != undefined) {
                resolve(positions.objects);
            } else {
                reject("No positions for salesorder");
            }
        });
        positions.catch((reason) => {
            reject(reason);
        });
    });
}

/**
 * Returns the clientRanking of given client in allCustomers; -1 if client is not found in allCustomers
 * @param client name of client the ranking is needed
 * @param allCustomers list of all clients retrieved from OpenCRX
 */
function getClientRankingForClient(
    client: string,
    allCustomers: any[]
): number {
    for (const customer of allCustomers) {
        if (client === customer["name"]) {
            return parseInt(customer["accountRating"]);
        }
    }
    return -1;
}

/**
 * function to get the client's name for given salesorder
 * @param salesOrder salesOrder object retrieved from OpenCRX
 * @param allCustomers list of all clients retrieved from OpenCRX
 */
function findClientNameForSalesorder(
    salesOrder: any,
    allCustomers: any[]
): string {
    for (const customer of allCustomers) {
        if (customer["@href"] === salesOrder.customer["@href"]) {
            return customer["name"];
        }
    }
    return "No matching client found";
}

/**
 * returns a list of all assigned salesorders for given salesman in OpenCRX
 * @param salesmanId id of salesman
 */
export async function findSalesOrdersForSalesman(salesmanId: number) {
    const salesmanUrls = await getSalesmanFromCRX();
    const allSalesOrders = await getSalesordersFromCRX();
    return getSalesordersForSalesman(allSalesOrders, salesmanUrls[salesmanId]);
}

/**
 * Returns an object that maps all salesman id's that exist in OpenCRX to their corresponding ressource URL
 * object is used to request the salesman api once and not for every salesorder
 */
export async function getSalesmanFromCRX() {
    return new Promise<{ [key: number]: string }>((resolve, reject) => {
        const salesman = getItemsCRX(
            "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:Contact"
        );
        let salesmanUrls: { [key: number]: string } = {};
        salesman
            .then((salesmen) => {
                salesmen.objects.forEach((salesman: any) => {
                    if (salesman.governmentId != undefined) {
                        const salesmanId = parseInt(salesman.governmentId);
                        salesmanUrls[salesmanId] = salesman["@href"] as string;
                    }
                });
                resolve(salesmanUrls);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}

/**
 * Returns a list of all salesorders from OpenCRX
 */
async function getSalesordersFromCRX(): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
        const allSalesorders = getItemsCRX(
            "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder"
        );
        allSalesorders
            .then((salesOrders) => {
                const allSalesordersAsList = salesOrders.objects as object[];
                resolve(allSalesordersAsList);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}

/**
 * Returns all salesorders which belong to given salesman
 * @param salesOrders list of salesorders retrieved from OpenCRX
 * @param salesmanUrl ressource url for specific salesman in OpenCRX
 */
function getSalesordersForSalesman(salesOrders: any[], salesmanUrl: string) {
    const assignedSalesOrders: any[] = [];
    for (const salesOrder of salesOrders) {
        if ((salesOrder.salesRep["@href"] as string) === salesmanUrl) {
            assignedSalesOrders.push(salesOrder);
        }
    }
    return assignedSalesOrders;
}

/**
 * Returns list of all customers from OpenCRX (accounts with type LegalEntity)
 */
async function getAllCustomersFromCRX() {
    return new Promise<any[]>((resolve, reject) => {
        const allCustomer = getItemsCRX(
            "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:LegalEntity"
        );
        allCustomer
            .then((customers) => {
                const allCustomersAsList = customers.objects;
                resolve(allCustomersAsList);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}

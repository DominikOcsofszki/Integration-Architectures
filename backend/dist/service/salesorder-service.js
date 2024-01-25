"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesmanFromCRX = exports.findSalesOrdersForSalesman = exports.createOrderEvaluation = void 0;
const crx_connector_1 = require("../connector/crx-connector");
const OrderFactory_1 = require("./factory/OrderFactory");
const BonusComputationSheet_1 = require("../model/BonusComputationSheet");
async function createOrderEvaluation(salesmanId) {
    const orders = [];
    const salesOrders = await findSalesOrdersForSalesman(salesmanId);
    const allCustomers = await getAllCustomersFromCRX();
    for (const salesOrder of salesOrders) {
        const client = findClientNameForSalesorder(salesOrder, allCustomers);
        const clientRanking = getClientRankingForClient(client, allCustomers);
        const positions = await getPositionsOfSalesOrder(salesOrder);
        try {
            for (const position of positions) {
                const price = position.pricePerUnit;
                const itemAmount = position.quantity;
                const productUrl = position["product"]["@href"];
                const productname = await getProductnameOfPostion(productUrl);
                const order = (0, OrderFactory_1.createOrder)(productname, client, clientRanking, itemAmount, price);
                orders.push(order);
            }
        }
        catch {
            console.log("No positions found");
        }
    }
    return new BonusComputationSheet_1.OrderEvaluation(orders);
}
exports.createOrderEvaluation = createOrderEvaluation;
/**
 * function to get the productname of corresponding product ressource in OpenCRX
 * @param productUrl endpoint for the product in OpenCRX
 */
async function getProductnameOfPostion(productUrl) {
    return new Promise((resolve, reject) => {
        const product = (0, crx_connector_1.getItemsCRX)(productUrl);
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
async function getPositionsOfSalesOrder(salesOrder) {
    return new Promise((resolve, reject) => {
        const salesOrderURl = salesOrder["@href"];
        const positions = (0, crx_connector_1.getItemsCRX)(salesOrderURl + "/position");
        positions.then((positions) => {
            if (positions != undefined) {
                resolve(positions.objects);
            }
            else {
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
function getClientRankingForClient(client, allCustomers) {
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
function findClientNameForSalesorder(salesOrder, allCustomers) {
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
async function findSalesOrdersForSalesman(salesmanId) {
    const salesmanUrls = await getSalesmanFromCRX();
    const allSalesOrders = await getSalesordersFromCRX();
    return getSalesordersForSalesman(allSalesOrders, salesmanUrls[salesmanId]);
}
exports.findSalesOrdersForSalesman = findSalesOrdersForSalesman;
/**
 * Returns an object that maps all salesman id's that exist in OpenCRX to their corresponding ressource URL
 * object is used to request the salesman api once and not for every salesorder
 */
async function getSalesmanFromCRX() {
    return new Promise((resolve, reject) => {
        const salesman = (0, crx_connector_1.getItemsCRX)("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:Contact");
        let salesmanUrls = {};
        salesman
            .then((salesmen) => {
            salesmen.objects.forEach((salesman) => {
                if (salesman.governmentId != undefined) {
                    const salesmanId = parseInt(salesman.governmentId);
                    salesmanUrls[salesmanId] = salesman["@href"];
                }
            });
            resolve(salesmanUrls);
        })
            .catch((reason) => {
            reject(reason);
        });
    });
}
exports.getSalesmanFromCRX = getSalesmanFromCRX;
/**
 * Returns a list of all salesorders from OpenCRX
 */
async function getSalesordersFromCRX() {
    return new Promise((resolve, reject) => {
        const allSalesorders = (0, crx_connector_1.getItemsCRX)("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder");
        allSalesorders
            .then((salesOrders) => {
            const allSalesordersAsList = salesOrders.objects;
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
function getSalesordersForSalesman(salesOrders, salesmanUrl) {
    const assignedSalesOrders = [];
    for (const salesOrder of salesOrders) {
        if (salesOrder.salesRep["@href"] === salesmanUrl) {
            assignedSalesOrders.push(salesOrder);
        }
    }
    return assignedSalesOrders;
}
/**
 * Returns list of all customers from OpenCRX (accounts with type LegalEntity)
 */
async function getAllCustomersFromCRX() {
    return new Promise((resolve, reject) => {
        const allCustomer = (0, crx_connector_1.getItemsCRX)("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:LegalEntity");
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

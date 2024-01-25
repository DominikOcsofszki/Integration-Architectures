"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const BonusComputationSheet_1 = require("../../model/BonusComputationSheet");
const bonus_calculation_service_1 = require("../bonus-calculation-service");
/**
 * Creates an Order for an OrderEvaluation. Bonus is calculated and comment is an empty string
 */
function createOrder(productname, client, clientRanking, itemamount, price) {
    const bonus = (0, bonus_calculation_service_1.orderEvaluationBonus)(clientRanking, price, itemamount);
    return new BonusComputationSheet_1.Order(productname, client, clientRanking, bonus, itemamount, price);
}
exports.createOrder = createOrder;

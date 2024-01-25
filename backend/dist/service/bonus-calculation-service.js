"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderEvaluationBonus = exports.socialPerformanceBonus = void 0;
function socialPerformanceBonus(targetValue, actualValue) {
    const objectMap = {
        "-5": 0,
        "-4": 0,
        "-3": 0,
        "-2": 10,
        "-1": 20,
        "0": 50,
        "1": 100,
        "2": 125,
        "3": 150,
        "4": 150,
        "5": 150,
    };
    return objectMap[actualValue - targetValue];
}
exports.socialPerformanceBonus = socialPerformanceBonus;
function orderEvaluationBonus(clientRanking, price, nrOfItems) {
    return ((price * nrOfItems) / 10) * (1 + (5 - clientRanking) / 10);
}
exports.orderEvaluationBonus = orderEvaluationBonus;

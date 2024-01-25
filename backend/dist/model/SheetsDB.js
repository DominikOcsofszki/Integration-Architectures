"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSheetDB = exports.RandomSocialPerformanceEvaluationModel = exports.RandomSocialPerformanceEvaluationSchema = exports.RandomSocialPerformanceEvaluation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BonusComputationSheet_1 = require("./BonusComputationSheet");
const bonus_calculation_service_1 = require("../service/bonus-calculation-service");
class RandomSocialPerformanceEvaluation {
    constructor(salesmanId, year, socialPerformanceEvaluation) {
        this.salesmanId = salesmanId;
        this.year = year;
        this.socialPerformanceEvaluation = socialPerformanceEvaluation;
    }
}
exports.RandomSocialPerformanceEvaluation = RandomSocialPerformanceEvaluation;
exports.RandomSocialPerformanceEvaluationSchema = new mongoose_1.default.Schema({
    salesmanId: { type: Number, required: true },
    year: { type: Number, required: true },
    socialPerformanceEvaluation: { type: BonusComputationSheet_1.SocialPerformanceEvaluationSchema, required: true }
});
exports.RandomSocialPerformanceEvaluationModel = mongoose_1.default.model("evaluations", exports.RandomSocialPerformanceEvaluationSchema);
function randomSocialPerformanceEvaluation() {
    return new BonusComputationSheet_1.SocialPerformanceEvaluation(generateAllSocialAttributes());
}
function yearOfSheet(year = 2023) {
    return year;
}
function randomSocialAttribute(socialAttributeName) {
    const targetValue = randomIn0to4();
    const actualValue = randomIn0to4();
    return new BonusComputationSheet_1.SocialAttribute(targetValue, actualValue, socialAttributeName, (0, bonus_calculation_service_1.socialPerformanceBonus)(targetValue, actualValue));
}
function randomIn0to4() {
    return Math.floor(Math.random() * 5);
}
const socialAttributeNames = [
    "Leadership Competence",
    "Openness to Employee",
    "Social Behavior to Employee",
    "Attitude towards Client",
    "Communication Skills",
    "Integrity to Company"
];
function generateAllSocialAttributes() {
    const socialAttributeNamesArr = [];
    socialAttributeNames.forEach((element) => {
        socialAttributeNamesArr.push(randomSocialAttribute(element));
    });
    return socialAttributeNamesArr;
}
function generateRandomSheetDB(id, year) {
    const sheet = new RandomSocialPerformanceEvaluation(id, year, randomSocialPerformanceEvaluation());
    console.log(sheet);
    new exports.RandomSocialPerformanceEvaluationModel(sheet).save();
}
exports.generateRandomSheetDB = generateRandomSheetDB;

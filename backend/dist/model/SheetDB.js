"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSheetDB = exports.SheetDBModel = exports.SheetDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BonusComputationSheet_1 = require("./BonusComputationSheet");
const SocialAttributeSchemaFillDB = new mongoose_1.default.Schema({
    comment: { type: String },
    targetValue: { type: Number, required: true },
    actualValue: { type: Number, required: true },
    socialAttributeName: { type: String, required: true },
    bonus: { type: Number },
});
const SocialPerformanceEvaluationSchemaFillDB = new mongoose_1.default.Schema({
    socialAttributes: { type: [SocialAttributeSchemaFillDB], required: true },
    bonussum: { type: Number, required: true },
});
exports.SheetDB = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    salesManId: { type: Number, required: true },
    yearOfEvaluation: { type: Number, required: true },
    // totalBonus: { type: Number, required: true },
    // status: { type: String, required: true },
    socialPerformanceEvaluation: { type: SocialPerformanceEvaluationSchemaFillDB, required: true },
});
exports.SheetDBModel = mongoose_1.default.model("sheetsDBFill", exports.SheetDB);
function randomSocialPerformanceEvaluation(passedId) {
    return {
        yearOfEvaluation: yearOfSheet(),
        status: "null",
        id: passedId,
        socialAttributes: generateAllSocialAttributes(),
        bonussum: 0,
    };
}
function yearOfSheet(year = 2023) {
    return year;
}
function randomSocialAttribute(socialAttributeName) {
    return {
        comment: "null",
        targetValue: randomIn0to4(),
        actualValue: randomIn0to4(),
        socialAttributeName: socialAttributeName,
        bonus: 0,
    };
}
function randomIn0to4() {
    return Math.floor(Math.random() * 5);
}
function generateAllSocialAttributes() {
    const socialAttributeNamesArr = [];
    BonusComputationSheet_1.socialAttributeNames.forEach(element => {
        socialAttributeNamesArr.push(randomSocialAttribute(element));
    });
    return socialAttributeNamesArr;
}
function generateRandomSheetDB(id) {
    return randomSocialPerformanceEvaluation(id);
}
exports.generateRandomSheetDB = generateRandomSheetDB;
const randomSheet = generateRandomSheetDB(1);
console.log(randomSheet);

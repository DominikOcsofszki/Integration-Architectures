import mongoose from "mongoose";
// import { socialAttributeNames } from "./BonusComputationSheet";

export interface SocialPerformanceEvaluation {
    yearOfEvaluation: number;
    id: number;
    // status: string; //define it better
    socialAttributes: [SocialAttribute];
    bonussum: number;
}
export interface SocialPerformanceEvaluation {
    socialAttributes: [SocialAttribute];
    bonussum: number;
}

export interface SocialPerformanceWithId {
    socialPerformanceEvaluation: SocialPerformanceEvaluation;
    yearOfEvaluation: number;
    salesmanId: number;
    // status: string; //define it better
    // socialAttributes: [SocialAttribute]
    // bonussum: number;
}

export interface SocialAttribute {
    comment: string;
    targetValue: number;
    actualValue: number;
    socialAttributeName: string;
    bonus: number;
}

const SocialAttributeSchemaFillDB = new mongoose.Schema({
    comment: { type: String },
    targetValue: { type: Number, required: true },
    actualValue: { type: Number, required: true },
    socialAttributeName: { type: String, required: true },
    bonus: { type: Number },
});

const SocialPerformanceEvaluationSchemaFillDB = new mongoose.Schema({
    socialAttributes: { type: [SocialAttributeSchemaFillDB], required: true },
    bonussum: { type: Number, required: true },
});

export const SheetDB = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    salesManId: { type: Number, required: true },
    yearOfEvaluation: { type: Number, required: true },
    // totalBonus: { type: Number, required: true },
    // status: { type: String, required: true },
    socialPerformanceEvaluation: {
        type: SocialPerformanceEvaluationSchemaFillDB,
        required: true,
    },
});

export const SheetDBModel = mongoose.model("sheetsDBFill", SheetDB);

function randomSocialPerformanceEvaluation(
    passedId: number
): SocialPerformanceEvaluation {
    return {
        yearOfEvaluation: yearOfSheet(),
        // status: "null",
        id: passedId,
        socialAttributes: generateAllSocialAttributes(),
        bonussum: 0,
    };
}
function yearOfSheet(year: number = 2023): number {
    return year;
}
function randomSocialAttribute(socialAttributeName: string): SocialAttribute {
    return {
        comment: "null",
        targetValue: randomIn0to4(),
        actualValue: randomIn0to4(),
        socialAttributeName: socialAttributeName,
        bonus: 0,
    };
}
function randomIn0to4(): number {
    return Math.floor(Math.random() * 5);
}
const socialAttributeNames: string[] = ["1", "2", "3", "4", "5"];
function generateAllSocialAttributes(): [SocialAttribute] {
    const socialAttributeNamesArr: any = [];
    socialAttributeNames.forEach((element) => {
        socialAttributeNamesArr.push(randomSocialAttribute(element));
    });
    return socialAttributeNamesArr;
}

export function generateRandomSheetDB(id: number): SocialPerformanceEvaluation {
    return randomSocialPerformanceEvaluation(id);
}

const randomSheet = generateRandomSheetDB(10);
console.log(randomSheet);

import mongoose from "mongoose";
import {SocialAttribute, SocialPerformanceEvaluation, SocialPerformanceEvaluationSchema} from "./BonusComputationSheet";

class RandomSocialPerformanceEvaluation {
    salesmanId: number;
    year: number;
    socialPerformanceEvaluation: SocialPerformanceEvaluation;

    constructor(salesmanId: number, year: number, socialPerformanceEvaluation: SocialPerformanceEvaluation) {
        this.salesmanId = salesmanId;
        this.year = year;
        this.socialPerformanceEvaluation = socialPerformanceEvaluation;
    }
}

export const RandomSocialPerformanceEvaluationSchema = new mongoose.Schema({
    salesmanId: { type: Number, required: true },
    year: { type: Number, required: true },
    socialPerformanceEvaluation: {type: SocialPerformanceEvaluationSchema, required: true}
});

export const RandomSocialPerformanceEvaluationModel = mongoose.model("evaluations", RandomSocialPerformanceEvaluationSchema);

function randomSocialPerformanceEvaluation(): SocialPerformanceEvaluation {
    return new SocialPerformanceEvaluation(generateAllSocialAttributes());
}
function yearOfSheet(year: number = 2023): number {
    return year;
}
function randomSocialAttribute(socialAttributeName: string): SocialAttribute {
    return new SocialAttribute(randomIn0to4(), randomIn0to4(), socialAttributeName, 0);
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

export function generateRandomSheetDB(id: number, year: number) {
    const sheet = new RandomSocialPerformanceEvaluation(id, year, randomSocialPerformanceEvaluation());
    console.log(sheet);
    new RandomSocialPerformanceEvaluationModel(sheet).save();
}

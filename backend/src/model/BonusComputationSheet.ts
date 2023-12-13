import mongoose from "mongoose";

export interface BonusComputationSheet {
    socialPerformanceEvaluation: SocialPerformanceEvaluation;
    orderEvaluation: OrderEvaluation;
    salesmanId: number;
    totalBonus: number;
    yearOfEvaluation: number;
    id: number;
    status: Status;
    comment?: string;
}

export interface OrderEvaluation {
    orders: [Order];
    bonussum: number;
}

export interface Order {
    productname: string;
    client: string;
    clientRanking: ClientRanking;
    bonus: number;
    itemamount: number;
    comment?: string;
    price: number;
}

export interface SocialPerformanceEvaluation {
    socialAttributes: [SocialAttribute];
    bonussum: number;
}

export interface SocialAttribute {
    comment?: string;
    targetValue: number;
    actualValue: number;
    socialAttributeName: string;
    bonus: number;
}

const SocialAttributeSchema = new mongoose.Schema({
    comment: { type: String },
    targetValue: { type: Number, required: true },
    actualValue: { type: Number, required: true },
    socialAttributeName: { type: String, required: true },
    bonus: { type: Number, required: true },
});

const SocialPerformanceEvaluationSchema = new mongoose.Schema({
    socialAttributes: { type: [SocialAttributeSchema], required: true },
    bonussum: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    client: { type: String, required: true },
    clientRanking: { type: Number, required: true }, //Ckeck if number 0 < n < 6
    bonus: { type: Number, required: true },
    itemamount: { type: Number, required: true },
    comment: { type: String },
    price: { type: Number, required: true },
});

const OrderEvaluationSchema = new mongoose.Schema({
    orders: { type: [OrderSchema], required: true },
    bonussum: { type: Number, required: true },
});

export const BonusComputationSheetSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    salesmanId: { type: Number, required: true },
    yearOfEvaluation: { type: Number, required: true },
    totalBonus: { type: Number, required: true },
    status: { type: String, required: true },
    socialPerformanceEvaluation: {
        type: SocialPerformanceEvaluationSchema,
        required: true,
    },
    orderEvaluation: { type: OrderEvaluationSchema, required: true },
    comment: String,
});

export const BonusComputationSheetModel = mongoose.model(
    "sheets",
    BonusComputationSheetSchema
);

export type Comment = {
    type: "Order" | "SocialAttribute" | "BonusComputationSheet";
    _id?: String;
    text: String;
};

export type Status =
    | "incomplete"
    | "pending-hr"
    | "pending-ceo"
    | "pending-salesman"
    | "finished";

export type ClientRanking = 1 | 2 | 3 | 4 | 5;

import {Salesman} from "./Salesman";

export type Status =
    | 'incomplete'
    | 'pending-hr'
    | 'pending-ceo'
    | 'pending-salesman'
    | 'finished';

export type ClientRanking = 1 | 2 | 3 | 4 | 5;

export class BonusComputationSheet {
    // id: number; //brauchen wir die?
    // salesmanId: number;
    salesman: Salesman;
    yearOfEvaluation: number;
    totalBonus: number = 0;
    status: Status;
    socialPerformanceEvaluation: SocialPerformanceEvaluation;
    orderEvaluation: OrderEvaluation;
    comment?: string;

    constructor(salesman: Salesman, yearOfEvaluation: number, totalBonus: number, status: Status, socialPerformanceEvaluation: SocialPerformanceEvaluation, orderEvaluation: OrderEvaluation, comment: string) {
        this.salesman = salesman;
        this.yearOfEvaluation = yearOfEvaluation;
        this.totalBonus = totalBonus;
        this.status = status;
        this.socialPerformanceEvaluation = socialPerformanceEvaluation;
        this.orderEvaluation = orderEvaluation;
        this.comment = comment;
    }
}

export class OrderEvaluation {
    orders: Order[];
    bonussum: number = 0;

    constructor(orders: Order[]) {
        this.orders = orders;
        for (const order of orders) {
            this.bonussum = this.bonussum + order.bonus;
        }
    }
}

export class Order {
    productname: string;
    client: string;
    clientRanking: ClientRanking;
    bonus: number;
    itemamount: number;
    comment?: string;
    price: number;

    constructor(
        productname: string,
        client: string,
        clientRanking: ClientRanking,
        bonus: number,
        itemamount: number,
        price: number,
        comment?: string
    ) {
        this.productname = productname;
        this.client = client;
        this.clientRanking = clientRanking;
        this.bonus = bonus;
        this.itemamount = itemamount;
        this.price = price;
        this.comment = comment;
    }
}

export class SocialPerformanceEvaluation {
    socialAttributes: SocialAttribute[];
    bonussum: number = 0;

    constructor(socialAttributes: SocialAttribute[]) {
        this.socialAttributes = socialAttributes;
        for (const socialAttribute of socialAttributes) {
            this.bonussum = this.bonussum + socialAttribute.bonus;
        }
    }
}

export class SocialAttribute {
    comment?: string;
    targetValue: number;
    actualValue: number;
    socialAttributeName: string;
    bonus: number;

    constructor(
        targetValue: number,
        actualValue: number,
        socialAttributeName: string,
        bonus: number,
        comment?: string
    ) {
        this.targetValue = targetValue;
        this.actualValue = actualValue;
        this.socialAttributeName = socialAttributeName;
        this.bonus = bonus;
        this.comment = comment;
    }
}
//
// const SocialAttributeSchema = new mongoose.Schema({
//     comment: { type: String },
//     targetValue: { type: Number, required: true },
//     actualValue: { type: Number, required: true },
//     socialAttributeName: { type: String, required: true },
//     bonus: { type: Number, required: true },
// });
//
// const SocialPerformanceEvaluationSchema = new mongoose.Schema({
//     socialAttributes: { type: [SocialAttributeSchema], required: true },
//     bonussum: { type: Number, required: true },
// });
//
// const OrderSchema = new mongoose.Schema({
//     productname: { type: String, required: true },
//     client: { type: String, required: true },
//     clientRanking: { type: Number, required: true }, //Ckeck if number 0 < n < 6
//     bonus: { type: Number, required: true },
//     itemamount: { type: Number, required: true },
//     comment: { type: String },
//     price: { type: Number, required: true },
// });
//
// const OrderEvaluationSchema = new mongoose.Schema({
//     orders: { type: [OrderSchema], required: true },
//     bonussum: { type: Number, required: true },
// });
//
// export const BonusComputationSheetSchema = new mongoose.Schema({
//     id: { type: Number, required: true, unique: true },
//     salesManId: { type: Number, required: true },
//     yearOfEvaluation: { type: Number, required: true },
//     totalBonus: { type: Number, required: true },
//     status: { type: String, required: true },
//     socialPerformanceEvaluation: {
//         type: SocialPerformanceEvaluationSchema,
//         required: true,
//     },
//     orderEvaluation: { type: OrderEvaluationSchema, required: true },
// });
//
// export const BonusComputationSheetModel = mongoose.model(
//     'sheets',
//     BonusComputationSheetSchema
// );

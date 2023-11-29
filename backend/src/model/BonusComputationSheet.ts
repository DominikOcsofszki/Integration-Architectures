export interface BonusComputationSheet {
    socialPerformanceEvaluation: SocialPerformanceEvaluation;
    orderEvaluation: OrderEvaluation;
    salesManId: number;
    totalBonus: number;
    yearOfOrder: number;
    id: number;
}

export interface OrderEvaluation {
    orders: [Order];
    bonussum: number;
}

export interface Order {
    productname: string;
    client: string;
    clientRanking: 1 | 2 | 3 | 4 | 5;
    bonus: number;
    itemamount: number;
    comment: string;
    price: number;
}

export interface SocialPerformanceEvaluation {
    socialAttributes: [SocialAttribute]
    bonussum: number;
}

export interface SocialAttribute {
    comment: string;
    targetValue: number;
    actualValue: number;
    socialAttributeName: string;
    bonus: number;
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusComputationSheetModel = exports.BonusComputationSheetSchema = exports.SocialPerformanceEvaluationSchema = exports.SocialAttribute = exports.SocialPerformanceEvaluation = exports.Order = exports.OrderEvaluation = exports.BonusComputationSheet = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class BonusComputationSheet {
    constructor(salesmanId, yearOfEvaluation, id, socialPerformanceEvaluation, orderEvaluation, comment) {
        this.totalBonus = 0;
        this.salesmanId = salesmanId;
        this.yearOfEvaluation = yearOfEvaluation;
        this.id = id;
        this.totalBonus =
            socialPerformanceEvaluation.bonussum + orderEvaluation.bonussum;
        this.status = "pending-hr";
        this.socialPerformanceEvaluation = socialPerformanceEvaluation;
        this.orderEvaluation = orderEvaluation;
        this.comment = comment;
    }
}
exports.BonusComputationSheet = BonusComputationSheet;
class OrderEvaluation {
    constructor(orders) {
        this.bonussum = 0;
        this.orders = orders;
        for (const order of orders) {
            this.bonussum = this.bonussum + order.bonus;
        }
    }
}
exports.OrderEvaluation = OrderEvaluation;
class Order {
    constructor(productname, client, clientRanking, bonus, itemamount, price, comment) {
        this.productname = productname;
        this.client = client;
        this.clientRanking = clientRanking;
        this.bonus = bonus;
        this.itemamount = itemamount;
        this.price = price;
        this.comment = comment;
    }
}
exports.Order = Order;
class SocialPerformanceEvaluation {
    constructor(socialAttributes) {
        this.bonussum = 0;
        this.socialAttributes = socialAttributes;
        for (const socialAttribute of socialAttributes) {
            this.bonussum = this.bonussum + socialAttribute.bonus;
        }
    }
}
exports.SocialPerformanceEvaluation = SocialPerformanceEvaluation;
class SocialAttribute {
    constructor(targetValue, actualValue, socialAttributeName, bonus, comment) {
        this.targetValue = targetValue;
        this.actualValue = actualValue;
        this.socialAttributeName = socialAttributeName;
        this.bonus = bonus;
        this.comment = comment;
    }
}
exports.SocialAttribute = SocialAttribute;
const SocialAttributeSchema = new mongoose_1.default.Schema({
    comment: { type: String },
    targetValue: { type: Number, required: true },
    actualValue: { type: Number, required: true },
    socialAttributeName: { type: String, required: true },
    bonus: { type: Number, required: true },
});
exports.SocialPerformanceEvaluationSchema = new mongoose_1.default.Schema({
    socialAttributes: { type: [SocialAttributeSchema], required: true },
    bonussum: { type: Number, required: true },
});
const OrderSchema = new mongoose_1.default.Schema({
    productname: { type: String, required: true },
    client: { type: String, required: true },
    clientRanking: { type: Number, required: true },
    bonus: { type: Number, required: true },
    itemamount: { type: Number, required: true },
    comment: { type: String },
    price: { type: Number, required: true },
});
const OrderEvaluationSchema = new mongoose_1.default.Schema({
    orders: { type: [OrderSchema], required: true },
    bonussum: { type: Number, required: true },
});
exports.BonusComputationSheetSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    salesmanId: { type: Number, required: true },
    yearOfEvaluation: { type: Number, required: true },
    totalBonus: { type: Number, required: true },
    status: { type: String, required: true },
    socialPerformanceEvaluation: {
        type: exports.SocialPerformanceEvaluationSchema,
        required: true,
    },
    orderEvaluation: { type: OrderEvaluationSchema, required: true },
    comment: String,
});
exports.BonusComputationSheetModel = mongoose_1.default.model("sheets", exports.BonusComputationSheetSchema);

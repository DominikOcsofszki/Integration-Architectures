import { Order } from "../../model/BonusComputationSheet";
import { orderEvaluationBonus } from "../bonus-calculation-service";

/**
 * Creates an Order for an OrderEvaluation. Bonus is calculated and comment is an empty string
 * @param productname
 * @param client
 * @param clientRanking
 * @param itemamount
 * @param price
 */
export function createOrder(
    productname: string,
    client: string,
    clientRanking: 1 | 2 | 3 | 4 | 5,
    itemamount: number,
    price: number
) {
    const bonus = orderEvaluationBonus(
        clientRanking as number,
        price,
        itemamount
    );
    const order: Order = {
        productname: productname,
        client: client,
        clientRanking: clientRanking,
        itemamount: itemamount,
        price: price,
        bonus: bonus,
        comment: "",
    };
    console.log(order);
}

import {Order} from "../../model/BonusComputationSheet";
import {orderEvaluationBonus} from "../bonus-calculation-service"

export function createOrder(productname: string, client: string, clientRanking: 1 | 2 | 3 | 4 | 5, itemamount: number, price: number){
    const bonus = orderEvaluationBonus(clientRanking as number, price, itemamount);
    const order: Order = {productname: productname, client: client, clientRanking: clientRanking,
        itemamount: itemamount, price: price, bonus: bonus, comment:""};
    console.log(order);
}
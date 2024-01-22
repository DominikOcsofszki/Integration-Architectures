import {Status} from "./BonusComputationSheet";

export class SheetSummary {
    salesmanId: number;
    firstname: string;
    lastname: string;
    year: number;
    bonus: number;
    status: Status;


    constructor(salesmanId: number, firstname: string, lastname: string, year: number, bonus: number, status: Status) {
        this.salesmanId = salesmanId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.year = year;
        this.bonus = bonus;
        this.status = status;
    }
}

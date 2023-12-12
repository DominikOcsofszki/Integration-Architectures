import {SalesmanModel} from "../../model/Salesman";
import {logger} from "../../app";

export function createSalesman(id: number, firstname: String, lastname: String, department: String){
    new SalesmanModel({id: id, firstname: firstname, lastname: lastname, department: department}).save()
        .then(() => console.log(`Salesman with id ${id} inserted in database`))
        .catch(() => console.log(`Salesman with id ${id} is already in the database`));
}
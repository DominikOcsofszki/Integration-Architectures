import {SalesmanModel} from "../../model/Salesman";

export function createSalesman(id: number, firstname: String, lastname: String, department: String){
    new SalesmanModel({id: id, firstname: firstname, lastname: lastname, department: "Sales"}).save();
}
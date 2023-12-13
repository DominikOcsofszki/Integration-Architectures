import {SalesmanModel} from "../../model/Salesman";
import {logger} from "../../app";

export async function createSalesman(id: number, firstname: String, lastname: String, department: String){
    new SalesmanModel({id: id, firstname: firstname, lastname: lastname, department: department}).save()
        .catch(() => console.log(`Salesman with id ${id} is already in the database`));
    // console.log(`Salesman with id ${id} inserted in database`);
    // await Promise.all(promise);
    console.log("salesmen inserted");


        // .then(() => console.log(`Salesman with id ${id} inserted in database`))
        //
}
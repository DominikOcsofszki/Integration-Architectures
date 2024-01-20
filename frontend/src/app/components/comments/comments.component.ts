import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
import { environment } from 'environments/environment';
import axios, { AxiosResponse } from 'axios';
import { Salesman } from 'src/app/models/Salesman';

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    id:number = 91338;
    year:number = 2023;
    OneBonusComputationSheet: BonusComputationSheet;
    salesman: Salesman;
    async ngOnInit() {
        this.getSheetFromIdAndYear(this.id, this.year).then(
            (res) => {this.OneBonusComputationSheet = res.data
                console.log(this.OneBonusComputationSheet);
                this.getSalesmanFromSalesmanID(this.id).then(
            (res) => {this.salesman = res.data
                console.log(this.salesman);
            })

            }
        );
        // this.fetchBonusSheetSalesman(); //ToDo add again after DB is ready
    }

    // async getSheetExample(): Promise<AxiosResponse> {
    //     return await axios.get(
    //         environment.apiEndpoint + `/api/hr/sheet/${91338}/${2023}`,
    //         { withCredentials: true }
    //     );
    // }
    async getSheetFromIdAndYear(id:number, year:number): Promise<AxiosResponse> {
        return await axios.get(
            environment.apiEndpoint + `/api/hr/sheet/${id}/${year}`,
            { withCredentials: true }
        );
    }

// router.get("/salesman/:id", readSalesman);
    async getSalesmanFromSalesmanID(id:number): Promise<AxiosResponse> {
        return await axios.get(
            environment.apiEndpoint + `/api/admin/salesman/${id}`,
            { withCredentials: true }
        );
    }
}
// from backend
// export async function getSheetByIdAndYear(req: Request, res: Response) {
//     await BonusComputationSheetModel.findOne({
//         salesmanId: req.params.salesmanId,
//         yearOfEvaluation: req.params.yearOfEvaluation,
//     })
//         .then((value) => {
//             res.status(200).send(value);
//         })
//         .catch((reason) => res.status(400).send(reason));
// }
//
//export const BonusComputationSheetSchema = new mongoose.Schema({
//     id: { type: Number, required: true, unique: true },
//     salesmanId: { type: Number, required: true },
//     yearOfEvaluation: { type: Number, required: true },
//     totalBonus: { type: Number, required: true },
//     status: { type: String, required: true },
//     socialPerformanceEvaluation: { type: SocialPerformanceEvaluationSchema, required: true },
//     orderEvaluation: { type: OrderEvaluationSchema, required: true },
//     comment: String,
// });


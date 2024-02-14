import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
    @Input() id: number = 91338
    @Input() year: number = 2023;
    @Input() fetchedBonusComputationSheet: BonusComputationSheet;
    salesman: Salesman;

    async ngOnInit() {
        this.getSheetFromIdAndYear(this.id, this.year).then(
            (res) => {this.fetchedBonusComputationSheet = res.data
                this.getSalesmanFromSalesmanID(this.id).then(
            (res) => {this.salesman = res.data
            })

            }
        );
    }

    async getSheetFromIdAndYear(id:number, year:number): Promise<AxiosResponse> {
        return await axios.get(
            environment.apiEndpoint + `/api/hr/sheet/${id}/${year}`,
            { withCredentials: true }
        );
    }

    // router.get("/salesman/:id", readSalesman);
    async getSalesmanFromSalesmanID(id: number): Promise<AxiosResponse> {
        return await axios.get(
            environment.apiEndpoint + `/api/admin/salesman/${id}`,
            { withCredentials: true }
        );
    }
}

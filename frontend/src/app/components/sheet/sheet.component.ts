import { Salesman } from 'src/app/models/Salesman';
////////////////////
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
// import * as common from '@angular/common';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
// import { environment } from 'environments/environment';
// import axios, { AxiosResponse } from 'axios';
// import { SheetServiceService } from 'src/app/';
// import { ChangeDetectorRef } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { SheetServiceService } from './sheet-service.service';
import { TableComponent } from './table/table.component';
import { TableOrderComponent } from './table-order/table-order.component';

@Component({
    selector: 'app-sheet',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule,TableComponent,TableOrderComponent],
    templateUrl: './sheet.component.html',
    styleUrls: ['./sheet.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SheetComponent implements OnInit {
    salesman: Salesman;
    bonusComputationSheet: BonusComputationSheet;
    @Input() id: number;
    @Input() year: number;
    constructor(private sheetServiceService: SheetServiceService) { }

    ngOnInit() {
        this.sheetServiceService.fetchSheetFromSalesmanIdYear(this.id, this.year).
            subscribe((res: BonusComputationSheet) => {
                this.bonusComputationSheet = res;
                console.log(this.salesman);
            });
        // this.sheetServiceService.fetchSalesmanSalesmanID(this.id).
        //     subscribe((res: Salesman) => {
        //         this.salesman = res;
        //         console.log(this.salesman);
        //     });
    }
    signCurrentSheet() {
        this.sheetServiceService.signSheetFromSalesmanIdAndYear(this.id, this.year);
    }

    // 91338
    //
    // observe: 'response',
    // fetchSalesman(id: number) {
    //     this.http.get<Salesman>(environment.apiEndpoint + `/api/admin/salesman/${id}`,
    //         { observe: 'response', withCredentials: true }
    //     ).pipe(map(response => response.json()).
    //         subscribe((data: Salesman) => {
    //             this.salesman = data;
    //             console.log("inside fetchSalesman");
    //             console.log(this.salesman);
    //         },
    //             (error) => { console.error('Error fetching salesman:', error); }
    //         );)
    // }
}

            // environment.apiEndpoint + 'admin/salesman/' + id).

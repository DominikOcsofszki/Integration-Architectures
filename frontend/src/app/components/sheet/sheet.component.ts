// import { Salesman } from 'src/app/models/Salesman';
////////////////////
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, inject } from '@angular/core';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
import { SheetServiceService } from './sheet-service.service';
import { TableComponent } from './table/table.component';
import { TableOrderComponent } from './table-order/table-order.component';
import { ROUTING } from 'src/app/app.routing';
import { Router } from "@angular/router"
import { Role } from 'src/app/models/User';
import { UpdateSheetsService } from 'src/app/services/update-sheets.service';


@Component({
    selector: 'app-sheet',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, TableComponent, TableOrderComponent, ReactiveFormsModule],
    templateUrl: './sheet.component.html',
    styleUrls: ['./sheet.component.css'],
})
export class SheetComponent implements OnInit {
    private router = inject(Router)
    private updateSheetsService = inject(UpdateSheetsService);
    bonusComputationSheet: BonusComputationSheet;
    @Input() id: number;
    @Input() year: number;
    @Input() roleLoggedIn: Role;
    ableToSign: boolean;
    constructor(private sheetServiceService: SheetServiceService) { }

    ngOnInit() {
        this.sheetServiceService.fetchSheetFromSalesmanIdYear(this.id, this.year).
            subscribe((res: BonusComputationSheet) => {
                this.bonusComputationSheet = res;
                this.ableToSign = this.bonusComputationSheet.status === "pending-" + this.roleLoggedIn;
                // console.log(this.ableToSign)

            });
    }
    isFinished(){
        return this.bonusComputationSheet.status === "finished";
    }

    isDeclined() {
        // return true;
        return this.bonusComputationSheet.declined;
    }
    isCeo() {
        return this.roleLoggedIn === "ceo"
    } isHr() {
        return this.roleLoggedIn === "hr"
    }
    isSalesman() {
        return this.roleLoggedIn === "salesman"
    }
    declineSheetAsSalesman() {
        if (this.isSalesman()) {
            this.updateSheetsService.declineSheetAsSalesman( this.bonusComputationSheet).subscribe(()=> console.log("worked"));
        }

    }

    updateComments() {
        if (this.isCeo()) {
            this.updateSheetsService.updateSheetAsCeo( this.bonusComputationSheet).subscribe(()=> console.log("worked"));
        }
        if (this.isHr()) {
            let actualValuesInRange = true;
            this.bonusComputationSheet.socialPerformanceEvaluation.socialAttributes.forEach(
                x=> {
                    if(x.actualValue > 5 || x.actualValue <0) actualValuesInRange = false;
                })
            if(actualValuesInRange) this.updateSheetsService.updateSheetAsHr( this.bonusComputationSheet).subscribe(()=> console.log("updated actual values"));
        }
        location.reload();
    }


    signCurrentSheet() {
        this.sheetServiceService.signSheetFromSalesmanIdAndYear(this.id, this.year, this.roleLoggedIn);
        if (this.roleLoggedIn == "hr") this.router.navigate([ROUTING.hr.PendingSheetsComponent])
        if (this.roleLoggedIn == "ceo") this.router.navigate([ROUTING.ceo.PendingSheetsComponent])
        if (this.roleLoggedIn == "salesman") this.router.navigate([ROUTING.salesman.PendingSheetsComponent])
    }
    updateSheetsApiCall() {
        this.updateComments();

    }
}

// import { Salesman } from 'src/app/models/Salesman';
////////////////////
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

    comment = new FormControl();

    isCeo() {
        return this.roleLoggedIn === "ceo"
    }

    // (yearOfEvaluation: number, salesmanId: number, bonusComputationSheet: BonusComputationSheet)
    updateComments() {
        this.updateSheetsService.updateSheetsAsCeo(this.year, this.id, this.bonusComputationSheet);
    }

    ngOnInit() {
        this.sheetServiceService.fetchSheetFromSalesmanIdYear(this.id, this.year).
            subscribe((res: BonusComputationSheet) => {
                this.bonusComputationSheet = res;
                this.ableToSign = this.bonusComputationSheet.status === "pending-" + this.roleLoggedIn;
                console.log(this.ableToSign)
                this.comment.setValue(this.bonusComputationSheet.comment);

            });
    }
    signCurrentSheet() {
        this.sheetServiceService.signSheetFromSalesmanIdAndYear(this.id, this.year, this.roleLoggedIn);
        if (this.roleLoggedIn == "hr") this.router.navigate([ROUTING.hr.PendingSheetsComponent])
        if (this.roleLoggedIn == "ceo") this.router.navigate([ROUTING.ceo.PendingSheetsComponent])
        if (this.roleLoggedIn == "salesman") this.router.navigate([ROUTING.salesman.PendingSheetsComponent])
    }
}

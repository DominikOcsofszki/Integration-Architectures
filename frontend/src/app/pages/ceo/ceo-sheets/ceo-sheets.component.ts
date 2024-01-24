import { Component, inject, OnInit } from '@angular/core';
// import { HRService } from '../../../services/hr-service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SheetSummary } from "../../../models/SheetSummary";
import { SheetsComponent } from "../../../components/sheets/sheets.component";
import { Role } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { SheetsAllService } from 'src/app/services/sheets-all.service';
@Component({
    selector: 'app-ceo-sheets',
    standalone: true,
    imports: [MatTableModule, MatProgressBarModule, SheetsComponent, SheetsComponent],
    templateUrl: './ceo-sheets.component.html',
    styleUrls: ['./ceo-sheets.component.css']
})
export class CeoSheetsComponent implements OnInit {
    private userService = inject(UserService);
    private sheetsService = inject(SheetsAllService);
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year', 'bonus', 'status'];

    pendingSheets: SheetSummary[] = [];
    restSheets: SheetSummary[] = [];
    roleLoggedIn: Role;
    finishedPercentage: number;
    percentage:number;

    ngOnInit(): void {
        this.userService.getOwnUser().subscribe(user => {
            this.roleLoggedIn = user.role;
            this.fetchPendingSalesman();
            this.fetchRestPendingSalesman();
            this.percentage = this.calculatePercentage();
        })
    }

    calculatePercentage(): number {
        return 50;
        // const pendingSheetsLength = this.pendingSheets.length;
        // if(pendingSheetsLength===0) return 100;
        // const restSheetsLength = this.restSheets.length;
        // const totalSheets = pendingSheetsLength + restSheetsLength;
        // const percentage = (pendingSheetsLength / totalSheets) * 100;
        // return percentage
    }
    fetchPendingSalesman(): void {
        this.sheetsService
            .getPendingSheets(this.roleLoggedIn)
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.pendingSheets = response.body;
                }
            });
    }
    fetchRestPendingSalesman(): void {
        this.sheetsService
            .getNotPendingSheets(this.roleLoggedIn)
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.restSheets = response.body;
                }
            });
    }
}


import { Component, OnInit } from '@angular/core';

import { HRService } from '../../../services/hr-service';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { forkJoin } from 'rxjs';
import {SheetSummary} from "../../../models/SheetSummary";
@Component({
    selector: 'app-pending-sheets',
    templateUrl: './pending-sheets.component.html',
    styleUrls: ['./pending-sheets.component.css'],
    standalone: true,
    imports: [MatTableModule, MatProgressBarModule],
})
export class PendingSheetsComponent implements OnInit {

    constructor(private hrService: HRService, private router: Router) { }
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year', 'bonus', 'status'];

    pendingSheets: SheetSummary[] = [];
    restSheets: SheetSummary[] = [];

    finishedPercentage : number;

    ngOnInit(): void {
        this.fetchPendingSalesman(); // ToDo add again after DB is ready
        this.fetchRestPendingSalesman(); // ToDo add again after DB is ready
        this.calculatePercentage();
    }

    // calcFinishedPercentage(): void {
    //     forkJoin([
    //         this.hrService.getPendingSheets(), // Assuming this returns an Observable
    //         this.hrService.getNotPendingSheets() // Assuming this returns an Observable
    //     ]).subscribe(([pendingSheetsResponse, restSheetsResponse]) => {
    //         if (pendingSheetsResponse.status === 200 && restSheetsResponse.status === 200) {
    //             this.pendingSheets = pendingSheetsResponse.body;
    //             this.restSheets = restSheetsResponse.body;
    //             this.finishedPercentage = this.calculatePercentage();
    //         }
    //     });
    // }

    calculatePercentage(): number {
        const pendingSheetsLength = this.pendingSheets.length;
        if(pendingSheetsLength===0) return 100;
        const restSheetsLength = this.restSheets.length;
        const totalSheets = pendingSheetsLength + restSheetsLength;
        const percentage = (pendingSheetsLength / totalSheets) * 100;
        return percentage
    }
    // Waiting for entries in DB!!!
    fetchPendingSalesman(): void {
        this.hrService
            .getPendingSheets()
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.pendingSheets = response.body;
                }
            });
    }
    fetchRestPendingSalesman(): void {
        this.hrService
            .getNotPendingSheets()
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.restSheets = response.body;
                }
            });
    }
    openLinkSheet(id: number, year: number) {
        console.log(id, year)
        this.router.navigateByUrl(year + "/" + id);
    }
}

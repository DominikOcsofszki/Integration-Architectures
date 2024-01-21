import { Component, OnInit } from '@angular/core';

// ..... change to open Salemen
// import { PeopleDemoService } from '../../services/people-demo.service';
// import { ExampleDatapoint } from '../../interfaces/example-datapoint';
import { Salesman } from '../../../models/Salesman';
import { HRService } from '../../../services/hr-service';
import { MatTableModule } from '@angular/material/table';
import { ROUTING } from 'src/app/app.routing';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { log } from 'console';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-pending-sheets',
    templateUrl: './pending-sheets.component.html',
    styleUrls: ['./pending-sheets.component.css'],
    standalone: true,
    imports: [MatTableModule, MatProgressBarModule],
})
export class PendingSheetsComponent implements OnInit {
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year', 'bonus', 'status'];

    pendingSheets: [] = [];
    restSheets: [] = [];

    routeToSheet = ROUTING
    finishedPercentage : number;
    constructor(private hrService: HRService, private router: Router) { }

    ngOnInit(): void {
        this.fetchPendingSalesman(); // ToDo add again after DB is ready
        this.fetchRestPendingSalesman(); // ToDo add again after DB is ready
        this.calcFinishedPercentage();
    }

    calcFinishedPercentage(): void {
        forkJoin([
            this.hrService.getPendingSheets(), // Assuming this returns an Observable
            this.hrService.getNotPendingSheets() // Assuming this returns an Observable
        ]).subscribe(([pendingSheetsResponse, restSheetsResponse]) => {
            if (pendingSheetsResponse.status === 200 && restSheetsResponse.status === 200) {
                this.pendingSheets = pendingSheetsResponse.body;
                this.restSheets = restSheetsResponse.body;
                this.finishedPercentage = this.calculatePercentage();
            }
        });
    }

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

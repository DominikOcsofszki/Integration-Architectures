import { Component, OnInit } from '@angular/core';

// ..... change to open Salemen
// import { PeopleDemoService } from '../../services/people-demo.service';
// import { ExampleDatapoint } from '../../interfaces/example-datapoint';
import { Salesman } from '../../../models/Salesman';
import {HRService} from '../../../services/hr-service';
import { MatTableModule } from '@angular/material/table';
import { ROUTING } from 'src/app/app.routing';
@Component({
    selector: 'app-pending-sheets',
    templateUrl: './pending-sheets.component.html',
    styleUrls: ['./pending-sheets.component.css'],
    standalone: true,
    imports: [MatTableModule],
})
export class PendingSheetsComponent implements OnInit {
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year' , 'bonus', 'status'];

    pendingSheets: [] = [];
    restSheets: [] = [];

    routeToSheet = ROUTING
    constructor(private hrService: HRService) {}

    ngOnInit(): void {
        this.fetchPendingSalesman(); // ToDo add again after DB is ready
        this.fetchRestPendingSalesman(); // ToDo add again after DB is ready
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
    onClick() {
        console.log("from click")
    }




}

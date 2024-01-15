import { Component, OnInit } from '@angular/core';

// ..... change to open Salemen
// import { PeopleDemoService } from '../../services/people-demo.service';
// import { ExampleDatapoint } from '../../interfaces/example-datapoint';
import { Salesman } from '../../models/Salesman';
import { PendingSalesmanService } from '../../services/pending-saleman.service';
@Component({
    selector: 'app-pending-sheets',
    templateUrl: './pending-sheets.component.html',
    styleUrls: ['./pending-sheets.component.css'],
})
export class PendingSheetsComponent implements OnInit {
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year' , 'bonus', 'status'];

    pendingSalesman: Salesman[] = [];
    restSalesmen: Salesman[] = [];

    constructor(private pendingSalesmanService: PendingSalesmanService) {}

    ngOnInit(): void {
        this.fetchPendingSalesman(); // ToDo add again after DB is ready
        this.fetchRestPendingSalesman(); // ToDo add again after DB is ready
    }
    // Waiting for entries in DB!!!
    fetchPendingSalesman(): void {
        this.pendingSalesmanService
            .getPendingSalesman()
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.pendingSalesman = response.body;
                }
            });
    }
        fetchRestPendingSalesman(): void {
        this.pendingSalesmanService
            .getPendingSalesman()
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.pendingSalesman = response.body;
                }
            });
    }

}

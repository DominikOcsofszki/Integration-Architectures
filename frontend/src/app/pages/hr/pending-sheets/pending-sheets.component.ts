import { Component, inject, OnInit } from '@angular/core';

import { HRService } from '../../../services/hr-service';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { forkJoin } from 'rxjs';
import {SheetSummary} from "../../../models/SheetSummary";
import { SheetsComponent } from "../../../components/sheets/sheets.component";
import { Role } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-pending-sheets',
    templateUrl: './pending-sheets.component.html',
    styleUrls: ['./pending-sheets.component.css'],
    standalone: true,
    imports: [MatTableModule, MatProgressBarModule, SheetsComponent,SheetsComponent]
})
export class PendingSheetsComponent implements OnInit {
    // constructor(private hrService: HRService, private router: Router) { }
    private userService = inject(UserService);
    private hrService= inject(HRService);
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year', 'bonus', 'status'];

    pendingSheets: SheetSummary[] = [];
    restSheets: SheetSummary[] = [];
    roleLoggedIn: Role;
    finishedPercentage : number;

    ngOnInit(): void {
        this.fetchPendingSalesman(); // ToDo add again after DB is ready
        this.fetchRestPendingSalesman(); // ToDo add again after DB is ready
        this.calculatePercentage();
        this.userService.getOwnUser().subscribe(user => this.roleLoggedIn = user.role);
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
    // openLinkSheet(id: number, year: number) {
    //     console.log(id, year)
    //     this.router.navigateByUrl(year + "/" + id);
    // }
}

import { Component, inject, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SheetSummary } from '../../../models/SheetSummary';
import { SheetsComponent } from '../../../components/sheets/sheets.component';
import { Role, User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { SheetsAllService } from 'src/app/services/sheets-all.service';
import { calculatePercentage } from 'src/app/services/calculate-progression.service';
@Component({
    selector: 'app-salesman-sheets',
    standalone: true,
    imports: [
        MatTableModule,
        MatProgressBarModule,
        SheetsComponent,
        SheetsComponent,
    ],
    templateUrl: './salesman-sheets.component.html',
    styleUrls: ['./salesman-sheets.component.css'],
})
export class SalesmanSheetsComponent implements OnInit {
    private userService = inject(UserService);
    private sheetsService = inject(SheetsAllService);
    displayedColumns = [
        'salesman',
        'firstname',
        'lastname',
        'year',
        'bonus',
        'status',
    ];

    pendingSheets: SheetSummary[] = [];
    restSheets: SheetSummary[] = [];
    roleLoggedIn: Role;
    finishedPercentage: number;
    percentage: number;
    user: User;

    ngOnInit(): void {
        this.userService.getOwnUser().subscribe((user) => {
            this.user = user;
            this.roleLoggedIn = user.role;
            this.fetchPendingSalesman();
            this.fetchRestPendingSalesman();
            this.percentage = calculatePercentage(
                this.pendingSheets.concat(this.restSheets)
            );
        });
    }

    fetchPendingSalesman(): void {
        this.sheetsService
            .getPendingSheetsSalesman(this.user)

            .subscribe((response): void => {
                if (response.status === 200) {
                    this.pendingSheets = response.body;
                }
            });
    }
    fetchRestPendingSalesman(): void {
        this.sheetsService
            .getNotPendingSheetsSalesman(this.user)
            .subscribe((response): void => {
                if (response.status === 200) {
                    this.restSheets = response.body;
                }
            });
    }
}

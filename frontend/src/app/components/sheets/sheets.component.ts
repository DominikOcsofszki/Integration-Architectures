import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SheetSummary } from 'src/app/models/SheetSummary';
import { Role } from 'src/app/models/User';
import { Router } from '@angular/router';
@Component({
    selector: 'app-sheets',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './sheets.component.html',
    styleUrls: ['./sheets.component.css']
})
export class SheetsComponent {
    private router = inject(Router)
    @Input() sheets: SheetSummary;
    @Input() roleLoggedIn: Role;
    displayedColumns = ['salesman', 'firstname', 'lastname', 'year', 'bonus', 'status'];

    openLinkSheet(id: number, year: number) {
        this.router.navigateByUrl(this.roleLoggedIn+"/sheet/"+year + "/" + id);
    }

}

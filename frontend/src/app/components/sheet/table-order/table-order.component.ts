import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusComputationSheet, SocialPerformanceEvaluation } from 'src/app/models/BonusComputationSheet';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table'
import { Role } from 'src/app/models/User';

@Component({
    selector: 'app-table-order',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatTableModule],
    templateUrl: './table-order.component.html',
    styleUrls: ['./table-order.component.css']
})

export class TableOrderComponent {

    @Input() bonusComputationSheet: BonusComputationSheet;
    @Input() userRole: Role;
    displayedColumns = ['productname', 'client', 'clientRanking', 'itemamount', 'bonus', 'comment'];
    // displayedColumns = ['productname'];
    printBonusSheet() {
        console.log(this.bonusComputationSheet)
    }
    isCeo() {
        console.log(this.userRole)
        return this.userRole === "ceo"
    }

}

// export class Order {
//     productname: string;
//     client: string;
//     clientRanking: ClientRanking;
//     bonus: number;
//     itemamount: number;
//     comment?: string;
//     price: number;
//
//

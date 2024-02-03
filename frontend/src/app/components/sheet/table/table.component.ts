import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusComputationSheet, SocialPerformanceEvaluation } from 'src/app/models/BonusComputationSheet';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table'
import { Role } from 'src/app/models/User';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatTableModule],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent {
    @Input() bonusComputationSheet: BonusComputationSheet;
    @Input() userRole: Role;
    displayedColumns = ['socialAttributeName', 'targetValue', 'actualValue', 'bonus', 'comment'];
    isCeo() {
        return this.userRole === "ceo"
    }
    isHr() {
        return this.userRole === "hr"
    }
}


// export class SocialAttribute {
//     comment?: string;
//     targetValue: number;
//     actualValue: number;
//     socialAttributeName: string;
//     bonus: number;

    // socialAttributeNamesArr: string[] = [
    //     "Leadership Competence",
    //     "Openness to Employee",
    //     "Social Behavior to Employee",
    //     "Attitude towards Client",
    //     "Communication Skills",
    //     "Integrity to Company"
    // ];

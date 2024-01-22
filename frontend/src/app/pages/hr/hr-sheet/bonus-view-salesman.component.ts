import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Salesman } from 'src/app/models/Salesman';
import {BonusComputationSheet} from 'src/app/models/BonusComputationSheet';
import { MatButtonModule } from '@angular/material/button';

import { CommentsComponent } from '../../../components/comments/comments.component'
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { SheetComponent } from 'src/app/components/sheet/sheet.component';


@Component({
    selector: 'app-bonus-view-salesman',
    templateUrl: './bonus-view-salesman.component.html',
    styleUrls: ['./bonus-view-salesman.component.css'],
    standalone: true,
    imports: [MatButtonModule, CommentsComponent, NgIf, AsyncPipe, SheetComponent],
      changeDetection: ChangeDetectionStrategy.OnPush

})
export class BonusViewSalesmanComponent {
    @ViewChildren(CommentsComponent) commentsComponent!: CommentsComponent;



    constructor(private route: ActivatedRoute) { }

    title = 'Bonus Computation Sheet';
    id: number;
    year: number;
    fetchedBonusComputationSheetObservable: Observable<BonusComputationSheet>;
    // fetchedBonusComputationSheet: Observable<BonusComputationSheet>;
    salesman: Salesman;
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.title = this.id ? this.title : "http://localhost:4200/2023/91338";
        this.id = this.id ? this.id : 91338; //TODO remove demo data later
        this.year = Number(this.route.snapshot.paramMap.get('year'));
        this.year = this.year ? this.year : 2023 //TODO remove demo data later
    }

    generatePdf(data, id: number) {

    }

}

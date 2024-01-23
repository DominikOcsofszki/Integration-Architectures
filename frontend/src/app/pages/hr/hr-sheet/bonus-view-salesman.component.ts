import { ChangeDetectionStrategy, Component, inject,OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Salesman } from 'src/app/models/Salesman';
import {BonusComputationSheet} from 'src/app/models/BonusComputationSheet';
import { MatButtonModule } from '@angular/material/button';

import { CommentsComponent } from '../../../components/comments/comments.component'
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { SheetComponent } from 'src/app/components/sheet/sheet.component';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';


@Component({
    selector: 'app-bonus-view-salesman',
    templateUrl: './bonus-view-salesman.component.html',
    styleUrls: ['./bonus-view-salesman.component.css'],
    standalone: true,
    imports: [MatButtonModule, CommentsComponent, NgIf, AsyncPipe, SheetComponent],
      changeDetection: ChangeDetectionStrategy.OnPush

})
export class BonusViewSalesmanComponent {
    private route= inject(ActivatedRoute);
    private generatePdfService = inject(GeneratePdfService);

    title = 'Bonus Computation Sheet';
    id: number;
    year: number;
    fetchedBonusComputationSheetObservable: Observable<BonusComputationSheet>;
    salesman: Salesman;
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.year = Number(this.route.snapshot.paramMap.get('year'));
    }

    generatePdf(data:any, id: number) {
        this.generatePdfService.generatePdf(data,id);
    }

}

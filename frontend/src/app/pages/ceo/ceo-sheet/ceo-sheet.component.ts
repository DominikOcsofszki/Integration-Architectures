import { Component, inject } from '@angular/core';
import { Salesman } from 'src/app/models/Salesman';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
import { MatButtonModule } from '@angular/material/button';

import { CommentsComponent } from '../../../components/comments/comments.component'
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { SheetComponent } from 'src/app/components/sheet/sheet.component';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/User';


@Component({
  selector: 'app-ceo-sheet',
  standalone: true,
    imports: [MatButtonModule, CommentsComponent, NgIf, AsyncPipe, SheetComponent],
  templateUrl: './ceo-sheet.component.html',
  styleUrls: ['./ceo-sheet.component.css']
})
export class CeoSheetComponent {
    private route = inject(ActivatedRoute);
    private generatePdfService = inject(GeneratePdfService);
    private userService = inject(UserService);

    title = 'Bonus Computation Sheet';
    id: number;
    year: number;
    fetchedBonusComputationSheetObservable: Observable<BonusComputationSheet>;
    salesman: Salesman;
    roleLoggedIn: Role;

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.year = Number(this.route.snapshot.paramMap.get('year'));
        this.userService.getOwnUser().subscribe(user => this.roleLoggedIn = user.role);
    }

    generatePdf(data: any, id: number) {
        this.generatePdfService.generatePdf(data, id);
    }

}


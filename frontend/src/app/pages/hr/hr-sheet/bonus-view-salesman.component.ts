import { Component, OnInit } from '@angular/core';
import * as jsPDFAll from 'jspdf';
import html2canvas from 'html2canvas';
import { Salesman } from 'src/app/models/Salesman';
import {
    BonusComputationSheet,
    BonusComputationSheetModel,
} from 'src/app/models/BonusComputationSheet';
import { MatButtonModule } from '@angular/material/button';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { environment } from 'environments/environment';

import { CommentsComponent } from '../../../components/comments/comments.component'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bonus-view-salesman',
    templateUrl: './bonus-view-salesman.component.html',
    styleUrls: ['./bonus-view-salesman.component.css'],
    standalone: true,
    imports: [MatButtonModule, CommentsComponent],
})
export class BonusViewSalesmanComponent {
    constructor(private route: ActivatedRoute) { }

    title = 'Bonus Computation Sheet';
    id : number;
    year:number;
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.title = this.id ? this.title : "http://localhost:4200/2023/91338";
        this.id = this.id ? this.id : 91338; //TODO remove demo data later
        this.year = Number(this.route.snapshot.paramMap.get('year'));

        this.year = this.year ? this.year : 2023 //TODO remove demo data later
        console.log(this.id)
    }

    generatePdf(data, id: number) {
        html2canvas(data, { allowTaint: true }).then((canvas) => {
            let HTML_Width = canvas.width;
            let HTML_Height = canvas.height;
            let top_left_margin = 15;
            let PDF_Width = HTML_Width + top_left_margin * 2;
            let PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
            let canvas_image_width = HTML_Width;
            let canvas_image_height = HTML_Height;
            let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
            canvas.getContext('2d');
            let imgData = canvas.toDataURL('image/jpeg', 1.0);
            let pdf = new jsPDFAll.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            pdf.addImage(
                imgData,
                'JPG',
                top_left_margin,
                top_left_margin,
                canvas_image_width,
                canvas_image_height
            );
            for (let i = 1; i <= totalPDFPages; i++) {
                pdf.addPage([PDF_Width, PDF_Height], 'p');
                pdf.addImage(
                    imgData,
                    'JPG',
                    top_left_margin,
                    -(PDF_Height * i) + top_left_margin * 4,
                    canvas_image_width,
                    canvas_image_height
                );
            }
            const namePDF = 'BonusRecords_' + id + '.pdf';
            pdf.save(namePDF);
        });
    }
}

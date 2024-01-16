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
@Component({
    selector: 'app-bonus-view-salesman',
    templateUrl: './bonus-view-salesman.component.html',
    styleUrls: ['./bonus-view-salesman.component.css'],
    standalone: true,
    imports: [MatButtonModule],
})
export class BonusViewSalesmanComponent {
    title = 'HR';
    salesman: Salesman = new Salesman(1, 'John', 'Doe', 'Sales'); //ToDo delete after DB is ready
    OneBonusComputationSheet: BonusComputationSheet;

    async ngOnInit() {
        this.getPendingSalesman().then(
            (res) => (this.OneBonusComputationSheet = res.data)
        );
        console.log(this.OneBonusComputationSheet);
        // this.fetchBonusSheetSalesman(); //ToDo add again after DB is ready
    }

    async getPendingSalesman(): Promise<AxiosResponse> {
        return await axios.get(
            environment.apiEndpoint + `/api/hr/sheet/${91338}/${2023}`,
            { withCredentials: true }
        );
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

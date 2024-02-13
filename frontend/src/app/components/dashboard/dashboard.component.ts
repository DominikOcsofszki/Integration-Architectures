
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import Chart from 'chart.js/auto';
import { SheetSummary } from '../../models/SheetSummary';

@Component({


    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, NgChartsModule],
    providers: [
        { provide: NgChartsConfiguration, useValue: { generateColors: false } }
    ]
})
export class DashboardComponent {
    title = 'ng-chart';
    @Input() pendingSheets: SheetSummary[];
    @Input() restSheets: SheetSummary[];
    chart: Chart<"bar", any[], string>;
    calcPrepChart() {
        let totalBonus = 0;
        this.restSheets.forEach(x => totalBonus += x.bonus);
        this.pendingSheets.forEach(x => totalBonus += x.bonus);
        let restSheetsLen = this.restSheets.length;
        let pendingSheetsLen = this.pendingSheets.length;
        let divBy = restSheetsLen + pendingSheetsLen;
        divBy = divBy === 0 ? 1 : divBy
        let avg = totalBonus / divBy;
        this.setUpCharts(totalBonus, avg);
        console.log(this.pendingSheets)
        console.log(this.restSheets)
    }

    ngOnInit() {
        if (this.pendingSheets && this.restSheets) {
            console.log(this.pendingSheets, this.restSheets)
            this.calcPrepChart();
        }
    }

    setUpCharts(totalBonus, avg) {
        console.log(totalBonus, avg)
            this.chart = new Chart('canvas', {
                type: 'bar',
                data: {
                    labels: ['totalBonus', 'averageBonus'],
                    datasets: [
                        {
                            label: 'additional dashboards showing statistics on bonus payments for all salesmen',
                            data: [totalBonus, avg],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
}



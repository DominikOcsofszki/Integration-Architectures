import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HRService} from "../../../services/hr-service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-hr-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-start.component.html',
  styleUrls: ['./hr-start.component.css']
})
export class HrStartComponent {
    constructor(private hrService: HRService) {}

    calculationResult$: Observable<string>;

    startCalculation(){
        try {
            this.hrService.startBonusCalculation(2023)
                .subscribe((response): void =>{
                    if (response.status === 200){
                        this.calculationResult$ = of(
                            "Bonus Computation Sheets have been created and can be found in tab \"sheets\".");
                    } else {
                        this.calculationResult$ =  of("Start calculation failed - try again later!");
                    }
                });
        } catch (e){
            this.calculationResult$ = of("Start calculation failed - try again later!");
        }
    }
}

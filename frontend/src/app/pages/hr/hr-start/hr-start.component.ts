import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HRService} from "../../../services/hr-service";

@Component({
  selector: 'app-hr-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-start.component.html',
  styleUrls: ['./hr-start.component.css']
})
export class HrStartComponent {
    constructor(private hrService: HRService) {}

    startBonusCalculation(){
        this.hrService.startBonusCalculation(2023);
    }
}

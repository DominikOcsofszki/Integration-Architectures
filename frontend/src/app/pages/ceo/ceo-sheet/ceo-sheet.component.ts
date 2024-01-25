import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ceo-sheet',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './ceo-sheet.component.html',
  styleUrls: ['./ceo-sheet.component.css']
})
export class CeoSheetComponent {

    name = new FormControl('asd');
}

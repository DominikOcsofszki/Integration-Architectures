import { Component, OnInit } from '@angular/core';

//..... change to open Salemen
// import { PeopleDemoService } from '../../services/people-demo.service';
// import { ExampleDatapoint } from '../../interfaces/example-datapoint';
import { Salesman } from '../../models/Salesman';
import { PendingSalesmanService } from '../../services/pending-saleman.service';
@Component({
  selector: 'app-pending-sheets',
  templateUrl: './pending-sheets.component.html',
  styleUrls: ['./pending-sheets.component.css']
})
export class PendingSheetsComponent implements OnInit {

  // }
  // export class ExamplePageComponent implements OnInit {

  // displayedColumns = ['id', 'name', 'color', 'age'];
  displayedColumns = ['id', 'firstname', 'lastname', 'department'];
  // id: number;
  // firstname: String;
  // lastname: String;
  // department: String;

  pendingSalesman: Salesman[] = [];

  constructor(private pendingSalesmanService: PendingSalesmanService) { }

  ngOnInit(): void {
    this.fetchPendingSalesman();
  }
  //Waiting for entries in DB!!!
  fetchPendingSalesman(): void {
    this.pendingSalesmanService.getPendingSalesman().subscribe((response): void => {
      if (response.status === 200) {
        this.pendingSalesman = response.body;
      }
    });
  }
}

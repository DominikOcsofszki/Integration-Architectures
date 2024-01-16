import { Component, OnInit } from '@angular/core';
import { PeopleDemoService } from '../../services/people-demo.service';
import { ExampleDatapoint } from '../../interfaces/example-datapoint';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-example-page',
    templateUrl: './example-page.component.html',
    styleUrls: ['./example-page.component.css'],
    standalone: true,
    imports: [MatTableModule]
})
export class ExamplePageComponent implements OnInit {

    displayedColumns = ['id', 'name', 'color', 'age'];
    people: ExampleDatapoint[] = [];

    constructor(private peopleDemoService: PeopleDemoService) { }

    ngOnInit(): void {
        this.fetchPeople();
    }

    fetchPeople(): void {
        this.peopleDemoService.getPeople().subscribe((response): void => {
            if (response.status === 200) {
                this.people = response.body;
            }
        });
    }
}

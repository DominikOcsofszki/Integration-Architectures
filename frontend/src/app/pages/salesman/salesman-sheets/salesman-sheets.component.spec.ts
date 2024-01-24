import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanSheetsComponent } from './salesman-sheets.component';

describe('SalesmanSheetsComponent', () => {
  let component: SalesmanSheetsComponent;
  let fixture: ComponentFixture<SalesmanSheetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SalesmanSheetsComponent]
    });
    fixture = TestBed.createComponent(SalesmanSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

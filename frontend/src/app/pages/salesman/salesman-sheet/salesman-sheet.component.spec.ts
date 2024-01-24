import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanSheetComponent } from './salesman-sheet.component';

describe('SalesmanSheetComponent', () => {
  let component: SalesmanSheetComponent;
  let fixture: ComponentFixture<SalesmanSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SalesmanSheetComponent]
    });
    fixture = TestBed.createComponent(SalesmanSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

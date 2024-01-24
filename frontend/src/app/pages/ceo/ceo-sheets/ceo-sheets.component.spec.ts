import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoSheetsComponent } from './ceo-sheets.component';

describe('CeoSheetsComponent', () => {
  let component: CeoSheetsComponent;
  let fixture: ComponentFixture<CeoSheetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CeoSheetsComponent]
    });
    fixture = TestBed.createComponent(CeoSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

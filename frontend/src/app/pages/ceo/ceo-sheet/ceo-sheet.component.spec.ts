import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoSheetComponent } from './ceo-sheet.component';

describe('CeoSheetComponent', () => {
  let component: CeoSheetComponent;
  let fixture: ComponentFixture<CeoSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CeoSheetComponent]
    });
    fixture = TestBed.createComponent(CeoSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

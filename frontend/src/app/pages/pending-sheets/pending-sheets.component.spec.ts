import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSheetsComponent } from './pending-sheets.component';

describe('PendingSheetsComponent', () => {
  let component: PendingSheetsComponent;
  let fixture: ComponentFixture<PendingSheetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingSheetsComponent]
    });
    fixture = TestBed.createComponent(PendingSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

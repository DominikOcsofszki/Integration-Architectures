import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusViewSalesmanComponent } from './bonus-view-salesman.component';

describe('BonusViewSalesmanComponent', () => {
  let component: BonusViewSalesmanComponent;
  let fixture: ComponentFixture<BonusViewSalesmanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [BonusViewSalesmanComponent]
});
    fixture = TestBed.createComponent(BonusViewSalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

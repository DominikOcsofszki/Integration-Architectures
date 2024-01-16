import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrStartComponent } from './hr-start.component';

describe('HrStartComponent', () => {
  let component: HrStartComponent;
  let fixture: ComponentFixture<HrStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HrStartComponent]
    });
    fixture = TestBed.createComponent(HrStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

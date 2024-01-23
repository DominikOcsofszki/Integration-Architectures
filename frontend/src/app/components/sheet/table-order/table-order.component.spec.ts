import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrderComponent } from './table-order.component';

describe('TableOrderComponent', () => {
  let component: TableOrderComponent;
  let fixture: ComponentFixture<TableOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableOrderComponent]
    });
    fixture = TestBed.createComponent(TableOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SheetsAllService } from './sheets-all.service';

describe('SheetsAllService', () => {
  let service: SheetsAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

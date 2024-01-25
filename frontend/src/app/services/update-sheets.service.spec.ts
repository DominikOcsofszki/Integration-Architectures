import { TestBed } from '@angular/core/testing';

import { UpdateSheetsService } from './update-sheets.service';

describe('UpdateSheetsService', () => {
  let service: UpdateSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

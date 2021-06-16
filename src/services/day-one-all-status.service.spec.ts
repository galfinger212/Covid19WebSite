import { TestBed } from '@angular/core/testing';

import { DayOneAllStatusService } from './day-one-all-status.service';

describe('DayOneAllStatusService', () => {
  let service: DayOneAllStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayOneAllStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

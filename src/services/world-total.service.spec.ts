import { TestBed } from '@angular/core/testing';

import { WorldTotalService } from './world-total.service';

describe('WorldTotalService', () => {
  let service: WorldTotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldTotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

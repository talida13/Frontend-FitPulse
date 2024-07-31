import { TestBed } from '@angular/core/testing';

import { WeightTrackingService } from './weight-tracking.service';

describe('WeightTrackingService', () => {
  let service: WeightTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

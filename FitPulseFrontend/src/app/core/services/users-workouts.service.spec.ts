import { TestBed } from '@angular/core/testing';

import { UsersWorkoutsService } from './users-workouts.service';

describe('UsersWorkoutsService', () => {
  let service: UsersWorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersWorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

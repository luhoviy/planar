import { TestBed } from '@angular/core/testing';

import { UserDataGuard } from './user-data.guard';

describe('UserDataGuard', () => {
  let guard: UserDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

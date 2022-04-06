import { TestBed } from '@angular/core/testing';
import { MetamaskAuthService } from './metamask-auth.service';

// ToDo
xdescribe('MetamaskAuthService', () => {
  let service: MetamaskAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetamaskAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

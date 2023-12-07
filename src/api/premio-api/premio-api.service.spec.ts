import { TestBed } from '@angular/core/testing';

import { PremioApiService } from './premio-api.service';

describe('PremioApiService', () => {
  let service: PremioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HiloApiService } from './hilo-api.service';

describe('HiloApiService', () => {
  let service: HiloApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiloApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

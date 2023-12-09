import { TestBed } from '@angular/core/testing';

import { MazoApiService } from './mazo-api.service';

describe('MazoApiService', () => {
  let service: MazoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

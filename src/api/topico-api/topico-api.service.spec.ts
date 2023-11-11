import { TestBed } from '@angular/core/testing';

import { TopicoApiService } from './topico-api.service';

describe('TopicoApiService', () => {
  let service: TopicoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

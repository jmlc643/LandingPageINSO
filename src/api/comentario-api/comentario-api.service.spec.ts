import { TestBed } from '@angular/core/testing';

import { ComentarioApiService } from './comentario-api.service';

describe('ComentarioApiService', () => {
  let service: ComentarioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

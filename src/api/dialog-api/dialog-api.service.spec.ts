import { TestBed } from '@angular/core/testing';

import { DialogApiService } from './dialog-api.service';

describe('DialogApiService', () => {
  let service: DialogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

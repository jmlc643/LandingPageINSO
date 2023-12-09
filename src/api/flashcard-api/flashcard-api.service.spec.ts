import { TestBed } from '@angular/core/testing';

import { FlashcardApiService } from './flashcard-api.service';

describe('FlashcardApiService', () => {
  let service: FlashcardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

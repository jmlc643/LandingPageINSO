import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFlashcardComponent } from './ver-flashcard.component';

describe('VerFlashcardComponent', () => {
  let component: VerFlashcardComponent;
  let fixture: ComponentFixture<VerFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerFlashcardComponent]
    });
    fixture = TestBed.createComponent(VerFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

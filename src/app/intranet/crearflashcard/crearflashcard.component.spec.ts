import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearflashcardComponent } from './crearflashcard.component';

describe('CrearflashcardComponent', () => {
  let component: CrearflashcardComponent;
  let fixture: ComponentFixture<CrearflashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearflashcardComponent]
    });
    fixture = TestBed.createComponent(CrearflashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

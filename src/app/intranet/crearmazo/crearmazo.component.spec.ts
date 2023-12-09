import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearmazoComponent } from './crearmazo.component';

describe('CrearmazoComponent', () => {
  let component: CrearmazoComponent;
  let fixture: ComponentFixture<CrearmazoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearmazoComponent]
    });
    fixture = TestBed.createComponent(CrearmazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTopicoComponent } from './creartopico.component';

describe('CrearTopicoComponent', () => {
  let component: CrearTopicoComponent;
  let fixture: ComponentFixture<CrearTopicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTopicoComponent]
    });
    fixture = TestBed.createComponent(CrearTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
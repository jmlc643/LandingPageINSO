import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorconfirmarComponent } from './porconfirmar.component';

describe('PorconfirmarComponent', () => {
  let component: PorconfirmarComponent;
  let fixture: ComponentFixture<PorconfirmarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorconfirmarComponent]
    });
    fixture = TestBed.createComponent(PorconfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

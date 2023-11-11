import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiloUsuarioComponent } from './hilo-usuario.component';

describe('HiloUsuarioComponent', () => {
  let component: HiloUsuarioComponent;
  let fixture: ComponentFixture<HiloUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiloUsuarioComponent]
    });
    fixture = TestBed.createComponent(HiloUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

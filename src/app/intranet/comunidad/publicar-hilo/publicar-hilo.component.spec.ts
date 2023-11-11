import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarHiloComponent } from './publicar-hilo.component';

describe('PublicarHiloComponent', () => {
  let component: PublicarHiloComponent;
  let fixture: ComponentFixture<PublicarHiloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarHiloComponent]
    });
    fixture = TestBed.createComponent(PublicarHiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

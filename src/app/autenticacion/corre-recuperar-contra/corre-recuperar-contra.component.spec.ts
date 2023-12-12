import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreRecuperarContraComponent } from './corre-recuperar-contra.component';

describe('CorreRecuperarContraComponent', () => {
  let component: CorreRecuperarContraComponent;
  let fixture: ComponentFixture<CorreRecuperarContraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorreRecuperarContraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorreRecuperarContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

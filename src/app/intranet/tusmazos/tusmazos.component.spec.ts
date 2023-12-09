import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusmazosComponent } from './tusmazos.component';

describe('TusmazosComponent', () => {
  let component: TusmazosComponent;
  let fixture: ComponentFixture<TusmazosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TusmazosComponent]
    });
    fixture = TestBed.createComponent(TusmazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

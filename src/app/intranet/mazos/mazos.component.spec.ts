import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazosComponent } from './mazos.component';

describe('MazosComponent', () => {
  let component: MazosComponent;
  let fixture: ComponentFixture<MazosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MazosComponent]
    });
    fixture = TestBed.createComponent(MazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

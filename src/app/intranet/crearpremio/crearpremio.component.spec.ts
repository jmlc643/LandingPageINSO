import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpremioComponent } from './crearpremio.component';

describe('CrearpremioComponent', () => {
  let component: CrearpremioComponent;
  let fixture: ComponentFixture<CrearpremioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearpremioComponent]
    });
    fixture = TestBed.createComponent(CrearpremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarReportesComponent } from './revisar-reportes.component';

describe('RevisarReportesComponent', () => {
  let component: RevisarReportesComponent;
  let fixture: ComponentFixture<RevisarReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisarReportesComponent]
    });
    fixture = TestBed.createComponent(RevisarReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicosListaComponent } from './topicos-lista.component';

describe('TopicosListaComponent', () => {
  let component: TopicosListaComponent;
  let fixture: ComponentFixture<TopicosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicosListaComponent]
    });
    fixture = TestBed.createComponent(TopicosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

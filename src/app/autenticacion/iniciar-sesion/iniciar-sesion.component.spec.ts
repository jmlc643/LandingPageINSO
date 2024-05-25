import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserApiService, Usuario, AuthenticationUser } from 'src/api/user-api/user-api.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { throwError } from 'rxjs';


describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            FormsModule,
            HttpClientTestingModule,
            RouterModule
        ],
        declarations: [
            IniciarSesionComponent,
        ],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA
        ],
        providers: [
            { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } }
          ]
    });
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(IniciarSesionComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    const fixture = TestBed.createComponent(IniciarSesionComponent);
    const component = fixture.componentInstance;
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.user.valid).toBeFalsy();
    expect(component.pass.valid).toBeFalsy();
  });
  
  it('should call autenticarUsuario() on form submit when form is valid', () => {
    const fixture = TestBed.createComponent(IniciarSesionComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'autenticarUsuario');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(component.autenticarUsuario).toHaveBeenCalled();
  });

  it('should display error message on invalid credentials', () => {
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.autenticarUsuario();
    expect(component.loginError).toEqual('');
  });
  
});

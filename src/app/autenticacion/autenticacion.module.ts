import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './autenticacion-routing.module';


@NgModule({
  declarations: [
   IniciarSesionComponent,
   RegistrarseComponent,
   RecuperarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    AuthenticationRoutingModule
  ]
})
export class AutenticacionModule { }

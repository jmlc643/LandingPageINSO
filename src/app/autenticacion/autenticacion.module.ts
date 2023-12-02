import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './autenticacion-routing.module';


@NgModule({
  declarations: [
   IniciarSesionComponent,
   RegistrarseComponent,
   RecuperarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AutenticacionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecuperarComponent } from './recuperar/recuperar.component';


@NgModule({
  declarations: [
   IniciarSesionComponent,
   RegistrarseComponent,
   RecuperarComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class AutenticacionModule { }

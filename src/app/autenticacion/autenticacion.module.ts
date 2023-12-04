import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './autenticacion-routing.module';
import { PorconfirmarComponent } from './porconfirmar/porconfirmar.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';


@NgModule({
  declarations: [
   IniciarSesionComponent,
   RegistrarseComponent,
   PorconfirmarComponent,
   ConfirmacionComponent,
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

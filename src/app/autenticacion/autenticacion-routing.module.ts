import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { PorconfirmarComponent } from './porconfirmar/porconfirmar.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

const routes: Routes = [

    { path: 'login', component: IniciarSesionComponent},
    { path: 'register', component: RegistrarseComponent},
    { path: 'porconfirmar', component: PorconfirmarComponent},
    { path: 'confirmacion', component: ConfirmacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { 
 
}
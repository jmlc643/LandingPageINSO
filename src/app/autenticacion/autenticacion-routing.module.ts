import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecuperarComponent } from './recuperar/recuperar.component';


const routes: Routes = [

    { path: 'login', component: IniciarSesionComponent},
    { path: 'register', component: RegistrarseComponent},
    { path: 'recovery', component: RecuperarComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { 
 
}
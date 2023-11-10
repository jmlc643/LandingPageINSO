import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then((m) => m.PublicModule) },
  { path: '', loadChildren: () => import('./autenticacion/autenticacion.module').then((m) => m.AutenticacionModule) },
  { path: '', loadChildren: () => import('./intranet/intranet.module').then((m) => m.IntranetModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

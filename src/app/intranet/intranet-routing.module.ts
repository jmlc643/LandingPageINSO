import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import {InicioComponent} from "./inicio/inicio.component";



const routes: Routes = [

    { path: 'intranet', component: InicioComponent, children: [
        {path: '', component: CategoriasComponent },
        {path: 'comunidad', loadChildren: () => import('./comunidad/comunidad.module').then((m) => m.ComunidadModule) },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule {

}

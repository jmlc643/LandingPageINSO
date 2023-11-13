import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import {InicioComponent} from "./inicio/inicio.component";
import { CrearTopicoComponent } from './creartopico/creartopico.component';
import { CrearCategoriaComponent } from './crearcategoria/crearcateogoria.component';



const routes: Routes = [

    { path: 'intranet', component: InicioComponent, children: [
        {path: '', component: CategoriasComponent },
        {path: 'creartopico', component: CrearTopicoComponent},
        {path: 'crearcategoria', component: CrearCategoriaComponent},
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

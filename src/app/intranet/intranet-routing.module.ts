import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import {InicioComponent} from "./inicio/inicio.component";
import { CrearTopicoComponent } from './creartopico/creartopico.component';
import { CrearCategoriaComponent } from './crearcategoria/crearcateogoria.component';
import { RevisarReportesComponent } from './revisar-reportes/revisar-reportes.component';




const routes: Routes = [

    { path: 'intranet', component: InicioComponent, children: [
        {path: '', component: CategoriasComponent },
        {path: 'creartopico', component: CrearTopicoComponent},
        {path: 'crearcategoria', component: CrearCategoriaComponent},
        {path: 'reportes', component: RevisarReportesComponent},
        {path: 'comunidad/:id', loadChildren: () => import('./comunidad/comunidad.module').then((m) => m.ComunidadModule) },
        {path: 'flashcards', loadChildren: () => import('./flashcards/flashcards.module').then((m) => m.FlashcardsModule) },
      ],
    },
//UID, Key, Ofuscar el ID o usar el ID de la BD
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule {

}

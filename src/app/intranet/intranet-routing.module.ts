import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import {InicioComponent} from "./inicio/inicio.component";
import { CrearTopicoComponent } from './creartopico/creartopico.component';
import { CrearCategoriaComponent } from './crearcategoria/crearcateogoria.component';
import {PremiosComponent} from "./premios/premios.component";
import {CrearpremioComponent} from "./crearpremio/crearpremio.component";
import {CrearmazoComponent} from "./crearmazo/crearmazo.component";
import {TusmazosComponent} from "./tusmazos/tusmazos.component";
import {CrearflashcardComponent} from "./crearflashcard/crearflashcard.component";
import {MazosComponent} from "./mazos/mazos.component";
import {FlashcardComponent} from "./flashcard/flashcard.component";

const routes: Routes = [

    { path: 'intranet', component: InicioComponent, children: [
        {path: '', component: CategoriasComponent },
        {path: 'creartopico', component: CrearTopicoComponent},
        {path: 'crearcategoria', component: CrearCategoriaComponent},
        {path: 'comunidad/:id', loadChildren: () => import('./comunidad/comunidad.module').then((m) => m.ComunidadModule) },
        {path: 'premio', component: PremiosComponent},
        {path: 'crearpremio', component: CrearpremioComponent},
        {path: 'tusmazo', component: TusmazosComponent},
        {path: 'crearmazo', component: CrearmazoComponent},
        {path: 'crearflashcard/:id', component: CrearflashcardComponent},
        {path: 'mazos', component: MazosComponent},
        {path: 'flashcard/:id', component: FlashcardComponent}
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

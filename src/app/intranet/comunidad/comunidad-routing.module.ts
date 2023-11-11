import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopicosListaComponent} from "./topicos-lista/topicos-lista.component";




const routes: Routes = [

  { path: '', component: TopicosListaComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunidadRoutingModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopicosListaComponent} from "./topicos-lista/topicos-lista.component";
import { PostComponent } from './post/post.component';




const routes: Routes = [

  { path: '', component: TopicosListaComponent,},
  { path: 'post', component: PostComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunidadRoutingModule {

}

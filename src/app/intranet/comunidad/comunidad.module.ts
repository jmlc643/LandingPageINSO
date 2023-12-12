import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComunidadRoutingModule} from "./comunidad-routing.module";
import { ForoComponent } from './foro/foro.component';
import { TopicosListaComponent } from './topicos-lista/topicos-lista.component';
import { PublicarHiloComponent } from './publicar-hilo/publicar-hilo.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    ForoComponent,
    TopicosListaComponent,
    PublicarHiloComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComunidadRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComunidadModule { }

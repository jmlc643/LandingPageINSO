import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ComunidadRoutingModule} from "./comunidad-routing.module";
import { ForoComponent } from './foro/foro.component';
import { TopicosListaComponent } from './topicos-lista/topicos-lista.component';
import { PublicarHiloComponent } from './publicar-hilo/publicar-hilo.component';



@NgModule({
  declarations: [
    ForoComponent,
    TopicosListaComponent,
    PublicarHiloComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComunidadRoutingModule
  ]
})
export class ComunidadModule { }

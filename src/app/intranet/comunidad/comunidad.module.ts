import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ComunidadRoutingModule} from "./comunidad-routing.module";
import { ForoComponent } from './foro/foro.component';
import { TopicosListaComponent } from './topicos-lista/topicos-lista.component';
import { PublicarHiloComponent } from './publicar-hilo/publicar-hilo.component';
import { HiloUsuarioComponent } from './hilo-usuario/hilo-usuario.component';



@NgModule({
  declarations: [
    ForoComponent,
    TopicosListaComponent,
    PublicarHiloComponent,
    HiloUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComunidadRoutingModule
  ]
})
export class ComunidadModule { }

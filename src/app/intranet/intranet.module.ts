import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { IntranetRoutingModule } from './intranet-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { CrearTopicoComponent } from './creartopico/creartopico.component';
import { CrearCategoriaComponent } from './crearcategoria/crearcateogoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorService } from 'src/api/jwt-api/jwt-interceptor.service';
import { ErrorInterceptorService } from 'src/api/error-interceptor-api/error-interceptor.service';
import { PremiosComponent } from './premios/premios.component';
import { CrearpremioComponent } from './crearpremio/crearpremio.component';
import { CrearmazoComponent } from './crearmazo/crearmazo.component';
import { CrearflashcardComponent } from './crearflashcard/crearflashcard.component';
import { TusmazosComponent } from './tusmazos/tusmazos.component';
import { MazosComponent } from './mazos/mazos.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import {SlickCarouselModule } from 'ngx-slick-carousel';
import {PerfilUsuarioComponent} from "./perfil-usuario/perfil-usuario.component";

@NgModule({
  declarations: [
    CategoriasComponent,
    InicioComponent,
    CrearTopicoComponent,
    CrearCategoriaComponent,
    PremiosComponent,
    CrearpremioComponent,
    CrearmazoComponent,
    CrearflashcardComponent,
    TusmazosComponent,
    MazosComponent,
    FlashcardComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    IntranetRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService, multi:true}
  ],
})
export class IntranetModule { }

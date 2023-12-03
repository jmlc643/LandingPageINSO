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

@NgModule({
  declarations: [
    CategoriasComponent,
    InicioComponent,
    CrearTopicoComponent,
    CrearCategoriaComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    IntranetRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService, multi:true}
  ], 
})
export class IntranetModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { IntranetRoutingModule } from './intranet-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { CrearTopicoComponent } from './creartopico/creartopico.component';
import { CrearCategoriaComponent } from './crearcategoria/crearcateogoria.component';
import { FormsModule } from '@angular/forms';
import { RevisarReportesComponent } from './revisar-reportes/revisar-reportes.component';
import { JwtInterceptorService } from 'src/api/jwt-api/jwt-interceptor.service';
import { ErrorInterceptorService } from 'src/api/error-interceptor-api/error-interceptor.service';

@NgModule({
  declarations: [
    CategoriasComponent,
    InicioComponent,
    CrearTopicoComponent,
    CrearCategoriaComponent,
    RevisarReportesComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    IntranetRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService, multi:true}
  ], 
})
export class IntranetModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { IntranetRoutingModule } from './intranet-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { CrearTopicoComponent } from './creartopico/creartopico.component';
import { CrearCategoriaComponent } from './crearcategoria/crearcateogoria.component';
import { FormsModule } from '@angular/forms';
import { RevisarReportesComponent } from './revisar-reportes/revisar-reportes.component';

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
  ]
})
export class IntranetModule { }

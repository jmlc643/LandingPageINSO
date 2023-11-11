import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { IntranetRoutingModule } from './intranet-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [
    CategoriasComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    IntranetRoutingModule,
    HttpClientModule
  ]
})
export class IntranetModule { }

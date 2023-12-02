import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderGeneralComponent } from './header-general/header-general.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeaderGeneralComponent,
  ],

  exports: [
    FooterComponent,
    HeaderComponent,
    HeaderGeneralComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule
    
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],

  exports: [
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule
    
  ]
})
export class LayoutModule { }

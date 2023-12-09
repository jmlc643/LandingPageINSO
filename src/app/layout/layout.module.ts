import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderGeneralComponent } from './header-general/header-general.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { DialogCustomComponent } from './dialog-mazo/dialog-custom.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeaderGeneralComponent,
    DialogCustomComponent,
  ],

  exports: [
    FooterComponent,
    HeaderComponent,
    HeaderGeneralComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token') || '',
        allowedDomains: ['example.com'],
        disallowedRoutes: ['example.com/unauthorized']
      }
    })
  ],
  providers: [JwtHelperService]
})
export class LayoutModule { }

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.css']
})
export class HeaderGeneralComponent implements OnInit{
  public usuarioLogeado:any = {};
  public userLoginOn:boolean=false;   
  userDropdownOpen = false;
  usuario:String = "";
  userApiService = inject(UserApiService);
  router = inject(Router);
  

    toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }


  ngOnInit(): void {
    let token = this.userApiService.userToken;
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
  }

  private decodificarjwt(token:String):any{
    console.log("Este es el token que he recibido "+ token);
    var base64Url = token.split('.')[1];
    console.log("Token base64url: "+ base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("Token base64: "+base64);
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload);
  }

  logout(){
    this.userApiService.cerrarSesion();
    this.router.navigate(['/login'])    
  }
}

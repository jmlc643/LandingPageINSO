import {Component, inject, OnInit, signal} from '@angular/core';
import {Mazo, MazoApiService} from "../../../api/mazo-api/mazo-api.service";
import {UserApiService, Usuario} from "../../../api/user-api/user-api.service";
import {Categoria} from "../../../api/categoria-api/categoria-api.service";
import {Topico} from "../../../api/topico-api/topico-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tusmazos',
  templateUrl: './tusmazos.component.html',
  styleUrls: ['./tusmazos.component.css']
})
export class TusmazosComponent implements OnInit{
  //Identificador del iniciar sesion
  userLoginOn:boolean=false;

  //En caso haya un error
  errorData : string = "";
  formError : string = "";

  //Identificador del usuario logeado
  public usuarioLogeado:any = {};

  //Listas
  mazos: Mazo[] = [];

  //Inyeccion de los servicios
  userApiService = inject(UserApiService);
  mazoApiService = inject(MazoApiService);
  router = inject(Router);

  async ngOnInit() {
    //Identificar si el usuario esta logeado
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    //Asigna el token a una variable
    let token = this.userApiService.userToken;
    //Devuelve un JSON con el token desencriptado
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
    //Carga de datos
    await this.loadData();
  }
  private async loadData() {
    //Carga de la lista de los premios
    this.mazos = await this.mazoApiService.getListMazos();
  }

  //Metodo para desencriptar token
  private decodificarjwt(token:String):any{
    //Pasarlo a base64
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //Convertirlo a JSON
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload); //Devolver JSON
  }

  filterMazos(username: string): Mazo[] {
    return this.mazos.filter(mazoo => username === mazoo.usuario.user);
  }

  irACrearFlashCard(mazo : Mazo){
    this.router.navigateByUrl("/intranet/crearflashcard/"+mazo.id);
  }

  tieneAcceso(): boolean {
    return this.userLoginOn;
  }
}

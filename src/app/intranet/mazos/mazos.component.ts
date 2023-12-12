import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Mazo, MazoApiService} from "../../../api/mazo-api/mazo-api.service";
import {UserApiService} from "../../../api/user-api/user-api.service";

@Component({
  selector: 'app-mazos',
  templateUrl: './mazos.component.html',
  styleUrls: ['./mazos.component.css']
})
export class MazosComponent implements OnInit{
  //Identificador para saber si esta logeado
  userLoginOn : boolean = false;

  //Inyecciones
  router = inject(Router);
  mazoApiService = inject(MazoApiService);
  userApiService = inject(UserApiService);

  //Listas
  mazos : Mazo[] = [];
  public usuarioLogeado:any = {};

  async ngOnInit() {
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

  private async loadData(){
    this.mazos = await this.mazoApiService.getListMazos();
  }

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
  practicar(mazo: Mazo){
    this.router.navigateByUrl("/intranet/flashcard/"+mazo.id);
  }

  tieneAcceso(): boolean {
    return this.userLoginOn;
  }
}

import {inject, Injectable} from '@angular/core';
import {UsuarioDTO} from "../user-api/user-api.service";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface Mazo{
  id: number,
  titulo: string,
  descripcion: string,
  imagen: string,
  usuario: UsuarioDTO
}

export interface SaveMazoRequest{
  titulo : string
  descripcion: string
  imagen : string
  username : string
}
@Injectable({
  providedIn: 'root'
})
export class MazoApiService {
  httpClient = inject(HttpClient);

  getListMazos(){
    return lastValueFrom(this.httpClient.get<Mazo[]>(environment.urlHost+'/mazo/listar/'));
  }

  saveMazo(mazo: SaveMazoRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+'/mazo/', mazo);
  }
}

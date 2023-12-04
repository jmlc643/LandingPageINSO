import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Categoria } from '../categoria-api/categoria-api.service';
import { environment } from 'src/environments/environment.prod';

export interface SaveTopicoRequest{
  nombre : string,
  descripcion : string,
  nombreCategoria : string
}

export interface Topico{
  id : number;
  nombre : string,
  descripcion : string,
  categoria : Categoria
}
export interface saveTopicoResponse{
  mensajeCrear : string
  mensajeNulo : string
}

Injectable({
  providedIn: 'root'
})
export class TopicoApiService {

  httpClient = inject(HttpClient)

  getListTopicos():Observable<Topico[]>{
    return this.httpClient.get<Topico[]>(environment.urlHost+ '/topico/');
  }

  listarTopicoPorCategoria(topico: Topico){ //El es any es para especificar un parametro y asi no suelte un error
    return lastValueFrom(this.httpClient.post<Topico[]>(environment.urlHost+ '/topico/listar/', topico))
  }

  crearTopico(topico: SaveTopicoRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+ '/topico/', topico);
  }

  encontrarTopico(id: number){
    return lastValueFrom(this.httpClient.post<Topico>(environment.urlHost+ '/topico/encontrar/', id))
  }
}

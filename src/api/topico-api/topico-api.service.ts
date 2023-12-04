import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Categoria } from '../categoria-api/categoria-api.service';

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
    return this.httpClient.get<Topico[]>('http://localhost:8080/topico/');
  }

  listarTopicoPorCategoria(topico: Topico){ //El es any es para especificar un parametro y asi no suelte un error
    return lastValueFrom(this.httpClient.post<Topico[]>('http://localhost:8080/topico/listar/', topico))
  }

  crearTopico(topico: SaveTopicoRequest):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/topico/', topico);
  }

  encontrarTopico(id: number){
    return lastValueFrom(this.httpClient.post<Topico>('http://localhost:8080/topico/encontrar/', id))
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Categoria } from '../categoria-api/categoria-api.service';

export interface SaveTopicoRequest{
  nombre : string,
  descripcion : string,
  nombreCategoria : string
}

export interface Topico{
  nombre : string,
  descripcion : string,
  categoriaUnida : Categoria
}

export interface DeleteCategoriaRequest{
  nombre : string
}

Injectable({
  providedIn: 'root'
})
export class TopicoApiService {

  httpClient = inject(HttpClient)

  getListTopicos(){
    return lastValueFrom(this.httpClient.get<Topico[]>('http://localhost:8080/topico/'))
  }
  
  crearTopico(topico: SaveTopicoRequest){
    return lastValueFrom(this.httpClient.post<Topico>('http://localhost:8080/topico/', topico))
  }
}

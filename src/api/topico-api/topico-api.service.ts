import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Topico{
  nombre : string,
  descripcion : string,
  nombreCategoria : string
}

export interface DeleteCategoriaRequest{
  nombre : string
}

Injectable({
  providedIn: 'root'
})
export class TopicoApiService {

  httpClient = inject(HttpClient)

  crearTopico(topico: Topico){
    return lastValueFrom(this.httpClient.post<Topico>('http://localhost:8080/topico/', topico))
  }
}

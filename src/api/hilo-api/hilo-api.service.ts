import { Injectable, inject } from '@angular/core';
import { Usuario } from '../user-api/user-api.service';
import { Topico } from '../topico-api/topico-api.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Hilo{
  id: number,
  titulo: string,
  mensaje: string,
  cerrado: boolean,
  fechaCreacion: Date,
  topico: Topico,
  usuario: Usuario
}

export interface SaveHiloRequest{
  titulo: string,
  mensaje: string,
  username: string,
  topicname: string
}

@Injectable({
  providedIn: 'root'
})
export class HiloApiService {

  httpClient = inject(HttpClient)

  getListHilos(){
    return lastValueFrom(this.httpClient.get<Hilo[]>('http://localhost:8080/hilo/'))
  }

  publicarHilo(hilo : Hilo){
    return lastValueFrom(this.httpClient.post<Hilo>('http://localhost:8080/hilo/', hilo))
  }

  encontrarHilo(id: number){
    return lastValueFrom(this.httpClient.post<Hilo>('http://localhost:8080/hilo/encontrar/', id))
  }
  
}

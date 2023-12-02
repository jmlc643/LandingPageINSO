import { Injectable, inject } from '@angular/core';
import { Hilo } from '../hilo-api/hilo-api.service';
import { UsuarioDTO } from '../user-api/user-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

export interface Comentario{
  id: number,
  mensaje: string,
  esEditado: boolean,
  fechaCreacion: Date,
  hiloSerializer: Hilo,
  userSerializer: UsuarioDTO
}

export interface SaveComentarioRequest{
  mensaje: string,
  username: string,
  idHilo: number
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioApiService {

  httpClient = inject(HttpClient)

  getListComentarios():Observable<Comentario[]>{
    return this.httpClient.get<Comentario[]>('http://localhost:8080/comentario/');
  }

  crearComentario(comentario : Comentario){
    return lastValueFrom(this.httpClient.post<Comentario>('http://localhost:8080/comentario/', comentario))
  }
}

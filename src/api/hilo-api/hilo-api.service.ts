import { Injectable, inject } from '@angular/core';
import { UsuarioDTO } from '../user-api/user-api.service';
import { Topico } from '../topico-api/topico-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface Hilo{
  id: number,
  titulo: string,
  mensaje: string,
  fechaCreacion: Date,
  topico: Topico,
  usuario: UsuarioDTO
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

  getListHilos():Observable<Hilo[]>{
    return this.httpClient.get<Hilo[]>(environment.urlHost+ '/hilo/');
  }

  publicarHilo(hilo : SaveHiloRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+'/hilo/', hilo);
  }

  encontrarHilo(id: number){
    return lastValueFrom(this.httpClient.post<Hilo>(environment.urlHost+ '/hilo/encontrar/', id))
  }
  
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Usuario {
  user: string
  password: string
  email: string
}

export interface ComprobarPassword{
  passw : string
}

export interface AuthenticationUser{
  user: string
  password: string
}

export interface AuthenticationUserResponse{
  mensaje : string
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  httpClient = inject(HttpClient)

  getListUser(){
    return lastValueFrom(this.httpClient.get<Usuario[]>('http://localhost:8080/user/'))
  }

  saveUser(usuario: Usuario){
    return lastValueFrom(this.httpClient.post<Usuario>('http://localhost:8080/user/', usuario))
  }

iniciarSesion(usuario: AuthenticationUser){
  return lastValueFrom(this.httpClient.post<AuthenticationUserResponse>('http://localhost:8080/user/authentication/', usuario))
}

}
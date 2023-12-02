import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, tap, throwError } from 'rxjs';

export interface Usuario {
  user: string
  password: string
  email: string
}

export interface recuperarContraRequest{
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

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<String> = new BehaviorSubject<String>("");

  httpClient = inject(HttpClient)

  constructor(){
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token")||"");
  }

  getListUser(){
    return lastValueFrom(this.httpClient.get<Usuario[]>('http://localhost:8080/user/listar/'))
  }

  saveUser(usuario: Usuario){
    return lastValueFrom(this.httpClient.post<Usuario>('http://localhost:8080/autenticacion/register/', usuario))
  }

  iniciarSesion(usuario: AuthenticationUser):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/autenticacion/authentication/', usuario).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  recuperarContra(recuperarContra : recuperarContraRequest):Observable<String>{
    return this.httpClient.post<String>('http://localhost:8080/autenticacion/recuperar-contra/', recuperarContra);
  }

  cerrarSesion():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error '+error.error);
    }else{
      console.error('Backend retorno el código del estado '+error);
      console.log(this.userData);
    }return throwError(() => new Error('Error al iniciar sesión. Revise los datos enviados'));
  }

  get userToken():String{
    return this.currentUserData.value;
  }

}
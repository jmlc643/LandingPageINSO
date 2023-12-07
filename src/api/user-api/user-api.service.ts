import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface Usuario {
  user: string
  password: string
  email: string
}

export enum Role {
  Valor1 = "STUDENT",
  Valor2 = "ADMIN",
}

export interface UsuarioDTO{
  user: string
  email: string
  role: Role
}

export interface UsuarioLogeado{
  "sub": String
  "aud": String
  "exp": number
  "iat": number
}

export interface recuperarContraRequest{
  email: string
  firma: String
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
    return lastValueFrom(this.httpClient.get<Usuario[]>(environment.urlHost+'/user/listar/'))
  }

  saveUser(usuario: Usuario):Observable<any>{
    return this.httpClient.post<Usuario>(environment.urlHost + '/autenticacion/register/', usuario).pipe(
      catchError(this.handleError)
    );
  }

  iniciarSesion(usuario: AuthenticationUser):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost + '/autenticacion/authentication/', usuario).pipe(
      tap((userData) => {
        console.log("User Data : "+userData);
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  recuperarContra(recuperarContra : String):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost + '/autenticacion/recuperar-contra/', recuperarContra).pipe(
      catchError(this.handleError)
    );
  }

  cerrarSesion():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  resetPass(password : String, token: String):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+'/autenticacion/change-pass/'+token, password).pipe(
      catchError(this.handleError)
    );
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
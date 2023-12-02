import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, Observable, throwError } from 'rxjs';

export interface Categoria{
  nombre: string
  descripcion: string
}

export interface SaveCategoriaResponse{
  mensaje: string
}

@Injectable({
  providedIn: 'root'
})

export class CategoriaApiService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(){
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token")||"");
  }

  httpClient = inject(HttpClient)

  getListCategoria():Observable<Categoria[]>{
      return this.httpClient.get<Categoria[]>('http://localhost:8080/categoria/listar/').pipe(
        catchError(this.handleError)
      );
    }

  saveCategoria(categoria: Categoria){
    return lastValueFrom(this.httpClient.post<Categoria>('http://localhost:8080/categoria/', categoria))
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error '+error.error);
    }else{
      console.error('Backend retorno el código del estado '+error);
      console.log(this.userData);
    }return throwError(() => new Error('No tiene autorizacion'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}

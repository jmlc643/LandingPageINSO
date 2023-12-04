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

  httpClient = inject(HttpClient)

  getListCategoria():Observable<Categoria[]>{
      return this.httpClient.get<Categoria[]>('http://localhost:8080/categoria/listar/');
    }

  saveCategoria(categoria: Categoria):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/categoria/', categoria)
  }
}

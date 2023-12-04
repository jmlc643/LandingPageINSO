import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
      return this.httpClient.get<Categoria[]>(environment.urlHost+ '/categoria/listar/');
    }

  saveCategoria(categoria: Categoria):Observable<any>{
    return this.httpClient.post<any>(environment.urlHost+'/categoria/', categoria)
  }
}

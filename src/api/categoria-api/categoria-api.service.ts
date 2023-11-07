import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Categoria{
  nombre: string
  descripcion: string
}

@Injectable({
  providedIn: 'root'
})

export class CategoriaApiService {

  httpClient = inject(HttpClient)

  getListCategoria(){
      return lastValueFrom(this.httpClient.get<Categoria[]>('http://localhost:8080/categoria/'))
    }

}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Usuario {
  user: string
  password: string
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  httpClient = inject(HttpClient)

  getListUser(){
    return lastValueFrom(this.httpClient.get<Usuario[]>('localhost:8080/user/'))
  }

}
